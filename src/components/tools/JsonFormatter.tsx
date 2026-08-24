"use client";

import { useState } from "react";
import { CopyButton } from "./ToolShell";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  const format = () => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
    } catch (e: any) {
      setError("Invalid JSON: " + e.message);
    }
  };

  const minify = () => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (e: any) {
      setError("Invalid JSON: " + e.message);
    }
  };

  return (
    <div className="tool-layout">
      <div className="tool-row">
        <button className="tool-btn tool-btn--primary" onClick={format}>Beautify</button>
        <button className="tool-btn tool-btn--primary" onClick={minify}>Minify</button>
        <div className="tool-field tool-field--narrow">
          <label className="tool-label">Indent</label>
          <select className="tool-select" value={indent} onChange={(e) => setIndent(Number(e.target.value))}>
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={8}>8 spaces</option>
          </select>
        </div>
      </div>
      <div className="tool-cols">
        <div className="tool-pane">
          <label className="tool-label">JSON Input</label>
          <textarea className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"key": "value", "arr": [1, 2, 3]}' spellCheck={false} />
        </div>
        <div className="tool-pane">
          <div className="tool-label-row">
            <span className="tool-label">Formatted Output</span>
            <CopyButton text={output} />
          </div>
          <textarea className="tool-textarea" value={output} readOnly spellCheck={false} />
          {error && <p className="tool-error">{error}</p>}
        </div>
      </div>
    </div>
  );
}