import { useState } from "react";
import type { FormEvent } from "react";
interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Wszystkie pola muszą być wypełnione.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Nieprawidłowy format email.");
      return;
    }

    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-black rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Logowanie</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Hasło</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Zaloguj się
      </button>
    </form>
  );
};

export default LoginForm;
