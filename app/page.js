import Link from "next/link";

const bereiche = [
  {
    href: "/termine",
    icon: "📅",
    title: "Termine",
    text: "Familientermine im Überblick",
  },
  {
    href: "/aufgaben",
    icon: "✅",
    title: "Aufgaben",
    text: "Gemeinsame Aufgaben organisieren",
  },
  {
    href: "/einkaufsliste",
    icon: "🛒",
    title: "Einkaufsliste",
    text: "Was wir noch brauchen",
  },
  {
    href: "/notizen",
    icon: "📝",
    title: "Notizen",
    text: "Wichtige Informationen festhalten",
  },
];

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        fontFamily: "Arial, sans-serif",
        padding: "clamp(24px, 5vw, 60px) 18px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              color: "#666",
              marginBottom: "8px",
            }}
          >
            UNSERE FAMILIE
          </div>

          <h1
            style={{
              fontSize: "clamp(32px, 7vw, 48px)",
              lineHeight: 1.1,
              margin: "0 0 12px 0",
            }}
          >
            Familien Dashboard
          </h1>

          <p
            style={{
              color: "#666",
              fontSize: "17px",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            Alles Wichtige für unsere Familie an einem Ort.
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: "18px",
          }}
        >
          {bereiche.map((bereich) => (
            <Link
              key={bereich.href}
              href={bereich.href}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              <div
                style={{
                  background: "white",
                  padding: "24px",
                  borderRadius: "18px",
                  boxShadow: "0 5px 20px rgba(0,0,0,0.07)",
                  minHeight: "145px",
                  boxSizing: "border-box",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "32px",
                      marginBottom: "14px",
                    }}
                  >
                    {bereich.icon}
                  </div>

                  <h2
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "22px",
                    }}
                  >
                    {bereich.title}
                  </h2>

                  <p
                    style={{
                      color: "#666",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {bereich.text}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: "18px",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Öffnen →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            color: "#999",
            fontSize: "13px",
            marginTop: "40px",
          }}
        >
          Gemeinsam organisiert ❤️
        </p>
      </div>
    </main>
  );
}
