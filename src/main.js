import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ol from 'openlayers'
Vue.config.productionTip = false
Vue.prototype.ol=ol

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
