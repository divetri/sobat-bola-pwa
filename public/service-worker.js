importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
workbox.precaching.precacheAndRoute([
  {url : '/',revision:'1'},
  {url : '/index.html',revision:'1'},
  {url : '/manifest.json',revision:'1'},
  {url : '/match.html',revision:'1'},
  {url : '/nav.html',revision:'1'},
  {url : '/push.js',revision:'1'},
  {url : '/service-worker.js',revision:'1'},
  {url : '/team.html',revision:'1'},
  {url : '/css/main.css',revision:'1'},
  {url : '/css/materialize.css',revision:'1'},
  {url : '/css/materialize.min.css',revision:'1'},
  {url : '/image/favicon.ico',revision:'1'},
  {url : '/image/github.png',revision:'1'},
  {url : '/image/icon-128.png',revision:'1'},
  {url : '/image/icon-512.png',revision:'1'},
  {url : '/image/instagram-new.png',revision:'1'},
  {url : '/image/twitter.png',revision:'1'},
  {url : '/js/api.js',revision:'1'},
  {url : '/js/db.js',revision:'1'},
  {url : '/js/idb.js',revision:'1'},
  {url : '/js/jquery.min.js',revision:'1'},
  {url : '/js/main.js',revision:'1'},
  {url : '/js/materialize.js',revision:'1'},
  {url : '/js/materialize.min.js',revision:'1'},
  {url : '/js/nav.js',revision:'1'},
  {url : '/js/sw-regis.js',revision:'1'},
  {url : '/js/view.js',revision:'1'},
  {url : '/pages/home.html',revision:'1'},
  {url : '/pages/jadwal.html',revision:'1'},
  {url : '/pages/klasemen.html',revision:'1'},
  {url : '/pages/kontak.html',revision:'1'},
  {url : '/pages/saved.html',revision:'1'},
  {url : '/pages/tentang.html',revision:'1'},
],
{
  // Ignore all URL parameters.
  ignoreUrlParametersMatching: [/.*/]
});
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
      cacheName: "images",
      plugins: [
          new workbox.expiration.Plugin({
              maxEntries: 200,
              maxAgeSeconds: 7 * 24 * 60 * 60,
          }),
      ],
  })
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);
workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-resources',
  })
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'images/icon-128.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});