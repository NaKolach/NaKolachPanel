export let authDead = false
export let currentUserId: number | null = null

export function markAuthDead() {
  authDead = true
}

export function resetAuthDead() {
  authDead = false
}

export function setCurrentUserId(id: number) {
  currentUserId = id
}

export function clearCurrentUserId() {
  currentUserId = null
}