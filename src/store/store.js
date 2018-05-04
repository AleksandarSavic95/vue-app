import Vue from 'vue'
import Vuex from 'vuex'
import * as constants from '../constants'
import apiService from '../services/api.service'

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
    },
    [constants.AUTH_REQUEST] ({state, commit, rootState}, creds) {
      commit(constants.AUTH_REQUEST) // show spinner

      return apiService.login(creds)
        .then(resp => {
          const token = resp.data.access_token
          localStorage.setItem('token', token)
          apiService.setAuthHeader(token)

          commit(constants.AUTH_SUCCESS, resp)
        })
        .catch(err => {
          localStorage.removeItem('token')
          apiService.setAuthHeader()
          commit(constants.AUTH_ERROR, err)
        })
    },
    [constants.AUTH_LOGOUT]: ({commit, dispatch}) => {
      return apiService.logout()
        .then(resp => {
          localStorage.removeItem('token')
          apiService.setAuthHeader()
          commit(constants.AUTH_LOGOUT)
        })
        .catch(err => {
          localStorage.removeItem('token')
          commit(constants.AUTH_ERROR, err)
        })
    }
  }
})
