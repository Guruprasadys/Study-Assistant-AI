import type { StudySet } from "../types/flashcard";

/**
 * Parses the response received from the backend.
 * The backend may return:
 *
 * 1. JSON Object
 * 2. JSON String
 *
 * This utility safely converts both into a StudySet.
 */

export function parseStudySet(raw: unknown): StudySet {
  let data: any = raw;

  // If backend returns a string, parse it.
  if (typeof raw === "string") {
    try {
      data = JSON.parse(raw);
    } catch {
      throw new Error("The AI returned invalid JSON.");
    }
  }

  if (!data || typeof data !== "object") {
    throw new Error("Study set is empty.");
  }

  if (typeof data.title !== "string") {
    throw new Error("Study title is missing.");
  }

  if (!Array.isArray(data.flashcards)) {
    throw new Error("Flashcards are missing.");
  }

  if (!Array.isArray(data.quiz)) {
    throw new Error("Quiz questions are missing.");
  }

  // Add IDs if Azure doesn't return them
  data.flashcards = data.flashcards.map(
    (card: any, index: number) => ({
      id: card.id ?? index + 1,
      question: String(card.question ?? ""),
      answer: String(card.answer ?? ""),
    })
  );

  data.quiz = data.quiz.map(
    (question: any, index: number) => ({
      id: question.id ?? index + 1,
      question: String(question.question ?? ""),
      options: Array.isArray(question.options)
        ? question.options
        : [],
      correctAnswer: String(question.correctAnswer ?? ""),
      explanation: question.explanation ?? "",
    })
  );

  return {
    title: data.title,
    summary: data.summary ?? "",
    flashcards: data.flashcards,
    quiz: data.quiz,
  };
}