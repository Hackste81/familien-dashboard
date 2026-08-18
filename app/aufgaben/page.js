"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AufgabenPage() {
  const [text, setText] = useState("");
  const [aufgaben, setAufgaben] = useState([]);
  const [laden, setLaden] = useState(true);
  const [fehler, setFehler] = useState("");
  const [bearbeitenId, setBearbeitenId] = useState(null);

  useEffect(() => {
    aufgabenLaden();
  }, []);

  async function aufgabenLaden() {
    setLaden(true);
    setFehler("");

    const { data, error } = await supabase
      .from("aufgaben")
      .select("*")
      .order("erledigt", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      setFehler("Aufgaben konnten nicht geladen werden.");
      setLaden(false);
      return;
    }

    setAufgaben(data || []);
    setLaden(false);
  }

  async function aufgabeSpeichern(e) {
    e.preventDefault();
    setFehler("");

    if (!text.trim()) {
      setFehler("Bitte eine Aufgabe eingeben.");
      return;
    }

    if (bearbeitenId) {
      const { error } = await supabase
        .from("aufgaben")
        .update({ text: text.trim() })
        .eq("id", bearbeitenId);

      if (error) {
        setFehler("Die Aufgabe konnte nicht geändert werden.");
        return;
      }
    } else {
      const { error } = await supabase.from("aufgaben").insert([
        {
          text: text.trim(),
          erledigt: false,
        },
      ]);

      if (error) {
        setFehler("Die Aufgabe konnte nicht gespeichert werden.");
        return;
      }
    }

    setText("");
    setBearbeitenId(null);
    await aufgabenLaden();
  }

  function aufgabeBearbeiten(aufgabe) {
    setText(aufgabe.text || "");
    setBearbeitenId(aufgabe.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function erledigtUmschalten(aufgabe) {
    const { error } = await supabase
      .from("aufgaben")
      .update({ erledigt: !aufgabe.erledigt })
      .eq("id", aufgabe.id);

    if (error) {
      setFehler("Die Aufgabe konnte nicht aktualisiert werden.");
      return;
    }

    await aufgabenLaden();
  }

  async function aufgabeLoeschen(id) {
    const bestaetigt = window.confirm(
      "Möchtest du diese Aufgabe wirklich löschen?"
    );

    if (!bestaetigt) return;

    const { error } = await supabase
      .from("aufgaben")
      .delete()
      .eq("id", id);

    if (error) {
      setFehler("Die Aufgabe konnte nicht gelöscht werden.");
      return;
    }

    if (bearbeitenId === id) {
      setText("");
      setBearbeitenId(null);
    }

    await aufgabenLaden();
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
          ✅ Aufgaben
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Gemeinsame Aufgaben für die Familie.
        </p>

        <form
          onSubmit={aufgabeSpeichern}
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            {bearbeitenId ? "Aufgabe bearbeiten" : "Neue Aufgabe"}
          </h2>

          <input
            type="text"
            placeholder="Zum Beispiel: Müll rausbringen"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
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
              {bearbeitenId ? "Änderungen speichern" : "Aufgabe hinzufügen"}
            </button>

            {bearbeitenId && (
              <button
                type="button"
                onClick={() => {
                  setText("");
                  setBearbeitenId(null);
                }}
                style={{
                  padding: "12px 20px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Abbrechen
              </button>
            )}
          </div>

          {fehler && (
            <p
              style={{
                marginTop: "16px",
                marginBottom: 0,
                color: "#b00020",
              }}
            >
              {fehler}
            </p>
          )}
        </form>

        <h2>Eure Aufgaben</h2>

        {laden ? (
          <p style={{ color: "#666" }}>Aufgaben werden geladen…</p>
        ) : aufgaben.length === 0 ? (
          <p style={{ color: "#666" }}>Noch keine Aufgaben eingetragen.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "12px",
            }}
          >
            {aufgaben.map((aufgabe) => (
              <div
                key={aufgabe.id}
                style={{
                  background: "white",
                  padding: "18px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "15px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  onClick={() => erledigtUmschalten(aufgabe)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  <span style={{ fontSize: "24px" }}>
                    {aufgabe.erledigt ? "✅" : "⬜"}
                  </span>

                  <span
                    style={{
                      fontSize: "18px",
                      textDecoration: aufgabe.erledigt
                        ? "line-through"
                        : "none",
                      color: aufgabe.erledigt ? "#888" : "#222",
                    }}
                  >
                    {aufgabe.text}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <button
                    onClick={() => aufgabeBearbeiten(aufgabe)}
                    style={{
                      padding: "8px 12px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Bearbeiten
                  </button>

                  <button
                    onClick={() => aufgabeLoeschen(aufgabe.id)}
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
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
