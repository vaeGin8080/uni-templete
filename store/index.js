import vue from 'vue'
import vuex from 'vuex'
import storeage from '@/utils/storage.js';
vue.use(vuex)
const store = new vuex.Store({
	modules: {
	},
	state: {
		loading: true,
	},
	mutations: {
		handleLoading(state,data) {
			state.loading = data
		},
	},
	actions: {
	},
	getters: {
		loading: state=>state.loading,
	}
})

export default store
