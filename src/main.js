import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vuebus from './utils/vuebus'

Vue.use(Vuebus)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
