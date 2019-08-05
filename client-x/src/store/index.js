import createPersistedState from 'vuex-persistedstate';
// eslint-disable-next-line import/no-cycle
import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-cycle
import authentication from './authentication';
// eslint-disable-next-line import/no-cycle
import contacts from './contacts';
// eslint-disable-next-line import/no-cycle
import projects from './projects';
// eslint-disable-next-line import/no-cycle
import tasks from './tasks';


Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    baseUrl: '/api',
  },
  modules: {
    authentication,
    contacts,
    projects,
    tasks,
  },
  mutations: {

  },
  actions: {

  },
  plugins: [
    createPersistedState(),
  ],
});
