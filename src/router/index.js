import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Ol from '../views/openlayers.vue'
import Ol2 from '../views/openlayers2.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/ol2',
    name: 'Openlayers2',
    component: Ol2
  },
  {
    path: '/ol',
    name: 'Openlayers',
    component: Ol
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
