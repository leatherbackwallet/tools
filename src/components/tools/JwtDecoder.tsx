"use client";

import { useState } from "react";
import { CopyButton } from "./ToolShell";

export default function JwtDecoder() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const decoded = (() => {
    if (!token.trim()) return null;
    try {
      setError("");
      const parts = token.trim().split(".");
      if (parts.length < 2) { setError("Invalid JWT format"); return null; }
      const header = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
      return { header, payload };
    } catch (e: any) {
      setError("Failed to decode: " + e.message);
      return null;
    }
  })();

  const formatJSON = (obj: any) => JSON.stringify(obj, null, 2);

  const expLabel = (ts: number) => {
    if (!ts) return "";
    const d = new Date(ts * 1000);
    return d.toLocaleString();
  };

  return (
    <div className="tool-layout">
      <div className="tool-pane">
        <label className="tool-label">JWT Token</label>
        <textarea
          className="tool-textarea tool-textarea--tall"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your JWT here…"
          spellCheck={false}
        />
      </div>
      {error && <p className="tool-error">{error}</p>}
      {decoded && (
        <div className="tool-cols">
          <div className="tool-pane">
            <div className="tool-label-row">
              <span className="tool-label">Header</span>
              <CopyButton text={formatJSON(decoded.header)} />
            </div>
            <pre className="tool-code">{formatJSON(decoded.header)}</pre>
          </div>
          <div className="tool-pane">
            <div className="tool-label-row">
              <span className="tool-label">Payload</span>
              <CopyButton text={formatJSON(decoded.payload)} />
            </div>
            <pre className="tool-code">{formatJSON(decoded.payload)}</pre>
            {decoded.payload.exp && (
              <p className="tool-hint">Expires: {expLabel(decoded.payload.exp)}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}