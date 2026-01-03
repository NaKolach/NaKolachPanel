export default function CategoryFilter({ label, checked, onChange }: any) {
  return (
    <div className="flex justify-between items-center bg-white p-2 rounded shadow mt-2">
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={checked} onChange={onChange} />
        {label}
      </label>
      <button>✏️</button>
    </div>
  )
}
