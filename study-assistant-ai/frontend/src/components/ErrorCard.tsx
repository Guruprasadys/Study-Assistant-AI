import { AlertTriangle, RotateCw } from "lucide-react";

interface Props {
  error: string;
  onRetry: () => void;
  darkMode: boolean;
}

export default function ErrorCard({
  error,
  onRetry,
  darkMode,
}: Props) {
  return (
    <div
      role="alert"
      style={{
        marginTop: "2rem",
        padding: "24px",
        borderRadius: "20px",
        background: darkMode
          ? "linear-gradient(145deg, #1f2937 0%, #111827 100%)"
          : "linear-gradient(145deg, #fef2f2 0%, #fff7ed 100%)",
        border: darkMode
          ? "1px solid rgba(248, 113, 113, 0.2)"
          : "1px solid #fecaca",
        boxShadow: darkMode
          ? "0 12px 30px rgba(2, 6, 23, 0.28)"
          : "0 10px 24px rgba(15, 23, 42, 0.08)",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <AlertTriangle
          size={32}
          color="#dc2626"
        />

        <div>
          <h2
            style={{
              margin: 0,
              color: darkMode ? "#fca5a5" : "#991b1b",
            }}
          >
            Something went wrong
          </h2>

          <p
            style={{
              margin: "4px 0 0",
              color: darkMode ? "#fecaca" : "#7f1d1d",
            }}
          >
            The study set could not be generated.
          </p>
        </div>
      </div>

      {/* Error Message */}

      <div
        style={{
          background: darkMode ? "rgba(15, 23, 42, 0.7)" : "#ffffff",
          borderRadius: "12px",
          padding: "16px",
          border: "1px solid #fecaca",
          marginBottom: "20px",
        }}
      >
        <strong>Error</strong>

        <p
          style={{
            marginTop: "10px",
            color: darkMode ? "#e2e8f0" : "#444",
            wordBreak: "break-word",
            lineHeight: 1.6,
          }}
        >
          {error}
        </p>
      </div>

      {/* Retry */}

      <button
        onClick={onRetry}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "12px 22px",
          border: "none",
          borderRadius: "12px",
          background: "#dc2626",
          color: "#ffffff",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "1rem",
          transition: "0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#b91c1c";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#dc2626";
        }}
      >
        <RotateCw size={18} />
        Try Again
      </button>
    </div>
  );
}