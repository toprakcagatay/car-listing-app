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
        let carStore = carDB.db.createObjectStore("CarStorage", { keyPath: "id" });
        //carStore.createIndex("carIdIndex", "carId", { unique: false });
        let priceStore = carDB.db.createObjectStore("PriceStorage", { keyPath: "name" });
        //priceStore.createIndex("priceIdIndex", "id", { unique: false });
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

    var newCar = {
      id: carData.id,
      carId: carData.carId,
      inStock: carData.inStock,
      hp: carData.hp,
      price: carData.price,
      color: carData.color
    };
    let addRequest = objectStore.add(newCar);

    addRequest.onsuccess = function(event) {
      // Data added successfully
    };

    /*let getRequest = objectStore.get(1);

    getRequest.onsuccess = function(event) {
      let result = event.target.result;
      // Access the retrieved data
    };*/
  },
  carListCount: async () =>{
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
      transaction.oncomplete = () => {
        resolve(carList);
        //carDB.db.close();
      };
    });

  },
  getPriceList: async ()=>{
    return new Promise((resolve, reject)=>{
      let transaction = carDB.db.transaction("PriceStorage", "readwrite");
      let objectStore = transaction.objectStore("PriceStorage");
      let cursorRequest = objectStore.openCursor();
      var priceList = [];
      cursorRequest.onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor) {
          // Access the current record
          //console.log(cursor.value);
          priceList.push(cursor.value);
          // Move to the next record
          cursor.continue();
        }

      };
      transaction.oncomplete = () => {
        resolve(priceList);
        //carDB.db.close();
      };
    });

  },
  removeCar: (carId)=>{
    console.log("remove car", carId);
    let transaction = carDB.db.transaction("CarStorage", "readwrite");
    let objectStore = transaction.objectStore("CarStorage");

    let deleteRequest = objectStore.delete(carId);

    /*deleteRequest.onsuccess = function(event) {
      // Record deleted successfully
    };*/
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
