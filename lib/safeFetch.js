export async function safeFetch(url, options = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), global.timeout || 10000)

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal
    })
    return res
  } catch (e) {
    throw new Error('API_TIMEOUT')
  } finally {
    clearTimeout(timeout)
  }
}
