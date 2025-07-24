import { useState } from "react";
import LoginForm from "../components/LoginForm.jsx";
import RegisterForm from "../components/RegisterForm";

export default function AuthPage() {
    const [showLogin, setShowLogin] = useState(true);

    return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      {showLogin ? <LoginForm /> : <RegisterForm />}
      <div className="mt-4 text-center">
        {showLogin ? (
          <p>
            Har du ikke en konto?{" "}
            <button
              onClick={() => setShowLogin(false)}
              className="text-blue-600 underline"
            >
              Opret bruger
            </button>
          </p>
        ) : (
          <p>
            Har du allerede en konto?{" "}
            <button
              onClick={() => setShowLogin(true)}
              className="text-blue-600 underline"
            >
              Log ind
            </button>
          </p>
        )}
      </div>
    </div>
  );
}