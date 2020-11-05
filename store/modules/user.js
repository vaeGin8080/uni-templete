import storeage from '@/utils/storage.js';

export default {
	state: {
		token: storeage.get('token') || '', // 用户token
		userInfo: storeage.get('userInfo') || {}, //用户i信息
	},
	mutations: {
		// 用户信息
		handleUserInfo(state, data) {
			console.log(data);
			state.userInfo = data
			storeage.set('userInfo', state.userInfo)
		},
		handleToken(state, data) {
			state.token = data
			storeage.set('token', state.token)
		},
		// 判断是否登录
		isLogin(state, data) {
			// console.log(state.token);
			if (!!state.token) {
				actionPush()
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		},
		// 退出登录
		editLogin(state, data) {
			state.token = ''
			storeage.set('token', state.token)
			storeage.clear()
			storeage.set('isAuth', true)
			uni.reLaunch({
				url: '/pages/login/login'
			})
		},
	},
	actions: {
		// 请求用户信息
		getUserInfo(store, data) {
			return new Promise(async (reslove, reject) => {
				try {
					reslove()
				} catch (e) {
					//TODO handle the exception
				}
			})
		},
		// 登录
		getLogin(store, data) {
			return new Promise(async (reslove, reject) => {
				try {
					reslove()
				} catch (e) {
					//TODO handle the exception
				}
			})
		},
	},
	getters: {
		userInfo: state => state.userInfo,
	}
}
