"use client";

import { useState } from "react";

const cheatSheet = [
  { category: "Character Classes", items: [
    { pattern: ".", desc: "Any character except newline" },
    { pattern: "\\d", desc: "Digit [0-9]" },
    { pattern: "\\D", desc: "Non-digit" },
    { pattern: "\\w", desc: "Word character [a-zA-Z0-9_]" },
    { pattern: "\\W", desc: "Non-word character" },
    { pattern: "\\s", desc: "Whitespace" },
    { pattern: "\\S", desc: "Non-whitespace" },
  ]},
  { category: "Quantifiers", items: [
    { pattern: "*", desc: "Zero or more" },
    { pattern: "+", desc: "One or more" },
    { pattern: "?", desc: "Zero or one" },
    { pattern: "{n}", desc: "Exactly n times" },
    { pattern: "{n,}", desc: "n or more times" },
    { pattern: "{n,m}", desc: "Between n and m times" },
  ]},
  { category: "Anchors", items: [
    { pattern: "^", desc: "Start of string/line" },
    { pattern: "$", desc: "End of string/line" },
    { pattern: "\\b", desc: "Word boundary" },
  ]},
  { category: "Groups & Lookaround", items: [
    { pattern: "(abc)", desc: "Capture group" },
    { pattern: "(?:abc)", desc: "Non-capturing group" },
    { pattern: "(?<name>abc)", desc: "Named group" },
    { pattern: "a|b", desc: "Alternation (a or b)" },
    { pattern: "(?=abc)", desc: "Positive lookahead" },
    { pattern: "(?!abc)", desc: "Negative lookahead" },
  ]},
  { category: "Character Sets", items: [
    { pattern: "[abc]", desc: "Match a, b, or c" },
    { pattern: "[^abc]", desc: "Not a, b, or c" },
    { pattern: "[a-z]", desc: "Range: a to z" },
  ]},
  { category: "Flags", items: [
    { pattern: "g", desc: "Global (all matches)" },
    { pattern: "i", desc: "Case-insensitive" },
    { pattern: "m", desc: "Multiline" },
    { pattern: "s", desc: "Dotall (dot matches newline)" },
  ]},
];

export default function RegexCheat() {
  const [search, setSearch] = useState("");

  const filtered = cheatSheet.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.pattern.toLowerCase().includes(search.toLowerCase()) ||
        item.desc.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className="tool-layout">
      <div className="tool-field">
        <label className="tool-label">Search</label>
        <input className="tool-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patterns…" />
      </div>
      <div className="tool-cheat-list">
        {filtered.map((cat) => (
          <div key={cat.category} className="tool-cheat-group">
            <h4 className="tool-cheat-cat">{cat.category}</h4>
            <div className="tool-cheat-items">
              {cat.items.map((item) => (
                <div key={item.pattern} className="tool-cheat-row">
                  <code className="tool-cheat-pattern">{item.pattern}</code>
                  <span className="tool-cheat-desc">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}