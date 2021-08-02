<template>
  <v-card class="cm-round-1 cm-elevation-1 main-menu">
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
            <v-btn
              :ripple="false"
              color="primary"
              text
              class="text-capitalize"
              to="/profile"
              >Perfil</v-btn
            >
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
export default {
  mixins: [authMixin],
}
</script>

<style lang="scss">
.main-menu {
  z-index: 6;
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
