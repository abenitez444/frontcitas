const initialState = () => ({
  paymentDialog: false,
})

const state = initialState

const getters = {
  getPaymentDialog(state) {
    return state.paymentDialog
  },
}

const actions = {
  paymentDialogOn({ commit }) {
    commit('PAYMENT_ON')
  },
  paymentDialogOff({ commit }) {
    commit('PAYMENT_OFF')
  },
}

const mutations = {
  PAYMENT_ON(state) {
    state.paymentDialog = true
  },
  PAYMENT_OFF(state) {
    state.paymentDialog = false
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
