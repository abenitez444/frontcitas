const initialState = () => ({
  newNotification: false,
  notification: null,
})

const state = initialState

const getters = {
  getNotification(state) {
    return state.notification
  },
  getNewNotification(state) {
    return state.newNotification
  },
}

const actions = {
  setNotification({ commit }, notification) {
    commit('SETTING_NOTIFICATION', notification)
  },
  resetNotifications({ commit }, notification) {
    commit('RESET_NOTIFICATION', notification)
  },
}

const mutations = {
  SETTING_NOTIFICATION(state, payload) {
    state.newNotification = true
    state.notification = payload
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
