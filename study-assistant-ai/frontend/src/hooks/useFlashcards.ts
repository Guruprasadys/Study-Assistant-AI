import { useEffect, useState } from "react";
import type { Flashcard } from "../types/flashcard";

export function useFlashcards(cards: Flashcard[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Reset when a new study set is generated
  useEffect(() => {
    setCurrentIndex(0);
    setFlipped(false);
  }, [cards]);

  // Flip current card
  function flipCard() {
    setFlipped((prev) => !prev);
  }

  // Next flashcard
  function nextCard() {
    if (cards.length === 0) return;

    setCurrentIndex((prev) =>
      prev === cards.length - 1 ? 0 : prev + 1
    );

    setFlipped(false);
  }

  // Previous flashcard
  function previousCard() {
    if (cards.length === 0) return;

    setCurrentIndex((prev) =>
      prev === 0 ? cards.length - 1 : prev - 1
    );

    setFlipped(false);
  }

  // Jump to specific card
  function goToCard(index: number) {
    if (index < 0 || index >= cards.length) return;

    setCurrentIndex(index);
    setFlipped(false);
  }

  // Shuffle flashcards
  function shuffleCards() {
    if (cards.length <= 1) return;

    const randomIndex = Math.floor(
      Math.random() * cards.length
    );

    setCurrentIndex(randomIndex);
    setFlipped(false);
  }

  // Reset flashcards
  function resetCards() {
    setCurrentIndex(0);
    setFlipped(false);
  }

  return {
    currentCard: cards[currentIndex] ?? null,

    currentIndex,

    totalCards: cards.length,

    flipped,

    flipCard,

    nextCard,

    previousCard,

    goToCard,

    shuffleCards,

    resetCards,
  };
}