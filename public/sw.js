const CACHE_NAME = 'site-cache-v2';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon-dark.ico',
  '/web-app-manifest-48x48.png',
  '/web-app-manifest-72x72.png',
  '/web-app-manifest-96x96.png',
  '/web-app-manifest-144x144.png',
  '/web-app-manifest-192x192.png',
  '/web-app-manifest-512x512.png',
//   '/images/og-image.png',
  '/about',
  '/projects',
  '/contact',
  // Add more as needed
];

// Install: Precache static assets
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      for (const asset of STATIC_ASSETS) {
        try {
          await cache.add(asset);
        } catch (e) {
          console.error('Failed to cache:', asset, e);
        }
      }
    })
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Fetch: Stale-while-revalidate for assets, network-first for HTML
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // Network-first for navigation (HTML)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache the page
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then(res => res || caches.match('/')))
    );
    return;
  }

  // Stale-while-revalidate for everything else
  event.respondWith(
    caches.match(request).then(cached => {
      const fetchPromise = fetch(request)
        .then(response => {
          // Cache successful responses
          if (response && response.status === 200 && response.type === 'basic') {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached); // Fallback to cache if network fails

      // Return cached response immediately if available, else wait for network
      return cached || fetchPromise;
    })
  );
}); 