import axios from 'axios'

class ApiService {
  constructor () {
    axios.defaults.baseURL = 'http://localhost:8000/'
    // Set the initial header from storage
    let token = localStorage.getItem('token') || ''
    if (token) {
      this.setAuthHeader(localStorage.getItem('token'))
    }
  }

  // load/keep the token in new tabs and on refresh
  setAuthHeader (token = '') {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  // API methods
  login (credentials) {
    return axios.post('/api/auth/login', credentials)
  }

  logout () {
    return axios.post('/api/auth/logout')
  }

  getItems () {
    return axios.get('/api/todoItems')
  }

  getItem (id) {
    return axios.get(`/api/todoItems/${id}`)
  }

  updateItem (updatedItem) {
    return axios.put(`/api/todoItems/${updatedItem.id}`, updatedItem)
  }

  deleteItem (itemId) {
    return axios.delete(`/api/todoItems/${itemId}`)
  }
}

const apiService = new ApiService()
export default apiService
