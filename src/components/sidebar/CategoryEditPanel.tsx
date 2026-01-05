import { useState } from 'react'
import { CATEGORIES } from '../../data/categories'
import { PIN_COLORS, PinColorKey } from '../../data/pinColors'

export default function CategoryEditPanel({
  categoryId,
  onClose,
}: {
  categoryId: string
  onClose: () => void
}) {
  const category = CATEGORIES.find(c => c.id === categoryId)!
  const [color, setColor] = useState<PinColorKey>('blue')

  const active = PIN_COLORS[color]

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onClose}
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          ←
        </button>

        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">
          Edycja markera: {category.label}
        </h2>
      </div>

      {/* Preview – TŁO = AKTYWNY KOLOR */}
      <div
        className={`
          ${active.tw}
          rounded-xl p-6 flex justify-center
          ring-1 ring-black/10 dark:ring-white/20
        `}
      >
        <category.Icon className="w-20 h-20 text-white opacity-95" />
      </div>

      {/* Color palette */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
          Kolor markera
        </p>

        <div className="grid grid-cols-8 gap-2">
          {(Object.keys(PIN_COLORS) as PinColorKey[]).map(key => {
            const c = PIN_COLORS[key]
            const isActive = key === color

            return (
              <button
                key={key}
                onClick={() => setColor(key)}
                className={`
                  w-7 h-7 rounded-full ${c.tw}
                  ring-2 ${isActive ? 'ring-black/40 dark:ring-white' : 'ring-transparent'}
                  scale-${isActive ? '110' : '100'}
                  transition
                `}
              />
            )
          })}
        </div>
      </div>

      {/* Save */}
      <button
        className={`
          mt-4 w-full py-3 rounded-xl
          ${active.tw} hover:opacity-90
          text-white font-semibold
        `}
      >
        Zapisz marker
      </button>
    </div>
  )
}
