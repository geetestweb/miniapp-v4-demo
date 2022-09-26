<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>

    <!-- #ifdef MP-ALIPAY -->
    <captcha4
      id="captcha"
      v-if="loadCaptcha"
      :captchaId="captchaId"
      onSuccess="captchaSuccess"
      :riskType="riskType"
	  :useNativeButton="false"
    />
    <!-- #endif -->

    <!-- #ifndef MP-ALIPAY -->
    <captcha4
      ref="captcha"
      v-if="loadCaptcha"
      :captchaId="captchaId"
      @Success="captchaSuccess"
      :riskType="riskType"
	  :useNativeButton="false"
    />
    <!-- #endif -->

    <button class="submit" @click="openCaptcha"> 打开 </button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
      loadCaptcha: false,
      captchaId: "83ee748676c09d077c5c83e3b8a08e32",
      riskType: "slide",
    };
  },
  created() {
    this.loadCaptcha = true;
    this.captchaId = "83ee748676c09d077c5c83e3b8a08e32";
    this.$scope.captchaSuccess = this.captchaSuccess.bind(this); // 解决支付宝小程序无法触发回调问题
  },
  methods: {
    captchaSuccess(data) {
      console.log("captcha-Success!", data);
	  },
	  openCaptcha() {
		// #ifdef  MP-WEIXIN || MP-ALIPAY
		const captcha4 = requirePlugin('captcha4')
		  captcha4.showCaptcha()
		// #endif

		// #ifndef  MP-WEIXIN || MP-ALIPAY
		  this.$refs.captcha.showCaptcha()
		// #endif
	}
  },
};
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
.submit{
	width: 100%;
}
.text-area {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
