<template>
  <v-snackbar
    v-model="showSnackbar"
    :timeout="5000"
    color="primary"
    :multi-line="multiLine"
  >
    {{ snackbarText }}

    <template v-slot:action="{ attrs }">
      <v-btn color="white" icon v-bind="attrs" @click="snackbarOff()">
        <v-icon dark> mdi-close </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import snackMixin from '@/mixins/snackMixin'
export default {
  mixins: [snackMixin],
  data() {
    return {
      multiLine: true,
    }
  },
}
</script>
