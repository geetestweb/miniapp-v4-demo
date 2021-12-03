// 本次转换使用的转换器版本：1.3.2
import "./global-qa.js"; // app.js
const injectRef = Object.getPrototypeOf(global) || global

// 注入regeneratorRuntime
injectRef.regeneratorRuntime = require('@babel/runtime/regenerator')
// 如果使用的 hap-toolkit 版本低于0.0.38(babel 版本低于 7)，则按下面的方式引入
// injectRef.regeneratorRuntime = require('babel-runtime/regenerator')

App({
  onLaunch() { }

});