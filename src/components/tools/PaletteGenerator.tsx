"use client";

import { useState, useCallback, useMemo } from "react";
import { CopyButton } from "./ToolShell";

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export default function PaletteGenerator() {
  const [baseColor, setBaseColor] = useState("#FF5A26");
  const [harmony, setHarmony] = useState("complementary");

  const palette = useMemo(() => {
    const [h, s, l] = hexToHsl(baseColor);
    const schemes: Record<string, [number, number, number][]> = {
      complementary: [[h, s, l], [(h + 180) % 360, s, l]],
      analogous: [[(h - 30 + 360) % 360, s, l], [h, s, l], [(h + 30) % 360, s, l]],
      triadic: [[h, s, l], [(h + 120) % 360, s, l], [(h + 240) % 360, s, l]],
      split: [[h, s, l], [(h + 150) % 360, s, l], [(h + 210) % 360, s, l]],
      tetradic: [[h, s, l], [(h + 90) % 360, s, l], [(h + 180) % 360, s, l], [(h + 270) % 360, s, l]],
      monochromatic: [[h, s, Math.max(20, l - 30)], [h, s, Math.max(20, l - 15)], [h, s, l], [h, s, Math.min(90, l + 15)], [h, s, Math.min(90, l + 30)]],
    };
    return (schemes[harmony] || schemes.complementary).map(([hh, ss, ll]) => hslToHex(hh, ss, ll));
  }, [baseColor, harmony]);

  const cssVars = palette.map((c, i) => `--color-${i + 1}: ${c};`).join("\n");

  return (
    <div className="tool-layout">
      <div className="tool-row">
        <div className="tool-field">
          <label className="tool-label">Base Color</label>
          <div className="tool-color-row">
            <input type="color" className="tool-color-input" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} />
            <input className="tool-input" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} />
          </div>
        </div>
        <div className="tool-field">
          <label className="tool-label">Harmony</label>
          <select className="tool-select" value={harmony} onChange={(e) => setHarmony(e.target.value)}>
            <option value="complementary">Complementary</option>
            <option value="analogous">Analogous</option>
            <option value="triadic">Triadic</option>
            <option value="split">Split-Complementary</option>
            <option value="tetradic">Tetradic</option>
            <option value="monochromatic">Monochromatic</option>
          </select>
        </div>
      </div>

      <div className="tool-palette-row">
        {palette.map((color, i) => (
          <div key={i} className="tool-palette-swatch" style={{ background: color }}>
            <span className="tool-palette-hex">{color}</span>
          </div>
        ))}
      </div>

      <div className="tool-output-row">
        <pre className="tool-code">{cssVars}</pre>
        <CopyButton text={cssVars} />
      </div>
    </div>
  );
}