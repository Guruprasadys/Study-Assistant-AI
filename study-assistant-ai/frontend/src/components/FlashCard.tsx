import { Copy, RotateCcw } from "lucide-react";

interface Props {
  question: string;
  answer: string;
  flipped: boolean;
  darkMode:boolean;
  onFlip: () => void;
  
}

export default function FlashCard({
  question,
  answer,
  flipped,
  darkMode,
  onFlip,
}: Props) {
  async function copyText() {
    try {
      await navigator.clipboard.writeText(answer);
      alert("Answer copied to clipboard.");
    } catch {
      alert("Unable to copy.");
    }
  }

  return (
    <div
      style={{
        perspective: "1200px",
        width: "100%",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: 320,
          transformStyle: "preserve-3d",
          transition: "transform .6s ease",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}

        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 24,
            background: darkMode ? "#111827" : "#ffffff",
            border: darkMode ? "1px solid #334155" : "1px solid #e2e8f0",
            boxShadow: "0 10px 30px rgba(0,0,0,.08)",
            backfaceVisibility: "hidden",
            padding: 30,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <small
              style={{
                color: darkMode ? "#60a5fa" : "#2563eb",
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              QUESTION
            </small>

            <h2
              style={{
                marginTop: 16,
                color: darkMode ? "#f8fafc" : "#0f172a",
                lineHeight: 1.5,
              }}
            >
              {question}
            </h2>
          </div>

          <button
            onClick={onFlip}
            style={{
              padding: "14px",
              borderRadius: 14,
              border: "none",
              background: "#2563eb",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Show Answer
          </button>
        </div>

        {/* BACK */}

        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 24,
            background: "#0f172a",
            color: "#fff",
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,.18)",
            padding: 30,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <small
              style={{
                color: "#38bdf8",
                fontWeight: 700,
              }}
            >
              ANSWER
            </small>

            <p
              style={{
                marginTop: 18,
                fontSize: "1.05rem",
                lineHeight: 1.8,
                whiteSpace: "pre-wrap",
              }}
            >
              {answer}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={copyText}
              style={{
                flex: 1,
                padding: 14,
                border: "none",
                borderRadius: 14,
                background: "#2563eb",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Copy size={18} />
              Copy Answer
            </button>

            <button
              onClick={onFlip}
              style={{
                flex: 1,
                padding: 14,
                border: "none",
                borderRadius: 14,
                background: "#334155",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
              }}
            >
              <RotateCcw size={18} />
              Show Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}