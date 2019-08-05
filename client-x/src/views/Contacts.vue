<template>
  <v-container>
    <v-layout justify-space-around>
      <v-flex xs4>
        <CreateContact></CreateContact>
      </v-flex>

      <v-flex xs6>
        <Contacts></Contacts>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Contacts from '@/components/Contacts.vue';
import CreateContact from '@/components/CreateContact.vue';
// import Tasks from '@/components/Tasks.vue';
// eslint-disable-next-line import/no-cycle
import router from '../router';

export default {
  components: {
    Contacts,
    CreateContact,
  },
  mounted() {
    if (!this.isLoggedIn) {
      return router.push('/login');
    }
  },
  computed: {
    ...mapState('contacts', [
      'currentContact',
    ]),
    ...mapGetters('authentication', [
      'isLoggedIn',
    ]),
  },
};
</script>
