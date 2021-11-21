import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import Notifications from '@kyvg/vue3-notification'
import App from './App.vue'
import './styles/index.css'
import '@hennge/vue3-pagination/dist/vue3-pagination.css'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
  .use(router)
  .use(Notifications)
  .mount('#app')
