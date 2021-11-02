const initialState = () => ({
  profileData: false,
})

const state = initialState

const getters = {
  getProfileData(state) {
    return state.profileData
  },
}

const actions = {
  setProfileData({ commit }, profileData) {
    commit('SETTING_PROFILE_DATA', profileData)
  },
}

const mutations = {
  SETTING_PROFILE_DATA(state, profileData) {
    state.profileData = profileData
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
