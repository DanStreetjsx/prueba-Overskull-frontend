import { apiClient } from '../apiClient'
import type { ApiMessage, Paginated, Product, ProductPayload } from '@/types'

export const ProductsApi = {
  list: (page = 1, search = '') =>
    apiClient.get<Paginated<Product>>(
      `/products?page=${page}${search ? `&search=${encodeURIComponent(search)}` : ''}`,
    ),
  create: (data: ProductPayload) => apiClient.post<ApiMessage<Product>>('/products', data),
  update: (id: number, data: Partial<ProductPayload>) =>
    apiClient.put<ApiMessage<Product>>(`/products/${id}`, data),
  remove: (id: number) => apiClient.delete<ApiMessage>(`/products/${id}`),
}
