export const carDB = {
  create: ()=>{

  },
  db: null,
  open: async ()=>{
    var that = this;
    return new Promise((resolve, reject) => {
      let request = indexedDB.open("carDB");

      request.onupgradeneeded = function(event) {
        carDB.db = event.target.result;
        let objectStore = carDB.db.createObjectStore("CarStorage", { keyPath: "id" });
        objectStore.createIndex("carIdIndex", "id", { unique: false });
      };

      request.onsuccess = function(event) {
        carDB.db = event.target.result;
        // Database opened successfully
        console.log("DB opened");
        resolve();
      };

      request.onerror = function(event) {
        // Error occurred while opening the database
        console.error("DB cannot open");
        reject();
      };
    })

  },
  addCar: (carData)=>{
    let transaction = carDB.db.transaction("CarStorage", "readwrite");
    transaction.oncomplete = function(){
      //carDB.db.close();
    }
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
  count: async () =>{
    return new Promise((resolve, reject)=>{
      const transaction = carDB.db.transaction("CarStorage", "readwrite");
      transaction.oncomplete = function(){
        //carDB.db.close();
      }
      const objectStore = transaction.objectStore("CarStorage");

      const countRequest = objectStore.count();

      countRequest.onsuccess = () => {
        console.log("count",countRequest.result);
        resolve(countRequest.result);
      };
      countRequest.onerror = function(event) {
        // Error occurred while opening the database
        console.error(event);
        reject();
      };
    });

  },
  getCar: async (id)=>{
    return new Promise((resolve, reject) => {
      let transaction = carDB.db.transaction("CarStorage", "readwrite");
      transaction.oncomplete = function(){
        //carDB.db.close();
      }
      let objectStore = transaction.objectStore("CarStorage");

      let getRequest = objectStore.get(id);

      getRequest.onsuccess = function() {
        let result = getRequest.result;
        // Access the retrieved data
        //console.log("result",getRequest);
        resolve(result);
      };
    })

  },
  filterByIndex: (carId)=>{
    let transaction = db.transaction("CarStorage", "readwrite");
    let objectStore = transaction.objectStore("CarStorage");
    let index = objectStore.index("carIdIndex");

    let getRequest = index.get(carId);

    getRequest.onsuccess = function(event) {
    let result = event.target.result;
    // Access the retrieved data
    };
  },
  getCarList: async ()=>{
    return new Promise((resolve, reject)=>{
      let transaction = carDB.db.transaction("CarStorage", "readwrite");
      let objectStore = transaction.objectStore("CarStorage");
      transaction.oncomplete = () => {
        resolve(carList);
        //carDB.db.close();
      };
      let cursorRequest = objectStore.openCursor();
      var carList = [];
      cursorRequest.onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor) {
          // Access the current record
          //console.log(cursor.value);
          carList.push(cursor.value);
          // Move to the next record
          cursor.continue();
        }

      };
    });

  },
  removeCar: ()=>{
    let transaction = db.transaction("CarStorage", "readwrite");
    let objectStore = transaction.objectStore("CarStorage");

    let deleteRequest = objectStore.delete(1);

    deleteRequest.onsuccess = function(event) {
      // Record deleted successfully
    };
  },
  updateCar: async (carData)=>{
    return new Promise((resolve, reject)=>{
      let transaction = carDB.db.transaction("CarStorage", "readwrite");
      transaction.oncomplete = function(){
        //carDB.db.close();
      }
      let objectStore = transaction.objectStore("CarStorage");

      let getRequest = objectStore.get(carData.id);
      console.log(getRequest);
      getRequest.onsuccess = () => {
        var car = {
          id: carData.id,
          carId: carData.carId,
          inStock: carData.inStock,
          hp: carData.hp,
          price: carData.price,
          color: carData.color
        }
        let updateRequest = objectStore.put(car);

        updateRequest.onsuccess = function(event) {
          // Record updated successfully
          resolve();
        };
      }

    });

  }
};
