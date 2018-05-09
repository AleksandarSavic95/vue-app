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
      return state.items.find(item => item.id === Number(id))
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
    [constants.CREATE_ITEM] (state, newItem) {
      state.items.push(newItem)
      state.status = ''
    },
    [constants.UPDATE_ITEM] (state, item) {
      var i = state.items.findIndex(o => o.id === item.id)
      if (state.items[i]) {
        state.items.splice(i, 1, item)
      } else { // if items were empty, i.e. page was refreshed
        state.items = [item]
      }
      state.status = ''
    },
    [constants.DELETE_ITEM] (state, itemId) {
      var i = state.items.findIndex(o => o.id === itemId)
      state.items.splice(1, i)
      state.status = '' // no need, since we will navigate to List component
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
          commit(constants.UPDATE_ITEM, item)
        })
        .catch(err => {
          console.log('error ', err)
        })
    },
    [constants.CREATE_ITEM]: ({state, commit}, newItem) => {
      commit(constants.START_REQUEST)

      return apiService.createItem(newItem)
        .then(resp => {
          commit(constants.CREATE_ITEM, resp.data)
        })
        .catch(err => {
          console.log('error ', err)
        })
    },
    [constants.UPDATE_ITEM]: ({state, commit}, updatedItem) => {
      commit(constants.START_REQUEST)

      return apiService.updateItem(updatedItem)
        .then(resp => {
          commit(constants.UPDATE_ITEM, resp.data)
        })
        .catch(err => {
          console.log('error ', err)
        })
    },
    [constants.DELETE_ITEM]: ({state, commit}, itemId) => {
      commit(constants.START_REQUEST)

      return apiService.deleteItem(itemId)
        .then(resp => {
          commit(constants.DELETE_ITEM, itemId)
        })
        .catch(err => {
          console.log('error ', err)
        })
    },
    register () {
    },
    [constants.AUTH_REQUEST] ({state, commit, rootState}, creds) {
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
