import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions({ authenticating: 'auth/authenticating' }),
  },
  computed: {
    ...mapGetters({ isAuthenticated: 'auth/isAuthenticated' }),
  },
}
