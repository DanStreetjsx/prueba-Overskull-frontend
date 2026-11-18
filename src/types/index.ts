export interface Category {
  id: number
  name: string
  description: string | null
  products?: Product[]
}

export interface Product {
  id: number
  name: string
  description: string | null
  price: number
  stock: number
  category_id: number
  category?: Category
}

export type CategoryPayload = Pick<Category, 'name'> & { description?: string | null }
export type ProductPayload = Pick<Product, 'name' | 'price' | 'stock' | 'category_id'> & {
  description?: string | null
}

export interface Paginated<T> {
  data: T[]
  current_page: number
  last_page: number
  total: number
}

export interface ApiMessage<T = unknown> {
  success: boolean
  message: string
  data?: T
}
