import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../contexts/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, passwordHash });
      login(response.data.token);
      navigate("/measurements");
      console.log("Login successful, token stored:", response.data.token);
    } catch (error) {
      alert("Login fejlede!");
      console.error(error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Log ind</h2>
      <form onSubmit={handleLogin} className="space-y-4">
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
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Log ind
        </button>
      </form>
    </>
  );
}
