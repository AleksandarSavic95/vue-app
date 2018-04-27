import Vue from 'vue'
import Router from 'vue-router'

import TodoList from '@/components/TodoList'
import CreateItem from '@/components/CreateItem'
import ViewItem from '@/components/ViewItem'

Vue.use(Router)

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
