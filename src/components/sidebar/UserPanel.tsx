import UserIcon from '../../assets/svg/user.svg?react'

export default function UserPanel() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        <div
          className="
            w-10 h-10
            rounded-full
            bg-gray-300 dark:bg-gray-600
            flex items-center justify-center
          "
        >
          <UserIcon className="w-5 h-5 text-white opacity-90" />
        </div>

        <span className="font-semibold text-gray-900 dark:text-gray-100">
          Kubaliczny Obszar
        </span>
      </div>

      <button
        className="
          self-start
          text-xs
          text-red-600 dark:text-red-400
          hover:underline
        "
      >
        Wyloguj się
      </button>
    </div>
  )
}
