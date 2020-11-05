<template>
	<view>
		<mescroll-uni :safearea="true" @down="downCallback" @up="upCallback" @init="mescrollInit">
			<view class="flex-ali u-padding-30">
				<text>HOME</text>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import {
		minScroll
	} from '@/mixins/minScroll.js'
	export default {
		mixins: [minScroll],
		data() {
			return {
				list: []
			};
		},
		mounted() {
		},
		methods: {
		}
	}
</script>

<style lang="scss">

</style>
