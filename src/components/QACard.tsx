"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { QAQuestion } from "@/lib/qa";
import { useLang } from "@/lib/i18n";

const letters = ["A", "B", "C", "D"];

export default function QACard({ q }: { q: QAQuestion }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [showEn, setShowEn] = useState(false);
  const [imgOk, setImgOk] = useState(true);

  const handleOptionClick = (idx: number) => {
    if (selected === null) {
      setSelected(idx + 1);
    }
  };

  const isCorrect = selected !== null && selected === q.correctAnswer;
  const showFeedback = selected !== null;

  return (
    <article className={`qa-card ${open ? "open" : ""}`}>
      <button className="qa-head" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="qa-num">{q.id}</span>
        <span className="qa-q">
          {showEn && q.question_trans ? q.question_trans : q.question}
        </span>
        <span className="qa-chevron">{open ? "−" : "+"}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="qa-body">
              {q.img && (
                <div className="qa-img">
                  {imgOk ? (
                    <img
                      src={`/einburger/${q.img}`}
                      alt={`Frage ${q.id}`}
                      onError={() => setImgOk(false)}
                    />
                  ) : (
                    <span className="qa-img-missing">{t.germany.qa.imgMissing}</span>
                  )}
                </div>
              )}

              <div className="qa-toolbar">
                <button
                  className={`qa-btn ${showFeedback ? "qa-btn--on" : ""}`}
                  onClick={() => setSelected(null)}
                  disabled={selected === null}
                >
                  {t.germany.qa.reset}
                </button>
                <button
                  className={`qa-btn qa-btn--lang ${showEn ? "qa-btn--on" : ""}`}
                  onClick={() => setShowEn(!showEn)}
                  title={t.germany.qa.translateOn}
                >
                  {t.germany.qa.translate}
                </button>
              </div>

              <ul className="qa-options">
                {q.options.map((opt, i) => {
                  const idx = i + 1;
                  const picked = showFeedback && selected === idx;
                  const correct = q.correctAnswer === idx;
                  const wrong = picked && !correct;
                  let cls = "";
                  if (correct && showFeedback) cls = "correct";
                  else if (wrong) cls = "wrong";
                  return (
                    <li key={i} className={cls} onClick={() => handleOptionClick(i)}>
                      <span className="qa-letter">{letters[i]}</span>
                      <span className="qa-opt-text">
                        {opt}
                        {showEn && q.options_trans[i] && (
                          <em>{q.options_trans[i]}</em>
                        )}
                      </span>
                      {showFeedback && correct && <span className="qa-check">✓</span>}
                      {wrong && <span className="qa-x">✗</span>}
                    </li>
                  );
                })}
              </ul>

              {showFeedback && (
                <motion.p
                  className={`qa-result ${isCorrect ? "correct" : "wrong"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {isCorrect ? t.germany.qa.correct : t.germany.qa.incorrect}
                  {showEn && !isCorrect && (
                    <>
                      <br />
                      <em>
                        {t.germany.qa.correctAnswer} {letters[q.correctAnswer - 1]}:
                        {q.options[q.correctAnswer - 1]} - {q.options_trans[q.correctAnswer - 1]}
                      </em>
                    </>
                  )}
                  {!showEn && !isCorrect && (
                    <>
                      <br />
                      <em>
                        {t.germany.qa.correctAnswer} {letters[q.correctAnswer - 1]}:
                        {q.options[q.correctAnswer - 1]}
                      </em>
                    </>
                  )}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}