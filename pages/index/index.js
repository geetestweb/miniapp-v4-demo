Page({
  data: {
  },
  onLoad: function() {
  },
  onReady: function(){
  },
  toSlide:function(){
      swan.navigateTo({
          url: '../captcha/captcha',
      })
  },
  toBind: function () {
      swan.navigateTo({
          url: '../bindDemo/bind',
      })
  }
})
