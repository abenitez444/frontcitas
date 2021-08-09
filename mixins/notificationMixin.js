import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions({
      setNotification: 'notifications/setNotification',
      resetNotifications: 'notifications/resetNotifications',
    }),
  },
  computed: {
    ...mapGetters({
      gettingNotification: 'notifications/getNotification',
      gettingNewNotification: 'notifications/getNewNotification',
    }),
  },
}
