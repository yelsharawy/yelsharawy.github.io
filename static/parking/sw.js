
const messageAll = async (msg) => {
    console.log(`attempting to send message: ${msg}`);
    const clientList = await clients.matchAll({includeUncontrolled: true, type: "all"});
    console.log(clientList);
    for (const client of clientList) {
        console.log(`sent message to ${client}`);
        client.postMessage(msg);
    }
};
console.log("Hello World!");

messageAll("Hello World!");
self.registration.showNotification("Notification from service worker", { body: "success!" });
messageAll("Sent notification");

self.addEventListener('install', event => {
    event.waitUntil(messageAll("install"));
});

self.addEventListener('fetch', event => {
    event.waitUntil(messageAll("fetch"))
    // event.respondWith(
    //     caches.match(event.request).then(response => {
    //         return response || fetch(event.request);
    //     })
    // );
});

self.addEventListener("activate", event => {
    event.waitUntil(messageAll("activate"));
});
