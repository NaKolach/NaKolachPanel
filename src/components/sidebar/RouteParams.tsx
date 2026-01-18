import { CATEGORIES } from "../../data/categories"
import CategoryFilter from "./CategoryFilter"
import ActionButton from "../sidebar/ActionButton"

type RouteParamsProps = {
  radius: number
  filters: Record<string, boolean>
  isSearchingRoute: boolean

  onRadiusChange: (v: number) => void
  onToggleCategory: (id: string) => void
  onEditCategory: (id: string) => void

  onSearchRoute: () => Promise<void>
  onSearchRouteByPoints: () => Promise<void>
}

export default function RouteParams({
  radius,
  filters,
  isSearchingRoute,
  onRadiusChange,
  onToggleCategory,
  onEditCategory,
  onSearchRoute,
  onSearchRouteByPoints,
}: RouteParamsProps) {
  const allSelected = Object.values(filters).every(v => v)

  const handleToggleAll = () => {
    Object.keys(filters).forEach(id => {
      if (filters[id] !== !allSelected) {
        onToggleCategory(id)
      }
    })
  }

  return (
    <div className="flex flex-col text-gray-900 dark:text-gray-100">
      {/* HEADER */}
      <div className="font-semibold mb-2">
        Parametry Trasy
      </div>

      {/* RADIUS */}
      <label className="text-sm text-gray-700 dark:text-gray-300 mb-1">
        Promień szukania:
        <span className="ml-1 font-medium">{radius} km</span>
      </label>

      <input
        type="range"
        min={1}
        max={15}
        value={radius}
        onChange={e => onRadiusChange(+e.target.value)}
        className="w-full accent-green-600 dark:accent-green-500 mb-3"
      />

      {/* TOGGLE ALL */}
      <button
        onClick={handleToggleAll}
        className="
          mb-2 w-full
          py-2 rounded-md
          border
          border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-700
          hover:bg-gray-100 dark:hover:bg-gray-600
          flex items-center justify-center
        "
      >
        <span className="text-gray-800 dark:text-gray-200 text-sm">
          {allSelected ? "Odznacz wszystkie" : "Zaznacz wszystkie"}
        </span>
      </button>

      {/* CATEGORY LIST */}
      <div className="overflow-y-auto rounded-md pr-1 max-h-[45vh]">
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

      {/* ACTIONS */}
      <div className="mt-3 space-y-2">
        <ActionButton
          label="Szukaj trasę"
          loadingLabel="Szukam trasy…"
          loading={isSearchingRoute}
          onClick={onSearchRoute}
        />

        <ActionButton
          label="Szukaj trasy przez punkty"
          loadingLabel="Szukam przez punkty…"
          loading={isSearchingRoute}
          onClick={onSearchRouteByPoints}
        />
      </div>
    </div>
  )
}
