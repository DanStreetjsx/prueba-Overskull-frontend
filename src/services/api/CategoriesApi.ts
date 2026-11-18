import { apiClient } from '../apiClient'
import type { ApiMessage, Category, CategoryPayload } from '@/types'

export const CategoriesApi = {
  list: () => apiClient.get<Category[]>('/categories'),
  create: (data: CategoryPayload) => apiClient.post<ApiMessage<Category>>('/categories', data),
  update: (id: number, data: Partial<CategoryPayload>) =>
    apiClient.put<ApiMessage<Category>>(`/categories/${id}`, data),
  remove: (id: number) => apiClient.delete<ApiMessage>(`/categories/${id}`),
}
