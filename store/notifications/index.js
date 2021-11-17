const initialState = () => ({
  newNotification: false,
  notification: null,
  notifications: [],
})

const state = initialState

const getters = {
  getNotification(state) {
    return state.notification
  },
  getNewNotification(state) {
    return state.newNotification
  },
  getNotifications(state) {
    return state.notifications
  },
}

const actions = {
  setNotification({ commit }, notification) {
    commit('SETTING_NOTIFICATION', notification)
  },
  resetNotifications({ commit }, notification) {
    commit('RESET_NOTIFICATION', notification)
  },
  settingNotifications({ commit }) {
    if (localStorage.getItem('wdc-notifications')) {
      const localNotifications = JSON.parse(
        localStorage.getItem('wdc-notifications')
      )
      commit('SET_NOTIFICATIONS', localNotifications)
    }
  },
}

const mutations = {
  SET_NOTIFICATIONS(state, payload) {
    state.notifications = payload
  },
  SETTING_NOTIFICATION(state, payload) {
    state.newNotification = true
    state.notification = payload

    // Filter the last message by user
    let filtered = state.notifications.filter((notification) => {
      return notification.profile_id !== payload.profile_id
    })

    // setting the last message by user
    filtered.push(payload)
    console.debug('Filtrado', filtered)
    state.notifications = filtered
    localStorage.setItem('wdc-notifications', JSON.stringify(filtered))
  },
  RESET_NOTIFICATION(state, payload) {
    state.newNotification = false
    state.notification = null
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
