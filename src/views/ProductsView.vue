<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AlertMessage from '@/components/AlertMessage.vue'
import DataTable from '@/components/DataTable.vue'
import EntityForm from '@/components/EntityForm.vue'
import LoadingState from '@/components/LoadingState.vue'
import { useProducts } from '@/services/hooks/useProducts'
import { useCategories } from '@/services/hooks/useCategories'
import type { Product } from '@/types'
import type { Field } from '@/types/form'

const { products, page, lastPage, search, loading, error, fieldErrors, load, save, remove } =
  useProducts()
const { categories, load: loadCategories } = useCategories()

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nombre' },
  { key: 'price', label: 'Precio' },
  { key: 'stock', label: 'Stock' },
  { key: 'category.name', label: 'Categoría' },
]

const fields = computed<Field[]>(() => [
  { key: 'name', label: 'Nombre' },
  { key: 'description', label: 'Descripción', type: 'textarea' },
  { key: 'price', label: 'Precio', type: 'number' },
  { key: 'stock', label: 'Stock', type: 'number' },
  {
    key: 'category_id',
    label: 'Categoría',
    type: 'select',
    options: categories.value.map((c) => ({ value: c.id, label: c.name })),
  },
])

const editing = ref<Product | null>(null)
const showForm = ref(false)

function openForm(product: Product | null = null) {
  editing.value = product
  showForm.value = true
}

async function onSubmit(data: Record<string, any>) {
  if (await save(data as any, editing.value?.id)) showForm.value = false
}

async function onRemove(product: Product) {
  if (confirm(`¿Eliminar "${product.name}"?`)) await remove(product.id)
}

onMounted(() => {
  load(1)
  loadCategories()
})
</script>

<template>
  <section>
    <header>
      <h1>Productos</h1>
      <button @click="openForm()">Nuevo producto</button>
    </header>
    <input v-model="search" placeholder="Buscar por nombre..." @keyup.enter="load(1)" />
    <AlertMessage :message="error" />
    <LoadingState :loading="loading" label="Productos" />
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
      :rows="products"
      :loading="loading"
      @edit="openForm"
      @remove="onRemove"
    />
    <footer>
      <button :disabled="page <= 1" @click="load(page - 1)">Anterior</button>
      <span>{{ page }} / {{ lastPage }}</span>
      <button :disabled="page >= lastPage" @click="load(page + 1)">Siguiente</button>
    </footer>
  </section>
</template>

<style scoped>
header,
footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
section {
  display: grid;
  gap: 1rem;
}
</style>
