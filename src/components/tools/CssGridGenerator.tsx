"use client";

import { useState, useCallback } from "react";

export default function CssGridGenerator() {
  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(2);
  const [gap, setGap] = useState(10);
  const [colTemplate, setColTemplate] = useState("1fr 1fr 1fr");
  const [rowTemplate, setRowTemplate] = useState("auto auto");

  const containerStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: colTemplate,
    gridTemplateRows: rowTemplate,
    gap: `${gap}px`,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid var(--line)",
    borderRadius: "14px",
    padding: "20px",
    minHeight: "200px",
  };

  const css = `display: grid;\ngrid-template-columns: ${colTemplate};\ngrid-template-rows: ${rowTemplate};\ngap: ${gap}px;`;

  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [css]);

  const total = cols * rows;

  return (
    <div className="tool-layout">
      <div className="tool-grid-2">
        <div className="tool-field">
          <label className="tool-label">Columns: {cols}</label>
          <input type="range" className="tool-slider" min={1} max={8} value={cols} onChange={(e) => { setCols(Number(e.target.value)); setColTemplate(Array(Number(e.target.value)).fill("1fr").join(" ")); }} />
        </div>
        <div className="tool-field">
          <label className="tool-label">Rows: {rows}</label>
          <input type="range" className="tool-slider" min={1} max={8} value={rows} onChange={(e) => { setRows(Number(e.target.value)); setRowTemplate(Array(Number(e.target.value)).fill("auto").join(" ")); }} />
        </div>
        <div className="tool-field">
          <label className="tool-label">Gap: {gap}px</label>
          <input type="range" className="tool-slider" min={0} max={50} value={gap} onChange={(e) => setGap(Number(e.target.value))} />
        </div>
        <div className="tool-field">
          <label className="tool-label">Column Template</label>
          <input className="tool-input" value={colTemplate} onChange={(e) => setColTemplate(e.target.value)} spellCheck={false} />
        </div>
      </div>

      <div style={containerStyle}>
        {Array.from({ length: total }, (_, i) => (
          <div key={i} style={{
            background: "var(--accent)",
            color: "#fff",
            borderRadius: "10px",
            padding: "16px",
            fontSize: "13px",
            fontWeight: 600,
            textAlign: "center",
          }}>
            {i + 1}
          </div>
        ))}
      </div>

      <div className="tool-output-row">
        <pre className="tool-code">{css}</pre>
        <button className="tool-btn" onClick={handleCopy}>{copied ? "Copied!" : "Copy CSS"}</button>
      </div>
    </div>
  );
}