import { useMemo, useRef, useState } from "react";

import Navbar from "./components/Navbar";
import PromptInput from "./components/PromptInput";
import FlashCardList from "./components/FlashCardList";
import Quiz from "./components/Quiz";
import Loading from "./components/Loading";
import ErrorCard from "./components/ErrorCard";

import { generateStudySet } from "./api/api";
import { parseStudySet } from "./utils/parseAI";
import { validateStudySet } from "./utils/validate";

import type { StudySet } from "./types/flashcard";

export default function App() {
  const [studySet, setStudySet] = useState<StudySet | null>(null);

  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [cardIndex, setCardIndex] = useState(0);

  const [flipped, setFlipped] = useState(false);

  const [quizIndex, setQuizIndex] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);

  const [darkMode, setDarkMode] = useState(false);

  const requestIdRef = useRef(0);

  const currentCard = studySet?.flashcards[cardIndex];

  const activeQuiz = useMemo(() => {
    if (!studySet) return [];

    return wrongAnswers.length > 0
      ? studySet.quiz.filter((q) =>
          wrongAnswers.includes(q.correctAnswer)
        )
      : studySet.quiz;
  }, [studySet, wrongAnswers]);

  const currentQuiz = activeQuiz[quizIndex];

  const progress =
    activeQuiz.length === 0
      ? 0
      : Math.round(((quizIndex + 1) / activeQuiz.length) * 100);

  async function handleGenerate(promptText: string) {
    const requestId = ++requestIdRef.current;

    setPrompt(promptText);

    setLoading(true);

    setError("");

    setStudySet(null);

    setCardIndex(0);

    setFlipped(false);

    setQuizIndex(0);

    setSelectedAnswer("");

    setWrongAnswers([]);

    try {
  const response = await generateStudySet(promptText);

  if (requestId !== requestIdRef.current) return;

  if (!response.success) {
    throw new Error(response.error || "Failed to generate study material.");
  }

  // Make sure data exists
  if (!response.data) {
    throw new Error("No study set was returned from the server.");
  }

  const parsed: StudySet =
    typeof response.data === "string"
      ? parseStudySet(response.data)
      : response.data;

  const validationError = validateStudySet(parsed);

  if (validationError) {
    throw new Error(validationError);
  }

  setStudySet(parsed);
} catch (err) {
  if (requestId === requestIdRef.current) {
    setError(
      err instanceof Error
        ? err.message
        : "Failed to generate study material."
    );
  }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }

  function handleRetry() {
    if (prompt) {
      handleGenerate(prompt);
    }
  }

  function handleAnswer(answer: string) {
    if (!currentQuiz) return;

    setSelectedAnswer(answer);

    if (answer !== currentQuiz.correctAnswer) {
      setWrongAnswers((prev) =>
        prev.includes(currentQuiz.correctAnswer)
          ? prev
          : [...prev, currentQuiz.correctAnswer]
      );
    }
  }

  function nextQuestion() {
    if (!activeQuiz.length) return;

    setQuizIndex((prev) =>
      prev === activeQuiz.length - 1 ? 0 : prev + 1
    );

    setSelectedAnswer("");
  }

  function previousQuestion() {
    if (!activeQuiz.length) return;

    setQuizIndex((prev) =>
      prev === 0 ? activeQuiz.length - 1 : prev - 1
    );

    setSelectedAnswer("");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        transition: ".3s",
        background: darkMode ? "#0f172a" : "#f8fafc",
        color: darkMode ? "#ffffff" : "#0f172a",
      }}
    >
      <Navbar
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
      />

      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "35px 20px",
        }}
      >
        <section
          style={{
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "2.4rem",
              marginBottom: 10,
            }}
          >
            Study Assistant AI
          </h1>

          <p
            style={{
              color: darkMode ? "#cbd5e1" : "#64748b",
            }}
          >
            Paste your notes or topic. AI generates flashcards,
            quizzes, and lets you retry incorrect answers.
          </p>
        </section>

        <PromptInput
          onSubmit={handleGenerate}
          loading={loading}
          darkMode={darkMode}
        />

        {loading && <Loading darkMode={darkMode} />}

        {error && (
          <ErrorCard
            error={error}
            onRetry={handleRetry}
            darkMode={darkMode}
          />
        )}

        {studySet && (
          <>
            <FlashCardList
              cards={studySet.flashcards}
              currentIndex={cardIndex}
              flipped={flipped}
              darkMode={darkMode}
              onFlip={() => setFlipped(!flipped)}
              onNext={() => {
                setCardIndex(
                  (cardIndex + 1) %
                    studySet.flashcards.length
                );
                setFlipped(false);
              }}
              onPrev={() => {
                setCardIndex(
                  cardIndex === 0
                    ? studySet.flashcards.length - 1
                    : cardIndex - 1
                );
                setFlipped(false);
              }}
            />

            <Quiz
              quiz={activeQuiz}
              currentIndex={quizIndex}
              selectedAnswer={selectedAnswer}
              darkMode={darkMode}
              onSelect={handleAnswer}
              onNext={nextQuestion}
              onPrevious={previousQuestion}
            />
          </>
        )}
      </main>
    </div>
  );
}