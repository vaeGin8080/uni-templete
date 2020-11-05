<template>
	<view class="content flex" :style="{ height: height }">
		<swiperTab :index.sync="tabCurrentIndex" :navList="navList" @change="change" @scrolltolower="scrolltolower">
			<template v-slot:default="{item}">
				<prefereItem :List="item.orderList" :state="item.state"></prefereItem>
				<u-loadmore :status="item.loadingType" margin-top="20" margin-bottom="20"/>
			</template>
		</swiperTab>
	</view>
</template>

<script>
import swiperTab from '@/components/swiperTab/swiperTab.vue';
import prefereItem from './prefereItem.vue';
import Json from '@/Json';
export default {
	components: { swiperTab, prefereItem },
	data() {
		return {
			Json,
			tabCurrentIndex: 0,
			height: '663px',
			navList: [
				{
					state: 0,
					text: '全部',
					orderList: [],
					loadingType: 'nomore',
				},
				{
					state: 1,
					text: '已使用',
					orderList: [],
					loadingType: 'nomore',
				},
				{
					state: 2,
					text: '已过期',
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
				orderList.forEach((item, index) => {
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
}
</style>
