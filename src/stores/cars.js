import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const useCarsStore = defineStore('cars', {
  state: ()=>({
    colorList: ["red", "blue", "green"],
    carList: []
  }),
  getters: {
    getCarList: (state)=>{
      return state.carList;
    },
    getCarById: (state)=>{
      return (id) => state.getCarList.find((car)=> car.id==id);
    },
    getColorList: (state)=>{
      return state.colorList;
    }
  },
  actions: {
    updateCar: function (updatedCar){
      var car = this.getCarById(updatedCar.id);
      car.inStock = updatedCar.inStock;
      car.hp = updatedCar.hp;
      car.price = updatedCar.price;
      car.color = updatedCar.color;
    },
    fetchCarList: async function(){
      try {
        var result = await axios.get(
          "/data/tableData.json"
        );
        if (!Array.isArray(result.data)) throw "corrupted data";

        var filteredData = result.data.filter((item)=>{
          return item.id && /^-?\d+$/.test(item.id) // is integer
          && item.carId && item.carId.length>3
          && item.inStock && (item.inStock == "true" || item.inStock == "false")
          && item.hp && /^-?\d+$/.test(item.hp) && parseInt(item.hp)>=100 && parseInt(item.hp)<=550
          && item.price && /^-?\d+(\.\d+)?$/.test(item.price) // is decimal
          && item.color && this.colorList.includes(item.color);
        });
        if (filteredData.length == 0) throw "No data";
        this.carList = filteredData;

      } catch (error) {
        alert(error);
        console.log(error);
      }
    }

  }

})
