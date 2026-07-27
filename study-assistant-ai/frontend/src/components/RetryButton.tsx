import { RotateCw, RefreshCw } from "lucide-react";

interface Props {
  onRetry: () => void;
  loading?: boolean;
  darkMode: boolean;
  disabled?: boolean;
  text?: string;
  fullWidth?: boolean;
}

export default function RetryButton({
  onRetry,
  loading = false,
  disabled = false,
  text = "Generate Again",
  fullWidth = false,
}: Props) {
  const isDisabled = loading || disabled;

  return (
    <button
      type="button"
      onClick={onRetry}
      disabled={isDisabled}
      style={{
        width: fullWidth ? "100%" : "auto",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        padding: "14px 24px",
        borderRadius: "14px",
        border: "none",
        background: isDisabled
          ? "#94a3b8"
          : "linear-gradient(135deg,#2563eb,#1d4ed8)",
        color: "#ffffff",
        fontSize: "1rem",
        fontWeight: 700,
        cursor: isDisabled ? "not-allowed" : "pointer",
        transition: "all .3s ease",
        boxShadow: isDisabled
          ? "none"
          : "0 8px 20px rgba(37,99,235,.25)",
      }}
      onMouseEnter={(e) => {
        if (!isDisabled) {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow =
            "0 12px 24px rgba(37,99,235,.35)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isDisabled) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 8px 20px rgba(37,99,235,.25)";
        }
      }}
    >
      {loading ? (
        <RotateCw
          size={18}
          className="spin"
        />
      ) : (
        <RefreshCw size={18} />
      )}

      {loading ? "Generating Study Set..." : text}
    </button>
  );
}