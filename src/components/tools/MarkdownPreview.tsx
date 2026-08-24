"use client";

import { useState, useMemo } from "react";
import { CopyButton } from "./ToolShell";

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function mdToHTML(md: string): string {
  let html = escapeHtml(md);
  // Headers
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");
  // Bold & italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Inline code
  html = html.replace(/`(.+?)`/g, "<code>$1</code>");
  // Links
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>');
  // Images
  html = html.replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" />');
  // Unordered lists
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>");
  // Horizontal rule
  html = html.replace(/^---$/gm, "<hr>");
  // Line breaks → paragraphs
  html = html.replace(/\n\n+/g, "</p><p>");
  html = "<p>" + html + "</p>";
  html = html.replace(/<p>\s*<(h[1-3]|ul|hr|img|code)/g, "<$1");
  html = html.replace(/<\/(h[1-3]|ul|hr|img|code)>\s*<\/p>/g, "</$1>");
  html = html.replace(/<p>\s*<\/p>/g, "");
  return html;
}

export default function MarkdownPreview() {
  const [md, setMd] = useState("# Hello World\n\nThis is **bold** and *italic* text.\n\n- Item one\n- Item two\n- Item three\n\n---\n\nA [link](https://example.com) and `inline code`.");

  const html = useMemo(() => mdToHTML(md), [md]);

  return (
    <div className="tool-layout">
      <div className="tool-cols">
        <div className="tool-pane">
          <div className="tool-label-row">
            <span className="tool-label">Markdown</span>
            <CopyButton text={html} />
          </div>
          <textarea className="tool-textarea tool-textarea--tall" value={md} onChange={(e) => setMd(e.target.value)} spellCheck={false} />
        </div>
        <div className="tool-pane">
          <label className="tool-label">Preview</label>
          <div className="tool-markdown-preview" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  );
}