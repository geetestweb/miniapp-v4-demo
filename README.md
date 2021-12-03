## 极验快应用插件接入指南

此版本仅支持小程序转快应用项目

1.在本demo的components文件夹下获取组件，自行复制到项目

2.参考快应用组件 [使用方法](https://qapp-chimera.vivo.com.cn/framework/custom-component/basis.html)

3.在快应用后台添加以下合法域名 https://gcaptcha4.geetest.com https://static.geetest.com

4.快应用仅支持ES5的语法，所以要支持它必须借助babel之类的语法分析转换工具，同时还要在代码中注入[polyfill](https://doc.quickapp.cn/tutorial/framework/using-async.html)

```js
npm i @babel/runtime -D

const injectRef = Object.getPrototypeOf(global) || global

// 注入regeneratorRuntime
injectRef.regeneratorRuntime = require('@babel/runtime/regenerator')
// 如果使用的 hap-toolkit 版本低于0.0.38(babel 版本低于 7)，则按下面的方式引入
// injectRef.regeneratorRuntime = require('babel-runtime/regenerator')
```

### 插件配置参数

| 参数            | 类型    | 默认值 | 描述                                                         |
| --------------- | ------- | ------ | ------------------------------------------------------------ |
| lang            | string  | zh-cn  | 语言                                                         |
| captchaId       | string  | -      | 验证码ID                                                     |
| offline         | boolean | false  | 强制宕机模式，会直接触发Success事件。（ true - 强制宕机， false - 正常 ） |
| useNativeButton | boolean | false  | 是否使用极验内置唤醒按钮（ true - 使用， false - 不使用 ）   |
| riskType        | string  | -      | 结合风控融合，指定验证形式                                   |

### 示例代码

#### 页面json文件引用captcha4组件

```json
{
    "usingComponents": {
        "captcha4": "/components/captcha4/captcha4"
    }
}
```

#### 页面qxml文件嵌入captcha4标签

```html
<captcha4 id="captcha" captchaId="{{captchaId}}" bindReady="captchaReady" bindSuccess='captchaSuccess' bindClose='captchaClose' bindError="captchaError" />
```

### 事件

#### onReady

监听验证按钮的DOM生成完毕事件

代码示例：

```js
// qxml
<captcha4  bindReady="captchaReady"/>
//js  
captchaReady:function(){
    console.log('captcha-Ready!')
}
```

#### onError

监听验证出错事件,刷新过多、静态资源加载失败、网络不给力等验证码能捕获到的错误(参考[[ErrorCode\]](https://docs.geetest.com/sensebot/apirefer/errorcode/web))，都会触发onError回调。

**onError返回一个e，其中e.detail包含2个属性：code(错误码)、tips(错误提示)。我们在onError中要对challenge过期的情况做一个特殊的重置处理,代码如下：**

```js
// qxml
<captcha4  bindError="captchaError"/>
//js  
captchaError: function (e) {
    console.log('captcha-Error!', e.detail)
    // 这里对challenge9分钟过期的机制返回做一个监控，如果服务端返回code:21,tips:not proof，则重新调用api1重置
    if (e.detail.code === 21) {
        var that = this
        // 需要先将插件销毁
        that.setData({ loadCaptcha: false })
        // 重新调用api1
        that.captchaRegister()
    }
}
```

#### onSuccess

监听验证成功事件,返回一个result对象

代码示例：

```js
// qxml
<captcha4  bindSuccess="captchaSuccess"/>
//js  
captchaSuccess:function(result){
    console.log('captcha-Success!')
    // 这里先将result中的参数保存，待进行二次验证时传入
    this.setData({
         result: result.detail
    })
}
```

#### onClose

用户关闭弹出来的验证时，会触发该回调。

代码示例：

```js
// qxml
<captcha4  bindClose="captchaClose"/>
//js      
captchaClose:function(){
    console.log('captcha-Close!')
}
```

### 接口列表


#### showCaptcha

显示验证窗(使用内置按钮模式，该接口不允许调用)

```js
const captcha = this.selectComponent('#captcha');

captcha.showCaptcha()
```

#### reset

重置验证码

```js
const captcha = this.selectComponent('#captcha');

captcha.reset()
```

#### hiddenCaptcha

关闭验证窗

```js
const captcha = this.selectComponent('#captcha');

captcha.hiddenCaptcha()
```



















