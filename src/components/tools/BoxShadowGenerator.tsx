"use client";

import { useState, useCallback } from "react";

export default function BoxShadowGenerator() {
  const [h, setH] = useState(4);
  const [v, setV] = useState(4);
  const [blur, setBlur] = useState(12);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(25);
  const [inset, setInset] = useState(false);
  const [borderRadius, setBorderRadius] = useState(16);

  const rgba = `${color}${Math.round(opacity * 2.55).toString(16).padStart(2, "0")}`;
  const css = `box-shadow: ${inset ? "inset " : ""}${h}px ${v}px ${blur}px ${spread}px ${rgba};\nborder-radius: ${borderRadius}px;`;
  const preview = `${inset ? "inset " : ""}${h}px ${v}px ${blur}px ${spread}px ${rgba}`;

  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [css]);

  return (
    <div className="tool-layout">
      <div className="tool-shadow-preview-wrap">
        <div className="tool-shadow-preview" style={{ boxShadow: preview, borderRadius }} />
      </div>

      <div className="tool-grid-2">
        {[
          { label: "Horizontal", value: h, set: setH, min: -100, max: 100 },
          { label: "Vertical", value: v, set: setV, min: -100, max: 100 },
          { label: "Blur", value: blur, set: setBlur, min: 0, max: 200 },
          { label: "Spread", value: spread, set: setSpread, min: -100, max: 100 },
          { label: "Border Radius", value: borderRadius, set: setBorderRadius, min: 0, max: 100 },
        ].map((s) => (
          <div key={s.label} className="tool-field">
            <label className="tool-label">{s.label}: {s.value}px</label>
            <input type="range" className="tool-slider" min={s.min} max={s.max} value={s.value} onChange={(e) => s.set(Number(e.target.value))} />
          </div>
        ))}
        <div className="tool-field">
          <label className="tool-label">Color</label>
          <div className="tool-color-row">
            <input type="color" className="tool-color-input" value={color} onChange={(e) => setColor(e.target.value)} />
            <input className="tool-input" value={color} onChange={(e) => setColor(e.target.value)} />
          </div>
        </div>
        <div className="tool-field">
          <label className="tool-label">Opacity: {opacity}%</label>
          <input type="range" className="tool-slider" min={0} max={100} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} />
        </div>
      </div>

      <label className="tool-checkbox-row">
        <input type="checkbox" checked={inset} onChange={(e) => setInset(e.target.checked)} />
        <span>Inset</span>
      </label>

      <div className="tool-output-row">
        <pre className="tool-code">{css}</pre>
        <button className="tool-btn" onClick={handleCopy}>{copied ? "Copied!" : "Copy CSS"}</button>
      </div>
    </div>
  );
}