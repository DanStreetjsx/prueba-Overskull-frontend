<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { Field } from '@/types/form'

const props = defineProps<{
  fields: Field[]
  initial?: Record<string, any> | null
  errors?: Record<string, string[]>
}>()

const emit = defineEmits<{ submit: [data: Record<string, any>]; cancel: [] }>()

const form = reactive<Record<string, any>>({})

watch(
  () => props.initial,
  (value) => {
    for (const f of props.fields) form[f.key] = value?.[f.key] ?? ''
  },
  { immediate: true },
)

function onSubmit() {
  const data: Record<string, any> = {}
  for (const f of props.fields) {
    const v = form[f.key]
    data[f.key] = f.type === 'number' || f.type === 'select' ? (v === '' ? null : Number(v)) : v
  }
  emit('submit', data)
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <label v-for="f in fields" :key="f.key">
      {{ f.label }}
      <textarea v-if="f.type === 'textarea'" v-model="form[f.key]" />
      <select v-else-if="f.type === 'select'" v-model="form[f.key]">
        <option value="">Seleccione...</option>
        <option v-for="o in f.options" :key="o.value" :value="o.value">{{ o.label }}</option>
      </select>
      <input v-else v-model="form[f.key]" :type="f.type ?? 'text'" step="any" />
      <small v-if="errors?.[f.key]" class="error">{{ errors[f.key]!.join(', ') }}</small>
    </label>
    <div class="buttons">
      <button type="submit">Guardar</button>
      <button type="button" @click="$emit('cancel')">Cancelar</button>
    </div>
  </form>
</template>

<style scoped>
form {
  display: grid;
  gap: 0.8rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
label {
  display: grid;
  gap: 0.25rem;
}
.buttons {
  display: flex;
  gap: 0.5rem;
}
.error {
  color: #b71c1c;
}
</style>
