import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

import TodoList from '@/components/TodoList'
import CreateItem from '@/components/CreateItem'
import ViewItem from '@/components/ViewItem'

Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TodoList',
      component: TodoList
    },
    {
      path: '/create',
      name: 'CreateItem',
      component: CreateItem
    },
    {
      path: '/view',
      name: 'ViewItem',
      component: ViewItem
    }
  ]
})
