document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  if (!("indexedDB" in window)) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }

  const value = new URLSearchParams(window.location.search).get("value");

  var request = indexedDB.open("mydb");

  request.onerror = function () {
    console.log("Error creating/accessing IndexedDB database");
  };

  request.onsuccess = function () {
    console.log("Success creating/accessing IndexedDB database");

    var db = request.result;
    var tx = db.transaction("users", "readwrite");
    var store = tx.objectStore("users");

    store.put({ id: 1, value: value });

    // close the db when the transaction is done
    tx.oncomplete = function () {
      db.close();
    };
  };

  request.onupgradeneeded = function () {
    var db = request.result;
    db.createObjectStore("users", { keyPath: "id" });
  };
});
