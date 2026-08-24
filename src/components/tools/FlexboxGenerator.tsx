"use client";

import { useState, useCallback } from "react";

export default function FlexboxGenerator() {
  const [props, setProps] = useState({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
    flexWrap: "nowrap",
    gap: "10",
    childCount: "3",
  });

  const update = (key: string, value: string) => setProps((p) => ({ ...p, [key]: value }));

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: props.flexDirection as any,
    justifyContent: props.justifyContent as any,
    alignItems: props.alignItems as any,
    flexWrap: props.flexWrap as any,
    gap: `${props.gap}px`,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid var(--line)",
    borderRadius: "14px",
    padding: "20px",
    minHeight: "200px",
  };

  const css = `display: flex;\nflex-direction: ${props.flexDirection};\njustify-content: ${props.justifyContent};\nalign-items: ${props.alignItems};\nflex-wrap: ${props.flexWrap};\ngap: ${props.gap}px;`;

  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [css]);

  const count = Math.max(1, Math.min(12, Number(props.childCount) || 3));

  return (
    <div className="tool-layout">
      <div className="tool-grid-2">
        {[
          { key: "flexDirection", label: "Direction", options: ["row", "row-reverse", "column", "column-reverse"] },
          { key: "justifyContent", label: "Justify", options: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"] },
          { key: "alignItems", label: "Align", options: ["stretch", "flex-start", "flex-end", "center", "baseline"] },
          { key: "flexWrap", label: "Wrap", options: ["nowrap", "wrap", "wrap-reverse"] },
        ].map((opt) => (
          <div key={opt.key} className="tool-field">
            <label className="tool-label">{opt.label}</label>
            <select className="tool-select" value={(props as any)[opt.key]} onChange={(e) => update(opt.key, e.target.value)}>
              {opt.options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        ))}
        <div className="tool-field">
          <label className="tool-label">Gap: {props.gap}px</label>
          <input type="range" className="tool-slider" min={0} max={50} value={props.gap} onChange={(e) => update("gap", e.target.value)} />
        </div>
        <div className="tool-field">
          <label className="tool-label">Children: {props.childCount}</label>
          <input type="range" className="tool-slider" min={1} max={12} value={props.childCount} onChange={(e) => update("childCount", e.target.value)} />
        </div>
      </div>

      <div style={containerStyle}>
        {Array.from({ length: count }, (_, i) => (
          <div key={i} style={{
            background: "var(--accent)",
            color: "#fff",
            borderRadius: "10px",
            padding: "16px 20px",
            fontSize: "13px",
            fontWeight: 600,
            minWidth: "60px",
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