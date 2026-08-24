"use client";

import { useState, useMemo } from "react";
import { CopyButton } from "./ToolShell";

const cronFields = [
  { name: "Minute", min: 0, max: 59 },
  { name: "Hour", min: 0, max: 23 },
  { name: "Day of Month", min: 1, max: 31 },
  { name: "Month", min: 1, max: 12 },
  { name: "Day of Week", min: 0, max: 6 },
];

const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function parseCronField(field: string, min: number, max: number): string {
  if (field === "*") return `every ${min === 0 ? "value" : "unit"}`;
  if (field.includes("/")) {
    const [, step] = field.split("/");
    return `every ${step} units`;
  }
  if (field.includes("-")) {
    const [a, b] = field.split("-");
    return `from ${a} to ${b}`;
  }
  if (field.includes(",")) {
    return field.split(",").join(", ");
  }
  return field;
}

function describeCron(expr: string): string {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return "Invalid cron expression (need 5 fields)";

  const [min, hour, dom, month, dow] = parts;

  let desc = "At ";
  if (min === "*" && hour === "*") {
    desc += "every minute";
  } else if (min === "0" && hour === "*") {
    desc += "the start of every hour";
  } else if (min === "0" && hour !== "*") {
    desc += `${hour}:00`;
  } else if (min !== "*" && hour !== "*") {
    desc += `${hour.padStart(2, "0")}:${min.padStart(2, "0")}`;
  } else if (min !== "*") {
    desc += `minute ${min}`;
  } else {
    desc += `every hour at minute ${min}`;
  }

  if (dom !== "*") desc += `, on day ${dom}`;
  if (month !== "*") desc += ` of ${monthNames[Number(month)] || month}`;
  if (dow !== "*") desc += `, on ${dayNames[Number(dow)] || dow}`;

  return desc;
}

export default function CronParser() {
  const [expr, setExpr] = useState("*/5 * * * *");

  const description = useMemo(() => describeCron(expr), [expr]);
  const isValid = expr.trim().split(/\s+/).length === 5;

  return (
    <div className="tool-layout">
      <div className="tool-row">
        <div className="tool-field" style={{ flex: 1 }}>
          <label className="tool-label">Cron Expression</label>
          <input className="tool-input" value={expr} onChange={(e) => setExpr(e.target.value)} placeholder="*/5 * * * *" spellCheck={false} />
        </div>
        <CopyButton text={description} />
      </div>

      <div className="tool-cron-fields">
        {isValid && expr.trim().split(/\s+/).map((field, i) => (
          <div key={i} className="tool-cron-field">
            <span className="tool-cron-label">{cronFields[i].name}</span>
            <span className="tool-cron-value">{field}</span>
          </div>
        ))}
      </div>

      <div className="tool-cron-desc">
        <span className="tool-cron-desc-label">Schedule:</span>
        <span className="tool-cron-desc-text">{isValid ? description : "Invalid expression"}</span>
      </div>

      <div className="tool-cron-examples">
        <span className="tool-label">Common Examples</span>
        <div className="tool-cron-example-list">
          {[
            ["* * * * *", "Every minute"],
            ["0 * * * *", "Every hour"],
            ["0 0 * * *", "Every day at midnight"],
            ["0 9 * * 1-5", "Weekdays at 9:00"],
            ["0 0 * * 0", "Every Sunday at midnight"],
            ["*/15 * * * *", "Every 15 minutes"],
            ["0 0 1 * *", "First of every month"],
          ].map(([e, d]) => (
            <button key={e} className="tool-cron-example" onClick={() => setExpr(e)}>
              <code>{e}</code>
              <span>{d}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}