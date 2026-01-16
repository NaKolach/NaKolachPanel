import type { BackendPlace } from "../../data/backendPlace"

type GraphHopperPath = [number, number][]

interface SaveLastRouteButtonProps {
  routePath: GraphHopperPath | null
  routePlaces: BackendPlace[]
}

export default function SaveLastRouteButton({
  routePath,
  routePlaces,
}: SaveLastRouteButtonProps) {
  if (!routePath || routePath.length === 0) return null

  const handleSave = () => {
    const payload = {
      savedAt: new Date().toISOString(),
      path: routePath,
      points: routePlaces,
    }

    const blob = new Blob(
      [JSON.stringify(payload, null, 2)],
      { type: "application/json" }
    )

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "testSave.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleSave}
      className="
        mt-3 w-full
        bg-green-700 hover:bg-green-800
        dark:bg-green-600 dark:hover:bg-green-700
        text-white font-semibold
        py-3 rounded-lg
      "
    >
      Zapisz ostatnią trasę
    </button>
  )
}
