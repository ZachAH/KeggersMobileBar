// Background push handler for Firebase Cloud Messaging. This must live at
// the site root (not under /src) so its scope covers the whole origin.
// The config below is the same public, client-safe Firebase config used in
// src/lib/firebase.ts — Firebase web config is designed to be public;
// security is enforced by Firestore/Storage rules, not by hiding this.

importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: 'AIzaSyCxcO_BOrLOrYoYIDCopt6_KNlKfchTx0Y',
  authDomain: 'keggersmobilebar.firebaseapp.com',
  projectId: 'keggersmobilebar',
  storageBucket: 'keggersmobilebar.firebasestorage.app',
  messagingSenderId: '461884183940',
  appId: '1:461884183940:web:92206356a4a53675d079d1',
})

const messaging = firebase.messaging()

// Background messages show a system notification automatically when the
// payload has a `notification` field, but we handle it explicitly so we can
// control the click behavior (open the admin dashboard).
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title ?? 'New inquiry — Keggers Mobile Bar'
  const options = {
    body: payload.notification?.body ?? '',
    icon: '/favicon-180.png',
    badge: '/favicon-32.png',
    data: { url: payload.fcmOptions?.link ?? payload.data?.link ?? '/admin' },
  }
  self.registration.showNotification(title, options)
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification.data?.url ?? '/admin'
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(url) && 'focus' in client) return client.focus()
      }
      if (self.clients.openWindow) return self.clients.openWindow(url)
    }),
  )
})
