import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
export const minScroll = {
	components: {MescrollUni},
	data() {
		return {
			mescroll: null
		}
	},
	created() {
	},
	methods: {
		// mescroll组件初始化的回调,可获取到mescroll对象
		mescrollInit(mescroll) {
			this.mescroll = mescroll;
		},
		/*下拉刷新的回调 */
		downCallback(mescroll) {
			mescroll.resetUpScroll();
		},
		upCallback(mescroll) {
			// 先清空列表,显示加载进度
			//联网加载数据
			setTimeout(()=>{
				try{
					mescroll.endSuccess(1);
				}catch(e){
					//TODO handle the exception
					mescroll.endErr();
				}
			},500)
		},
	}
}