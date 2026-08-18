export default function TerminePage() {
  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "60px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <a
        href="/"
        style={{
          color: "#555",
          textDecoration: "none",
        }}
      >
        ← Zurück zum Dashboard
      </a>

      <h1 style={{ marginTop: "30px" }}>📅 Termine</h1>

      <p>Hier werden künftig eure Familientermine angezeigt.</p>

      <div
        style={{
          marginTop: "30px",
          padding: "25px",
          border: "1px solid #ddd",
          borderRadius: "12px",
        }}
      >
        <h2>Neuer Termin</h2>

        <p>
          Als Nächstes bauen wir hier die Möglichkeit ein, Termine
          hinzuzufügen und zu speichern.
        </p>
      </div>
    </main>
  );
}
