import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {createRouter, createWebHashHistory} from 'vue-router'
import Home from './views/Home.vue'
import Update from './views/Update.vue'
import New from './views/New.vue'
import App from './App.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/update/:id', component: Update },
  { path: '/new/', component: New },
]
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
if ('serviceWorker' in navigator) {
   navigator.serviceWorker.register("serviceworker.js");
}
