import { useState } from 'react'
import type { Category } from '../../data/category'
import { PIN_COLORS, type PinColorKey } from '../../data/pinColors'
import BackButton from "../sidebar/BackButton"

export default function CategoryEditPanel({
  category,
  onSave,
  onClose,
}: {
  category: Category
  onSave: (id: string, color: PinColorKey) => void
  onClose: () => void
}) {
  const [color, setColor] = useState<PinColorKey>(category.pinColor)
  const active = PIN_COLORS[color]

  const save = () => {
    onSave(category.id, color)
    onClose()
  }

  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <BackButton onClick={onClose} />

          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
            Edycja markera: {category.label}
          </h2>
        </div>



      <div className={`${active.tw} rounded-xl p-6 flex justify-center`}>
        <category.Icon className="w-20 h-20 text-white" />
      </div>

      <div className="grid grid-cols-8 gap-2">
        {(Object.keys(PIN_COLORS) as PinColorKey[]).map(key => (
          <button
            key={key}
            onClick={() => setColor(key)}
            className={`w-7 h-7 rounded-full ${PIN_COLORS[key].tw}`}
          />
        ))}
      </div>

      <button
        onClick={save}
        className={`w-full py-3 rounded-xl ${active.tw} text-white font-semibold`}
      >
        Zapisz marker
      </button>
    </div>
  )
}
