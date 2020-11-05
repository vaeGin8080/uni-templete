<template>
	<view>
		<view class="shop-item flex" :class="[state == 0 ? 'zc':'end']" v-for="(item,index) in List" :key="index">
			<view class="yhj-t flex align-center">
				<text>优惠劵</text>
			</view>
			<view class="shop-content flex flex-direction justify-between">
				<view class="flex align-center justify-between">
					<view class="pre-left flex align-end">
						<text>￥</text>
						<h3 class="title">{{item.price}}</h3>
					</view>
					<view class="pre-center flex flex-direction">
						<text class="desc">{{item.desc}}</text>
						<text>满{{item.price}}元可用</text>
						<text>{{item.startTime}} 至 {{item.endTime}}</text>
					</view>
					<text v-if="state == 0" class="pre-use">使用</text>
					<image v-else-if="state == 1" class="state" src="@/static/img/used.png"></image>
					<image v-else class="state" src="@/static/img/overdue.png"></image>
				</view>
				<view class="pre-foot flex align-center justify-between">
					<text>*特价商品不可用</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			List: {
				type: Array,
				default() {
					return [];
				}
			},
			state: {
				type: Number,
				default: 0
			}
		}
	}
</script>

<style lang="scss" scoped>
	.zc {
		background: white url(@/static/img/yhj-bg.png) no-repeat;
	}
	.end {
		background: white url(@/static/img/end-yhj.png) no-repeat;
	}
	.shop-item {
		background-size: cover;
		height: 225rpx;
		padding: 20rpx 20rpx 10rpx;
		margin-bottom: 17rpx;
		border-radius: 11rpx;
		.yhj-t {
			width: 100rpx;
			text {
				display: inline-block;
				width: 40rpx;
				font-size: 26rpx;
				color: #FFFFFF;
				margin-left: 20rpx;
			}
		}
		.shop-content {
			flex: 1;
			padding-top: 20rpx;
			.pre-left {
				color: #333333;
				text {
					display: inline-block;
					padding-bottom: 10rpx;
					font-size: 20rpx;
				}
				.title {
					font-size: 80rpx;
				}
			}
			.pre-center {
				padding: 0 38rpx;
				text {
					margin-bottom: 5rpx;
					color: #999999;
					font-size: 22rpx;
				}
				.desc {
					color: #656565;
					font-size: 26rpx;
				}
			}
			.pre-use {
				display: inline-block;
				width: 89rpx;
				height: 33rpx;
				background: #FFFFFF;
				border: 1px solid #FF0000;
				border-radius: 16rpx;
				color: #FD474F;
				font-size: 22rpx;
				text-align: center;
				line-height: 33rpx;
			}
			.state {
				width: 94rpx;
				height: 94rpx;
			}
			.pre-foot {
				color: #999999;
				font-size: 22rpx;
			}
		}
	}
</style>
