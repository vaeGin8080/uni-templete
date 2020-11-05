<template>
	<view class="content flex" :style="{ height: height }">
		<loading text="加载中.." mask="true" click="true" ref="loading"></loading>
		<swiperTab :index.sync="tabCurrentIndex" :navList="navList" @change="change" @scrolltolower="scrolltolower">
			<template v-slot:default="{item}">
				<recommendItem v-if="item.state == 0" :List="item.orderList"></recommendItem>
				<shopItem v-else :List="item.orderList"></shopItem>
				<u-loadmore :status="item.loadingType" margin-top="20" margin-bottom="20" bg-color="#f5f5f5"/>
			</template>
		</swiperTab>
	</view>
</template>

<script>
import swiperTab from '@/components/swiperTab/swiperTab.vue';
import recommendItem from './recommendItem.vue';
import shopItem from './shopItem.vue';
import Json from '@/Json';
export default {
	components: { swiperTab,recommendItem,shopItem },
	data() {
		return {
			Json,
			tabCurrentIndex: 0,
			height: '663px',
			navList: [
				{
					state: 0,
					text: '提拉米苏',
					orderList: [],
					loadingType: 'nomore',
				},
				{
					state: 1,
					text: '水果拼盘',
					orderList: [],
					loadingType: 'nomore',
				},
			],
			show: false
		};
	},
	onLoad() {
		let sysheight = uni.getSystemInfoSync().windowHeight;
		this.height = `${sysheight}px`;
		this.init();
	},
	onReady() {
		this.$refs.loading.open();
	},
	methods: {
		async init(source) {
			//这里是将订单挂载到tab列表下
			let index = this.tabCurrentIndex;
			let navItem = this.navList[index];
			let state = navItem.state;
			if (source === 'tabChange' && navItem.loaded === true) {
				//tab切换只有第一次需要加载数据
				console.log('tab');
				return;
			}
			if (navItem.loadingType === 'loading') {
				//防止重复加载
				return;
			}
			navItem.loadingType = 'loading';
			setTimeout(() => {
				let orderList = Json.orderList.filter(item => item.state == navItem.state)[0].goodsList;
				Json.swiperList.forEach((item, index) => {
					navItem.orderList.push(item);
				});
				//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
				this.$set(navItem, 'loaded', true);
				//判断是否还有数据， 有改为 more， 没有改为nomore
				console.log(orderList.length);
				navItem.loadingType = 'loadmore';
				if(orderList.length<=5) {
					navItem.loadingType = 'nomore';
				}
				this.$refs.loading.close();
			}, 500);
		},
		change(index) {
			this.tabCurrentIndex = index
			this.init('tabChange')
		},
		scrolltolower() {
			this.init()
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	background-color: #f5f5f5;
}
</style>
