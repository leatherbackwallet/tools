"use client";

import { useState, useMemo } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testStr, setTestStr] = useState("");
  const [error, setError] = useState("");

  const matches = useMemo(() => {
    if (!pattern || !testStr) return [];
    try {
      setError("");
      const re = new RegExp(pattern, flags);
      const results: { match: string; index: number; groups: string[] }[] = [];
      let m: RegExpExecArray | null;
      if (flags.includes("g")) {
        while ((m = re.exec(testStr)) !== null) {
          results.push({ match: m[0], index: m.index, groups: m.slice(1) });
          if (m[0].length === 0) re.lastIndex++;
        }
      } else {
        m = re.exec(testStr);
        if (m) results.push({ match: m[0], index: m.index, groups: m.slice(1) });
      }
      return results;
    } catch (e: any) {
      setError(e.message);
      return [];
    }
  }, [pattern, flags, testStr]);

  const highlightHTML = useMemo(() => {
    if (!pattern || !testStr) return testStr;
    try {
      setError("");
      const re = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      return testStr.replace(re, (m) => `<mark class="tool-highlight">${m}</mark>`);
    } catch {
      return testStr;
    }
  }, [pattern, flags, testStr]);

  return (
    <div className="tool-layout">
      <div className="tool-row">
        <div className="tool-field">
          <label className="tool-label">Pattern</label>
          <input className="tool-input" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="e.g. \d+|[a-z]+" spellCheck={false} />
        </div>
        <div className="tool-field tool-field--narrow">
          <label className="tool-label">Flags</label>
          <input className="tool-input" value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="g" spellCheck={false} />
        </div>
      </div>
      <div className="tool-cols">
        <div className="tool-pane">
          <label className="tool-label">Test String</label>
          <textarea className="tool-textarea" value={testStr} onChange={(e) => setTestStr(e.target.value)} placeholder="Enter text to test against…" spellCheck={false} />
        </div>
        <div className="tool-pane">
          <div className="tool-label-row">
            <span className="tool-label">Highlighted</span>
            <span className="tool-tag">{matches.length} match{matches.length !== 1 ? "es" : ""}</span>
          </div>
          <div className="tool-preview" dangerouslySetInnerHTML={{ __html: highlightHTML || "<span style='color:var(--muted)'>No matches</span>" }} />
        </div>
      </div>
      {error && <p className="tool-error">{error}</p>}
      {matches.length > 0 && (
        <div className="tool-matches">
          <span className="tool-label">Matches</span>
          <div className="tool-match-list">
            {matches.map((m, i) => (
              <span key={i} className="tool-match-item">
                <span className="tool-match-idx">{m.index}</span>
                {m.match}
                {m.groups.length > 0 && <span className="tool-match-groups">({m.groups.join(", ")})</span>}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}