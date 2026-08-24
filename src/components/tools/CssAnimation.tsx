"use client";

import { useState, useCallback } from "react";

interface Keyframe {
  offset: string;
  opacity: string;
  transform: string;
}

export default function CssAnimation() {
  const [name, setName] = useState("fadeIn");
  const [duration, setDuration] = useState("1s");
  const [timing, setTiming] = useState("ease");
  const [iteration, setIteration] = useState("infinite");
  const [direction, setDirection] = useState("normal");
  const [keyframes, setKeyframes] = useState<Keyframe[]>([
    { offset: "0%", opacity: "0", transform: "translateY(20px)" },
    { offset: "100%", opacity: "1", transform: "translateY(0)" },
  ]);
  const [playing, setPlaying] = useState(true);

  const updateKeyframe = (idx: number, field: keyof Keyframe, value: string) => {
    setKeyframes((prev) => prev.map((k, i) => i === idx ? { ...k, [field]: value } : k));
  };

  const addKeyframe = () => {
    setKeyframes([...keyframes, { offset: "50%", opacity: "0.5", transform: "scale(1.1)" }]);
  };

  const removeKeyframe = (idx: number) => {
    if (keyframes.length <= 2) return;
    setKeyframes(keyframes.filter((_, i) => i !== idx));
  };

  const kfStr = keyframes.map((k) => `  ${k.offset} { opacity: ${k.opacity}; transform: ${k.transform}; }`).join("\n");
  const css = `@keyframes ${name} {\n${kfStr}\n}\n\nanimation: ${name} ${duration} ${timing} ${iteration} ${direction};`;

  const previewStyle: React.CSSProperties = {
    width: "80px",
    height: "80px",
    background: "var(--accent)",
    borderRadius: "14px",
    animation: playing ? `${name} ${duration} ${timing} ${iteration} ${direction}` : "none",
  };

  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [css]);

  return (
    <div className="tool-layout">
      <div className="tool-grid-2">
        <div className="tool-field">
          <label className="tool-label">Animation Name</label>
          <input className="tool-input" value={name} onChange={(e) => setName(e.target.value)} spellCheck={false} />
        </div>
        <div className="tool-field">
          <label className="tool-label">Duration</label>
          <input className="tool-input" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="1s" spellCheck={false} />
        </div>
        <div className="tool-field">
          <label className="tool-label">Timing Function</label>
          <select className="tool-select" value={timing} onChange={(e) => setTiming(e.target.value)}>
            {["ease", "linear", "ease-in", "ease-out", "ease-in-out", "cubic-bezier(0.68,-0.55,0.27,1.55)"].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="tool-field">
          <label className="tool-label">Iteration</label>
          <select className="tool-select" value={iteration} onChange={(e) => setIteration(e.target.value)}>
            {["1", "2", "3", "infinite"].map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div className="tool-field">
          <label className="tool-label">Direction</label>
          <select className="tool-select" value={direction} onChange={(e) => setDirection(e.target.value)}>
            {["normal", "reverse", "alternate", "alternate-reverse"].map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
      </div>

      <div className="tool-anim-preview">
        <div style={previewStyle} />
        <button className="tool-btn" onClick={() => setPlaying(!playing)}>{playing ? "Pause" : "Play"}</button>
      </div>

      <div className="tool-keyframes">
        <div className="tool-label-row">
          <span className="tool-label">Keyframes</span>
          <button className="tool-btn tool-btn--sm" onClick={addKeyframe}>+ Add</button>
        </div>
        {keyframes.map((kf, i) => (
          <div key={i} className="tool-keyframe-row">
            <input className="tool-input tool-input--narrow" value={kf.offset} onChange={(e) => updateKeyframe(i, "offset", e.target.value)} placeholder="0%" spellCheck={false} />
            <input className="tool-input tool-input--narrow" value={kf.opacity} onChange={(e) => updateKeyframe(i, "opacity", e.target.value)} placeholder="opacity" spellCheck={false} />
            <input className="tool-input" value={kf.transform} onChange={(e) => updateKeyframe(i, "transform", e.target.value)} placeholder="transform" spellCheck={false} />
            {keyframes.length > 2 && <button className="tool-btn tool-btn--sm" onClick={() => removeKeyframe(i)}>×</button>}
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