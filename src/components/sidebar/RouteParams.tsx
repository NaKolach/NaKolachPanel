import { CATEGORIES } from '../../data/categories'
import CategoryFilter from './CategoryFilter'

export default function RouteParams({
  radius,
  filters,
  onRadiusChange,
  onFiltersChange,
}: any) {
  return (
    <>
      <div className="flex flex-col h-screen ">
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
          max={30}
          value={radius}
          onChange={(e) => onRadiusChange(+e.target.value)}
          className="w-full accent-green-600 dark:accent-green-400"
        />
        <div className="flex-1 overflow-y-auto rounded-md pr-1">
          {CATEGORIES.map(cat => (
            <CategoryFilter
              key={cat.id}
              label={cat.label}
              Icon={cat.Icon}
              checked={filters[cat.id]}
              onChange={() =>
                onFiltersChange({
                  ...filters,
                  [cat.id]: !filters[cat.id],
                })
              }
            />
          ))}
        </div>
      </div>

      <button
        className="
          mt-3 w-full
          bg-green-600 hover:bg-green-700
          dark:bg-green-500 dark:hover:bg-green-600
          text-white font-semibold
          py-3 rounded-lg
          transition-colors
        "
      >
        Szukaj trasy
      </button>
    </>
  )
}
