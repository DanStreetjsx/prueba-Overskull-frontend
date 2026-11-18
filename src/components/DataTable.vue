<script setup lang="ts" generic="T extends { id: number }">
export interface Column {
  key: string
  label: string
}

defineProps<{
  columns: Column[]
  rows: T[]
  loading?: boolean
}>()

defineEmits<{ edit: [row: T]; remove: [row: T] }>()

function cell(row: T, key: string): unknown {
  const value = key.split('.').reduce<any>((acc, k) => acc?.[k], row)
  return value ?? '-'
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="c in columns" :key="c.key">{{ c.label }}</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!rows.length && !loading">
        <td :colspan="columns.length + 1">Sin registros</td>
      </tr>
      <template v-else>
        <tr v-for="row in rows" :key="row.id">
          <td v-for="c in columns" :key="c.key">{{ cell(row, c.key) }}</td>
          <td class="actions">
            <button @click="$emit('edit', row)">Editar</button>
            <button class="danger" @click="$emit('remove', row)">Eliminar</button>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
  text-align: left;
}
.actions {
  display: flex;
  gap: 0.4rem;
}
.danger {
  color: #b71c1c;
}
</style>
