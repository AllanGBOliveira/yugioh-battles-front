import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axiosConfig from '@/plugins/axiosConfig'

export const useAuthStore = defineStore('auth', () => {
  const token = ref('')
  const errors = ref({})
  const loading = ref({
    login: false
  })

  function login(email: string | null, password: string | null) {
    loading.value.login = true

    axiosConfig
      .post('/auth/login', {
        email,
        password
      })
      .then((res) => {
        // token válido
        token.value = 'Bearer ' + res.data.token
      })
      .catch(function (err) {
        // manipula erros da requisição
        errors.value = err.message
        console.error(err)
        return false
      })
      .finally(function () {
        loading.value.login = false
        return true
      })

    return true
  }

  function isAuthenticated() {
    return true
  }

  return {
    token,
    errors,
    loading,
    login,
    isAuthenticated
  }
})
