export function getAllStorage() {
  if (!window.localStorage.getItem('searchRecord')) return

  let searchRecord = window.localStorage.getItem('searchRecord')
  let mapStorage = new Map(JSON.parse(searchRecord))
  return [...mapStorage.entries()].reverse()
}

export function setStorage(key, val) {
  if (!window.localStorage.getItem('searchRecord')) {
    window.localStorage.setItem('searchRecord', JSON.stringify([]))
  }

  let searchRecord = window.localStorage.getItem('searchRecord')
  let mapStorage = new Map(JSON.parse(searchRecord))
  if (mapStorage.size >= 7 && !mapStorage.has(key)) {
    mapStorage.delete([...mapStorage.keys()][0])
    mapStorage.set(key, val)
  } else if (mapStorage.has(key)) {
    mapStorage.delete(key)
    mapStorage.set(key, val)
  } else {
    mapStorage.set(key, val)
  }
  window.localStorage.setItem('searchRecord', JSON.stringify([...mapStorage]))
}

export function removeStorage(key) {
  if (!window.localStorage.getItem('searchRecord')) return

  let searchRecord = window.localStorage.getItem('searchRecord')
  let mapStorage = new Map(JSON.parse(searchRecord))
  mapStorage.delete(key)
  window.localStorage.setItem('searchRecord', JSON.stringify([...mapStorage]))
}

export function clearStorage() {
  if (!window.localStorage.getItem('searchRecord')) return

  window.localStorage.removeItem('searchRecord')
}
