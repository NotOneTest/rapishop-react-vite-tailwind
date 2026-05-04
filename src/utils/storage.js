const QUOTA_EXCEEDED = 'QuotaExceededError'

function safeGetItem(key) {
  try {
    return localStorage.getItem(key)
  } catch {
    console.warn(`localStorage.getItem("${key}") failed`)
    return null
  }
}

function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value)
    return true
  } catch (err) {
    if (err?.name === QUOTA_EXCEEDED || err?.code === 22) {
      console.error('localStorage quota exceeded for key:', key)
    } else {
      console.error('localStorage.setItem failed for key:', key, err)
    }
    return false
  }
}

function safeRemoveItem(key) {
  try {
    localStorage.removeItem(key)
    return true
  } catch {
    console.warn(`localStorage.removeItem("${key}") failed`)
    return false
  }
}

export function loadFromStorage(key, fallback) {
  try {
    const saved = safeGetItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    console.warn(`Failed to parse localStorage key: ${key}`)
    return fallback
  }
}

export function saveToStorage(key, value) {
  try {
    return safeSetItem(key, JSON.stringify(value))
  } catch {
    console.error(`Failed to serialize value for key: ${key}`)
    return false
  }
}

export function removeFromStorage(key) {
  return safeRemoveItem(key)
}
