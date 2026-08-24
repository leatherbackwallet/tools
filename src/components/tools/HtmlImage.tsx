"use client";

import { useState, useRef, useCallback } from "react";

export default function HtmlImage() {
  const [html, setHtml] = useState('<div style="font-family: sans-serif; padding: 40px; background: #131313; color: #fff; border-radius: 16px; text-align: center;">\n  <h1 style="font-size: 32px; margin: 0;">Hello World</h1>\n  <p style="color: #888; margin-top: 8px;">Edit this HTML to create an image</p>\n</div>');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rendered, setRendered] = useState(false);

  const render = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    const blob = new Blob([`<!DOCTYPE html><html><head><style>body{margin:0;padding:0;}</style></head><body>${html}</body></html>`], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      ctx.scale(2, 2);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      setRendered(true);
    };
    img.src = url;
  }, [html]);

  const download = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "html-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, []);

  return (
    <div className="tool-layout">
      <div className="tool-pane">
        <label className="tool-label">HTML Content</label>
        <textarea className="tool-textarea" value={html} onChange={(e) => setHtml(e.target.value)} spellCheck={false} />
      </div>
      <div className="tool-row">
        <button className="tool-btn tool-btn--primary" onClick={render}>Render to Canvas</button>
        {rendered && <button className="tool-btn" onClick={download}>Download PNG</button>}
      </div>
      <div className="tool-pane">
        <label className="tool-label">Canvas Output</label>
        <canvas ref={canvasRef} style={{ maxWidth: "100%", background: "#1a1a1a", borderRadius: "14px", border: "1px solid var(--line)" }} />
      </div>
    </div>
  );
}