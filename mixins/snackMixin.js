import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions({
      snackbarOn: 'snackbar/snackbarOn',
      snackbarOff: 'snackbar/snackbarOff',
      snackbarEnabled: 'snackbar/snackbarEnabled',
    }),
  },
  computed: {
    ...mapGetters({
      isSnackbar: 'snackbar/isSnackbar',
      snackbarText: 'snackbar/snackbarText',
    }),
    showSnackbar: {
      get: function () {
        return this.isSnackbar
      },
      set: function () {
        this.snackbarEnabled()
      },
    },
  },
}
