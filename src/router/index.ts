import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShowView from '../views/ShowView.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/show/:slug', name: 'show', component: ShowView, props: true },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})
