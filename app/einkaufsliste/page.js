export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "8px",
          }}
        >
          Familien Dashboard
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Alles Wichtige für unsere Familie an einem Ort.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          <a
            href="/termine"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Card
              title="📅 Termine"
              text="Familientermine im Überblick"
            />
          </a>

          <a
            href="/aufgaben"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Card
              title="✅ Aufgaben"
              text="Gemeinsame Aufgaben organisieren"
            />
          </a>

          <Card
            title="🛒 Einkaufsliste"
            text="Was wir noch brauchen"
          />

          <Card
            title="📝 Notizen"
            text="Wichtige Informationen festhalten"
          />
        </div>
      </div>
    </main>
  );
}

function Card({ title, text }) {
  return (
    <div
      style={{
        background: "white",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        minHeight: "120px",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: "12px",
          fontSize: "22px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color: "#666",
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {text}
      </p>
    </div>
  );
} 
