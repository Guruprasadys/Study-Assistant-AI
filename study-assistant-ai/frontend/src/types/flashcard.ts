export interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface StudySet {
  title: string;
  summary?: string;
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
}

export interface ApiResponse {
  success: boolean;
  data: StudySet | undefined
  error?: string;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  percentage: number;
}

export interface WrongAnswer {
  question: QuizQuestion;
  selectedAnswer: string;
}