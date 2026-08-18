"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function NotizenPage() {
  const [text, setText] = useState("");
  const [notizen, setNotizen] = useState([]);
  const [laden, setLaden] = useState(true);
  const [fehler, setFehler] = useState("");
  const [bearbeitenId, setBearbeitenId] = useState(null);

  useEffect(() => {
    notizenLaden();
  }, []);

  async function notizenLaden() {
    setLaden(true);
    setFehler("");

    const { data, error } = await supabase
      .from("notizen")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setFehler("Die Notizen konnten nicht geladen werden.");
      setLaden(false);
      return;
    }

    setNotizen(data || []);
    setLaden(false);
  }

  async function notizSpeichern(e) {
    e.preventDefault();
    setFehler("");

    if (!text.trim()) {
      setFehler("Bitte eine Notiz eingeben.");
      return;
    }

    if (bearbeitenId) {
      const { error } = await supabase
        .from("notizen")
        .update({
          text: text.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", bearbeitenId);

      if (error) {
        setFehler("Die Notiz konnte nicht geändert werden.");
        return;
      }
    } else {
      const { error } = await supabase.from("notizen").insert([
        {
          text: text.trim(),
        },
      ]);

      if (error) {
        setFehler("Die Notiz konnte nicht gespeichert werden.");
        return;
      }
    }

    setText("");
    setBearbeitenId(null);
    await notizenLaden();
  }

  function notizBearbeiten(notiz) {
    setText(notiz.text || "");
    setBearbeitenId(notiz.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function notizLoeschen(id) {
    const bestaetigt = window.confirm(
      "Möchtest du diese Notiz wirklich löschen?"
    );

    if (!bestaetigt) return;

    const { error } = await supabase
      .from("notizen")
      .delete()
      .eq("id", id);

    if (error) {
      setFehler("Die Notiz konnte nicht gelöscht werden.");
      return;
    }

    if (bearbeitenId === id) {
      setText("");
      setBearbeitenId(null);
    }

    await notizenLaden();
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
          📝 Notizen
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Wichtige Familieninfos für alle Geräte.
        </p>

        <form
          onSubmit={notizSpeichern}
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            {bearbeitenId ? "Notiz bearbeiten" : "Neue Notiz"}
          </h2>

          <textarea
            placeholder="Zum Beispiel: Morgen Sportsachen mitnehmen"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
              resize: "vertical",
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
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
              {bearbeitenId ? "Änderungen speichern" : "Notiz hinzufügen"}
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

        <h2>Eure Notizen</h2>

        {laden ? (
          <p style={{ color: "#666" }}>Notizen werden geladen…</p>
        ) : notizen.length === 0 ? (
          <p style={{ color: "#666" }}>Noch keine Notizen eingetragen.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "15px",
            }}
          >
            {notizen.map((notiz) => (
              <div
                key={notiz.id}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                }}
              >
                <p
                  style={{
                    marginTop: 0,
                    whiteSpace: "pre-wrap",
                    fontSize: "18px",
                    lineHeight: 1.5,
                  }}
                >
                  {notiz.text}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={() => notizBearbeiten(notiz)}
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
                    onClick={() => notizLoeschen(notiz.id)}
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
