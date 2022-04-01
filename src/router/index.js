import { createRouter, createWebHistory } from 'vue-router'
import Radiographer from '../views/Radiographer.vue'
import Facility from '../views/Facility.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/Radiographer',
    name: 'Radiographer',
    component: Radiographer
  },
  {
    path: '/Facility',
    name: 'Facility',
    component: Facility
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
