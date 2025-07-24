import { useState } from "react";
import api from "../api/axios";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [passwordHash, setPasswordHash] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/user", { email, passwordHash, goalWeight: 80 });
      alert("Bruger oprettet! Du kan nu logge ind.");
    } catch (error) {
      alert("Oprettelse fejlede!");
      console.error(error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Opret bruger</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          type="password"
          placeholder="Adgangskode"
          value={passwordHash}
          onChange={(e) => setPasswordHash(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Opret bruger
        </button>
      </form>
    </>
  );
}
