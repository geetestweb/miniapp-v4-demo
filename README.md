
# 配置参数

| 参数            | 必填 | 类型    | 默认值 | 描述                                                         |
| --------------- | ---- | ------- | ------ | ------------------------------------------------------------ |
| captchaId       | Y    | string  | -      | 验证码ID                                                     |
| language            | N    | string  | zh  | 语言 (zh - 中文，en - 英文)                                                        |
| offline         | N    | boolean | false  | 强制宕机模式，会直接触发Success事件。（ true - 强制宕机， false - 正常 ） |
| useNativeButton | N    | boolean | true   | 是否使用唤醒按钮  true - 带按钮模式， false - 无按钮模式（对于此类型，需要用户主动调用showCaptcha方法唤起验证界面 ） |
| riskType        | N    | string  | -      | 当服务端配置了结合风控融合，此字段可指定验证形式             |

 
## `useNativeButton`
可选参数：
1.true: 经典带按钮模式
2.false: 无按钮模式,对于此类型，需要用户主动调用showCaptcha方法唤起验证界面

>代码示例:

```js
<captcha4 useNativeButton="{{false}}"/>	

// 打开验证码弹窗
const captcha4 = requirePlugin('captcha4');
captcha4.showCaptcha();

```
## `riskType`

前端指定验证形式 **(需在后台配置为风控融合模式)**

可选参数：

1. match（消消乐验证）
2. winlinze（五子棋验证）
3. slide（滑动拼图验证）
4. icon（图标点选验证）
5. ai（一点即过）
6. word（文字点选验证）
7. phrase（字序点选验证）
8. nine（九宫格验证）


>代码示例:

```js
// 模板上插入配置，此处省略其它必传参数
<captcha4 riskType="slide"/>	
```

# MiniProgram 事件

## `Ready`

监听验证按钮的 DOM 生成完毕事件。
>代码示例:

```js
// wxml
<captcha4  bindReady="captchaReady"/>
//js  
captchaReady:function(){
    console.log('captcha-Ready!')
}
```

## `Error`
监听验证出错事件,刷新过多、静态资源加载失败、网络不给力等验证码能捕获到的错误(参考[ErrorCode](https://docs.geetest.com/gt4/apirefer/errorcode/web/))，都会触发Error回调。

**Error返回一个e，其中e.detail包含2个属性：code(错误码)、tips(错误提示)。我们在Error中要对challenge过期的情况做一个特殊的重置处理,代码如下**
>代码示例:

```js
// wxml
<captcha4  bindError="captchaError"/>
//js  
captchaError: function (e) {
        console.log('captcha-Error!', e.detail)
        // 这里对challenge9分钟过期的机制返回做一个监控，如果服务端返回code:21,tips:not proof，则重新调用api1重置
        if (e.detail.code === 21) {
            // 调用重置方法
        }
}
```

## `Success`

监听验证成功事件,返回一个result对象，result中的detail包含4个属性：lot_number、pass_token、captcha_output、gen_time，这些参数为当前验证成功的凭据，
二次验证时需要传入。
>代码示例:

```js
// wxml
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

## `Close`
用户关闭弹出来的验证时，会触发该回调。

>代码示例:

```js
// wxml
<captcha4  bindClose="captchaClose"/>
//js      
captchaClose:function(){
    console.log('captcha-Close!')
}
```

# MiniProgram 方法

## `showCaptcha`

显示验证窗(使用内置按钮模式，该接口不允许调用)

```js
const captcha4 = requirePlugin('captcha4');

captcha4.showCaptcha()
```

## `reset`

重置验证码

```js
const captcha4 = requirePlugin('captcha4');

captcha4.reset()
```

## `hiddenCaptcha`

关闭验证窗

```js
const captcha4 = requirePlugin('captcha4');

captcha4.hiddenCaptcha()
```


