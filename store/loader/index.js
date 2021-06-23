const initialState = () => ({
  loading: false,
})

const state = initialState

const getters = {
  isLoading(state) {
    return state.loading
  },
}

const actions = {
  loadingOn({ commit }) {
    commit('LOADING_ON')
  },
  loadingOff({ commit }) {
    commit('LOADING_OFF')
  },
}

const mutations = {
  LOADING_ON(state) {
    state.loading = true
  },
  LOADING_OFF(state) {
    state.loading = false
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
