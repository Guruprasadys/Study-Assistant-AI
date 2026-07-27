import {
  BrainCircuit,
  Sparkles,
  MoonStar,
  Sun,
} from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({
  darkMode,
  onToggleTheme,
}: NavbarProps) {
  const background = darkMode ? "#0f172a" : "#ffffff";
  const border = darkMode ? "#1e293b" : "#e2e8f0";
  const text = darkMode ? "#ffffff" : "#0f172a";
  const subText = darkMode ? "#94a3b8" : "#64748b";
  const badge = darkMode ? "#1e293b" : "#eff6ff";
  const button = darkMode ? "#1e293b" : "#f1f5f9";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        background: darkMode ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.9)",
        borderBottom: `1px solid ${border}`,
        boxShadow: darkMode
          ? "0 8px 30px rgba(2, 6, 23, 0.26)"
          : "0 8px 24px rgba(15, 23, 42, 0.06)",
        backdropFilter: "blur(16px)",
        transition: "all .3s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "#2563eb",
              display: "grid",
              placeItems: "center",
              color: "#fff",
            }}
          >
            <BrainCircuit size={24} />
          </div>

          <div>
            <h2
              style={{
                margin: 0,
                color: text,
                fontWeight: 700,
              }}
            >
              Study Assistant AI
            </h2>

            <p
              style={{
                marginTop: 4,
                color: subText,
                fontSize: ".9rem",
              }}
            >
              AI Flashcards • Quiz • Wrong Answer Review
            </p>
          </div>
        </div>

        {/* Right */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              borderRadius: 999,
              background: badge,
              color: "#2563eb",
              fontWeight: 600,
            }}
          >
            <Sparkles size={16} />
            Azure OpenAI
          </div>

          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              background: button,
              color: text,
              display: "grid",
              placeItems: "center",
              transition: "all .3s ease",
            }}
          >
            {darkMode ? (
              <Sun size={20} />
            ) : (
              <MoonStar size={20} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}