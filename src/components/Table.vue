<script setup>
import { useCarsStore } from '@/stores/cars'
const carsStore = useCarsStore();
const emit = defineEmits(['edit','remove'])


const formatter = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'})

function edit(id){
  emit("edit", id);
}
function remove(id){
  emit("remove", id);
}

</script>

<template>
  <table>
    <thead>
      <tr>
        <td>ID</td>
        <td>CARID</td>
        <td>INSTOCK</td>
        <td>HP</td>
        <td>PRICE</td>
        <td>COLOR</td>
        <td>EDIT</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="car in carsStore.getCarList">
        <td>{{car.id}}</td>
        <td>{{car.carId}}</td>
        <td>{{car.inStock}}</td>
        <td>{{car.hp}}</td>
        <td>{{formatter.format(car.price)}}</td>
        <td>{{car.color}}</td>
        <td><button @click="edit(car.id)">Edit</button></td>
        <td><button @click="remove(car.id)">Remove</button></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>
