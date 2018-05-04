import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    list: '\'list\' prop of \'data\' object',
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
    }
  },
  mutations: {
    changePriorities: (state, payload) => {
      store.state.items.forEach(item => {
        item.priority = (item.priority + payload) % 3
      })
    }
  },
  actions: {
    changePriorities: (context, payload) => {
      setTimeout(function () {
        context.commit('changePriorities', payload)
      }, 2000)
    }
  }
})
