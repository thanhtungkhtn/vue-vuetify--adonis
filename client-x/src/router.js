import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Projects from './views/Projects.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Contacts from './views/Contacts.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL, // base: 'http://127.0.0.1:3333',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      // eslint-disable-next-line
      /* eslint-disable */
      //component: () => import('./views/About.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects,
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
  ],
});
