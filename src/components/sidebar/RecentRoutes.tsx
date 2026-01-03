export default function RecentRoutes() {
  return (
    <div className="bg-white rounded-lg shadow p-3 text-sm">
      <div className="font-medium mb-2">Ostatnie trasy:</div>
      <ul className="space-y-1">
        <li>Trasa Nad Wisłą (15km)</li>
        <li>Do Muzeum Ziemi (8km)</li>
        <li>Pętla Miejska (20km)</li>
      </ul>
      <div className="mt-3 text-red-600 cursor-pointer">Wyloguj się</div>
    </div>
  )
}
