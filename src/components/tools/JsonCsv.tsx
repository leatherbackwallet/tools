"use client";

import { useState } from "react";
import { CopyButton } from "./ToolShell";

export default function JsonCsv() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"json2csv" | "csv2json">("json2csv");
  const [error, setError] = useState("");

  const convert = () => {
    setError("");
    try {
      if (mode === "json2csv") {
        const arr = JSON.parse(input);
        const data = Array.isArray(arr) ? arr : [arr];
        if (data.length === 0) { setOutput(""); return; }
        const headers = [...new Set(data.flatMap(Object.keys))];
        const csv = [
          headers.join(","),
          ...data.map((row) =>
            headers.map((h) => {
              const v = row[h];
              const s = v === null || v === undefined ? "" : String(v);
              return s.includes(",") || s.includes('"') || s.includes("\n")
                ? `"${s.replace(/"/g, '""')}"`
                : s;
            }).join(",")
          ),
        ].join("\n");
        setOutput(csv);
      } else {
        const lines = input.trim().split("\n");
        if (lines.length < 2) { setOutput("[]"); return; }
        const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
        const result = lines.slice(1).map((line) => {
          const vals: string[] = [];
          let cur = "";
          let inQ = false;
          for (const ch of line) {
            if (ch === '"') { inQ = !inQ; }
            else if (ch === "," && !inQ) { vals.push(cur); cur = ""; }
            else { cur += ch; }
          }
          vals.push(cur);
          const obj: Record<string, string> = {};
          headers.forEach((h, i) => { obj[h] = (vals[i] || "").replace(/""/g, '"'); });
          return obj;
        });
        setOutput(JSON.stringify(result, null, 2));
      }
    } catch (e: any) {
      setError(e.message || "Invalid input");
    }
  };

  return (
    <div className="tool-layout">
      <div className="tool-mode-row">
        <button
          className={`tool-mode-btn ${mode === "json2csv" ? "active" : ""}`}
          onClick={() => { setMode("json2csv"); setOutput(""); setError(""); }}
        >
          JSON → CSV
        </button>
        <button
          className={`tool-mode-btn ${mode === "csv2json" ? "active" : ""}`}
          onClick={() => { setMode("csv2json"); setOutput(""); setError(""); }}
        >
          CSV → JSON
        </button>
      </div>
      <div className="tool-cols">
        <div className="tool-pane">
          <label className="tool-label">{mode === "json2csv" ? "JSON Input" : "CSV Input"}</label>
          <textarea
            className="tool-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "json2csv" ? '[{"name":"John","age":30}]' : 'name,age\nJohn,30'}
            spellCheck={false}
          />
        </div>
        <div className="tool-pane">
          <div className="tool-label-row">
            <span className="tool-label">Output</span>
            <CopyButton text={output} />
          </div>
          <textarea className="tool-textarea" value={output} readOnly spellCheck={false} />
          {error && <p className="tool-error">{error}</p>}
        </div>
      </div>
      <button className="tool-btn tool-btn--primary" onClick={convert}>Convert →</button>
    </div>
  );
}