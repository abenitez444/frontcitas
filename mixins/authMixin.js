import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions({
      authenticating: 'auth/authenticating',
      setUserLogged: 'auth/setUserLogged',
      settingUserData: 'auth/settingUserData',
      checkAuth: 'auth/checkAuth',
      logout: 'auth/logout',
    }),
    async logoutAccount() {
      const { token } = this.getUser
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .$get(`${this.$axios.defaults.baseURL}auth/logout`, config)
        .then((res) => {
          // console.debug(res)
          this.logout()
          this.$router.push('/')
        })
        .catch((e) => {
          // // console.debug(e)
        })
    },
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      inTrial: 'auth/inTrial',
      getUser: 'auth/getUser',
      getUserData: 'auth/getUserData',
    }),
  },
  mounted() {
    // console.debug(this.isAuthenticated)
    // if (this.getUser) {
    //   // console.debug(this.getUser.remains_days.remains)
    // }
  },
}
