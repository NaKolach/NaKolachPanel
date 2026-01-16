import { useState, type FormEvent } from "react"
import User from "../../assets/svg/user.svg?react"
import Lock from "../../assets/svg/lock.svg?react"

interface LoginFormProps {
  onSubmit: (data: { login: string; password: string }) => Promise<void>
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")

    if (!login || !password) {
      setError("Uzupełnij login i hasło.")
      return
    }

    try {
      await onSubmit({ login, password })
    } catch {
      setError("Nieprawidłowe dane logowania.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="relative">
        <input
          type="text"
          value={login}
          onChange={e => setLogin(e.target.value)}
          placeholder="Login"
          className="w-full border rounded-md px-10 py-2"
        />
        <span className="absolute left-3 top-2.5 text-gray-400">
          <User className="w-5 h-5" />
        </span>
      </div>

      <div className="relative">
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Hasło"
          className="w-full border rounded-md px-10 py-2"
        />
        <span className="absolute left-3 top-2.5 text-gray-400">
          <Lock className="w-5 h-5" />
        </span>
      </div>

      <button className="w-full bg-emerald-600 text-white py-2 rounded-md">
        Zaloguj się
      </button>
    </form>
  )
}

export default LoginForm
