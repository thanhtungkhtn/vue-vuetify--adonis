// import router from '../router';
import Vue from 'vue';
// eslint-disable-next-line import/no-cycle
import HTTP from '../http';

export default {
  namespaced: true,
  state: {
    contacts: [],
    currentContact: null,
    newContactName: null,
    newContactEmail: null,
    newContactTitle: null,
    newContactTel: null,
    newContactError: null,
  },
  actions: {
    saveContact({ commit }, contact) {
      return HTTP().patch(`contacts/${contact.id}`, contact)
        .then(() => {
          commit('unsetEditMode', contact);
        });
    },
    deleteContact({ commit }, contact) {
      return HTTP().delete(`contacts/${contact.id}`)
        .then(() => {
          commit('removeContact', contact);
        });
    },
    fetchContacts({ commit }) {
      return HTTP().get('/contacts')
        .then(({ data }) => {
          commit('setContacts', data);
        });
    },
    createContact({ commit, state }) {
      return HTTP().post('/contacts', {
        name: state.newContactName,
        email: state.newContactEmail,
        title: state.newContactTitle,
        tel: state.newContactTel,
      })
        .then(({ data }) => {
          commit('appendContact', data);
          commit('setNewContactName', null);
          commit('setNewContactEmail', null);
          commit('setNewContactTitle', null);
          commit('setNewContactTel', null);
        });
    },
  },
  getters: {
  },
  mutations: {
    setCurrentContact(state, contact) {
      state.currentContact = contact;
    },
    setNewContactName(state, name) {
      state.newContactName = name;
    },
    setNewContactEmail(state, email) {
      state.newContactEmail = email;
    },
    setNewContactTitle(state, title) {
      state.newContactTitle = title;
    },
    setNewContactTel(state, tel) {
      state.newContactTel = tel;
    },
    appendContact(state, contact) {
      state.contacts.push(contact);
    },
    setContacts(state, contacts) {
      state.contacts = contacts;
    },
    setContactName(state, { contact, name }) {
      contact.name = name;
    },
    setContactEmail(state, { contact, email }) {
      contact.email = email;
    },
    setContactTitle(state, { contact, title }) {
      contact.title = title;
    },
    setContactTel(state, { contact, tel }) {
      contact.tel = tel;
    },
    setEditMode(state, contact) {
      Vue.set(contact, 'isEditMode', true);
    },
    unsetEditMode(state, contact) {
      Vue.set(contact, 'isEditMode', false);
    },
    removeContact(state, contact) {
      state.contacts.splice(state.contacts.indexOf(contact), 1);
    },
  },
};
