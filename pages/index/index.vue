<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<!-- #ifdef MP-ALIPAY -->
		<captcha4 id="captcha" v-if="loadCaptcha" :captchaId="captchaId" onSuccess="captchaSuccess" />
		<!-- #endif -->

		<!-- #ifndef MP-ALIPAY -->
		<captcha4 id="captcha" v-if="loadCaptcha" :captchaId="captchaId" @Success="captchaSuccess" />
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				loadCaptcha: false,
				captchaId: '83ee748676c09d077c5c83e3b8a08e32'
			}
		},
		onLoad() {
			this.loadCaptcha = true
			this.$scope.captchaSuccess = this.captchaSuccess.bind(this)
		},
		methods: {
			captchaSuccess(data) {
				console.log("captcha-Success!", data);
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
