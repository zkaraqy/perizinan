<template>
  <div class="mb-3">
    <label class="form-label">{{ props.label }}</label>
    <input v-model="model" :type="props.type ?? 'text'" class="form-control" :class="{ 'is-invalid': props.invalidFeedback }"
      />
    <div class="invalid-feedback"> 
      {{ props.invalidFeedback }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  label: string;
  invalidFeedback?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'date'; 
}>()
const model = defineModel()
</script>

<style></style>