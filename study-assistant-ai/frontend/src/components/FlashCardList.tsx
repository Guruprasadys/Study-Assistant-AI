import {
  ChevronLeft,
  ChevronRight,
  Shuffle,
  BookOpen,
} from "lucide-react";

import FlashCard from "./FlashCard";

interface Flashcard {
  question: string;
  answer: string;
}

interface Props {
  cards: Flashcard[];
  currentIndex: number;
  flipped: boolean;
  darkMode:boolean;
  onFlip: () => void;
  onNext: () => void;
  onPrev: () => void;
  onShuffle?: () => void;
  
}

export default function FlashCardList({
  cards,
  currentIndex,
  flipped,
  darkMode,
  onFlip,
  onNext,
  onPrev,
  onShuffle,
}: Props) {
  if (!cards.length) return null;

  const currentCard = cards[currentIndex];

  const progress =
    ((currentIndex + 1) / cards.length) * 100;

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <BookOpen color={darkMode ? "#60a5fa" : "#2563eb"} size={24} />

          <div>
            <h2
              style={{
                margin: 0,
                color: darkMode ? "#f8fafc" : "#0f172a",
              }}
            >
              Flashcards
            </h2>

            <p
              style={{
                margin: 0,
                color: darkMode ? "#cbd5e1" : "#64748b",
              }}
            >
              Card {currentIndex + 1} of {cards.length}
            </p>
          </div>
        </div>

        {onShuffle && (
          <button
            onClick={onShuffle}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              borderRadius: 12,
              border: "none",
              background: "#2563eb",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            <Shuffle size={18} />
            Shuffle
          </button>
        )}
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

      {/* Flashcard */}

      <FlashCard
        question={currentCard.question}
        answer={currentCard.answer}
        flipped={flipped}
        onFlip={onFlip}
        darkMode={darkMode}
      />

      {/* Navigation */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <button
          onClick={onPrev}
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: 14,
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
          onClick={onFlip}
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: 14,
            border: "none",
            background: "#2563eb",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          {flipped ? "Show Question" : "Show Answer"}
        </button>

        <button
          onClick={onNext}
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: 14,
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