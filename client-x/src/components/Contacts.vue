<template>
  <Panel title="Contacts">
    <div
      class="contact mt-2"
      v-for="contact in contacts"
      :key="contact.id"
    >
      <v-card
        class="mx-auto"
        max-width="100%"
        outlined
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">{{contact.id}}</div>
            <v-list-item-title class="headline mb-1">{{contact.name}}</v-list-item-title>
            <v-list-item-subtitle>{{contact.email}}</v-list-item-subtitle>

              <v-card-actions class="justify-center">
                <v-card-title>
                  {{contact.tel}}
                </v-card-title>
              </v-card-actions>

          </v-list-item-content>

          <v-list-item-avatar
            tile
            size="80"
          >
            <v-img
              :src="require('../assets/logo.svg')"
              class="my-3"
              contain
              height="200"
            ></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <EditContact
          :isEditMode="contact.isEditMode"
          :name="contact.name"
          :email="contact.email"
          :title="contact.title"
          :tel="contact.tel"
          @onInputName="setContactName({
            contact,
            name: $event,
          })"
          @onInputEmail="setContactEmail({
            contact,
            email: $event,
          })"
          @onInputTitle="setContactTitle({
            contact,
            title: $event,
          })"
          @onInputTel="setContactTel({
            contact,
            tel: $event,
          })"

          @onEdit="contactClicked(contact)"
          @onSave="saveContact(contact)"
          @onDelete="deleteContact(contact)"
        ></EditContact>

      </v-card>
    </div>
  </Panel>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

import EditContact from '@/components/EditContact.vue';


export default {

  props: [
    'isEditMode',

  ],
  mounted() {
    this.fetchContacts();
  },
  components: {
    EditContact,
  },
  computed: {
    ...mapState('contacts', [
      'currentContact',
      'newContactName',
      'contacts',
    ]),
  },
  methods: {
    contactClicked(contact) {
      this.setEditMode(contact);
      this.setCurrentContact(contact);
    },
    ...mapMutations('contacts', [
      'setNewContactName',
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
.contact {
  font-size: 20px;
}

.icon {
  cursor: pointer;
}

.icon:hover {
  color: #333;
}
</style>
