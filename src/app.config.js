export default defineAppConfig({
  pages: [
    'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  plugins: {
    captcha4: {
      version: '2.7.0',
      provider: 'wx1629d117cf9be937'
    }
  }
})
