<template>
	<view class="shop-wrap flex flex-wrap justify-between">
		<view class="shop-item flex flex-direction" v-for="(item, index) in List" :key="index">
			<image mode="aspectFill" :class="['shop-img', index % 2 == 0 ? 'odd' : 'even']" :src="item.url"></image>
			<view class="shop-content flex flex-direction">
				<h3 class="title">{{ item.title }}</h3>
				<!-- 首页显示 -->
				<view class="xing">
					<view class="" v-if="breed !== 'member'">
						<!-- <image src="../../static/img/xing-fill.png"></image> -->
						<!-- <image src="../../static/img/xing.png"></image> -->
					</view>
				</view>
				<!-- 积分显示 -->
				<view v-if="breed == 'member'" class="flex align-center justify-between">
					<view class="shop flex align-center">
						<text>{{ item.price }}积分</text>
						<view class="shop-r flex">
							<text>+￥{{item.price}}</text>
							<text>￥{{ item.orignPrice }}</text>
						</view>
						
					</view>
				</view>
				<!-- 首页显示 -->
				<view v-else class="flex align-center justify-between">
					<view class="shop">
						<text>￥{{ item.price }}</text>
						<text>￥{{ item.orignPrice }}</text>
					</view>
					<view class="shop-bg">
						<text>{{ item.zhe }}</text>
					</view>
				</view>
			</view>
		</view>
		<slot></slot>
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
		breed: {
			type: String,
			default: ''
		}
	}
};
</script>

<style lang="scss" scoped>
.shop-wrap {
	align-items: flex-start;
}
.shop-item {
	width: 49%;
	background-color: white;
	margin-bottom: 20rpx;
	border-radius: 11rpx;
	.shop-img {
		width: 100%;
		border-top-left-radius: 11rpx;
		border-top-right-radius: 11rpx;
	}
	.odd {
		height: 276rpx;
	}
	.even {
		height: 259rpx;
	}
	.shop-content {
		flex: 1;
		// height: 137rpx;
		padding: 20rpx;
		.title {
			color: #1f2f45;
			font-size: 30rpx;
			font-weight: bold;
			@include text-overflow();
		}
		.xing {
			margin-bottom: 15rpx;
			image {
				width: 22rpx;
				height: 22rpx;
			}
		}
		.shop-bg {
			width: 82rpx;
			height: 30rpx;
			// background: url(../../static/img/zhekou.png) no-repeat;
			background-size: contain;
			color: #fe474f;
			font-size: 24rpx;
			text {
				margin-left: 30rpx;
			}
		}
		.shop {
			margin-bottom: 15rpx;
			text {
				&:first-child {
					color: #fe474f;
					font-size: 30rpx;
					margin-right: 5rpx;
				}
				&:last-child {
					color: #999999;
					text-decoration: line-through;
				}
			}
			.shop-r {
				text {
					font-size: 23rpx;
					&:first-child {
						color: #fe474f;
						margin-right: 5rpx;
					}
					&:last-child {
						color: #999999;
						text-decoration: line-through;
					}
				}
			}
		}
	}
}
</style>
