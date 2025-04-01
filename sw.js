// Basic Service Worker

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  // Optional: Pre-cache assets here if needed for offline use
  // event.waitUntil(
  //   caches.open('snake-game-cache-v1').then((cache) => {
  //     return cache.addAll([
  //       'snake-game.html',
  //       // Add other essential assets like CSS, JS, images if separate
  //       'snake-pixel-art.png'
  //     ]);
  //   })
  // );
  self.skipWaiting(); // Activate worker immediately
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  // Optional: Clean up old caches here
  event.waitUntil(clients.claim()); // Take control of pages immediately
});

self.addEventListener('fetch', (event) => {
  console.log('Service Worker: Fetching', event.request.url);
  // Optional: Implement caching strategy (e.g., cache-first, network-first)
  // event.respondWith(
  //   caches.match(event.request).then((response) => {
  //     return response || fetch(event.request);
  //   })
  // );
}); 