#!/usr/bin/env node
// scripts/seed-demo.mjs
// Creates the demo@bpolytix.com client account for marketing recordings.
// Run from repo root: node scripts/seed-demo.mjs

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateSync } from 'node:zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Env ───────────────────────────────────────────────────────────────────────
const envRaw = readFileSync(join(__dirname, '../artifacts/bpolytix/.env.local'), 'utf-8');
const env = Object.fromEntries(
  envRaw.split('\n')
    .filter(l => l.trim() && !l.startsWith('#'))
    .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; })
);

const SUPABASE_URL = (env.NEXT_PUBLIC_SUPABASE_URL ?? '').replace(/\/$/, '');
const SERVICE_KEY  = env.SUPABASE_SERVICE_ROLE_KEY ?? env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌  Missing SUPABASE_URL or service role key in .env.local');
  process.exit(1);
}

// ── Supabase REST helpers ─────────────────────────────────────────────────────
const BASE = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` };

async function rest(path, { method = 'GET', body, prefer, extraHeaders = {} } = {}) {
  const res = await fetch(`${SUPABASE_URL}${path}`, {
    method,
    headers: {
      ...BASE,
      'Content-Type': 'application/json',
      ...(prefer ? { Prefer: prefer } : {}),
      ...extraHeaders,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = text; }
  return { ok: res.ok, status: res.status, data };
}

async function dbInsert(table, rows, single = false) {
  const r = await rest(`/rest/v1/${table}`, {
    method: 'POST',
    prefer: 'return=representation',
    body: rows,
  });
  if (!r.ok) throw new Error(`Insert ${table}: ${JSON.stringify(r.data)}`);
  return single ? (Array.isArray(r.data) ? r.data[0] : r.data) : r.data;
}

async function dbSelect(table, qs) {
  const r = await rest(`/rest/v1/${table}?${qs}`, {
    extraHeaders: { Accept: 'application/json' },
  });
  if (!r.ok) throw new Error(`Select ${table}: ${JSON.stringify(r.data)}`);
  return Array.isArray(r.data) ? r.data : [r.data];
}

async function storageUpload(bucket, objectPath, buffer, contentType) {
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}/${objectPath}`, {
    method: 'POST',
    headers: { ...BASE, 'Content-Type': contentType, 'x-upsert': 'true' },
    body: buffer,
  });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = text; }
  if (!res.ok) throw new Error(`Upload ${bucket}/${objectPath}: ${JSON.stringify(data)}`);
  return data;
}

// ── PNG generator (pure Node — no packages) ───────────────────────────────────
function crc32(buf) {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c;
  }
  let crc = 0xFFFFFFFF;
  for (const b of buf) crc = t[(crc ^ b) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function pngChunk(type, data) {
  const tb = Buffer.from(type, 'ascii');
  const len = Buffer.allocUnsafe(4); len.writeUInt32BE(data.length);
  const crcBuf = Buffer.allocUnsafe(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([tb, data])));
  return Buffer.concat([len, tb, data, crcBuf]);
}

