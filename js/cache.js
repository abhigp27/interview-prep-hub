// IndexedDB caching functionality
let db;

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(CONFIG.DB_NAME, CONFIG.DB_VERSION);
        request.onerror = (event) => reject('Error opening DB');
        request.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
        };
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore('topics', { keyPath: 'id' });
        };
    });
}

function getTopicFromCache(id) {
    return new Promise((resolve, reject) => {
        if (!db) {
            resolve(null);
            return;
        }
        const transaction = db.transaction(['topics']);
        const objectStore = transaction.objectStore('topics');
        const request = objectStore.get(id);
        request.onsuccess = (event) => resolve(event.target.result?.content);
        request.onerror = (event) => reject('Error fetching from cache');
    });
}

function saveTopicToCache(id, content) {
    if (!db) return;
    const transaction = db.transaction(['topics'], 'readwrite');
    const objectStore = transaction.objectStore('topics');
    objectStore.put({ id, content });
}
