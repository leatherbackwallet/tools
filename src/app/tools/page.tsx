"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import SectionHeading from "@/components/SectionHeading";
import { Reveal } from "@/components/motion";

const categoryColors: Record<string, string> = {
  developer: "#FF5A26",
  design: "#a855f7",
  text: "#3b82f6",
};

const devSlugs = ["json-csv", "base64", "regex", "jwt", "css-minifier", "url-encoder", "json-formatter", "yaml-json", "xml-formatter", "html-entity", "html-jsx", "hash", "uuid", "cron-parser", "regex-cheat", "sql-formatter"];
const designSlugs = ["gradient", "box-shadow", "contrast", "flexbox", "css-grid", "css-animation", "palette"];
const textSlugs = ["word-counter", "diff", "markdown", "lorem", "html-preview", "svg-preview", "html-image", "timestamp"];

export default function ToolsPage() {
  const { t } = useLang();

  const findItems = (slugs: string[]) =>
    slugs.map((s) => t.tools.items.find((i) => i.slug === s)).filter(Boolean) as typeof t.tools.items;

  const renderGroup = (label: string, slugs: string[], color: string) => {
    const items = findItems(slugs);
    if (items.length === 0) return null;
    return (
      <div className="tool-group">
        <h3 className="tool-group-title" style={{ color }}>{label}</h3>
        <div className="tool-grid">
          {items.map((item) => (
            <Reveal key={item.slug}>
              <Link href={`/tools/${item.slug}/`} className="tool-card">
                <span className="tool-card-name">{item.name}</span>
                <span className="tool-card-desc">{item.desc}</span>
                <span className="tool-card-arrow">→</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    );
  };

  return (
    <main>
      <div className="orb orb--accent" style={{ width: 340, height: 340, top: "4%", right: "-6%" }} />

      <section className="container page-head">
        <SectionHeading
          kicker={t.tools.kicker}
          line1={t.tools.title1}
          line2={t.tools.title2}
        />
      </section>

      <section className="container" style={{ paddingBottom: 100 }}>
        <Reveal>
          <p className="hero-sub" style={{ maxWidth: 640, fontSize: 18, marginBottom: 50 }}>
            {t.tools.subtitle}
          </p>
        </Reveal>

        {renderGroup(t.tools.categories.developer, devSlugs, categoryColors.developer)}
        {renderGroup(t.tools.categories.design, designSlugs, categoryColors.design)}
        {renderGroup(t.tools.categories.text, textSlugs, categoryColors.text)}
      </section>
    </main>
  );
}