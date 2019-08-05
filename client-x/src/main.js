/* eslint-disable import/no-named-as-default */
import Vue from 'vue';
import 'vuetify/dist/vuetify.min.css';
import { sync } from 'vuex-router-sync';
// import Vuetify from 'vuetify';
import axios from 'axios';
// import VeeValidate from 'vee-validate';
import Vuelidate from 'vuelidate';
import App from './App.vue';
// eslint-disable-next-line import/no-named-as-default-member
import router from './router';
import store from './store/index';
import vuetify from './plugins/vuetify';
import Panel from './components/Panel.vue';

// require('../node_modules/bootstrap/dist/css/bootstrap.css');

Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://127.0.0.1:3333';

Vue.use(vuetify);
// Vue.use(VeeValidate);
Vue.use(Vuelidate);

sync(store, router);

Vue.component('Panel', Panel);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
