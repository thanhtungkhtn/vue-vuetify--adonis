/* eslint-disable import/no-named-as-default */
// eslint-disable-next-line import/no-named-as-default-member
import router from '../router';
// eslint-disable-next-line import/no-cycle
import HTTP from '../http';

export default {
  namespaced: true,
  state: {
    registerName: 'examle',
    registerUsername: 'example',
    registerEmail: 'example@gmail.com',
    registerPassword: '123456',
    registerError: null,
    loginEmail: '',
    loginPassword: '',
    loginError: null,
    token: null,
  },
  actions: {
    logout({ commit }) {
      commit('setToken', null);
      router.push('/login');
    },
    register({ commit, state }) {
      commit('setRegisterError', null);
      return HTTP().post('/auth/signup', {
        name: state.registerName,
        username: state.registerUsername,
        email: state.registerEmail,
        password: state.registerPassword,
      })
        .then(({ data }) => {
          commit('setToken', data.token);
          // router.push({ name: 'Login' });
          router.push('/Login');
        })
        .catch(() => {
          commit('setRegisterError', 'An error has occured trying to create your account.');
        });
    },
    login({ commit, state }) {
      commit('setLoginError', null);
      return HTTP().post('/auth/login', {
        email: state.loginEmail,
        password: state.loginPassword,
      })
        .then(({ data }) => {
          commit('setToken', data.token);
          router.push('/');
        })
        .catch(() => {
          commit('setLoginError', 'An error has occured trying to login.');
        });
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setRegisterError(state, error) {
      state.registerError = error;
    },
    setRegisterName(state, name) {
      state.registerName = name;
    },
    setRegisterUsername(state, username) {
      state.registerUsername = username;
    },
    setRegisterEmail(state, email) {
      state.registerEmail = email;
    },
    setRegisterPassword(state, password) {
      state.registerPassword = password;
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    setLoginUsername(state, email) {
      state.loginEmail = email;
    },
    setLoginEmail(state, email) {
      state.loginEmail = email;
    },
    setLoginPassword(state, password) {
      state.loginPassword = password;
    },
  },
};
