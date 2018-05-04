import Vue from 'vue'
import Vuex from 'vuex'
import * as constants from '../constants'
import axiosApi, { setAuthHeader } from '../axiosApi'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    status: '',
    items: [
      {
        id: 1,
        title: 'Get some milk',
        content: '2.8 / 3.2 milk fat',
        priority: 0
      },
      {
        id: 2,
        title: 'Go to work',
        content: 'again',
        priority: 1
      },
      {
        id: 3,
        title: 'Do whatever you want',
        content: 'as long as you can',
        priority: 2
      }
    ]
  },
  getters: {
    hardItems: state => {
      var hardItems = state.items.map(item => {
        return {
          id: item.id,
          title: 'Hard way to ' + item.title,
          content: item.content,
          priority: 2
        }
      })
      return hardItems
    },
    [constants.IS_LOGGED_IN]: state => !!state.token,
    status: state => state.status
  },
  mutations: {
    changePriorities: (state, payload) => {
      store.state.items.forEach(item => {
        item.priority = (item.priority + payload) % 3
      })
    },
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
    changePriorities: (context, payload) => {
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
