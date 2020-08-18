import Request from './request'
import store from '../store'
import storeage from '@/utils/storage.js';
const test = new Request();

const http = new Request();
http.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = ''; /* 根域名不同 */
	/* uni.getNetworkType({
		success: function(res) {
			// console.log(res.networkType);
		}
	}); */
	return config
})
http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	// let token = store.getters.token
	config.header = {
		...config.header
	}
	if (token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
		// 二次验证
		config.header = {
			Authorization: 'JWT ' + token,
		}
	} else {
		// console.log('!token');
	}
	return config;
})
http.interceptor.response((response) => { /* 请求之后拦截器 */
	return response.data;
})
export {
	http
};
