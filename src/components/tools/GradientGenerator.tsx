"use client";

import { useState, useCallback } from "react";

interface Stop {
  color: string;
  position: number;
}

export default function GradientGenerator() {
  const [stops, setStops] = useState<Stop[]>([
    { color: "#FF5A26", position: 0 },
    { color: "#ff9a5c", position: 100 },
  ]);
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState<"linear" | "radial">("linear");

  const css = type === "linear"
    ? `background: linear-gradient(${angle}deg, ${stops.map((s) => `${s.color} ${s.position}%`).join(", ")});`
    : `background: radial-gradient(circle, ${stops.map((s) => `${s.color} ${s.position}%`).join(", ")});`;

  const preview = type === "linear"
    ? `linear-gradient(${angle}deg, ${stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`
    : `radial-gradient(circle, ${stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`;

  const addStop = () => {
    setStops([...stops, { color: "#ffffff", position: 50 }].sort((a, b) => a.position - b.position));
  };

  const removeStop = (idx: number) => {
    if (stops.length <= 2) return;
    setStops(stops.filter((_, i) => i !== idx));
  };

  const updateStop = (idx: number, field: keyof Stop, value: string | number) => {
    const next = [...stops];
    next[idx] = { ...next[idx], [field]: field === "position" ? Number(value) : value };
    setStops(next);
  };

  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [css]);

  return (
    <div className="tool-layout">
      <div className="tool-gradient-preview" style={{ background: preview }} />

      <div className="tool-mode-row">
        <button className={`tool-mode-btn ${type === "linear" ? "active" : ""}`} onClick={() => setType("linear")}>Linear</button>
        <button className={`tool-mode-btn ${type === "radial" ? "active" : ""}`} onClick={() => setType("radial")}>Radial</button>
      </div>

      {type === "linear" && (
        <div className="tool-field">
          <label className="tool-label">Angle: {angle}°</label>
          <input type="range" className="tool-slider" min={0} max={360} value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
        </div>
      )}

      <div className="tool-stops">
        {stops.map((stop, i) => (
          <div key={i} className="tool-stop-row">
            <input type="color" className="tool-color-input" value={stop.color} onChange={(e) => updateStop(i, "color", e.target.value)} />
            <input className="tool-input tool-input--narrow" value={stop.color} onChange={(e) => updateStop(i, "color", e.target.value)} />
            <input type="range" className="tool-slider" min={0} max={100} value={stop.position} onChange={(e) => updateStop(i, "position", e.target.value)} />
            <span className="tool-stop-pos">{stop.position}%</span>
            {stops.length > 2 && (
              <button className="tool-btn tool-btn--sm" onClick={() => removeStop(i)}>×</button>
            )}
          </div>
        ))}
        <button className="tool-btn" onClick={addStop}>+ Add Stop</button>
      </div>

      <div className="tool-output-row">
        <pre className="tool-code">{css}</pre>
        <button className="tool-btn" onClick={handleCopy}>{copied ? "Copied!" : "Copy CSS"}</button>
      </div>
    </div>
  );
}