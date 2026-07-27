/**
 * Validate the Study Set returned by Azure OpenAI.
 * Returns:
 *   null -> valid
 *   string -> validation error
 */

export function validateStudySet(data) {
  // -----------------------------
  // Root Object
  // -----------------------------
  if (!data || typeof data !== "object") {
    return "Study set is empty or invalid.";
  }

  // -----------------------------
  // Title
  // -----------------------------
  if (typeof data.title !== "string") {
    return "Missing study set title.";
  }

  if (!data.title.trim()) {
    return "Study set title cannot be empty.";
  }

  // -----------------------------
  // Flashcards
  // -----------------------------
  if (!Array.isArray(data.flashcards)) {
    return "Flashcards must be an array.";
  }

  if (data.flashcards.length === 0) {
    return "At least one flashcard is required.";
  }

  for (let i = 0; i < data.flashcards.length; i++) {
    const card = data.flashcards[i];

    if (!card || typeof card !== "object") {
      return `Flashcard ${i + 1} is invalid.`;
    }

    if (typeof card.question !== "string") {
      return `Flashcard ${i + 1} question is missing.`;
    }

    if (!card.question.trim()) {
      return `Flashcard ${i + 1} question cannot be empty.`;
    }

    if (typeof card.answer !== "string") {
      return `Flashcard ${i + 1} answer is missing.`;
    }

    if (!card.answer.trim()) {
      return `Flashcard ${i + 1} answer cannot be empty.`;
    }
  }

  // -----------------------------
  // Quiz
  // -----------------------------
  if (!Array.isArray(data.quiz)) {
    return "Quiz must be an array.";
  }

  if (data.quiz.length === 0) {
    return "At least one quiz question is required.";
  }

  for (let i = 0; i < data.quiz.length; i++) {
    const item = data.quiz[i];

    if (!item || typeof item !== "object") {
      return `Quiz ${i + 1} is invalid.`;
    }

    if (typeof item.question !== "string") {
      return `Quiz ${i + 1} question is missing.`;
    }

    if (!item.question.trim()) {
      return `Quiz ${i + 1} question cannot be empty.`;
    }

    if (!Array.isArray(item.options)) {
      return `Quiz ${i + 1} options must be an array.`;
    }

    if (item.options.length !== 4) {
      return `Quiz ${i + 1} must contain exactly 4 options.`;
    }

    for (let j = 0; j < item.options.length; j++) {
      if (typeof item.options[j] !== "string") {
        return `Quiz ${i + 1} option ${j + 1} is invalid.`;
      }

      if (!item.options[j].trim()) {
        return `Quiz ${i + 1} option ${j + 1} cannot be empty.`;
      }
    }

    if (typeof item.correctAnswer !== "string") {
      return `Quiz ${i + 1} correctAnswer is missing.`;
    }

    if (!item.correctAnswer.trim()) {
      return `Quiz ${i + 1} correctAnswer cannot be empty.`;
    }

    if (!item.options.includes(item.correctAnswer)) {
      return `Quiz ${i + 1} correctAnswer must exist in options.`;
    }
  }

  // -----------------------------
  // Success
  // -----------------------------
  return null;
}