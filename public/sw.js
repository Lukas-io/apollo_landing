const CACHE_NAME = '7daylovers-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png',
  '/logo-dark.png',
  '/logo-light.png',
  '/output.mp4',
  '/scene.gltf',
  '/scene.bin',
  '/textures/phone16pro_baseColor.png',
  '/textures/phone16pro_metallicRoughness.png',
  '/textures/phone16pro_normal.png'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.warn('Cache installation failed:', error);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip non-HTTP(S) requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }

        // For JavaScript files, ensure proper MIME type
        if (event.request.url.endsWith('.js') || event.request.url.endsWith('.mjs')) {
          return fetch(event.request)
            .then((fetchResponse) => {
              // Clone the response to modify headers
              const modifiedResponse = new Response(fetchResponse.body, {
                status: fetchResponse.status,
                statusText: fetchResponse.statusText,
                headers: {
                  ...Object.fromEntries(fetchResponse.headers.entries()),
                  'Content-Type': 'application/javascript'
                }
              });
              
              // Cache the modified response
              if (fetchResponse.ok) {
                const responseToCache = modifiedResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, responseToCache);
                });
              }
              
              return modifiedResponse;
            })
            .catch((error) => {
              console.warn('Fetch failed for JS file:', error);
              // Return a fallback response
              return new Response('console.warn("Module failed to load");', {
                headers: { 'Content-Type': 'application/javascript' }
              });
            });
        }

        return fetch(event.request);
      })
      .catch((error) => {
        console.warn('Fetch failed:', error);
        // Return a basic fallback for HTML requests
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
