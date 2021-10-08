<template>
  <v-col
    cols="12"
    sm="12"
    md="8"
    lg="6"
    class="reports-page order-2 order-md-1"
  >
    <v-dialog v-model="editPostsDialog" width="800">
      <v-card>
        <v-card-title
          ><span class="grey--text"> Editar Perfil </span>
        </v-card-title>
        <v-card-text class="pa-4 pa-sm-8">
          <v-sheet>
            <!-- User gallery -->
            <v-row >
              <v-col cols="12">
                <v-data-table
                  :headers="userGalleryHeaders"
                  :items="userGallery"
                  :single-expand="true"
                  :expanded.sync="expandedGallery"
                  item-key="id"
                  show-expand
                  show-select
                  class="elevation-1"
                  v-model="selectedPhotos"
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title>Fotos de <span class="font-weight-bold">{{userToEdit.first_name}} {{userToEdit.last_name}}</span></v-toolbar-title>
                    </v-toolbar>
                  </template>
                  <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length" class="text-center">
                      <img
                        :src="`${img_baseUrl}${item.path}`"
                        class="img-to-delete pa-5"
                        alt=""
                      />
                    </td>
                  </template>
                  <template v-slot:item.path="{ item }">
                    Imagen {{ item.id }}
                  </template>
                  <template v-slot:item.created_at="{ item }">
                    <span>
                      {{ dateToHuman(item.created_at) }}
                    </span>
                  </template>
                  <template v-slot:item.profile="{ item }">
                    <span>
                      {{ item.profile.user.username }}
                    </span>
                  </template>
                </v-data-table>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>
            <!-- User Posts -->
            <v-row>
              <v-col cols="12">
                <v-data-table
                  :headers="userPostsHeaders"
                  :items="userPosts"
                  :single-expand="true"
                  :expanded.sync="expandedPost"
                 item-key="id"
                  show-expand
                  show-select
                  class="elevation-1"
                  v-model="selectedPosts"
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title>Posts de <span class="font-weight-bold">{{userToEdit.first_name}} {{userToEdit.last_name}}</span></v-toolbar-title>
                    </v-toolbar>
                  </template>
                  <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length" class="text-center">
                      <img
                        :src="`${img_baseUrl}${item.image}`"
                        class="img-to-delete pa-5"
                        alt=""
                      />
                    </td>
                  </template>
                  <template v-slot:item.created_at="{ item }">
                    <span>
                      {{ dateToHuman(item.created_at) }}
                    </span>
                  </template>
                </v-data-table>
                <!-- <pre>{{ userGallery }}</pre> -->
                <!-- <pre>{{ userPosts }}</pre> -->
                <!-- <pre>{{ selectedPhotos }}</pre>
                <pre>{{ selectedPosts }}</pre> -->
              </v-col>
            </v-row>
            <!-- <v-row>
              <pre>
              {{userToEdit}}
              </pre>
            </v-row> -->
          </v-sheet>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="editPostsDialog = false">
            Cancelar
          </v-btn>
          <v-btn color="primary" @click="delConfirmPhotosDialog = true"> Eliminar Fotos </v-btn>
          <v-btn color="primary" @click="delConfirmPostsDialog = true"> Eliminar Posts</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delConfirmPhotosDialog" width="620">
      <v-card>
        <v-card-title
          ><span class="grey--text"> Eliminar fotos </span>
        </v-card-title>
        <v-card-text class="pa-4 pa-sm-8">
          <v-sheet>
            <v-row>
              <v-col cols="12">
                <h3 class="text-center primary--text" v-if="userToEdit">
                  ¿Está seguro que desea eliminar todas las fotos reportadas del usuario
                  <span class="font-weight-bold">{{userToEdit.user.username}}</span>?
                </h3>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="delConfirmPhotosDialog = false">
            No
          </v-btn>
          <v-btn color="primary" @click="submitDelUserPhotos()">
            Si
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delConfirmPostsDialog" width="620">
      <v-card>
        <v-card-title
          ><span class="grey--text"> Eliminar Posts </span>
        </v-card-title>
        <v-card-text class="pa-4 pa-sm-8">
          <v-sheet>
            <v-row>
              <v-col cols="12">
                <h3 class="text-center primary--text" v-if="userToEdit">
                  ¿Está seguro que desea eliminar todo el contenido reportado del usuario
                  <span class="font-weight-bold">{{userToEdit.user.username}}</span>?
                </h3>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="delConfirmPostsDialog = false">
            No
          </v-btn>
          <v-btn color="primary" @click="submitDelUserPosts()">
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
                <v-col cols="4">
                  <!-- <v-select
                    :items="sortByQuerys"
                    v-model="search"
                    item-text="name"
                    item-value="id"
                    solo
                    hide-details
                    label="Tipo de reporte"
                  ></v-select> -->
                  <v-select
                    :items="report_types"
                    :item-text="(item) => item.name"
                    :item-value="(item) => item.id"
                    label="Tipo de reporte"
                    solo
                    v-model="searchType"
                  ></v-select>
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
                <template v-slot:item.username="{ item }">
                  <p class="mb-0 font-weight-bold">
                    {{ item.user.username }}
                  </p>
                  <p class="mb-0">
                    {{item.first_name}} {{item.last_name}}
                  </p>
                </template>
                <template v-slot:item.created_at="{ item }">
                  <span>
                    {{ item.last_report.last }}
                  </span>
                </template>
                <template v-slot:item.type="{ item }">
                  <span>
                    {{ item.reports[0].report.name }}
                  </span>
                </template>
                <template v-slot:item.report_numbers="{ item }">
                  <span>
                    {{ item.reports.length }}
                  </span>
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
                    <v-list>
                      <v-list-item @click="getInfoToEdit(item)">
                        <v-list-item-icon>
                          <v-icon>mdi-delete-sweep</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Eliminar contenido</v-list-item-title>
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
        {{ searchType }}
        {{ users }}
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
  middleware: ['authenticated'],
  data() {
    return {
      search: '',
      searchType: '',
      headers: [
        { text: 'Usuario', value: 'username' },
        { text: 'Fecha de Reporte', value: 'created_at' },
        { text: 'Tipo de reporte', value: 'type' },
        { text: 'Veces reportado', value: 'report_numbers' },
        { text: '', value: 'actions', sortable: false },
      ],
      delConfirmDialog: false,
      delConfirmPhotosDialog: false,
      delConfirmPostsDialog: false,

      editPostsDialog: false,
      editProfile: false,
      sortByQuerys: [
        { name: 'Tipo 1', id: 'tipo-1' },
        { name: 'Tipo 2', id: 'tipo-2' },
      ],
      users: [],
      filteredUsers: [],
      user: null,
      userToDelete: null,
      userToEdit: null,
      userGallery: [],
      userPosts: [],
      //test
      expandedPost: [],
      expandedGallery: [],
      userGalleryHeaders: [
        {
          text: 'Título',
          value: 'path',
        },
        {
          text: 'Autor',
          value: 'profile',
        },
        {
          text: 'Fecha de creación',
          value: 'created_at',
        },
      ],
      userPostsHeaders: [
        {
          text: 'Contenido',
          value: 'description',
        },
        {
          text: 'Fecha de creación',
          value: 'created_at',
        },
      ],
      selectedPhotos: [],
      selectedPosts: [],
    }
  },
  mounted() {
    this.getReportTypes()
    this.getReportsUsers()
  },
  methods: {
    async getReportsUsers() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'GET',
        url: `${this.$axios.defaults.baseURL}auth/users-reported`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          // console.debug(res)
          this.loadingOff()

          this.users = res.data.repoted
        })
        .catch((e) => {
          // console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    getInfoToEdit(user) {
      const { id } = user
      this.getGalleryByUserId(id)
      this.getPostsByUserId(id)
      this.userToEdit = user
      this.editPostsDialog = true
    },
    async getGalleryByUserId(userId) {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'GET',
        url: `${this.$axios.defaults.baseURL}auth/gallery/user/${userId}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          this.loadingOff()
          this.userGallery = res.data.gallery
        })
        .catch((e) => {
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async getPostsByUserId(userId) {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'GET',
        url: `${this.$axios.defaults.baseURL}auth/post_reported/user/${userId}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          this.loadingOff()
          // this.editPostsDialog = true
          this.userPosts = res.data.post_reported
        })
        .catch((e) => {
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
    async submitDelUserPhotos() {
      this.loadingOn()
      let filteredPhotos = []
      this.selectedPhotos.forEach((photo) => {
        filteredPhotos.push(photo.id)
      })
      let filteredPosts = []
      this.selectedPosts.forEach((post) => {
        filteredPosts.push(post.id)
      })
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'DELETE',
        url: `${this.$axios.defaults.baseURL}auth/delete_post_and_images`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: { photos: filteredPhotos, posts: filteredPosts },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          // console.debug(res)
          this.loadingOff()
          this.delConfirmPhotosDialog = false
          this.getGalleryByUserId(this.userToEdit.id)
          this.snackbarOn(
            `Se procederá a eliminar todas las fotos resportadas del Usuario ${this.userToEdit.user.username}.`
          )
        })
        .catch((e) => {
          // console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async submitDelUserPosts() {
      this.loadingOn()
      let filteredPhotos = []
      this.selectedPhotos.forEach((photo) => {
        filteredPhotos.push(photo.id)
      })
      let filteredPosts = []
      this.selectedPosts.forEach((post) => {
        filteredPosts.push(post.id)
      })
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'DELETE',
        url: `${this.$axios.defaults.baseURL}auth/delete_post_and_images`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: { photos: filteredPhotos, posts: filteredPosts },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          // console.debug(res)
          this.loadingOff()
          this.delConfirmPostsDialog = false
          this.getPostsByUserId(this.userToEdit.id)
          this.snackbarOn(
            `Se procederá a eliminar todo el contenido resportado del Usuario  ${this.userToEdit.user.username}.`
          )
        })
        .catch((e) => {
          // console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
  },
  watch: {
    search(val) {
      const valLower = val.toLowerCase()
      this.filteredUsers = this.users.filter(
        (user) =>
          user.user.username.toLowerCase().indexOf(valLower) > -1 ||
          user.user.email.toLowerCase().indexOf(valLower) > -1 ||
          user.first_name.toLowerCase().indexOf(valLower) > -1 ||
          user.last_name.toLowerCase().indexOf(valLower) > -1
      )
    },
    searchType(val) {
      const valLower = val
      // // console.debug(val)
      this.filteredUsers = this.users.filter(
        (user) => user.reports[0].id_report_type === val
      )
    },
  },
}
</script>

<style lang="scss">
.reports-page {
  margin-bottom: 250px;
}
.img-to-delete {
  width: 250px;
  height: auto;
}
</style>
