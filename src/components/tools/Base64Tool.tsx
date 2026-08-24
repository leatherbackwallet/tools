"use client";

import { useState } from "react";
import { CopyButton } from "./ToolShell";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  const convert = () => {
    setError("");
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch (e: any) {
      setError("Invalid input for " + mode);
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
          <label className="tool-label">{mode === "encode" ? "Plain Text" : "Base64 String"}</label>
          <textarea className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "encode" ? "Enter text to encode…" : "Enter Base64 to decode…"} spellCheck={false} />
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
      <button className="tool-btn tool-btn--primary" onClick={convert}>{mode === "encode" ? "Encode →" : "Decode →"}</button>
    </div>
  );
}