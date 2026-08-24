"use client";

import { useState } from "react";
import { CopyButton } from "./ToolShell";

export default function HtmlJsx() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"html2jsx" | "jsx2html">("html2jsx");

  const convert = () => {
    if (mode === "html2jsx") {
      let result = input
        .replace(/class=/g, "className=")
        .replace(/for=/g, "htmlFor=")
        .replace(/tabindex=/g, "tabIndex=")
        .replace(/colspan=/g, "colSpan=")
        .replace(/rowspan=/g, "rowSpan=")
        .replace(/readonly/g, "readOnly")
        .replace(/maxlength=/g, "maxLength=")
        .replace(/minlength=/g, "minLength=")
        .replace(/cellpadding=/g, "cellPadding=")
        .replace(/cellspacing=/g, "cellSpacing=")
        .replace(/crossorigin=/g, "crossOrigin=")
        .replace(/srcdoc=/g, "srcDoc=")
        .replace(/autocomplete=/g, "autoComplete=")
        .replace(/autofocus=/g, "autoFocus=")
        .replace(/enctype=/g, "encType=")
        .replace(/formaction=/g, "formAction=")
        .replace(/novalidate/g, "noValidate")
        .replace(/formnovalidate/g, "formNoValidate")
        .replace(/allowfullscreen/g, "allowFullScreen")
        .replace(/contenteditable=/g, "contentEditable=")
        .replace(/accesskey=/g, "accessKey=")
        .replace(/frameborder=/g, "frameBorder=")
        .replace(/marginheight=/g, "marginHeight=")
        .replace(/marginwidth=/g, "marginWidth=")
        .replace(/<img ([^>]*?)\/?>/g, "<img $1 />")
        .replace(/<input ([^>]*?)\/?>/g, "<input $1 />")
        .replace(/<br\s*\/?>/g, "<br />")
        .replace(/<hr\s*\/?>/g, "<hr />");
      setOutput(result);
    } else {
      let result = input
        .replace(/className=/g, "class=")
        .replace(/htmlFor=/g, "for=")
        .replace(/tabIndex=/g, "tabindex=")
        .replace(/colSpan=/g, "colspan=")
        .replace(/rowSpan=/g, "rowspan=")
        .replace(/readOnly/g, "readonly")
        .replace(/maxLength=/g, "maxlength=")
        .replace(/minLength=/g, "minlength=")
        .replace(/cellPadding=/g, "cellpadding=")
        .replace(/cellSpacing=/g, "cellspacing=")
        .replace(/crossOrigin=/g, "crossorigin=")
        .replace(/srcDoc=/g, "srcdoc=")
        .replace(/autoComplete=/g, "autocomplete=")
        .replace(/autoFocus=/g, "autofocus=")
        .replace(/encType=/g, "enctype=")
        .replace(/formAction=/g, "formaction=")
        .replace(/noValidate/g, "novalidate")
        .replace(/formNoValidate/g, "formnovalidate")
        .replace(/allowFullScreen/g, "allowfullscreen")
        .replace(/contentEditable=/g, "contenteditable=")
        .replace(/accessKey=/g, "accesskey=")
        .replace(/frameBorder=/g, "frameborder=")
        .replace(/marginHeight=/g, "marginheight=")
        .replace(/marginWidth=/g, "marginwidth=")
        .replace(/\s*\/>/g, ">")
        .replace(/<img ([^>]*?) ?>/g, "<img $1>")
        .replace(/<input ([^>]*?) ?>/g, "<input $1>")
        .replace(/<br \/>/g, "<br>")
        .replace(/<hr \/>/g, "<hr>");
      setOutput(result);
    }
  };

  return (
    <div className="tool-layout">
      <div className="tool-mode-row">
        <button className={`tool-mode-btn ${mode === "html2jsx" ? "active" : ""}`} onClick={() => { setMode("html2jsx"); setOutput(""); }}>HTML → JSX</button>
        <button className={`tool-mode-btn ${mode === "jsx2html" ? "active" : ""}`} onClick={() => { setMode("jsx2html"); setOutput(""); }}>JSX → HTML</button>
      </div>
      <div className="tool-cols">
        <div className="tool-pane">
          <label className="tool-label">{mode === "html2jsx" ? "HTML Input" : "JSX Input"}</label>
          <textarea className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} placeholder='<div class="hello">Content</div>' spellCheck={false} />
        </div>
        <div className="tool-pane">
          <div className="tool-label-row">
            <span className="tool-label">Output</span>
            <CopyButton text={output} />
          </div>
          <textarea className="tool-textarea" value={output} readOnly spellCheck={false} />
        </div>
      </div>
      <button className="tool-btn tool-btn--primary" onClick={convert}>Convert →</button>
    </div>
  );
}