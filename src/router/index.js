import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'notes/:id',
        name: 'dayNotes',
        component: () => import('../views/EventList.vue')
      },
      {
        path: '/nova-nota',
        name: 'novaNota',
        component: () => import('../views/FormEvent.vue')
      },
      {
        path: '/editar-nota/:noteId',
        name: 'editarNota',
        component: () => import('../views/FormEvent.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
