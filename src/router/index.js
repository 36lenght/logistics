import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Ol2 from '../views/openlayers2.vue'
import Ol4 from '../views/openlayers4.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/ol4',
    name: 'Openlayers4',
    component: Ol4
  },
  {
    path: '/ol2',
    name: 'Openlayers2',
    component: Ol2
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
