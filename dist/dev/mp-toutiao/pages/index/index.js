"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello",
      loadCaptcha: false,
      captchaId: "83ee748676c09d077c5c83e3b8a08e32",
      riskType: "slide"
    };
  },
  created() {
    this.loadCaptcha = true;
    this.captchaId = "83ee748676c09d077c5c83e3b8a08e32";
    this.$scope.captchaSuccess = this.captchaSuccess.bind(this);
  },
  methods: {
    captchaSuccess(data) {
      console.log("captcha-Success!", data);
    },
    openCaptcha() {
      this.$refs.captcha.showCaptcha();
    }
  }
};
if (!Array) {
  const _component_captcha4 = common_vendor.resolveComponent("captcha4");
  _component_captcha4();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.title),
    b: $data.loadCaptcha
  }, $data.loadCaptcha ? {
    c: common_vendor.sr("captcha", "31d33f96-0"),
    d: common_vendor.o($options.captchaSuccess),
    e: common_vendor.p({
      captchaId: $data.captchaId,
      riskType: $data.riskType,
      useNativeButton: false
    })
  } : {}, {
    f: common_vendor.o((...args) => $options.openCaptcha && $options.openCaptcha(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/huangjundong/Documents/work/\u5C0F\u7A0B\u5E8Fdemo/4.0\u516C\u6709/test/my-vue3-project/src/pages/index/index.vue"]]);
tt.createPage(MiniProgramPage);
