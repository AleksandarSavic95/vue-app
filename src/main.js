// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { store } from './store/store'

// // axios support
// import axiosApi from './axiosApi'
// Vue.prototype.$http = axiosApi

// // test requests with a base url
// Vue.prototype.$http({
//   url: '/test-axios',
//   method: 'GET'
// }).then(resp => console.log(resp))

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store: store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
