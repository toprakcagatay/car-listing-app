<script setup>
import Table from '../components/Table.vue'
function editCar(id){
  window.location.href = "/#/update/"+id;
}
</script>

<template>
  <Table @edit="editCar"/>
</template>

<style scoped>

</style>
