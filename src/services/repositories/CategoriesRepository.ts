import { CategoriesApi } from '../api/CategoriesApi'
import type { CategoryPayload } from '@/types'

export const CategoriesRepository = {
  getAll: () => CategoriesApi.list(),
  create: (data: CategoryPayload) => CategoriesApi.create(data),
  update: (id: number, data: Partial<CategoryPayload>) => CategoriesApi.update(id, data),
  delete: (id: number) => CategoriesApi.remove(id),
}
