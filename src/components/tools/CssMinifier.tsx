"use client";

import { useState } from "react";
import { CopyButton } from "./ToolShell";

export default function CssMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"minify" | "unminify">("minify");

  const convert = () => {
    if (mode === "minify") {
      setOutput(input.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,])\s*/g, "$1").trim());
    } else {
      let result = "";
      let depth = 0;
      for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        if (ch === "{") { result += " {\n"; depth++; result += "  ".repeat(depth); }
        else if (ch === "}") { result = result.trimEnd() + "\n"; depth--; result += "  ".repeat(depth) + "}\n"; if (depth <= 0) { result += "\n"; depth = 0; } }
        else if (ch === ";") { result += ";\n" + "  ".repeat(depth); }
        else { result += ch; }
      }
      setOutput(result.replace(/\n\s*\n/g, "\n").trim());
    }
  };

  const ratio = input && output ? Math.round((1 - output.length / input.length) * 100) : 0;

  return (
    <div className="tool-layout">
      <div className="tool-mode-row">
        <button className={`tool-mode-btn ${mode === "minify" ? "active" : ""}`} onClick={() => { setMode("minify"); setOutput(""); }}>Minify</button>
        <button className={`tool-mode-btn ${mode === "unminify" ? "active" : ""}`} onClick={() => { setMode("unminify"); setOutput(""); }}>Un-minify</button>
      </div>
      <div className="tool-cols">
        <div className="tool-pane">
          <label className="tool-label">{mode === "minify" ? "CSS Input" : "Minified CSS"}</label>
          <textarea className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste CSS here…" spellCheck={false} />
        </div>
        <div className="tool-pane">
          <div className="tool-label-row">
            <span className="tool-label">Output</span>
            {ratio > 0 && <span className="tool-tag">{ratio}% smaller</span>}
            <CopyButton text={output} />
          </div>
          <textarea className="tool-textarea" value={output} readOnly spellCheck={false} />
        </div>
      </div>
      <button className="tool-btn tool-btn--primary" onClick={convert}>{mode === "minify" ? "Minify →" : "Un-minify →"}</button>
    </div>
  );
}