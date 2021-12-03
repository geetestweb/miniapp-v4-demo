Page({
  data: {
  },
  onLoad: function() {
  },
  onReady: function(){
  },
  toSlide:function(){
      my.navigateTo({
          url: '../captcha/captcha',
      })
  },
  toBind: function () {
    my.navigateTo({
          url: '../bindDemo/bind',
      })
  }
})
