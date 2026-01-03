import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface AuthPageProps {
  onLogin: (data: { email: string; password: string }) => void;
  onRegister: (data: { email: string; username: string; password: string }) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">NaKołach</h1>

      {isLogin ? (
        <LoginForm onSubmit={onLogin} />
      ) : (
        <RegisterForm onSubmit={onRegister} />
      )}

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-blue-600 hover:underline"
      >
        {isLogin ? "Nie masz konta? Zarejestruj się" : "Masz konto? Zaloguj się"}
      </button>
    </div>
  );
};

export default AuthPage;
