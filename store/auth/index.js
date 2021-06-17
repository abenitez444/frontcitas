const initialState = () => ({
  authenticated: false,
})

const state = initialState

const getters = {
  isAuthenticated(state) {
    return state.authenticated
  },
}

const actions = {
  authenticating({ commit }, payload) {
    localStorage.setItem('wdc_token', JSON.stringify(payload))
    commit('AUTHENTICATE', true)
  },
}

const mutations = {
  AUTHENTICATE(state, payload) {
    state.authenticated = payload
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
