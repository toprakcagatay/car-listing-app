<script setup>
import CurrencyInput from '../components/CurrencyInput.vue'
import { useCarsStore } from '@/stores/cars'
import { useRoute } from 'vue-router'
import {computed, ref} from "vue";
import {onMounted} from "vue";
const route = useRoute()

const carsStore = useCarsStore();
var storedCar = carsStore.getCarById(route.params.id);
var car = ref({
  id: storedCar.id,
  carId: storedCar.carId,
  inStock: storedCar.inStock,
  hp: storedCar.hp,
  price: parseInt(storedCar.price),
  color: storedCar.color
});




var isUpdated = ref(false);
function onChange(){
  if (!(car.value.hp >= 100 && car.value.hp <= 550))
    car.value.hp = storedCar.hp;

  isUpdated.value = car.value.id != storedCar.id ||
  car.value.carId != storedCar.carId ||
  car.value.inStock != storedCar.inStock ||
  car.value.hp != storedCar.hp ||
  car.value.price != storedCar.price ||
  car.value.color != storedCar.color;
}
function cancel(){
  window.location.href = "/#/";
}
function save(){
  carsStore.updateCar({
    id: car.value.id,
    carId: car.value.carId,
    inStock: car.value.inStock,
    hp: car.value.hp,
    price: car.value.price,
    color: car.value.color
  });
  window.location.href = "/";
}
</script>

<template>
  <div>
    <div><label class="input-label">ID: </label><input v-model="car.id" readonly/></div>
    <div><label class="input-label">CARID: </label><input v-model="car.carId" readonly/></div>
    <div><label class="input-label">INSTOCK: </label><input type="checkbox" v-model="car.inStock" @change="onChange"/></div>
    <div><label class="input-label">HP: </label><input type="number" min="100" max="550" v-model="car.hp" @change="onChange"/></div>
    <div><label class="input-label">PRICE: </label><CurrencyInput v-model="car.price" @change="onChange" :options="{ currency: 'EUR' }"/></div>
    <div>
      <label class="input-label">COLOR:</label>
      <div class="radio-group">
        <div class="radio" v-for="color in carsStore.colorList">
          <input type="radio" :id="color" :value="color" v-model="car.color" @change="onChange"/>
          <label :for="color">{{color}}</label>
        </div>
      </div>

    </div>
  </div>
  <button @click="cancel">Cancel</button>
  <button @click="save" :disabled="!isUpdated">Save</button>
</template>

<style scoped>

</style>
