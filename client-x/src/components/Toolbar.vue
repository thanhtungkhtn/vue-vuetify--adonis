<template>
   <v-card
      flat
      tile
    >
  <v-toolbar color="pink" dark fixed>
    <v-toolbar-title class="mr-4">VUE APP</v-toolbar-title>
    <v-toolbar-items>
      <v-btn text to="/projects" v-if="isLoggedIn">
        <v-icon class="mr-2">playlist_add_check</v-icon>
        Projects
      </v-btn>
      <v-btn text to="/contacts" v-if="isLoggedIn">
        <v-icon class="mr-2">contact_phone</v-icon>
        Contacts
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn text to="/register" v-if="!isLoggedIn">
        <v-icon class="mr-2">account_box</v-icon>
        Register
      </v-btn>
      <v-btn text to="/login" v-if="!isLoggedIn">
        <v-icon class="mr-2">fingerprint</v-icon>
        Login
      </v-btn>
      <v-btn text v-if="isLoggedIn" @click="logout">
        <v-icon class="mr-2">exit_to_app</v-icon>
        Logout
      </v-btn>
      <v-btn text href="https://www.facebook.com/vn.thanhtung118">
        <v-icon class="mr-2">ondemand_video</v-icon>
        How this was Made
      </v-btn>
    </v-toolbar-items>
    <!-- <v-btn icon>
      <v-icon>delete</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>exit_to_app</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>fingerprint</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>account_box</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>list</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-exit</v-icon>
    </v-btn> -->
  </v-toolbar>
   </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('authentication', [
      'isLoggedIn',
    ]),
  },
  methods: {
    ...mapActions('authentication', [
      'logout',
    ]),
  },
};
</script>

<style>

</style>
