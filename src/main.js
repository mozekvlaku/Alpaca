import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import Buefy from 'buefy'
import './alpaca_res/fujin_styles.scss'
Vue.use(Buefy)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#fujin')
