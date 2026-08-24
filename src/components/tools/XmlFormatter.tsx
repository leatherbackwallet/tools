"use client";

import { useState } from "react";
import { CopyButton } from "./ToolShell";

function formatXml(xml: string): string {
  let formatted = "";
  let indent = 0;
  const parts = xml.replace(/(>)(<)(\/*)/g, "$1\n$2$3").split("\n");
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("</")) indent--;
    formatted += "  ".repeat(Math.max(0, indent)) + trimmed + "\n";
    if (trimmed.startsWith("<") && !trimmed.startsWith("</") && !trimmed.endsWith("/>") && !/<\//.test(trimmed)) indent++;
  }
  return formatted.trim();
}

export default function XmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = () => {
    setError("");
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input.trim(), "text/xml");
      const parseError = doc.querySelector("parsererror");
      if (parseError) {
        setError("Invalid XML: " + parseError.textContent?.slice(0, 200));
        return;
      }
      setOutput(formatXml(input.trim()));
    } catch (e: any) {
      setError("Error: " + e.message);
    }
  };

  return (
    <div className="tool-layout">
      <div className="tool-cols">
        <div className="tool-pane">
          <label className="tool-label">XML Input</label>
          <textarea className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} placeholder='<root><item id="1">Hello</item></root>' spellCheck={false} />
        </div>
        <div className="tool-pane">
          <div className="tool-label-row">
            <span className="tool-label">Formatted XML</span>
            <CopyButton text={output} />
          </div>
          <textarea className="tool-textarea" value={output} readOnly spellCheck={false} />
          {error && <p className="tool-error">{error}</p>}
        </div>
      </div>
      <button className="tool-btn tool-btn--primary" onClick={format}>Format XML</button>
    </div>
  );
}