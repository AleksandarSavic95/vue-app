import axios from 'axios'

const axiosApi = axios.create({
  baseURL: 'http://localhost:8000/'
})

// load/keep the token in new tabs and on refresh
export const setAuthHeader = (token) => {
  axiosApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// Set the initial header from storage
let token = localStorage.getItem('token') || ''
if (token) {
  setAuthHeader(localStorage.getItem('token'))
}

export default axiosApi
