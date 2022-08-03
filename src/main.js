import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
// eslint-disable-next-line no-unused-vars
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import $ from 'jquery'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use($)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
