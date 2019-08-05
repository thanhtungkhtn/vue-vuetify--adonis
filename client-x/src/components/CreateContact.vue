<template>
    <Panel title="Create Contacts">

      <v-text-field
        label="Name"
        placeholder="Name"
        :value="newContactName"
        @input="setNewContactName"
      ></v-text-field>

      <v-text-field
        label="Email"
        placeholder="Email"
        :value="newContactEmail"
        @input="setNewContactEmail"
      ></v-text-field>

      <v-text-field
        label="Title"
        placeholder="Title"
        :value="newContactTitle"
        @input="setNewContactTitle"
      ></v-text-field>

      <v-text-field
        label="Tel"
        placeholder="Tel"
        :value="newContactTel"
        @input="setNewContactTel"
      ></v-text-field>

      <v-btn
        @click="createContact"
        dark
        class="mt-2"
        color="blue darken-1">
        <v-icon class="mr-2">add_circle</v-icon>
        Create
      </v-btn>

    </Panel>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  components: {

  },
  computed: {
    ...mapState('contacts', [
      'newContactName', // contacts // contacts
      'newContactEmail',
      'newContactTitle',
      'newContactTel',
      'newContactError',
      'contacts',
    ]),
  },
  methods: {
    contactClicked(contact) {
      this.setCurrentContact(contact);
    },
    ...mapMutations('contacts', [
      'setNewContactName',
      'setNewContactEmail',
      'setNewContactTitle',
      'setNewContactTel',
      'setEditMode',
      'setContactName',
      'setContactEmail',
      'setContactTitle',
      'setContactTel',
      'setCurrentContact',
    ]),
    ...mapActions('contacts', [
      'createContact',
      'fetchContacts',
      'saveContact',
      'deleteContact',
    ]),
  },
};
</script>

<style>
.icon {
  cursor: pointer;
}

.icon:hover {
  color: #333;
}
</style>
