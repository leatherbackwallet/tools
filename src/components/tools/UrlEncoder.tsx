"use client";

import { useState } from "react";
import { CopyButton } from "./ToolShell";

export default function UrlEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  const convert = () => {
    setError("");
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (e: any) {
      setError("Invalid input: " + e.message);
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
          <label className="tool-label">{mode === "encode" ? "Plain Text / URL" : "Encoded URL"}</label>
          <textarea className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "encode" ? "https://example.com/path?q=hello world" : "https%3A%2F%2Fexample.com%2Fpath%3Fq%3Dhello%20world"} spellCheck={false} />
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