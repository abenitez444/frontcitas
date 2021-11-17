<template>
  <v-snackbar
    v-model="notificationState"
    top
    right
    :timeout="5000"
    color="accent"
  >
    <v-sheet color="transparent" v-if="gettingNotification">
      <v-row align="center">
        <v-col cols="auto">
          <v-btn
            :to="`/messages/${gettingNotification.profile_id}`"
            fab
            x-small
            color="transparent"
          >
            <v-icon dark> mdi-message </v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <span>
            Nuevo Mensaje de
            <router-link
              :to="`/messages/${gettingNotification.profile_id}`"
              class="font-weight-bold text-decoration-none white--text"
            >
              {{ gettingNotification.first_name }}
              {{ gettingNotification.last_name }}
            </router-link>
          </span>
        </v-col>
      </v-row>
    </v-sheet>

    <template v-slot:action="{ attrs }">
      <v-btn color="white" icon v-bind="attrs" @click="resetNotifications()">
        <v-icon> mdi-close </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import notificationMixin from '@/mixins/notificationMixin'
export default {
  mixins: [notificationMixin],
  data() {
    return {
      notiSnack: true,
    }
  },
  methods: {},
  computed: {
    notificationState: {
      get() {
        return this.gettingNewNotification
      },
      set(value) {
        this.resetNotifications()
      },
    },
  },
}
</script>

<style>
</style>
