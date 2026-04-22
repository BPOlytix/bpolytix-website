"use client";

import { useEffect } from "react";

export function TawkChat() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (document.querySelector('script[src*="embed.tawk.to/69e83a5ccbb7811c31e4d217"]')) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).Tawk_API = (window as any).Tawk_API || {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).Tawk_LoadStart = new Date();

    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/69e83a5ccbb7811c31e4d217/1jmpi7ura";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0?.parentNode?.insertBefore(s1, s0);
  }, []);

  return null;
}
