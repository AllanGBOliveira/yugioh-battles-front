import axios from 'axios'

const axiosConfig = axios.create({
  baseURL: '//localhost:3000', // Exemplo de URL base
  headers: {
    'Accept-Language': 'pt'
  }
})

export default axiosConfig
