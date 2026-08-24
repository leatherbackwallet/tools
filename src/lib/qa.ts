import qa from "@/EinburgerTestQA.json";

export type QAQuestion = {
  id: number;
  question: string;
  question_trans: string;
  options: string[];
  options_trans: string[];
  correctAnswer: number;
  img?: string;
};

export const qaQuestions: QAQuestion[] = (
  qa as { title: string; questions: QAQuestion[] }
).questions;
