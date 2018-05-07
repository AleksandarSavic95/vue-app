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
    [constants.STATUS]: state => state.status,
    [constants.GET_ITEMS]: state => state.items,
    [constants.GET_ITEM]: state => (id) => {
      console.log('getter GET_ITEM says:\n items: ')
      console.log(state.items)
      var found = state.items.find(item => item.id === id)
      console.log('found, id')
      console.log(found, id)
      return found
    }
  },
  mutations: {
    [constants.START_REQUEST] (state) {
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
    },
    [constants.GET_ITEMS] (state, items) {
      state.items = items
      state.status = ''
    },
    [constants.UPDATE_ITEM] (state, item) {
      var i = state.items.findIndex(o => o.id === item.id)
      console.log('looking for item ')
      console.log(item)
      console.log('in items:')
      console.log(state.items)
      console.log('index: ' + i + ' bool(state.items[i]) ' + !!state.items[i])
      if (state.items[i]) {
        state.items[i] = item
      } else { // if `items` wasn't filled
        state.items.push(item)
      }
      state.status = ''
      console.log('update_item done!. items:')
      console.log(state.items)
    }
  },
  actions: {
    [constants.GET_ITEMS]: ({state, commit}) => {
      commit(constants.START_REQUEST) // show spinner

      return apiService.getItems()
        .then(resp => {
          const items = resp.data
          commit(constants.GET_ITEMS, items)
        })
        .catch(err => {
          commit(constants.AUTH_ERROR, err)
        })
    },
    [constants.GET_ITEM]: ({state, commit}, id) => {
      commit(constants.START_REQUEST) // show spinner

      return apiService.getItem(id)
        .then(resp => {
          const item = resp.data
          console.log(item)
          commit(constants.UPDATE_ITEM, item)
        })
        .catch(err => {
          console.log('error ', err)
        })
    },
    register () {
    },
    [constants.START_REQUEST] ({state, commit, rootState}, creds) {
      commit(constants.START_REQUEST) // show spinner

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
