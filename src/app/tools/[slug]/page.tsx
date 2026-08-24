import ToolPageClient from "./ToolPageClient";

export const generateStaticParams = () => [
  { slug: "json-csv" },
  { slug: "base64" },
  { slug: "regex" },
  { slug: "jwt" },
  { slug: "css-minifier" },
  { slug: "gradient" },
  { slug: "box-shadow" },
  { slug: "contrast" },
  { slug: "word-counter" },
  { slug: "diff" },
  { slug: "markdown" },
  { slug: "url-encoder" },
  { slug: "json-formatter" },
  { slug: "yaml-json" },
  { slug: "xml-formatter" },
  { slug: "html-entity" },
  { slug: "html-jsx" },
  { slug: "html-preview" },
  { slug: "svg-preview" },
  { slug: "sql-formatter" },
  { slug: "cron-parser" },
  { slug: "hash" },
  { slug: "uuid" },
  { slug: "lorem" },
  { slug: "regex-cheat" },
  { slug: "flexbox" },
  { slug: "css-grid" },
  { slug: "css-animation" },
  { slug: "palette" },
  { slug: "html-image" },
  { slug: "timestamp" },
];

export default function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  return <ToolPageClient params={params} />;
}