import axios from 'axios'
import { apiUrl } from '../constant'

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    mode: 'no-cors',
    user_deviceid: localStorage.getItem('user_deviceid'),
    user_ipaddress: localStorage.getItem('ip'),
    user_geolocation: localStorage.getItem('user_geolocation'),
  },
})

const ApiService = {
  get: (endpoint, headers = {}) => api.get(endpoint, { headers }),
  post: (endpoint, data, headers = {}) => api.post(endpoint, data, { headers }),
  put: (endpoint, data, headers = {}) => api.put(endpoint, data, { headers }),
  patch: (endpoint, data, headers = {}) => api.patch(endpoint, data, { headers }),
  deleteWithData: (endpoint, data) => api.delete(endpoint, { data }),
  delete: (endpoint, headers = {}) => api.delete(endpoint, { headers }),
}

// Interceptor to handle 401 errors and show an alert
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear()
      window.location.reload()
    }
    return Promise.reject(error)
  }
)

export default ApiService
