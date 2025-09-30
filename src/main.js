import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Search from './views/Search.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'
import PropertyDetail from './views/PropertyDetail.vue'
import './style.css'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/busca', name: 'Search', component: Search },
  { path: '/sobre', name: 'About', component: About },
  { path: '/contato', name: 'Contact', component: Contact },
  { path: '/imovel/:id', name: 'PropertyDetail', component: PropertyDetail, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')