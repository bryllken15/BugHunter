const CACHE_NAME = 'bug-hunter-v3'
// Cache only stable, same-origin static assets to avoid redirect/opaque errors
const urlsToCache = [
  '/Iconlogo.png',
  '/manifest.json'
]

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
  )
  self.skipWaiting()
})

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  const req = event.request

  // Only handle GET
  if (req.method !== 'GET') return

  const url = new URL(req.url)

  // Pass through cross-origin requests (e.g., Supabase, images CDN)
  if (url.origin !== self.location.origin) return

  // For navigations, use network (let Next.js handle routing/redirects)
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(() => caches.match('/'))) // offline fallback to root if desired
    return
  }

  // Cache-first for same-origin static assets
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached
      return fetch(req).then((res) => {
        // Avoid caching redirected/opaque error responses
        if (!res || res.type === 'opaqueredirect' || res.redirected || res.status >= 400) {
          return res
        }
        const resClone = res.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone)).catch(() => {})
        return res
      }).catch(() => cached)
    })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => self.clients.claim())
  )
})

// Handle background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Sync offline data when connection is restored
      syncOfflineData()
    )
  }
})

async function syncOfflineData() {
  // Sync any offline challenge attempts, progress updates, etc.
  console.log('Syncing offline data...')
  // Implementation would depend on specific offline features
}
