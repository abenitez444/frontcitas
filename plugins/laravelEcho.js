import Vue from 'vue'
import Echo from 'laravel-echo'

const echo = {}
let auth = {}
if (localStorage.getItem('wdc_token') !== null) {
  const { token } = JSON.parse(localStorage.getItem('wdc_token'))
  auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

echo.install = function (Vue) {
  Vue.prototype.$pusher = require('pusher-js')
  Vue.prototype.$echo = new Echo({
    broadcaster: 'pusher',
    key: 'ASDASD2121',
    //
    // authEndpoint: ' http://127.0.0.1:8000/api/broadcasting/auth',
    authEndpoint: ' http://dev.clubsugar.cl:8000/api/broadcasting/auth',
    auth: auth,
    //
    // wsHost: '127.0.0.1',
    wsHost: '//dev.clubsugar.cl',
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
    scheme: 'http',
    enabledTransports: ['ws'],
  })
}

Vue.use(echo)
