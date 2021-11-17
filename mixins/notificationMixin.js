import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  created() {
    // this.checkNotifications()
  },
  methods: {
    ...mapActions({
      setNotification: 'notifications/setNotification',
      resetNotifications: 'notifications/resetNotifications',
      settingNotifications: 'notifications/settingNotifications',
    }),
  },
  computed: {
    ...mapGetters({
      gettingNotification: 'notifications/getNotification',
      gettingNewNotification: 'notifications/getNewNotification',
      _notifications: 'notifications/getNotifications',
    }),
  },
}
