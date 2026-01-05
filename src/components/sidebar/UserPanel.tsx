import UserIcon from '../../assets/svg/user.svg?react'

interface UserPanelProps {
  username: string
  onLogout: () => void
}

export default function UserPanel({ username, onLogout }: UserPanelProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-600 dark:bg-green-500">
          <UserIcon className="w-5 h-5 text-white" />
        </div>

        <span className="font-semibold text-gray-900 dark:text-gray-100">{username}</span>
      </div>

      <button
        onClick={onLogout}
        className="self-start text-xs text-red-600 hover:underline"
      >
        Wyloguj się
      </button>
    </div>
  )
}
