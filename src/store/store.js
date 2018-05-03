import Vue from 'vue'
import Vuex from 'vuex'
import { LOGIN, LOGIN_SUCCESS, LOGOUT } from '../constants'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    isLoggedIn: localStorage.getItem('token'),
    pending: false,
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
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    pending: state => {
      return state.pending
    }
  },
  mutations: {
    changePriorities: (state, payload) => {
      store.state.items.forEach(item => {
        item.priority = (item.priority + payload) % 3
      })
    },
    [LOGIN] (state) {
      state.pending = true
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true
      state.pending = false
    },
    [LOGOUT] (state) {
      state.isLoggedIn = false
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
    login ({
      state,
      commit,
      rootState
    }, creds) {
      console.log('login...', creds)
      commit(LOGIN) // show spinner
      return new Promise(resolve => {
        setTimeout(() => {
          localStorage.setItem('token', 'JWT')
          commit(LOGIN_SUCCESS)
          resolve()
        }, 1000)
      })
    },
    logout ({
      commit
    }) {
      localStorage.removeItem('token')
      commit(LOGOUT)
    }
  }
})
