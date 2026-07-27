import { Sparkles } from "lucide-react";
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
        background: darkMode
          ? "radial-gradient(circle at top, #1e293b 0%, #020617 100%)"
          : "radial-gradient(circle at top, #eff6ff 0%, #f8fafc 70%, #eef2ff 100%)",
        color: darkMode ? "#ffffff" : "#0f172a",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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
            padding: "28px 24px",
            borderRadius: 24,
            background: darkMode
              ? "linear-gradient(135deg, #111827 0%, #1e293b 100%)"
              : "linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)",
            border: darkMode
              ? "1px solid rgba(148, 163, 184, 0.18)"
              : "1px solid rgba(148, 163, 184, 0.2)",
            boxShadow: darkMode
              ? "0 16px 45px rgba(2, 6, 23, 0.28)"
              : "0 16px 45px rgba(15, 23, 42, 0.06)",
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 20,
              alignItems: "center",
            }}
          >
            <div style={{ maxWidth: 700 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 12px",
                  borderRadius: 999,
                  background: darkMode
                    ? "rgba(59, 130, 246, 0.18)"
                    : "rgba(37, 99, 235, 0.1)",
                  color: darkMode ? "#bfdbfe" : "#1d4ed8",
                  fontWeight: 700,
                  marginBottom: 14,
                }}
              >
                <Sparkles size={16} />
                AI study companion
              </div>

              <h1
                style={{
                  fontSize: "2.4rem",
                  marginBottom: 10,
                  lineHeight: 1.2,
                  fontWeight: 800,
                }}
              >
                Turn notes into a smarter study session
              </h1>

              <p
                style={{
                  color: darkMode ? "#cbd5e1" : "#64748b",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                  margin: 0,
                  maxWidth: 680,
                }}
              >
                Paste anything you want to learn and turn it into
                flashcards, a quiz, and retry-friendly practice.
              </p>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 16,
                  padding: "10px 14px",
                  borderRadius: 999,
                  background: darkMode
                    ? "rgba(15, 23, 42, 0.75)"
                    : "rgba(255, 255, 255, 0.9)",
                  border: darkMode
                    ? "1px solid rgba(148, 163, 184, 0.16)"
                    : "1px solid rgba(226, 232, 240, 0.95)",
                  color: darkMode ? "#f8fafc" : "#0f172a",
                  boxShadow: darkMode
                    ? "0 8px 22px rgba(2, 6, 23, 0.26)"
                    : "0 8px 20px rgba(15, 23, 42, 0.06)",
                }}
              >
                <Sparkles size={16} />
                Start with any notes, article, or topic
              </div>
            </div>

            <div style={{ display: "grid", gap: 10, minWidth: 220 }}>
              {[
                { title: "Flashcards", detail: "Quick review" },
                { title: "Quiz mode", detail: "Practice recall" },
                { title: "Retry misses", detail: "Strengthen weak spots" },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    padding: "12px 14px",
                    borderRadius: 14,
                    background: darkMode
                      ? "rgba(15, 23, 42, 0.55)"
                      : "rgba(255, 255, 255, 0.8)",
                    border: darkMode
                      ? "1px solid rgba(148, 163, 184, 0.16)"
                      : "1px solid rgba(226, 232, 240, 0.95)",
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{item.title}</div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      color: darkMode ? "#cbd5e1" : "#64748b",
                      marginTop: 2,
                    }}
                  >
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
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