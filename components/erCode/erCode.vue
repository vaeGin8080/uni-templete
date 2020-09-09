<template>
	<view>
		<tki-qrcode
			v-if="ifShow"
			cid="qrcode1"
			ref="qrcode"
			:val="val"
			:size="size"
			:unit="unit"
			:background="background"
			:foreground="foreground"
			:pdground="pdground"
			:iconSize="iconsize"
			:lv="lv"
			:onval="onval"
			:loadMake="loadMake"
			:usingComponents="true"
			@result="qrResult"
		/>
	</view>
</template>

<script>
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
	export default {
		components: {
			tkiQrcode
		},
		props: ['val'],
		data() {
			return {
				ifShow: true,
				size: 356, // 二维码大小
				unit: 'upx', // 单位
				background: '#ffffff', // 背景色
				foreground: '#000000', // 前景色
				pdground: '#000000', // 角标色
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '' // 二维码生成后的图片地址或base64
			};
		},
		methods: {
			qrResult(val) {
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
