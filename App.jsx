import React, { useState } from "react";

export default function App() {
  const [players, setPlayers] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [position, setPosition] = useState("");
  const [club, setClub] = useState("");

  const [tmUrl, setTmUrl] = useState("");

  const addPlayer = () => {
    if (!name) return;

    setPlayers([
      ...players,
      {
        name,
        age,
        position,
        club,
      },
    ]);

    setName("");
    setAge("");
    setPosition("");
    setClub("");
  };

  const importTransfermarkt = async () => {
    try {
      const res = await fetch("/api/transfermarkt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: tmUrl,
        }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      setName(data.name || "");
      setAge(data.age || "");
      setPosition(data.position || "");
      setClub(data.club || "");
    } catch (err) {
      alert("Transfermarkt məlumatı alınmadı");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>ScoutQabala</h1>

      <h2>Transfermarkt import</h2>

      <input
        style={{ width: "500px" }}
        placeholder="Transfermarkt oyunçu linki"
        value={tmUrl}
        onChange={(e) => setTmUrl(e.target.value)}
      />

      <br />
      <br />

      <button onClick={importTransfermarkt}>
        Transfermarkt import et
      </button>

      <hr />

      <h2>Yeni futbolçu əlavə et</h2>

      <input
        placeholder="Ad Soyad"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Yaş"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Mövqe"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Klub"
        value={club}
        onChange={(e) => setClub(e.target.value)}
      />

      <br />
      <br />

      <button onClick={addPlayer}>
        Futbolçu əlavə et
      </button>

      <hr />

      <h2>Futbolçular</h2>

      {players.map((p, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <b>{p.name}</b>

          <div>Yaş: {p.age}</div>
          <div>Mövqe: {p.position}</div>
          <div>Klub: {p.club}</div>
        </div>
      ))}
    </div>
  );
}
