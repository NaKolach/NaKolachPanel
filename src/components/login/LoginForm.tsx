import { useState, type FormEvent } from "react"
import User from "../../assets/svg/user.svg?react"
import Lock from "../../assets/svg/lock.svg?react"

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Uzupełnij login i hasło.")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Nieprawidłowy format adresu email.")
      return
    }

    onSubmit({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="relative">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border rounded-md px-10 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <span className="absolute left-3 top-2.5 text-gray-400"><User className="w-5 h-5"/></span>
      </div>

      <div className="relative">
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border rounded-md px-10 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <span className="absolute left-3 top-2.5 text-gray-400"><Lock className="w-5 h-5"/></span>
      </div>

      <button
        type="submit"
        className="w-full bg-emerald-600 text-white py-2 rounded-md font-medium hover:bg-emerald-700"
      >
        Zaloguj się
      </button>
    </form>
  )
}

export default LoginForm
