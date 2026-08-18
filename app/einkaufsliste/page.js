"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function EinkaufslistePage() {
  const [artikel, setArtikel] = useState("");
  const [einkaufsliste, setEinkaufsliste] = useState([]);
  const [laden, setLaden] = useState(true);
  const [fehler, setFehler] = useState("");
  const [bearbeitenId, setBearbeitenId] = useState(null);

  useEffect(() => {
    einkaufslisteLaden();
  }, []);

  async function einkaufslisteLaden() {
    setLaden(true);
    setFehler("");

    const { data, error } = await supabase
      .from("einkaufsliste")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setFehler("Die Einkaufsliste konnte nicht geladen werden.");
      setLaden(false);
      return;
    }

    setEinkaufsliste(data || []);
    setLaden(false);
  }

  async function artikelSpeichern(e) {
    e.preventDefault();
    setFehler("");

    if (!artikel.trim()) {
      setFehler("Bitte einen Artikel eingeben.");
      return;
    }

    if (bearbeitenId) {
      const { error } = await supabase
        .from("einkaufsliste")
        .update({
          text: artikel.trim(),
        })
        .eq("id", bearbeitenId);

      if (error) {
        setFehler("Der Artikel konnte nicht geändert werden.");
        return;
      }
    } else {
      const { error } = await supabase
        .from("einkaufsliste")
        .insert([
          {
            text: artikel.trim(),
            erledigt: false,
          },
        ]);

      if (error) {
        setFehler("Der Artikel konnte nicht hinzugefügt werden.");
        return;
      }
    }

    setArtikel("");
    setBearbeitenId(null);
    await einkaufslisteLaden();
  }

  function artikelBearbeiten(eintrag) {
    setArtikel(eintrag.text || "");
    setBearbeitenId(eintrag.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function erledigtUmschalten(eintrag) {
    const { error } = await supabase
      .from("einkaufsliste")
      .update({
        erledigt: !eintrag.erledigt,
      })
      .eq("id", eintrag.id);

    if (error) {
      setFehler("Der Artikel konnte nicht aktualisiert werden.");
      return;
    }

    await einkaufslisteLaden();
  }

  async function artikelLoeschen(id) {
    const bestaetigt = window.confirm(
      "Möchtest du diesen Artikel wirklich löschen?"
    );

    if (!bestaetigt) return;

    const { error } = await supabase
      .from("einkaufsliste")
      .delete()
      .eq("id", id);

    if (error) {
      setFehler("Der Artikel konnte nicht gelöscht werden.");
      return;
    }

    if (bearbeitenId === id) {
      setArtikel("");
      setBearbeitenId(null);
    }

    await einkaufslisteLaden();
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
          🛒 Einkaufsliste
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Gemeinsame Einkaufsliste für die Familie.
        </p>

        <form
          onSubmit={artikelSpeichern}
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            {bearbeitenId ? "Artikel bearbeiten" : "Artikel hinzufügen"}
          </h2>

          <input
            type="text"
            placeholder="Zum Beispiel: Milch"
            value={artikel}
            onChange={(e) => setArtikel(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
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
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {bearbeitenId
                ? "Änderungen speichern"
                : "Artikel hinzufügen"}
            </button>

            {bearbeitenId && (
              <button
                type="button"
                onClick={() => {
                  setArtikel("");
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

        <h2>Eure Einkaufsliste</h2>

        {laden ? (
          <p style={{ color: "#666" }}>
            Einkaufsliste wird geladen…
          </p>
        ) : einkaufsliste.length === 0 ? (
          <p style={{ color: "#666" }}>
            Noch keine Artikel eingetragen.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "12px",
            }}
          >
            {einkaufsliste.map((eintrag) => (
              <div
                key={eintrag.id}
                style={{
                  background: "white",
                  padding: "18px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "15px",
                  flexWrap: "wrap",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    flex: 1,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={Boolean(eintrag.erledigt)}
                    onChange={() => erledigtUmschalten(eintrag)}
                  />

                  <span
                    style={{
                      fontSize: "18px",
                      textDecoration: eintrag.erledigt
                        ? "line-through"
                        : "none",
                      color: eintrag.erledigt ? "#888" : "#222",
                    }}
                  >
                    {eintrag.text}
                  </span>
                </label>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => artikelBearbeiten(eintrag)}
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
                    type="button"
                    onClick={() => artikelLoeschen(eintrag.id)}
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
