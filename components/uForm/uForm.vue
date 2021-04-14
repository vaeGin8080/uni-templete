<template>
	<view class="wrap-form w-100 wrap u-relative" :style="{ height: height }">
		<scroll-view scroll-y="true" class="form-scroll">
			<u-form class="form" :model="form" ref="uForm" :label-style="{ color: '#333333', fontSize: '30rpx' }" :label-width="200"
			 label-align="left" label-position="top">
				<u-form-item label="标题" prop="draftTitle" :required="true">
					<u-input v-model="form.draftTitle" maxlength="35" placeholder="请输入标题" :custom-style="insStyle" />
				</u-form-item>
				<u-form-item label="稿件类型" label-position="left" :required="true">
					<u-radio-group v-model="form.draftType">
						<u-radio :active-color="color" label-size="24" v-for="(item, index) in typeList" :key="index" :name="item.type"
						 :disabled="item.disabled">
							{{ item.name }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<view v-if="form.draftType == 1">
					<u-form-item label="所在单位审核" label-position="left" :required="true">
						<u-radio-group v-model="form.unitAuditStatus">
							<u-radio :active-color="color" label-size="24" v-for="(item, index) in unitList" :key="index" :name="item.type"
							 :disabled="item.disabled">
								{{ item.name }}
							</u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item label="所在单位" prop="unitName" :required="true">
						<u-input v-model="form.unitName" placeholder="请输入所在单位" maxlength="30" :custom-style="insStyle" />
					</u-form-item>
					<u-form-item v-if="form.unitAuditStatus == 0" label="审核领导姓名" prop="unitLead" :required="true">
						<u-input v-model="form.unitLead" placeholder="请输入单位审核领导" :custom-style="insStyle" />
					</u-form-item>
				</view>
				<u-form-item label="联系人姓名" prop="contactName" :required="true">
					<u-input v-model="form.contactName" maxlength="10" placeholder="请输入联系人姓名" :custom-style="insStyle" />
				</u-form-item>
				<u-form-item label="备注">
					<u-input v-if="!downMenu" v-model="form.remark" placeholder="请输入备注" type="textarea" :height="50" :auto-height="true"
					 :custom-style="insStyle" />
				</u-form-item>
				<view class="fujian">
					<view class="fujian-top flex align-center justify-between">
						<h2 class="fj-title">附件</h2>
						<view class="flex align-center">
							<view class="flex-ali mt" @click="handleEditor">
								<text>在线编辑</text>
								<image src="../../static/img/fj-edit.png"></image>
							</view>
							<view class="flex-ali" @click="upload">
								<text>上传</text>
								<image src="../../static/img/fujian.png"></image>
							</view>
						</view>

					</view>
					<view class="u-p-10 flex flex-direction" v-if="form.fileurl && form.fileurl.length > 0">
						<view class="att-item flex align-center justify-between" v-for="(item, index) in form.fileurl" :key="index"
						 @click="openDocument(item.value)">
							<view class="name">{{ item.label }}</view>
							<image class="close" src="../../static/img/fujian-close.png" @click.stop="fjRemove(index)"></image>
						</view>
					</view>
					<view class="tip flex-ali" v-if="form.fileurl.length == 0 && !form.draftContent">
						<text>上传附件需要将稿件编辑为word或者压缩包上传</text>
					</view>
					<view v-if="form.draftContent">
						<view class="rich">
							<rich-text :nodes="form.draftContent"></rich-text>
						</view>
						<view class="rich-text flex align-center justify-end">
							<text @click="editorRemove">删除</text>
							<text @click="look">查看</text>
						</view>
					</view>
				</view>
			</u-form>
		</scroll-view>
		<view class="u-relative btn-wrap">
			<view class="btn-bg" @click="submit('save')"></view>
			<u-button @click="submit" type="primary">提交审核</u-button>
		</view>
		<u-toast ref="uToast" />
		<u-popup v-model="downMenu" mode="center" :width="500" :height="220" :mask-close-able="false" :closeable="true"
		 @close="close">
			<view class="pad-all" style="padding-top: 80rpx;">
				<u-line-progress :height="50" :striped="true" :percent="progress" :striped-active="true"></u-line-progress>
				<view class="flex-ali sd">
					<text class="u-progress-info">{{downTitle}}</text>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		newsUpload
	} from '@/api/news.js';
	import {
		openDocument
	} from '@/utils/utils.js'
	import {
		mapGetters
	} from 'vuex';
	export default {
		props: ['value'],
		data() {
			return {
				height: '663px',
				form: this.value,
				color: '#8A643B',
				progress: 0,
				uploadTask: null,
				downMenu: false,
				downTitle: '上传中',
				insStyle: {
					color: '#5f5f5f'
				},
				typeList: [{
						name: '普通发稿',
						disabled: false,
						type: 0
					},
					{
						name: '单位发稿',
						disabled: false,
						type: 1
					}
				],
				unitList: [{
						name: '是',
						disabled: false,
						type: 0
					},
					{
						name: '否',
						disabled: false,
						type: 1
					}
				],
				rules: {
					draftTitle: [{
						required: true,
						message: '请输入标题',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['blur']
					}],
					contactName: [{
						required: true,
						message: '请输入联系人姓名',
						trigger: 'blur'
					}],
					unitName: [{
						required: true,
						message: '请输入所在单位',
						trigger: 'blur'
					}],
					unitLead: [{
						required: true,
						message: '请输入所在单位领导姓名',
						trigger: 'blur'
					}]
				}
			};
		},
		mounted() {
			let sysheight = uni.getSystemInfoSync().windowHeight;
			this.height = `${sysheight}px`;
			console.log('mounted');
			console.log(this.height);
			this.$refs.uForm.setRules(this.rules);
		},
		computed: {
			...mapGetters(['userInfo', 'token'])
		},
		watch: {
			value: {
				handler(val) {
					this.form = val;
				},
				deep: true,
				immediately: true
			},
			form: {
				handler(val) {
					this.$emit('input', val);
				},
				deep: true,
				immediately: true
			}
		},
		methods: {
			// 提交
			submit(type) {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						if (this.form.fileurl.length == 0 && !this.form.draftContent) {
							uni.showToast({
								icon: 'none',
								title: '请上传附件'
							});
							return;
						}
						console.log('验证通过');
						this.$emit('submit', type);
					} else {
						console.log('验证失败');
					}
				});
			},
			// 上传附件
			upload() {
				let that = this;
				that.downTitle = '上传中';
				// #ifdef MP-WEIXIN
				wx.chooseMessageFile({
					count: 1,
					type: 'all',
					success(res) {
						const tempFilePaths = res.tempFiles;
						that.downMenu = true;
						that.uploadTask = uni.uploadFile({
							url: newsUpload(), //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0].path,
							name: 'file',
							header: {
								Authorization: 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
								'Tenant-Id': '000000',
								'Blade-Auth': that.userInfo.token_type + ' ' + that.token
							},
							success: uploadFileRes => {
								console.log(uploadFileRes.data);
								let r = JSON.parse(uploadFileRes.data);
								if (!r.success) {
									that.$refs.uToast.show({
										title: '上传失败，请重试',
										type: 'error'
									});
									return;
								}
								that.downMenu = false;
								that.progress = 0;
								that.uploadTask = null;
								uni.showToast({
									icon: 'success',
									title: '上传成功'
								})
								let data = r.data;
								console.log(data);
								that.form.fileurl.push({
									// label: data.originalName,
									label: tempFilePaths[0].name,
									value: data.name
								});
							},
							complete: s => {
								that.downMenu = false;
							},
							fail() {
								that.downMenu = false;
								uni.showToast({
									icon: 'none',
									title: '上传失败'
								})
							}
						});
						that.uploadTask.onProgressUpdate(res => {
							that.progress = res.progress;
							console.log('上传进度' + that.progress);
							// 测试条件，取消上传任务。
							if (res.progress >= 100) {
								that.downTitle = '请稍候...'
							}
						});
						console.log(that.form.fileurl);
					},
					fail() {}
				});
				// #endif
			},
			fjRemove(index) {
				this.form.fileurl.splice(index, 1);
			},
			close() {
				if (this.uploadTask) this.uploadTask.abort();

			},
			/* 编辑 */
			handleEditor() {
				this.$store.commit('handleEditor',this.form.draftContent)
				uni.navigateTo({
					url: `/pages/Editor/Editor?rich=true`
				})
			},
			/* 查看 */
			look() {
				uni.navigateTo({
					url: `/pages/Preview/Preview?rich=${encodeURIComponent(this.form.draftContent)}`
				})
			},
			editorRemove() {
				this.form.draftContent = ''
				this.$store.commit('handleEditor', '')
			},
			openDocument
		}
	};
