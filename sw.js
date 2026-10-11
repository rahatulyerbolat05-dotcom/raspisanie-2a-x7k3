/* Минимальный service worker: нужен только затем, чтобы телефон мог показывать уведомления
   (в мобильных браузерах new Notification() запрещён, работает только registration.showNotification).
   Ничего не кэширует и не перехватывает запросы — приложение всегда берётся свежим. */
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener("notificationclick", function (e) {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (list) {
      for (var i = 0; i < list.length; i++) { if ("focus" in list[i]) return list[i].focus(); }
      return self.clients.openWindow(self.registration.scope);
    })
  );
});
