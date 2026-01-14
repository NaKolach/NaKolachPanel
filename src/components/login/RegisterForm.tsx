import { useState, type FormEvent } from "react"

interface RegisterFormProps {
  onSubmit: (data: {
    email: string
    username: string
    password: string
  }) => Promise<void>
}

const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !username || !password || !confirm) {
      setError("Wszystkie pola są wymagane.")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Nieprawidłowy email.")
      return
    }

    if (password.length < 6) {
      setError("Hasło musi mieć minimum 6 znaków.")
      return
    }

    if (password !== confirm) {
      setError("Hasła nie są zgodne.")
      return
    }

    try {
      await onSubmit({ email, username, password })
    } catch {
      setError("Rejestracja nie powiodła się.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-sm text-red-600">{error}</div>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full border rounded-md px-4 py-2"
      />

      <input
        type="text"
        placeholder="Nazwa użytkownika"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="w-full border rounded-md px-4 py-2"
      />

      <input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full border rounded-md px-4 py-2"
      />

      <input
        type="password"
        placeholder="Powtórz hasło"
        value={confirm}
        onChange={e => setConfirm(e.target.value)}
        className="w-full border rounded-md px-4 py-2"
      />

      <button className="w-full bg-emerald-600 text-white py-2 rounded-md">
        Zarejestruj się
      </button>
    </form>
  )
}

export default RegisterForm
