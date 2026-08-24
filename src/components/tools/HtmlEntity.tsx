"use client";

import { useState } from "react";
import { CopyButton } from "./ToolShell";

const entities: Record<string, string> = {
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#47;",
};

const reverseEntities: Record<string, string> = {};
Object.entries(entities).forEach(([k, v]) => { reverseEntities[v] = k; });

export default function HtmlEntity() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const convert = () => {
    if (mode === "encode") {
      setOutput(input.replace(/[&<>"'/]/g, (ch) => entities[ch] || ch));
    } else {
      let result = input;
      Object.entries(reverseEntities).forEach(([entity, char]) => {
        result = result.split(entity).join(char);
      });
      setOutput(result);
    }
  };

  return (
    <div className="tool-layout">
      <div className="tool-mode-row">
        <button className={`tool-mode-btn ${mode === "encode" ? "active" : ""}`} onClick={() => { setMode("encode"); setOutput(""); }}>Encode</button>
        <button className={`tool-mode-btn ${mode === "decode" ? "active" : ""}`} onClick={() => { setMode("decode"); setOutput(""); }}>Decode</button>
      </div>
      <div className="tool-cols">
        <div className="tool-pane">
          <label className="tool-label">{mode === "encode" ? "Plain HTML" : "Encoded Entities"}</label>
          <textarea className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "encode" ? '<div class="hello">& "test"</div>' : '&lt;div class=&quot;hello&quot;&gt;&amp; &quot;test&quot;&lt;/div&gt;'} spellCheck={false} />
        </div>
        <div className="tool-pane">
          <div className="tool-label-row">
            <span className="tool-label">Output</span>
            <CopyButton text={output} />
          </div>
          <textarea className="tool-textarea" value={output} readOnly spellCheck={false} />
        </div>
      </div>
      <button className="tool-btn tool-btn--primary" onClick={convert}>{mode === "encode" ? "Encode →" : "Decode →"}</button>
    </div>
  );
}