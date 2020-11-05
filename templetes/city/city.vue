<template>
	<view class="wrap">
		<u-button type="primary" @click="value = true">打开Picker</u-button>
		<city-select v-model="value" @city-change="cityChange"></city-select>
		<view class="flex align-center justify-center u-padding-30">
			{{input}}
		</view>
	</view>
</template>

<script>
import citySelect from '@/components/citySelect/u-city-select.vue'
	export default {
		components: {citySelect},
		data() {
			return {
				value: false,
				input: ''
			};
		},
		onLoad() {
			console.log(this.$u);
		},
		methods: {
			cityChange(e) {
				console.log(e);
				this.input = e.province.label + '-' + e.city.label + '-' + e.area.label;
			}
		}
	}
</script>

<style lang="scss" scoped>
.wrap {
	background-color: #f3f4f6;
}
</style>
