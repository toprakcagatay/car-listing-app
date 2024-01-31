<script setup>
  import CarDetails from '../components/CarDetails.vue'
  import {computed, ref} from "vue";
  import { useCarsStore } from '@/stores/cars'
  const carsStore = useCarsStore();
  const newCarId = String(parseInt(carsStore.getCarList[carsStore.getCarList.length-1].id) + 1);
  var car = ref({
    id: newCarId,
    carId: "Car"+newCarId,
    inStock: "false",
    hp: "",
    price: "0",
    color: ""
  });
  var saveEnabled = ref(false);



  function onCancel(){
    window.location.href = "/#/";
  }
  function onSave(){
    window.location.href = "/#/";
    carsStore.addCar(car.value);
  }
  function onChange(){
    if (car.value.hp < 100)
      car.value.hp = 100;
    if (car.value.hp > 550)
      car.value.hp = 550;

    saveEnabled.value = car.value.color != "";

  }
</script>

<template>
  <CarDetails v-bind:carDetails="car" @change="onChange"></CarDetails>
  <button @click="onCancel">Cancel</button>
  <button @click="onSave" :disabled="!saveEnabled">Save</button>
</template>