function makePNG(w, h, r, g, b) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.allocUnsafe(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const stride = 1 + w * 3;
  const raw = Buffer.allocUnsafe(stride * h);
  for (let y = 0; y < h; y++) {
    raw[y * stride] = 0;
    for (let x = 0; x < w; x++) {
      const off = y * stride + 1 + x * 3;
      raw[off] = r; raw[off + 1] = g; raw[off + 2] = b;
    }
  }
  return Buffer.concat([
    sig,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', deflateSync(raw, { level: 1 })),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

// ── Minimal PDF generator ─────────────────────────────────────────────────────
function makePDF(text) {
  // Escape PDF string special chars
  const esc = text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  const stream = `BT /F1 12 Tf 72 720 Td (${esc}) Tj ET`;
  let pdf = '%PDF-1.4\n';
  const offs = [];
  const addObj = s => { offs.push(pdf.length); pdf += s + '\n'; };
  addObj('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');
  addObj('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj');
  addObj('3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> >>\nendobj');
  addObj(`4 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj`);
  const xref = pdf.length;
  pdf += 'xref\n0 5\n0000000000 65535 f \n';
  for (const o of offs) pdf += String(o).padStart(10, '0') + ' 00000 n \n';
  pdf += `trailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(pdf, 'ascii');
}

// ── Seed constants ────────────────────────────────────────────────────────────
const DEMO_EMAIL    = 'demo@bpolytix.com';
const DEMO_PASSWORD = 'DemoBPO2026!';
const ADMIN_EMAILS  = ['miteshmza82@gmail.com', 'mitesh@bpolytix.com'];

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🌱  BPOLytix demo seed\n');

  // Step 1 — clean up existing demo user
  console.log('1 / 7  Checking for existing demo user…');
  let existingId = null;
  try {
    const rows = await dbSelect('profiles', `email=eq.${encodeURIComponent(DEMO_EMAIL)}&select=id`);
    if (rows.length > 0 && rows[0].id) {
      existingId = rows[0].id;
      console.log(`       Found existing user (${existingId}) — deleting…`);
      const del = await rest(`/auth/v1/admin/users/${existingId}`, { method: 'DELETE' });
      if (del.ok) {
        console.log('       ✓ Deleted');
      } else {
        console.warn('       ⚠ Delete returned', del.status, JSON.stringify(del.data));
      }
    } else {
      console.log('       No existing demo user — clean slate');
    }
  } catch (e) {
    console.warn('       Could not check for existing user:', e.message);
  }

  // Step 2 — create auth user
  console.log('\n2 / 7  Creating auth user…');
  const { ok: authOk, data: authData } = await rest('/auth/v1/admin/users', {
    method: 'POST',
    body: { email: DEMO_EMAIL, password: DEMO_PASSWORD, email_confirm: true },
  });
  if (!authOk || !authData?.id) {
    console.error('       ❌ Auth creation failed:', JSON.stringify(authData));
    process.exit(1);
  }
  const demoId = authData.id;
  console.log(`       ✓ Auth user created (${demoId})`);

  // Step 3 — create profile
  console.log('\n3 / 7  Creating profile…');
  await dbInsert('profiles', {
    id:        demoId,
    email:     DEMO_EMAIL,
    full_name: 'Thandi Molefe',
    company:   'Molefe Interiors',
    phone:     '+27 72 555 0199',
    role:      'client',
  }, true);
  console.log('       ✓ Profile created');

  // Step 4 — look up admin UUID
  console.log('\n4 / 7  Looking up admin user…');
  let adminId = null;
  for (const email of ADMIN_EMAILS) {
    try {
      const rows = await dbSelect('profiles', `email=eq.${encodeURIComponent(email)}&select=id,email`);
      if (rows.length > 0 && rows[0].id) {
        adminId = rows[0].id;
        console.log(`       ✓ Admin found: ${email} (${adminId})`);
        break;
      }
    } catch { /* try next */ }
  }
  if (!adminId) {
    console.warn('       ⚠ No admin profile found — admin files will fall back to demo user ID (will show as "BPOLytix team" anyway since IDs differ from current user)');
  }

  // Step 5 — create project
  console.log('\n5 / 7  Creating project…');
  let project;
  try {
    project = await dbInsert('projects', {
      user_id:         demoId,
      type:            'web-build',
      status:          'active',
      vercel_url:      'https://bpolytix.com',
      brief_file_path: 'website-briefs/demo-brief.pdf',
    }, true);
    console.log('       ✓ Project created (with brief_file_path)');
  } catch {
    console.log('       brief_file_path column absent — retrying without it…');
    project = await dbInsert('projects', {
      user_id:    demoId,
      type:       'web-build',
      status:     'in-progress',
      vercel_url: 'https://bpolytix.com',
    }, true);
    console.log('       ✓ Project created');
  }
  const projectId = project.id;
  console.log(`       Project ID: ${projectId}`);

  // Step 6 — project stages
  console.log('\n6 / 7  Creating 7 project stages…');
  await dbInsert('project_stages', [
    { project_id: projectId, stage_order: 1, stage_name: 'Details Received',   status: 'complete',    completed_at: '2026-04-15T07:00:00+00:00' },
    { project_id: projectId, stage_order: 2, stage_name: 'Planning & Sitemap', status: 'complete',    completed_at: '2026-04-17T12:30:00+00:00' },
    { project_id: projectId, stage_order: 3, stage_name: 'Design Mockup',      status: 'complete',    completed_at: '2026-04-20T09:00:00+00:00' },
    { project_id: projectId, stage_order: 4, stage_name: 'Development',        status: 'complete',    completed_at: '2026-04-24T14:00:00+00:00' },
    { project_id: projectId, stage_order: 5, stage_name: 'Client Review',      status: 'in-progress', completed_at: null },
    { project_id: projectId, stage_order: 6, stage_name: 'Revisions',          status: 'pending',     completed_at: null },
    { project_id: projectId, stage_order: 7, stage_name: 'Go Live',            status: 'pending',     completed_at: null },
  ]);
  console.log('       ✓ 7 stages inserted');

  // Step 7 — files, change requests
  console.log('\n7 / 7  Uploading files & seeding change requests…\n');

  // Generate placeholder file buffers
  const logoPNG    = makePNG(200, 200,  44,  62,  80);  // #2C3E50 — brand dark slate
  const heroPNG    = makePNG(400, 300, 230, 126,  34);  // #E67E22 — brand amber accent
  const brandPDF   = makePDF('Molefe Interiors - Brand Guidelines. Primary: #2C3E50, Accent: #E67E22, Font: Montserrat');
  const reviewPDF  = makePDF('Staging review complete. 3 minor layout adjustments flagged - see change requests below.');
  const briefPDF   = makePDF('Molefe Interiors - Website Details. Demo placeholder document.');
  const docxBuf    = Buffer.from('Welcome to Molefe Interiors. We design spaces that feel like home.', 'utf-8');
  const crPNG1     = makePNG(400, 300,  44,  62,  80);  // mobile header — dark
  const crPNG2     = makePNG(400, 300,  27, 119, 242);  // about page — brand blue
  const crPNG3     = makePNG(400, 300,   0, 212, 170);  // contact form — brand green

  // Upload details file to website-briefs bucket
  try {
    await storageUpload('website-briefs', 'demo-brief.pdf', briefPDF, 'application/pdf');
    console.log('  ✓ website-briefs/demo-brief.pdf');
  } catch (e) { console.warn('  ⚠ Details PDF:', e.message); }

  // Project files
  const uploaderAdmin = adminId ?? demoId;
  const projectFiles = [
    { name: 'molefe-interiors-logo.png',     label: 'Logo',             uploader: demoId,        buf: logoPNG,   ct: 'image/png' },
    { name: 'Brand-Colours-and-Fonts.pdf',   label: 'Brand guidelines', uploader: demoId,        buf: brandPDF,  ct: 'application/pdf' },
    { name: 'Homepage-Copy-Draft.docx',      label: 'Content & copy',   uploader: demoId,        buf: docxBuf,   ct: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
    { name: 'Revised-Hero-Image.jpg',        label: 'Images',           uploader: demoId,        buf: heroPNG,   ct: 'image/png' },
    { name: 'Staging-Site-Review-Notes.pdf', label: 'Other',            uploader: uploaderAdmin, buf: reviewPDF, ct: 'application/pdf' },
  ];

  for (const f of projectFiles) {
    const storagePath = `${projectId}/${f.name}`;
    try {
      await storageUpload('project-files', storagePath, f.buf, f.ct);
      await dbInsert('project_files', {
        project_id:  projectId,
        uploaded_by: f.uploader,
        file_name:   f.name,
        file_path:   storagePath,
        file_size:   f.buf.length,
        label:       f.label,
      }, true);
      const who = f.uploader === demoId ? 'client' : 'admin';
      console.log(`  ✓ ${f.name}  [${f.label}] — uploaded by ${who}`);
    } catch (e) { console.warn(`  ⚠ ${f.name}: ${e.message}`); }
  }

  // Change requests
  const crs = [
    {
      description: 'The logo on the homepage is too small on mobile. Can you make it about 50% bigger so it\'s easier to see when someone opens the site on their phone?',
      status:      'done',
      created_at:  '2026-04-26T08:15:00+00:00',
      fn:          'cr-mobile-header.png',
      buf:         crPNG1,
    },
    {
      description: 'On the About page, the paragraph about our 10 years of experience is missing. Can you add this text: "With over a decade of experience transforming residential and commercial spaces, Molefe Interiors brings craftsmanship and care to every project."',
      status:      'noted',
      created_at:  '2026-04-27T07:30:00+00:00',
      fn:          'cr-about-page.png',
      buf:         crPNG2,
    },
    {
      description: 'The contact form doesn\'t have a field for the client\'s suburb. Our customers always tell us where they are — can we add a "Suburb / Area" text field between the phone number and the message box?',
      status:      'pending',
      created_at:  '2026-04-28T06:45:00+00:00',
      fn:          'cr-contact-form.png',
      buf:         crPNG3,
    },
  ];

  for (const cr of crs) {
    const screenshotPath = `${projectId}/change-requests/${cr.fn}`;
    let finalPath = null;
    try {
      await storageUpload('project-files', screenshotPath, cr.buf, 'image/png');
      finalPath = screenshotPath;
    } catch (e) { console.warn(`  ⚠ Screenshot upload ${cr.fn}: ${e.message}`); }

    try {
      await dbInsert('change_requests', {
        project_id:      projectId,
        submitted_by:    demoId,
        description:     cr.description,
        screenshot_path: finalPath,
        status:          cr.status,
        created_at:      cr.created_at,
        updated_at:      cr.created_at,
      }, true);
      console.log(`  ✓ Change request [${cr.status}]`);
    } catch (e) { console.warn(`  ⚠ Change request insert: ${e.message}`); }
  }

  console.log('\n' + '─'.repeat(56));
  console.log('✅  Demo seed complete\n');
  console.log('  Login email : demo@bpolytix.com');
  console.log('  Password    : DemoBPO2026!');
  console.log(`  Project ID  : ${projectId}`);
  console.log(`  Demo user ID: ${demoId}`);
  console.log('\n  Verify at: https://bpolytix.com/login');
  console.log('─'.repeat(56) + '\n');
}

main().catch(e => {
  console.error('\n❌  Seed failed:', e.message);
  process.exit(1);
});
