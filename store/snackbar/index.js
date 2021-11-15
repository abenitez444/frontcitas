const initialState = () => ({
  multiLine: true,
  snackbar: false,
  text: `default`,
})

const state = initialState

const getters = {
  isSnackbar(state) {
    return state.snackbar
  },
  snackbarText(state) {
    return state.text
  },
}

const actions = {
  snackbarOn({ commit }, snackText) {
    commit('SNACKBAR_ON', snackText)
  },
  snackbarOff({ commit }) {
    commit('SNACKBAR_OFF')
  },
  snackbarEnabled({ commit }) {
    commit('SNACKBAR_ENABLED')
  },
}

const mutations = {
  SNACKBAR_ON(state, snackText) {
    state.snackbar = true
    state.text = snackText
  },
  SNACKBAR_OFF(state) {
    state.snackbar = false
    state.text = ''
  },
  SNACKBAR_ENABLED(state) {
    state.snackbar = true
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
