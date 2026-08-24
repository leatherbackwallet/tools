"use client";

import { useMemo, useState } from "react";
import { useLang } from "@/lib/i18n";
import SectionHeading from "@/components/SectionHeading";
import { Reveal } from "@/components/motion";
import DrivingQACard from "@/components/DrivingQACard";
import QuizMode, { type QuizQuestion } from "@/components/QuizMode";
import { drivingQuestions } from "@/lib/driving";

export default function DrivingLicensePage() {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [quizMode, setQuizMode] = useState(false);
  const [quizCat, setQuizCat] = useState("");

  const filtered = useMemo(() => {
    let list = drivingQuestions;
    if (catFilter) {
      list = list.filter((q) => q.category === catFilter);
    }
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (item) =>
        item.id.toLowerCase().includes(q) ||
        item.text.toLowerCase().includes(q) ||
        item.answers.some((a) => a.text.toLowerCase().includes(q))
    );
  }, [query, catFilter]);

  const categories = useMemo(() => {
    const cats = new Map<string, number>();
    drivingQuestions.forEach((q) => {
      cats.set(q.category, (cats.get(q.category) || 0) + 1);
    });
    return [...cats.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, []);

  const quizQuestions: QuizQuestion[] = useMemo(() => {
    let pool = drivingQuestions;
    if (quizCat) pool = pool.filter((q) => q.category === quizCat);
    return pool.map((q) => ({
      id: q.id,
      text: q.text,
      options: q.answers.map((a) => a.text),
      correctIndices: q.answers
        .map((a, i) => (a.correct ? i : -1))
        .filter((i) => i >= 0),
      isMulti: q.answers.filter((a) => a.correct).length > 1,
      isNumber: q.questionType === "number",
      correctNumber: q.correctNumber,
      answerHint: q.answerHint,
      picture: q.picture,
    }));
  }, [quizCat]);

  return (
    <main>
      <div className="orb orb--accent" style={{ width: 340, height: 340, top: "4%", right: "-6%" }} />

      <section className="container page-head" style={{ paddingBottom: 0 }}>
        <SectionHeading
          kicker={t.germany.drivingQA.category}
          line1={t.germany.drivingTitle}
          line2=""
        />
      </section>

      <section className="container" style={{ paddingBottom: 100 }}>
        <Reveal>
          <div className="qa-controls">
            <input
              type="search"
              className="qa-search"
              placeholder={t.germany.drivingQA.search}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={t.germany.drivingQA.search}
            />
            {!quizMode && (
              <select
                className="qa-select"
                value={catFilter}
                onChange={(e) => setCatFilter(e.target.value)}
              >
                <option value="">All categories ({drivingQuestions.length})</option>
                {categories.map(([cat, count]) => (
                  <option key={cat} value={cat}>
                    {cat} ({count})
                  </option>
                ))}
              </select>
            )}
            <button
              className={`tool-mode-btn ${quizMode ? "active" : ""}`}
              onClick={() => setQuizMode(!quizMode)}
            >
              🧠 Quiz Mode
            </button>
            <span className="qa-count">
              {quizMode ? quizQuestions.length : filtered.length} {t.germany.drivingQA.of} {drivingQuestions.length}{" "}
              {t.germany.drivingQA.questions}
            </span>
          </div>
          <p className="hero-sub" style={{ fontSize: 14, marginTop: 10 }}>
            {t.germany.drivingQA.expand}
          </p>
        </Reveal>

        {quizMode ? (
          <>
            <Reveal delay={0.05}>
              <div className="quiz-cat-filter" style={{ marginBottom: 20 }}>
                <select
                  className="qa-select"
                  value={quizCat}
                  onChange={(e) => setQuizCat(e.target.value)}
                >
                  <option value="">All categories ({drivingQuestions.length})</option>
                  {categories.map(([cat, count]) => (
                    <option key={cat} value={cat}>
                      {cat} ({count})
                    </option>
                  ))}
                </select>
              </div>
            </Reveal>
            <QuizMode
              questions={quizQuestions}
              title="Driving License Quiz"
              onComplete={() => setQuizMode(false)}
            />
          </>
        ) : (
          <div className="qa-list">
            {filtered.map((q) => (
              <DrivingQACard key={q.id} q={q} />
            ))}
            {filtered.length === 0 && (
              <p className="hero-sub" style={{ marginTop: 40 }}>—</p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}