<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AlertMessage from '@/components/AlertMessage.vue'
import DataTable from '@/components/DataTable.vue'
import EntityForm from '@/components/EntityForm.vue'
import LoadingState from '@/components/LoadingState.vue'
import { useCategories } from '@/services/hooks/useCategories'
import type { Category } from '@/types'
import type { Field } from '@/types/form'

const { categories, loading, error, fieldErrors, load, save, remove } = useCategories()

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nombre' },
  { key: 'description', label: 'Descripción' },
]
const fields: Field[] = [
  { key: 'name', label: 'Nombre' },
  { key: 'description', label: 'Descripción', type: 'textarea' },
]

const editing = ref<Category | null>(null)
const showForm = ref(false)

function openForm(category: Category | null = null) {
  editing.value = category
  showForm.value = true
}

async function onSubmit(data: Record<string, any>) {
  if (await save(data as any, editing.value?.id)) showForm.value = false
}

async function onRemove(category: Category) {
  if (confirm(`¿Eliminar "${category.name}"?`)) await remove(category.id)
}

onMounted(load)
</script>

<template>
  <section>
    <header>
      <h1>Categorías</h1>
      <button @click="openForm()">Nueva categoría</button>
    </header>
    <AlertMessage :message="error" />
    <LoadingState :loading="loading" label="Categorías" />
    <EntityForm
      v-if="showForm"
      :fields="fields"
      :initial="editing"
      :errors="fieldErrors"
      @submit="onSubmit"
      @cancel="showForm = false"
    />
    <DataTable
      :columns="columns"
      :rows="categories"
      :loading="loading"
      @edit="openForm"
      @remove="onRemove"
    />
  </section>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
section {
  display: grid;
  gap: 1rem;
}
</style>
