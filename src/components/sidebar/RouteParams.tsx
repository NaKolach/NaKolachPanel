import { CATEGORIES } from '../../data/categories'
import CategoryFilter from './CategoryFilter'

type RouteParamsProps = {
  radius: number
  filters: Record<string, boolean>
  onRadiusChange: (v: number) => void
  onToggleCategory: (id: string) => void
  onEditCategory: (id: string) => void
  onSearchRoute: () => Promise<void>
}


export default function RouteParams({
  radius,
  filters,
  onRadiusChange,
  onEditCategory,
  onToggleCategory,
  onSearchRoute,
}: RouteParamsProps) {
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="font-semibold text-gray-900 dark:text-gray-100">
          Parametry Trasy
        </div>

        <label className="text-sm text-gray-700 dark:text-gray-300">
          Promień szukania:
          <span className="ml-1 font-medium">{radius} km</span>
        </label>

        <input
          type="range"
          min={1}
          max={50}
          value={radius}
          onChange={(e) => onRadiusChange(+e.target.value)}
          className="w-full accent-green-600 dark:accent-green-500"
        />

        <div className="flex-1 overflow-y-auto rounded-md pr-1">
          {CATEGORIES.map(cat => (
            <CategoryFilter
              key={cat.id}
              label={cat.label}
              Icon={cat.Icon}
              checked={filters[cat.id]}
              onChange={() => onToggleCategory(cat.id)}
              onEdit={() => onEditCategory(cat.id)}
            />
          ))}
        </div>
      </div>

      <button
        onClick={onSearchRoute}
        className="
          mt-3 w-full
          bg-green-600 hover:bg-green-700
          dark:bg-green-500 dark:hover:bg-green-600
          text-white font-semibold
          py-3 rounded-lg
        "
      >
        Szukaj trasy
      </button>
    </>
  )
}