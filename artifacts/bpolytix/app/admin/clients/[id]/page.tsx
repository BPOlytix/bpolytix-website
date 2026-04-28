"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import ChangeRequests from "@/components/portal/ChangeRequests";
import ProjectFiles from "@/components/portal/ProjectFiles";

type ProfileRow = {
  id: string;
  full_name: string | null;
  company: string | null;
  email: string | null;
  phone: string | null;
};

type ProjectRow = {
  id: string;
  user_id: string;
  type: string | null;
  status: string | null;
  vercel_url: string | null;
};

type StageRow = {
  project_id: string;
  stage_name: string | null;
  stage_order: number;
  status: "pending" | "in-progress" | "complete" | string | null;
  completed_at: string | null;
};

type ToastState = {
  message: string;
  tone: "success" | "error";
};

const inputClass =
  "w-full rounded-lg border border-[#1E2D3D] bg-[#0D1B2A] px-4 py-3 text-[#F5F7FA] outline-none focus:border-[#1B77F2]";

const stageVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.05,
      duration: 0.24,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function formatStageName(stageName: string | null) {
  return stageName === "Brief Received" ? "Details Received" : stageName;
}

export default function AdminClientDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const supabase = useMemo(() => createClient(), []);

  const clientId = params.id;
  const [isCheckingRole, setIsCheckingRole] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [adminUserId, setAdminUserId] = useState("");
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [project, setProject] = useState<ProjectRow | null>(null);
  const [stages, setStages] = useState<StageRow[]>([]);
  const [form, setForm] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const [toast, setToast] = useState<ToastState | null>(null);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function checkRoleAndLoadClient() {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data: adminProfile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (adminProfile?.role !== "admin") {
        router.replace("/login");
        return;
      }

      if (!isMounted) return;

      setAdminUserId(user.id);
      setIsCheckingRole(false);
      await loadClient();

      if (isMounted) setIsLoading(false);
    }

    async function loadClient() {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("id, full_name, company, email, phone")
        .eq("id", clientId)
        .single();

      const nextProfile = profileData as ProfileRow | null;
      if (!nextProfile) return;

      const { data: projectData } = await supabase
        .from("projects")
        .select("id, user_id, type, status, vercel_url")
        .eq("user_id", clientId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      const nextProject = projectData as ProjectRow | null;

      if (isMounted) {
        setProfile(nextProfile);
        setProject(nextProject);
        setForm({
          fullName: nextProfile.full_name || "",
          company: nextProfile.company || "",
          email: nextProfile.email || "",
          phone: nextProfile.phone || "",
        });
        setPreviewUrl(nextProject?.vercel_url || "");
      }

      if (nextProject) {
        await loadStages(nextProject.id);
      }
    }

    async function loadStages(projectId: string) {
      const { data: stageData } = await supabase
        .from("project_stages")
        .select("project_id, stage_name, stage_order, status, completed_at")
        .eq("project_id", projectId)
        .order("stage_order", { ascending: true });

      if (isMounted) {
        setStages((stageData ?? []) as StageRow[]);
      }
    }

    checkRoleAndLoadClient();

    return () => {
      isMounted = false;
    };
  }, [clientId, router, supabase]);

  function showToast(message: string, tone: ToastState["tone"] = "success") {
    setToast({ message, tone });
    window.setTimeout(() => setToast(null), 3000);
  }

  async function refetchStages(projectId = project?.id) {
    if (!projectId) return;

    const { data: stageData } = await supabase
      .from("project_stages")
      .select("project_id, stage_name, stage_order, status, completed_at")
      .eq("project_id", projectId)
      .order("stage_order", { ascending: true });

    setStages((stageData ?? []) as StageRow[]);
  }

  async function handleSaveProfile() {
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: form.fullName,
        company: form.company,
        phone: form.phone,
      })
      .eq("id", clientId);

    if (error) {
      showToast(error.message || "Could not update client", "error");
      return;
    }

    setProfile((current) =>
      current
        ? {
            ...current,
            full_name: form.fullName,
            company: form.company,
            phone: form.phone,
          }
        : current,
    );
    showToast("Client updated");
  }

  async function handleStageUpdate(stage: StageRow, status: "in-progress" | "complete") {
    if (!project) return;

    const updatePayload =
      status === "complete"
        ? { status, completed_at: new Date().toISOString() }
        : { status, completed_at: null };

    const { error } = await supabase
      .from("project_stages")
      .update(updatePayload)
      .eq("project_id", stage.project_id)
      .eq("stage_order", stage.stage_order);

    if (error) {
      showToast(error.message || "Could not update stage", "error");
      return;
    }

    await refetchStages(project.id);
  }

  async function handleSavePreviewUrl() {
    if (!project) return;

    const { error } = await supabase
      .from("projects")
      .update({ vercel_url: previewUrl })
      .eq("id", project.id);

    if (error) {
      showToast(error.message || "Could not save preview URL", "error");
      return;
    }

    setProject({ ...project, vercel_url: previewUrl });
    showToast("Preview URL saved");
  }

  async function handleResetPassword() {
    if (newPassword.length < 8) {
      showToast("Password must be at least 8 characters", "error");
      return;
    }

    const response = await fetch("/api/admin/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: clientId, newPassword }),
    });

    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      showToast(body?.error || "Could not reset password", "error");
      return;
    }

    setNewPassword("");
    setIsResetOpen(false);
    showToast("Password reset");
  }

  function formatDate(value: string | null) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return dateFormatter.format(date);
  }

  if (isCheckingRole) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#0D1B2A]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/admin"
          className="mb-6 inline-block text-sm font-semibold text-[#8892A4] transition-colors hover:text-[#F5F7FA]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          &larr; All clients
        </Link>

        {toast ? (
          <div
            className={`mb-5 text-sm font-semibold ${
              toast.tone === "success" ? "text-[#00D4AA]" : "text-[#FF6B6B]"
            }`}
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {toast.message}
          </div>
        ) : null}

        {isLoading ? (
          <p className="text-[#8892A4]" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Loading...
          </p>
        ) : (
          <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,40%)_minmax(0,60%)]">
            <section className="rounded-xl border border-[#1E2D3D] bg-[#111F2E] p-6">
              <h1
                className="mb-6 text-[20px] font-bold leading-tight text-[#F5F7FA]"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Client Details
              </h1>

              <div className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm text-[#8892A4]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    Full name
                  </span>
                  <input
                    value={form.fullName}
                    onChange={(event) => setForm({ ...form, fullName: event.target.value })}
                    className={inputClass}
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-[#8892A4]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    Company
                  </span>
                  <input
                    value={form.company}
                    onChange={(event) => setForm({ ...form, company: event.target.value })}
                    className={inputClass}
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-[#8892A4]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    Email
                  </span>
                  <input
                    value={form.email}
                    readOnly
                    className={`${inputClass} cursor-not-allowed text-[#8892A4] opacity-70`}
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-[#8892A4]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    Phone
                  </span>
                  <input
                    value={form.phone}
                    onChange={(event) => setForm({ ...form, phone: event.target.value })}
                    className={inputClass}
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="rounded-full bg-[#1B77F2] px-5 py-2.5 text-sm font-semibold text-[#F5F7FA]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Save changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsResetOpen((current) => !current)}
                  className="rounded-full bg-white/[0.05] px-5 py-2.5 text-sm font-semibold text-[#F5F7FA]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Reset password
                </button>
              </div>

              {isResetOpen ? (
                <div className="mt-5 rounded-lg border border-[#1E2D3D] bg-[#0D1B2A] p-4">
                  <label className="block">
                    <span className="mb-2 block text-sm text-[#8892A4]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      New password
                    </span>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      className={inputClass}
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="mt-4 rounded-full bg-[#1B77F2] px-5 py-2.5 text-sm font-semibold text-[#F5F7FA]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    Save new password
                  </button>
                </div>
              ) : null}
            </section>

            <section className="rounded-xl border border-[#1E2D3D] bg-[#111F2E] p-6">
              <h2
                className="mb-6 text-[20px] font-bold leading-tight text-[#F5F7FA]"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Website Stages
              </h2>

              <div className="relative space-y-5">
                <div className="absolute bottom-7 left-[13px] top-4 w-[2px] bg-[#1E2D3D]" />
                {stages.map((stage, index) => {
                  const previousStage = stages[index - 1];
                  const isFirstStage = stage.stage_order === 1;
                  const isComplete = stage.status === "complete";
                  const isInProgress = stage.status === "in-progress";
                  const canStart =
                    stage.status === "pending" &&
                    previousStage?.status === "complete" &&
                    !isFirstStage;

                  return (
                    <motion.div
                      key={`${stage.project_id}-${stage.stage_order}`}
                      custom={index}
                      initial={shouldReduceMotion ? false : "hidden"}
                      animate={shouldReduceMotion ? undefined : "visible"}
                      variants={stageVariants}
                      className="relative flex items-center gap-4"
                    >
                      <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center bg-[#111F2E]">
                        {isComplete ? (
                          <CheckCircle2 size={24} color="#00D4AA" fill="#00D4AA" stroke="#111F2E" />
                        ) : isInProgress ? (
                          <span className="relative flex h-7 w-7 items-center justify-center">
                            <span className="absolute h-7 w-7 animate-ping rounded-full bg-[#1B77F2]/30" />
                            <Circle size={22} color="#1B77F2" fill="#1B77F2" />
                          </span>
                        ) : (
                          <Circle size={22} color="#1E2D3D" />
                        )}
                      </div>

                      <div className="grid min-w-0 flex-1 grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_150px_150px] md:items-center">
                        <p
                          className="text-[16px] font-medium text-[#F5F7FA]"
                          style={{ fontFamily: "var(--font-dm-sans)" }}
                        >
                          {formatStageName(stage.stage_name)}
                        </p>
                        <p
                          className="text-left text-[13px] text-[#8892A4] md:text-right"
                          style={{ fontFamily: "var(--font-dm-sans)" }}
                        >
                          {isComplete ? formatDate(stage.completed_at) : ""}
                        </p>
                        <div className="text-left md:text-right">
                          {isComplete ? (
                            <span
                              className="text-sm font-semibold text-[#00D4AA]"
                              style={{ fontFamily: "var(--font-dm-sans)" }}
                            >
                              Completed &#10003;
                            </span>
                          ) : isFirstStage ? null : isInProgress ? (
                            <button
                              type="button"
                              onClick={() => handleStageUpdate(stage, "complete")}
                              className="rounded-full px-4 py-2 text-sm font-semibold text-[#00D4AA] transition-colors hover:bg-white/[0.05]"
                              style={{ fontFamily: "var(--font-dm-sans)" }}
                            >
                              Mark complete
                            </button>
                          ) : canStart ? (
                            <button
                              type="button"
                              onClick={() => handleStageUpdate(stage, "in-progress")}
                              className="rounded-full bg-white/[0.05] px-4 py-2 text-sm font-semibold text-[#F5F7FA]"
                              style={{ fontFamily: "var(--font-dm-sans)" }}
                            >
                              Mark in progress
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-8 border-t border-[#1E2D3D] pt-6">
                <label className="block">
                  <span
                    className="mb-2 block text-[13px] font-semibold uppercase text-[#8892A4]"
                    style={{ fontFamily: "var(--font-dm-sans)", letterSpacing: "0.08em" }}
                  >
                    Preview URL
                  </span>
                  <input
                    value={previewUrl}
                    onChange={(event) => setPreviewUrl(event.target.value)}
                    className={inputClass}
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                    placeholder="https://..."
                    disabled={!project}
                  />
                </label>
                <button
                  type="button"
                  onClick={handleSavePreviewUrl}
                  disabled={!project}
                  className="mt-4 rounded-full bg-white/[0.05] px-5 py-2.5 text-sm font-semibold text-[#F5F7FA] disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Save URL
                </button>
              </div>
            </section>
          </div>
          {project ? (
            <div className="mt-6">
              <ChangeRequests
                projectId={project.id}
                currentUserId={adminUserId}
                isAdmin={true}
                reviewStageActive={true}
              />
            </div>
          ) : null}
          {project ? (
            <div className="mt-6">
              <ProjectFiles
                projectId={project.id}
                currentUserId={adminUserId}
                isAdmin={true}
              />
            </div>
          ) : null}
          </>
        )}
      </div>
    </main>
  );
}
