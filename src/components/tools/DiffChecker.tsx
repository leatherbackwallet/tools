"use client";

import { useState, useMemo } from "react";

interface DiffLine {
  type: "same" | "added" | "removed";
  text: string;
}

function computeDiff(oldText: string, newText: string): DiffLine[] {
  const oldLines = oldText.split("\n");
  const newLines = newText.split("\n");
  const result: DiffLine[] = [];
  const maxLen = Math.max(oldLines.length, newLines.length);

  for (let i = 0; i < maxLen; i++) {
    const oldLine = oldLines[i];
    const newLine = newLines[i];
    if (oldLine === undefined) {
      result.push({ type: "added", text: newLine });
    } else if (newLine === undefined) {
      result.push({ type: "removed", text: oldLine });
    } else if (oldLine === newLine) {
      result.push({ type: "same", text: oldLine });
    } else {
      result.push({ type: "removed", text: oldLine });
      result.push({ type: "added", text: newLine });
    }
  }
  return result;
}

export default function DiffChecker() {
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");

  const diff = useMemo(() => {
    if (!oldText && !newText) return [];
    return computeDiff(oldText, newText);
  }, [oldText, newText]);

  const added = diff.filter((d) => d.type === "added").length;
  const removed = diff.filter((d) => d.type === "removed").length;

  return (
    <div className="tool-layout">
      <div className="tool-cols">
        <div className="tool-pane">
          <label className="tool-label">Original Text</label>
          <textarea className="tool-textarea tool-textarea--tall" value={oldText} onChange={(e) => setOldText(e.target.value)} placeholder="Paste original text here…" spellCheck={false} />
        </div>
        <div className="tool-pane">
          <label className="tool-label">Changed Text</label>
          <textarea className="tool-textarea tool-textarea--tall" value={newText} onChange={(e) => setNewText(e.target.value)} placeholder="Paste modified text here…" spellCheck={false} />
        </div>
      </div>

      {diff.length > 0 && (
        <div className="tool-diff-result">
          <div className="tool-diff-summary">
            <span className="tool-badge tool-badge--pass">+{added} added</span>
            <span className="tool-badge tool-badge--fail">−{removed} removed</span>
          </div>
          <div className="tool-diff-lines">
            {diff.map((d, i) => (
              <div key={i} className={`tool-diff-line tool-diff-line--${d.type}`}>
                <span className="tool-diff-prefix">{d.type === "added" ? "+" : d.type === "removed" ? "−" : " "}</span>
                <span>{d.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}