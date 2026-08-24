"use client";

import { useState, useMemo } from "react";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function luminance(r: number, g: number, b: number) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(fg: string, bg: string) {
  const f = hexToRgb(fg);
  const b = hexToRgb(bg);
  const l1 = luminance(f.r, f.g, f.b);
  const l2 = luminance(b.r, b.g, b.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function wcagLevel(ratio: number) {
  if (ratio >= 7) return { level: "AAA", large: "AAA" };
  if (ratio >= 4.5) return { level: "AA", large: "AAA" };
  if (ratio >= 3) return { level: "Fail", large: "AA" };
  return { level: "Fail", large: "Fail" };
}

export default function ContrastChecker() {
  const [fg, setFg] = useState("#ffffff");
  const [bg, setBg] = useState("#131313");

  const ratio = useMemo(() => contrastRatio(fg, bg), [fg, bg]);
  const wcag = wcagLevel(ratio);

  return (
    <div className="tool-layout">
      <div className="tool-color-pair" style={{ background: bg, color: fg }}>
        <span className="tool-contrast-sample-lg">Large Text (18pt)</span>
        <span className="tool-contrast-sample">Normal body text sample — The quick brown fox jumps over the lazy dog.</span>
      </div>

      <div className="tool-grid-2">
        <div className="tool-field">
          <label className="tool-label">Text Color</label>
          <div className="tool-color-row">
            <input type="color" className="tool-color-input" value={fg} onChange={(e) => setFg(e.target.value)} />
            <input className="tool-input" value={fg} onChange={(e) => setFg(e.target.value)} />
          </div>
        </div>
        <div className="tool-field">
          <label className="tool-label">Background Color</label>
          <div className="tool-color-row">
            <input type="color" className="tool-color-input" value={bg} onChange={(e) => setBg(e.target.value)} />
            <input className="tool-input" value={bg} onChange={(e) => setBg(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="tool-contrast-results">
        <div className="tool-contrast-ratio">
          <span className="tool-contrast-num">{ratio.toFixed(2)}</span>
          <span className="tool-contrast-label">: 1</span>
        </div>
        <div className="tool-contrast-badges">
          <span className={`tool-badge ${wcag.level === "Fail" ? "tool-badge--fail" : "tool-badge--pass"}`}>
            Normal: {wcag.level}
          </span>
          <span className={`tool-badge ${wcag.large === "Fail" ? "tool-badge--fail" : "tool-badge--pass"}`}>
            Large: {wcag.large}
          </span>
        </div>
      </div>
    </div>
  );
}