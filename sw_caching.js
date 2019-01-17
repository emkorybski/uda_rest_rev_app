/**
 * script created with help of articles from https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
 * and https://developers.google.com/web/ilt/pwa/lab-caching-files-with-service-worker
 */

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('default-app-cache').then(function(cache) {
            return cache.addAll(
                [
                    '/css/styles.css',
                    '/data/restaurants.json',
                    '/js/dbhelper.js',
                    '/js/main.js',
                    '/js/restaurant_info.js',
                    '/index.html',
                    '/restaurant.html',
                    '/img/1.jpg',
                    '/img/2.jpg',
                    '/img/3.jpg',
                    '/img/4.jpg',
                    '/img/5.jpg',
                    '/img/6.jpg',
                    '/img/7.jpg',
                    '/img/8.jpg',
                    '/img/9.jpg',
                    '/img/10.jpg'
                ]
            );
        })
    );
});

self.addEventListener('activate', function(event) {

    var cacheName = 'default-app-cache';
  
    event.waitUntil(
      caches.keys().then(function(cacheName) {
        return Promise.all();
      })
    );
  });
  

/*
* TODO: update create new cache and delete old one with each page load
* */

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
  
          return fetch(event.request).then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              // clone the response
              var responseToCache = response.clone();
  
              caches.open('default-app-cache')
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            }
          );
        })
      );
  });
  