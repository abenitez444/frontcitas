export default function ({ store, redirect }) {
  if (process.browser) {
    if (localStorage.getItem('wdc_token') !== null) {
      const { status, remains_days } = JSON.parse(
        localStorage.getItem('wdc_token')
      )
      if (status.id === 4) {
        store.dispatch('auth/checkTrial', false)
      } else if (status.id === 5) {
        redirect('/trial_out')
        store.dispatch('auth/checkTrial', false)
      } else if (remains_days.remains <= 0) {
        redirect('/trial_out')
        store.dispatch('auth/checkTrial', false)
      } else {
        store.dispatch('auth/checkTrial', remains_days.remains > 0)
      }
    } else {
      redirect('/auth/sign-in')
    }
  }
}
