<script setup>
import Table from '../components/Table.vue'
import { useCarsStore } from '@/stores/cars'

const carsStore = useCarsStore();
function editCar(id){
  window.location.href = "/#/update/"+id;
}
function removeCar(carId){
  carsStore.removeCar(carId);
  //carsStore.fetchCarList();
}
function newCar(){
  window.location.href = "/#/new/";
}
</script>

<template>
  <Table @edit="editCar" @remove="removeCar"/>
  <button @click="newCar">New Car</button>
</template>

<style scoped>

</style>
