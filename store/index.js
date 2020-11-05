import vue from 'vue'
import vuex from 'vuex'
import storeage from '@/utils/storage.js';
import user from './modules/user.js'
vue.use(vuex)
const store = new vuex.Store({
	modules: {
		user: user
	},
	state: {
		loading: true,
	},
	mutations: {
	},
	actions: {
	},
	getters: {
	}
})

export default store
