const initialState = () => ({
  authenticated: false,
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
}

const actions = {
  authenticating({ commit }, payload) {
    localStorage.setItem('wdc_token', JSON.stringify(payload))
    commit('AUTHENTICATE', true)
  },
  checkTrial({ commit }, payload) {
    commit('UPDATE_TRIAL', payload)
  },
}

const mutations = {
  AUTHENTICATE(state, payload) {
    state.authenticated = payload
  },
  UPDATE_TRIAL(state, payload) {
    state.inTrial = payload
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
