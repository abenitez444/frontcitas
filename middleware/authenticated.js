export default function ({ store, redirect }) {
  if (process.browser) {
    if (localStorage.getItem('wdc_token') !== null) {
      const { status } = JSON.parse(localStorage.getItem('wdc_token'))
      store.dispatch('auth/checkTrial', !!status)
    } else {
      redirect('/auth/sign-in')
    }
  }
}
