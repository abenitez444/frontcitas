<template>
  <v-card class="cm-round-1 cm-elevation-1">
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
            <v-btn
              :ripple="false"
              active-class=""
              color="primary"
              text
              class="text-capitalize"
              to="/messages"
              >Mensajes</v-btn
            >
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
            <v-btn
              :ripple="false"
              color="primary"
              text
              class="text-capitalize"
              to="/participants"
              >Ver Participantes</v-btn
            >
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
export default {}
</script>

<style lang="scss">
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
}
</style>
