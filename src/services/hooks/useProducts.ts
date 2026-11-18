import { ref } from 'vue'
import { ProductsRepository } from '../repositories/ProductsRepository'
import { useRequest } from './useRequest'
import type { Product, ProductPayload } from '@/types'

export function useProducts() {
  const products = ref<Product[]>([])
  const page = ref(1)
  const lastPage = ref(1)
  const search = ref('')
  const loading = ref(false)
  const { error, fieldErrors, run } = useRequest()

  async function load(targetPage = page.value) {
    loading.value = true
    await run(async () => {
      const res = await ProductsRepository.getPage(targetPage, search.value)
      products.value = res.data
      page.value = res.current_page
      lastPage.value = res.last_page
    })
    loading.value = false
  }

  async function save(data: ProductPayload, id?: number) {
    const ok = await run(() =>
      id ? ProductsRepository.update(id, data) : ProductsRepository.create(data),
    )
    if (ok) await load()
    return ok
  }

  async function remove(id: number) {
    const ok = await run(() => ProductsRepository.delete(id))
    if (ok) await load()
    return ok
  }

  return { products, page, lastPage, search, loading, error, fieldErrors, load, save, remove }
}
