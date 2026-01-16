interface BackButtonProps {
  onClick: () => void
}

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        flex items-center justify-center
        w-10 h-10
        rounded-xl
        text-xl font-semibold
        text-gray-800 dark:text-gray-200
        hover:bg-gray-200 dark:hover:bg-gray-700
        transition-colors
      "
    >
      ←
    </button>
  )
}
