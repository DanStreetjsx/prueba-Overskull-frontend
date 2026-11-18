export interface Field {
  key: string
  label: string
  type?: 'text' | 'number' | 'textarea' | 'select'
  options?: { value: number | string; label: string }[]
}
