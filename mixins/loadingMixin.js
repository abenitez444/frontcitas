import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions({
      loadingOn: 'loader/loadingOn',
      loadingOff: 'loader/loadingOff',
    }),
  },
  computed: {
    ...mapGetters({
      isLoading: 'loader/isLoading',
    }),
  },
}
