import { ref } from 'vue'
import { ApiError } from '../apiClient'

/** Estado de error compartido por los hooks: mensaje general y errores por campo. */
export function useRequest() {
  const error = ref('')
  const fieldErrors = ref<Record<string, string[]>>({})

  async function run(action: () => Promise<unknown>) {
    error.value = ''
    fieldErrors.value = {}
    try {
      await action()
      return true
    } catch (e) {
      if (e instanceof ApiError) {
        error.value = e.message
        fieldErrors.value = e.errors
      } else {
        error.value = 'No se pudo conectar con la API'
      }
      return false
    }
  }

  return { error, fieldErrors, run }
}
