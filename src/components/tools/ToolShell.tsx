"use client";

import { useState, useCallback } from "react";
import { useLang } from "@/lib/i18n";

export default function ToolShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const { t } = useLang();
  return (
    <div className="tool-shell">
      {children}
    </div>
  );
}

export function CopyButton({ text }: { text: string }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [text]);

  return (
    <button className="tool-btn" onClick={handleCopy} disabled={!text}>
      {copied ? t.tools.copied : t.tools.copy}
    </button>
  );
}