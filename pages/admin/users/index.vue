<template>
  <v-col
    cols="12"
    sm="12"
    md="8"
    lg="6"
    class="dashboard-page order-2 order-md-1"
  >
    <v-dialog v-model="editProfileDialog" width="620">
      <v-card v-if="getUserData">
        <v-card-title
          ><span class="grey--text"> Configuración </span>
        </v-card-title>
        <v-card-text class="pa-4 pa-sm-8">
          <v-sheet>
            <v-row justify="center">
              <v-col cols="auto">
                <v-switch
                  v-model="isAdmin"
                  label="Modo Administrador"
                ></v-switch>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="editProfileDialog = false">
            Cancelar
          </v-btn>
          <v-btn color="primary" @click="submitUpdateMode(profileToEdit.id)">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delConfirmDialog" width="620">
      <v-card>
        <v-card-title
          ><span class="grey--text"> Eliminar membresía </span>
        </v-card-title>
        <v-card-text class="pa-4 pa-sm-8">
          <v-sheet>
            <v-row>
              <v-col cols="12">
                <h3 class="text-center primary--text" v-if="userToDelete">
                  ¿Está seguro que desea eliminar la membresía del usuario
                  <span class="text-uppercase"
                    >"{{ userToDelete.username }}" </span
                  >?
                </h3>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="delConfirmDialog = false">
            No
          </v-btn>
          <v-btn color="primary" @click="submitDelUser(userToDelete.id)">
            Si
          </v-btn>
        </v-card-actions>
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
              <v-data-table :headers="headers" :items="users" :search="search">
                <template v-slot:item.username="{ item }">
                  <p class="mb-0">
                    {{ item.username }}
                  </p>
                  <p class="mb-0">
                    {{ item.profile.first_name }}
                    {{ item.profile.last_name }}
                  </p>
                </template>
                <template v-slot:item.created_at="{ item }">
                  <span>
                    {{ dateToHuman(item.created_at) }}
                  </span>
                </template>
                <template v-slot:item.profile="{ item }">
                  <template v-if="item.profile.status_id === 1">
                    <v-chip class="ma-2 font-weight-bold" color="accent">
                      Activo Modo trial {{ item.remains_trial_days.remains }}
                    </v-chip>
                  </template>
                  <template v-else-if="item.profile.status_id === 2">
                    <v-chip class="ma-2 font-weight-bold" color="accent">
                      Inactivo Modo Trial
                    </v-chip>
                  </template>
                  <template v-else-if="item.profile.status_id === 3">
                    <v-chip class="ma-2 font-weight-bold" color="accent">
                      Reportado
                    </v-chip>
                  </template>
                  <template v-else-if="item.profile.status_id === 4">
                    <v-chip class="ma-2 font-weight-bold" color="accent">
                      Activo Membresía
                    </v-chip>
                  </template>
                  <template v-else-if="item.profile.status_id === 5">
                    <v-chip class="ma-2 font-weight-bold" color="accent">
                      Inactivo Membresía
                    </v-chip>
                  </template>
                  <template v-else>
                    <v-chip class="ma-2 font-weight-bold" color="accent">
                      Cuenta de baja
                    </v-chip>
                  </template>
                </template>
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

                    <!-- options -->
                    <v-list>
                      <!-- log -->
                      <v-list-item :to="`/admin/logs/${item.id}`">
                        <v-list-item-icon>
                          <v-icon>mdi-eye</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Historial</v-list-item-title>
                      </v-list-item>
                      <!-- Delete acount -->
                      <v-list-item @click="confirmDeleteAcc(item)">
                        <v-list-item-icon>
                          <v-icon>mdi-delete</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Elimnar Membresía</v-list-item-title>
                      </v-list-item>
                      <!-- Delete content -->
                      <v-list-item :to="`/admin/users/reports`">
                        <v-list-item-icon>
                          <v-icon>mdi-delete-sweep</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Elimnar Contenido</v-list-item-title>
                      </v-list-item>
                      <!-- Edit -->
                      <v-list-item @click="getProfile(item)">
                        <v-list-item-icon>
                          <v-icon>mdi-tools</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Configurar</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
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
      isAdmin: false,
      headers: [
        { text: 'Usuario', value: 'username' },
        { text: 'Fecha de registro', value: 'created_at' },
        { text: 'Estatus', value: 'profile' },
        { text: '', value: 'actions' },
      ],
      delConfirmDialog: false,
      editProfileDialog: false,
      users: [],
      user: null,
      userToDelete: null,
      profileToEdit: {},
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'GET',
        url: `${this.$axios.defaults.baseURL}auth/users`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          console.debug(res)
          this.loadingOff()
          this.users = res.data.users
        })
        .catch((e) => {
          console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    dateToHuman(date) {
      const dateObject = new Date(date)
      const humanDateFormat = dateObject.toLocaleString('es-VE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }) //2019-12-9 10:30:15
      return humanDateFormat
    },
    confirmDeleteAcc(item) {
      this.delConfirmDialog = true
      this.userToDelete = item
    },
    async submitDelUser(userId) {
      this.delConfirmDialog = false
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'PUT',
        url: `${this.$axios.defaults.baseURL}auth/delete_membership/user/${userId}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          console.debug(res)
          this.loadingOff()
          this.snackbarOn(
            `Se procederá a eliminar la cuenta del Usuario "${this.userToDelete.username}", el mismo no podrá ingresar nuevamente.`
          )
          this.getUsers()
        })
        .catch((e) => {
          console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
      // toDelete = {
      //   photos: [1, 2, 3],
      //   posts: [1, 2, 3],
      // }
    },
    async getProfile(profile) {
      this.editProfileDialog = true
      this.profileToEdit = profile
      this.isAdmin = profile.id_rol === 1 ? true : false
    },
    async submitUpdateMode(userId) {
      this.editProfileDialog = false
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'PUT',
        url: `${this.$axios.defaults.baseURL}auth/change-rol/user/${userId}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          rol: this.isAdmin ? 1 : 2,
        },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          this.getUsers()
          this.loadingOff()
          this.snackbarOn(
            `Ha cambiado el modo del usuario "${this.profileToEdit.username}".`
          )
        })
        .catch((e) => {
          console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
  },
}
</script>

<style>
</style>
