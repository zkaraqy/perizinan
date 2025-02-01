// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Aplikasi Reporting On Duty",
    }
  },

  compatibilityDate: '2024-11-01',

  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },
  modules: ['@mhmdzaien/nuxt-sequelize'],

  css: [
    'bootstrap/dist/css/bootstrap.min.css'
  ]
})