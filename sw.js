const cacheName = "cachev2"; // Change value to force update

self.addEventListener("install", event => {
	// Kick out the old service worker
	self.skipWaiting();

	event.waitUntil(
		caches.open(cacheName).then(cache => {
			return cache.addAll([
				"/wedding-invite/",
				"/wedding-invite/android-chrome-192x192.png", // Favicon, Android Chrome M39+ with 4.0 screen density
				"/wedding-invite/android-chrome-512x512.png", // Favicon, Android Chrome M47+ Splash screen with 4.0 screen density
				"/wedding-invite/apple-touch-icon.png", // Favicon, Apple default
				"/wedding-invite/apple-touch-icon-60x60.png", // Apple iPhone, Non-retina with iOS7
				"/wedding-invite/apple-touch-icon-76x76.png", // Apple iPad, Non-retina with iOS7
				"/wedding-invite/apple-touch-icon-120x120.png", // Apple iPhone, Retina with iOS7
				"/wedding-invite/apple-touch-icon-152x152.png", // Apple iPad, Retina with iOS7
				"/wedding-invite/apple-touch-icon-180x180.png", // Apple iPhone 6 Plus with iOS8
				"/wedding-invite/browserconfig.xml", // IE11 icon configuration file
				"/wedding-invite/favicon.ico", // Favicon, IE and fallback for other browsers
				"/wedding-invite/favicon-16x16.png", // Favicon, default
				"/wedding-invite/favicon-32x32.png", // Favicon, Safari on Mac OS
				"/wedding-invite/index.html", // Main HTML file
				"/wedding-invite/img/logo.png", // Logo
				"/wedding-invite/img/hero-min.webp", // hero
				"/wedding-invite/js/scripts.min.js", // Main Javascript file
				"/wedding-invite/manifest.json", // Manifest file
				"/wedding-invite/maskable_icon.png", // Favicon, maskable https://web.dev/maskable-icon
				"/wedding-invite/mstile-150x150.png", // Favicon, Windows 8 / IE11
				"/wedding-invite/safari-pinned-tab.svg", // Favicon, Safari pinned tab
				"/wedding-invite/share.jpg", // Social media sharing
				"/wedding-invite/css/styles.min.css", // Main CSS file
			]);
		})
	);
});

self.addEventListener("activate", event => {
	// Delete any non-current cache
	event.waitUntil(
		caches.keys().then(keys => {
			Promise.all(
				keys.map(key => {
					if (![cacheName].includes(key)) {
						return caches.delete(key);
					}
				})
			)
		})
	);
});

// Offline-first, cache-first strategy
// Kick off two asynchronous requests, one to the cache and one to the network
// If there's a cached version available, use it, but fetch an update for next time.
// Gets data on screen as quickly as possible, then updates once the network has returned the latest data. 
self.addEventListener("fetch", event => {
	event.respondWith(
		caches.open(cacheName).then(cache => {
			return cache.match(event.request).then(response => {
				return response || fetch(event.request).then(networkResponse => {
					cache.put(event.request, networkResponse.clone());
					return networkResponse;
				});
			})
		})
	);
});
