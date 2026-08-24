"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/i18n";

export type QuizQuestion = {
  id: string | number;
  text: string;
  options: string[];
  correctIndices: number[];
  isMulti: boolean;
  isNumber?: boolean;
  correctNumber?: number | null;
  answerHint?: string;
  picture?: string;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const letters = ["A", "B", "C", "D"];

export default function QuizMode({
  questions,
  title,
  onComplete,
}: {
  questions: QuizQuestion[];
  title: string;
  onComplete?: () => void;
}) {
  const { t } = useLang();
  const [started, setStarted] = useState(false);
  const [shuffled] = useState(() => shuffle(questions));
  const [current, setCurrent] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [numericInput, setNumericInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [finished, setFinished] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const q = shuffled[current];
  const total = shuffled.length;
  const progress = ((current + 1) / total) * 100;

  const handleOptionClick = useCallback(
    (idx: number) => {
      if (checked) return;
      if (q.isMulti) {
        setSelected((prev) => {
          const next = new Set(prev);
          if (next.has(idx)) next.delete(idx);
          else next.add(idx);
          return next;
        });
      } else {
        setSelected(new Set([idx]));
      }
    },
    [checked, q.isMulti]
  );

  const handleCheck = useCallback(() => {
    if (q.isNumber) {
      const num = parseFloat(numericInput);
      const correct = !isNaN(num) && num === q.correctNumber;
      setIsCorrect(correct);
      setChecked(true);
      return;
    }
    if (selected.size === 0) return;
    const correctSet = new Set(q.correctIndices);
    const ok =
      selected.size === correctSet.size &&
      [...selected].every((i) => correctSet.has(i));
    setIsCorrect(ok);
    setChecked(true);
  }, [q, selected, numericInput]);

  const handleNext = useCallback(() => {
    if (isCorrect) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const next = s + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
    } else {
      setLives((l) => l - 1);
      setStreak(0);
    }

    if (current + 1 >= total || (!isCorrect && lives <= 1)) {
      setFinished(true);
      return;
    }

    setCurrent((c) => c + 1);
    setSelected(new Set());
    setNumericInput("");
    setChecked(false);
    setIsCorrect(false);
  }, [isCorrect, current, total, lives]);

  const handleStart = () => {
    setStarted(true);
    setCurrent(0);
    setLives(3);
    setScore(0);
    setSelected(new Set());
    setNumericInput("");
    setChecked(false);
    setIsCorrect(false);
    setFinished(false);
    setStreak(0);
    setBestStreak(0);
  };

  if (!started) {
    return (
      <div className="quiz-intro">
        <div className="quiz-intro-icon">🧠</div>
        <h3 className="quiz-intro-title">{title}</h3>
        <p className="quiz-intro-desc">
          {total} questions · 3 lives · Randomized order
        </p>
        <p className="quiz-intro-sub">
          Answer correctly to keep your lives. Lose all3 and it&apos;s game over.
        </p>
        <button className="tool-btn tool-btn--primary quiz-start-btn" onClick={handleStart}>
          Start Quiz →
        </button>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / total) * 100);
    const livesLeft = lives;
    const passed = livesLeft > 0;
    return (
      <div className="quiz-results">
        <div className="quiz-results-icon">{passed ? "🎉" : "💀"}</div>
        <h3 className="quiz-results-title">
          {passed ? "Quiz Complete!" : "Game Over"}
        </h3>
        <div className="quiz-results-stats">
          <div className="quiz-stat">
            <span className="quiz-stat-value">{score}/{total}</span>
            <span className="quiz-stat-label">Correct</span>
          </div>
          <div className="quiz-stat">
            <span className="quiz-stat-value">{pct}%</span>
            <span className="quiz-stat-label">Accuracy</span>
          </div>
          <div className="quiz-stat">
            <span className="quiz-stat-value">{bestStreak}</span>
            <span className="quiz-stat-label">Best Streak</span>
          </div>
          <div className="quiz-stat">
            <span className="quiz-stat-value">{livesLeft}/3</span>
            <span className="quiz-stat-label">Lives Left</span>
          </div>
        </div>
        <div className="quiz-results-actions">
          <button className="tool-btn tool-btn--primary" onClick={handleStart}>
            Try Again
          </button>
          {onComplete && (
            <button className="tool-btn" onClick={onComplete}>
              Back to Q&A
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-active">
      {/* Header bar */}
      <div className="quiz-header">
        <div className="quiz-lives">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`quiz-heart ${i < lives ? "alive" : "dead"}`}>
              {i < lives ? "❤️" : "🖤"}
            </span>
          ))}
        </div>
        <div className="quiz-progress-info">
          <span className="quiz-counter">{current + 1} / {total}</span>
          {streak >= 3 && <span className="quiz-streak">🔥 {streak}</span>}
        </div>
        <div className="quiz-score">Score: {score}</div>
      </div>

      {/* Progress bar */}
      <div className="quiz-progress-bar">
        <motion.div
          className="quiz-progress-fill"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="quiz-question-card"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
        >
          {q.picture && (
            <div className="quiz-img-wrap">
              <img
                src={`/driving/${q.picture}`}
                alt={`Question ${q.id}`}
                className="quiz-img"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          )}

          <p className="quiz-question-text">{q.text}</p>

          {q.isNumber ? (
            <div className="quiz-number-row">
              <input
                type="number"
                className="tool-input quiz-number-input"
                value={numericInput}
                onChange={(e) => setNumericInput(e.target.value)}
                disabled={checked}
                placeholder="Your answer"
                onKeyDown={(e) => { if (e.key === "Enter" && !checked) handleCheck(); }}
              />
              {q.answerHint && <span className="tool-hint">{q.answerHint}</span>}
            </div>
          ) : (
            <div className="quiz-options">
              {q.options.map((opt, i) => {
                const picked = selected.has(i);
                const correct = checked && q.correctIndices.includes(i);
                const wrong = checked && picked && !q.correctIndices.includes(i);
                let cls = "quiz-option";
                if (!checked && picked) cls += " selected";
                else if (correct) cls += " correct";
                else if (wrong) cls += " wrong";
                return (
                  <button
                    key={i}
                    className={cls}
                    onClick={() => handleOptionClick(i)}
                    disabled={checked}
                  >
                    <span className="quiz-option-letter">{letters[i]}</span>
                    <span className="quiz-option-text">{opt}</span>
                    {checked && correct && <span className="quiz-option-icon">✓</span>}
                    {wrong && <span className="quiz-option-icon">✗</span>}
                  </button>
                );
              })}
            </div>
          )}

          {q.isMulti && q.options.length > 1 && !checked && (
            <p className="quiz-hint">Select all correct answers</p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Feedback */}
      <AnimatePresence>
        {checked && (
          <motion.div
            className={`quiz-feedback ${isCorrect ? "correct" : "wrong"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <span className="quiz-feedback-icon">{isCorrect ? "✓" : "✗"}</span>
            <span>{isCorrect ? "Correct!" : "Wrong!"}</span>
            {!isCorrect && q.isNumber && (
              <span className="quiz-feedback-answer">
                Answer: {q.correctNumber} {q.answerHint}
              </span>
            )}
            {!isCorrect && !q.isNumber && (
              <span className="quiz-feedback-answer">
                Answer: {q.correctIndices.map((i) => `${letters[i]}`).join(", ")}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="quiz-actions">
        {!checked ? (
          <button
            className="tool-btn tool-btn--primary"
            onClick={handleCheck}
            disabled={q.isNumber ? false : selected.size === 0}
          >
            Check Answer
          </button>
        ) : (
          <button className="tool-btn tool-btn--primary" onClick={handleNext}>
            {current + 1 >= total || (!isCorrect && lives <= 1) ? "See Results" : "Next Question →"}
          </button>
        )}
      </div>
    </div>
  );
}