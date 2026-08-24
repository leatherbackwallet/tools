"use client";

import { useState, useMemo } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) return { words: 0, chars: 0, charsNoSpace: 0, sentences: 0, paragraphs: 0, readingTime: 0 };
    const words = trimmed.split(/\s+/).filter(Boolean).length;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const sentences = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
    const paragraphs = trimmed.split(/\n\n+/).filter((p) => p.trim().length > 0).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    return { words, chars, charsNoSpace, sentences, paragraphs, readingTime };
  }, [text]);

  return (
    <div className="tool-layout">
      <div className="tool-pane">
        <label className="tool-label">Paste or type your text</label>
        <textarea
          className="tool-textarea tool-textarea--tall"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste text here…"
          spellCheck={false}
        />
      </div>

      <div className="tool-stats-grid">
        {[
          { label: "Words", value: stats.words },
          { label: "Characters", value: stats.chars },
          { label: "No Spaces", value: stats.charsNoSpace },
          { label: "Sentences", value: stats.sentences },
          { label: "Paragraphs", value: stats.paragraphs },
          { label: "Reading Time", value: `${stats.readingTime} min` },
        ].map((s) => (
          <div key={s.label} className="tool-stat-card">
            <span className="tool-stat-value">{s.value}</span>
            <span className="tool-stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}