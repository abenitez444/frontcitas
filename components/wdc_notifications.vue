<template>
  <v-snackbar v-model="notiSnack" top right :timeout="0" color="accent">
    <v-btn to="/messages/4" class="mx-2" fab x-small color="transparent">
      <v-icon dark> mdi-message </v-icon>
    </v-btn>
    Nuevo Mensaje de
    <router-link
      to="/messages/4"
      class="font-weight-bold text-decoration-none white--text"
      >Usuario Prueba</router-link
    >

    <template v-slot:action="{ attrs }">
      <v-btn color="white" icon v-bind="attrs" @click="notiSnack = false">
        <v-icon> mdi-close </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      notiSnack: true,
    }
  },
}
</script>

<style>
</style>
