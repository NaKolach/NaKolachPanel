import UserIcon from "../../assets/svg/user.svg?react"
import api from "../../api/api"
import { resetAuthDead } from "../../auth/authState"

interface UserPanelProps {
  login: string
  onLogout: () => void
}

export default function UserPanel({ login, onLogout }: UserPanelProps) {
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout")
    } catch {}

    resetAuthDead()
    onLogout()
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-600 dark:bg-green-500">
          <UserIcon className="w-5 h-5 text-white" />
        </div>

        <span className="font-semibold text-gray-900 dark:text-gray-100">
          {login}
        </span>
      </div>

      <button
        onClick={handleLogout}
        className="self-start text-xs text-red-600 hover:underline"
      >
        Wyloguj się
      </button>
    </div>
  )
}
