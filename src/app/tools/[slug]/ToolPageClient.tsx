"use client";

import { use } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import SectionHeading from "@/components/SectionHeading";

import JsonCsv from "@/components/tools/JsonCsv";
import Base64Tool from "@/components/tools/Base64Tool";
import RegexTester from "@/components/tools/RegexTester";
import JwtDecoder from "@/components/tools/JwtDecoder";
import CssMinifier from "@/components/tools/CssMinifier";
import GradientGenerator from "@/components/tools/GradientGenerator";
import BoxShadowGenerator from "@/components/tools/BoxShadowGenerator";
import ContrastChecker from "@/components/tools/ContrastChecker";
import WordCounter from "@/components/tools/WordCounter";
import DiffChecker from "@/components/tools/DiffChecker";
import MarkdownPreview from "@/components/tools/MarkdownPreview";
import UrlEncoder from "@/components/tools/UrlEncoder";
import JsonFormatter from "@/components/tools/JsonFormatter";
import YamlJson from "@/components/tools/YamlJson";
import XmlFormatter from "@/components/tools/XmlFormatter";
import HtmlEntity from "@/components/tools/HtmlEntity";
import HtmlJsx from "@/components/tools/HtmlJsx";
import HtmlPreview from "@/components/tools/HtmlPreview";
import SvgPreview from "@/components/tools/SvgPreview";
import SqlFormatter from "@/components/tools/SqlFormatter";
import CronParser from "@/components/tools/CronParser";
import HashGenerator from "@/components/tools/HashGenerator";
import UuidGenerator from "@/components/tools/UuidGenerator";
import LoremGenerator from "@/components/tools/LoremGenerator";
import RegexCheat from "@/components/tools/RegexCheat";
import FlexboxGenerator from "@/components/tools/FlexboxGenerator";
import CssGridGenerator from "@/components/tools/CssGridGenerator";
import CssAnimation from "@/components/tools/CssAnimation";
import PaletteGenerator from "@/components/tools/PaletteGenerator";
import HtmlImage from "@/components/tools/HtmlImage";
import TimestampConverter from "@/components/tools/TimestampConverter";

const toolMap: Record<string, React.ComponentType> = {
  "json-csv": JsonCsv,
  base64: Base64Tool,
  regex: RegexTester,
  jwt: JwtDecoder,
  "css-minifier": CssMinifier,
  gradient: GradientGenerator,
  "box-shadow": BoxShadowGenerator,
  contrast: ContrastChecker,
  "word-counter": WordCounter,
  diff: DiffChecker,
  markdown: MarkdownPreview,
  "url-encoder": UrlEncoder,
  "json-formatter": JsonFormatter,
  "yaml-json": YamlJson,
  "xml-formatter": XmlFormatter,
  "html-entity": HtmlEntity,
  "html-jsx": HtmlJsx,
  "html-preview": HtmlPreview,
  "svg-preview": SvgPreview,
  "sql-formatter": SqlFormatter,
  "cron-parser": CronParser,
  hash: HashGenerator,
  uuid: UuidGenerator,
  lorem: LoremGenerator,
  "regex-cheat": RegexCheat,
  flexbox: FlexboxGenerator,
  "css-grid": CssGridGenerator,
  "css-animation": CssAnimation,
  palette: PaletteGenerator,
  "html-image": HtmlImage,
  timestamp: TimestampConverter,
};

export default function ToolPageClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { t } = useLang();
  const Tool = toolMap[slug];
  const meta = t.tools.items.find((i) => i.slug === slug);

  if (!Tool || !meta) {
    return (
      <main className="container" style={{ paddingTop: 160, paddingBottom: 160, textAlign: "center" }}>
        <h1 style={{ fontSize: 48, fontWeight: 700 }}>404</h1>
        <p className="hero-sub" style={{ marginTop: 16 }}>
          <Link href="/tools/" style={{ color: "var(--accent)" }}>← {t.tools.kicker}</Link>
        </p>
      </main>
    );
  }

  return (
    <main>
      <div className="orb orb--accent" style={{ width: 280, height: 280, top: "3%", right: "-5%" }} />

      <section className="container page-head" style={{ paddingBottom: 20 }}>
        <Link href="/tools/" className="tool-back">← {t.tools.kicker}</Link>
        <SectionHeading kicker={t.tools.kicker} line1={meta.name} line2="" />
      </section>

      <section className="container" style={{ paddingBottom: 100 }}>
        <Tool />
      </section>
    </main>
  );
}