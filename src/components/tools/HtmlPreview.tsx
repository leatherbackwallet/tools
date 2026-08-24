"use client";

import { useState } from "react";

export default function HtmlPreview() {
  const [code, setCode] = useState('<div style="font-family: sans-serif; padding: 20px;">\n  <h1 style="color: #FF5A26;">Hello World</h1>\n  <p>Edit this HTML to see live changes.</p>\n</div>');

  return (
    <div className="tool-layout">
      <div className="tool-pane">
        <label className="tool-label">HTML + CSS</label>
        <textarea className="tool-textarea tool-textarea--tall" value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} />
      </div>
      <div className="tool-pane">
        <label className="tool-label">Live Preview</label>
        <div className="tool-live-preview" dangerouslySetInnerHTML={{ __html: code }} />
      </div>
    </div>
  );
}