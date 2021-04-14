<template>
	<view>
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
				list: [],
				value: '',
				input: ''
			};
		},
		mounted() {
		},
		methods: {
			cityChange(e) {
				console.log(e);
				this.input = e.province.label + '-' + e.city.label + '-' + e.area.label;
			}
		}
	}
</script>

<style lang="scss">

</style>
