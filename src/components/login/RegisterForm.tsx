import { useState, type FormEvent } from "react"

interface RegisterFormProps {
  onSubmit: (data: {
    email: string
    login: string
    password: string
  }) => Promise<void>
}

type ApiValidationError = {
  status: number
  errors?: Record<string, string[]>
}

const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const [email, setEmail] = useState("")
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !login || !password || !confirm) {
      setError("Wszystkie pola są wymagane.")
      return
    }

    if (password !== confirm) {
      setError("Hasła nie są zgodne.")
      return
    }

    try {
      await onSubmit({ email, login, password })
    } catch (err: any) {
      const apiError: ApiValidationError | undefined = err?.response?.data

      if (apiError?.errors) {
        // bierze pierwszy komunikat z backendu, np. Password
        const firstFieldErrors = Object.values(apiError.errors)[0]
        if (firstFieldErrors?.length) {
          setError(firstFieldErrors[0])
          return
        }
      }

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
        value={login}
        onChange={e => setLogin(e.target.value)}
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
