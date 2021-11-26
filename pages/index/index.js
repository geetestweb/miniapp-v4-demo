Page({
  data: {
  },
  onLoad: function() {
  },
  onReady: function(){
  },
  toSlide:function(){
      wx.navigateTo({
          url: '../captcha/captcha',
      })
  },
  toBind: function () {
      wx.navigateTo({
          url: '../bindDemo/bind',
      })
  }
})
