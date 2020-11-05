<template>
	<view>
		<view class="shop-item flex" v-for="(item,index) in List" :key="index">
			<image mode="aspectFill" class="shop-img" :src="item.url"></image>
			<view class="shop-content flex flex-direction">
				<h3 class="title">{{item.title}}</h3>
				<text class="type">{{item.type}}</text>
				<text class="number">{{item.people}}人已购买</text>
				<view class="flex align-center justify-between">
					<view class="shop">
						<text>￥{{ item.price }}</text>
						<text>￥{{ item.orignPrice }}</text>
					</view>
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shop-item {
		background-color: white;
		padding: 20rpx;
		margin-bottom: 20rpx;
		border-radius: 11rpx;
		.shop-img {
			width: 198rpx;
			height: 198rpx;
		}
		.shop-content {
			flex: 1;
			padding: 0 16rpx;
			.title {
				color: #1F2F45;
				font-size: 30rpx;
				font-weight: bold;
				@include text-overflow();
			}
			.type {
				display: inline-block;
				margin: 13rpx 0 16rpx;
				color: #999999;
				font-size: 22rpx;
				@include text-overflow();
			}
			.number {
				display: inline-block;
				color: #999999;
				font-size: 22rpx;
				margin-bottom: 13rpx;
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
						font-size: 26rpx;
						text-decoration: line-through;
					}
				}
			}
			.car {
				width: 64rpx;
				height: 64rpx;
			}
		}
	}
</style>
