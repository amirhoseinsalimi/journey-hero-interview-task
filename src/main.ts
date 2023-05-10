import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import routes from './router'
import store from './store'
import '@/assets/scss/main.scss'

(async () => await loadFonts())()

createApp(App)
  .use(store)
  .use(routes)
  .use(vuetify)
  .mount('#app')
