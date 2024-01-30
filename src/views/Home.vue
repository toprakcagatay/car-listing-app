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
</script>

<template>
  <Table @edit="editCar" @remove="removeCar"/>
</template>

<style scoped>

</style>
