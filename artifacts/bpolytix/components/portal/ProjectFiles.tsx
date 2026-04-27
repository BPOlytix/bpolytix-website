/*
 * ============================================================
 * RUN THIS IN SUPABASE SQL EDITOR FIRST
 * ============================================================
 *
 * CREATE TABLE public.project_files (
 *   id uuid primary key default gen_random_uuid(),
 *   project_id uuid not null references public.projects(id) on delete cascade,
 *   uploaded_by uuid not null references public.profiles(id),
 *   file_name text not null,
 *   file_path text not null,
 *   file_size bigint not null,
 *   label text,
 *   created_at timestamptz not null default now()
 * );
 *
 * ALTER TABLE public.project_files ENABLE ROW LEVEL SECURITY;
 *
 * CREATE POLICY "Clients see own project files"
 *   ON public.project_files FOR SELECT
 *   USING (
 *     EXISTS (
 *       SELECT 1 FROM public.projects
 *       WHERE projects.id = project_files.project_id
 *       AND projects.user_id = auth.uid()
 *     )
 *   );
 *
 * CREATE POLICY "Admin sees all files"
 *   ON public.project_files FOR SELECT
 *   USING (public.is_admin());
 *
 * CREATE POLICY "Authenticated users can insert files"
 *   ON public.project_files FOR INSERT
 *   WITH CHECK (auth.uid() = uploaded_by);
 *
 * CREATE POLICY "Admin can delete any file"
 *   ON public.project_files FOR DELETE
 *   USING (public.is_admin());
 *
 * CREATE POLICY "Clients can delete own uploads"
 *   ON public.project_files FOR DELETE
 *   USING (auth.uid() = uploaded_by);
 *
 * ============================================================
 */

"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Download, FileText, Trash2, Upload } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const LABEL_OPTIONS = [
  "Logo",
  "Brand guidelines",
  "Content & copy",
  "Images",
  "Domain access",
  "Other",
] as const;

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type ProjectFile = {
  id: string;
  project_id: string;
  uploaded_by: string;
  file_name: string;
  file_path: string;
  file_size: number;
  label: string | null;
  created_at: string;
  uploader_name: string | null;
};

type RawRow = Omit<ProjectFile, "uploader_name"> & {
  uploader?: { full_name: string | null } | null;
};

type Props = {
  projectId: string;
  currentUserId: string;
  isAdmin: boolean;
};

