// fetch.js
import { ref, type Ref } from 'vue'
import axiosConfig from '@/plugins/axiosConfig'

declare interface optionsInterface {
  enabled?: Ref<boolean>
  params?: object
}

export function useAxios(url: string, options?: optionsInterface) {
  const data = ref()
  const error = ref<string | null>(null)
  const loading = ref(false)

  console.log(url)

  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((json) => (data.value = json))
  //     .catch((err) => (error.value = err))

  //   data.value = options?.enabled?.value ? get() : null

  console.log(url)

  async function get() {
    if (!options?.enabled?.value) return null

    loading.value = true
    try {
      const response = await axiosConfig.get(url, {
        params: options?.params
      })
      console.log(response)

      return response.data
    } catch (err) {
      return err.message
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, get }
}
