<template>
  <v-card-actions class="justify-center">
    <v-flex class="text-xs-center">

      <v-layout justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on"
            @click="$emit('onEdit')"
            >
              <v-icon>edit</v-icon>
              Edit
            </v-btn>

            <v-btn
              text
              @click="$emit('onDelete')"
            >
              <v-icon>delete</v-icon>
              Delete
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Edit Contact</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field label="Name*"
                      autofocus
                      v-if="isEditMode"
                      :value="name"
                      @input="$emit('onInputName', $event)"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Email*"
                      autofocus
                      v-if="isEditMode"
                      :value="email"
                      @input="$emit('onInputEmail', $event)"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Title*"
                      autofocus
                      v-if="isEditMode"
                      :value="title"
                      @input="$emit('onInputTitle', $event)"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Tel*"
                      autofocus
                      @input="$emit('onInputTel', $event)"
                      v-if="isEditMode"
                      :value="tel"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="dialog = false">Close</v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="$emit('onSave', dialog = false)"
              >Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

    </v-flex>
  </v-card-actions>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
  props: [
    'isEditMode',
    'title',
    'name',
    'tel',
    'email',
    'record',
  ],
};
</script>

<style>

</style>
