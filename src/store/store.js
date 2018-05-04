import Vue from 'vue'
import Vuex from 'vuex'
import * as constants from '../constants'
import axiosApi, { setAuthHeader } from '../axiosApi'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    status: '',
    items: []
  },
  getters: {
    [constants.IS_LOGGED_IN]: state => !!state.token,
    status: state => state.status,
    [constants.ITEMS]: state => state.items
  },
  mutations: {
    [constants.AUTH_REQUEST] (state) {
      state.status = 'loading'
    },
    [constants.AUTH_SUCCESS] (state, token) {
      state.token = token
      state.status = 'success'
    },
    [constants.AUTH_LOGOUT] (state) {
      state.token = ''
      state.status = ''
    },
    [constants.AUTH_ERROR] (state) {
      state.status = 'error'
    }
  },
  actions: {
    [constants.ITEMS]: (context, payload) => {
      setTimeout(function () {
        context.commit('changePriorities', payload)
      }, 2000)
    },
    register () {
      console.log('registering...')
    },
    [constants.AUTH_REQUEST] ({state, commit, rootState}, creds) {
      commit(constants.AUTH_REQUEST) // show spinner

      return new Promise((resolve, reject) => {
        axiosApi.post('/api/auth/login', creds)
          .then(resp => {
            const token = resp.data.access_token
            localStorage.setItem('token', token)
            setAuthHeader(token)

            commit(constants.AUTH_SUCCESS, resp)
            resolve(resp)
          })
          .catch(err => {
            commit(constants.AUTH_ERROR, err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    [constants.AUTH_LOGOUT]: ({commit, dispatch}) => {
      return new Promise((resolve, reject) => {
        axiosApi.post('/api/auth/logout', null)
          .then(resp => {
            localStorage.removeItem('token')
            setAuthHeader('')
            commit(constants.AUTH_LOGOUT)

            resolve(resp)
          })
          .catch(err => {
            commit(constants.AUTH_ERROR, err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    }
  }
})
