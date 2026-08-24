"use client";

import { useMemo, useState } from "react";
import { useLang } from "@/lib/i18n";
import SectionHeading from "@/components/SectionHeading";
import { Reveal } from "@/components/motion";
import QACard from "@/components/QACard";
import QuizMode, { type QuizQuestion } from "@/components/QuizMode";
import { qaQuestions } from "@/lib/qa";

export default function EinburgertestPage() {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [quizMode, setQuizMode] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return qaQuestions;
    return qaQuestions.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.question_trans.toLowerCase().includes(q) ||
        item.options.some((o) => o.toLowerCase().includes(q))
    );
  }, [query]);

  const quizQuestions: QuizQuestion[] = useMemo(
    () =>
      qaQuestions.map((q) => ({
        id: q.id,
        text: q.question,
        options: q.options,
        correctIndices: [q.correctAnswer],
        isMulti: false,
      })),
    []
  );

  return (
    <main>
      <div className="orb orb--gray" style={{ width: 340, height: 340, top: "4%", right: "-6%" }} />

      <section className="container page-head" style={{ paddingBottom: 0 }}>
        <SectionHeading
          kicker={t.germany.qa.kicker}
          line1={t.germany.qa.title1}
          line2={t.germany.qa.title2}
        />
      </section>

      <section className="container" style={{ paddingBottom: 100 }}>
        <Reveal>
          <div className="qa-controls">
            <input
              type="search"
              className="qa-search"
              placeholder={t.germany.qa.search}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={t.germany.qa.search}
            />
            <button
              className={`tool-mode-btn ${quizMode ? "active" : ""}`}
              onClick={() => setQuizMode(!quizMode)}
            >
              🧠 Quiz Mode
            </button>
            <span className="qa-count">
              {filtered.length} {t.germany.qa.of} {qaQuestions.length}{" "}
              {t.germany.qa.questions}
            </span>
          </div>
          <p className="hero-sub" style={{ fontSize: 14, marginTop: 10 }}>
            {t.germany.qa.expand}
          </p>
        </Reveal>

        {quizMode ? (
          <QuizMode
            questions={quizQuestions}
            title="Einbürgerungstest Quiz"
            onComplete={() => setQuizMode(false)}
          />
        ) : (
          <div className="qa-list">
            {filtered.map((q) => (
              <QACard key={q.id} q={q} />
            ))}
            {filtered.length === 0 && (
              <p className="hero-sub" style={{ marginTop: 40 }}>
                —
              </p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}