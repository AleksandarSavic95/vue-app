import axios from 'axios'

class ApiService {
  constructor () {
    axios.defaults.baseURL = 'http://localhost:8000/api'
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
    return axios.post('/auth/login', credentials)
  }

  logout () {
    return axios.post('/auth/logout')
  }

  getItems () {
    return axios.get('/todoItems')
  }

  getItem (id) {
    return axios.get(`/todoItems/${id}`)
  }

  updateItem (updatedItem) {
    return axios.put(`/todoItems/${updatedItem.id}`, updatedItem)
  }

  deleteItem (itemId) {
    return axios.delete(`/todoItems/${itemId}`)
  }
}

const apiService = new ApiService()
export default apiService
