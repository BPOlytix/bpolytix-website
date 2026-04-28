"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type ProfileRow = {
  id: string;
  full_name: string | null;
  company: string | null;
  email: string | null;
  created_at: string | null;
};

type ProjectRow = {
  id: string;
  user_id: string;
  type: string | null;
  status: "in-progress" | "complete" | "cancelled" | string | null;
  created_at: string | null;
};

type StageRow = {
  project_id: string;
  stage_name: string | null;
  stage_order: number | null;
};

type ClientRow = {
  id: string;
  fullName: string;
  company: string;
  email: string;
  projectType: string;
  status: ProjectRow["status"];
  currentStage: string;
  createdAt: string | null;
};

const statusStyles: Record<string, string> = {
  "in-progress": "bg-[#1B77F2]/20 text-[#1B77F2]",
  complete: "bg-[#00D4AA]/20 text-[#00D4AA]",
  cancelled: "bg-[#FF6B6B]/20 text-[#FF6B6B]",
};

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export default function AdminPage() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [isCheckingRole, setIsCheckingRole] = useState(true);
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [isLoadingClients, setIsLoadingClients] = useState(false);

  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    let isMounted = true;

    async function checkRoleAndLoadClients() {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role !== "admin") {
        router.replace("/login");
        return;
      }

      if (!isMounted) return;

      setIsCheckingRole(false);
      setIsLoadingClients(true);
      await loadClients();

      if (isMounted) {
        setIsLoadingClients(false);
      }
    }

    async function loadClients() {
      const { data: profileRows } = await supabase
        .from("profiles")
        .select("id, full_name, company, email, created_at")
        .eq("role", "client")
        .order("created_at", { ascending: false });

      const profiles = (profileRows ?? []) as ProfileRow[];
      const profileIds = profiles.map((profile) => profile.id);

      if (profileIds.length === 0) {
        if (isMounted) setClients([]);
        return;
      }

      const { data: projectRows } = await supabase
        .from("projects")
        .select("id, user_id, type, status, created_at")
        .in("user_id", profileIds)
        .order("created_at", { ascending: false });

      const projects = (projectRows ?? []) as ProjectRow[];
      const latestProjectByUser = new Map<string, ProjectRow>();

      projects.forEach((project) => {
        if (!latestProjectByUser.has(project.user_id)) {
          latestProjectByUser.set(project.user_id, project);
        }
      });

      const projectIds = projects.map((project) => project.id);
      const latestStageByProject = new Map<string, StageRow>();

      if (projectIds.length > 0) {
        const { data: stageRows } = await supabase
          .from("project_stages")
          .select("project_id, stage_name, stage_order")
          .in("project_id", projectIds)
          .eq("status", "complete")
          .order("stage_order", { ascending: false });

        ((stageRows ?? []) as StageRow[]).forEach((stage) => {
          if (!latestStageByProject.has(stage.project_id)) {
            latestStageByProject.set(stage.project_id, stage);
          }
        });
      }

      const nextClients = profiles.map((profile) => {
        const project = latestProjectByUser.get(profile.id);
        const currentStage = project ? latestStageByProject.get(project.id) : null;

        return {
          id: profile.id,
          fullName: profile.full_name || "Unnamed client",
          company: profile.company || "-",
          email: profile.email || "-",
          projectType: formatProjectType(project?.type || null),
          status: project?.status || "in-progress",
          currentStage: formatStageName(currentStage?.stage_name || null),
          createdAt: project?.created_at || profile.created_at,
        };
      });

      if (isMounted) setClients(nextClients);
    }

    checkRoleAndLoadClients();

    return () => {
      isMounted = false;
    };
  }, [router, supabase]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  function formatDate(value: string | null) {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return dateFormatter.format(date);
  }

  function formatProjectType(type: string | null) {
    if (type === "web-build") return "Website";
    return type || "-";
  }

  function formatStageName(stageName: string | null) {
    return stageName === "Brief Received" ? "Details Received" : stageName || "-";
  }

  if (isCheckingRole) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#0D1B2A]">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mx-auto max-w-6xl px-6 py-10"
      >
        <header className="mb-8 flex items-center justify-between gap-4">
          <h1
            className="text-[24px] font-bold leading-tight text-[#F5F7FA]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Admin Portal
          </h1>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-full bg-[#1B77F2] px-5 py-2.5 text-sm font-semibold text-[#F5F7FA] transition-opacity hover:opacity-90"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Sign out
          </button>
        </header>

        <section className="overflow-hidden rounded-xl border border-[#1E2D3D] bg-[#111F2E]">
          {clients.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p
                className="text-[15px] text-[#8892A4]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {isLoadingClients
                  ? "Loading clients..."
                  : "No clients yet. Clients will appear here after they send their details."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] border-collapse">
                <thead>
                  <tr className="border-b border-[#1E2D3D]">
                    {[
                      "Client name",
                      "Company",
                      "Email",
                      "Project type",
                      "Status",
                      "Current stage",
                      "Created at",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-5 py-4 text-left text-[13px] font-semibold uppercase text-[#8892A4]"
                        style={{
                          fontFamily: "var(--font-dm-sans)",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr
                      key={client.id}
                      onClick={() => router.push(`/admin/clients/${client.id}`)}
                      className="cursor-pointer border-b border-[#1E2D3D] transition-colors duration-200 last:border-b-0 hover:bg-[#1E2D3D]"
                    >
                      <td
                        className="px-5 py-4 text-[15px] font-medium text-[#F5F7FA]"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {client.fullName}
                      </td>
                      <td className="px-5 py-4 text-[15px] text-[#F5F7FA]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {client.company}
                      </td>
                      <td className="px-5 py-4 text-[15px] text-[#F5F7FA]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {client.email}
                      </td>
                      <td className="px-5 py-4 text-[15px] text-[#F5F7FA]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {client.projectType}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-[13px] font-semibold ${
                            statusStyles[client.status || ""] || statusStyles["in-progress"]
                          }`}
                          style={{ fontFamily: "var(--font-dm-sans)" }}
                        >
                          {client.status || "in-progress"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[15px] text-[#F5F7FA]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {client.currentStage}
                      </td>
                      <td className="px-5 py-4 text-[15px] text-[#F5F7FA]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {formatDate(client.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </motion.div>
    </main>
  );
}