export default function ProjectFiles({ projectId, currentUserId, isAdmin }: Props) {
  const supabase = useMemo(() => createClient(), []);
  const shouldReduceMotion = useReducedMotion();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [label, setLabel] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadFiles = useCallback(async () => {
    const selectQuery = isAdmin
      ? "id, project_id, uploaded_by, file_name, file_path, file_size, label, created_at, uploader:profiles!uploaded_by(full_name)"
      : "id, project_id, uploaded_by, file_name, file_path, file_size, label, created_at";

    const { data } = await supabase
      .from("project_files")
      .select(selectQuery)
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    if (data) {
      setFiles(
        (data as unknown as RawRow[]).map((row) => ({
          id: row.id,
          project_id: row.project_id,
          uploaded_by: row.uploaded_by,
          file_name: row.file_name,
          file_path: row.file_path,
          file_size: row.file_size,
          label: row.label ?? null,
          created_at: row.created_at,
          uploader_name: row.uploader?.full_name ?? null,
        })),
      );
    }

    setIsLoading(false);
  }, [supabase, projectId, isAdmin]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  function validateFiles(incoming: File[]): { valid: File[]; error: string } {
    const oversized = incoming.filter((f) => f.size > MAX_FILE_SIZE);
    if (oversized.length > 0) {
      return {
        valid: [],
        error: `${oversized.map((f) => f.name).join(", ")} exceed${oversized.length === 1 ? "s" : ""} the 10 MB limit.`,
      };
    }
    return { valid: incoming, error: "" };
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { valid, error } = validateFiles(Array.from(event.target.files ?? []));
    setUploadError(error);
    setSelectedFiles(valid);
  }

  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(event: React.DragEvent) {
    event.preventDefault();
    setIsDragOver(false);
  }

  function handleDrop(event: React.DragEvent) {
    event.preventDefault();
    setIsDragOver(false);
    const { valid, error } = validateFiles(Array.from(event.dataTransfer.files));
    setUploadError(error);
    setSelectedFiles(valid);
  }

  async function handleUpload() {
    if (!selectedFiles.length || isUploading) return;

    setIsUploading(true);
    setUploadError("");

    for (const file of selectedFiles) {
      const storagePath = `${projectId}/${Date.now()}_${file.name}`;

      const { error: storageErr } = await supabase.storage
        .from("project-files")
        .upload(storagePath, file);

      if (storageErr) {
        setUploadError(storageErr.message || "Upload failed.");
        setIsUploading(false);
        return;
      }

      const { error: dbErr } = await supabase.from("project_files").insert({
        project_id: projectId,
        uploaded_by: currentUserId,
        file_name: file.name,
        file_path: storagePath,
        file_size: file.size,
        label: label || null,
      });

      if (dbErr) {
        setUploadError(dbErr.message || "Could not save file record.");
        setIsUploading(false);
        return;
      }
    }

    setSelectedFiles([]);
    setLabel("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    await loadFiles();
    setIsUploading(false);
  }

  async function handleDownload(file: ProjectFile) {
    const { data, error } = await supabase.storage
      .from("project-files")
      .createSignedUrl(file.file_path, 60);

    if (error || !data?.signedUrl) {
      window.alert("Could not generate download link.");
      return;
    }

    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  async function handleDelete(file: ProjectFile) {
    if (!window.confirm("Delete this file?")) return;

    const { error: storageErr } = await supabase.storage
      .from("project-files")
      .remove([file.file_path]);

    if (storageErr) {
      window.alert(storageErr.message || "Could not delete file.");
      return;
    }

    await supabase.from("project_files").delete().eq("id", file.id);
    setFiles((prev) => prev.filter((f) => f.id !== file.id));
  }

  const canDelete = (file: ProjectFile) =>
    isAdmin || file.uploaded_by === currentUserId;

  const uploaderLabel = (file: ProjectFile) => {
    if (isAdmin) return file.uploader_name || "Unknown";
    return file.uploaded_by === currentUserId ? "You" : "BPOLytix team";
  };

  const dropZoneClass = [
    "relative flex h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed transition-colors duration-150",
    isDragOver
      ? "border-[#1B77F2] bg-[#1B77F2]/5"
      : "border-[#1E2D3D] hover:border-[#1B77F2] hover:bg-[#1B77F2]/5",
  ].join(" ");

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="rounded-xl border border-[#1E2D3D] bg-[#111F2E] p-6"
    >
      <div className="mb-5">
        <h2
          className="text-[20px] font-bold text-[#F5F7FA]"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Project Files
        </h2>
        <p
          className="mt-1 text-[14px] text-[#8892A4]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {isAdmin
            ? "Files shared between you and the client"
            : "Upload logos, images, copy, or any files for your web build"}
        </p>
      </div>

      {/* Drop zone */}
      <div
        role="button"
        tabIndex={0}
        className={dropZoneClass}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter") fileInputRef.current?.click();
        }}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload size={22} color="#8892A4" />
        <p
          className="text-[14px] text-[#8892A4]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {selectedFiles.length > 0
            ? `${selectedFiles.length} file${selectedFiles.length > 1 ? "s" : ""} selected`
            : "Drag files here or click to browse"}
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {uploadError ? (
        <p
          className="mt-2 text-[13px] text-[#FF6B6B]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {uploadError}
        </p>
      ) : null}

      {/* Label + Upload row */}
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <div className="relative">
          <select
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className={[
              "appearance-none rounded-lg border border-[#1E2D3D] bg-[#0D1B2A] px-4 py-3 pr-9 text-[14px] outline-none focus:border-[#1B77F2]",
              label ? "text-[#F5F7FA]" : "text-[#8892A4]",
            ].join(" ")}
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            <option value="">Label (optional)</option>
            {LABEL_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            size={15}
            color="#8892A4"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
          />
        </div>

        <button
          type="button"
          onClick={handleUpload}
          disabled={selectedFiles.length === 0 || isUploading}
          className="inline-flex items-center gap-2 rounded-full bg-[#1B77F2] px-5 py-2.5 text-[14px] font-semibold text-[#F5F7FA] transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {isUploading ? (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <Upload size={15} />
          )}
          {isUploading ? "Uploading…" : "Upload"}
        </button>
      </div>

      {/* File list */}
      <div className="mt-6">
        {isLoading ? (
          <p
            className="text-[14px] text-[#8892A4]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Loading files…
          </p>
        ) : files.length === 0 ? (
          <p
            className="text-[14px] text-[#8892A4]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            No files uploaded yet.
          </p>
        ) : (
          <AnimatePresence initial={false}>
            <ul className="space-y-2">
              {files.map((file) => (
                <motion.li
                  key={file.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="flex flex-col gap-2 rounded-lg border border-[#1E2D3D] bg-[#0D1B2A] px-4 py-3 sm:flex-row sm:items-center"
                >
                  {/* Name + label */}
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <FileText size={18} color="#8892A4" className="shrink-0" />
                    <span
                      className="min-w-0 truncate text-[15px] text-[#F5F7FA]"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {file.file_name}
                    </span>
                    {file.label ? (
                      <span
                        className="shrink-0 rounded-full bg-[#1B77F2]/20 px-3 py-1 text-[12px] font-medium text-[#1B77F2]"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {file.label}
                      </span>
                    ) : null}
                  </div>

                  {/* Meta */}
                  <div
                    className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[#8892A4] sm:shrink-0"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    <span>{formatFileSize(file.file_size)}</span>
                    <span>{dateFormatter.format(new Date(file.created_at))}</span>
                    <span>{uploaderLabel(file)}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 sm:shrink-0">
                    <button
                      type="button"
                      onClick={() => handleDownload(file)}
                      aria-label="Download"
                      className="rounded-lg p-2 text-[#8892A4] transition-colors hover:bg-white/[0.05] hover:text-[#F5F7FA]"
                    >
                      <Download size={16} />
                    </button>
                    {canDelete(file) ? (
                      <button
                        type="button"
                        onClick={() => handleDelete(file)}
                        aria-label="Delete"
                        className="rounded-lg p-2 text-[#8892A4] transition-colors hover:bg-[#FF6B6B]/10 hover:text-[#FF6B6B]"
                      >
                        <Trash2 size={16} />
                      </button>
                    ) : null}
                  </div>
                </motion.li>
              ))}
            </ul>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
