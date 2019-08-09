// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VeeValidate from 'vee-validate'
// import Ws from '@adonisjs/websocket-client'

require('../node_modules/bootstrap/dist/css/bootstrap.css')

Vue.use(VeeValidate)
// Vue.use(Ws)

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://127.0.0.1:3333'

// const ws = Ws('ws://localhost:3333')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
