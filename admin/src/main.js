import Vue from 'vue'
import App from './App.vue'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/font/iconfont.css"
import router from "./router"
import store from "./store"

require("./plugins/fetch.js")
require("./directive/index.js")
const userInfo = window.localStorage.getItem("userInfo");
if(userInfo) {
  store.commit("setUserInfo", JSON.parse(userInfo))
}
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
