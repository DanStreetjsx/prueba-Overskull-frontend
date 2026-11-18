import { ref } from 'vue'
import { CategoriesRepository } from '../repositories/CategoriesRepository'
import { useRequest } from './useRequest'
import type { Category, CategoryPayload } from '@/types'

export function useCategories() {
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const { error, fieldErrors, run } = useRequest()

  async function load() {
    loading.value = true
    await run(async () => {
      categories.value = await CategoriesRepository.getAll()
    })
    loading.value = false
  }

  async function save(data: CategoryPayload, id?: number) {
    const ok = await run(() =>
      id ? CategoriesRepository.update(id, data) : CategoriesRepository.create(data),
    )
    if (ok) await load()
    return ok
  }

  async function remove(id: number) {
    const ok = await run(() => CategoriesRepository.delete(id))
    if (ok) await load()
    return ok
  }

  return { categories, loading, error, fieldErrors, load, save, remove }
}
