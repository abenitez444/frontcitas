<template>
  <v-col
    cols="12"
    sm="12"
    md="8"
    lg="6"
    class="reports-page order-2 order-md-1"
  >
    <v-dialog v-model="editPostsDialog" width="620">
      <v-card>
        <v-card-title
          ><span class="grey--text"> Editar Perfil </span>
        </v-card-title>
        <v-card-text class="pa-4 pa-sm-8">
          <v-sheet>
            <v-row>
              <v-col cols="12">
                <span>En Desarrollo</span>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>

        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="editProfile = false">
            No
          </v-btn>
          <v-btn color="primary" @click="submitDelUser()"> Si </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
    <v-sheet color="transparent">
      <!-- info -->
      <v-row no-gutters>
        <v-col>
          <v-card color="" class="cm-round-1 cm-elevation-1 light">
            <v-card-title>
              <v-row>
                <v-spacer></v-spacer>
                <v-col cols="4">
                  <v-select
                    :items="sortByQuerys"
                    v-model="search"
                    item-text="name"
                    item-value="id"
                    solo
                    hide-details
                    label="Tipo de reporte"
                  ></v-select>
                  <!-- v-model="newSlide.id_featured_type"
                  :error-messages="carouselTypeErrors"
                  @input="$v.newSlide.id_featured_type.$touch()"
                  @blur="$v.newSlide.id_featured_type.$touch()" -->
                </v-col>
                <v-col cols="5">
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    solo
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text class="pa-4 pa-sm-8">
              <v-data-table
                :headers="headers"
                :items="search ? filteredUsers : users"
              >
                <template v-slot:item.actions="{ item }">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="transparent"
                        fab
                        x-small
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="editPostsDialog = true">
                        <v-list-item-icon>
                          <v-icon>mdi-pencil</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Editar</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!-- <v-row>
        <pre>
        {{ users }}
        {{ filteredUsers }}
        </pre>
      </v-row> -->
    </v-sheet>
  </v-col>
</template>

<script>
import authMixin from '@/mixins/authMixin'
import resources from '@/mixins/resources'
import loadingMixin from '@/mixins/loadingMixin'
import snackMixin from '@/mixins/snackMixin'
export default {
  layout: 'dashboard',
  mixins: [authMixin, resources, loadingMixin, snackMixin],
  data() {
    return {
      search: '',
      headers: [
        { text: 'Usuario', value: 'username' },
        { text: 'Fecha de Reporte', value: 'created_at' },
        { text: 'Tipo de reporte', value: 'type' },
        { text: 'Veces reportado', value: 'report_numbers' },
        { text: '', value: 'actions', sortable: false },
      ],
      delConfirmDialog: false,
      editPostsDialog: false,
      editProfile: false,
      sortByQuerys: [
        { name: 'Tipo 1', id: 'tipo-1' },
        { name: 'Tipo 2', id: 'tipo-2' },
      ],
      users: [
        {
          username: 'Jirehpro',
          email: 'Jio@gmail.com',
          first_name: 'jirehpro',
          last_name: 'inc',
          created_at: '10/01/2021',
          type: 'tipo-1',
          report_numbers: '1',
        },
        {
          username: 'JohnDoe',
          email: 'Joe@gmail.com',
          first_name: 'John',
          last_name: 'Doe',
          created_at: '04/02/2020',
          type: 'tipo-2',
          report_numbers: '1',
        },
      ],
      filteredUsers: [],
      user: null,
      userToDelete: null,
    }
  },
  mounted() {},
  methods: {},
  watch: {
    search(val) {
      const valLower = val.toLowerCase()
      this.filteredUsers = this.users.filter(
        (user) =>
          user.username.toLowerCase().indexOf(valLower) > -1 ||
          user.email.toLowerCase().indexOf(valLower) > -1 ||
          user.first_name.toLowerCase().indexOf(valLower) > -1 ||
          user.last_name.toLowerCase().indexOf(valLower) > -1
      )
    },
  },
}
</script>

<style lang="scss">
.reports-page {
  margin-bottom: 250px;
}
</style>
