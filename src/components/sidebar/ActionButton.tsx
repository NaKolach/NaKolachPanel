type ActionButtonProps = {
  label: string
  loadingLabel?: string
  loading?: boolean
  disabled?: boolean
  onClick: () => void
}

export default function ActionButton({
  label,
  loadingLabel = "Przetwarzanie…",
  loading = false,
  disabled = false,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="
        w-full
        bg-green-600 hover:bg-green-700
        dark:bg-green-500 dark:hover:bg-green-600
        text-white font-semibold
        py-3 rounded-lg
        disabled:opacity-60 disabled:cursor-wait
      "
    >
      {loading ? loadingLabel : label}
    </button>
  )
}
