/**
 * Request 0.0.8
 * @Class uni-app request网络请求库
 * @Author lu-ch
 * @Date 2019-07-25
 * @Email webwork.s@qq.com
 * http://ext.dcloud.net.cn/plugin?id=392
 * **/
export default class Request {
  config = {
    baseUrl: '',
    method: 'GET',
    dataType: 'json',
    responseType: 'text'
  }

  static posUrl (url) { /* 判断url是否为绝对路径 */
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
  }

  interceptor = {
    request: (f) => {
      if (f) {
        this.requestBeforeFun = f
      }
    },
    response: (f) => {
      if (f) {
        this.requestComFun = f
      }
    }
  }

  static requestBeforeFun (config) {
    return config
  }

  static requestComFun (response) {
    return response
  }

  setConfig (f) {
    this.config = f(this.config)
  }

  request (options = {}) {
    options.baseUrl = this.config.baseUrl
    options.dataType = options.dataType || this.config.dataType
    options.responseType = options.responseType || this.config.responseType
    options.url = Request.posUrl(options.url) ? options.url : (options.baseUrl + options.url)
    options.data = options.data || {};
    options.header = options.header || this.config.header
    options.method = options.method || this.config.method
    return new Promise((resolve, reject) => {
      let next = true
      let _config = null
      options.complete = (response) => {
        let statusCode = response.statusCode
        response.config = _config
        response = this.requestComFun(response)
        if (statusCode === 200) { // 成功
          resolve(response)
        } else {
          reject(response)
        }
      }
      let cancel = (t = 'handle cancel', config = options) => {
        let err = {
          errMsg: t,
          config: config
        }
        reject(err)
        next = false
      }

      _config = { ...this.requestBeforeFun(options, cancel) }
      if (!next) return
      uni.request(_config)
    })
  }

  get (url, data, options = {}) {
    return this.request({
      url,
      data,
      method: 'GET',
      ...options,
	  header: {
	    'Content-Type': ''
	  },
    })
  }

  post (url, data, options = {}) {
    return this.request({
      url,
      data,
      method: 'POST',
      ...options,
	  header: {
	    'Content-Type': 'application/json;charset=UTF-8'
	  },
    })
  }
  delete (url, data, options = {}) {
    return this.request({
      url,
      data,
      method: 'DELETE',
      ...options,
	  header: {
	    'Content-Type': 'application/json;charset=UTF-8'
	  },
    })
  }
  put (url, data, options = {},header={}) {
    return this.request({
      url,
      data,
      method: 'PUT',
      ...options,
  	  header: {
  	    'Content-Type': 'application/json;charset=UTF-8',
		...header
  	  },
    })
  }
  patch (url, data, options = {},header={}) {
    return this.request({
      url,
	  data,
      method:'PATCH',
      ...options,
      header: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
  }
}
