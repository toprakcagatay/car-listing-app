<script setup>
  import { useCarsStore } from '@/stores/cars'
  const carsStore = useCarsStore();
  const props = defineProps({carDetails: Object});

  const car = props.carDetails;
  const emit = defineEmits(['cancel','save']);

  function cancel(){
    emit("cancel");
  }
  function save(){
    emit("save");
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
