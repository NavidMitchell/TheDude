import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader'

Vue.config.productionTip = false
Vue.config.ignoredElements = [/ion-\w*/]

// Bind the IonPhaser custom element to the window object
defineIonPhaser(window)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
