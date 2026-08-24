"use client";

import { useState, useCallback } from "react";
import { CopyButton } from "./ToolShell";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});

  const generate = useCallback(async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const algos: [string, string][] = [
      ["SHA-256", "SHA-256"],
      ["SHA-1", "SHA-1"],
      ["SHA-384", "SHA-384"],
      ["SHA-512", "SHA-512"],
    ];
    const results: Record<string, string> = {};
    for (const [name, algo] of algos) {
      const hashBuffer = await crypto.subtle.digest(algo, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      results[name] = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    }
    setHashes(results);
  }, [input]);

  return (
    <div className="tool-layout">
      <div className="tool-pane">
        <label className="tool-label">Input Text</label>
        <textarea className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text to hash…" spellCheck={false} />
      </div>
      <button className="tool-btn tool-btn--primary" onClick={generate} disabled={!input}>Generate Hashes</button>
      {Object.keys(hashes).length > 0 && (
        <div className="tool-hash-list">
          {Object.entries(hashes).map(([algo, hash]) => (
            <div key={algo} className="tool-hash-row">
              <div className="tool-label-row">
                <span className="tool-label">{algo}</span>
                <CopyButton text={hash} />
              </div>
              <code className="tool-hash-value">{hash}</code>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}