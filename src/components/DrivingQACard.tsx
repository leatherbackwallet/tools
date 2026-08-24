"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DrivingQuestion } from "@/lib/driving";
import { useLang } from "@/lib/i18n";

const letters = ["A", "B", "C"];

export default function DrivingQACard({ q }: { q: DrivingQuestion }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [numericInput, setNumericInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [imgOk, setImgOk] = useState(true);

  const isMulti = q.answers.filter((a) => a.correct).length > 1;
  const isNumber = q.questionType === "number";

  const handleOptionClick = (idx: number) => {
    if (checked) return;
    if (isMulti) {
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(idx)) next.delete(idx);
        else next.add(idx);
        return next;
      });
    } else {
      setSelected(new Set([idx]));
    }
  };

  const handleCheck = () => {
    if (isNumber) {
      setChecked(true);
    } else if (selected.size > 0) {
      setChecked(true);
    }
  };

  const handleReset = () => {
    setSelected(new Set());
    setNumericInput("");
    setChecked(false);
    setShowInfo(false);
  };

  const isCorrect = (() => {
    if (!checked) return false;
    if (isNumber) {
      const num = parseFloat(numericInput);
      return !isNaN(num) && num === q.correctNumber;
    }
    const correctIndices = new Set(
      q.answers.map((a, i) => (a.correct ? i : -1)).filter((i) => i >= 0)
    );
    return (
      selected.size === correctIndices.size &&
      [...selected].every((i) => correctIndices.has(i))
    );
  })();

  return (
    <article className={`qa-card ${open ? "open" : ""}`}>
      <button
        className="qa-head"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="qa-num">{q.id}</span>
        <span className="qa-q">{q.text}</span>
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
              {q.picture && q.questionType !== "video" && (
                <div className="qa-img">
                  {imgOk ? (
                    <img
                      src={`/driving/${q.picture}`}
                      alt={`Question ${q.id}`}
                      onError={() => setImgOk(false)}
                    />
                  ) : (
                    <span className="qa-img-missing">
                      {t.germany.qa.imgMissing}
                    </span>
                  )}
                </div>
              )}

              {q.picture && q.questionType === "video" && (
                <div className="qa-img">
                  <video
                    src={`/driving/${q.picture}`}
                    controls
                    className="qa-video"
                    onError={() => setImgOk(false)}
                  />
                </div>
              )}

              <div className="qa-meta-row">
                <span className="qa-tag">{t.germany.drivingQA.category}: {q.category}</span>
                <span className="qa-tag">{q.points} {t.germany.drivingQA.points}</span>
                <span className="qa-tag">
                  {isMulti ? t.germany.drivingQA.multiAnswer : isNumber ? t.germany.drivingQA.numericAnswer : t.germany.drivingQA.singleAnswer}
                </span>
              </div>

              {isNumber ? (
                <div className="qa-number-row">
                  <input
                    type="number"
                    className="qa-number-input"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    disabled={checked}
                    placeholder={t.germany.drivingQA.numericAnswer}
                  />
                  {q.answerHint && (
                    <span className="qa-hint">{q.answerHint}</span>
                  )}
                </div>
              ) : (
                <ul className="qa-options">
                  {q.answers.map((ans, i) => {
                    const picked = selected.has(i);
                    const correct = checked && ans.correct;
                    const wrong = checked && picked && !ans.correct;
                    let cls = "";
                    if (!checked && picked) cls = "selected";
                    else if (correct) cls = "correct";
                    else if (wrong) cls = "wrong";
                    return (
                      <li
                        key={i}
                        className={cls}
                        onClick={() => handleOptionClick(i)}
                      >
                        <span className="qa-letter">{letters[i]}</span>
                        <span className="qa-opt-text">{ans.text}</span>
                        {!checked && picked && <span className="qa-picked">●</span>}
                        {checked && correct && <span className="qa-check">✓</span>}
                        {wrong && <span className="qa-x">✗</span>}
                      </li>
                    );
                  })}
                </ul>
              )}

              <div className="qa-toolbar">
                {!checked ? (
                  <button
                    className="qa-btn qa-btn--on"
                    onClick={handleCheck}
                    disabled={isNumber ? false : selected.size === 0}
                  >
                    {t.germany.drivingQA.checkButton}
                  </button>
                ) : (
                  <button className="qa-btn qa-btn--on" onClick={handleReset}>
                    {t.germany.drivingQA.resetButton}
                  </button>
                )}
                {checked && (
                  <button
                    className="qa-btn"
                    onClick={() => setShowInfo(!showInfo)}
                  >
                    {t.germany.drivingQA.explanation}
                  </button>
                )}
              </div>

              {checked && (
                <motion.p
                  className={`qa-result ${isCorrect ? "correct" : "wrong"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {isCorrect
                    ? t.germany.drivingQA.correct
                    : t.germany.drivingQA.incorrect}
                  {!isCorrect && (
                    <>
                      <br />
                      <em>
                        {t.germany.drivingQA.correctAnswer}{" "}
                        {isNumber
                          ? `${q.correctNumber} ${q.answerHint}`
                          : q.answers
                              .map((a, i) => (a.correct ? `${letters[i]}: ${a.text}` : null))
                              .filter(Boolean)
                              .join(", ")}
                      </em>
                    </>
                  )}
                </motion.p>
              )}

              {showInfo && q.info && (
                <motion.div
                  className="qa-info"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  dangerouslySetInnerHTML={{ __html: q.info }}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}