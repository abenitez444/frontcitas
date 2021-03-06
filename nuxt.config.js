import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'Club Sugar',
    htmlAttrs: {
      lang: 'es',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/styles/theme/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/youtube', '@/plugins/laravelEcho', '@/plugins/vMask'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    scss: ['~/assets/styles/theme/main.scss'],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: 'http://127.0.0.1:8000/api/',
     baseURL: 'https://dev.clubsugar.cl/backendcitas/public/api/',
    //baseURL: `${process.env.BASE_URL}/api/`,
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    // customVariables: ['~/assets/variables.scss'],
    lang: {
      current: 'es',
    },
    theme: {
      dark: false,
      themes: {
        light: {
          // primary: '#F42F43',
          // primary: '#480b0e',
          primary: '#ce1f24',
          accent: '#783BF9',
          accent_2: '#F87172',
          accent_3: '#A5A6F6',
          secondary: '#FF273E',
          font_one: '#321215',
          man_color: '#1582e7',
          woman_color: '#fe297c',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          whatsapp: '#25D366',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  // layout transition
  layoutTransition: {
    name: 'layout',
    mode: 'out-in',
  },

  env: {
    baseUrl: process.env.BASE_URL,
  },
}
