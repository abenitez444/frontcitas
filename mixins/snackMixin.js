import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions({
      snackbarOn: 'snackbar/snackbarOn',
      snackbarOff: 'snackbar/snackbarOff',
    }),
  },
  computed: {
    ...mapGetters({
      isSnackbar: 'snackbar/isSnackbar',
      snackbarText: 'snackbar/snackbarText',
    }),
  },
}
