// miniprogram/pages/captcha.js

const assign = "dd68c10db501ee386f3b0387842d29d0";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    captchaId: assign,
    loadCaptcha: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loadCaptcha: true,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  captchaValidate: function () {
    var self = this;
    var data = self.data.result;

    console.log(data);

    if (!data) {
      console.log("请先完成验证！");
      return;
    }
    swan.request({
      url:
        "https://gt4.geetest.com/demov4/demo/login?t=" + new Date().getTime(),
      method: "GET",
      dataType: "json",
      data: Object.assign({}, data, {
        captcha_id: self.data.captchaId,
      }),
      success: function (res) {
        swan.showToast({
          title: res.data.result,
        });
      },
      fail: function () {
        console.log("error");
      },
    });
  },

  captchaSuccess: function (result) {
    console.log("captcha-Success!");
    this.setData({
      result: result.detail,
    });
    this.captchaValidate();
  },
  captchaReady: function () {
    console.log("captcha-Ready!");
  },
  captchaClose: function () {
    console.log("captcha-Close!");
  },
  captchaError: function (e) {
    console.log("captcha-Error!", e.detail);
    // 这里对challenge9分钟过期的机制返回做一个监控，如果服务端返回code:21,tips:not proof，则重新调用重置
    if (e.detail.code === 21) {
      var self = this;
      // 需要先将插件销毁
      self.setData({ loadCaptcha: false });
      // 重新调用api1
      self.captchaRegister();
    }
  },
  reset: function () {
    const captcha = this.selectComponent("#captcha");

    captcha.reset();
  },
  btnSubmit: function () {
    // 进行业务逻辑处理
    console.log("用户密码效验完毕，打开验证码");
    // 唤起验证码
    this.verify();
  },
  verify: function () {
    const captcha = this.selectComponent("#captcha");

    captcha.showCaptcha();
  },
});
