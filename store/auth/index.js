const initialState = () => ({
  authenticated: false,
  user: {},
  userData: null,
  inTrial: false,
})

const state = initialState

const getters = {
  isAuthenticated(state) {
    return state.authenticated
  },
  inTrial(state) {
    return state.inTrial
  },
  getUser(state) {
    return state.user
  },
  getUserData(state) {
    return state.userData
  },
}

const actions = {
  authenticating({ commit }, payload) {
    localStorage.setItem('wdc_token', JSON.stringify(payload))
    commit('AUTHENTICATE', true)
    commit('SET_USER', payload)
  },
  checkTrial({ commit }, payload) {
    commit('UPDATE_TRIAL', payload)
  },
  setUserLogged({ commit }) {
    const userLogged = JSON.parse(localStorage.getItem('wdc_token'))
    commit('SET_USER', userLogged)
  },
  settingUserData({ commit }, payload) {
    commit('SET_USER_DATA', payload)
  },
}

const mutations = {
  AUTHENTICATE(state, payload) {
    state.authenticated = payload
  },
  UPDATE_TRIAL(state, payload) {
    state.inTrial = payload
  },
  SET_USER(state, payload) {
    state.user = payload
  },
  SET_USER_DATA(state, payload) {
    state.userData = payload
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
