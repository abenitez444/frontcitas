export default function ({ redirect }) {
  if (process.browser) {
    if (localStorage.getItem('wdc_token')) {
      redirect('/app/dashboard')
    }
  }
}
