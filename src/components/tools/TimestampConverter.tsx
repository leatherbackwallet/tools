"use client";

import { useState, useEffect } from "react";

export default function TimestampConverter() {
  const [unix, setUnix] = useState("");
  const [human, setHuman] = useState("");
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));

  useEffect(() => {
    const interval = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(interval);
  }, []);

  const unixToHuman = () => {
    const ts = Number(unix);
    if (isNaN(ts)) return;
    const ms = ts > 1e12 ? ts : ts * 1000;
    const d = new Date(ms);
    setHuman(d.toISOString());
  };

  const humanToUnix = () => {
    const d = new Date(human);
    if (isNaN(d.getTime())) return;
    setUnix(Math.floor(d.getTime() / 1000).toString());
  };

  const nowStr = new Date(now * 1000).toISOString();

  return (
    <div className="tool-layout">
      <div className="tool-now-card">
        <span className="tool-label">Current Unix Timestamp</span>
        <span className="tool-now-value">{now}</span>
        <span className="tool-now-iso">{nowStr}</span>
      </div>

      <div className="tool-cols">
        <div className="tool-pane">
          <div className="tool-label-row">
            <span className="tool-label">Unix Timestamp</span>
            <button className="tool-btn tool-btn--sm" onClick={() => setUnix(String(now))}>Use Now</button>
          </div>
          <input className="tool-input" value={unix} onChange={(e) => setUnix(e.target.value)} placeholder={String(now)} />
          <button className="tool-btn tool-btn--primary" style={{ marginTop: 10 }} onClick={unixToHuman}>Convert →</button>
        </div>
        <div className="tool-pane">
          <div className="tool-label-row">
            <span className="tool-label">Human-Readable Date</span>
            <button className="tool-btn tool-btn--sm" onClick={() => setHuman(new Date().toISOString())}>Use Now</button>
          </div>
          <input className="tool-input" value={human} onChange={(e) => setHuman(e.target.value)} placeholder="2026-01-01T00:00:00.000Z" />
          <button className="tool-btn tool-btn--primary" style={{ marginTop: 10 }} onClick={humanToUnix}>Convert ←</button>
        </div>
      </div>

      {unix && (
        <div className="tool-pane">
          <span className="tool-label">Conversion Result</span>
          <div className="tool-timestamp-result">
            {(() => {
              const ts = Number(unix);
              const ms = ts > 1e12 ? ts : ts * 1000;
              const d = new Date(ms);
              if (isNaN(d.getTime())) return <span className="tool-error">Invalid timestamp</span>;
              return (
                <>
                  <div><strong>ISO:</strong> {d.toISOString()}</div>
                  <div><strong>UTC:</strong> {d.toUTCString()}</div>
                  <div><strong>Local:</strong> {d.toLocaleString()}</div>
                  <div><strong>Relative:</strong> {Math.floor((Date.now() - d.getTime()) / 1000)} seconds ago</div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}