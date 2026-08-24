"use client";

import { useState } from "react";

export default function SvgPreview() {
  const [code, setCode] = useState('<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">\n  <circle cx="100" cy="100" r="80" fill="#FF5A26" />\n  <text x="100" y="105" text-anchor="middle" fill="white" font-size="20" font-family="sans-serif">SVG</text>\n</svg>');

  return (
    <div className="tool-layout">
      <div className="tool-pane">
        <label className="tool-label">SVG Markup</label>
        <textarea className="tool-textarea tool-textarea--tall" value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} />
      </div>
      <div className="tool-pane">
        <label className="tool-label">Preview</label>
        <div className="tool-svg-preview" dangerouslySetInnerHTML={{ __html: code }} />
      </div>
    </div>
  );
}