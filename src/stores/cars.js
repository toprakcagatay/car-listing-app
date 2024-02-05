import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";
import {carDB} from "../carDB.js";

export const useCarsStore = defineStore('cars', {
  state: ()=>({
    colorList: ["red", "blue", "green"],
    carList: [],
    priceList: []
  }),
  getters: {
    getCarList: (state)=>{
      return state.carList;
    },
    getPriceList: (state)=>{
      return state.priceList;
    },
    getCarById: (state)=>{
      return (id) => state.getCarList.find((car)=> car.id==id);
    },
    getPriceById: (state)=>{
      return (id) => state.getPriceList.find((price)=> price.id==id);
    },
    getColorList: (state)=>{
      return state.colorList;
    }
  },
  actions: {
    updateCar: async function (updateCar){
      var car = this.getCarById(updateCar.id);
      car.inStock = updateCar.inStock;
      car.hp = updateCar.hp;
      car.price = updateCar.price;
      car.color = updateCar.color;
      //var crr = await carDB.getCar(updateCar.id);

      //console.log(crr);

      await carDB.updateCar(car);

    },
    removeCar: async function(carId){
      await carDB.removeCar(carId);

      this.carList = this.carList.filter(function(item) {
          return item.id !== carId
      })
    },
    addCar: async function(car){
      await carDB.addCar(car);
      this.carList.push(car);
    },
    fetchData: async function(){
      try{
        var updatedResult = await axios.get(
          "/data/updated.json"
        );
        //console.log(updatedResult);
        var updatedLocal = JSON.parse(localStorage.getItem("updated"));
        if (updatedLocal==null) {
            localStorage.setItem("updated", JSON.stringify(updatedResult.data))
        }

        for(var index in updatedResult.data) {
          let lastUpdated = Date.parse(updatedResult.data[index].lastUpdated)

          if (lastUpdated > updatedLocal.find((item)=>{
            return updatedResult.data[index].name == item.name;
          }).lastUpdated)
            localStorage.setItem("updated", JSON.stringify(updatedResult.data))
        };
      } catch(error){
        console.error(error);
      }

    },
    fetchPriceList: async function(){
      if (force || await carDB.carListCount()==0) {
        try{
          var result = await axios.get(
            "/data/car-list.json"
          );
          if (!Array.isArray(result.data)) throw "corrupted data";
          var filteredData = result.data.filter((item)=>{
            return item.id && /^-?\d+$/.test(item.id) // is integer
            && item.price && /^-?\d+(\.\d+)?$/.test(item.price) // is decimal
          });
          if (filteredData.length == 0) throw "No priceStore data";

          this.priceList = filteredData;
        } catch(error){
          alert(error);
          console.log(error);
        }
      } else {
        carDB.getPriceList().then((priceList)=>{
          this.priceList = priceList;
        });
      }
    },
    fetchCarList: async function(force){
      await carDB.open();
      if (force || await carDB.carListCount()==0) {
        try {
          var result = await axios.get(
            "/data/car-list.json"
          );
          if (!Array.isArray(result.data)) throw "corrupted data";

          var filteredData = result.data.filter((item)=>{
            return item.id && /^-?\d+$/.test(item.id) // is integer
            && item.carId && item.carId.length>3
            && item.inStock && (item.inStock == "true" || item.inStock == "false")
            && item.hp && /^-?\d+$/.test(item.hp) && parseInt(item.hp)>=100 && parseInt(item.hp)<=550
            //&& item.price && /^-?\d+(\.\d+)?$/.test(item.price) // is decimal
            && item.color && this.colorList.includes(item.color);
          });
          if (filteredData.length == 0) throw "No car data";

          filteredData.forEach((item, i) => {
            carDB.addCar(item);
          });
          this.carList = filteredData;
        } catch (error) {
          alert(error);
          console.log(error);
        }
      } else {
        //this.carList =
        carDB.getCarList().then((carList)=>{
          this.carList = carList;
        });
      }

    }

  }

})
