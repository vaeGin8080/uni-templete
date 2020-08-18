import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
Vue.use(uView);
Vue.config.productionTip = false
import store from './store'
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
    ...App
})

app.$mount()
