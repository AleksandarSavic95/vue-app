import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

import TodoList from '@/components/TodoList'
import CreateItem from '@/components/CreateItem'
import ViewItem from '@/components/ViewItem'
import AppLogin from '@/components/AppLogin'
import AppRegister from '@/components/AppRegister'

Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TodoList',
      component: TodoList,
      props: true
    },
    {
      path: '/create',
      name: 'CreateItem',
      component: CreateItem
    },
    {
      path: '/view-item/:id',
      name: 'ViewItem',
      component: ViewItem,
      props: true
    },
    {
      path: '/login',
      name: 'AppLogin',
      component: AppLogin
    },
    {
      path: '/register',
      name: 'AppRegister',
      component: AppRegister
    }
  ]
})
