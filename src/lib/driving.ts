import raw from "@/DrivingLessiosn.json";

export type QuestionType = "text_only" | "text_image" | "video" | "number";

export type DrivingQuestion = {
  id: string;
  text: string;
  questionType: QuestionType;
  category: string;
  points: number;
  info: string;
  picture: string;
  stvo: string;
  // for text/image/video: up to 3 answers
  answers: { text: string; correct: boolean }[];
  // for number type
  correctNumber: number | null;
  answerHint: string;
};

const rawObj = raw as Record<string, Record<string, unknown>>;

export const drivingQuestions: DrivingQuestion[] = Object.entries(rawObj).map(
  ([id, q]) => {
    const questionType = (q.type as QuestionType) || "text_only";

    if (questionType === "number") {
      return {
        id,
        text: q.text as string,
        questionType,
        category: (q.category as string) || "",
        points: (q.points as number) || 0,
        info: (q.info as string) || "",
        picture: (q.picture as string) || "",
        stvo: (q.stvo as string) || "",
        answers: [],
        correctNumber: (q.asw_corr1 as number) ?? null,
        answerHint: (q.asw_hint as string) || "",
      };
    }

    const answers: { text: string; correct: boolean }[] = [];
    for (let i = 1; i <= 3; i++) {
      const text = (q[`asw_${i}`] as string) || "";
      const correct = (q[`asw_corr${i}`] as number) === 1;
      if (text) answers.push({ text, correct });
    }

    return {
      id,
      text: (q.text as string) || "",
      questionType,
      category: (q.category as string) || "",
      points: (q.points as number) || 0,
      info: (q.info as string) || "",
      picture: (q.picture as string) || "",
      stvo: (q.stvo as string) || "",
      answers,
      correctNumber: null,
      answerHint: (q.asw_hint as string) || "",
    };
  }
);

export const drivingCategories = [
  ...new Set(drivingQuestions.map((q) => q.category)),
].sort();

export type DrivingQuestionList = DrivingQuestion[];
