interface SavedRoutesButtonProps {
  onClick: () => void
}

export default function SavedRoutesButton({ onClick }: SavedRoutesButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        w-full
        flex items-center gap-3
        px-4 py-3
        rounded-xl
        text-sm font-medium
        text-gray-800 dark:text-gray-200
        bg-white dark:bg-gray-700
        hover:bg-gray-100 dark:hover:bg-gray-600
        transition-colors
      "
    >
      <span className="text-base">📍</span>
      <span>Zapisane trasy</span>
    </button>
  )
}
