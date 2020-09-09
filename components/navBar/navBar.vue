<template>
	<view>
		<view class="navbar" :class="{shadow_b: isShadow}">
			<view 
			v-for="(item, index) in navList" :key="index" 
			class="nav-item" 
			:class="{ current: tabCurrentIndex === index }" 
			@tap="tabClick(index)">{{ item.text }} 
			<text class="border_b" :style="{borderBottomColor: themeColor}" v-show="tabCurrentIndex === index"></text>
			<text class="number" v-if="item.count">({{item.count}})</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		navList: {
			type: Array,
			default() {
				return [];
			}
		},
		tabCurrentIndex: {
			type: Number | String,
			default: 0
		},
		themeColor: {
			type: Number | String,
			default: '#FD474F'
		},
		isShadow: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		variables() {
			return '#FD474F';
		}
	},
	data() {
		return {};
	},
	created() {
	},
	methods: {
		tabClick(index) {
			this.$emit('tabClick', index);
		}
	}
};
</script>
<style lang="scss" scoped>
.shadow_b{
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
}
.navbar {
	display: flex;
	height: 40px;
	padding: 0 5px;
	background: #fff;
	position: relative;
	z-index: 10;
	.nav-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: 28upx;
		color: #656565;
		position: relative;
		.number {
			margin-left: 15upx;
			font-family:PingFangSC-Medium,PingFang SC;
		}
		.border_b {
			position: absolute;
			left: 50%;
			bottom: 0;
			transform: translateX(-50%);
			width: 44px;
			height: 0;
			border-bottom: 2px solid $color;
		}
		&.current {
			color: $color;
			/* &:after {
				content: '';
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				width: 44px;
				height: 0;
				border-bottom: 2px solid $color;
			} */
		}
	}
}
</style>
