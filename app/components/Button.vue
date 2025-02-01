<!-- Button.vue -->
<template>
  <button @click="() => action()" :class="className">{{ name }}</button>
</template>

<script lang="ts" setup>
defineProps<{
  name: string,
  className: string,
  action: Function
}>();

</script>