</script>

<style lang="scss" scoped>
	.form-scroll {
		height: calc(100% - 60rpx);
	}

	.fujian {
		min-height: 300rpx;
		padding: 16rpx 32rpx;
		background-color: white;
		border-radius: 10rpx;
		margin-bottom: 20rpx;

		.fujian-top {
			padding: 20rpx 0 20rpx;
			border-bottom: 1rpx solid #eeeeee;

			h2 {
				font-size: 30rpx;
				font-weight: 500;
			}

			image {
				width: 32rpx;
				height: 32rpx;
				margin-left: 20rpx;
			}

			text {
				color: $color;
				font-size: 28rpx;
			}

			.mt {
				margin-right: 20upx;
			}

			.fj-title {
				position: relative;

				&::before {
					content: '*';
					position: absolute;
					display: inline-block;
					left: -16rpx;
					top: 0rpx;
					color: #fa3534;
					padding-top: 2rpx;
				}
			}
		}

		.att-item {
			margin-top: 20rpx;
			color: $color;

			.name {
				width: 100%;
				@include text-overflow();
				display: block;
			}

			.close {
				width: 36rpx;
				height: 36rpx;
				margin-left: 20rpx;
			}
		}
	}

	.tip {
		height: 160upx;
		background: #fff1ed;
		margin-top: 15upx;
		font-size: 24rpx;
		font-weight: 400;
		text-align: center;
		color: #c4674a;
		line-height: 33rpx;
	}

	.rich {
		min-height: 160rpx;
		padding: 20upx 0;
		max-height: 170upx;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.rich-text {
		color: $color;

		text {
			display: inline-flex;
			padding: 0 20upx;

			&:first-child {
				border-right: 1upx solid #D8D8D8;
			}
		}
	}

	.btn-wrap {
		position: absolute;
		left: 30rpx;
		bottom: 20rpx;
		width: calc(100% - 60rpx);
		height: 80rpx;
	}

	.btn-bg {
		position: absolute;
		left: -1rpx;
		bottom: 0;
		width: 232rpx;
		height: 80rpx;
		background: url(../../static/img/choose-draft.png) no-repeat;
		background-size: contain;
		z-index: 66;
	}

	.sd {
		margin-top: 20rpx;
	}
</style>
