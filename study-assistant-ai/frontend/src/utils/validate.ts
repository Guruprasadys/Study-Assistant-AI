import type { StudySet } from "../types/flashcard";

/**
 * Validates the Study Set returned by Azure OpenAI.
 * Returns null if valid, otherwise an error message.
 */
export function validateStudySet(
  studySet: StudySet
): string | null {
  if (!studySet) {
    return "No study material was generated.";
  }

  // -----------------------------
  // Title
  // -----------------------------
  if (
    typeof studySet.title !== "string" ||
    studySet.title.trim() === ""
  ) {
    return "Study title is missing.";
  }

  // -----------------------------
  // Flashcards
  // -----------------------------
  if (!Array.isArray(studySet.flashcards)) {
    return "Flashcards are missing.";
  }

  if (studySet.flashcards.length === 0) {
    return "No flashcards were generated.";
  }

  for (const card of studySet.flashcards) {
    if (
      typeof card.question !== "string" ||
      card.question.trim() === ""
    ) {
      return "A flashcard question is missing.";
    }

    if (
      typeof card.answer !== "string" ||
      card.answer.trim() === ""
    ) {
      return "A flashcard answer is missing.";
    }
  }

  // -----------------------------
  // Quiz
  // -----------------------------
  if (!Array.isArray(studySet.quiz)) {
    return "Quiz section is missing.";
  }

  if (studySet.quiz.length === 0) {
    return "No quiz questions were generated.";
  }

  for (const quiz of studySet.quiz) {
    if (
      typeof quiz.question !== "string" ||
      quiz.question.trim() === ""
    ) {
      return "A quiz question is missing.";
    }

    if (!Array.isArray(quiz.options)) {
      return "Quiz options are invalid.";
    }

    if (quiz.options.length !== 4) {
      return "Each quiz question must contain exactly four options.";
    }

    for (const option of quiz.options) {
      if (
        typeof option !== "string" ||
        option.trim() === ""
      ) {
        return "A quiz option is empty.";
      }
    }

    if (
      typeof quiz.correctAnswer !== "string" ||
      quiz.correctAnswer.trim() === ""
    ) {
      return "Correct answer is missing.";
    }

    if (!quiz.options.includes(quiz.correctAnswer)) {
      return "Correct answer must match one of the options.";
    }
  }

  return null;
}