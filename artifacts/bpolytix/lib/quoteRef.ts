const STORAGE_KEY = "bpolytix-quote-ref";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";
}

function buildRef(): string {
  const year = new Date().getFullYear();
  const n = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `BPQ-${year}-${n}`;
}

export function generateQuoteRef(): string {
  if (!isBrowser()) {
    return buildRef();
  }
  try {
    const existing = window.sessionStorage.getItem(STORAGE_KEY);
    if (existing) return existing;
    const fresh = buildRef();
    window.sessionStorage.setItem(STORAGE_KEY, fresh);
    return fresh;
  } catch {
    return buildRef();
  }
}
