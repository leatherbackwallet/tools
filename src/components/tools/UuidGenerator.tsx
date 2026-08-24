"use client";

import { useState, useCallback } from "react";
import { CopyButton } from "./ToolShell";

function generateUUID(): string {
  return crypto.randomUUID();
}

export default function UuidGenerator() {
  const [count, setCount] = useState(10);
  const [uuids, setUuids] = useState<string[]>([]);

  const generate = useCallback(() => {
    setUuids(Array.from({ length: count }, generateUUID));
  }, [count]);

  return (
    <div className="tool-layout">
      <div className="tool-row">
        <div className="tool-field tool-field--narrow">
          <label className="tool-label">Count</label>
          <input type="number" className="tool-input" value={count} onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))} min={1} max={100} />
        </div>
        <button className="tool-btn tool-btn--primary" onClick={generate}>Generate</button>
        {uuids.length > 0 && <CopyButton text={uuids.join("\n")} />}
      </div>
      {uuids.length > 0 && (
        <div className="tool-uuid-list">
          {uuids.map((uuid, i) => (
            <div key={i} className="tool-uuid-row">
              <span className="tool-uuid-idx">{i + 1}</span>
              <code className="tool-uuid-value">{uuid}</code>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}