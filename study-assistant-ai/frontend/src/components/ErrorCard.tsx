import { AlertTriangle, RotateCw } from "lucide-react";

interface Props {
  error: string;
  onRetry: () => void;
  darkMode: boolean;
}

export default function ErrorCard({
  error,
  onRetry,
}: Props) {
  return (
    <div
      role="alert"
      style={{
        marginTop: "2rem",
        padding: "24px",
        borderRadius: "18px",
        background: "#fef2f2",
        border: "1px solid #fecaca",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
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
              color: "#991b1b",
            }}
          >
            Something went wrong
          </h2>

          <p
            style={{
              margin: "4px 0 0",
              color: "#7f1d1d",
            }}
          >
            The study set could not be generated.
          </p>
        </div>
      </div>

      {/* Error Message */}

      <div
        style={{
          background: "#ffffff",
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
            color: "#444",
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