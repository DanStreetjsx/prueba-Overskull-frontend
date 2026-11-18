<script setup lang="ts">
defineProps<{ message: string }>()
</script>

<template>
  <p v-if="message" class="alert">{{ message }}</p>
</template>

<style scoped>
.alert {
  background: #fdecea;
  color: #b71c1c;
  padding: 0.6rem 0.9rem;
  border-radius: 6px;
}
</style>
