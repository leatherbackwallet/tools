"use client";

import { useState } from "react";
import { CopyButton } from "./ToolShell";

function yamlToJson(yaml: string): any {
  const lines = yaml.split("\n");
  const result: any = {};
  let current = result;
  const stack: any[] = [result];
  const indentStack: number[] = [-1];

  for (const raw of lines) {
    if (!raw.trim() || raw.trim().startsWith("#")) continue;
    const indent = raw.search(/\S/);
    const line = raw.trim();

    while (indentStack.length > 1 && indent <= indentStack[indentStack.length - 1]) {
      stack.pop();
      indentStack.pop();
    }

    const parent = stack[stack.length - 1];
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim();

    if (val === "" || val === "|") {
      const child: any = Array.isArray(parent) ? [] : {};
      parent[key] = child;
      stack.push(child);
      indentStack.push(indent);
    } else if (val.startsWith("[")) {
      parent[key] = JSON.parse(val);
    } else if (val === "true") parent[key] = true;
    else if (val === "false") parent[key] = false;
    else if (val === "null" || val === "~") parent[key] = null;
    else if (!isNaN(Number(val))) parent[key] = Number(val);
    else parent[key] = val.replace(/^["']|["']$/g, "");
  }
  return result;
}

function jsonToYaml(obj: any, indent = 0): string {
  if (obj === null || obj === undefined) return "null";
  if (typeof obj === "boolean") return String(obj);
  if (typeof obj === "number") return String(obj);
  if (typeof obj === "string") {
    if (obj.includes("\n") || obj.includes(":") || obj.includes("#")) return `|"${obj}"`;
    if (obj === "true" || obj === "false" || obj === "null" || !isNaN(Number(obj))) return `"${obj}"`;
    return obj;
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    return obj.map((item) => {
      const val = typeof item === "object" && item !== null
        ? "\n" + jsonToYaml(item, indent + 2).split("\n").map((l, i) => i === 0 ? l : " ".repeat(indent + 2) + l).join("\n")
        : " " + jsonToYaml(item, indent + 2);
      return `${" ".repeat(indent)}-${val}`;
    }).join("\n");
  }
  const keys = Object.keys(obj);
  if (keys.length === 0) return "{}";
  return keys.map((k) => {
    const v = obj[k];
    if (typeof v === "object" && v !== null && Object.keys(v).length > 0) {
      return `${" ".repeat(indent)}${k}:\n${jsonToYaml(v, indent + 2)}`;
    }
    return `${" ".repeat(indent)}${k}: ${jsonToYaml(v, indent + 2)}`;
  }).join("\n");
}

export default function YamlJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"yaml2json" | "json2yaml">("yaml2json");
  const [error, setError] = useState("");

  const convert = () => {
    setError("");
    try {
      if (mode === "yaml2json") {
        const result = yamlToJson(input);
        setOutput(JSON.stringify(result, null, 2));
      } else {
        const parsed = JSON.parse(input);
        setOutput(jsonToYaml(parsed));
      }
    } catch (e: any) {
      setError("Conversion error: " + e.message);
    }
  };

  return (
    <div className="tool-layout">
      <div className="tool-mode-row">
        <button className={`tool-mode-btn ${mode === "yaml2json" ? "active" : ""}`} onClick={() => { setMode("yaml2json"); setOutput(""); setError(""); }}>YAML → JSON</button>
        <button className={`tool-mode-btn ${mode === "json2yaml" ? "active" : ""}`} onClick={() => { setMode("json2yaml"); setOutput(""); setError(""); }}>JSON → YAML</button>
      </div>
      <div className="tool-cols">
        <div className="tool-pane">
          <label className="tool-label">{mode === "yaml2json" ? "YAML Input" : "JSON Input"}</label>
          <textarea className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "yaml2json" ? "name: John\nage: 30" : '{"name": "John", "age": 30}'} spellCheck={false} />
        </div>
        <div className="tool-pane">
          <div className="tool-label-row">
            <span className="tool-label">Output</span>
            <CopyButton text={output} />
          </div>
          <textarea className="tool-textarea" value={output} readOnly spellCheck={false} />
          {error && <p className="tool-error">{error}</p>}
        </div>
      </div>
      <button className="tool-btn tool-btn--primary" onClick={convert}>Convert →</button>
    </div>
  );
}