import { useState } from "react"

type UseActionRequestArgs<TPayload> = {
  request: (payload: TPayload) => Promise<void>
}

export function useActionRequest<TPayload>({
  request,
}: UseActionRequestArgs<TPayload>) {
  const [loading, setLoading] = useState(false)

  const run = async (payload: TPayload) => {
    if (loading) return
    setLoading(true)
    try {
      await request(payload)
    } finally {
      setLoading(false)
    }
  }

  return {
    run,
    loading,
  }
}
