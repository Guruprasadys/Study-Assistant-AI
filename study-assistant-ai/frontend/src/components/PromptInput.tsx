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
        background: darkMode ? "#1e293b" : "#ffffff",
        borderRadius: 20,
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        boxShadow: darkMode
          ? "0 8px 30px rgba(0,0,0,.35)"
          : "0 8px 25px rgba(0,0,0,.08)",
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
              : "#2563eb",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          fontWeight: 700,
          fontSize: "1rem",
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