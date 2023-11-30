<script setup>
import { useCurrencyInput } from 'vue-currency-input'
const props = defineProps({modelValue: Number, options: Object});
const { inputRef } = useCurrencyInput(props.options)


</script>
<template>
  <input
    ref="inputRef"
    type="text"
  />
</template>
