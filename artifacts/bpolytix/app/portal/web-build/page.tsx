"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle2, Circle, Maximize2 } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import ProjectFiles from "@/components/portal/ProjectFiles";

type ProfileRow = {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string | null;
};

type StageRow = {
  id?: string;
  project_id: string;
  stage_name: string | null;
  stage_order: number;
  status: "pending" | "in-progress" | "complete" | string | null;
  completed_at: string | null;
};

type ProjectRow = {
  id: string;
  user_id: string;
  type: string | null;
  status: string | null;
  vercel_url: string | null;
  project_stages?: StageRow[] | null;
};

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
});

export default function WebBuildPortalPage() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const supabase = useMemo(() => createClient(), []);

  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [project, setProject] = useState<ProjectRow | null>(null);
  const [stages, setStages] = useState<StageRow[]>([]);

  const sortedStages = useMemo(
    () => [...stages].sort((a, b) => a.stage_order - b.stage_order),
    [stages],
  );
  const completeCount = sortedStages.filter((stage) => stage.status === "complete").length;
  const totalStages = sortedStages.length || 7;
  const progressPercent = Math.min(100, (completeCount / totalStages) * 100);
  const previewUrl = project?.vercel_url?.trim() || "";

  const loadPortal = useCallback(async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      router.replace("/login");
      return;
    }

    const { data: profileData } = await supabase
      .from("profiles")
      .select("id, full_name, email, role")
      .eq("id", user.id)
      .single();

    setProfile((profileData ?? null) as ProfileRow | null);

    const { data: projectData } = await supabase
      .from("projects")
      .select("*, project_stages(*)")
      .eq("user_id", user.id)
      .eq("type", "web-build")
      .maybeSingle();

    const nextProject = projectData as ProjectRow | null;
    const nextStages = [...(nextProject?.project_stages ?? [])].sort(
      (a, b) => a.stage_order - b.stage_order,
    );

    setProject(nextProject);
    setStages(nextStages);
    setIsLoading(false);
  }, [router, supabase]);

  useEffect(() => {
    loadPortal();
  }, [loadPortal]);

  useEffect(() => {
    if (!project?.id) return;

    const channel = supabase
      .channel(`web-build-${project.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "project_stages",
          filter: `project_id=eq.${project.id}`,
        },
        () => {
          loadPortal();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "projects",
          filter: `id=eq.${project.id}`,
        },
        () => {
          loadPortal();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadPortal, project?.id, supabase]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  function formatDate(value: string | null) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return dateFormatter.format(date);
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0D1B2A] px-6">
        <p className="text-[#8892A4]" style={{ fontFamily: "var(--font-dm-sans)" }}>
          Loading...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0D1B2A] text-[#F5F7FA]">
      <header className="grid items-center gap-4 border-b border-[#1E2D3D] bg-[#111F2E] px-6 py-4 md:grid-cols-[1fr_auto_1fr]">
        <a
          href="https://bpolytix.com"
          target="_blank"
          rel="noreferrer"
          className="text-[20px] font-bold text-[#F5F7FA]"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          BPOLytix
        </a>
        <p
          className="text-left text-[18px] font-bold text-[#8892A4] md:text-center"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Web Build Portal
        </p>
        <div className="flex items-center gap-4 md:justify-end">
          <span
            className="truncate text-sm text-[#F5F7FA]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {profile?.full_name || "Client"}
          </span>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-full bg-white/[0.05] px-4 py-2 text-sm font-semibold text-[#F5F7FA]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Sign out
          </button>
        </div>
      </header>

      {!project ? (
        <section className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6 py-12">
          <div className="max-w-md text-center">
            <h1
              className="text-[24px] font-bold text-[#F5F7FA]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              No active web build.
            </h1>
            <p
              className="mt-3 text-[15px] text-[#8892A4]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Contact us to get started.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-full bg-[#1B77F2] px-5 py-2.5 text-sm font-semibold text-[#F5F7FA]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Contact us
            </Link>
          </div>
        </section>
      ) : (
        <>
        <section className="grid gap-6 px-6 py-6 md:min-h-[calc(100vh-73px)] md:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-xl bg-[#111F2E] p-6 md:min-h-full">
            <div className="mb-6">
              <h1
                className="text-[18px] font-bold text-[#F5F7FA]"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Build Progress
              </h1>
              <p
                className="mt-2 text-[14px] text-[#8892A4]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Your website build in real time
              </p>
            </div>

            <div className="md:hidden">
              <div className="flex items-center gap-2">
                {sortedStages.map((stage) => (
                  <span
                    key={`${stage.project_id}-${stage.stage_order}`}
                    className={`h-3 flex-1 rounded-full ${
                      stage.status === "complete"
                        ? "bg-[#00D4AA]"
                        : stage.status === "in-progress"
                          ? "bg-[#1B77F2]"
                          : "bg-[#1E2D3D]"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative hidden space-y-5 md:block">
              <div className="absolute bottom-7 left-[13px] top-4 w-[2px] bg-[#1E2D3D]" />
              {sortedStages.map((stage, index) => (
                <StageItem
                  key={`${stage.project_id}-${stage.stage_order}`}
                  stage={stage}
                  index={index}
                  shouldReduceMotion={shouldReduceMotion}
                  formatDate={formatDate}
                />
              ))}
            </div>

            <div className="mt-7">
              <p
                className="text-[14px] text-[#8892A4]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {completeCount} of 7 stages complete
              </p>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-[#1E2D3D]">
                <div
                  className="h-full rounded-full bg-[#00D4AA] transition-[width] duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </aside>

          <section className="min-h-[560px] overflow-hidden rounded-xl bg-[#111F2E] md:min-h-full">
            {previewUrl ? (
              <div className="flex h-full min-h-[560px] flex-col p-4">
                <div className="mb-4 rounded-lg bg-[#0D1B2A] px-4 py-2">
                  <p
                    className="truncate text-[13px] text-[#8892A4]"
                    style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
                  >
                    {previewUrl}
                  </p>
                </div>
                <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg">
                  <iframe
                    src={previewUrl}
                    title="Website preview"
                    className="h-full min-h-[480px] w-full border-0"
                  />
                  <button
                    type="button"
                    onClick={() => window.open(previewUrl, "_blank")}
                    className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-[#1B77F2] px-4 py-2 text-sm font-semibold text-[#F5F7FA]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    <Maximize2 size={16} />
                    View full screen
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[560px] items-center justify-center px-6 py-12 text-center md:min-h-full">
                <div>
                  <motion.div
                    animate={shouldReduceMotion ? undefined : { y: [-4, 4, -4] }}
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    className="mx-auto w-full max-w-[420px]"
                  >
                    <div className="rounded-2xl border border-[#1E2D3D] bg-[#0D1B2A] p-4">
                      <div className="mb-6 flex gap-2">
                        <span className="h-3 w-3 rounded-full bg-[#1E2D3D]" />
                        <span className="h-3 w-3 rounded-full bg-[#1E2D3D]" />
                        <span className="h-3 w-3 rounded-full bg-[#1E2D3D]" />
                      </div>
                      <div className="space-y-4 py-6">
                        <span className="shimmer-bar block h-4 w-[60%] rounded-full" />
                        <span className="shimmer-bar block h-4 w-[80%] rounded-full" />
                        <span className="shimmer-bar block h-4 w-[40%] rounded-full" />
                      </div>
                    </div>
                  </motion.div>
                  <h2
                    className="mt-8 text-[20px] font-bold text-[#F5F7FA]"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    Your website is currently being built
                  </h2>
                  <p
                    className="mt-2 text-[14px] text-[#8892A4]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    We'll notify you when it's ready for review
                  </p>
                </div>
              </div>
            )}
          </section>
        </section>
        <div className="px-6 pb-8">
          <ProjectFiles
            projectId={project.id}
            currentUserId={profile?.id ?? ""}
            isAdmin={false}
          />
        </div>
        </>
      )}

      <style jsx>{`
        .shimmer-bar {
          background: linear-gradient(
            90deg,
            #1e2d3d 0%,
            #2a3a4d 50%,
            #1e2d3d 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </main>
  );
}

function StageItem({
  stage,
  index,
  shouldReduceMotion,
  formatDate,
}: {
  stage: StageRow;
  index: number;
  shouldReduceMotion: boolean | null;
  formatDate: (value: string | null) => string;
}) {
  const isComplete = stage.status === "complete";
  const isInProgress = stage.status === "in-progress";

  return (
    <motion.div
      custom={index}
      initial={shouldReduceMotion ? false : "hidden"}
      animate={shouldReduceMotion ? undefined : "visible"}
      variants={stageVariants}
      className="relative flex gap-3"
    >
      <div className="relative z-10 flex h-7 w-7 shrink-0 items-start justify-center bg-[#111F2E] pt-0.5">
        {isComplete ? (
          <CheckCircle2 size={23} color="#00D4AA" fill="#00D4AA" stroke="#111F2E" />
        ) : isInProgress ? (
          <span className="relative flex h-7 w-7 items-center justify-center">
            <span className="absolute h-7 w-7 animate-ping rounded-full bg-[#1B77F2]/30" />
            <Circle size={21} color="#1B77F2" fill="#1B77F2" />
          </span>
        ) : (
          <Circle size={21} color="#1E2D3D" />
        )}
      </div>

      <div className="min-w-0 pb-1">
        <p
          className={`text-[15px] ${
            isComplete
              ? "text-[#F5F7FA]"
              : isInProgress
                ? "font-semibold text-[#1B77F2]"
                : "text-[#8892A4]"
          }`}
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {stage.stage_name}
        </p>
        {isComplete ? (
          <p
            className="mt-1 text-[12px] text-[#8892A4]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {formatDate(stage.completed_at)}
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}
