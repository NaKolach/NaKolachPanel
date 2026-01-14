import { useState } from "react"
import type { User } from "../../data/user"

interface TopUserBarProps {
  user: User
  onLogout: () => void
}

export default function TopUserBar({ user, onLogout }: TopUserBarProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-1090"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="absolute top-3 left-3 z-1100">
        <button
          onClick={() => setOpen(v => !v)}
          className="
            flex items-center gap-3
            bg-white/90 dark:bg-gray-800/90
            backdrop-blur
            px-3 py-2
            rounded-xl shadow-md
          "
        >
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-semibold">
            {user.username[0].toUpperCase()}
          </div>

          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {user.username}
          </span>

          <span className="text-gray-500">▾</span>
        </button>

        {open && (
          <div
            className="
              mt-2 w-56
              bg-white dark:bg-gray-800
              rounded-xl shadow-lg
              overflow-hidden
            "
          >
            <button
              className="
                w-full text-left px-4 py-3
                text-sm text-gray-800 dark:text-gray-200
                hover:bg-gray-100 dark:hover:bg-gray-700
              "
            >
              Ostatnie 3 trasy
            </button>

            <button
              onClick={onLogout}
              className="
                w-full text-left px-4 py-3
                text-sm text-red-600
                hover:bg-red-50 dark:hover:bg-red-900/30
              "
            >
              Wyloguj
            </button>
          </div>
        )}
      </div>
    </>
  )
}
