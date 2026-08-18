"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const bereiche = [
  {
    href: "/termine",
    icon: "📅",
    title: "Termine",
    text: "Alle Familientermine",
    background: "#E8F1FF",
  },
  {
    href: "/aufgaben",
    icon: "✅",
    title: "Aufgaben",
    text: "Gemeinsame Aufgaben",
    background: "#EAF8EF",
  },
  {
    href: "/einkaufsliste",
    icon: "🛒",
    title: "Einkaufsliste",
    text: "Was noch gebraucht wird",
    background: "#FFF4E5",
  },
  {
    href: "/notizen",
    icon: "📝",
    title: "Notizen",
    text: "Wichtige Informationen",
    background: "#F3ECFF",
  },
];

export default function Home() {
  const [termine, setTermine] = useState([]);
  const [laden, setLaden] = useState(true);
  const [fehler, setFehler] = useState("");

  useEffect(() => {
    termineLaden();
  }, []);

  function lokalesDatum(datum) {
    const jahr = datum.getFullYear();
    const monat = String(datum.getMonth() + 1).padStart(2, "0");
    const tag = String(datum.getDate()).padStart(2, "0");

    return `${jahr}-${monat}-${tag}`;
  }

  async function termineLaden() {
    setLaden(true);
    setFehler("");

    const heute = new Date();

    const letzterTag = new Date(heute);
    letzterTag.setDate(letzterTag.getDate() + 4);

    const von = lokalesDatum(heute);
    const bis = lokalesDatum(letzterTag);

    const { data, error } = await supabase
      .from("termine")
      .select("*")
      .gte("datum", von)
      .lte("datum", bis)
      .order("datum", { ascending: true })
      .order("uhrzeit", { ascending: true });

    if (error) {
      console.error(error);
      setFehler("Die Termine konnten nicht geladen werden.");
      setTermine([]);
    } else {
      setTermine(data || []);
    }

    setLaden(false);
  }

  function datumAnzeigen(datumString) {
    if (!datumString) return "";

    const datum = new Date(`${datumString}T12:00:00`);

    return datum.toLocaleDateString("de-DE", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
    });
  }

  function uhrzeitAnzeigen(uhrzeit) {
    if (!uhrzeit) return "";

    return `${uhrzeit.slice(0, 5)} Uhr`;
  }

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
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: "700",
              color: "#6b7280",
              marginBottom: "8px",
            }}
          >
            🏠 UNSER FAMILIENBEREICH
          </div>

          <h1
            style={{
              fontSize: "clamp(34px, 6vw, 50px)",
              lineHeight: "1.05",
              margin: "0 0 10px",
            }}
          >
            Familien Dashboard
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "17px",
              margin: 0,
            }}
          >
            Termine, Aufgaben, Einkäufe und wichtige Infos an einem Ort.
          </p>
        </header>

        {/* DIE NÄCHSTEN 5 TAGE */}
        <section
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            padding: "24px",
            boxShadow: "0 8px 28px rgba(0,0,0,0.07)",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#8a8f98",
                  marginBottom: "5px",
                }}
              >
                HEUTE + 4 TAGE
              </div>

              <h2
                style={{
                  margin: 0,
                  fontSize: "26px",
                }}
              >
                📅 Die nächsten 5 Tage
              </h2>
            </div>

            <Link
              href="/termine"
              style={{
                textDecoration: "none",
                color: "#2563eb",
                fontWeight: "700",
              }}
            >
              Alle Termine →
            </Link>
          </div>

          {laden ? (
            <div
              style={{
                padding: "20px",
                background: "#f7f9fc",
                borderRadius: "16px",
                color: "#6b7280",
              }}
            >
              Termine werden geladen…
            </div>
          ) : fehler ? (
            <div
              style={{
                padding: "20px",
                background: "#fff1f1",
                borderRadius: "16px",
                color: "#a33",
              }}
            >
              {fehler}
            </div>
          ) : termine.length === 0 ? (
            <div
              style={{
                padding: "22px",
                background: "#f7f9fc",
                borderRadius: "16px",
                color: "#6b7280",
              }}
            >
              Keine Termine in den nächsten 5 Tagen. 🎉
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "10px",
              }}
            >
              {termine.map((termin) => (
                <div
                  key={termin.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                    padding: "16px",
                    background: "#f7f9fc",
                    borderRadius: "16px",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      minWidth: "100px",
                      fontWeight: "700",
                    }}
                  >
                    {datumAnzeigen(termin.datum)}
                  </div>

                  <div
                    style={{
                      flex: 1,
                      minWidth: "160px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "17px",
                        fontWeight: "700",
                      }}
                    >
                      {termin.titel}
                    </div>

                    {termin.uhrzeit && (
                      <div
                        style={{
                          color: "#6b7280",
                          marginTop: "4px",
                        }}
                      >
                        🕐 {uhrzeitAnzeigen(termin.uhrzeit)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <h2
          style={{
            margin: "0 0 16px",
            fontSize: "22px",
          }}
        >
          Unsere Bereiche
        </h2>

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            gap: "16px",
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
              <div
                style={{
                  background: bereich.background,
                  borderRadius: "20px",
                  padding: "20px",
                  minHeight: "145px",
                  boxSizing: "border-box",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    fontSize: "30px",
                    marginBottom: "12px",
                  }}
                >
                  {bereich.icon}
                </div>

                <h3
                  style={{
                    margin: "0 0 7px",
                    fontSize: "21px",
                  }}
                >
                  {bereich.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#606875",
                    lineHeight: "1.4",
                  }}
                >
                  {bereich.text}
                </p>
              </div>
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
