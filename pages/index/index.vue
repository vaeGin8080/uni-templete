<template>
	<view class="content">
		<u-tag text="雪月夜" type="success" />
		<u-toast ref="uToast" />
		<u-action-sheet :list="list" v-model="show"></u-action-sheet>
			<u-button @click="show = true">打开ActionSheet</u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					text: '点赞',
					color: 'blue',
					fontSize: 28
				},
				{
					text: '分享'
				},
				{
					text: '评论'
				}
			],
			show: false
		};
	},
	onLoad() {
		console.log(this.$u.config.v);
	},
	methods: {
		showToast() {
			this.$refs.uToast.show({
				title: '登录成功',
				type: 'success',
				url: '/pages/user/index'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
}
</style>
