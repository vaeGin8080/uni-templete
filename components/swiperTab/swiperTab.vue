<template>
	<view class="swiper-tab flex-sub flex flex-direction justify-between">
		<navBar :list="navList" :navList="navList" :tabCurrentIndex="tabCurrentIndex" @tabClick="tabClick"></navBar>
		<swiper class="swiper" :current="tabCurrentIndex" @change="change" :indicator-dots="false">
			<swiper-item v-for="(item,index) in navList" :key="index">
				<scroll-view
					@scrolltolower="scrolltolower" 
					:refresher-enabled="true" 
					refresher-enabled="true"
					:refresher-triggered="triggered"
					@refresherrefresh="onRefresh"
					scroll-y="true" 
					style="height: 100%">
					<view class="pre-wrap w-100 h-100">
						<slot :item="item"></slot>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import navBar from '@/components/navBar/navBar.vue';
export default {
	components: { navBar },
	props: {
		navList: {
			type: Array,
			default() {
				return []
			}
		},
		index: {
			type: Number,
			default: 0
		},
		triggered: {
			type: Boolean,
			default: true
		},
	},
	data() {
		return {
			hasNext: true,
			tabCurrentIndex: this.index,
		};
	},
	watch: {
		index(news) {
			this.tabCurrentIndex = news
		}
	},
	onLoad() {
	},
	computed: {
	},
	methods: {
		scrolltolower(e) {
			this.$emit('scrolltolower');
		},
		onRefresh() {
			this.$emit('onRefresh');
		},
		tabClick(index) {
			this.tabCurrentIndex = index;
		},
		change(e) {
			this.tabCurrentIndex = e.detail.current
			this.$emit('change', this.tabCurrentIndex);
		},
	}
};
</script>

<style lang="scss" scoped>
	/* #ifdef MP-WEIXIN */
	.swiper-tab {
		width: 100vw;
		height: 100vh;
	}
	/* #endif */
	.swiper {
		// height: calc(100% - 40px);
		flex: 1;
	}
	.pre-wrap {
		padding: 20rpx 15rpx;
		
	}
</style>
