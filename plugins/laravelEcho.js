import Vue from 'vue'
import Echo from 'laravel-echo'

const echo = {}

echo.install = function (Vue) {
  Vue.prototype.$pusher = require('pusher-js')
  Vue.prototype.$echo = new Echo({
    broadcaster: 'pusher',
    key: 'ASDASD2121',
    wsHost: '127.0.0.1',
    // wsHost: 'https://dev.clubsugar.cl/backendcitas/public/',
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
  })
}

Vue.use(echo)
