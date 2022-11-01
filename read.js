document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  if (!("indexedDB" in window)) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }

  var request = indexedDB.open("mydb");

  request.onerror = function () {
    console.log("Error creating/accessing IndexedDB database");
  };

  request.onsuccess = function () {
    console.log("Success creating/accessing IndexedDB database");

    var db = request.result;
    var tx = db.transaction("users", "readwrite");
    var store = tx.objectStore("users");

    var get = store.get(1);

    get.onsuccess = function () {
      console.log(get.result);
      document.getElementById("value").innerHTML = get.result.value;
    };

    // close the db when the transaction is done
    tx.oncomplete = function () {
      db.close();
    };
  };
});
