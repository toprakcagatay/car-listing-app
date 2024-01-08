export const indexedDB = {
  create: ()=>{

  },
  db: null,
  open: ()=>{
    let request = indexedDB.open("carDB", 1);

    request.onupgradeneeded = function(event) {
      this.db = event.target.result;
      let objectStore = this.db.createObjectStore("CarStorage", { keyPath: "id" });
      objectStore.createIndex("carIdIndex", "carId", { unique: false });
    };

    request.onsuccess = function(event) {
      this.db = event.target.result;
      // Database opened successfully
    };

    request.onerror = function(event) {
      // Error occurred while opening the database
    };
  },
  addCar: (carData)=>{
    let transaction = db.transaction("CarStorage", "readwrite");
    let objectStore = transaction.objectStore("CarStorage");


    let addRequest = objectStore.add(carData);

    addRequest.onsuccess = function(event) {
      // Data added successfully
    };

    /*let getRequest = objectStore.get(1);

    getRequest.onsuccess = function(event) {
      let result = event.target.result;
      // Access the retrieved data
    };*/
  },
  getCar: ()=>{
    let transaction = db.transaction("CarStorage", "readonly");
    let objectStore = transaction.objectStore("CarStorage");

    let getRequest = objectStore.get(1);

    getRequest.onsuccess = function(event) {
      let result = event.target.result;
      // Access the retrieved data
    };
  },
  filterByIndex: (carId)=>{
    let transaction = db.transaction("CarStorage", "readonly");
    let objectStore = transaction.objectStore("CarStorage");
    let index = objectStore.index("carIdIndex");

    let getRequest = index.get(carId);

    getRequest.onsuccess = function(event) {
    let result = event.target.result;
    // Access the retrieved data
    };
  },
  getCarList: ()=>{
    let transaction = db.transaction("CarStorage", "readonly");
    let objectStore = transaction.objectStore("CarStorage");

    let cursorRequest = objectStore.openCursor();

    cursorRequest.onsuccess = function(event) {
      let cursor = event.target.result;
      if (cursor) {
        // Access the current record
        console.log(cursor.value);

        // Move to the next record
        cursor.continue();
      }
    };
  },
  removeCar: ()=>{
    let transaction = db.transaction("CarStorage", "readwrite");
    let objectStore = transaction.objectStore("CarStorage");

    let deleteRequest = objectStore.delete(1);

    deleteRequest.onsuccess = function(event) {
      // Record deleted successfully
    };
  },
  updateCar: (carData)=>{
    let transaction = db.transaction("CarStorage", "readwrite");
    let objectStore = transaction.objectStore("CarStorage");

    let updateRequest = objectStore.put(carData);

    updateRequest.onsuccess = function(event) {
      // Record updated successfully
    };
  }
};
