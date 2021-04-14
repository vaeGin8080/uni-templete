export const getCurrentLocation = () => {
	let vm = this;
	return new Promise((reslove, reject) => {
		wx.getSetting({
			success: (res) => {
				if (res.authSetting['scope.userLocation'] != undefined && res.authSetting[
						'scope.userLocation'] != true) {
					wx.showModal({
						title: '请求授权当前位置',
						content: '需要获取您的地理位置，请确认授权',
						success: function(res) {
							if (res.cancel) {
								wx.showToast({
									title: '拒绝授权',
									icon: 'none',
									duration: 1000
								})
							} else if (res.confirm) {
								wx.openSetting({
									success: function(dataAu) {
										if (dataAu.authSetting[
												"scope.userLocation"] ==
											true) {
											wx.showToast({
												title: '授权成功',
												icon: 'success',
												duration: 1000
											})
											reslove();
										} else {
											wx.showToast({
												title: '授权失败',
												icon: 'none',
												duration: 1000
											})
										}
									}
								})
							}
						}
					})
				} else if (res.authSetting['scope.userLocation'] == undefined) {
					reslove();
				} else {
					reslove();
				}
			}
		})
	})
}

// 微信获得用户经纬度
export const getLocation = () => {
	let that = this;
	return new Promise((reslove,reject)=>{
		wx.getLocation({
			type: 'gcj02',
			success: function(res) {
				var latitude = res.latitude
				var longitude = res.longitude
				let params = {
					latitude,
					longitude
				}
				reslove(params)
			},
			fail: function(res) {
				reject()
				console.log('fail' + JSON.stringify(res))
			}
		})
	})
	
}
//获取用户位置
export const getAddress = (latitude, longitude)=> {
	let that = this;
	let key = 'CVZBZ-AJNLR-WUVW3-WGTQC-6JODH-ZSFZF';
	return new Promise((reslove,reject)=>{
		uni.request({
			url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${key}`,
			success: function(res) {
				// console.log('位置', res);
				reslove(res.data.result.address)
			},
			fail() {
				reject()
			}
		})
	})
}

// 支付
export const payWeixin = (res) => {
	return new Promise((reslove, reject) => {
		console.log({
			provider: 'wxpay',
			timeStamp: res.timeStamp,
			nonceStr: res.nonceStr,
			package: res.packAge,
			signType: res.signType,
			paySign: res.paySign,
		})
		wx.requestPayment({
			provider: 'wxpay',
			timeStamp: res.timeStamp,
			nonceStr: res.nonceStr,
			package: res.packAge,
			signType: res.signType,
			paySign: res.paySign,
			success(res) {
				console.log('success');
				wx.showToast({
					title: '支付成功',
				})
				reslove()
			},
			fail(res) {
				console.log('fail');
				wx.showToast({
					icon: 'none',
					title: '支付失败',
				})
				reject()
			}
		})
	})
}
