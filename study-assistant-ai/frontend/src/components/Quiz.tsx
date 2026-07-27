import {
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Trophy,
} from "lucide-react";

interface QuizItem {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Props {
  quiz: QuizItem[];
  currentIndex: number;
  selectedAnswer: string;
  onSelect: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  darkMode:boolean;
}

export default function Quiz({
  quiz,
  currentIndex,
  selectedAnswer,
  onSelect,
  onNext,
  onPrevious,
  darkMode,
}: Props) {
  if (!quiz.length) return null;

const currentQuestion = quiz[currentIndex];

if (!currentQuestion) {
  return (
    <div
      style={{
        padding: 40,
        textAlign: "center",
      }}
    >
      <h2>No Question Available</h2>
    </div>
  );
}
  const answered = selectedAnswer !== "";

const correct =
  currentQuestion &&
  selectedAnswer === currentQuestion.correctAnswer;

  const progress =
    ((currentIndex + 1) / quiz.length) * 100;

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "22px",
        padding: "24px",
        borderRadius: 24,
        background: darkMode
          ? "rgba(15, 23, 42, 0.65)"
          : "rgba(255, 255, 255, 0.92)",
        border: darkMode
          ? "1px solid rgba(148, 163, 184, 0.16)"
          : "1px solid rgba(226, 232, 240, 0.95)",
        boxShadow: darkMode
          ? "0 18px 38px rgba(2, 6, 23, 0.2)"
          : "0 18px 38px rgba(15, 23, 42, 0.08)",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              color: darkMode ? "#f8fafc" : "#0f172a",
            }}
          >
            Quiz
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: darkMode ? "#cbd5e1" : "#64748b",
            }}
          >
            Question {currentIndex + 1} of {quiz.length}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: darkMode ? "#60a5fa" : "#2563eb",
            fontWeight: 700,
          }}
        >
          <Trophy size={20} />
          Study Mode
        </div>
      </div>

      {/* Progress */}

      <div
        style={{
          width: "100%",
          height: 10,
          background: "#e2e8f0",
          borderRadius: 100,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#2563eb",
            transition: ".3s",
          }}
        />
      </div>

      {/* Question */}

      <div
        style={{
          background: darkMode ? "#111827" : "#ffffff",
          borderRadius: 18,
          padding: "24px",
          boxShadow: "0 6px 20px rgba(0,0,0,.08)",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            color: darkMode ? "#f8fafc" : "#0f172a",
            lineHeight: 1.6,
          }}
        >
          {currentQuestion.question}
        </h3>

        <div
          style={{
            display: "grid",
            gap: 14,
            marginTop: 25,
          }}
        >
          {currentQuestion.options.map((option) => {
            const isCorrect =
              option === currentQuestion.correctAnswer;

            const isSelected =
              option === selectedAnswer;

            let background = darkMode ? "#1f2937" : "#ffffff";
            let border = darkMode ? "2px solid #475569" : "2px solid #cbd5e1";

            if (answered) {
              if (isCorrect) {
                background = "#dcfce7";
                border = "2px solid #16a34a";
              } else if (isSelected) {
                background = "#fee2e2";
                border = "2px solid #dc2626";
              }
            }

            return (
              <button
                key={option}
                disabled={answered}
                onClick={() => onSelect(option)}
                style={{
                  padding: "16px",
                  borderRadius: 14,
                  border,
                  background,
                  cursor: answered
                    ? "default"
                    : "pointer",
                  textAlign: "left",
                  fontSize: "1rem",
                  fontWeight: 600,
                  transition: ".25s",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: darkMode ? "#f8fafc" : "#0f172a",
                }}
              >
                {option}

                {answered && isCorrect && (
                  <CheckCircle2
                    color="#16a34a"
                    size={20}
                  />
                )}

                {answered &&
                  isSelected &&
                  !isCorrect && (
                    <XCircle
                      color="#dc2626"
                      size={20}
                    />
                  )}
              </button>
            );
          })}
        </div>

        {/* Result */}

        {answered && (
          <div
            style={{
              marginTop: 24,
              padding: 18,
              borderRadius: 14,
              background: correct
                ? "#dcfce7"
                : "#fee2e2",
              color: darkMode ? "#020617" : "#0f172a",
            }}
          >
            <strong>
              {correct
                ? "✅ Correct!"
                : "❌ Incorrect"}
            </strong>

            {!correct && (
              <p
                style={{
                  marginTop: 10,
                  marginBottom: 0,
                }}
              >
                Correct Answer:
                <strong>
                  {" "}
                  {currentQuestion.correctAnswer}
                </strong>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}

      <div
        style={{
          display: "flex",
          gap: 18,
        }}
      >
        <button
          onClick={onPrevious}
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 12,
            border: "none",
            background: darkMode ? "#334155" : "#e2e8f0",
            color: darkMode ? "#f8fafc" : "#0f172a",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            fontWeight: 600,
          }}
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        <button
          onClick={onNext}
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 12,
            border: "none",
            background: "#2563eb",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            fontWeight: 600,
          }}
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}