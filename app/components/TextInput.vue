<template>
  <input type="text" name="" @input="() => {
    actionOnInput(model)
  }" v-model="model" >
</template>

<script lang="ts" setup>
const model = ref("")
defineProps<{
  name: string,
  actionOnInput: Function
}>()
</script>

<style>

</style>