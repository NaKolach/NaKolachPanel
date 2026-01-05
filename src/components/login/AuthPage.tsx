import { useState } from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import AuthMapBackground from "./AuthMapBackground"
import Logo from "../../assets/svg/logo128.svg?react"

const AuthPage = ({ onLogin, onRegister }: any) => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* MAPA */}
      <AuthMapBackground />

      {/* KARTA */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-xl px-8 py-10">
        <div className="flex flex-col items-center mb-6">
            <div className="mb-3">
              <Logo className="w-22 h-22" />
            </div>
          <h1 className="text-4xl font-semibold text-gray-800">
            NaKołach
          </h1>
        </div>

        {isLogin ? (
          <LoginForm onSubmit={onLogin} />
        ) : (
          <RegisterForm onSubmit={onRegister} />
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
