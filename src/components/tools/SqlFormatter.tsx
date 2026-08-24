"use client";

import { useState } from "react";
import { CopyButton } from "./ToolShell";

function formatSql(sql: string): string {
  const keywords = ["SELECT", "FROM", "WHERE", "AND", "OR", "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE", "CREATE", "TABLE", "ALTER", "DROP", "INDEX", "JOIN", "LEFT", "RIGHT", "INNER", "OUTER", "ON", "GROUP", "BY", "ORDER", "ASC", "DESC", "LIMIT", "OFFSET", "HAVING", "UNION", "ALL", "AS", "DISTINCT", "COUNT", "SUM", "AVG", "MIN", "MAX", "IN", "NOT", "NULL", "IS", "LIKE", "BETWEEN", "EXISTS", "CASE", "WHEN", "THEN", "ELSE", "END", "PRIMARY", "KEY", "FOREIGN", "REFERENCES", "CONSTRAINT", "DEFAULT", "AUTO_INCREMENT", "VARCHAR", "INT", "INTEGER", "TEXT", "BOOLEAN", "DATE", "TIMESTAMP", "FLOAT", "DOUBLE", "DECIMAL"];

  let result = sql;
  // Add newlines before major keywords
  const majorKw = ["SELECT", "FROM", "WHERE", "AND", "OR", "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE", "CREATE", "TABLE", "ALTER", "DROP", "JOIN", "LEFT", "RIGHT", "INNER", "OUTER", "GROUP", "ORDER", "HAVING", "UNION", "LIMIT", "OFFSET", "ON"];
  for (const kw of majorKw) {
    const re = new RegExp(`\\b${kw}\\b`, "gi");
    result = result.replace(re, `\n${kw}`);
  }
  // Clean up whitespace
  result = result.replace(/\n\s*\n/g, "\n").replace(/^\n/, "").trim();
  // Uppercase keywords
  for (const kw of keywords) {
    const re = new RegExp(`\\b${kw}\\b`, "gi");
    result = result.replace(re, kw);
  }
  return result;
}

export default function SqlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="tool-layout">
      <div className="tool-cols">
        <div className="tool-pane">
          <label className="tool-label">SQL Query</label>
          <textarea className="tool-textarea tool-textarea--tall" value={input} onChange={(e) => setInput(e.target.value)} placeholder="SELECT * FROM users WHERE id = 1" spellCheck={false} />
        </div>
        <div className="tool-pane">
          <div className="tool-label-row">
            <span className="tool-label">Formatted SQL</span>
            <CopyButton text={output} />
          </div>
          <textarea className="tool-textarea tool-textarea--tall" value={output} readOnly spellCheck={false} />
        </div>
      </div>
      <button className="tool-btn tool-btn--primary" onClick={() => setOutput(formatSql(input))}>Format SQL</button>
    </div>
  );
}