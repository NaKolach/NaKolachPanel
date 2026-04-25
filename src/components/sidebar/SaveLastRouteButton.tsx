interface SaveLastRouteButtonProps {
  routeId: string | null | undefined
}


export default function SaveLastRouteButton({ routeId }: SaveLastRouteButtonProps) {
  console.log(routeId)
  if (!routeId) return null
  console.log(1)
  const handleSave = async () => {
    await fetch(`/api/routes/${routeId}/saved`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
  }

  console.log(2)
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
