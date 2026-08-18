import Link from "next/link";

const bereiche = [
  {
    href: "/termine",
    icon: "📅",
    title: "Termine",
    text: "Alle Familientermine auf einen Blick",
    background: "#E8F1FF",
  },
  {
    href: "/aufgaben",
    icon: "✅",
    title: "Aufgaben",
    text: "Gemeinsame Aufgaben verteilen und abhaken",
    background: "#EAF8EF",
  },
  {
    href: "/einkaufsliste",
    icon: "🛒",
    title: "Einkaufsliste",
    text: "Was noch fehlt – jederzeit gemeinsam ergänzen",
    background: "#FFF4E5",
  },
  {
    href: "/notizen",
    icon: "📝",
    title: "Notizen",
    text: "Wichtige Infos für die ganze Familie",
    background: "#F3ECFF",
  },
];

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #fffaf4 0%, #f7f8fb 45%, #f2f4f8 100%)",
        fontFamily:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        padding: "clamp(24px, 5vw, 56px) 18px",
        color: "#1f2937",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1080px",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            marginBottom: "34px",
            background: "rgba(255,255,255,0.88)",
            borderRadius: "24px",
            padding: "28px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            border: "1px solid rgba(255,255,255,0.9)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "10px",
              fontSize: "15px",
              fontWeight: 700,
              color: "#6b7280",
            }}
          >
            <span style={{ fontSize: "22px" }}>🏠</span>
            UNSER FAMILIENBEREICH
          </div>

          <h1
            style={{
              fontSize: "clamp(34px, 6vw, 52px)",
              lineHeight: 1.05,
              margin: "0 0 12px 0",
              letterSpacing: "-0.03em",
            }}
          >
            Familien Dashboard
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "18px",
              lineHeight: 1.55,
              margin: 0,
              maxWidth: "680px",
            }}
          >
            Termine, Aufgaben, Einkäufe und wichtige Infos – alles an einem Ort
            und auf allen Geräten verfügbar.
          </p>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
            gap: "20px",
          }}
        >
          {bereiche.map((bereich) => (
            <Link
              key={bereich.href}
              href={bereich.href}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <article
                style={{
                  background: bereich.background,
                  borderRadius: "22px",
                  padding: "24px",
                  minHeight: "190px",
                  boxSizing: "border-box",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                  border: "1px solid rgba(255,255,255,0.8)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  cursor: "pointer",
                }}
              >
                <div>
                  <div
                    style={{
                      width: "54px",
                      height: "54px",
                      borderRadius: "16px",
                      background: "rgba(255,255,255,0.75)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                      marginBottom: "18px",
                    }}
                  >
                    {bereich.icon}
                  </div>

                  <h2
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "24px",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {bereich.title}
                  </h2>

                  <p
                    style={{
                      margin: 0,
                      color: "#5f6672",
                      fontSize: "16px",
                      lineHeight: 1.5,
                    }}
                  >
                    {bereich.text}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: "22px",
                    fontSize: "15px",
                    fontWeight: 700,
                  }}
                >
                  Öffnen →
                </div>
              </article>
            </Link>
          ))}
        </section>

        <footer
          style={{
            textAlign: "center",
            marginTop: "34px",
            color: "#9ca3af",
            fontSize: "13px",
          }}
        >
          Gemeinsam organisiert ❤️
        </footer>
      </div>
    </main>
  );
}
