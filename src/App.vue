<script setup>
  import { useCarsStore } from '@/stores/cars'
  const carsStore = useCarsStore();
  carsStore.fetchData();
  carsStore.fetchCarList();

</script>

<template>
  <header>
    Car Listing App
  </header>

  <main>
    <router-view v-if="carsStore.carList.length>0"></router-view>
    <template v-else>Loading...</template>
  </main>
</template>

<style scoped>

</style>
