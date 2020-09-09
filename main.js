import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
Vue.use(uView);
Vue.config.productionTip = false
import loading from "./components/loading/w-loading.vue";
Vue.component('loading',loading)
import store from './store'
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
    ...App
})

app.$mount()
