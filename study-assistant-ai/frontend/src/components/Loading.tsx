import { useEffect, useState } from "react";
import { BrainCircuit, LoaderCircle } from "lucide-react";

interface LoadingProps {
  darkMode?: boolean;
}

export default function Loading({
  darkMode = false,
}: LoadingProps) {
  const messages = [
    "Analyzing your notes...",
    "Understanding the topic...",
    "Creating flashcards...",
    "Generating quiz questions...",
    "Preparing your study set...",
    "Almost finished..."
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) =>
        prev === messages.length - 1 ? 0 : prev + 1
      );
    }, 2200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        marginTop: "2rem",
        padding: "2rem",
        borderRadius: 20,
        background: darkMode ? "#1e293b" : "#ffffff",
        boxShadow: darkMode
          ? "0 8px 25px rgba(0,0,0,.35)"
          : "0 8px 25px rgba(0,0,0,.08)",
        transition: ".3s",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
          marginBottom: "1.5rem",
        }}
      >
        <BrainCircuit
          size={34}
          color="#2563eb"
        />

        <h2
          style={{
            margin: 0,
            color: darkMode ? "#fff" : "#0f172a",
          }}
        >
          Azure OpenAI is Working...
        </h2>
      </div>

      {/* Spinner */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1.5rem",
        }}
      >
        <LoaderCircle
          size={48}
          color="#2563eb"
          className="spin"
        />
      </div>

      {/* Animated Message */}

      <p
        style={{
          textAlign: "center",
          color: darkMode ? "#cbd5e1" : "#64748b",
          fontSize: "1rem",
          fontWeight: 500,
          minHeight: 24,
          transition: ".3s",
        }}
      >
        {messages[messageIndex]}
      </p>

      {/* Progress Bar */}

      <div
        style={{
          marginTop: "1.5rem",
          width: "100%",
          height: 8,
          borderRadius: 999,
          overflow: "hidden",
          background: darkMode ? "#334155" : "#e2e8f0",
        }}
      >
        <div
          style={{
            width: "40%",
            height: "100%",
            background: "#2563eb",
            animation: "loadingBar 1.8s infinite ease-in-out",
          }}
        />
      </div>

      {/* Skeleton Cards */}

      <div
        style={{
          display: "grid",
          gap: 18,
          marginTop: "2rem",
        }}
      >
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            style={{
              padding: 20,
              borderRadius: 16,
              background: darkMode
                ? "#334155"
                : "#f8fafc",
              animation: "pulse 1.5s infinite",
            }}
          >
            <div
              style={{
                width: "60%",
                height: 16,
                borderRadius: 10,
                marginBottom: 15,
                background: darkMode
                  ? "#475569"
                  : "#cbd5e1",
              }}
            />

            <div
              style={{
                width: "100%",
                height: 12,
                borderRadius: 10,
                marginBottom: 10,
                background: darkMode
                  ? "#475569"
                  : "#e2e8f0",
              }}
            />

            <div
              style={{
                width: "80%",
                height: 12,
                borderRadius: 10,
                background: darkMode
                  ? "#475569"
                  : "#e2e8f0",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}