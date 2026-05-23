"use client";

import { useState } from "react";

interface ShareContent {
  title: string;
  text: string;
}

type ShareStatus = "idle" | "copied";

export function useProductShare({ title, text }: ShareContent) {
  const [status, setStatus] = useState<ShareStatus>("idle");

  const share = async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;

    if (typeof navigator.share === "function") {
      await navigator.share({ title, text, url }).catch(() => undefined);
      return;
    }

    if (!navigator.clipboard) return;
    const copied = await navigator.clipboard
      .writeText(url)
      .then(() => true)
      .catch(() => false);

    if (copied) {
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2000);
    }
  };

  return { share, status };
}
