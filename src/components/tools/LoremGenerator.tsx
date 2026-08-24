"use client";

import { useState, useCallback } from "react";
import { CopyButton } from "./ToolShell";

const words = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "perspiciatis", "unde",
  "omnis", "iste", "natus", "error", "voluptatem", "accusantium", "doloremque",
  "laudantium", "totam", "rem", "aperiam", "eaque", "ipsa", "quae", "ab", "illo",
  "inventore", "veritatis", "quasi", "architecto", "beatae", "vitae", "dicta",
];

function randomWord(seed: number): string {
  const idx = Math.floor((seed * 9301 + 49297) % 233280) / 233280;
  return words[Math.floor(idx * words.length)];
}

function generateLorem(wordCount: number, seed: number): string {
  let s = seed;
  const result: string[] = [];
  let wordsInSentence = 0;
  for (let i = 0; i < wordCount; i++) {
    s++;
    result.push(randomWord(s));
    wordsInSentence++;
    if (wordsInSentence >= 8 + Math.floor(Math.random() * 8)) {
      result[result.length - 1] += ".";
      wordsInSentence = 0;
      if (Math.random() > 0.7) result.push("\n");
    }
  }
  return result.join(" ").replace(/\.\s*\./g, ".");
}

export default function LoremGenerator() {
  const [wordCount, setWordCount] = useState(100);
  const [output, setOutput] = useState("");
  const [seed, setSeed] = useState(42);

  const generate = useCallback(() => {
    setOutput(generateLorem(wordCount, seed));
  }, [wordCount, seed]);

  return (
    <div className="tool-layout">
      <div className="tool-row">
        <div className="tool-field tool-field--narrow">
          <label className="tool-label">Words</label>
          <input type="number" className="tool-input" value={wordCount} onChange={(e) => setWordCount(Math.max(1, Math.min(5000, Number(e.target.value))))} min={1} max={5000} />
        </div>
        <div className="tool-field tool-field--narrow">
          <label className="tool-label">Seed</label>
          <input type="number" className="tool-input" value={seed} onChange={(e) => setSeed(Number(e.target.value))} />
        </div>
        <button className="tool-btn tool-btn--primary" onClick={generate}>Generate</button>
        {output && <CopyButton text={output} />}
      </div>
      {output && (
        <div className="tool-pane">
          <textarea className="tool-textarea tool-textarea--tall" value={output} readOnly spellCheck={false} />
        </div>
      )}
    </div>
  );
}