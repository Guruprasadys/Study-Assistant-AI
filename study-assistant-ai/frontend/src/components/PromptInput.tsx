import {
  FormEvent,
  KeyboardEvent,
  useMemo,
  useState,
} from "react";

import {
  Send,
  LoaderCircle,
  FileText,
} from "lucide-react";

interface Props {
  onSubmit: (prompt: string) => void;
  loading: boolean;
  darkMode: boolean;
}

const MAX_CHARACTERS = 10000;

export default function PromptInput({
  onSubmit,
  loading,
  darkMode = false,
}: Props) {
  const [value, setValue] = useState("");

  const charactersLeft = useMemo(
    () => MAX_CHARACTERS - value.length,
    [value]
  );

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const prompt = value.trim();

    if (!prompt || loading) return;

    onSubmit(prompt);
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (event.ctrlKey && event.key === "Enter") {
      handleSubmit(event as unknown as FormEvent);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: darkMode
          ? "linear-gradient(145deg, #1e293b 0%, #111827 100%)"
          : "linear-gradient(145deg, #ffffff 0%, #f8fbff 100%)",
        borderRadius: 24,
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        border: darkMode
          ? "1px solid rgba(148, 163, 184, 0.18)"
          : "1px solid rgba(226, 232, 240, 0.95)",
        boxShadow: darkMode
          ? "0 12px 36px rgba(2, 6, 23, 0.32)"
          : "0 12px 30px rgba(15, 23, 42, 0.08)",
        transition: ".3s",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <FileText color="#2563eb" size={28} />

        <div>
          <h2
            style={{
              margin: 0,
              color: darkMode ? "#ffffff" : "#0f172a",
            }}
          >
            Generate Study Material
          </h2>

          <p
            style={{
              marginTop: 4,
              color: darkMode
                ? "#cbd5e1"
                : "#64748b",
            }}
          >
            Paste your notes, syllabus, article or simply enter a topic.
          </p>
        </div>
      </div>

      {/* Text Area */}

      <textarea
        rows={10}
        value={value}
        maxLength={MAX_CHARACTERS}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Paste your notes or enter any study topic here..."
        style={{
          resize: "vertical",
          minHeight: 220,
          padding: 18,
          borderRadius: 16,
          border: darkMode
            ? "2px solid #475569"
            : "2px solid #cbd5e1",
          boxShadow: darkMode
            ? "inset 0 0 0 1px rgba(96, 165, 250, 0.2)"
            : "inset 0 0 0 1px rgba(37, 99, 235, 0.08)",
          background: darkMode
            ? "#0f172a"
            : "#ffffff",
          color: darkMode ? "#ffffff" : "#0f172a",
          outline: "none",
          fontSize: "1rem",
          lineHeight: 1.7,
          transition: ".3s",
        }}
      />

      {/* Footer */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span
          style={{
            color:
              charactersLeft < 200
                ? "#ef4444"
                : darkMode
                ? "#cbd5e1"
                : "#64748b",
            fontWeight: 600,
          }}
        >
          {value.length} / {MAX_CHARACTERS}
        </span>

        <span
          style={{
            color: darkMode
              ? "#94a3b8"
              : "#64748b",
          }}
        >
          Ctrl + Enter to Generate
        </span>
      </div>

      {/* Button */}

      <button
        type="submit"
        disabled={
          loading ||
          value.trim().length === 0
        }
        style={{
          border: "none",
          borderRadius: 14,
          padding: "15px",
          cursor:
            loading ||
            value.trim().length === 0
              ? "not-allowed"
              : "pointer",
          background:
            loading ||
            value.trim().length === 0
              ? "#94a3b8"
              : "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          fontWeight: 700,
          fontSize: "1rem",
          boxShadow:
            loading || value.trim().length === 0
              ? "none"
              : "0 10px 24px rgba(37, 99, 235, 0.24)",
          transform:
            loading || value.trim().length === 0
              ? "none"
              : "translateY(-1px)",
          transition: ".3s",
        }}
      >
        {loading ? (
          <>
            <LoaderCircle
              size={20}
              className="spin"
            />
            Generating Study Set...
          </>
        ) : (
          <>
            <Send size={20} />
            Generate Study Set
          </>
        )}
      </button>
    </form>
  );
}