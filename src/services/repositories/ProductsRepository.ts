import { ProductsApi } from '../api/ProductsApi'
import type { ProductPayload } from '@/types'

export const ProductsRepository = {
  getPage: (page = 1, search = '') => ProductsApi.list(page, search),
  create: (data: ProductPayload) => ProductsApi.create(data),
  update: (id: number, data: Partial<ProductPayload>) => ProductsApi.update(id, data),
  delete: (id: number) => ProductsApi.remove(id),
}
