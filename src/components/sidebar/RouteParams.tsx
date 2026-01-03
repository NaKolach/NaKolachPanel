import CategoryFilter from "./CategoryFilter"

export default function RouteParams({
  radius,
  filters,
  onRadiusChange,
  onFiltersChange,
}: any) {
  return (
    <>
      <div>
        <div className="font-semibold mb-2">Parametry Trasy</div>

        <label className="text-sm">
          Promień szukania: <b>{radius} km</b>
        </label>
        <input
          type="range"
          min={1}
          max={30}
          value={radius}
          onChange={(e) => onRadiusChange(+e.target.value)}
          className="w-full mt-2"
        />

        <CategoryFilter
          label="Muzea"
          checked={filters.museums}
          onChange={() =>
            onFiltersChange({ ...filters, museums: !filters.museums })
          }
        />
        <CategoryFilter
          label="Kawiarnie"
          checked={filters.cafes}
          onChange={() =>
            onFiltersChange({ ...filters, cafes: !filters.cafes })
          }
        />
        <CategoryFilter
          label="Kina"
          checked={filters.cinemas}
          onChange={() =>
            onFiltersChange({ ...filters, cinemas: !filters.cinemas })
          }
        />
      </div>

      <button className="mt-auto bg-green-600 text-white py-3 rounded-lg font-semibold">
        Szukaj trasy
      </button>
    </>
  )
}
