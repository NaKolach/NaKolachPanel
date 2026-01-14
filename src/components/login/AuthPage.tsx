import { useState } from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import AuthMapBackground from "./AuthMapBackground"
import Logo from "../../assets/svg/logo128.svg?react"
import { login, register } from "../../auth/auth"
import { getMe } from "../../auth/me"

type Props = {
  onLoginSuccess: (user: any) => void
}

const AuthPage = ({ onLoginSuccess }: Props) => {
  const [isLogin, setIsLogin] = useState(true)

  const handleLogin = async (data: {
    email: string
    password: string
  }) => {
    await login(data)
    const me = await getMe()
    onLoginSuccess(me)
  }

  const handleRegister = async (data: {
    email: string
    username: string
    password: string
  }) => {
    await register(data)
    setIsLogin(true) // ⬅️ POWRÓT DO LOGINU
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AuthMapBackground />

      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-xl px-8 py-10">
        <div className="flex flex-col items-center mb-6">
          <Logo className="w-22 h-22 mb-3" />
          <h1 className="text-4xl font-semibold text-gray-800">NaKołach</h1>
        </div>

        {isLogin ? (
          <LoginForm onSubmit={handleLogin} />
        ) : (
          <RegisterForm onSubmit={handleRegister} />
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          <button
            onClick={() => setIsLogin(v => !v)}
            className="hover:underline"
          >
            {isLogin ? "Zarejestruj się" : "Zaloguj się"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
