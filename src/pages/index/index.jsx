import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import Taro, { requirePlugin, getCurrentInstance } from "@tarojs/taro";

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide() { }
  
  captchaSuccess(data) {
    console.log('captchaSuccess',data)
  }
  openCaptcha() {
    // 组件式调用
    // const { page } = getCurrentInstance()
    // const captcha4 = page.selectComponent('#captcha4')
    // captcha4.showCaptcha()

    // 插件式调用
    const captcha4 = requirePlugin('captcha4') 
    captcha4.showCaptcha()
  }
  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <View className='btn' onClick={() => {this.openCaptcha() }}>打开验证码</View>
        <captcha4
          id="captcha4"
          captchaId="83ee748676c09d077c5c83e3b8a08e32"
          hideSuccess={true}
          bindReady={this.captchaReady}
          onReady={this.captchaReady}
          onSuccess={this.captchaSuccess}
          bindSuccess={this.captchaSuccess}
          useNativeButton={false}
          ></captcha4>
      </View>
    )
  }
}
