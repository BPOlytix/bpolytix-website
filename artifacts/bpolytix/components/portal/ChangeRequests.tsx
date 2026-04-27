"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clipboard, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type ChangeRequest = {
  id: string;
  project_id: string;
  submitted_by: string;
  description: string;
  screenshot_path: string | null;
  status: "pending" | "noted" | "done";
  created_at: string;
  updated_at: string;
};

type Props = {
  projectId: string;
  currentUserId: string;
  isAdmin: boolean;
  reviewStageActive: boolean;
};

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function StatusBadge({ status }: { status: string }) {
  if (status === "noted") {
    return (
      <span
        className="rounded-full bg-[#1B77F2]/20 px-2.5 py-1 text-[12px] font-medium text-[#1B77F2]"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        Noted
      </span>
    );
  }
  if (status === "done") {
    return (
      <span
        className="rounded-full bg-[#00D4AA]/20 px-2.5 py-1 text-[12px] font-medium text-[#00D4AA]"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        Done
      </span>
    );
  }
  return (
    <span
      className="rounded-full bg-[#FF9F43]/20 px-2.5 py-1 text-[12px] font-medium text-[#FF9F43]"
      style={{ fontFamily: "var(--font-dm-sans)" }}
    >
      Pending
    </span>
  );
}

function ScreenshotThumb({
  path,
  supabase,
}: {
  path: string | null;
  supabase: ReturnType<typeof createClient>;
}) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!path) {
      setUrl(null);
      return;
    }

    supabase.storage
      .from("project-files")
      .createSignedUrl(path, 60)
      .then(({ data }) => {
        if (data?.signedUrl) setUrl(data.signedUrl);
      });
  }, [path, supabase]);

  if (!url) {
    return (
      <div className="h-[60px] w-[80px] shrink-0 animate-pulse rounded bg-[#1E2D3D]" />
    );
  }

  async function openFullImage() {
    if (!path) return;

    const { data } = await supabase.storage.from("project-files").createSignedUrl(path, 60);
    if (data?.signedUrl) {
      window.open(data.signedUrl, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <img
      src={url}
      alt="Change request screenshot"
      className="w-[80px] shrink-0 cursor-pointer rounded object-cover transition-opacity hover:opacity-75"
      onClick={openFullImage}
    />
  );
}

export default function ChangeRequests({
  projectId,
  currentUserId,
  isAdmin,
  reviewStageActive,
}: Props) {
  const supabase = useMemo(() => createClient(), []);
  const shouldReduceMotion = useReducedMotion();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [requests, setRequests] = useState<ChangeRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [screenshot, setScreenshot] = useState<Blob | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const loadRequests = useCallback(async () => {
    const { data } = await supabase
      .from("change_requests")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    if (data) {
      setRequests(data as ChangeRequest[]);
    }
    setIsLoading(false);
  }, [supabase, projectId]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  useEffect(() => {
    if (isAdmin || !reviewStageActive) return;

    function handlePaste(event: ClipboardEvent) {
      if (isSubmitting) return;

      const items = event.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          const blob = item.getAsFile();
          if (blob) {
            setScreenshot(blob);
            setScreenshotPreview(URL.createObjectURL(blob));
          }
          break;
        }
      }
    }

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [isAdmin, isSubmitting, reviewStageActive]);

  useEffect(() => {
    return () => {
      if (screenshotPreview) URL.revokeObjectURL(screenshotPreview);
    };
  }, [screenshotPreview]);

  function setImageFile(file: File) {
    if (screenshotPreview) URL.revokeObjectURL(screenshotPreview);
    setScreenshot(file);
    setScreenshotPreview(URL.createObjectURL(file));
  }

  function clearScreenshot() {
    if (screenshotPreview) URL.revokeObjectURL(screenshotPreview);
    setScreenshot(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) setImageFile(file);
  }

  function handleDrop(event: React.DragEvent) {
    event.preventDefault();
    setIsDragOver(false);
    if (isSubmitting) return;

    const file = event.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) setImageFile(file);
  }

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 3000);
  }

  async function handleSubmit() {
    if (!screenshot || !description.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const storagePath = `${projectId}/change-requests/${Date.now()}.png`;

    const { error: storageErr } = await supabase.storage
      .from("project-files")
      .upload(storagePath, screenshot, { contentType: screenshot.type || "image/png" });

    if (storageErr) {
      setIsSubmitting(false);
      return;
    }

    const { error: dbErr } = await supabase.from("change_requests").insert({
      project_id: projectId,
      submitted_by: currentUserId,
      description: description.trim(),
      screenshot_path: storagePath,
      status: "pending",
    });

    if (dbErr) {
      setIsSubmitting(false);
      return;
    }

    clearScreenshot();
    setDescription("");
    setIsSubmitting(false);
    showToast("Change request submitted");
    await loadRequests();
  }

  async function handleStatusChange(requestId: string, newStatus: string) {
    await supabase
      .from("change_requests")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", requestId);

    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId ? { ...r, status: newStatus as ChangeRequest["status"] } : r,
      ),
    );
  }

  const dropZoneClass = [
    "relative flex h-[160px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed transition-colors duration-150",
    isDragOver
      ? "border-[#1B77F2] bg-[#1B77F2]/5"
      : "border-[#1E2D3D] hover:border-[#1B77F2] hover:bg-[#1B77F2]/5",
  ].join(" ");

  const canSubmit = !isSubmitting && !!screenshot && description.trim().length > 0;
  const listTopMargin = !isAdmin && reviewStageActive ? "mt-8" : "mt-4";

  return (
    <>
      {toast ? (
        <div
          className="fixed bottom-6 right-6 z-50 rounded-lg border border-[#00D4AA] bg-[#111F2E] p-4 text-[14px] font-semibold text-[#00D4AA]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {toast}
        </div>
      ) : null}

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="rounded-xl border border-[#1E2D3D] bg-[#111F2E] p-6"
      >
        {/* Header */}
        <div className="mb-5">
          <h2
            className="text-[20px] font-bold text-[#F5F7FA]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {isAdmin ? "Change Requests" : "Request Changes"}
          </h2>
          <p
            className="mt-1 text-[14px] text-[#8892A4]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {isAdmin
              ? "Client-submitted change requests with screenshots"
              : "Take a screenshot, paste it here, and describe what you'd like changed"}
          </p>
        </div>

        {/* Client form */}
        {!isAdmin ? (
          !reviewStageActive ? (
            <p
              className="text-[14px] italic text-[#8892A4]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Change requests will be available during the Client Review stage.
            </p>
          ) : (
            <>
              {/* Drop zone / preview */}
              {!screenshotPreview ? (
                <div
                  role="button"
                  tabIndex={0}
                  className={dropZoneClass}
                  onClick={() => {
                    if (!isSubmitting) fileInputRef.current?.click();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isSubmitting) fileInputRef.current?.click();
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (isSubmitting) return;
                    setIsDragOver(true);
                  }}
                  onDragEnter={(e) => {
                    e.preventDefault();
                    if (isSubmitting) return;
                    setIsDragOver(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);
                  }}
                  onDrop={handleDrop}
                >
                  <Clipboard size={22} color="#8892A4" />
                  <p
                    className="text-center text-[14px] text-[#8892A4]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    Paste a screenshot (Ctrl+V) or click to upload
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={isSubmitting}
                  />
                </div>
              ) : (
                <div className="relative inline-block">
                  <img
                    src={screenshotPreview}
                    alt="Screenshot preview"
                    className="max-h-[200px] rounded-lg border border-[#1E2D3D] object-contain"
                  />
                  <button
                    type="button"
                    onClick={clearScreenshot}
                    aria-label="Remove screenshot"
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-[#1E2D3D] bg-[#0D1B2A] text-[#8892A4] transition-colors hover:text-[#F5F7FA]"
                    disabled={isSubmitting}
                  >
                    <X size={12} />
                  </button>
                  <p
                    className="mt-2 text-[13px] text-[#00D4AA]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    Screenshot attached ✓
                  </p>
                </div>
              )}

              {/* Description */}
              <div className="mt-4">
                <label
                  className="mb-2 block text-[13px] text-[#8892A4]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Describe the change
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Move the logo to the left, change the headline text to..."
                  className="min-h-[100px] w-full resize-y rounded-lg border border-[#1E2D3D] bg-[#0D1B2A] px-4 py-3 text-[14px] text-[#F5F7FA] outline-none placeholder:text-[#8892A4] focus:border-[#1B77F2]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                  disabled={isSubmitting}
                />
              </div>

              {/* Submit */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1B77F2] px-5 py-2.5 text-[14px] font-semibold text-[#F5F7FA] transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {isSubmitting ? (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : null}
                {isSubmitting ? "Submitting…" : "Submit change request"}
              </button>
            </>
          )
        ) : null}

        {/* Requests list */}
        <div className={listTopMargin}>
          {isLoading ? (
            <p
              className="text-[14px] text-[#8892A4]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Loading…
            </p>
          ) : requests.length === 0 ? (
            <p
              className="text-[14px] text-[#8892A4]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {isAdmin
                ? "No change requests from this client yet."
                : "No change requests submitted yet."}
            </p>
          ) : (
            <>
              {!isAdmin ? (
                <h3
                  className="mb-3 text-[16px] font-bold text-[#F5F7FA]"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Your change requests
                </h3>
              ) : null}
              <AnimatePresence initial={false}>
                {requests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.22,
                      delay: index * 0.04,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="mb-3 flex flex-col gap-3 rounded-lg border border-[#1E2D3D] bg-[#0D1B2A] p-4 sm:flex-row sm:items-start"
                  >
                    <ScreenshotThumb path={request.screenshot_path} supabase={supabase} />

                    <div className="min-w-0 flex-1">
                      <p
                        className="text-[14px] text-[#F5F7FA]"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {request.description}
                      </p>
                      <p
                        className="mt-1 text-[12px] text-[#8892A4]"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {dateFormatter.format(new Date(request.created_at))}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <StatusBadge status={request.status} />
                        {isAdmin ? (
                          <select
                            value={request.status}
                            onChange={(e) => handleStatusChange(request.id, e.target.value)}
                            className="rounded-lg border border-[#1E2D3D] bg-[#0D1B2A] px-3 py-1 text-[13px] text-[#F5F7FA] outline-none focus:border-[#1B77F2]"
                            style={{ fontFamily: "var(--font-dm-sans)" }}
                          >
                            <option value="pending">Pending</option>
                            <option value="noted">Noted</option>
                            <option value="done">Done</option>
                          </select>
                        ) : null}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}
