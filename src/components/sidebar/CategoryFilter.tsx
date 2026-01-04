import type { ComponentType } from 'react'

type Props = {
  label: string
  Icon: ComponentType<{ className?: string }>
  checked: boolean
  onChange: () => void
}

export default function CategoryFilter({
  label,
  Icon,
  checked,
  onChange,
}: Props) {
  return (
    <div
      className="
        grid grid-cols-[1fr_32px]
        items-center
        bg-white dark:bg-gray-700
        px-3 py-2
        shadow-sm
        rounded-none first:rounded-t-md last:rounded-b-md
      "
    >
      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="accent-blue-600 dark:accent-blue-400"
        />

        <Icon className="w-4 h-4 text-gray-700 dark:text-gray-200 opacity-80" />

        <span className="text-gray-800 dark:text-gray-200">
          {label}
        </span>
      </label>

      {/* PRAWA STRONA – przycisk menu */}
      <button
        type="button"
        className="
          flex items-center justify-center
          w-6 h-6
          text-gray-500 dark:text-gray-300
          hover:bg-gray-200 dark:hover:bg-gray-600
          rounded-md
        "
      >
        ⋮
      </button>
    </div>
  )
}
