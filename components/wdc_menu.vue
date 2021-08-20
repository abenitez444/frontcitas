<template>
  <v-card class="cm-round-1 cm-elevation-1 main-menu">
    <!-- confirm delete account -->
    <v-dialog v-model="confirmDeleteAccModal" persistent max-width="500">
      <v-card>
        <!-- password verification step -->
        <v-card-text class="pa-5">
          <h3>
            ¿Usted desea eliminar toda su información de su cuenta en Club Sugar
            Daddy?
          </h3>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="confirmDeleteAccModal = false">
            No
          </v-btn>
          <v-btn color="error" @click="sendVerificationCode()"> Si </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- delete account -->
    <v-dialog v-model="deleteAccModal" persistent max-width="500">
      <v-card>
        <!-- password verification step -->
        <v-card-text class="pa-5" v-if="!generateCodeStep">
          <v-text-field
            label="Contraseña"
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="!showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            outlined
            hide-details=""
          ></v-text-field>
          <!-- <pre>
            {{ password }}
          </pre> -->
        </v-card-text>
        <!-- code veritifaction steo -->
        <v-card-text class="pa-5" v-else>
          <v-text-field
            outlined
            label="Código de Seguridad"
            v-model="verificationCode"
          ></v-text-field>
          <!-- <pre>
            {{ password }}
          </pre> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="deleteAccModal = false">
            Cancelar
          </v-btn>
          <v-btn color="primary" v-if="!generateCodeStep" @click="submit()">
            Enviar
          </v-btn>
          <v-btn color="primary" v-else @click="confirmDeleteAcc()">
            Enviar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <template v-if="getUserData && getUserData.user.id_rol === 1">
      <v-card-text class="pa-8">
        <v-sheet>
          <v-row>
            <v-col>
              <v-btn
                :ripple="false"
                color="primary"
                text
                class="text-capitalize"
                to="/dashboard"
                >Inicio</v-btn
              >
            </v-col>
          </v-row>
          <!-- Usuarios -->
          <v-row>
            <v-col>
              <v-btn
                :ripple="false"
                color="primary"
                text
                class="text-capitalize"
                to="/admin/users"
                >Usuarios</v-btn
              >
            </v-col>
          </v-row>

          <!-- Configuracion -->
          <v-row>
            <v-col>
              <v-btn
                :ripple="false"
                color="primary"
                text
                class="text-capitalize"
                to="/admin/settings"
                >Configuración</v-btn
              >
            </v-col>
          </v-row>
          <!-- Soporte Técnico -->
          <!-- Cerrar sesión -->
          <v-row>
            <v-col>
              <v-btn
                :ripple="false"
                color="primary"
                text
                class="text-capitalize"
                @click="logoutAccount()"
                >Cerrar sesión</v-btn
              >
            </v-col>
          </v-row>
        </v-sheet>
      </v-card-text>
      <!-- <pre>
      {{ getUserData.user.id_rol }}
      </pre> -->
    </template>
    <v-card-text class="pa-8" v-else>
      <v-sheet>
        <v-row>
          <v-col>
            <v-btn
              :ripple="false"
              color="primary"
              text
              class="text-capitalize"
              to="/dashboard"
              >Inicio</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-badge bordered color="error" overlap :content="5">
              <v-btn
                :ripple="false"
                active-class=""
                color="primary"
                text
                class="text-capitalize"
                to="/messages"
                >Mensajes</v-btn
              >
            </v-badge>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <template v-if="$route.name === 'profile'">
              <v-list-group :value="false" no-action>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>Perfil</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item link to="/profile">
                  <v-list-item-title>Perfil</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="deleteAccModal = true">
                  <v-list-item-title>Eliminar cuenta</v-list-item-title>
                </v-list-item>
              </v-list-group>
            </template>
            <template v-else>
              <v-btn
                :ripple="false"
                color="primary"
                text
                class="text-capitalize"
                to="/profile"
                >Perfil</v-btn
              >
            </template>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-list-group :value="false" no-action>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>Participantes</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item link to="/participants">
                <v-list-item-title>Participantes</v-list-item-title>
              </v-list-item>
              <v-list-item link to="/participants/blocks">
                <v-list-item-title>Miembros Bloqueados</v-list-item-title>
              </v-list-item>
            </v-list-group>
            <!-- <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  :ripple="false"
                  color="primary"
                  text
                  class="text-capitalize"
                  >Ver Participantes</v-btn
                >
              </template>
              <v-list>
                <v-list-item to="/participants">
                  <v-list-item-title>Participantes</v-list-item-title>
                </v-list-item>
                <v-list-item to="/participants/block">
                  <v-list-item-title>Miembros bloqueados</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu> -->
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              :ripple="false"
              color="primary"
              text
              class="text-capitalize"
              @click="logoutAccount()"
              >Cerrar sesión</v-btn
            >
          </v-col>
        </v-row>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import authMixin from '@/mixins/authMixin'
import resources from '@/mixins/resources'
import loadingMixin from '@/mixins/loadingMixin'
import snackMixin from '@/mixins/snackMixin'
export default {
  mixins: [authMixin, resources, loadingMixin, snackMixin],
  data() {
    return {
      deleteAccModal: false,
      confirmDeleteAccModal: false,
      showPassword: true,
      password: null,
      verificationCode: null,
      generateCodeStep: false,
    }
  },
  methods: {
    async submit() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
      const profileId = this.$route.params.id

      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      let data = {
        password: this.password,
      }
      await this.$axios
        .$put(
          `${this.$axios.defaults.baseURL}auth/generate-delete-acount-code`,
          data,
          config
        )
        .then((res) => {
          this.loadingOff()
          console.debug(res)
          this.snackbarOn(
            'La Contraseña es correcta. Le enviamos un código de seguridad a su correo eléctrónico registrado en nuestro sitio web. Por favor introduzcalo a continuación'
          )
          this.generateCodeStep = true
        })
        .catch((e) => {
          this.loadingOff()
          console.debug(e.response.data.error)
          this.snackbarOn(e.response.data.error)
        })
    },
    confirmDeleteAcc() {
      this.confirmDeleteAccModal = true
    },
    async sendVerificationCode() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'DELETE',
        url: `${this.$axios.defaults.baseURL}auth/delete-profile`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: { code: this.verificationCode },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          this.loadingOff()
          this.logout()
          this.$router.push('/')
          console.debug(res)
        })
        .catch((e) => {
          this.loadingOff()
          console.debug(e.response.data.error)
          this.snackbarOn(e.response.data.error)
        })
    },
  },
}
</script>

<style lang="scss">
.main-menu {
  z-index: 4;
  position: relative;
}
.menu-wrapper {
  .v-btn {
    font-weight: bold;
    font-size: 18px;
    line-height: 30px;
    color: #9d8080 !important;
    opacity: 0.5;
    &--active {
      opacity: 1;
      color: #f42f43 !important;
      &::before {
        opacity: 0;
      }
    }
  }
  .v-list-item {
    &__title {
      font-weight: bold;
      font-size: 18px;
      line-height: 30px;
      color: #9d8080 !important;
      opacity: 0.5;
    }
  }
  .v-list-group__items {
    .v-list-item {
      padding-left: 2rem !important;
    }
  }
}
</style>
