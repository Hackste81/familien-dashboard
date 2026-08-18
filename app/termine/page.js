"use client";

import { useEffect, useState } from "react";

export default function TerminePage() {
  const [titel, setTitel] = useState("");
  const [datum, setDatum] = useState("");
  const [uhrzeit, setUhrzeit] = useState("");
  const [termine, setTermine] = useState([]);

  useEffect(() => {
    const gespeichert = localStorage.getItem("familien-termine");

    if (gespeichert) {
      setTermine(JSON.parse(gespeichert));
    }
  }, []);

  function terminHinzufuegen(e) {
    e.preventDefault();

    if (!titel || !datum) {
      alert("Bitte mindestens einen Namen und ein Datum eingeben.");
      return;
    }

    const neuerTermin = {
      id: Date.now(),
      titel,
      datum,
      uhrzeit,
    };

    const neueListe = [...termine, neuerTermin];

    setTermine(neueListe);
    localStorage.setItem("familien-termine", JSON.stringify(neueListe));

    setTitel("");
    setDatum("");
    setUhrzeit("");
  }

  function terminLoeschen(id) {
    const neueListe = termine.filter((termin) => termin.id !== id);

    setTermine(neueListe);
    localStorage.setItem("familien-termine", JSON.stringify(neueListe));
  }

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
        <a
          href="/"
          style={{
            color: "#555",
            textDecoration: "none",
          }}
        >
          ← Zurück zum Dashboard
        </a>

        <h1
          style={{
            marginTop: "30px",
            fontSize: "36px",
          }}
        >
          📅 Termine
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Hier könnt ihr eure Familientermine eintragen.
        </p>

        <form
          onSubmit={terminHinzufuegen}
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Neuer Termin</h2>

          <input
            type="text"
            placeholder="Zum Beispiel: Zahnarzt"
            value={titel}
            onChange={(e) => setTitel(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />

          <input
            type="date"
            value={datum}
            onChange={(e) => setDatum(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />

          <input
            type="time"
            value={uhrzeit}
            onChange={(e) => setUhrzeit(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Termin hinzufügen
          </button>
        </form>

        <h2>Eure Termine</h2>

        {termine.length === 0 ? (
          <p style={{ color: "#666" }}>Noch keine Termine eingetragen.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "15px",
            }}
          >
            {termine.map((termin) => (
              <div
                key={termin.id}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                }}
              >
                <h3 style={{ marginTop: 0 }}>{termin.titel}</h3>

                <p>
                  📅 {termin.datum}
                  {termin.uhrzeit ? ` · 🕒 ${termin.uhrzeit}` : ""}
                </p>

                <button
                  onClick={() => terminLoeschen(termin.id)}
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Löschen
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 
