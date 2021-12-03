// Type definitions for quickapp web

/**注册一个快应用 */
declare function App(param: QuickApp.AppParam): void;

/**注册一个页面 */
declare function Page(param: QuickApp.PageParam): void;

/**注册一个组件 */
declare function Component(param: QuickApp.ComponentParam): void;

/**全局函数 可以获取到快应用实例 */
declare function getApp(): QuickApp.AppParam;

/**获取当前页面栈的实例 以数组形式按栈的顺序给出 第一个元素为首页 最后一个元素为当前页面 */
declare function getCurrentPages(): Array<QuickApp.Page>;

declare var qa: QuickApp.qa;

// #endregion

declare type IAnyObject = Record<string, any>;

declare namespace QuickApp {
  // #region QuickApp interfaces
  /**指定快应用的生命周期函数等 */
  interface AppParam {
    /**
     * 生命周期函数--监听快应用初始化
     * 当快应用初始化完成时 会触发 onLaunch（全局只触发一次）
     */
    onLaunch?: () => void;

    /**
     * 生命周期函数--监听快应用显示
     * 当快应用启动 或从后台进入前台显示 会触发 onShow
     */
    onShow?: () => void;

    /**
     * 生命周期函数--监听快应用隐藏
     * 当快应用从前台进入后台 会触发 onHide
     */
    onHide?: Function;

    /**
     * 错误监听函数
     * 当快应用发生脚本错误 或者 api 调用失败时 会触发 onError 并带上错误信息
     */
    onError?: Function;

    /**开发者可以添加任意的函数或数据到参数中 用 this 可以访问 */
    [others: string]: any;
  }

  /**指定页面的初始数据 生命周期函数 事件处理函数等 */
  interface PageParam {
    /**页面的初始数据 */
    data?: Object;

    /**生命周期函数--监听页面加载 */
    onLoad?(
      /** 打开当前页面路径中的参数 */
      query?: { [queryKey: string]: string }
    ): void

    /**生命周期函数--监听页面初次渲染完成 */
    onReady?: Function;

    /**生命周期函数--监听页面显示 */
    onShow?: Function;

    /**生命周期函数--监听页面隐藏 */
    onHide?: Function;

    /**生命周期函数--监听页面卸载 */
    onUnload?: Function;

    /**页面相关事件处理函数--监听用户下拉动作 */
    onPullDownRefresh?: Function;

    /**页面上拉触底事件的处理函数 */
    onReachBottom?: Function;

    /**
     * 设置该页面的分享信息
     * * 只有定义了此事件处理函数 右上角菜单才会显示“分享”按钮
     * * 用户点击分享按钮的时候会调用
     * * 此事件需要 return 一个 Object 用于自定以分享内容
     */
    onShareAppMessage?( options?: IShareAppMessageOption ): ICustomShareContent;

    /**页面滚动触发事件的处理函数 */
    onPageScroll?( options?: IPageScrollOption ): Function;

    /** 当前是 tab 页时，点击 tab 时触发 */
    onTabItemTap?( options?: ITabItemTapOption ): Function;

    /**开发者可以添加任意的函数或数据到参数中 用 this 可以访问 */
    [others: string]: any;
  }

  /**指定组件的生命周期函数 时间处理函数及方法等  */
  interface ComponentParam {
    /**组件的对外属性 是属性名到属性设置的映射表
     * 属性设置中可包含三个字段
     * type 表示属性类型
     * value 表示属性初始值
     * observer 表示属性值被更改时的响应函数
     */
    properties?: Object;

    /**组件的内部数据 和 properties 一同用于组件的模版渲染 */
    data?: Object;

    /**组件的方法 包括事件响应函数和任意的自定义方法 */
    methods?: {
      [others: string]: any;
    };

    /**类似于mixins和traits的组件间代码复用机制 */
    behaviors?: Array<string>;

    /**组件生命周期函数 在组件实例进入页面节点树时执行 注意此时不能调用 setData */
    created?: Function;

    /**组件生命周期函数 在组件实例进入页面节点树时执行 */
    attached?: Function;

    /**组件生命周期函数 在组件布局完成后执行 此时可以获取节点信息 */
    ready?: Function;

    /**组件生命周期函数 在组件实例被移动到节点树另一个位置时执行 */
    moved?: Function;

    /**组件生命周期函数 在组件实例被从页面节点树移除时执行 */
    detached?: Function;

    /**组件间关系定义 */
    relations?: Object;

    /**组件接受的外部样式类 */
    externalClasses?: Array<string>;

    /**一些组件选项 请参见文档其他部分的说明 */
    options?: Object;

    /**开发者可以添加任意的函数或数据到参数中 用 this 可以访问 */
    [others: string]: any;
  }

  /**页面 */
  interface Page {
    /**用于将数据从逻辑层发送到视图层 */
    setData: (data: any, callback?: Function) => void;

    /**字段可以获取到当前页面的路径*/
    route: string;

    /**页面逻辑层数据 */
    data: any;
    [others: string]: any;
  }
  // #endregion

  // #region (qa)
  interface qa {
    /**将 ArrayBuffer 数据转成 Base64 字符串 */
    arrayBufferToBase64(data: ArrayBuffer): string;
    /**将 Base64 字符串转成 ArrayBuffer 数据 */
    base64ToArrayBuffer(data: string): ArrayBuffer;
    /** [Object qa.getBatteryInfoSync()]()
     *
     * [qa.getBatteryInfo]() 的同步版本 */
    getBatteryInfoSync(): GetBatteryInfoSyncResult;
    /** [Object qa.getStorageInfoSync()]()
*
* [qa.getStorageInfo]() 的同步版本
*
* **示例代码**
*
*
* ```js
qa.getStorageInfo({
  success (res) {
    console.log(res.keys)
    console.log(res.currentSize)
    console.log(res.limitSize)
  }
})
```
*
* ```js
try {
  const res = qa.getStorageInfoSync()
  console.log(res.keys)
  console.log(res.currentSize)
  console.log(res.limitSize)
} catch (e) {
  // Do something when catch error
}
``` */
    getStorageInfoSync(): GetStorageInfoSyncOption;
    /** [Object qa.getSystemInfoSync()]()
*
* [qa.getSystemInfo]() 的同步版本
*
* **示例代码**
*
*
* ```js
qa.getSystemInfo({
  success (res) {
    console.log(res.model)
    console.log(res.pixelRatio)
    console.log(res.windowWidth)
    console.log(res.windowHeight)
    console.log(res.language)
    console.log(res.version)
    console.log(res.platform)
  }
})
```
*
* ```js
try {
  const res = qa.getSystemInfoSync()
  console.log(res.model)
  console.log(res.pixelRatio)
  console.log(res.windowWidth)
  console.log(res.windowHeight)
  console.log(res.language)
  console.log(res.version)
  console.log(res.platform)
} catch (e) {
  // Do something when catch error
}
``` */
    getSystemInfoSync(): GetSystemInfoSyncResult;
    /** [[Animation]()
     *
     * 创建一个动画实例 [animation]()。调用实例的方法来描述动画。最后通过动画实例的 export 方法导出动画数据传递给组件的 animation 属性。 */
    createAnimation(option: CreateAnimationOption): Animation;
    /** [[BackgroundAudioManager]()
     *
     * 获取**全局唯一**的背景音频管理器。
     * 快应用切入后台，如果音频处于播放状态，可以继续播放。但是后台状态不能通过调用API操纵音频的播放状态。
     *
     * 若需要在快应用切后台后继续播放音频，需要在 [app.json]((全局配置)) 中配置 `requiredBackgroundModes` 属性。开发版和体验版上可以直接生效，正式版还需通过审核。
     *
     **/
    getBackgroundAudioManager(): BackgroundAudioManager;
    /** [[CanvasContext]()
     *
     * 创建 canvas 的绘图上下文 `CanvasContext` 对象 */
    createCanvasContext(
      /** 要获取上下文的 `<canvas>` 组件 canvas-id 属性 */
      canvasId: string,
      /** 在自定义组件下，当前组件实例的this，表示在这个自定义组件下查找拥有 canvas-id 的 `<canvas/>` ，如果省略则不在任何自定义组件内查找 */
      component?: any,
    ): CanvasContext;
    /** [[DownloadTask]()
*
* 下载文件资源到本地。客户端直接发起一个 HTTPS GET 请求，返回文件的本地临时路径。使用前请注意阅读[相关说明]((network))。
*
* 注意：请在服务端响应的 header 中指定合理的 `Content-Type` 字段，以保证客户端正确处理文件类型。
*
* **示例代码**
*
*
* ```js
qa.downloadFile({
  url: 'http://example.quickapp.cn/download', //仅为示例，并非真实的资源
  success (res) {
    if (res.statusCode === 200) {
      qa.playVoice({
        filePath: res.tempFilePath
      })
    }
  }
})
``` */
    downloadFile(option: DownloadFileOption): DownloadTask;
    /** [[InnerAudioContext]()
     *
     * 创建内部 `audio` 上下文 `InnerAudioContext` 对象。
     *
     **/
    createInnerAudioContext(): InnerAudioContext;
    /** [[IntersectionObserver]()
     *
     * 创建并返回一个 IntersectionObserver 对象实例。在自定义组件中，可以使用 `this.createIntersectionObserver([options])` 来代替。
     *
     * **示例代码**
     *
     *
     * {% minicode('LAbMxkmI7F2A') %}
     *
     **/
    createIntersectionObserver(
      /** 自定义组件实例 */
      component: any,
      /** 选项 */
      options: CreateIntersectionObserverOption,
    ): IntersectionObserver;
    /** [[IntersectionObserver]()
     *
     * 创建并返回一个 IntersectionObserver 对象实例。在自定义组件中，可以使用 `this.createIntersectionObserver([options])` 来代替。
     *
     * **示例代码**
     *
     *
     * {% minicode('LAbMxkmI7F2A') %}
     *
     **/
    createIntersectionObserver(
      /** 选项 */
      options: CreateIntersectionObserverOption,
    ): IntersectionObserver;
    /** [[MapContext]()
     *
     * 创建 `map` 上下文 `MapContext` 对象。 */
    createMapContext(
      /** `<map/>` 组件的 id */
      mapId: string,
      /** 在自定义组件下，当前组件实例的this，以操作组件内 `<map/>` 组件 */
      component?: any,
    ): MapContext;
    /** [[RecorderManager]()
     *
     * 获取**全局唯一**的录音管理器 RecorderManager
     *
     **/
    getRecorderManager(): RecorderManager;
    /** [[RequestTask]()
*
* 发起 HTTPS 网络请求。使用前请注意阅读[相关说明]((network))。
*
* **data 参数说明**
*
*
* 最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String 。转换规则如下：
* - 对于 `GET` 方法的数据，会将数据转换成 query string（`encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...`）
* - 对于 `POST` 方法且 `header['content-type']` 为 `application/json` 的数据，会对数据进行 JSON 序列化
* - 对于 `POST` 方法且 `header['content-type']` 为 `application/x-www-form-urlencoded` 的数据，会将数据转换成 query string `（encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）`
*
* **示例代码**
*
*
* ```js
qa.request({
  url: 'test.php', //仅为示例，并非真实的接口地址
  data: {
    x: '',
    y: ''
  },
  header: {
    'content-type': 'application/json' // 默认值
  },
  success (res) {
    console.log(res.data)
  }
})
``` */
    request(option: RequestOption): RequestTask;
    /** [[SelectorQuery]()
*
* 返回一个 SelectorQuery 对象实例。
*
* **示例代码**
*
*
* ```js
const query = qa.createSelectorQuery()
query.select('#the-id').boundingClientRect()
query.selectViewport().scrollOffset()
query.exec(function(res){
  res[0].top       // #the-id节点的上边界坐标
  res[1].scrollTop // 显示区域的竖直滚动位置
})
```
*
**/
    createSelectorQuery(): SelectorQuery;
    /** [[SocketTask]()
*
* 创建一个 WebSocket 连接。使用前请注意阅读[相关说明]((network))。
*
* **并发数**
*
*
* - 最多可以同时存在 5 个 WebSocket 连接。
*
* **示例代码**
*
*
* ```js
qa.connectSocket({
  url: 'wss://example.quickapp.cn',
  data:{
    x: '',
    y: ''
  },
  header:{
    'content-type': 'application/json'
  },
  protocols: ['protocol1'],
  method:"GET"
})
``` */
    connectSocket(option: ConnectSocketOption): SocketTask;
    /** [[UploadTask]()
*
* 将本地资源上传到服务器。客户端发起一个 HTTPS POST 请求，其中 `content-type` 为 `multipart/form-data`。使用前请注意阅读[相关说明]((network))。
*
* **示例代码**
*
*
* ```js
qa.chooseImage({
  success (res) {
    const tempFilePaths = res.tempFilePaths
    qa.uploadFile({
      url: 'http://example.quickapp.cn/upload', //仅为示例，非真实的接口地址
      filePath: tempFilePaths[0],
      name: 'file',
      formData: {
        'user': 'test'
      },
      success (res){
        const data = res.data
        //do something
      }
    })
  }
})
``` */
    uploadFile(option: UploadFileOption): UploadTask;
    /** [[VideoContext]()
     *
     * 创建 `video` 上下文 `VideoContext` 对象。 */
    createVideoContext(
      /** `<video/>` 组件的 id */
      id: string,
      /** 在自定义组件下，当前组件实例的this，以操作组件内 `<video/>` 组件 */
      component?: any,
    ): VideoContext;
    /** [any qa.getStorageSync(string key)]()
*
* [qa.getStorage]() 的同步版本
*
* **示例代码**
*
*
* ```js
qa.getStorage({
  key: 'key',
  success (res) {
    console.log(res.data)
  }
})
```
*
* ```js
try {
  var value = qa.getStorageSync('key')
  if (value) {
    // Do something with return value
  }
} catch (e) {
  // Do something when catch error
}
``` */
    getStorageSync(
      /** 本地缓存中指定的 key */
      key: string,
    ): any;
    /** 
*
* 判断快应用的API，回调，参数，组件等是否在当前版本可用。
*
* **参数说明**
*
*
* - `${API}` 代表 API 名字
* - `${method}` 代表调用方式，有效值为return, success, object, callback
* - `${param}` 代表参数或者返回值
* - `${options}` 代表参数的可选值
* - `${component}` 代表组件名字
* - `${attribute}` 代表组件属性
* - `${option}` 代表组件属性的可选值
*
* **示例代码**
*
*
* ```js
qa.canIUse('openBluetoothAdapter')
qa.canIUse('getSystemInfoSync.return.screenWidth')
qa.canIUse('getSystemInfo.success.screenWidth')
qa.canIUse('showToast.object.image')
qa.canIUse('onCompassChange.callback.direction')
qa.canIUse('request.object.method.GET')

qa.canIUse('scroll-view')
qa.canIUse('text.selectable')
qa.canIUse('button.type.primary')
```
*
**/
    canIUse(
      /** 使用 `${API}.${method}.${param}.${options}` 或者 `${component}.${attribute}.${option}` 方式来调用 */
      schema: string,
    ): boolean;
    /** 
     *
     * 添加手机通讯录联系人。用户可以选择将该表单以「新增联系人」或「添加到已有联系人」的方式，写入手机系统通讯录。
     *
     **/
    addPhoneContact(option: AddPhoneContactOption): void;
    /** 
*
* 提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权快应用使用某项功能或获取用户的某些数据，但不会实际调用对应接口。如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。更多用法详见 [用户授权]((authorize))。
*
* **示例代码**
*
*
* ```js
// 可以通过 qa.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
qa.getSetting({
  success(res) {
    if (!res.authSetting['scope.record']) {
      qa.authorize({
        scope: 'scope.record',
        success () {
          // 用户已经同意快应用使用录音功能，后续调用 qa.startRecord 接口不会弹窗询问
          qa.startRecord()
        }
      })
    }
  }
})
```
*
**/
    authorize(option: AuthorizeOption): void;
    /** 
*
* 获取 canvas 区域隐含的像素数据。
*
* **示例代码**
*
*
* {% minicode('GlCRTlmS7n27') %}
*
* ```js
qa.canvasGetImageData({
  canvasId: 'myCanvas',
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  success(res) {
    console.log(res.width) // 100
    console.log(res.height) // 100
    console.log(res.data instanceof Uint8ClampedArray) // true
    console.log(res.data.length) // 100 * 100 * 4
  }
})
```
*
**/
    canvasGetImageData(
      option: CanvasGetImageDataOption,
      /** 在自定义组件下，当前组件实例的this，以操作组件内 `<canvas/>` 组件 */
      component?: any,
    ): void;
    /** 
     *
     * 将像素数据绘制到画布。在自定义组件下，第二个参数传入自定义组件实例 this，以操作组件内 <canvas> 组件
     *
     **/
    canvasPutImageData(
      option: CanvasPutImageDataOption,
      /** 在自定义组件下，当前组件实例的this，以操作组件内 `<canvas/>` 组件 */
      component?: any,
    ): void;
    /** 
*
* 从本地相册选择图片或使用相机拍照。
*
* **示例代码**
*
* ```js
qa.chooseImage({
  count: 1,
  sizeType: ['original', 'compressed'],
  sourceType: ['album', 'camera'],
  success (res) {
    // tempFilePath可以作为img标签的src属性显示图片
    const tempFilePaths = res.tempFilePaths
  }
})
``` */
    chooseImage(option: ChooseImageOption): void;
    /** 
     *
     * 打开地图选择位置。 */
    chooseLocation(option?: ChooseLocationOption): void;
    /** 
*
* 拍摄视频或从手机相册中选视频。
*
* **示例代码**
*
*
* ```js
qa.chooseVideo({
  sourceType: ['album','camera'],
  maxDuration: 60,
  camera: 'back',
  success(res) {
    console.log(res.tempFilePath)
  }
})
``` */
    chooseVideo(option: ChooseVideoOption): void;
    /** 
*
* 清理本地数据缓存
*
* **示例代码**
*
*
* ```js
qa.clearStorage()
```
*
* ```js
try {
  qa.clearStorageSync()
} catch(e) {
  // Do something when catch error
}
``` */
    clearStorage(option?: ClearStorageOption): void;
    /** [qa.clearStorageSync()]()
*
* [qa.clearStorage]() 的同步版本
*
* **示例代码**
*
*
* ```js
qa.clearStorage()
```
*
* ```js
try {
  qa.clearStorageSync()
} catch(e) {
  // Do something when catch error
}
``` */
    clearStorageSync(): void;
    /** 
*
* 断开与低功耗蓝牙设备的连接。
*
* **示例代码**
*
*
* {% minicode('pQU51zmz7a3K') %}
* ```js
qa.closeBLEConnection({
  deviceId,
  success (res) {
    console.log(res)
  }
})
```
*
**/
    closeBLEConnection(option: CloseBLEConnectionOption): void;
    /** 
*
* 关闭蓝牙模块。调用该方法将断开所有已建立的连接并释放系统资源。建议在使用蓝牙流程后，与 `qa.openBluetoothAdapter` 成对调用。
*
* **示例代码**
*
*
* {% minicode('pQU51zmz7a3K') %}
* ```js
qa.closeBluetoothAdapter({
  success (res) {
    console.log(res)
  }
})
```
*
**/
    closeBluetoothAdapter(option?: CloseBluetoothAdapterOption): void;
    /** 
*
* 关闭 WebSocket 连接
*
* **示例代码**
*
*
* ```js
qa.connectSocket({
  url: 'test.php'
})

//注意这里有时序问题，
//如果 qa.connectSocket 还没回调 qa.onSocketOpen，而先调用 qa.closeSocket，那么就做不到关闭 WebSocket 的目的。
//必须在 WebSocket 打开期间调用 qa.closeSocket 才能关闭。
qa.onSocketOpen(function() {
  qa.closeSocket()
})

qa.onSocketClose(function(res) {
  console.log('WebSocket 已关闭！')
})
``` */
    closeSocket(option: CloseSocketOption): void;
    /** 
*
* 压缩图片接口，可选压缩质量
*
* **示例代码**
*
*
* ```js
qa.compressImage({
  src: '', // 图片路径
  quality: 80 // 压缩质量
})
```
*
**/
    compressImage(option: CompressImageOption): void;
    /** 
*
* 连接 Wi-Fi。若已知 Wi-Fi 信息，可以直接利用该接口连接。
*
* **示例代码**
*
*
* ```js
qa.connectWifi({
  SSID: '',
  BSSID: '',
  success (res) {
    console.log(res.errMsg)
  }
})
```
*
**/
    connectWifi(option: ConnectWifiOption): void;
    /** 
*
* 连接低功耗蓝牙设备。
*
* 若快应用在之前已有搜索过某个蓝牙设备，并成功建立连接，可直接传入之前搜索获取的 deviceId 直接尝试连接该设备，无需进行搜索操作。
*
* **注意**
*
*
* - 请保证尽量成对的调用 `createBLEConnection` 和 `closeBLEConnection` 接口。如果多次调用 `createBLEConnection` 创建连接，有可能导致系统持有同一设备多个连接的实例，导致调用 `closeBLEConnection` 的时候并不能真正的断开与设备的连接。
* - 蓝牙连接随时可能断开，建议监听 `qa.onBLEConnectionStateChange` 回调事件，当蓝牙设备断开时按需执行重连操作
* - 若对未连接的设备或已断开连接的设备调用数据读写操作的接口，会返回 10006 错误，建议进行重连操作。
*
* **示例代码**
*
*
* {% minicode('pQU51zmz7a3K') %}
* ```js
qa.createBLEConnection({
  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
  deviceId,
  success (res) {
    console.log(res)
  }
})
```
*
**/
    createBLEConnection(option: CreateBLEConnectionOption): void;
    /** 
*
* 获取蓝牙设备某个服务中所有特征值(characteristic)。
*
* **示例代码**
*
*
* {% minicode('pQU51zmz7a3K') %}
* ```js
qa.getBLEDeviceCharacteristics({
  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
  deviceId,
  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
  serviceId,
  success (res) {
    console.log('device getBLEDeviceCharacteristics:', res.characteristics)
  }
})
```
*
**/
    getBLEDeviceCharacteristics(
      option: GetBLEDeviceCharacteristicsOption,
    ): void;
    /** 
*
* 获取蓝牙设备所有服务(service)。
*
* **示例代码**
*
*
* {% minicode('pQU51zmz7a3K') %}
* ```js
qa.getBLEDeviceServices({
  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
  deviceId,
  success (res) {
    console.log('device services:', res.services)
  }
})
```
*
**/
    getBLEDeviceServices(option: GetBLEDeviceServicesOption): void;
    /** 
*
* 获取后台音乐播放状态。
*
* **示例代码**
*
*
* ```js
qa.getBackgroundAudioPlayerState({
  success (res) {
    const status = res.status
    const dataUrl = res.dataUrl
    const currentPosition = res.currentPosition
    const duration = res.duration
  }
})
``` */
    getBackgroundAudioPlayerState(
      option?: GetBackgroundAudioPlayerStateOption,
    ): void;
    /** 
     *
     * 获取设备电量 */
    getBatteryInfo(option?: GetBatteryInfoOption): void;
    /** 
*
* 获取本机蓝牙适配器状态。
*
* **示例代码**
*
*
* {% minicode('pQU51zmz7a3K') %}
* ```js
qa.getBluetoothAdapterState({
  success (res) {
    console.log(res)
  }
})
```
*
**/
    getBluetoothAdapterState(option?: GetBluetoothAdapterStateOption): void;
    /** 
*
* 获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备。
*
* **示例代码**
*
*
* {% minicode('pQU51zmz7a3K') %}
*
* ```js
// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function(bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
}
qa.getBluetoothDevices({
  success: function (res) {
    console.log(res)
    if (res.devices[0]) {
      console.log(ab2hex(res.devices[0].advertisData))
    }
  }
})
```
*
* **注意事项**
*
*
* - 该接口获取到的设备列表为**蓝牙模块生效期间所有搜索到的蓝牙设备**，若在蓝牙模块使用流程结束后未及时调用 `qa.closeBluetoothAdapter` 释放资源，会存在调用该接口会返回之前的蓝牙使用流程中搜索到的蓝牙设备，可能设备已经不在用户身边，无法连接。
* - 蓝牙设备在被搜索到时，系统返回的 name 字段一般为广播包中的 LocalName 字段中的设备名称，而如果与蓝牙设备建立连接，系统返回的 name 字段会改为从蓝牙设备上获取到的 `GattName`。若需要动态改变设备名称并展示，建议使用 `localName` 字段。
*
**/
    getBluetoothDevices(option?: GetBluetoothDevicesOption): void;
    /** 
*
* 获取系统剪贴板的内容
*
* **示例代码**
*
*
* ```js
qa.getClipboardData({
  success (res){
    console.log(res.data)
  }
})
```
*
**/
    getClipboardData(option?: GetClipboardDataOption): void;
    /** 
*
* 根据 uuid 获取处于已连接状态的设备。
*
* **示例代码**
*
*
* {% minicode('pQU51zmz7a3K') %}
* ```js
qa.getConnectedBluetoothDevices({
  success (res) {
    console.log(res)
  }
})
```
*
**/
    getConnectedBluetoothDevices(
      option: GetConnectedBluetoothDevicesOption,
    ): void;
    /** 
     *
     * 获取已连接中的 Wi-Fi 信息。
     *
     **/
    getConnectedWifi(option?: GetConnectedWifiOption): void;
    /** 
*
* 获取文件信息
*
* **示例代码**
*
*
* ```js
qa.getFileInfo({
  success (res) {
    console.log(res.size)
    console.log(res.digest)
  }
})
```
*
**/
    getFileInfo(option: QaGetFileInfoOption): void;
    /** 
*
* 获取图片信息。网络图片需先配置download域名才能生效。
*
* **示例代码**
*
*
* {% minicode('Kd47Sbmr6yYu') %}
*
* ```js
qa.getImageInfo({
  src: 'images/a.jpg',
  success (res) {
    console.log(res.width)
    console.log(res.height)
  }
})

qa.chooseImage({
  success (res) {
    qa.getImageInfo({
      src: res.tempFilePaths[0],
      success (res) {
        console.log(res.width)
        console.log(res.height)
      }
    })
  }
})
``` */
    getImageInfo(option: GetImageInfoOption): void;
    /** 
*
* 获取当前的地理位置、速度。当用户离开快应用后，此接口无法调用。
*
* **示例代码**
*
*
*  ```js
 qa.getLocation({
  type: 'wgs84',
  success (res) {
    const latitude = res.latitude
    const longitude = res.longitude
    const speed = res.speed
    const accuracy = res.accuracy
  }
})
 ```
*
* **注意**
*
*
* - 使用第三方服务进行逆地址解析时，请确认第三方服务默认的坐标系，正确进行坐标转换。 */
    getLocation(option: GetLocationOption): void;
    /** 
*
* 获取网络类型
*
* **示例代码**
*
*
* ```js
qa.getNetworkType({
  success (res) {
    const networkType = res.networkType
  }
})
``` */
    getNetworkType(option?: GetNetworkTypeOption): void;
    /** 
*
* 获取本地文件的文件信息。此接口只能用于获取已保存到本地的文件，若需要获取临时文件信息，请使用 [qa.getFileInfo()]() 接口。
*
* **示例代码**
*
*
* ```js
qa.getSavedFileList({
  success (res) {
    console.log(res.fileList)
  }
})
``` */
    getSavedFileInfo(option: GetSavedFileInfoOption): void;
    /** 
*
* 获取该快应用下已保存的本地缓存文件列表
*
* **示例代码**
*
*
* ```js
qa.getSavedFileList({
  success (res) {
    console.log(res.fileList)
  }
})
``` */
    getSavedFileList(option?: QaGetSavedFileListOption): void;
    /** 
     *
     * 获取屏幕亮度
     *
     * **说明**
     *
     *
     * - 若系统设置中开启了自动调节亮度功能，则屏幕亮度会根据光线自动调整，该接口仅能获取自动调节亮度之前的值，而非实时的亮度值。
     *
     **/
    getScreenBrightness(option?: GetScreenBrightnessOption): void;
    /** 
*
* 获取用户的当前设置。**返回值中只会出现快应用已经向用户请求过的[权限]()**。
*
* **示例代码**
*
*
* ```js
qa.getSetting({
  success (res) {
    console.log(res.authSetting)
    // res.authSetting = {
    //   "scope.userInfo": true,
    //   "scope.userLocation": true
    // }
  }
})
```
*
**/
    getSetting(option?: GetSettingOption): void;
    /** 
*
* 从本地缓存中异步获取指定 key 的内容
*
* **示例代码**
*
*
* ```js
qa.getStorage({
  key: 'key',
  success (res) {
    console.log(res.data)
  }
})
```
*
* ```js
try {
  var value = qa.getStorageSync('key')
  if (value) {
    // Do something with return value
  }
} catch (e) {
  // Do something when catch error
}
``` */
    getStorage(option: GetStorageOption): void;
    /** 
*
* 异步获取当前storage的相关信息
*
* **示例代码**
*
*
* ```js
qa.getStorageInfo({
  success (res) {
    console.log(res.keys)
    console.log(res.currentSize)
    console.log(res.limitSize)
  }
})
```
*
* ```js
try {
  const res = qa.getStorageInfoSync()
  console.log(res.keys)
  console.log(res.currentSize)
  console.log(res.limitSize)
} catch (e) {
  // Do something when catch error
}
``` */
    getStorageInfo(option?: GetStorageInfoOption): void;
    /** 
*
* 获取系统信息
*
* **示例代码**
*
*
* ```js
qa.getSystemInfo({
  success (res) {
    console.log(res.model)
    console.log(res.pixelRatio)
    console.log(res.windowWidth)
    console.log(res.windowHeight)
    console.log(res.language)
    console.log(res.version)
    console.log(res.platform)
  }
})
```
*
* ```js
try {
  const res = qa.getSystemInfoSync()
  console.log(res.model)
  console.log(res.pixelRatio)
  console.log(res.windowWidth)
  console.log(res.windowHeight)
  console.log(res.language)
  console.log(res.version)
  console.log(res.platform)
} catch (e) {
  // Do something when catch error
}
``` */
    getSystemInfo(option?: GetSystemInfoOption): void;
    /** 
*
* 获取用户信息。
*
* **示例代码**
*
*
* ```js
Page({
  onLoad: function() {
    // 查看是否授权
    qa.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          qa.getUserInfo({
            success: function(res) {
              console.log(res)
            }
          })
        }
      }
    })
  }
})
``` */
    getUserInfo(option: GetUserInfoOption): void;
    /** 
     *
     * 请求获取 Wi-Fi 列表。在 `onGetWifiList` 注册的回调中返回 `wifiList` 数据。
     *
     *
     **/
    getWifiList(option?: GetWifiListOption): void;
    /** 
     *
     * 隐藏 loading 提示框
     *
     **/
    hideLoading(option?: HideLoadingOption): void;
    /** 
     *
     * 在当前页面隐藏导航条加载动画 */
    hideNavigationBarLoading(option?: HideNavigationBarLoadingOption): void;
    /** 
     *
     * 隐藏 tabBar
     *
     **/
    hideTabBar(option: HideTabBarOption): void;
    /** 
     *
     * 隐藏 tabBar 某一项的右上角的红点
     *
     **/
    hideTabBarRedDot(option: HideTabBarRedDotOption): void;
    /** 
     *
     * 隐藏消息提示框 */
    hideToast(option?: HideToastOption): void;
    /** 
*
* 动态加载网络字体。文件地址需为下载类型。
*
* 注意：
* 1. 引入中文字体，体积过大时会发生错误，建议抽离出部分中文，减少体积，或者用图片替代
* 2. 字体链接必须是https
* 3. 字体链接必须是同源下的，或开启了cors 支持
* 4. canvas等原生组件不支持使用接口添加的字体
*
* **示例代码**
*
*
* {% minicode('b6Zrajm67R2x') %}
* ```js
qa.loadFontFace({
  family: 'Bitstream Vera Serif Bold',
  source: 'url("xxxx")',
  success: console.log
})
```
*
**/
    loadFontFace(option: LoadFontFaceOption): void;
    /** 
*
* 调用接口获取登录凭证（code）。
*
* **示例代码**
*
*
* ```js
qa.login({
  success (res) {
    if (res.code) {
      //发起网络请求
      qa.request({
        url: 'https://test.com/onLogin',
        data: {
          code: res.code
        }
      })
    } else {
      console.log('登录失败！' + res.errMsg)
    }
  }
})
``` */
    login(option: LoginOption): void;
    /** 
*
* 拨打电话
*
* **示例代码**
*
*
* ```js
qa.makePhoneCall({
  phoneNumber: '1340000' //仅为示例，并非真实的电话号码
})
``` */
    makePhoneCall(option: MakePhoneCallOption): void;
    /** 
     *
     * 关闭当前页面，返回上一页面或多级页面。可通过 [getCurrentPages()]((页面路由#getcurrentpages)) 获取当前的页面栈，决定需要返回几层。 */
    navigateBack(option: NavigateBackOption): void;
    /** 
*
* 返回到上一个快应用。只有在当前快应用是被其他快应用打开时可以调用成功
*
*
* **示例代码**
*
*
* ```js
qa.navigateBackMiniProgram({
  extraData: {
  foo: 'bar'
},
success(res) {
  // 返回成功
}
})
```
*
**/
    navigateBackMiniProgram(option: NavigateBackMiniProgramOption): void;
    /** 
*
* 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 [qa.navigateBack]() 可以返回到原页面。
*
* **示例代码**
*
*
*
* ```js
qa.navigateTo({
  url: 'test?id=1'
})
```
*
* ```javascript
//test.js
Page({
  onLoad: function(option){
    console.log(option.query)
  }
})
``` */
    navigateTo(option: NavigateToOption): void;
    /** 
*
* 打开另一个快应用
*
* **示例代码**
*
*
* ```js
qa.navigateToMiniProgram({
  appId: '',
  path: 'page/index/index?id=123',
  extraData: {
    foo: 'bar'
  },
  success(res) {
    // 打开成功
  }
})
```
**/
    navigateToMiniProgram(option: NavigateToMiniProgramOption): void;
    /** 
     *
     * 延迟一部分操作到下一个时间片再执行。（类似于 setTimeout）
     *
     * **说明**
     *
     *
     *
     * 因为自定义组件中的 setData 和 triggerEvent 等接口本身是同步的操作，当这几个接口被连续调用时，都是在一个同步流程中执行完的，因此若逻辑不当可能会导致出错。
     *
     * 一个极端的案例：当父组件的 setData 引发了子组件的 triggerEvent，进而使得父组件又进行了一次 setData，期间有通过  qa:if 语句对子组件进行卸载，就有可能引发奇怪的错误，所以对于不需要在一个同步流程内完成的逻辑，可以使用此接口延迟到下一个时间片再执行。
     *
     **/
    nextTick(callback: Function): void;
    /** 
*
* 启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。注意：必须设备的特征值支持 notify 或者 indicate 才可以成功调用。
*
* 另外，必须先启用 `notifyBLECharacteristicValueChange` 才能监听到设备 `characteristicValueChange` 事件
*
* **注意**
*
*
* - 订阅操作成功后需要设备主动更新特征值的 value，才会触发 `qa.onBLECharacteristicValueChange` 回调。
* - 在调用 `notifyBLECharacteristicValueChange` 成功后立即调用 `writeBLECharacteristicValue` 接口，在部分机型上会发生 10008 系统错误
*
* **示例代码**
*
*
* {% minicode('pQU51zmz7a3K') %}
* ```js
qa.notifyBLECharacteristicValueChange({
  state: true, // 启用 notify 功能
  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
  deviceId,
  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
  serviceId,
  // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
  characteristicId,
  success (res) {
    console.log('notifyBLECharacteristicValueChange success', res.errMsg)
  }
})
```
*
**/
    notifyBLECharacteristicValueChange(
      option: NotifyBLECharacteristicValueChangeOption,
    ): void;
    /** 
     *
     * 取消监听快应用切后台事件
     *
     **/
    offAppHide(
      /** 快应用切后台事件的回调函数 */
      callback: OffAppHideCallback,
    ): void;
    /** 
     *
     * 取消监听快应用切前台事件
     *
     **/
    offAppShow(
      /** 快应用切前台事件的回调函数 */
      callback: OffAppShowCallback,
    ): void;
    /** 
     *
     * 取消监听快应用错误事件。
     *
     **/
    offError(
      /** 快应用错误事件的回调函数 */
      callback: Function,
    ): void;
    /** 
     *
     * 取消监听快应用要打开的页面不存在事件
     *
     **/
    offPageNotFound(
      /** 快应用要打开的页面不存在事件的回调函数 */
      callback: OffPageNotFoundCallback,
    ): void;
    /** 
*
* 监听加速度数据事件。频率根据 [qa.startAccelerometer()]() 停止监听。
*
* **示例代码**
*
*
* ```js
qa.onAccelerometerChange(function (res) {
  console.log(res.x)
  console.log(res.y)
  console.log(res.z)
})
``` */
    onAccelerometerChange(
      /** 加速度数据事件的回调函数 */
      callback: OnAccelerometerChangeCallback,
    ): void;
    /** 
     *
     * 监听快应用切后台事件。该事件与 [`App.onHide`]((app-service/app#onhide)) 的回调时机一致。
     *
     **/
    onAppHide(
      /** 快应用切后台事件的回调函数 */
      callback: OnAppHideCallback,
    ): void;
    /** 
     *
     * 监听快应用切前台事件。该事件与 [`App.onShow`]((app-service/app#onshowobject)) 的回调参数一致。
     *
     **/
    onAppShow(
      /** 快应用切前台事件的回调函数 */
      callback: OnAppShowCallback,
    ): void;
    /** 
*
* 监听低功耗蓝牙设备的特征值变化事件。必须先启用 `notifyBLECharacteristicValueChange` 接口才能接收到设备推送的 notification。
*
* **示例代码**
*
*
* {% minicode('pQU51zmz7a3K') %}
*
* ```js
// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
  let hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function(bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
}
qa.onBLECharacteristicValueChange(function(res) {
  console.log(`characteristic ${res.characteristicId} has changed, now is ${res.value}`)
  console.log(ab2hex(res.value))
})
```
*
**/
    onBLECharacteristicValueChange(
      /** 低功耗蓝牙设备的特征值变化事件的回调函数 */
      callback: OnBLECharacteristicValueChangeCallback,
    ): void;
    /** 
*
* 监听低功耗蓝牙连接状态的改变事件。包括开发者主动连接或断开连接，设备丢失，连接异常断开等等
*
* **示例代码**
*
*
* {% minicode('pQU51zmz7a3K') %}
* ```js
qa.onBLEConnectionStateChange(function(res) {
  // 该方法回调中可以用于处理连接意外断开等异常情况
  console.log(`device ${res.deviceId} state has changed, connected: ${res.connected}`)
})
```
*
**/
    onBLEConnectionStateChange(
      /** 低功耗蓝牙连接状态的改变事件的回调函数 */
      callback: OnBLEConnectionStateChangeCallback,
    ): void;
    /** 
     *
     * 监听音乐暂停事件。 */
    onBackgroundAudioPause(
      /** 音乐暂停事件的回调函数 */
      callback: OnBackgroundAudioPauseCallback,
    ): void;
    /** 
     *
     * 监听音乐播放事件。 */
    onBackgroundAudioPlay(
      /** 音乐播放事件的回调函数 */
      callback: OnBackgroundAudioPlayCallback,
    ): void;
    /** 
     *
     * 监听音乐停止事件。 */
    onBackgroundAudioStop(
      /** 音乐停止事件的回调函数 */
      callback: OnBackgroundAudioStopCallback,
    ): void;
    /** 
*
* 监听蓝牙适配器状态变化事件
*
* **示例代码**
*
*
* {% minicode('pQU51zmz7a3K') %}
* ```js
qa.onBluetoothAdapterStateChange(function (res) {
  console.log('adapterState changed, now is', res)
})
```
*
**/
    onBluetoothAdapterStateChange(
      /** 蓝牙适配器状态变化事件的回调函数 */
      callback: OnBluetoothAdapterStateChangeCallback,
    ): void;
    /** 
*
* 监听寻找到新设备的事件
*
* **注意**
*
*
* - 若在 `qa.onBluetoothDeviceFound` 回调了某个设备，则此设备会添加到 `qa.getBluetoothDevices` 接口获取到的数组中。
*
* **示例代码**
*
*
* {% minicode('pQU51zmz7a3K') %}
*
* ```js
// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function(bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
}
qa.onBluetoothDeviceFound(function(devices) {
  console.log('new device list has founded')
  console.dir(devices)
  console.log(ab2hex(devices[0].advertisData))
})
```
*
**/
    onBluetoothDeviceFound(
      /** 寻找到新设备的事件的回调函数 */
      callback: OnBluetoothDeviceFoundCallback,
    ): void;
    /** 
     *
     * 监听罗盘数据变化事件。频率：5 次/秒，接口调用后会自动开始监听，可使用 qa.stopCompass 停止监听。
     *
     **/
    onCompassChange(
      /** 罗盘数据变化事件的回调函数 */
      callback: OnCompassChangeCallback,
    ): void;
    /** 
     *
     * 监听设备方向变化事件。频率根据 [qa.startDeviceMotionListening()]() 停止监听。
     *
     **/
    onDeviceMotionChange(
      /** 设备方向变化事件的回调函数 */
      callback: OnDeviceMotionChangeCallback,
    ): void;
    /** 
     *
     * 监听快应用错误事件。如脚本错误或 API 调用报错等。该事件与 [`App.onError`]((app-service/app#onerrorstring-error)) 的回调时机与参数一致。
     *
     **/
    onError(
      /** 快应用错误事件的回调函数 */
      callback: OnAppErrorCallback,
    ): void;
    /** 
     *
     * 监听获取到 Wi-Fi 列表数据事件
     *
     **/
    onGetWifiList(
      /** 获取到 Wi-Fi 列表数据事件的回调函数 */
      callback: OnGetWifiListCallback,
    ): void;
    /** 
     *
     * 监听陀螺仪数据变化事件。频率根据 [qa.startGyroscope()]() 停止监听。
     *
     **/
    onGyroscopeChange(
      /** 陀螺仪数据变化事件的回调函数 */
      callback: OnGyroscopeChangeCallback,
    ): void;
    /** 
     *
     * 监听内存不足告警事件。
     *
     * 当 系统 向快应用进程发出内存警告时，触发该事件。触发该事件不意味快应用被杀，大部分情况下仅仅是告警，开发者可在收到通知后回收一些不必要资源避免进一步加剧内存紧张。
     *
     * **示例代码**
     *
     *
     * ```js
     * qa.onMemoryWarning(function () {
     *   console.log('onMemoryWarningReceive')
     * })
     * ``
     *
     **/
    onMemoryWarning(
      /** 内存不足告警事件的回调函数 */
      callback: OnMemoryWarningCallback,
    ): void;
    /** 
*
* 监听网络状态变化事件
*
* **示例代码**
*
*
* ```js
qa.onNetworkStatusChange(function (res) {
  console.log(res.isConnected)
  console.log(res.networkType)
})
```
*
**/
    onNetworkStatusChange(
      /** 网络状态变化事件的回调函数 */
      callback: OnNetworkStatusChangeCallback,
    ): void;
    /** 
     *
     * 监听快应用要打开的页面不存在事件。该事件与 [`App.onPageNotFound`]((app-service/app#onpagenotfoundobject)) 的回调时机一致。
     *
     * **注意**
     *
     *
     * - 开发者可以在回调中进行页面重定向，但必须在回调中**同步**处理，异步处理（例如 `setTimeout` 异步执行）无效。
     * - 若开发者没有调用 `qa.onPageNotFound` 绑定监听，也没有声明 `App.onPageNotFound`，当跳转页面不存在时，将推入快应用原生的页面不存在提示页面。
     * - 如果回调中又重定向到另一个不存在的页面，将推入快应用原生的页面不存在提示页面，并且不再第二次回调。
     *
     **/
    onPageNotFound(
      /** 快应用要打开的页面不存在事件的回调函数 */
      callback: OnPageNotFoundCallback,
    ): void;
    /** 
     *
     * 监听 WebSocket 连接关闭事件 */
    onSocketClose(
      /** WebSocket 连接关闭事件的回调函数 */
      callback: OnSocketCloseCallback,
    ): void;
    /** 
     *
     * 监听 WebSocket 错误事件 */
    onSocketError(
      /** WebSocket 错误事件的回调函数 */
      callback: OnSocketErrorCallback,
    ): void;
    /** 
     *
     * 监听 WebSocket 接受到服务器的消息事件 */
    onSocketMessage(
      /** WebSocket 接受到服务器的消息事件的回调函数 */
      callback: OnSocketMessageCallback,
    ): void;
    /** 
     *
     * 监听 WebSocket 连接打开事件 */
    onSocketOpen(
      /** WebSocket 连接打开事件的回调函数 */
      callback: OnSocketOpenCallback,
    ): void;
    /** 
*
* 监听用户主动截屏事件。用户使用系统截屏按键截屏时触发
*
* **示例代码**
*
*
* ```js
qa.onUserCaptureScreen(function (res) {
  console.log('用户截屏了')
})
```
*
**/
    onUserCaptureScreen(
      /** 用户主动截屏事件的回调函数 */
      callback: OnUserCaptureScreenCallback,
    ): void;
    /** 
     *
     * 监听连接上 Wi-Fi 的事件
     *
     **/
    onWifiConnected(
      /** 连接上 Wi-Fi 的事件的回调函数 */
      callback: OnWifiConnectedCallback,
    ): void;
    /** 
*
* 初始化蓝牙模块
*
* **注意**
*
*
* - 其他蓝牙相关 API 必须在 `qa.openBluetoothAdapter` 调用之后使用。否则 API 会返回错误（errCode=10000）。
* - 在用户蓝牙开关未开启或者手机不支持蓝牙功能的情况下，调用 `qa.openBluetoothAdapter` 会返回错误（errCode=10001），表示手机蓝牙功能不可用。此时快应用蓝牙模块已经初始化完成，可通过 `qa.onBluetoothAdapterStateChange` 监听手机蓝牙状态的改变，也可以调用蓝牙模块的所有API。
*
* **示例代码**
*
*
* {% minicode('pQU51zmz7a3K') %}
* ```js
qa.openBluetoothAdapter({
  success (res) {
    console.log(res)
  }
})
```
*
**/
    openBluetoothAdapter(option?: OpenBluetoothAdapterOption): void;
    /** 
     *
     * 新开页面打开文档 */
    openDocument(option: OpenDocumentOption): void;
    /** 
*
* 使用快应用内置地图查看位置
*
* **示例代码**
*
*
*  ```js
 qa.getLocation({
  type: 'gcj02', //返回可以用于qa.openLocation的经纬度
  success (res) {
    const latitude = res.latitude
    const longitude = res.longitude
    qa.openLocation({
      latitude,
      longitude,
      scale: 18
    })
  }
})
 ``` */
    openLocation(option: OpenLocationOption): void;
    /** 
*
* 将页面滚动到目标位置
*
* **示例代码**
*
*
* ```js
qa.pageScrollTo({
  scrollTop: 0,
  duration: 300
})
```
*
**/
    pageScrollTo(option: PageScrollToOption): void;
    /** 
*
* 暂停播放音乐。
*
* **示例代码**
*
*
* ```js
qa.pauseBackgroundAudio()
``` */
    pauseBackgroundAudio(option?: PauseBackgroundAudioOption): void;
    /** 
*
* 使用后台播放器播放音乐。对于快应用来说，只能同时有一个后台音乐在播放。当用户离开快应用后，音乐将暂停播放；当用户在其他快应用占用了音乐播放器，原有快应用内的音乐将停止播放。
*
* **示例代码**
*
*
* ```js
qa.playBackgroundAudio({
  dataUrl: '',
  title: '',
  coverImgUrl: ''
})
``` */
    playBackgroundAudio(option: PlayBackgroundAudioOption): void;
    /** 
*
* 在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作。
*
* **示例代码**
*
*
* ```js
qa.previewImage({
  current: '', // 当前显示图片的http链接
  urls: [] // 需要预览的图片http链接列表
})
``` */
    previewImage(option: PreviewImageOption): void;
    /** 
*
* 关闭所有页面，打开到应用内的某个页面
*
* **示例代码**
*
*
* ```js
qa.reLaunch({
  url: 'test?id=1'
})
```
*
* ```html
* // test
* Page({
*   onLoad (option) {
*     console.log(option.query)
*   }
* })
* ```
*
**/
    reLaunch(option: ReLaunchOption): void;
    /** 
*
* 读取低功耗蓝牙设备的特征值的二进制数据值。注意：必须设备的特征值支持 read 才可以成功调用。
*
* **注意**
*
*
* - 并行调用多次会存在读失败的可能性。
* - 接口读取到的信息需要在 `onBLECharacteristicValueChange` 方法注册的回调中获取。
*
* **示例代码**
*
*
* {% minicode('pQU51zmz7a3K') %}
* ```js
// 必须在这里的回调才能获取
qa.onBLECharacteristicValueChange(function(characteristic) {
  console.log('characteristic value comed:', characteristic)
})

qa.readBLECharacteristicValue({
  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
  deviceId,
  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
  serviceId,
  // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
  characteristicId,
  success (res) {
    console.log('readBLECharacteristicValue:', res.errCode)
  }
})
```
*
**/
    readBLECharacteristicValue(option: ReadBLECharacteristicValueOption): void;
    /** 
*
* 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
*
* **示例代码**
*
*
* ```js
qa.redirectTo({
  url: 'test?id=1'
})
``` */
    redirectTo(option: RedirectToOption): void;
    /** 
*
* 删除本地缓存文件
*
* **示例代码**
*
*
* ```js
qa.getSavedFileList({
 success (res) {
   if (res.fileList.length > 0){
     qa.removeSavedFile({
       filePath: res.fileList[0].filePath,
       complete (res) {
         console.log(res)
       }
     })
   }
 }
})
``` */
    removeSavedFile(option: QaRemoveSavedFileOption): void;
    /** 
*
* 从本地缓存中移除指定 key
*
* **示例代码**
*
*
* ```js
qa.removeStorage({
  key: 'key',
  success (res) {
    console.log(res.data)
  }
})
```
*
* ```js
try {
  qa.removeStorageSync('key')
} catch (e) {
  // Do something when catch error
}
``` */
    removeStorage(option: RemoveStorageOption): void;
    /** [qa.removeStorageSync(string key)]()
*
* [qa.removeStorage]() 的同步版本
*
* **示例代码**
*
*
* ```js
qa.removeStorage({
  key: 'key',
  success (res) {
    console.log(res.data)
  }
})
```
*
* ```js
try {
  qa.removeStorageSync('key')
} catch (e) {
  // Do something when catch error
}
``` */
    removeStorageSync(
      /** 本地缓存中指定的 key */
      key: string,
    ): void;
    /** 
     *
     * 移除 tabBar 某一项右上角的文本
     *
     **/
    removeTabBarBadge(option: RemoveTabBarBadgeOption): void;
    /** 
*
* 保存文件到本地。注意：**saveFile 会把临时文件移动，因此调用成功后传入的 tempFilePath 将不可用**
*
* **示例代码**
*
*
* ```js
qa.chooseImage({
  success: function(res) {
    const tempFilePaths = res.tempFilePaths
    qa.saveFile({
      tempFilePath: tempFilePaths[0],
      success (res) {
        const savedFilePath = res.savedFilePath
      }
    })
  }
})
```
*
* **注意**
*
*
* 本地文件存储的大小限制为 10M */
    saveFile(option: QaSaveFileOption): void;
    /** 
*
* 保存图片到系统相册。
*
* **示例代码**
*
*
* ```js
qa.saveImageToPhotosAlbum({
  success(res) { }
})
```
*
**/
    saveImageToPhotosAlbum(option: SaveImageToPhotosAlbumOption): void;
    /** 
*
* 保存视频到系统相册
*
* **示例代码**
*
*
* ```js
qa.saveVideoToPhotosAlbum({
  filePath: 'wxfile://xxx',
  success (res) {
    console.log(res.errMsg)
  }
})
```
*
**/
    saveVideoToPhotosAlbum(option: SaveVideoToPhotosAlbumOption): void;
    /** 
*
* 调起客户端扫码界面进行扫码
*
* **示例代码**
*
*
* ```js
// 允许从相机和相册扫码
qa.scanCode({
  success (res) {
    console.log(res)
  }
})

// 只允许从相机扫码
qa.scanCode({
  success (res) {
    console.log(res)
  }
})
``` */
    scanCode(option: ScanCodeOption): void;
    /** 
*
* 控制音乐播放进度。
*
* **示例代码**
*
*
* ```js
qa.seekBackgroundAudio({
  position: 30
})
``` */
    seekBackgroundAudio(option: SeekBackgroundAudioOption): void;
    /** 
*
* 通过 WebSocket 连接发送数据。需要先 qa.connectSocket，并在 qa.onSocketOpen 回调之后才能发送。
*
* **示例代码**
*
*
* ```js
const socketOpen = false
const socketMsgQueue = []
qa.connectSocket({
  url: 'test.php'
})

qa.onSocketOpen(function(res) {
  socketOpen = true
  for (let i = 0; i < socketMsgQueue.length; i++){
    sendSocketMessage(socketMsgQueue[i])
  }
  socketMsgQueue = []
})

function sendSocketMessage(msg) {
  if (socketOpen) {
    qa.sendSocketMessage({
      data:msg
    })
  } else {
    socketMsgQueue.push(msg)
  }
}
``` */
    sendSocketMessage(option: SendSocketMessageOption): void;
    /** 
*
* 动态设置窗口的背景色
*
* **示例代码**
*
*
* ```js
qa.setBackgroundColor({
  backgroundColor: '#ffffff', // 窗口的背景色为白色
})

```
*
**/
    setBackgroundColor(option: SetBackgroundColorOption): void;
    /** 
*
* 动态设置下拉背景字体、loading 图的样式
*
* **示例代码**
*
*
* ```js
qa.setBackgroundTextStyle({
  textStyle: 'dark' // 下拉背景字体、loading 图的样式为dark
})
```
*
**/
    setBackgroundTextStyle(option: SetBackgroundTextStyleOption): void;
    /** 
*
* 设置系统剪贴板的内容
*
* **示例代码**
*
*
* ```js
qa.setClipboardData({
  data: 'data',
  success (res) {
    qa.getClipboardData({
      success (res) {
        console.log(res.data) // data
      }
    })
  }
})
```
*
**/
    setClipboardData(option: SetClipboardDataOption): void;
    /** 
*
* 设置是否打开调试开关。此开关对正式版也能生效。
*
* **示例代码**
*
*
* ```javascript
// 打开调试
qa.setEnableDebug({
  enableDebug: true
})

// 关闭调试
qa.setEnableDebug({
  enableDebug: false
})
```
*
* **Tips**
*
*
* - 在正式版打开调试还有一种方法，就是先在开发版或体验版打开调试，再切到正式版就能看到vConsole。
*
**/
    setEnableDebug(option: SetEnableDebugOption): void;
    /** 
     *
     * 设置 [InnerAudioContext]() 的播放选项。设置之后对当前快应用全局生效。
     *
     **/
    setInnerAudioOption(option: SetInnerAudioOption): void;
    /** 
*
* 设置是否保持常亮状态。仅在当前快应用生效，离开快应用后设置失效。
*
* **示例代码**
*
*
* ```js
qa.setKeepScreenOn({
  keepScreenOn: true
})
```
*
**/
    setKeepScreenOn(option: SetKeepScreenOnOption): void;
    /** 
     *
     * 设置页面导航条颜色
     *
     **/
    setNavigationBarColor(option: SetNavigationBarColorOption): void;
    /** 
*
* 动态设置当前页面的标题
*
* **示例代码**
*
*
* ```js
qa.setNavigationBarTitle({
  title: '当前页面'
})
``` */
    setNavigationBarTitle(option: SetNavigationBarTitleOption): void;
    /** 
     *
     * 设置屏幕亮度
     *
     **/
    setScreenBrightness(option: SetScreenBrightnessOption): void;
    /** 
*
* 将数据存储在本地缓存中指定的 key 中。会覆盖掉原来该 key 对应的内容。数据存储生命周期跟快应用本身一致，即除用户主动删除或超过一定时间被自动清理，否则数据都一直可用。单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。
*
* **示例代码**
*
*
* ```js
qa.setStorage({
  key:"key",
  data:"value"
})
```
* ```js
try {
  qa.setStorageSync('key', 'value')
} catch (e) { }
``` */
    setStorage(option: SetStorageOption): void;
    /** [qa.setStorageSync(string key, any data)]()
*
* [qa.setStorage]() 的同步版本
*
* **示例代码**
*
*
* ```js
qa.setStorage({
  key:"key",
  data:"value"
})
```
* ```js
try {
  qa.setStorageSync('key', 'value')
} catch (e) { }
``` */
    setStorageSync(
      /** 本地缓存中指定的 key */
      key: string,
      /** 需要存储的内容。只支持原生类型、Date、及能够通过`JSON.stringify`序列化的对象。 */
      data: any,
    ): void;
    /** 
*
* 为 tabBar 某一项的右上角添加文本
*
* **示例代码**
*
*
* ```js
qa.setTabBarBadge({
  index: 0,
  text: '1'
})
```
*
**/
    setTabBarBadge(option: SetTabBarBadgeOption): void;
    /** 
*
* 动态设置 tabBar 某一项的内容
*
* **示例代码**
*
*
* ```js
qa.setTabBarItem({
  index: 0,
  text: 'text',
  iconPath: '/path/to/iconPath',
  selectedIconPath: '/path/to/selectedIconPath'
})
```
*
**/
    setTabBarItem(option: SetTabBarItemOption): void;
    /** 
*
* 动态设置 tabBar 的整体样式
*
* **示例代码**
*
*
* ```js
qa.setTabBarStyle({
  color: '#FF0000',
  selectedColor: '#00FF00',
  backgroundColor: '#0000FF',
  borderStyle: 'white'
})
```
*
**/
    setTabBarStyle(option: SetTabBarStyleOption): void;
    /** 
*
* 动态设置置顶栏文字内容。只有当前快应用被置顶时能生效，如果当前快应用没有被置顶，也能调用成功，但是不会立即生效，只有在用户将这个快应用置顶后才换上设置的文字内容.
*
* **示例代码**
*
*
* ```js
qa.setTopBarText({
  text: 'hello, world!'
})
```
*
* **注意**
*
*
* - 调用成功后，需间隔 5s 才能再次调用此接口，如果在 5s 内再次调用此接口，会回调 fail，errMsg："setTopBarText: fail invoke too frequently"
*
**/
    setTopBarText(option: SetTopBarTextOption): void;
    /** 
*
*
* **注意**
*
*
* - 该接口只能在 `onGetWifiList` 回调之后才能调用。
* - 此时客户端会挂起，等待快应用设置 Wi-Fi 信息，请务必尽快调用该接口，若无数据请传入一个空数组。
* - 有可能随着周边 Wi-Fi 列表的刷新，单个流程内收到多次带有存在重复的 Wi-Fi 列表的回调。
*
* **示例代码**
*
*
* ```js
qa.onGetWifiList(function(res) {
  if (res.wifiList.length) {
    qa.setWifiList({
      wifiList: [{
        SSID: res.wifiList[0].SSID,
        BSSID: res.wifiList[0].BSSID,
        password: '123456'
      }]
    })
  } else {
    qa.setWifiList({
      wifiList: []
    })
  }
})
qa.getWifiList()
```
*
**/
    setWifiList(option: SetWifiListOption): void;
    /** 
*
* ​显示操作菜单
*
* **示例代码**
*
*
* ```js
qa.showActionSheet({
  itemList: ['A', 'B', 'C'],
  success (res) {
    console.log(res.tapIndex)
  },
  fail (res) {
    console.log(res.errMsg)
  }
})
```
*
* **注意**
*
*
* - Android 6.7.2 以下版本，点击取消或蒙层时，回调 fail, errMsg 为 "fail cancel"；
* - Android 6.7.2 及以上版本，点击蒙层不会关闭模态弹窗，所以尽量避免使用「取消」分支中实现业务逻辑 */
    showActionSheet(option: ShowActionSheetOption): void;
    /** 
*
* 显示 loading 提示框。需主动调用 qa.hideLoading 才能关闭提示框
*
* **示例代码**
*
*
* ```js
qa.showLoading({
  title: '加载中',
})

setTimeout(function () {
  qa.hideLoading()
}, 2000)
```
*
* **注意**
*
*
* - `qa.showLoading` 和 `qa.showToast` 同时只能显示一个
* - `qa.showLoading` 应与 `qa.hideLoading` 配对使用
*
**/
    showLoading(option: ShowLoadingOption): void;
    /** 
*
* 显示模态对话框
*
* **示例代码**
*
*
* ```js
qa.showModal({
  title: '提示',
  content: '这是一个模态弹窗',
  success (res) {
    if (res.confirm) {
      console.log('用户点击确定')
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
})
```
*
* **注意**
*
*
* - Android 6.7.2 以下版本，点击取消或蒙层时，回调 fail, errMsg 为 "fail cancel"；
* - Android 6.7.2 及以上版本，点击蒙层不会关闭模态弹窗，所以尽量避免使用「取消」分支中实现业务逻辑 */
    showModal(option: ShowModalOption): void;
    /** 
     *
     * 在当前页面显示导航条加载动画 */
    showNavigationBarLoading(option?: ShowNavigationBarLoadingOption): void;
    /** 
     *
     * 显示 tabBar
     *
     **/
    showTabBar(option: ShowTabBarOption): void;
    /** 
     *
     * 显示 tabBar 某一项的右上角的红点
     *
     **/
    showTabBarRedDot(option: ShowTabBarRedDotOption): void;
    /** 
*
* 显示消息提示框
*
* **示例代码**
*
*
* ```js
qa.showToast({
  title: '成功',
  icon: 'success',
  duration: 2000
})
```
*
* **注意**
*
*
* - `qa.showLoading` 和 `qa.showToast` 同时只能显示一个
* - `qa.showToast` 应与 `qa.hideToast` 配对使用 */
    showToast(option: ShowToastOption): void;
    /** 
*
* 创建桌面图标。
* **示例代码**
*
*
* ```js
qa.installShortcut({
  success: function() {
    console.log('handling success')
  }
})
```
*
**/
    installShortcut(option: InstallShortcutOption): void;
    /** 
*
* 获取桌面图标是否创建。
* **示例代码**
*
*
* ```js
qa.hasInstalledShortcut({
  success: function() {
    console.log('handling success')
  }
})
```
*
**/
    hasInstalledShortcut(option: HasInstallShortcutOption): void;
    /** 
*
* 开始监听加速度数据。
*
* **示例代码**
*
*
* ```js
qa.startAccelerometer({
  interval: 'game'
})
```
*
* **注意**
*
*
* - 根据机型性能、当前 CPU 与内存的占用情况，`interval` 的设置与实际 `qa.onAccelerometerChange()` 回调函数的执行频率会有一些出入。
*
**/
    startAccelerometer(option: StartAccelerometerOption): void;
    /** 
*
* 开始搜寻附近的蓝牙外围设备。**此操作比较耗费系统资源，请在搜索并连接到设备后调用 `qa.stopBluetoothDevicesDiscovery` 方法停止搜索。**
*
* **示例代码**
*
*
* {% minicode('pQU51zmz7a3K') %}
*
* ```js
// 以快应用硬件平台的蓝牙智能灯为例，主服务的 UUID 是 FEE7。传入这个参数，只搜索主服务 UUID 为 FEE7 的设备
qa.startBluetoothDevicesDiscovery({
  services: ['FEE7'],
  success (res) {
    console.log(res)
  }
})
```
*
**/
    startBluetoothDevicesDiscovery(
      option: StartBluetoothDevicesDiscoveryOption,
    ): void;
    /** 
*
* 开始监听罗盘数据
*
* **示例代码**
*
*
* ```js
qa.startCompass()
```
*
**/
    startCompass(option?: StartCompassOption): void;
    /** 
     *
     * 开始监听设备方向的变化。
     *
     **/
    startDeviceMotionListening(option: StartDeviceMotionListeningOption): void;
    /** 
     *
     * 开始监听陀螺仪数据。
     *
     **/
    startGyroscope(option: StartGyroscopeOption): void;
    /** 
*
* 开始下拉刷新。调用后触发下拉刷新动画，效果与用户手动下拉刷新一致。
*
* **示例代码**
*
*
* ```js
qa.startPullDownRefresh()
```
*
**/
    startPullDownRefresh(option?: StartPullDownRefreshOption): void;
    /** 
*
* 建议使用 [`qa.getRecorderManager`]() 代替
* 开始录音。当主动调用 [`qa.stopRecord`]()，或者录音超过1分钟时自动结束录音。当用户离开快应用时，此接口无法调用。
*
* **示例代码**
*
*
* ```js
qa.startRecord({
  success (res) {
    const tempFilePath = res.tempFilePath
  }
})
setTimeout(function () {
  qa.stopRecord() // 结束录音
}, 10000)
``` */
    startRecord(option: QaStartRecordOption): void;
    /** 
*
* 初始化 Wi-Fi 模块。
*
* **示例代码**
*
*
* {% minicode('8P7zrkmd7r2n') %}
* ```js
qa.startWifi({
  success (res) {
    console.log(res.errMsg)
  }
})
```
*
**/
    startWifi(option?: StartWifiOption): void;
    /** 
*
* 停止监听加速度数据。
*
* **示例代码**
*
*
* ```js
qa.stopAccelerometer()
```
*
**/
    stopAccelerometer(option?: StopAccelerometerOption): void;
    /** 
*
* 停止播放音乐。
*
* **示例代码**
*
*
* ```js
qa.stopBackgroundAudio()
``` */
    stopBackgroundAudio(option?: StopBackgroundAudioOption): void;
    /** 
*
* 停止搜寻附近的蓝牙外围设备。若已经找到需要的蓝牙设备并不需要继续搜索时，建议调用该接口停止蓝牙搜索。
*
* **示例代码**
*
*
* {% minicode('pQU51zmz7a3K') %}
* ```js
qa.stopBluetoothDevicesDiscovery({
  success (res) {
    console.log(res)
  }
})
```
*
**/
    stopBluetoothDevicesDiscovery(
      option?: StopBluetoothDevicesDiscoveryOption,
    ): void;
    /** 
*
* 停止监听罗盘数据
*
* **示例代码**
*
*
* ```js
qa.stopCompass()
```
*
**/
    stopCompass(option?: StopCompassOption): void;
    /** 
     *
     * 停止监听设备方向的变化。
     *
     **/
    stopDeviceMotionListening(option?: StopDeviceMotionListeningOption): void;
    /** 
     *
     * 停止监听陀螺仪数据。
     *
     **/
    stopGyroscope(option?: StopGyroscopeOption): void;
    /** 
*
* 停止当前页面下拉刷新。
*
* **示例代码**
*
*
* ```js
Page({
  onPullDownRefresh () {
    qa.stopPullDownRefresh()
  }
})
```
*
**/
    stopPullDownRefresh(option?: StopPullDownRefreshOption): void;
    /** 
*
* 停止录音。
*
* 建议使用 [`qa.getRecorderManager`]() 代替
*
* **示例代码**
*
*
* ```js
qa.startRecord({
  success (res) {
    const tempFilePath = res.tempFilePath
  }
})
setTimeout(function () {
  qa.stopRecord() // 结束录音
}, 10000)
``` */
    stopRecord(): void;
    /** 
*
* 关闭 Wi-Fi 模块。
*
* **示例代码**
*
*
* ```js
qa.stopWifi({
  success (res) {
    console.log(res.errMsg)
  }
})
```
*
**/
    stopWifi(option?: StopWifiOption): void;
    /** 
*
* 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
*
* **示例代码**
*
*
* ```json
{
  "tabBar": {
    "list": [{
      "pagePath": "index",
      "text": "首页"
    },{
      "pagePath": "other",
      "text": "其他"
    }]
  }
}
```
*
* ```js
qa.switchTab({
  url: '/index'
})
``` */
    switchTab(option: SwitchTabOption): void;
    /** 
     *
     * 使手机发生较长时间的振动（400 ms)
     *
     **/
    vibrateLong(option?: VibrateLongOption): void;
    /** 
     *
     * 使手机发生较短时间的振动（15 ms）。
     *
     **/
    vibrateShort(option?: VibrateShortOption): void;
    /** 
*
* 向低功耗蓝牙设备特征值中写入二进制数据。注意：必须设备的特征值支持 write 才可以成功调用。
*
* **注意**
*
*
* - 并行调用多次会存在写失败的可能性。
* - 快应用不会对写入数据包大小做限制，但系统与蓝牙设备会限制蓝牙4.0单次传输的数据大小，超过最大字节数后会发生写入错误，建议每次写入不超过20字节。
* - 在调用 `notifyBLECharacteristicValueChange` 成功后立即调用 `writeBLECharacteristicValue` 接口，在部分机型上会发生 10008 系统错误
*
* **示例代码**
*
*
* {% minicode('pQU51zmz7a3K') %}
* ```js
// 向蓝牙设备发送一个0x00的16进制数据
let buffer = new ArrayBuffer(1)
let dataView = new DataView(buffer)
dataView.setUint8(0, 0)

qa.writeBLECharacteristicValue({
  // 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
  deviceId,
  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
  serviceId,
  // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
  characteristicId,
  // 这里的value是ArrayBuffer类型
  value: buffer,
  success (res) {
    console.log('writeBLECharacteristicValue success', res.errMsg)
  }
})
```
*
**/
    writeBLECharacteristicValue(
      option: WriteBLECharacteristicValueOption,
    ): void;
  }
  // #end-region (qa)

  // #region pageParams-interfaces
  interface IShareAppMessageOption {
    /** 转发事件来源。
     *
     * 可选值：
     * - `button`：页面内转发按钮；
     * - `menu`：右上角转发菜单。
     */
    from: 'button' | 'menu' | string
    /** 如果 `from` 值是 `button`，则 `target` 是触发这次转发事件的 `button`，否则为 `undefined` */
    target: any
    /** 页面中包含`<web-view>`组件时，返回当前`<web-view>`的url */
    webViewUrl?: string
  }

  interface IPageScrollOption {
    /** 页面在垂直方向已滚动的距离（单位px） */
    scrollTop: number
  }

  interface ICustomShareContent {
    /** 转发标题。默认值：当前小程序名称 */
    title?: string
    /** 转发路径，必须是以 / 开头的完整路径。默认值：当前页面 path */
    path?: string
    /** 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。默认值：使用默认截图 */
    imageUrl?: string
  }

  interface ITabItemTapOption {
    /** 被点击tabItem的序号，从0开始 */
    index: string
    /** 被点击tabItem的页面路径 */
    pagePath: string
    /** 被点击tabItem的按钮文字 */
    text: string
  }
  // #end-region pageParams-interfaces

  // #region interfaces
  interface AccessFailCallbackResult {
    /** 错误信息
     *
     * 可选值：
     * - 'fail no such file or directory ${path}': 文件/目录不存在; */
    errMsg: string;
  }
  interface AccessOption {
    /** 要判断是否存在的文件/目录路径 */
    path: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: AccessCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: AccessFailCallback;
    /** 接口调用成功的回调函数 */
    success?: AccessSuccessCallback;
  }
  interface AddPhoneContactOption {
    /** 名字 */
    firstName: string;
    /** 联系地址城市 */
    addressCity?: string;
    /** 联系地址国家 */
    addressCountry?: string;
    /** 联系地址邮政编码 */
    addressPostalCode?: string;
    /** 联系地址省份 */
    addressState?: string;
    /** 联系地址街道 */
    addressStreet?: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: AddPhoneContactCompleteCallback;
    /** 电子邮件 */
    email?: string;
    /** 接口调用失败的回调函数 */
    fail?: AddPhoneContactFailCallback;
    /** 住宅地址城市 */
    homeAddressCity?: string;
    /** 住宅地址国家 */
    homeAddressCountry?: string;
    /** 住宅地址邮政编码 */
    homeAddressPostalCode?: string;
    /** 住宅地址省份 */
    homeAddressState?: string;
    /** 住宅地址街道 */
    homeAddressStreet?: string;
    /** 住宅传真 */
    homeFaxNumber?: string;
    /** 住宅电话 */
    homePhoneNumber?: string;
    /** 公司电话 */
    hostNumber?: string;
    /** 姓氏 */
    lastName?: string;
    /** 中间名 */
    middleName?: string;
    /** 手机号 */
    mobilePhoneNumber?: string;
    /** 昵称 */
    nickName?: string;
    /** 公司 */
    organization?: string;
    /** 头像本地文件路径 */
    photoFilePath?: string;
    /** 备注 */
    remark?: string;
    /** 接口调用成功的回调函数 */
    success?: AddPhoneContactSuccessCallback;
    /** 职位 */
    title?: string;
    /** 网站 */
    url?: string;
    /** 工作地址城市 */
    workAddressCity?: string;
    /** 工作地址国家 */
    workAddressCountry?: string;
    /** 工作地址邮政编码 */
    workAddressPostalCode?: string;
    /** 工作地址省份 */
    workAddressState?: string;
    /** 工作地址街道 */
    workAddressStreet?: string;
    /** 工作传真 */
    workFaxNumber?: string;
    /** 工作电话 */
    workPhoneNumber?: string;
  }
  /** 动画效果 */
  interface AnimationOption {
    /** 动画变化时间，单位 ms */
    duration?: number;
    /** 动画变化方式
     *
     * 可选值：
     * - 'linear': 动画从头到尾的速度是相同的;
     * - 'easeIn': 动画以低速开始;
     * - 'easeOut': 动画以低速结束;
     * - 'easeInOut': 动画以低速开始和结束; */
    timingFunc?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  }
  interface AppendFileFailCallbackResult {
    /** 错误信息
     *
     * 可选值：
     * - 'fail no such file or directory, open ${filePath}': 指定的 filePath 文件不存在;
     * - 'fail illegal operation on a directory, open "${filePath}" ': 指定的 filePath 是一个已经存在的目录;
     * - 'fail permission denied, open ${dirPath}': 指定的 filePath 路径没有写权限;
     * - 'fail sdcard not mounted ': 指定的 filePath 是一个已经存在的目录; */
    errMsg: string;
  }
  interface AppendFileOption {
    /** 要追加的文本或二进制数据 */
    data: string | ArrayBuffer;
    /** 要追加内容的文件路径 */
    filePath: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: AppendFileCompleteCallback;
    /** 指定写入文件的字符编码
     *
     * 可选值：
     * - 'ascii': ;
     * - 'base64': ;
     * - 'binary': ;
     * - 'hex': ;
     * - 'ucs2/ucs-2/utf16le/utf-16le': 以小端序读取;
     * - 'utf-8/utf8': ;
     * - 'latin1': ; */
    encoding?:
      | 'ascii'
      | 'base64'
      | 'binary'
      | 'hex'
      | 'ucs2/ucs-2/utf16le/utf-16le'
      | 'utf-8/utf8'
      | 'latin1';
    /** 接口调用失败的回调函数 */
    fail?: AppendFileFailCallback;
    /** 接口调用成功的回调函数 */
    success?: AppendFileSuccessCallback;
  }
  /** 用户授权设置信息，详情参考[权限]() */
  interface AuthSetting {
    /** 是否授权摄像头，对应[`<camera />`]((camera)) 组件 */
    'scope.camera': boolean;
    /** 是否授权录音功能，对应接口 [qa.startRecord]() */
    'scope.record': boolean;
    /** 是否授权用户信息，对应接口 [qa.getUserInfo]() */
    'scope.userInfo': boolean;
    /** 是否授权地理位置，对应接口 [qa.getLocation]() */
    'scope.userLocation': boolean;
    /** 是否授权保存到相册 [qa.saveImageToPhotosAlbum]() */
    'scope.writePhotosAlbum': boolean;
  }
  interface AuthorizeOption {
    /** 需要获取权限的 scope，详见 [scope 列表]((授权#scope-列表)) */
    scope: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: AuthorizeCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: AuthorizeFailCallback;
    /** 接口调用成功的回调函数 */
    success?: AuthorizeSuccessCallback;
  }
  /** 设备服务列表 */
  interface BLECharacteristic {
    /** 该特征值支持的操作类型 */
    properties: Properties;
    /** 蓝牙设备特征值的 uuid */
    uuid: string;
  }
  /** 设备服务列表 */
  interface BLEService {
    /** 该服务是否为主服务 */
    isPrimary: boolean;
    /** 蓝牙设备服务的 uuid */
    uuid: string;
  }
  /** BackgroundAudioManager 实例，可通过 [qa.getBackgroundAudioManager]() 获取。
*
* **示例代码**
*
*
* ```js
const backgroundAudioManager = qa.getBackgroundAudioManager()

backgroundAudioManager.title = '此时此刻'
backgroundAudioManager.epname = '此时此刻'
backgroundAudioManager.singer = '许巍'
backgroundAudioManager.coverImgUrl = 'xxxx'
// 设置了 src 之后会自动播放
backgroundAudioManager.src = 'xxxx'
``` */
  interface BackgroundAudioManager {
    /** 音频已缓冲的时间，仅保证当前播放时间点到此时间点内容已缓冲。（只读） */
    buffered: number;
    /** 封面图 URL，用于做原生音频播放器背景图。原生音频播放器中的分享功能，分享出去的卡片配图及背景也将使用该图。 */
    coverImgUrl: string;
    /** 当前音频的播放位置（单位：s），只有在有合法 src 时返回。（只读） */
    currentTime: number;
    /** 当前音频的长度（单位：s），只有在有合法 src 时返回。（只读） */
    duration: number;
    /** 专辑名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。 */
    epname: string;
    /** 当前是否暂停或停止。（只读） */
    paused: boolean;
    /** 音频协议。默认值为 'http'，设置 'hls' 可以支持播放 HLS 协议的直播音频。*/
    protocol: string;
    /** 歌手名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。 */
    singer: string;
    /** 音频的数据源。默认为空字符串，**当设置了新的 src 时，会自动开始播放**，目前支持的格式有 m4a, aac, mp3, wav。 */
    src: string;
    /** 音频开始播放的位置（单位：s）。 */
    startTime: number;
    /** 音频标题，用于原生音频播放器音频标题（必填）。原生音频播放器中的分享功能，分享出去的卡片标题，也将使用该值。 */
    title: string;
    /** 页面链接，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。 */
    webUrl: string;
  }
  /** 搜索到的设备列表 */
  interface BluetoothDeviceInfo {
    /** 用于区分设备的 id */
    deviceId: string;
    /** 蓝牙设备名称，某些设备可能没有 */
    name: string;
  }
  interface BoundingClientRectCallbackResult {
    /** 节点的下边界坐标 */
    bottom: number;
    /** 节点的 dataset */
    dataset: object;
    /** 节点的高度 */
    height: number;
    /** 节点的 ID */
    id: string;
    /** 节点的左边界坐标 */
    left: number;
    /** 节点的右边界坐标 */
    right: number;
    /** 节点的上边界坐标 */
    top: number;
    /** 节点的宽度 */
    width: number;
  }
  /** 目标边界 */
  interface BoundingClientRectResult {
    /** 下边界 */
    bottom: number;
    /** 左边界 */
    left: number;
    /** 右边界 */
    right: number;
    /** 上边界 */
    top: number;
  }
  /** 新搜索到的设备列表 */
  interface CallbackResultBlueToothDevice {
    /** 当前蓝牙设备的信号强度 */
    RSSI: number;
    /** 当前蓝牙设备的广播数据段中的 ManufacturerData 数据段。 */
    advertisData: ArrayBuffer;
    /** 当前蓝牙设备的广播数据段中的 ServiceUUIDs 数据段 */
    advertisServiceUUIDs: Array<string>;
    /** 用于区分设备的 id */
    deviceId: string;
    /** 当前蓝牙设备的广播数据段中的 LocalName 数据段 */
    localName: string;
    /** 蓝牙设备名称，某些设备可能没有 */
    name: string;
    /** 当前蓝牙设备的广播数据段中的 ServiceData 数据段 */
    serviceData: object;
  }
  /** canvas 组件的绘图上下文 */
  interface CanvasContext {
    /** 填充颜色。用法同 [CanvasContext.setFillStyle()]()。
     *
     **/
    fillStyle: string;
    /** 当前字体样式的属性。符合 [CSS font 语法]() 的 DOMString 字符串，至少需要提供字体大小和字体族名。默认值为 10px sans-serif。
     *
     **/
    font: string;
    /** 全局画笔透明度。范围 0-1，0 表示完全透明，1 表示完全不透明。 */
    globalAlpha: number;
    /** 在绘制新形状时应用的合成操作的类型。*/
    globalCompositeOperation: string;
    /** 线条的端点样式。用法同 [CanvasContext.setLineCap()]()。
     *
     **/
    lineCap: number;
    /** 虚线偏移量，初始值为0
     *
     **/
    lineDashOffset: number;
    /** 线条的交点样式。用法同 [CanvasContext.setLineJoin()]()。
     *
     **/
    lineJoin: number;
    /** 线条的宽度。用法同 [CanvasContext.setLineWidth()]()。
     *
     **/
    lineWidth: number;
    /** 最大斜接长度。用法同 [CanvasContext.setMiterLimit()]()。
     *
     **/
    miterLimit: number;
    /** 边框颜色。用法同 [CanvasContext.setFillStyle()]()。
     *
     **/
    strokeStyle: string;
  }
  interface CanvasGetImageDataOption {
    /** 画布标识，传入 `<canvas>` 组件的 `canvas-id` 属性。 */
    canvasId: string;
    /** 将要被提取的图像数据矩形区域的高度 */
    height: number;
    /** 将要被提取的图像数据矩形区域的宽度 */
    width: number;
    /** 将要被提取的图像数据矩形区域的左上角横坐标 */
    x: number;
    /** 将要被提取的图像数据矩形区域的左上角纵坐标 */
    y: number;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: CanvasGetImageDataCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: CanvasGetImageDataFailCallback;
    /** 接口调用成功的回调函数 */
    success?: CanvasGetImageDataSuccessCallback;
  }
  interface CanvasGetImageDataSuccessCallbackResult {
    /** 图像数据矩形的高度 */
    height: number;
    /** 图像数据矩形的宽度 */
    width: number;
  }
  interface CanvasPutImageDataOption {
    /** 画布标识，传入 `<canvas>` 组件的 canvas-id 属性。 */
    canvasId: string;
    /** 图像像素点数据，一维数组，每四项表示一个像素点的 rgba */
    data: Uint8ClampedArray;
    /** 源图像数据矩形区域的高度 */
    height: number;
    /** 源图像数据矩形区域的宽度 */
    width: number;
    /** 源图像数据在目标画布中的位置偏移量（x 轴方向的偏移量） */
    x: number;
    /** 源图像数据在目标画布中的位置偏移量（y 轴方向的偏移量） */
    y: number;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: CanvasPutImageDataCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: CanvasPutImageDataFailCallback;
    /** 接口调用成功的回调函数 */
    success?: CanvasPutImageDataSuccessCallback;
  }
  interface ChooseImageOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: ChooseImageCompleteCallback;
    /** 最多可以选择的图片张数 */
    count?: number;
    /** 接口调用失败的回调函数 */
    fail?: ChooseImageFailCallback;
    /** 所选的图片的尺寸
     *
     * 可选值：
     * - 'original': 原图;
     * - 'compressed': 压缩图; */
    sizeType?: ('original' | 'compressed')[];
    /** 选择图片的来源
     *
     * 可选值：
     * - 'album': 从相册选图;
     * - 'camera': 使用相机; */
    sourceType?: ('album' | 'camera')[];
    /** 接口调用成功的回调函数 */
    success?: ChooseImageSuccessCallback;
  }
  interface ChooseImageSuccessCallbackResult {
    /** 图片的本地临时文件路径列表 */
    tempFilePaths: Array<string>;
    /** 图片的本地临时文件列表
     *
     **/
    tempFiles: Array<ImageFile>;
  }
  interface ChooseLocationOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: ChooseLocationCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: ChooseLocationFailCallback;
    /** 接口调用成功的回调函数 */
    success?: ChooseLocationSuccessCallback;
  }
  interface ChooseLocationSuccessCallbackResult {
    /** 详细地址 */
    address: string;
    /** 纬度，浮点数，范围为-90~90，负数表示南纬。使用 gcj02 国测局坐标系 */
    latitude: string;
    /** 经度，浮点数，范围为-180~180，负数表示西经。使用 gcj02 国测局坐标系 */
    longitude: string;
    /** 位置名称 */
    name: string;
  }
  interface ChooseVideoOption {
    /** 默认拉起的是前置或者后置摄像头。部分 Android 手机下由于系统 ROM 不支持无法生效
     *
     * 可选值：
     * - 'back': 默认拉起后置摄像头;
     * - 'front': 默认拉起前置摄像头; */
    camera?: 'back' | 'front';
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: ChooseVideoCompleteCallback;
    /** 是否压缩所选择的视频文件
     *
     **/
    compressed?: boolean;
    /** 接口调用失败的回调函数 */
    fail?: ChooseVideoFailCallback;
    /** 拍摄视频最长拍摄时间，单位秒 */
    maxDuration?: number;
    /** 视频选择的来源
     *
     * 可选值：
     * - 'album': 从相册选择视频;
     * - 'camera': 使用相机拍摄视频; */
    sourceType?: ('album' | 'camera')[];
    /** 接口调用成功的回调函数 */
    success?: ChooseVideoSuccessCallback;
  }
  interface ChooseVideoSuccessCallbackResult {
    /** 选定视频的时间长度 */
    duration: number;
    /** 返回选定视频的高度 */
    height: number;
    /** 选定视频的数据量大小 */
    size: number;
    /** 选定视频的临时文件路径 */
    tempFilePath: string;
    /** 返回选定视频的宽度 */
    width: number;
  }
  interface ClearStorageOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: ClearStorageCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: ClearStorageFailCallback;
    /** 接口调用成功的回调函数 */
    success?: ClearStorageSuccessCallback;
  }
  interface CloseBLEConnectionOption {
    /** 用于区分设备的 id */
    deviceId: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: CloseBLEConnectionCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: CloseBLEConnectionFailCallback;
    /** 接口调用成功的回调函数 */
    success?: CloseBLEConnectionSuccessCallback;
  }
  interface CloseBluetoothAdapterOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: CloseBluetoothAdapterCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: CloseBluetoothAdapterFailCallback;
    /** 接口调用成功的回调函数 */
    success?: CloseBluetoothAdapterSuccessCallback;
  }
  interface CloseOption {
    /** 一个数字值表示关闭连接的状态号，表示连接被关闭的原因。 */
    code?: number;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: CloseCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: CloseFailCallback;
    /** 一个可读的字符串，表示连接被关闭的原因。这个字符串必须是不长于 123 字节的 UTF-8 文本（不是字符）。 */
    reason?: string;
    /** 接口调用成功的回调函数 */
    success?: CloseSuccessCallback;
  }
  interface CloseSocketOption {
    /** 一个数字值表示关闭连接的状态号，表示连接被关闭的原因。 */
    code?: number;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: CloseSocketCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: CloseSocketFailCallback;
    /** 一个可读的字符串，表示连接被关闭的原因。这个字符串必须是不长于 123 字节的 UTF-8 文本（不是字符）。 */
    reason?: string;
    /** 接口调用成功的回调函数 */
    success?: CloseSocketSuccessCallback;
  }
  /** 颜色。可以用以下几种方式来表示 canvas 中使用的颜色：
   *
   * - RGB 颜色： 如 `'rgb(255, 0, 0)'`
   * - RGBA 颜色：如 `'rgba(255, 0, 0, 0.3)'`
   * - 16 进制颜色： 如 `'#FF0000'`
   * - 预定义的颜色： 如 `'red'`
   *
   * 其中预定义颜色有以下148个：
   * *注意**: Color Name 大小写不敏感
   *
   * | Color Name           | HEX     |
   * | -------------------- | ------- |
   * | AliceBlue            | #F0F8FF |
   * | AntiqueWhite         | #FAEBD7 |
   * | Aqua                 | #00FFFF |
   * | Aquamarine           | #7FFFD4 |
   * | Azure                | #F0FFFF |
   * | Beige                | #F5F5DC |
   * | Bisque               | #FFE4C4 |
   * | Black                | #000000 |
   * | BlanchedAlmond       | #FFEBCD |
   * | Blue                 | #0000FF |
   * | BlueViolet           | #8A2BE2 |
   * | Brown                | #A52A2A |
   * | BurlyWood            | #DEB887 |
   * | CadetBlue            | #5F9EA0 |
   * | Chartreuse           | #7FFF00 |
   * | Chocolate            | #D2691E |
   * | Coral                | #FF7F50 |
   * | CornflowerBlue       | #6495ED |
   * | Cornsilk             | #FFF8DC |
   * | Crimson              | #DC143C |
   * | Cyan                 | #00FFFF |
   * | DarkBlue             | #00008B |
   * | DarkCyan             | #008B8B |
   * | DarkGoldenRod        | #B8860B |
   * | DarkGray             | #A9A9A9 |
   * | DarkGrey             | #A9A9A9 |
   * | DarkGreen            | #006400 |
   * | DarkKhaki            | #BDB76B |
   * | DarkMagenta          | #8B008B |
   * | DarkOliveGreen       | #556B2F |
   * | DarkOrange           | #FF8C00 |
   * | DarkOrchid           | #9932CC |
   * | DarkRed              | #8B0000 |
   * | DarkSalmon           | #E9967A |
   * | DarkSeaGreen         | #8FBC8F |
   * | DarkSlateBlue        | #483D8B |
   * | DarkSlateGray        | #2F4F4F |
   * | DarkSlateGrey        | #2F4F4F |
   * | DarkTurquoise        | #00CED1 |
   * | DarkViolet           | #9400D3 |
   * | DeepPink             | #FF1493 |
   * | DeepSkyBlue          | #00BFFF |
   * | DimGray              | #696969 |
   * | DimGrey              | #696969 |
   * | DodgerBlue           | #1E90FF |
   * | FireBrick            | #B22222 |
   * | FloralWhite          | #FFFAF0 |
   * | ForestGreen          | #228B22 |
   * | Fuchsia              | #FF00FF |
   * | Gainsboro            | #DCDCDC |
   * | GhostWhite           | #F8F8FF |
   * | Gold                 | #FFD700 |
   * | GoldenRod            | #DAA520 |
   * | Gray                 | #808080 |
   * | Grey                 | #808080 |
   * | Green                | #008000 |
   * | GreenYellow          | #ADFF2F |
   * | HoneyDew             | #F0FFF0 |
   * | HotPink              | #FF69B4 |
   * | IndianRed            | #CD5C5C |
   * | Indigo               | #4B0082 |
   * | Ivory                | #FFFFF0 |
   * | Khaki                | #F0E68C |
   * | Lavender             | #E6E6FA |
   * | LavenderBlush        | #FFF0F5 |
   * | LawnGreen            | #7CFC00 |
   * | LemonChiffon         | #FFFACD |
   * | LightBlue            | #ADD8E6 |
   * | LightCoral           | #F08080 |
   * | LightCyan            | #E0FFFF |
   * | LightGoldenRodYellow | #FAFAD2 |
   * | LightGray            | #D3D3D3 |
   * | LightGrey            | #D3D3D3 |
   * | LightGreen           | #90EE90 |
   * | LightPink            | #FFB6C1 |
   * | LightSalmon          | #FFA07A |
   * | LightSeaGreen        | #20B2AA |
   * | LightSkyBlue         | #87CEFA |
   * | LightSlateGray       | #778899 |
   * | LightSlateGrey       | #778899 |
   * | LightSteelBlue       | #B0C4DE |
   * | LightYellow          | #FFFFE0 |
   * | Lime                 | #00FF00 |
   * | LimeGreen            | #32CD32 |
   * | Linen                | #FAF0E6 |
   * | Magenta              | #FF00FF |
   * | Maroon               | #800000 |
   * | MediumAquaMarine     | #66CDAA |
   * | MediumBlue           | #0000CD |
   * | MediumOrchid         | #BA55D3 |
   * | MediumPurple         | #9370DB |
   * | MediumSeaGreen       | #3CB371 |
   * | MediumSlateBlue      | #7B68EE |
   * | MediumSpringGreen    | #00FA9A |
   * | MediumTurquoise      | #48D1CC |
   * | MediumVioletRed      | #C71585 |
   * | MidnightBlue         | #191970 |
   * | MintCream            | #F5FFFA |
   * | MistyRose            | #FFE4E1 |
   * | Moccasin             | #FFE4B5 |
   * | NavajoWhite          | #FFDEAD |
   * | Navy                 | #000080 |
   * | OldLace              | #FDF5E6 |
   * | Olive                | #808000 |
   * | OliveDrab            | #6B8E23 |
   * | Orange               | #FFA500 |
   * | OrangeRed            | #FF4500 |
   * | Orchid               | #DA70D6 |
   * | PaleGoldenRod        | #EEE8AA |
   * | PaleGreen            | #98FB98 |
   * | PaleTurquoise        | #AFEEEE |
   * | PaleVioletRed        | #DB7093 |
   * | PapayaWhip           | #FFEFD5 |
   * | PeachPuff            | #FFDAB9 |
   * | Peru                 | #CD853F |
   * | Pink                 | #FFC0CB |
   * | Plum                 | #DDA0DD |
   * | PowderBlue           | #B0E0E6 |
   * | Purple               | #800080 |
   * | RebeccaPurple        | #663399 |
   * | Red                  | #FF0000 |
   * | RosyBrown            | #BC8F8F |
   * | RoyalBlue            | #4169E1 |
   * | SaddleBrown          | #8B4513 |
   * | Salmon               | #FA8072 |
   * | SandyBrown           | #F4A460 |
   * | SeaGreen             | #2E8B57 |
   * | SeaShell             | #FFF5EE |
   * | Sienna               | #A0522D |
   * | Silver               | #C0C0C0 |
   * | SkyBlue              | #87CEEB |
   * | SlateBlue            | #6A5ACD |
   * | SlateGray            | #708090 |
   * | SlateGrey            | #708090 |
   * | Snow                 | #FFFAFA |
   * | SpringGreen          | #00FF7F |
   * | SteelBlue            | #4682B4 |
   * | Tan                  | #D2B48C |
   * | Teal                 | #008080 |
   * | Thistle              | #D8BFD8 |
   * | Tomato               | #FF6347 |
   * | Turquoise            | #40E0D0 |
   * | Violet               | #EE82EE |
   * | Wheat                | #F5DEB3 |
   * | White                | #FFFFFF |
   * | WhiteSmoke           | #F5F5F5 |
   * | Yellow               | #FFFF00 |
   * | YellowGreen          | #9ACD32 | */
  interface Color {}
  interface CompressImageOption {
    /** 图片路径，图片的路径，可以是相对路径、临时文件路径、存储文件路径 */
    src: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: CompressImageCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: CompressImageFailCallback;
    /** 压缩质量，范围0～100，数值越小，质量越低，压缩率越高（仅对jpg有效）。 */
    quality?: number;
    /** 接口调用成功的回调函数 */
    success?: CompressImageSuccessCallback;
  }
  interface ConnectSocketOption {
    /** 开发者服务器 wss 接口地址 */
    url: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: ConnectSocketCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: ConnectSocketFailCallback;
    /** HTTP Header，Header 中不能设置 Referer */
    header?: object;
    /** 子协议数组
     *
     **/
    protocols?: Array<string>;
    /** 接口调用成功的回调函数 */
    success?: ConnectSocketSuccessCallback;
  }
  interface ConnectWifiOption {
    /** Wi-Fi 设备 BSSID */
    BSSID: string;
    /** Wi-Fi 设备 SSID */
    SSID: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: ConnectWifiCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: ConnectWifiFailCallback;
    /** Wi-Fi 设备密码 */
    password?: string;
    /** 接口调用成功的回调函数 */
    success?: ConnectWifiSuccessCallback;
  }
  interface ContextCallbackResult {
    /** 节点对应的 Context 对象 */
    context: object;
  }
  interface CopyFileFailCallbackResult {
    /** 错误信息
     *
     * 可选值：
     * - 'fail permission denied, copyFile ${srcPath} -> ${destPath}': 指定目标文件路径没有写权限;
     * - 'fail no such file or directory, copyFile ${srcPath} -> ${destPath}': 源文件不存在，或目标文件路径的上层目录不存在; */
    errMsg: string;
  }
  interface CopyFileOption {
    /** 目标文件路径 */
    destPath: string;
    /** 源文件路径，只可以是普通文件 */
    srcPath: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: CopyFileCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: CopyFileFailCallback;
    /** 接口调用成功的回调函数 */
    success?: CopyFileSuccessCallback;
  }
  interface CreateAnimationOption {
    /** 动画延迟时间，单位 ms */
    delay?: number;
    /** 动画持续时间，单位 ms */
    duration?: number;
    /** 动画的效果
     *
     * 可选值：
     * - 'linear': 动画从头到尾的速度是相同的;
     * - 'ease': 动画以低速开始，然后加快，在结束前变慢;
     * - 'ease-in': 动画以低速开始;
     * - 'ease-in-out': 动画以低速开始和结束;
     * - 'ease-out': 动画以低速结束;
     * - 'step-start': 动画第一帧就跳至结束状态直到结束;
     * - 'step-end': 动画一直保持开始状态，最后一帧跳到结束状态; */
    timingFunction?:
      | 'linear'
      | 'ease'
      | 'ease-in'
      | 'ease-in-out'
      | 'ease-out'
      | 'step-start'
      | 'step-end';
    transformOrigin?: string;
  }
  interface CreateBLEConnectionOption {
    /** 用于区分设备的 id */
    deviceId: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: CreateBLEConnectionCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: CreateBLEConnectionFailCallback;
    /** 接口调用成功的回调函数 */
    success?: CreateBLEConnectionSuccessCallback;
    /** 超时时间，单位ms，不填表示不会超时 */
    timeout?: number;
  }
  /** 选项 */
  interface CreateIntersectionObserverOption {
    /** 初始的相交比例，如果调用时检测到的相交比例与这个值不相等且达到阈值，则会触发一次监听器的回调函数。 */
    initialRatio?: number;
    /** 是否同时观测多个目标节点（而非一个），如果设为 true ，observe 的 targetSelector 将选中多个节点（注意：同时选中过多节点将影响渲染性能）
     *
     **/
    observeAll?: boolean;
    /** 一个数值数组，包含所有阈值。 */
    thresholds?: Array<number>;
  }
  /** 弹幕内容 */
  interface Danmu {
    /** 弹幕文字 */
    text: string;
    /** 弹幕颜色 */
    color?: string;
  }
  /** 上报的自定义数据。 */
  interface Data {
    /** 配置中的字段名 */
    key: string;
    /** 上报的数据 */
    value: any;
  }
  /** 可选的字体描述符 */
  interface DescOption {
    /** 字体样式，可选值为 normal / italic / oblique */
    style?: string;
    /** 设置小型大写字母的字体显示文本，可选值为 normal / small-caps / inherit */
    variant?: string;
    /** 字体粗细，可选值为 normal / bold / 100 / 200../ 900 */
    weight?: string;
  }
  /** 指定 marker 移动到的目标点 */
  interface DestinationOption {
    /** 纬度 */
    latitude: number;
    /** 经度 */
    longitude: number;
  }
  interface DownloadFileOption {
    /** 下载资源的 url */
    url: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: DownloadFileCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: DownloadFileFailCallback;
    /** 指定文件下载后存储的路径
     *
     **/
    filePath?: string;
    /** HTTP 请求的 Header，Header 中不能设置 Referer */
    header?: object;
    /** 接口调用成功的回调函数 */
    success?: DownloadFileSuccessCallback;
  }
  interface DownloadFileSuccessCallbackResult {
    /** 开发者服务器返回的 HTTP 状态码 */
    statusCode: number;
    /** 临时文件路径。如果没传入 filePath 指定文件存储路径，则下载后的文件会存储到一个临时文件 */
    tempFilePath: string;
  }
  interface DownloadTaskOnHeadersReceivedCallbackResult {
    /** 开发者服务器返回的 HTTP Response Header */
    header: object;
  }
  interface DownloadTaskOnProgressUpdateCallbackResult {
    /** 下载进度百分比 */
    progress: number;
    /** 预期需要下载的数据总长度，单位 Bytes */
    totalBytesExpectedToWrite: number;
    /** 已经下载的数据长度，单位 Bytes */
    totalBytesWritten: number;
  }
  interface ExitFullScreenOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: ExitFullScreenCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: ExitFullScreenFailCallback;
    /** 接口调用成功的回调函数 */
    success?: ExitFullScreenSuccessCallback;
  }
  interface Fields {
    /** 指定样式名列表，返回节点对应样式名的当前值
     *
     **/
    computedStyle?: Array<string>;
    /** 是否返回节点对应的 Context 对象
     *
     **/
    context?: boolean;
    /** 是否返回节点 dataset */
    dataset?: boolean;
    /** 是否返回节点 id */
    id?: boolean;
    /** 指定属性名列表，返回节点对应属性名的当前属性值（只能获得组件文档中标注的常规属性值，id class style 和事件绑定的属性值不可获取） */
    properties?: Array<string>;
    /** 是否返回节点布局位置（`left` `right` `top` `bottom`） */
    rect?: boolean;
    /** 否 是否返回节点的 `scrollLeft` `scrollTop`，节点必须是 `scroll-view` 或者 `viewport` */
    scrollOffset?: boolean;
    /** 是否返回节点尺寸（`width` `height`） */
    size?: boolean;
  }
  interface GetBLEDeviceCharacteristicsOption {
    /** 蓝牙设备 id */
    deviceId: string;
    /** 蓝牙服务 uuid，需要使用 `getBLEDeviceServices` 获取 */
    serviceId: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: GetBLEDeviceCharacteristicsCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: GetBLEDeviceCharacteristicsFailCallback;
    /** 接口调用成功的回调函数 */
    success?: GetBLEDeviceCharacteristicsSuccessCallback;
  }
  interface GetBLEDeviceCharacteristicsSuccessCallbackResult {
    /** 设备服务列表 */
    characteristics: BLECharacteristic;
  }
  interface GetBLEDeviceServicesOption {
    /** 蓝牙设备 id */
    deviceId: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: GetBLEDeviceServicesCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: GetBLEDeviceServicesFailCallback;
    /** 接口调用成功的回调函数 */
    success?: GetBLEDeviceServicesSuccessCallback;
  }
  interface GetBLEDeviceServicesSuccessCallbackResult {
    /** 设备服务列表 */
    services: BLEService;
  }
  interface GetBackgroundAudioPlayerStateOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: GetBackgroundAudioPlayerStateCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: GetBackgroundAudioPlayerStateFailCallback;
    /** 接口调用成功的回调函数 */
    success?: GetBackgroundAudioPlayerStateSuccessCallback;
  }
  interface GetBackgroundAudioPlayerStateSuccessCallbackResult {
    /** 选定音频的播放位置（单位：s），只有在音乐播放中时返回 */
    currentPosition: number;
    /** 歌曲数据链接，只有在音乐播放中时返回 */
    dataUrl: string;
    /** 选定音频的长度（单位：s），只有在音乐播放中时返回 */
    duration: number;
    /** 播放状态
     *
     * 可选值：
     * - 0: 暂停中;
     * - 1: 播放中;
     * - 2: 没有音乐播放; */
    status: 0 | 1 | 2;
  }
  interface GetBatteryInfoOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: GetBatteryInfoCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: GetBatteryInfoFailCallback;
    /** 接口调用成功的回调函数 */
    success?: GetBatteryInfoSuccessCallback;
  }
  interface GetBatteryInfoSuccessCallbackResult {
    /** 是否正在充电中 */
    isCharging: boolean;
    /** 设备电量，范围 1 - 100 */
    level: string;
  }
  interface GetBatteryInfoSyncResult {
    /** 是否正在充电中 */
    isCharging: boolean;
    /** 设备电量，范围 1 - 100 */
    level: string;
  }
  interface GetBluetoothAdapterStateOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: GetBluetoothAdapterStateCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: GetBluetoothAdapterStateFailCallback;
    /** 接口调用成功的回调函数 */
    success?: GetBluetoothAdapterStateSuccessCallback;
  }
  interface GetBluetoothAdapterStateSuccessCallbackResult {
    /** 蓝牙适配器是否可用 */
    available: boolean;
    /** 是否正在搜索设备 */
    discovering: boolean;
  }
  interface GetBluetoothDevicesOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: GetBluetoothDevicesCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: GetBluetoothDevicesFailCallback;
    /** 接口调用成功的回调函数 */
    success?: GetBluetoothDevicesSuccessCallback;
  }
  interface GetBluetoothDevicesSuccessCallbackResult {
    /** uuid 对应的的已连接设备列表 */
    devices: GetBluetoothDevicesSuccessCallbackResultBlueToothDevice;
  }
  /** uuid 对应的的已连接设备列表 */
  interface GetBluetoothDevicesSuccessCallbackResultBlueToothDevice {
    /** 当前蓝牙设备的信号强度 */
    RSSI: number;
    /** 当前蓝牙设备的广播数据段中的 ManufacturerData 数据段。 */
    advertisData: ArrayBuffer;
    /** 当前蓝牙设备的广播数据段中的 ServiceUUIDs 数据段 */
    advertisServiceUUIDs: Array<string>;
    /** 用于区分设备的 id */
    deviceId: string;
    /** 当前蓝牙设备的广播数据段中的 LocalName 数据段 */
    localName: string;
    /** 蓝牙设备名称，某些设备可能没有 */
    name: string;
    /** 当前蓝牙设备的广播数据段中的 ServiceData 数据段 */
    serviceData: object;
  }
  interface GetCenterLocationOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: GetCenterLocationCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: GetCenterLocationFailCallback;
    /** 接口调用成功的回调函数 */
    success?: GetCenterLocationSuccessCallback;
  }
  interface GetCenterLocationSuccessCallbackResult {
    /** 纬度 */
    latitude: number;
    /** 经度 */
    longitude: number;
  }
  interface GetClipboardDataOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: GetClipboardDataCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: GetClipboardDataFailCallback;
    /** 接口调用成功的回调函数 */
    success?: GetClipboardDataSuccessCallback;
  }
  interface GetClipboardDataSuccessCallbackOption {
    /** 剪贴板的内容 */
    data: string;
  }
  interface GetConnectedBluetoothDevicesOption {
    /** 蓝牙设备主 service 的 uuid 列表 */
    services: Array<string>;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: GetConnectedBluetoothDevicesCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: GetConnectedBluetoothDevicesFailCallback;
    /** 接口调用成功的回调函数 */
    success?: GetConnectedBluetoothDevicesSuccessCallback;
  }
  interface GetConnectedBluetoothDevicesSuccessCallbackResult {
    /** 搜索到的设备列表 */
    devices: BluetoothDeviceInfo;
  }
  interface GetConnectedWifiOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: GetConnectedWifiCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: GetConnectedWifiFailCallback;
    /** 接口调用成功的回调函数 */
    success?: GetConnectedWifiSuccessCallback;
  }
  interface GetConnectedWifiSuccessCallbackResult {
    /** [WifiInfo]()
     *
     * Wi-Fi 信息 */
    wifi: WifiInfo;
  }
  interface GetFileInfoFailCallbackResult {
    /** 错误信息
     *
     * 可选值：
     * - 'fail file not exist': 指定的 filePath 找不到文件; */
    errMsg: string;
  }
  interface GetImageInfoOption {
    /** 图片的路径，可以是相对路径、临时文件路径、存储文件路径、网络图片路径 */
    src: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: GetImageInfoCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: GetImageInfoFailCallback;
    /** 接口调用成功的回调函数 */
    success?: GetImageInfoSuccessCallback;
  }
  interface GetImageInfoSuccessCallbackResult {
    /** 图片原始高度，单位px。不考虑旋转。 */
    height: number;
    /** [拍照时设备方向]()
     *
     * 可选值：
     * - 'up': 默认方向（手机横持拍照），对应 Exif 中的 1。或无 orientation 信息。;
     * - 'up-mirrored': 同 up，但镜像翻转，对应 Exif 中的 2;
     * - 'down': 旋转180度，对应 Exif 中的 3;
     * - 'down-mirrored': 同 down，但镜像翻转，对应 Exif 中的 4;
     * - 'left-mirrored': 同 left，但镜像翻转，对应 Exif 中的 5;
     * - 'right': 顺时针旋转90度，对应 Exif 中的 6;
     * - 'right-mirrored': 同 right，但镜像翻转，对应 Exif 中的 7;
     * - 'left': 逆时针旋转90度，对应 Exif 中的 8;
     *
     **/
    orientation:
      | 'up'
      | 'up-mirrored'
      | 'down'
      | 'down-mirrored'
      | 'left-mirrored'
      | 'right'
      | 'right-mirrored'
      | 'left';
    /** 图片的本地路径 */
    path: string;
    /** 图片格式
     *
     **/
    type: string;
    /** 图片原始宽度，单位px。不考虑旋转。 */
    width: number;
  }
  interface GetLocationOption {
    /** 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
     *
     **/
    altitude?: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: GetLocationCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: GetLocationFailCallback;
    /** 接口调用成功的回调函数 */
    success?: GetLocationSuccessCallback;
    /** wgs84 返回 gps 坐标，gcj02 返回可用于 qa.openLocation 的坐标 */
    type?: string;
  }
  interface GetLocationSuccessCallbackResult {
    /** 位置的精确度 */
    accuracy: number;
    /** 高度，单位 m
     *
     **/
    altitude: number;
    /** 水平精度，单位 m
     *
     **/
    horizontalAccuracy: number;
    /** 纬度，范围为 -90~90，负数表示南纬 */
    latitude: number;
    /** 经度，范围为 -180~180，负数表示西经 */
    longitude: number;
    /** 速度，单位 m/s */
    speed: number;
  }
  interface GetNetworkTypeOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: GetNetworkTypeCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: GetNetworkTypeFailCallback;
    /** 接口调用成功的回调函数 */
    success?: GetNetworkTypeSuccessCallback;
  }
  interface GetNetworkTypeSuccessCallbackResult {
    /** 网络类型
     *
     * 可选值：
     * - 'wifi': wifi 网络;
     * - '2g': 2g 网络;
     * - '3g': 3g 网络;
     * - '4g': 4g 网络;
     * - 'unknown': Android 下不常见的网络类型;
     * - 'none': 无网络; */
    networkType: 'wifi' | '2g' | '3g' | '4g' | 'unknown' | 'none';
  }
  interface GetRegionOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: GetRegionCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: GetRegionFailCallback;
    /** 接口调用成功的回调函数 */
    success?: GetRegionSuccessCallback;
  }
  interface GetRegionSuccessCallbackResult {
    /** 东北角经纬度 */
    northeast: number;
    /** 西南角经纬度 */
    southwest: number;
  }
  interface GetSavedFileInfoOption {
    /** 文件路径 */
    filePath: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: GetSavedFileInfoCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: GetSavedFileInfoFailCallback;
    /** 接口调用成功的回调函数 */
    success?: GetSavedFileInfoSuccessCallback;
  }
  interface GetSavedFileInfoSuccessCallbackResult {
    /** 文件保存时的时间戳，从1970/01/01 08:00:00 到该时刻的秒数 */
    createTime: number;
    /** 文件大小，单位 B */
    size: number;
  }
  interface GetScaleOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: GetScaleCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: GetScaleFailCallback;
    /** 接口调用成功的回调函数 */
    success?: GetScaleSuccessCallback;
  }
  interface GetScaleSuccessCallbackResult {
    /** 缩放值 */
    scale: number;
  }
  interface GetScreenBrightnessOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: GetScreenBrightnessCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: GetScreenBrightnessFailCallback;
    /** 接口调用成功的回调函数 */
    success?: GetScreenBrightnessSuccessCallback;
  }
  interface GetScreenBrightnessSuccessCallbackOption {
    /** 屏幕亮度值，范围 0 ~ 1，0 最暗，1 最亮 */
    value: number;
  }
  interface GetSettingOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: GetSettingCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: GetSettingFailCallback;
    /** 接口调用成功的回调函数 */
    success?: GetSettingSuccessCallback;
  }
  interface GetSettingSuccessCallbackResult {
    /** [AuthSetting]()
     *
     * 用户授权结果 */
    authSetting: AuthSetting;
  }
  interface GetStorageInfoOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: GetStorageInfoCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: GetStorageInfoFailCallback;
    /** 接口调用成功的回调函数 */
    success?: GetStorageInfoSuccessCallback;
  }
  interface GetStorageInfoSuccessCallbackOption {
    /** 当前占用的空间大小, 单位 KB */
    currentSize: number;
    /** 当前 storage 中所有的 key */
    keys: Array<string>;
    /** 限制的空间大小，单位 KB */
    limitSize: number;
  }
  interface GetStorageInfoSyncOption {
    /** 当前占用的空间大小, 单位 KB */
    currentSize: number;
    /** 当前 storage 中所有的 key */
    keys: Array<string>;
    /** 限制的空间大小，单位 KB */
    limitSize: number;
  }
  interface GetStorageOption {
    /** 本地缓存中指定的 key */
    key: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: GetStorageCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: GetStorageFailCallback;
    /** 接口调用成功的回调函数 */
    success?: GetStorageSuccessCallback;
  }
  interface GetStorageSuccessCallbackResult {
    /** key对应的内容 */
    data: any;
  }
  interface GetSystemInfoOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: GetSystemInfoCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: GetSystemInfoFailCallback;
    /** 接口调用成功的回调函数 */
    success?: GetSystemInfoSuccessCallback;
  }
  interface GetSystemInfoSuccessCallbackResult {
    /** 设备品牌 */
    brand: string;
    /** 设备型号 */
    model: string;
    /** 设备像素比 */
    pixelRatio: number;
    /** 屏幕高度 */
    screenHeight: number;
    /** 屏幕宽度 */
    screenWidth: number;
    /** 可使用窗口高度 */
    windowHeight: number;
    /** 可使用窗口宽度 */
    windowWidth: number;
    /** 状态栏的高度 */
    statusBarHeight: number;
    /** 当前系统语言 */
    language: string;
    /** 快应用引擎版本号 */
    version: string;
    /** 操作系统及版本 */
    system: string;
    /** 客户端平台 */
    platform: string;
    /** 用户字体大小（单位px）。*/
    fontSizeSetting: number;
    /** 允许使用摄像头的开关 */
    cameraAuthorized: boolean;
    /** 允许使用定位的开关 */
    locationAuthorized:  boolean;
    /** 允许使用麦克风的开关 */
    microphoneAuthorized:  boolean;
    /** 允许通知的开关 */
    notificationAuthorized:  boolean;
    /** 蓝牙的系统开关 */
    bluetoothEnabled:  boolean;
    /** 地理位置的系统开关 */
    locationEnabled:  boolean;
    /** Wi-Fi 的系统开关 */
    wifiEnabled:  boolean;
  }
  interface GetSystemInfoSyncResult {
    /** 设备品牌 */
    brand: string;
    /** 设备型号 */
    model: string;
    /** 设备像素比 */
    pixelRatio: number;
    /** 屏幕高度 */
    screenHeight: number;
    /** 屏幕宽度 */
    screenWidth: number;
    /** 可使用窗口高度 */
    windowHeight: number;
    /** 可使用窗口宽度 */
    windowWidth: number;
    /** 状态栏的高度 */
    statusBarHeight: number;
    /** 当前系统语言 */
    language: string;
    /** 快应用引擎版本号 */
    version: string;
    /** 操作系统及版本 */
    system: string;
    /** 客户端平台 */
    platform: string;
    /** 用户字体大小（单位px）。*/
    fontSizeSetting: number;
    /** 允许使用摄像头的开关 */
    cameraAuthorized: boolean;
    /** 允许使用定位的开关 */
    locationAuthorized:  boolean;
    /** 允许使用麦克风的开关 */
    microphoneAuthorized:  boolean;
    /** 允许通知的开关 */
    notificationAuthorized:  boolean;
    /** 蓝牙的系统开关 */
    bluetoothEnabled:  boolean;
    /** 地理位置的系统开关 */
    locationEnabled:  boolean;
    /** Wi-Fi 的系统开关 */
    wifiEnabled:  boolean;
  }
  interface GetUserInfoOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: GetUserInfoCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: GetUserInfoFailCallback;
    /** 接口调用成功的回调函数 */
    success?: GetUserInfoSuccessCallback;
  }
  interface GetUserInfoSuccessCallbackResult {
    /** 用户的 openid，可能为空 */
    openid: string;
    /** 用户的 user id，可能为空 */
    id: string;
    /** 用户在开放平台上的唯一标示符，本字段在满足一定条件下才会返回（需要在厂商的开放平台上额外申请） */
    unionid: string;
    /** 用户的昵称，可能为空 */
    nickname: string;
    /** 用户的昵称，可能为空 */
    avatar: Object;
  }
  interface GetWifiListOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: GetWifiListCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: GetWifiListFailCallback;
    /** 接口调用成功的回调函数 */
    success?: GetWifiListSuccessCallback;
  }
  interface HideLoadingOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: HideLoadingCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: HideLoadingFailCallback;
    /** 接口调用成功的回调函数 */
    success?: HideLoadingSuccessCallback;
  }
  interface HideNavigationBarLoadingOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: HideNavigationBarLoadingCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: HideNavigationBarLoadingFailCallback;
    /** 接口调用成功的回调函数 */
    success?: HideNavigationBarLoadingSuccessCallback;
  }
  interface HideTabBarOption {
    /** 是否需要动画效果 */
    animation?: boolean;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: HideTabBarCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: HideTabBarFailCallback;
    /** 接口调用成功的回调函数 */
    success?: HideTabBarSuccessCallback;
  }
  interface HideTabBarRedDotOption {
    /** tabBar 的哪一项，从左边算起 */
    index: number;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: HideTabBarRedDotCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: HideTabBarRedDotFailCallback;
    /** 接口调用成功的回调函数 */
    success?: HideTabBarRedDotSuccessCallback;
  }
  interface HideToastOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: HideToastCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: HideToastFailCallback;
    /** 接口调用成功的回调函数 */
    success?: HideToastSuccessCallback;
  }
  /** 图片的本地临时文件列表
   *
   **/
  interface ImageFile {
    /** 本地临时文件路径 */
    path: string;
    /** 本地临时文件大小，单位 B */
    size: number;
  }
  interface IncludePointsOption {
    /** 要显示在可视区域内的坐标点列表 */
    points: MapPostion;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: IncludePointsCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: IncludePointsFailCallback;
    /** 坐标点形成的矩形边缘到地图边缘的距离，单位像素。格式为[上,右,下,左]，只能识别数组第一项，上下左右的padding一致。 */
    padding?: Array<number>;
    /** 接口调用成功的回调函数 */
    success?: IncludePointsSuccessCallback;
  }
  /** InnerAudioContext 实例，可通过 [qa.createInnerAudioContext]() 接口获取实例。
*
* **示例代码**
*
*
* ```js
const innerAudioContext = qa.createInnerAudioContext()
innerAudioContext.autoplay = true
innerAudioContext.src = 'xxxx'
innerAudioContext.onPlay(() => {
  console.log('开始播放')
})
innerAudioContext.onError((res) => {
  console.log(res.errMsg)
  console.log(res.errCode)
})
``` */
  interface InnerAudioContext {
    /** 是否自动开始播放，默认为 `false` */
    autoplay: boolean;
    /** 当前音频的播放位置（单位 s）。只有在当前有合法的 src 时返回，时间保留小数点后 6 位（只读） */
    currentTime: number;
    /** 当前音频的长度（单位 s）。只有在当前有合法的 src 时返回（只读） */
    duration: number;
    /** 是否循环播放，默认为 `false` */
    loop: boolean;
    /** 当前是是否暂停或停止状态（只读） */
    paused: boolean;
    /** 音频资源的地址，用于直接播放。 */
    src: string;
    /** 开始播放的位置（单位：s），默认为 0 */
    startTime: number;
    /** 音量。范围 0~1。默认为 1
     *
     **/
    volume: number;
  }
  interface InnerAudioContextOnErrorCallbackResult {
    /**
     *
     * 可选值：
     * - 10001: 系统错误;
     * - 10002: 网络错误;
     * - 10003: 文件错误;
     * - 10004: 格式错误;
     * - -1: 未知错误; */
    errCode: 10001 | 10002 | 10003 | 10004 | -1;
  }
  /** 相交区域的边界 */
  interface IntersectionRectResult {
    /** 下边界 */
    bottom: number;
    /** 左边界 */
    left: number;
    /** 右边界 */
    right: number;
    /** 上边界 */
    top: number;
  }
  interface LoadFontFaceOption {
    /** 定义的字体名称 */
    family: string;
    /** 字体资源的地址 */
    source: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: LoadFontFaceCompleteCallback;
    /** 可选的字体描述符 */
    desc?: DescOption;
    /** 接口调用失败的回调函数 */
    fail?: LoadFontFaceFailCallback;
    /** 接口调用成功的回调函数 */
    success?: LoadFontFaceSuccessCallback;
  }
  interface LoginOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: LoginCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: LoginFailCallback;
    /** 接口调用成功的回调函数 */
    success?: LoginSuccessCallback;
    /** 超时时间，单位ms
     *
     **/
    timeout?: number;
  }
  interface LoginSuccessCallbackResult {
    /** 用户登录凭证（有效期五分钟）。 */
    code: string;
  }
  interface MakePhoneCallOption {
    /** 需要拨打的电话号码 */
    phoneNumber: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: MakePhoneCallCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: MakePhoneCallFailCallback;
    /** 接口调用成功的回调函数 */
    success?: MakePhoneCallSuccessCallback;
  }
  /** 要显示在可视区域内的坐标点列表 */
  interface MapPostion {
    /** 纬度 */
    latitude: number;
    /** 经度 */
    longitude: number;
  }
  /** 快应用帐号信息 */
  interface MiniProgram {
    /** 快应用 appId */
    appId: string;
  }
  interface MkdirFailCallbackResult {
    /** 错误信息
     *
     * 可选值：
     * - 'fail no such file or directory ${dirPath}': 上级目录不存在;
     * - 'fail permission denied, open ${dirPath}': 指定的 filePath 路径没有写权限;
     * - 'fail file already exists ${dirPath}': 有同名文件或目录; */
    errMsg: string;
  }
  interface MkdirOption {
    /** 创建的目录路径 */
    dirPath: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: MkdirCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: MkdirFailCallback;
    /** 是否在递归创建该目录的上级目录后再创建该目录。如果对应的上级目录已经存在，则不创建该上级目录。如 dirPath 为 a/b/c/d 且 recursive 为 true，将创建 a 目录，再在 a 目录下创建 b 目录，以此类推直至创建 a/b/c 目录下的 d 目录。
     *
     **/
    recursive?: boolean;
    /** 接口调用成功的回调函数 */
    success?: MkdirSuccessCallback;
  }
  interface MuteOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: MuteCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: MuteFailCallback;
    /** 接口调用成功的回调函数 */
    success?: MuteSuccessCallback;
  }
  interface NavigateBackMiniProgramOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: NavigateBackMiniProgramCompleteCallback;
    /** 需要返回给上一个快应用的数据，上一个快应用可在 `App.onShow` 中获取到这份数据。 [详情]((快应用 App))。 */
    extraData?: object;
    /** 接口调用失败的回调函数 */
    fail?: NavigateBackMiniProgramFailCallback;
    /** 接口调用成功的回调函数 */
    success?: NavigateBackMiniProgramSuccessCallback;
  }
  interface NavigateBackOption {
    /** 返回的页面数，如果 delta 大于现有页面数，则返回到首页。 */
    delta: number;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: NavigateBackCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: NavigateBackFailCallback;
    /** 接口调用成功的回调函数 */
    success?: NavigateBackSuccessCallback;
  }
  interface NavigateToMiniProgramOption {
    /** 要打开的快应用 appId */
    appId: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: NavigateToMiniProgramCompleteCallback;
    /** 需要传递给目标快应用的数据。 */
    extraData?: object;
    /** 接口调用失败的回调函数 */
    fail?: NavigateToMiniProgramFailCallback;
    /** 打开的页面路径，如果为空则打开首页 */
    path?: string;
    /** 接口调用成功的回调函数 */
    success?: NavigateToMiniProgramSuccessCallback;
  }
  interface NavigateToOption {
    /** 需要跳转的应用内非 tabBar 的页面的路径, 路径后可以带参数。参数与路径之间使用 `?` 分隔，参数键与参数值用 `=` 相连，不同参数用 `&` 分隔；如 'path?key=value&key2=value2' */
    url: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: NavigateToCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: NavigateToFailCallback;
    /** 接口调用成功的回调函数 */
    success?: NavigateToSuccessCallback;
  }
  interface NotifyBLECharacteristicValueChangeOption {
    /** 蓝牙特征值的 uuid */
    characteristicId: string;
    /** 蓝牙设备 id */
    deviceId: string;
    /** 蓝牙特征值对应服务的 uuid */
    serviceId: string;
    /** 是否启用 notify */
    state: boolean;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: NotifyBLECharacteristicValueChangeCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: NotifyBLECharacteristicValueChangeFailCallback;
    /** 接口调用成功的回调函数 */
    success?: NotifyBLECharacteristicValueChangeSuccessCallback;
  }
  interface ObserveCallbackResult {
    /** 目标边界 */
    boundingClientRect: BoundingClientRectResult;
    /** 相交比例 */
    intersectionRatio: number;
    /** 相交区域的边界 */
    intersectionRect: IntersectionRectResult;
    /** 参照区域的边界 */
    relativeRect: RelativeRectResult;
    /** 相交检测时的时间戳 */
    time: number;
  }
  interface OnAccelerometerChangeCallbackResult {
    /** X 轴 */
    x: number;
    /** Y 轴 */
    y: number;
    /** Z 轴 */
    z: number;
  }
  interface OnAppShowCallbackResult {
    object: ResultOption;
  }
  interface OnBLECharacteristicValueChangeCallbackResult {
    /** 蓝牙特征值的 uuid */
    characteristicId: string;
    /** 蓝牙设备 id */
    deviceId: string;
    /** 蓝牙特征值对应服务的 uuid */
    serviceId: string;
    /** 特征值最新的值 */
    value: ArrayBuffer;
  }
  interface OnBLEConnectionStateChangeCallbackResult {
    /** 是否处于已连接状态 */
    connected: boolean;
    /** 蓝牙设备ID */
    deviceId: string;
  }
  interface OnBluetoothAdapterStateChangeCallbackResult {
    /** 蓝牙适配器是否可用 */
    available: boolean;
    /** 蓝牙适配器是否处于搜索状态 */
    discovering: boolean;
  }
  interface OnBluetoothDeviceFoundCallbackResult {
    /** 新搜索到的设备列表 */
    devices: CallbackResultBlueToothDevice;
  }
  interface OnCompassChangeCallbackResult {
    /** 精度
     *
     * accuracy 是一个 string 类型的枚举值。
     * | 值 |  说明 |
     * | --- |  --- |
     * | high |  高精度 |
     * | medium |  中等精度 |
     * | low |  低精度 |
     * | no-contact |  不可信，传感器失去连接 |
     * | unreliable |  不可信，原因未知 |
     * | unknow ${value} |  未知的精度枚举值，即该 Android 系统此时返回的表示精度的 value 不是一个标准的精度枚举值 |
     **/
    accuracy: string;
    /** 面对的方向度数 */
    direction: number;
  }
  interface OnDeviceMotionChangeCallbackResult {
    /** 当 手机坐标 X/Y 和 地球 X/Y 重合时，绕着 Z 轴转动的夹角为 alpha，范围值为 [0, 2*PI)。逆时针转动为正。 */
    alpha: number;
    /** 当手机坐标 Y/Z 和地球 Y/Z 重合时，绕着 X 轴转动的夹角为 beta。范围值为 [-1*PI, PI) 。顶部朝着地球表面转动为正。也有可能朝着用户为正。 */
    beta: number;
    /** 当手机 X/Z 和地球 X/Z 重合时，绕着 Y 轴转动的夹角为 gamma。范围值为 [-1*PI/2, PI/2)。右边朝着地球表面转动为正。 */
    gamma: number;
  }
  interface OnFrameRecordedCallbackResult {
    /** 录音分片数据 */
    frameBuffer: ArrayBuffer;
    /** 当前帧是否正常录音结束前的最后一帧 */
    isLastFrame: boolean;
  }
  interface OnGetWifiListCallbackResult {
    /** Wi-Fi 列表数据 */
    wifiList: Array<WifiInfo>;
  }
  interface OnGyroscopeChangeCallbackResult {
    res: Result;
  }
  interface OnMemoryWarningCallbackResult {
    /** 内存告警等级，对应系统宏定义
     *
     * 可选值：
     * - 5: TRIM_MEMORY_RUNNING_MODERATE;
     * - 10: TRIM_MEMORY_RUNNING_LOW;
     * - 15: TRIM_MEMORY_RUNNING_CRITICAL; */
    level: 5 | 10 | 15;
  }
  interface OnNetworkStatusChangeCallbackResult {
    /** 当前是否有网络链接 */
    isConnected: boolean;
    /** 网络类型
     *
     * 可选值：
     * - 'wifi': wifi 网络;
     * - '2g': 2g 网络;
     * - '3g': 3g 网络;
     * - '4g': 4g 网络;
     * - 'unknown': Android 下不常见的网络类型;
     * - 'none': 无网络; */
    networkType: 'wifi' | '2g' | '3g' | '4g' | 'unknown' | 'none';
  }
  interface OnOpenCallbackResult {
    /** 连接成功的 HTTP 响应 Header
     *
     **/
    header: object;
  }
  interface OnPageNotFoundResult {
    /** 不存在页面的路径 */
    path: string;
    /** 打开不存在页面的 query 参数 */
    query: Object;
  }
  interface OnSocketMessageCallbackResult {
    /** 服务器返回的消息 */
    data: string | ArrayBuffer;
  }
  interface OnSocketOpenCallbackResult {
    /** 连接成功的 HTTP 响应 Header
     *
     **/
    header: object;
  }
  interface OnStopCallbackResult {
    /** 录音文件的临时路径 */
    tempFilePath: string;
  }
  interface OnWifiConnectedCallbackResult {
    /** [WifiInfo]()
     *
     * Wi-Fi 信息 */
    wifi: WifiInfo;
  }
  interface OpenBluetoothAdapterOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: OpenBluetoothAdapterCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: OpenBluetoothAdapterFailCallback;
    /** 接口调用成功的回调函数 */
    success?: OpenBluetoothAdapterSuccessCallback;
  }
  interface OpenDocumentOption {
    /** 文件路径，可通过 downloadFile 获得 */
    filePath: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: OpenDocumentCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: OpenDocumentFailCallback;
    /** 文件类型，指定文件类型打开文件
     *
     * 可选值：
     * - 'doc': doc 格式;
     * - 'docx': docx 格式;
     * - 'xls': xls 格式;
     * - 'xlsx': xlsx 格式;
     * - 'ppt': ppt 格式;
     * - 'pptx': pptx 格式;
     * - 'pdf': pdf 格式;
     *
     **/
    fileType?: 'doc' | 'docx' | 'xls' | 'xlsx' | 'ppt' | 'pptx' | 'pdf';
    /** 接口调用成功的回调函数 */
    success?: OpenDocumentSuccessCallback;
  }
  interface OpenLocationOption {
    /** 纬度，范围为-90~90，负数表示南纬。使用 gcj02 国测局坐标系 */
    latitude: number;
    /** 经度，范围为-180~180，负数表示西经。使用 gcj02 国测局坐标系 */
    longitude: number;
    /** 地址的详细说明 */
    address?: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: OpenLocationCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: OpenLocationFailCallback;
    /** 位置名 */
    name?: string;
    /** 缩放比例，范围5~18 */
    scale?: number;
    /** 接口调用成功的回调函数 */
    success?: OpenLocationSuccessCallback;
  }
  interface PageScrollToOption {
    /** 滚动到页面的目标位置，单位 px */
    scrollTop: number;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: PageScrollToCompleteCallback;
    /** 滚动动画的时长，单位 ms */
    duration?: number;
    /** 接口调用失败的回调函数 */
    fail?: PageScrollToFailCallback;
    /** 接口调用成功的回调函数 */
    success?: PageScrollToSuccessCallback;
  }
  interface PauseBGMOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: PauseBGMCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: PauseBGMFailCallback;
    /** 接口调用成功的回调函数 */
    success?: PauseBGMSuccessCallback;
  }
  interface PauseBackgroundAudioOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: PauseBackgroundAudioCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: PauseBackgroundAudioFailCallback;
    /** 接口调用成功的回调函数 */
    success?: PauseBackgroundAudioSuccessCallback;
  }
  interface PlayBGMOption {
    /** 加入背景混音的资源地址 */
    url: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: PlayBGMCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: PlayBGMFailCallback;
    /** 接口调用成功的回调函数 */
    success?: PlayBGMSuccessCallback;
  }
  interface PlayBackgroundAudioOption {
    /** 音乐链接，目前支持的格式有 m4a, aac, mp3, wav */
    dataUrl: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: PlayBackgroundAudioCompleteCallback;
    /** 封面URL */
    coverImgUrl?: string;
    /** 接口调用失败的回调函数 */
    fail?: PlayBackgroundAudioFailCallback;
    /** 接口调用成功的回调函数 */
    success?: PlayBackgroundAudioSuccessCallback;
    /** 音乐标题 */
    title?: string;
  }
  interface PlayOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: PlayCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: PlayFailCallback;
    /** 接口调用成功的回调函数 */
    success?: PlaySuccessCallback;
  }
  /** 插件帐号信息（仅在插件中调用时包含这一项） */
  interface Plugin {
    /** 插件 appId */
    appId: string;
    /** 插件版本号 */
    version: string;
  }
  interface PreviewImageOption {
    /** 需要预览的图片链接列表。 */
    urls: Array<string>;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: PreviewImageCompleteCallback;
    /** 当前显示图片的链接 */
    current?: string;
    /** 接口调用失败的回调函数 */
    fail?: PreviewImageFailCallback;
    /** 接口调用成功的回调函数 */
    success?: PreviewImageSuccessCallback;
  }
  /** 该特征值支持的操作类型 */
  interface Properties {
    /** 该特征值是否支持 indicate 操作 */
    indicate: boolean;
    /** 该特征值是否支持 notify 操作 */
    notify: boolean;
    /** 该特征值是否支持 read 操作 */
    read: boolean;
    /** 该特征值是否支持 write 操作 */
    write: boolean;
  }
  interface ReLaunchOption {
    /** 需要跳转的应用内页面路径，路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'，如果跳转的页面路径是 tabBar 页面则不能带参数 */
    url: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: ReLaunchCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: ReLaunchFailCallback;
    /** 接口调用成功的回调函数 */
    success?: ReLaunchSuccessCallback;
  }
  interface ReadBLECharacteristicValueOption {
    /** 蓝牙特征值的 uuid */
    characteristicId: string;
    /** 蓝牙设备 id */
    deviceId: string;
    /** 蓝牙特征值对应服务的 uuid */
    serviceId: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: ReadBLECharacteristicValueCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: ReadBLECharacteristicValueFailCallback;
    /** 接口调用成功的回调函数 */
    success?: ReadBLECharacteristicValueSuccessCallback;
  }
  interface ReadFileFailCallbackResult {
    /** 错误信息
     *
     * 可选值：
     * - 'fail no such file or directory, open ${filePath}': 指定的 filePath 所在目录不存在;
     * - 'fail permission denied, open ${dirPath}': 指定的 filePath 路径没有读权限; */
    errMsg: string;
  }
  interface ReadFileOption {
    /** 要读取的文件的路径 */
    filePath: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: ReadFileCompleteCallback;
    /** 指定读取文件的字符编码，如果不传 encoding，则以 ArrayBuffer 格式读取文件的二进制内容
     *
     * 可选值：
     * - 'ascii': ;
     * - 'base64': ;
     * - 'binary': ;
     * - 'hex': ;
     * - 'ucs2/ucs-2/utf16le/utf-16le': 以小端序读取;
     * - 'utf-8/utf8': ;
     * - 'latin1': ; */
    encoding?:
      | 'ascii'
      | 'base64'
      | 'binary'
      | 'hex'
      | 'ucs2/ucs-2/utf16le/utf-16le'
      | 'utf-8/utf8'
      | 'latin1';
    /** 接口调用失败的回调函数 */
    fail?: ReadFileFailCallback;
    /** 接口调用成功的回调函数 */
    success?: ReadFileSuccessCallback;
  }
  interface ReadFileSuccessCallbackResult {
    /** 文件内容 */
    data: string | ArrayBuffer;
  }
  interface ReaddirFailCallbackResult {
    /** 错误信息
     *
     * 可选值：
     * - 'fail no such file or directory ${dirPath}': 目录不存在;
     * - 'fail not a directory ${dirPath}': dirPath 不是目录;
     * - 'fail permission denied, open ${dirPath}': 指定的 filePath 路径没有读权限; */
    errMsg: string;
  }
  interface ReaddirOption {
    /** 要读取的目录路径 */
    dirPath: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: ReaddirCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: ReaddirFailCallback;
    /** 接口调用成功的回调函数 */
    success?: ReaddirSuccessCallback;
  }
  interface ReaddirSuccessCallbackResult {
    /** 指定目录下的文件名数组。 */
    files: Array<string>;
  }
  interface RecorderManagerOnErrorCallbackResult {
    /** 错误信息 */
    errMsg: string;
  }
  interface RecorderManagerStartOption {
    /** 录音的时长，单位 ms，最大值 600000（10 分钟） */
    duration?: number;
    /** 编码码率，有效值见下表格 */
    encodeBitRate?: number;
    /** 音频格式
     *
     * 可选值：
     * - 'mp3': mp3 格式;
     * - 'aac': aac 格式; */
    format?: 'mp3' | 'aac';
    /** 录音通道数
     *
     * 可选值：
     * - 1: 1 个通道;
     * - 2: 2 个通道; */
    numberOfChannels?: 1 | 2;
    /** 采样率
     *
     * 不同的音频格式所支持的采样率范围不同。对于 aac 格式，默认设置为 8000，建议使用 8000/16000/44100
     * 可选值：
     * - 8000: 8000 采样率;
     * - 11025: 11025 采样率;
     * - 12000: 12000 采样率;
     * - 16000: 16000 采样率;
     * - 22050: 22050 采样率;
     * - 24000: 24000 采样率;
     * - 32000: 32000 采样率;
     * - 44100: 44100 采样率;
     * - 48000: 48000 采样率; */
    sampleRate?:
      | 8000
      | 11025
      | 12000
      | 16000
      | 22050
      | 24000
      | 32000
      | 44100
      | 48000;
  }
  interface RedirectToOption {
    /** 需要跳转的应用内非 tabBar 的页面的路径, 路径后可以带参数。参数与路径之间使用 `?` 分隔，参数键与参数值用 `=` 相连，不同参数用 `&` 分隔；如 'path?key=value&key2=value2' */
    url: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: RedirectToCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: RedirectToFailCallback;
    /** 接口调用成功的回调函数 */
    success?: RedirectToSuccessCallback;
  }
  /** 来源信息。从另一个快应用或 App 进入快应用时返回。否则返回 `{}`。(参见后文注意) */
  interface ReferrerInfo {
    /** 来源快应用或 App 的 appId */
    appId: string;
    /** 来源快应用传过来的数据，scene=1037或1038时支持 */
    extraData: object;
  }
  /** 来源信息。从另一个快应用或 App 进入快应用时返回。否则返回 `{}`。(参见后文注意) */
  interface ReferrerInfoOption {
    /** 来源快应用或 App 的 appId */
    appId: string;
    /** 来源快应用传过来的数据，scene=1037或1038时支持 */
    extraData: object;
  }
  /** 参照区域的边界 */
  interface RelativeRectResult {
    /** 下边界 */
    bottom: number;
    /** 左边界 */
    left: number;
    /** 右边界 */
    right: number;
    /** 上边界 */
    top: number;
  }
  /** 用来扩展（或收缩）参照节点布局区域的边界 */
  interface RelativeToMargins {
    /** 节点布局区域的下边界 */
    bottom?: number;
    /** 节点布局区域的左边界 */
    left?: number;
    /** 节点布局区域的右边界 */
    right?: number;
    /** 节点布局区域的上边界 */
    top?: number;
  }
  /** 用来扩展（或收缩）参照节点布局区域的边界 */
  interface RelativeToViewportMargins {
    /** 节点布局区域的下边界 */
    bottom?: number;
    /** 节点布局区域的左边界 */
    left?: number;
    /** 节点布局区域的右边界 */
    right?: number;
    /** 节点布局区域的上边界 */
    top?: number;
  }
  interface RemoveSavedFileFailCallbackResult {
    /** 错误信息
     *
     * 可选值：
     * - 'fail file not exist': 指定的 tempFilePath 找不到文件; */
    errMsg: string;
  }
  interface RemoveStorageOption {
    /** 本地缓存中指定的 key */
    key: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: RemoveStorageCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: RemoveStorageFailCallback;
    /** 接口调用成功的回调函数 */
    success?: RemoveStorageSuccessCallback;
  }
  interface RemoveTabBarBadgeOption {
    /** tabBar 的哪一项，从左边算起 */
    index: number;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: RemoveTabBarBadgeCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: RemoveTabBarBadgeFailCallback;
    /** 接口调用成功的回调函数 */
    success?: RemoveTabBarBadgeSuccessCallback;
  }
  interface RenameFailCallbackResult {
    /** 错误信息
     *
     * 可选值：
     * - 'fail permission denied, rename ${oldPath} -> ${newPath}': 指定源文件或目标文件没有写权限;
     * - 'fail no such file or directory, rename ${oldPath} -> ${newPath}': 源文件不存在，或目标文件路径的上层目录不存在; */
    errMsg: string;
  }
  interface RenameOption {
    /** 新文件路径 */
    newPath: string;
    /** 源文件路径，可以是普通文件或目录 */
    oldPath: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: RenameCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: RenameFailCallback;
    /** 接口调用成功的回调函数 */
    success?: RenameSuccessCallback;
  }
  interface RequestOption {
    /** 开发者服务器接口地址 */
    url: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: RequestCompleteCallback;
    /** 请求的参数 */
    data?: string | object | ArrayBuffer;
    /** 返回的数据格式
     *
     * 可选值：
     * - 'json': 返回的数据为 JSON，返回后会对返回的数据进行一次 JSON.parse;
     * - '其他': 不对返回的内容进行 JSON.parse; */
    dataType?: 'json' | '其他';
    /** 接口调用失败的回调函数 */
    fail?: RequestFailCallback;
    /** 设置请求的 header，header 中不能设置 Referer。
     *
     * `content-type` 默认为 `application/json` */
    header?: object;
    /** HTTP 请求方法
     *
     * 可选值：
     * - 'OPTIONS': HTTP 请求 OPTIONS;
     * - 'GET': HTTP 请求 GET;
     * - 'HEAD': HTTP 请求 HEAD;
     * - 'POST': HTTP 请求 POST;
     * - 'PUT': HTTP 请求 PUT;
     * - 'DELETE': HTTP 请求 DELETE;
     * - 'TRACE': HTTP 请求 TRACE;
     * - 'CONNECT': HTTP 请求 CONNECT; */
    method?:
      | 'OPTIONS'
      | 'GET'
      | 'HEAD'
      | 'POST'
      | 'PUT'
      | 'DELETE'
      | 'TRACE'
      | 'CONNECT';
    /** 响应的数据类型
     *
     * 可选值：
     * - 'text': 响应的数据为文本;
     * - 'arraybuffer': 响应的数据为 ArrayBuffer;
     *
     **/
    responseType?: 'text' | 'arraybuffer';
    /** 接口调用成功的回调函数 */
    success?: RequestSuccessCallback;
  }
  interface RequestSuccessCallbackResult {
    /** 开发者服务器返回的数据 */
    data: string | object | ArrayBuffer;
    /** 开发者服务器返回的 HTTP Response Header
     *
     **/
    header: object;
    /** 开发者服务器返回的 HTTP 状态码 */
    statusCode: number;
  }
  interface RequestTaskOnHeadersReceivedCallbackResult {
    /** 开发者服务器返回的 HTTP Response Header */
    header: object;
  }
  interface Result {
    /** x 轴的角速度 */
    x: number;
    /** y 轴的角速度 */
    y: number;
    /** z 轴的角速度 */
    z: number;
  }
  interface ResultOption {
    /** 快应用切前台的路径 */
    path: string;
    /** 快应用切前台的 query 参数 */
    query: object;
  }
  interface ResumeBGMOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: ResumeBGMCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: ResumeBGMFailCallback;
    /** 接口调用成功的回调函数 */
    success?: ResumeBGMSuccessCallback;
  }
  interface RmdirFailCallbackResult {
    /** 错误信息
     *
     * 可选值：
     * - 'fail no such file or directory ${dirPath}': 目录不存在;
     * - 'fail directory not empty': 目录不为空;
     * - 'fail permission denied, open ${dirPath}': 指定的 dirPath 路径没有写权限; */
    errMsg: string;
  }
  interface RmdirOption {
    /** 要删除的目录路径 */
    dirPath: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: RmdirCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: RmdirFailCallback;
    /** 是否递归删除目录。如果为 true，则删除该目录和该目录下的所有子目录以及文件。
     *
     **/
    recursive?: boolean;
    /** 接口调用成功的回调函数 */
    success?: RmdirSuccessCallback;
  }
  interface SaveFileFailCallbackResult {
    /** 错误信息
     *
     * 可选值：
     * - 'fail tempFilePath file not exist': 指定的 tempFilePath 找不到文件;
     * - 'fail permission denied, open "${filePath}"': 指定的 filePath 路径没有写权限;
     * - 'fail no such file or directory "${dirPath}"': 上级目录不存在; */
    errMsg: string;
  }
  interface SaveImageToPhotosAlbumOption {
    /** 图片文件路径，可以是临时文件路径或永久文件路径，不支持网络图片路径 */
    filePath: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SaveImageToPhotosAlbumCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SaveImageToPhotosAlbumFailCallback;
    /** 接口调用成功的回调函数 */
    success?: SaveImageToPhotosAlbumSuccessCallback;
  }
  interface SaveVideoToPhotosAlbumOption {
    /** 视频文件路径，可以是临时文件路径也可以是永久文件路径 */
    filePath: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SaveVideoToPhotosAlbumCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SaveVideoToPhotosAlbumFailCallback;
    /** 接口调用成功的回调函数 */
    success?: SaveVideoToPhotosAlbumSuccessCallback;
  }
  interface ScanCodeOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: ScanCodeCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: ScanCodeFailCallback;
    /** 扫码类型
     *
     * 可选值：
     * - 'barCode': 一维码;
     * - 'qrCode': 二维码;
     * - 'datamatrix': Data Matrix 码;
     *
     **/
    scanType?: ('barCode' | 'qrCode' | 'datamatrix')[];
    /** 接口调用成功的回调函数 */
    success?: ScanCodeSuccessCallback;
  }
  interface ScanCodeSuccessCallbackResult {
    /** 所扫码的内容 */
    result: string;
    /** 所扫码的类型
     *
     * 可选值：
     * - 'QR_CODE': 二维码;
     * - 'CODABAR': 一维码;
     * - 'CODE_39': 一维码;
     * - 'CODE_93': 一维码;
     * - 'CODE_128': 一维码;
     * - 'DATA_MATRIX': 二维码;
     * - 'EAN_8': 一维码;
     * - 'EAN_13': 一维码;
     * - 'ITF': 一维码;
     * - 'MAXICODE': 一维码;
     * - 'RSS_14': 一维码;
     * - 'RSS_EXPANDED': 一维码;
     * - 'UPC_A': 一维码;
     * - 'UPC_E': 一维码; */
    scanType:
      | 'QR_CODE'
      | 'CODABAR'
      | 'CODE_39'
      | 'CODE_93'
      | 'CODE_128'
      | 'DATA_MATRIX'
      | 'EAN_8'
      | 'EAN_13'
      | 'ITF'
      | 'MAXICODE'
      | 'RSS_14'
      | 'RSS_EXPANDED'
      | 'UPC_A'
      | 'UPC_E';
  }
  interface ScrollOffsetCallbackResult {
    /** 节点的 dataset */
    dataset: object;
    /** 节点的 ID */
    id: string;
    /** 节点的水平滚动位置 */
    scrollLeft: number;
    /** 节点的竖直滚动位置 */
    scrollTop: number;
  }
  interface SeekBackgroundAudioOption {
    /** 音乐位置，单位：秒 */
    position: number;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SeekBackgroundAudioCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SeekBackgroundAudioFailCallback;
    /** 接口调用成功的回调函数 */
    success?: SeekBackgroundAudioSuccessCallback;
  }
  interface SendOption {
    /** 需要发送的内容 */
    data: string | ArrayBuffer;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SendCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SendFailCallback;
    /** 接口调用成功的回调函数 */
    success?: SendSuccessCallback;
  }
  interface SendSocketMessageOption {
    /** 需要发送的内容 */
    data: string | ArrayBuffer;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SendSocketMessageCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SendSocketMessageFailCallback;
    /** 接口调用成功的回调函数 */
    success?: SendSocketMessageSuccessCallback;
  }
  interface SetBGMVolumeOption {
    /** 音量大小 */
    volume: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SetBGMVolumeCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SetBGMVolumeFailCallback;
    /** 接口调用成功的回调函数 */
    success?: SetBGMVolumeSuccessCallback;
  }
  interface SetBackgroundColorOption {
    /** 窗口的背景色，必须为十六进制颜色值 */
    backgroundColor?: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SetBackgroundColorCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SetBackgroundColorFailCallback;
    /** 接口调用成功的回调函数 */
    success?: SetBackgroundColorSuccessCallback;
  }
  interface SetBackgroundTextStyleOption {
    /** 下拉背景字体、loading 图的样式。
     *
     * 可选值：
     * - 'dark': dark 样式;
     * - 'light': light 样式; */
    textStyle: 'dark' | 'light';
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SetBackgroundTextStyleCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SetBackgroundTextStyleFailCallback;
    /** 接口调用成功的回调函数 */
    success?: SetBackgroundTextStyleSuccessCallback;
  }
  interface SetClipboardDataOption {
    /** 剪贴板的内容 */
    data: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SetClipboardDataCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SetClipboardDataFailCallback;
    /** 接口调用成功的回调函数 */
    success?: SetClipboardDataSuccessCallback;
  }
  interface SetEnableDebugOption {
    /** 是否打开调试 */
    enableDebug: boolean;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SetEnableDebugCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SetEnableDebugFailCallback;
    /** 接口调用成功的回调函数 */
    success?: SetEnableDebugSuccessCallback;
  }
  interface SetInnerAudioOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SetInnerAudioOptionCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SetInnerAudioOptionFailCallback;
    /** 是否与其他音频混播，设置为 true 之后，不会终止其他应用或快应用内的音乐 */
    mixWithOther?: boolean;
    /** 接口调用成功的回调函数 */
    success?: SetInnerAudioOptionSuccessCallback;
  }
  interface SetKeepScreenOnOption {
    /** 是否保持屏幕常亮 */
    keepScreenOn: boolean;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SetKeepScreenOnCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SetKeepScreenOnFailCallback;
    /** 接口调用成功的回调函数 */
    success?: SetKeepScreenOnSuccessCallback;
  }
  interface SetNavigationBarColorOption {
    /** 动画效果 */
    animation: AnimationOption;
    /** 背景颜色值，有效值为十六进制颜色 */
    backgroundColor: string;
    /** 前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000 */
    frontColor: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SetNavigationBarColorCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SetNavigationBarColorFailCallback;
    /** 接口调用成功的回调函数 */
    success?: SetNavigationBarColorSuccessCallback;
  }
  interface SetNavigationBarTitleOption {
    /** 页面标题 */
    title: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SetNavigationBarTitleCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SetNavigationBarTitleFailCallback;
    /** 接口调用成功的回调函数 */
    success?: SetNavigationBarTitleSuccessCallback;
  }
  interface SetScreenBrightnessOption {
    /** 屏幕亮度值，范围 0 ~ 1。0 最暗，1 最亮 */
    value: number;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SetScreenBrightnessCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SetScreenBrightnessFailCallback;
    /** 接口调用成功的回调函数 */
    success?: SetScreenBrightnessSuccessCallback;
  }
  interface SetStorageOption {
    /** 需要存储的内容。只支持原生类型、Date、及能够通过`JSON.stringify`序列化的对象。 */
    data: any;
    /** 本地缓存中指定的 key */
    key: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SetStorageCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SetStorageFailCallback;
    /** 接口调用成功的回调函数 */
    success?: SetStorageSuccessCallback;
  }
  interface SetTabBarBadgeOption {
    /** tabBar 的哪一项，从左边算起 */
    index: number;
    /** 显示的文本，超过 4 个字符则显示成 ... */
    text: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SetTabBarBadgeCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SetTabBarBadgeFailCallback;
    /** 接口调用成功的回调函数 */
    success?: SetTabBarBadgeSuccessCallback;
  }
  interface SetTabBarItemOption {
    /** tabBar 的哪一项，从左边算起 */
    index: number;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SetTabBarItemCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SetTabBarItemFailCallback;
    /** 图片路径，icon 大小限制为 40kb，建议尺寸为 81px * 81px，当 postion 为 top 时，此参数无效，不支持网络图片 */
    iconPath?: string;
    /** 选中时的图片路径，icon 大小限制为 40kb，建议尺寸为 81px * 81px ，当 postion 为 top 时，此参数无效 */
    selectedIconPath?: string;
    /** 接口调用成功的回调函数 */
    success?: SetTabBarItemSuccessCallback;
    /** tab 上的按钮文字 */
    text?: string;
  }
  interface SetTabBarStyleOption {
    /** tab 的背景色，HexColor */
    backgroundColor: string;
    /** tabBar上边框的颜色， 仅支持 black/white */
    borderStyle: string;
    /** tab 上的文字默认颜色，HexColor */
    color: string;
    /** tab 上的文字选中时的颜色，HexColor */
    selectedColor: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SetTabBarStyleCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SetTabBarStyleFailCallback;
    /** 接口调用成功的回调函数 */
    success?: SetTabBarStyleSuccessCallback;
  }
  interface SetTopBarTextOption {
    /** 置顶栏文字 */
    text: object;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SetTopBarTextCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SetTopBarTextFailCallback;
    /** 接口调用成功的回调函数 */
    success?: SetTopBarTextSuccessCallback;
  }
  interface SetWifiListOption {
    /** 提供预设的 Wi-Fi 信息列表 */
    wifiList: WifiData;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SetWifiListCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SetWifiListFailCallback;
    /** 接口调用成功的回调函数 */
    success?: SetWifiListSuccessCallback;
  }
  interface ShowActionSheetOption {
    /** 按钮的文字数组，数组长度最大为 6 */
    itemList: Array<string>;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: ShowActionSheetCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: ShowActionSheetFailCallback;
    /** 按钮的文字颜色 */
    itemColor?: string;
    /** 接口调用成功的回调函数 */
    success?: ShowActionSheetSuccessCallback;
  }
  interface ShowActionSheetSuccessCallbackResult {
    /** 用户点击的按钮序号，从上到下的顺序，从0开始 */
    tapIndex: number;
  }
  interface ShowLoadingOption {
    /** 提示的内容 */
    title: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: ShowLoadingCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: ShowLoadingFailCallback;
    /** 是否显示透明蒙层，防止触摸穿透 */
    mask?: boolean;
    /** 接口调用成功的回调函数 */
    success?: ShowLoadingSuccessCallback;
  }
  interface ShowModalOption {
    /** 提示的内容 */
    content: string;
    /** 提示的标题 */
    title: string;
    /** 取消按钮的文字颜色，必须是 16 进制格式的颜色字符串 */
    cancelColor?: string;
    /** 取消按钮的文字，最多 4 个字符 */
    cancelText?: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: ShowModalCompleteCallback;
    /** 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串 */
    confirmColor?: string;
    /** 确认按钮的文字，最多 4 个字符 */
    confirmText?: string;
    /** 接口调用失败的回调函数 */
    fail?: ShowModalFailCallback;
    /** 是否显示取消按钮 */
    showCancel?: boolean;
    /** 接口调用成功的回调函数 */
    success?: ShowModalSuccessCallback;
  }
  interface ShowModalSuccessCallbackResult {
    /** 为 true 时，表示用户点击了取消（用于区分点击蒙层关闭还是点击取消按钮关闭）
     *
     **/
    cancel: boolean;
    /** 为 true 时，表示用户点击了确定按钮 */
    confirm: boolean;
  }
  interface ShowNavigationBarLoadingOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: ShowNavigationBarLoadingCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: ShowNavigationBarLoadingFailCallback;
    /** 接口调用成功的回调函数 */
    success?: ShowNavigationBarLoadingSuccessCallback;
  }
  interface ShowTabBarOption {
    /** 是否需要动画效果 */
    animation?: boolean;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: ShowTabBarCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: ShowTabBarFailCallback;
    /** 接口调用成功的回调函数 */
    success?: ShowTabBarSuccessCallback;
  }
  interface ShowTabBarRedDotOption {
    /** tabBar 的哪一项，从左边算起 */
    index: number;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: ShowTabBarRedDotCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: ShowTabBarRedDotFailCallback;
    /** 接口调用成功的回调函数 */
    success?: ShowTabBarRedDotSuccessCallback;
  }
  interface ShowToastOption {
    /** 提示的内容 */
    title: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: ShowToastCompleteCallback;
    /** 提示的延迟时间 */
    duration?: number;
    /** 接口调用失败的回调函数 */
    fail?: ShowToastFailCallback;
    /** 图标
     *
     * 可选值：
     * - 'success': 显示成功图标，此时 title 文本最多显示 7 个汉字长度;
     * - 'loading': 显示加载图标，此时 title 文本最多显示 7 个汉字长度;
     * - 'none': 不显示图标，此时 title 文本最多可显示两行; */
    icon?: 'success' | 'loading' | 'none';
    /** 自定义图标的本地路径，image 的优先级高于 icon
     *
     **/
    image?: string;
    /** 是否显示透明蒙层，防止触摸穿透 */
    mask?: boolean;
    /** 接口调用成功的回调函数 */
    success?: ShowToastSuccessCallback;
  }
  interface InstallShortcutOption {
    /** 权限弹窗上的说明文字，用于向用户解释为什么要创建桌面图标 */
    message: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: InstallShortcutCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: InstallShortcutFailCallback;
    /** 接口调用成功的回调函数 */
    success?: InstallShortcutSuccessCallback;
  }
  interface HasInstallShortcutOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: HasInstallShortcutCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: HasInstallShortcutFailCallback;
    /** 接口调用成功的回调函数 */
    success?: HasInstallShortcutSuccessCallback;
  }
  interface Size {
    /** 变化后的窗口高度，单位 px */
    windowHeight: number;
    /** 变化后的窗口宽度，单位 px */
    windowWidth: number;
  }
  interface SnapshotOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SnapshotCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SnapshotFailCallback;
    /** 接口调用成功的回调函数 */
    success?: SnapshotSuccessCallback;
  }
  interface SocketTaskOnErrorCallbackResult {
    /** 错误信息 */
    errMsg: string;
  }
  interface SocketTaskOnMessageCallbackResult {
    /** 服务器返回的消息 */
    data: string | ArrayBuffer;
  }
  interface StartAccelerometerOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: StartAccelerometerCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: StartAccelerometerFailCallback;
    /** 监听加速度数据回调函数的执行频率
     *
     * 可选值：
     * - 'game': 适用于更新游戏的回调频率，在 20ms/次 左右;
     * - 'ui': 适用于更新 UI 的回调频率，在 60ms/次 左右;
     * - 'normal': 普通的回调频率，在 200ms/次 左右;
     *
     **/
    interval?: 'game' | 'ui' | 'normal';
    /** 接口调用成功的回调函数 */
    success?: StartAccelerometerSuccessCallback;
  }
  interface StartBluetoothDevicesDiscoveryOption {
    /** 是否允许重复上报同一设备。如果允许重复上报，则 `qa.onBlueToothDeviceFound` 方法会多次上报同一设备，但是 RSSI 值会有不同。 */
    allowDuplicatesKey?: boolean;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: StartBluetoothDevicesDiscoveryCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: StartBluetoothDevicesDiscoveryFailCallback;
    /** 上报设备的间隔。0 表示找到新设备立即上报，其他数值根据传入的间隔上报。 */
    interval?: number;
    /** 要搜索但蓝牙设备主 service 的 uuid 列表。某些蓝牙设备会广播自己的主 service 的 uuid。如果设置此参数，则只搜索广播包有对应 uuid 的主服务的蓝牙设备。建议主要通过该参数过滤掉周边不需要处理的其他蓝牙设备。 */
    services?: Array<string>;
    /** 接口调用成功的回调函数 */
    success?: StartBluetoothDevicesDiscoverySuccessCallback;
  }
  interface StartCompassOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: StartCompassCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: StartCompassFailCallback;
    /** 接口调用成功的回调函数 */
    success?: StartCompassSuccessCallback;
  }
  interface StartDeviceMotionListeningOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: StartDeviceMotionListeningCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: StartDeviceMotionListeningFailCallback;
    /** 监听设备方向的变化回调函数的执行频率
     *
     * 可选值：
     * - 'game': 适用于更新游戏的回调频率，在 20ms/次 左右;
     * - 'ui': 适用于更新 UI 的回调频率，在 60ms/次 左右;
     * - 'normal': 普通的回调频率，在 200ms/次 左右; */
    interval?: 'game' | 'ui' | 'normal';
    /** 接口调用成功的回调函数 */
    success?: StartDeviceMotionListeningSuccessCallback;
  }
  interface StartGyroscopeOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: StartGyroscopeCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: StartGyroscopeFailCallback;
    /** 监听陀螺仪数据回调函数的执行频率
     *
     * 可选值：
     * - 'game': 适用于更新游戏的回调频率，在 20ms/次 左右;
     * - 'ui': 适用于更新 UI 的回调频率，在 60ms/次 左右;
     * - 'normal': 普通的回调频率，在 200ms/次 左右; */
    interval?: 'game' | 'ui' | 'normal';
    /** 接口调用成功的回调函数 */
    success?: StartGyroscopeSuccessCallback;
  }
  interface StartPullDownRefreshOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: StartPullDownRefreshCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: StartPullDownRefreshFailCallback;
    /** 接口调用成功的回调函数 */
    success?: StartPullDownRefreshSuccessCallback;
  }
  interface StartRecordSuccessCallbackResult {
    /** 录音文件的临时路径 */
    tempFilePath: string;
  }
  interface StartRecordTimeoutCallbackResult {
    /** 封面图片文件的临时路径 */
    tempThumbPath: string;
    /** 视频的文件的临时路径 */
    tempVideoPath: string;
  }
  interface StartWifiOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: StartWifiCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: StartWifiFailCallback;
    /** 接口调用成功的回调函数 */
    success?: StartWifiSuccessCallback;
  }
  interface StatFailCallbackResult {
    /** 错误信息
     *
     * 可选值：
     * - 'fail permission denied, open ${path}': 指定的 path 路径没有读权限;
     * - 'fail no such file or directory ${path}': 文件不存在; */
    errMsg: string;
  }
  interface StatOption {
    /** 文件/目录路径 */
    path: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: StatCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: StatFailCallback;
    /** 是否递归获取目录下的每个文件的 Stats 信息
     *
     **/
    recursive?: boolean;
    /** 接口调用成功的回调函数 */
    success?: StatSuccessCallback;
  }
  interface StatSuccessCallbackResult {
    /** [Stats]()|Object
     *
     * 当 recursive 为 false 时，res.stats 是一个 Stats 对象。当 recursive 为 true 且 path 是一个目录的路径时，res.stats 是一个 Object，key 以 path 为根路径的相对路径，value 是该路径对应的 Stats 对象。 */
    stats: Stats | object;
  }
  /** 描述文件状态的对象 */
  interface Stats {
    /** 文件最近一次被存取或被执行的时间，UNIX 时间戳，对应 POSIX stat.st_atime */
    lastAccessedTime: number;
    /** 文件最后一次被修改的时间，UNIX 时间戳，对应 POSIX stat.st_mtime */
    lastModifiedTime: number;
    /** 文件的类型和存取的权限，对应 POSIX stat.st_mode */
    mode: string;
    /** 文件大小，单位：B，对应 POSIX stat.st_size */
    size: number;
  }
  interface StepOption {
    /** 动画延迟时间，单位 ms */
    delay?: number;
    /** 动画持续时间，单位 ms */
    duration?: number;
    /** 动画的效果
     *
     * 可选值：
     * - 'linear': 动画从头到尾的速度是相同的;
     * - 'ease': 动画以低速开始，然后加快，在结束前变慢;
     * - 'ease-in': 动画以低速开始;
     * - 'ease-in-out': 动画以低速开始和结束;
     * - 'ease-out': 动画以低速结束;
     * - 'step-start': 动画第一帧就跳至结束状态直到结束;
     * - 'step-end': 动画一直保持开始状态，最后一帧跳到结束状态; */
    timingFunction?:
      | 'linear'
      | 'ease'
      | 'ease-in'
      | 'ease-in-out'
      | 'ease-out'
      | 'step-start'
      | 'step-end';
    transformOrigin?: string;
  }
  interface StopAccelerometerOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: StopAccelerometerCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: StopAccelerometerFailCallback;
    /** 接口调用成功的回调函数 */
    success?: StopAccelerometerSuccessCallback;
  }
  interface StopBGMOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: StopBGMCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: StopBGMFailCallback;
    /** 接口调用成功的回调函数 */
    success?: StopBGMSuccessCallback;
  }
  interface StopBackgroundAudioOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: StopBackgroundAudioCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: StopBackgroundAudioFailCallback;
    /** 接口调用成功的回调函数 */
    success?: StopBackgroundAudioSuccessCallback;
  }
  interface StopBluetoothDevicesDiscoveryOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: StopBluetoothDevicesDiscoveryCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: StopBluetoothDevicesDiscoveryFailCallback;
    /** 接口调用成功的回调函数 */
    success?: StopBluetoothDevicesDiscoverySuccessCallback;
  }
  interface StopCompassOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: StopCompassCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: StopCompassFailCallback;
    /** 接口调用成功的回调函数 */
    success?: StopCompassSuccessCallback;
  }
  interface StopDeviceMotionListeningOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: StopDeviceMotionListeningCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: StopDeviceMotionListeningFailCallback;
    /** 接口调用成功的回调函数 */
    success?: StopDeviceMotionListeningSuccessCallback;
  }
  interface StopGyroscopeOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: StopGyroscopeCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: StopGyroscopeFailCallback;
    /** 接口调用成功的回调函数 */
    success?: StopGyroscopeSuccessCallback;
  }
  interface StopPullDownRefreshOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: StopPullDownRefreshCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: StopPullDownRefreshFailCallback;
    /** 接口调用成功的回调函数 */
    success?: StopPullDownRefreshSuccessCallback;
  }
  interface StopRecordOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: StopRecordCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: StopRecordFailCallback;
    /** 接口调用成功的回调函数 */
    success?: StopRecordSuccessCallback;
  }
  interface StopRecordSuccessCallbackResult {
    /** 封面图片文件的临时路径 */
    tempThumbPath: string;
    /** 视频的文件的临时路径 */
    tempVideoPath: string;
  }
  interface StopWifiOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: StopWifiCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: StopWifiFailCallback;
    /** 接口调用成功的回调函数 */
    success?: StopWifiSuccessCallback;
  }
  interface SwitchCameraOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SwitchCameraCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SwitchCameraFailCallback;
    /** 接口调用成功的回调函数 */
    success?: SwitchCameraSuccessCallback;
  }
  interface SwitchTabOption {
    /** 需要跳转的 tabBar 页面的路径（需在 app.json 的 [tabBar]((config#tabbar)) 字段定义的页面），路径后不能带参数。 */
    url: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: SwitchTabCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: SwitchTabFailCallback;
    /** 接口调用成功的回调函数 */
    success?: SwitchTabSuccessCallback;
  }
  interface TakePhotoOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: TakePhotoCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: TakePhotoFailCallback;
    /** 成像质量
     *
     * 可选值：
     * - 'high': 高质量;
     * - 'normal': 普通质量;
     * - 'low': 低质量; */
    quality?: 'high' | 'normal' | 'low';
    /** 接口调用成功的回调函数 */
    success?: TakePhotoSuccessCallback;
  }
  interface TakePhotoSuccessCallbackResult {
    /** 照片文件的临时路径 */
    tempImagePath: string;
  }
  interface TextMetrics {
    /** 文本的宽度 */
    width: number;
  }
  interface ToggleTorchOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: ToggleTorchCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: ToggleTorchFailCallback;
    /** 接口调用成功的回调函数 */
    success?: ToggleTorchSuccessCallback;
  }
  interface TranslateMarkerOption {
    /** 移动过程中是否自动旋转 marker */
    autoRotate: boolean;
    /** 指定 marker 移动到的目标点 */
    destination: DestinationOption;
    /** 指定 marker */
    markerId: number;
    /** marker 的旋转角度 */
    rotate: number;
    /** 动画结束回调函数 */
    animationEnd?: Function;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: TranslateMarkerCompleteCallback;
    /** 动画持续时长，平移与旋转分别计算 */
    duration?: number;
    /** 接口调用失败的回调函数 */
    fail?: TranslateMarkerFailCallback;
    /** 接口调用成功的回调函数 */
    success?: TranslateMarkerSuccessCallback;
  }
  interface UnlinkFailCallbackResult {
    /** 错误信息
     *
     * 可选值：
     * - 'fail permission denied, open ${path}': 指定的 path 路径没有读权限;
     * - 'fail no such file or directory ${path}': 文件不存在;
     * - 'fail operation not permitted, unlink ${filePath}': 传入的 filePath 是一个目录; */
    errMsg: string;
  }
  interface UnlinkOption {
    /** 要删除的文件路径 */
    filePath: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: UnlinkCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: UnlinkFailCallback;
    /** 接口调用成功的回调函数 */
    success?: UnlinkSuccessCallback;
  }
  interface UnzipFailCallbackResult {
    /** 错误信息
     *
     * 可选值：
     * - 'fail permission denied, unzip ${zipFilePath} -> ${destPath}': 指定目标文件路径没有写权限;
     * - 'fail no such file or directory, unzip ${zipFilePath} -> "${destPath}': 源文件不存在，或目标文件路径的上层目录不存在; */
    errMsg: string;
  }
  interface UnzipOption {
    /** 目标目录路径 */
    targetPath: string;
    /** 源文件路径，只可以是 zip 压缩文件 */
    zipFilePath: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: UnzipCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: UnzipFailCallback;
    /** 接口调用成功的回调函数 */
    success?: UnzipSuccessCallback;
  }
  /** 参数列表 */
  interface UpdatableMessageFrontEndParameter {
    /** 参数名 */
    name: string;
    /** 参数值 */
    value: string;
  }
  /** 动态消息的模板信息
   *
   **/
  interface UpdatableMessageFrontEndTemplateInfo {
    /** 参数列表 */
    parameterList: UpdatableMessageFrontEndParameter;
  }
  interface UploadFileOption {
    /** 要上传文件资源的路径 */
    filePath: string;
    /** 文件名 */
    name: string;
    /** 开发者服务器地址 */
    url: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: UploadFileCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: UploadFileFailCallback;
    /** HTTP 请求中其他额外的 form data */
    formData?: object;
    /** HTTP 请求 Header，Header 中不能设置 Referer */
    header?: object;
    /** 接口调用成功的回调函数 */
    success?: UploadFileSuccessCallback;
  }
  interface UploadFileSuccessCallbackResult {
    /** 开发者服务器返回的数据 */
    data: string;
    /** 开发者服务器返回的 HTTP 状态码 */
    statusCode: number;
  }
  interface UploadTaskOnHeadersReceivedCallbackResult {
    /** 开发者服务器返回的 HTTP Response Header */
    header: object;
  }
  interface UploadTaskOnProgressUpdateCallbackResult {
    /** 上传进度百分比 */
    progress: number;
    /** 预期需要上传的数据总长度，单位 Bytes */
    totalBytesExpectedToSend: number;
    /** 已经上传的数据长度，单位 Bytes */
    totalBytesSent: number;
  }
  interface VibrateLongOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: VibrateLongCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: VibrateLongFailCallback;
    /** 接口调用成功的回调函数 */
    success?: VibrateLongSuccessCallback;
  }
  interface VibrateShortOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: VibrateShortCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: VibrateShortFailCallback;
    /** 接口调用成功的回调函数 */
    success?: VibrateShortSuccessCallback;
  }
  interface VideoContextRequestFullScreenOption {
    /** 设置全屏时视频的方向，不指定则根据宽高比自动判断。
     *
     * 可选值：
     * - 0: 正常竖向;
     * - 90: 屏幕逆时针90度;
     * - -90: 屏幕顺时针90度;
     *
     **/
    direction?: 0 | 90 | -90;
  }
  /** 提供预设的 Wi-Fi 信息列表 */
  interface WifiData {
    /** Wi-Fi 的 BSSID */
    BSSID?: string;
    /** Wi-Fi 的 SSID */
    SSID?: string;
    /** Wi-Fi 设备密码 */
    password?: string;
  }
  /** Wifi 信息 */
  interface WifiInfo {
    /** Wi-Fi 的 BSSID */
    BSSID: string;
    /** Wi-Fi 的 SSID */
    SSID: string;
    /** Wi-Fi 是否安全 */
    secure: boolean;
    /** Wi-Fi 信号强度 */
    signalStrength: number;
  }
  interface WriteBLECharacteristicValueOption {
    /** 蓝牙特征值的 uuid */
    characteristicId: string;
    /** 蓝牙设备 id */
    deviceId: string;
    /** 蓝牙特征值对应服务的 uuid */
    serviceId: string;
    /** 蓝牙设备特征值对应的二进制值 */
    value: ArrayBuffer;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: WriteBLECharacteristicValueCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: WriteBLECharacteristicValueFailCallback;
    /** 接口调用成功的回调函数 */
    success?: WriteBLECharacteristicValueSuccessCallback;
  }
  interface WriteFileFailCallbackResult {
    /** 错误信息
     *
     * 可选值：
     * - 'fail no such file or directory, open ${filePath}': 指定的 filePath 所在目录不存在;
     * - 'fail permission denied, open ${dirPath}': 指定的 filePath 路径没有写权限; */
    errMsg: string;
  }
  interface WriteFileOption {
    /** 要写入的文本或二进制数据 */
    data: string | ArrayBuffer;
    /** 要写入的文件路径 */
    filePath: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: WriteFileCompleteCallback;
    /** 指定写入文件的字符编码
     *
     * 可选值：
     * - 'ascii': ;
     * - 'base64': ;
     * - 'binary': ;
     * - 'hex': ;
     * - 'ucs2/ucs-2/utf16le/utf-16le': 以小端序读取;
     * - 'utf-8/utf8': ;
     * - 'latin1': ; */
    encoding?:
      | 'ascii'
      | 'base64'
      | 'binary'
      | 'hex'
      | 'ucs2/ucs-2/utf16le/utf-16le'
      | 'utf-8/utf8'
      | 'latin1';
    /** 接口调用失败的回调函数 */
    fail?: WriteFileFailCallback;
    /** 接口调用成功的回调函数 */
    success?: WriteFileSuccessCallback;
  }
  interface QaGetFileInfoOption {
    /** 本地文件路径 */
    filePath: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: QaGetFileInfoCompleteCallback;
    /** 计算文件摘要的算法
     *
     * 可选值：
     * - 'md5': md5 算法;
     * - 'sha1': sha1 算法; */
    digestAlgorithm?: 'md5' | 'sha1';
    /** 接口调用失败的回调函数 */
    fail?: QaGetFileInfoFailCallback;
    /** 接口调用成功的回调函数 */
    success?: QaGetFileInfoSuccessCallback;
  }
  interface QaGetFileInfoSuccessCallbackResult {
    /** 按照传入的 digestAlgorithm 计算得出的的文件摘要 */
    digest: string;
    /** 文件大小，以字节为单位 */
    size: number;
  }
  interface QaGetSavedFileListOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: QaGetSavedFileListCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: QaGetSavedFileListFailCallback;
    /** 接口调用成功的回调函数 */
    success?: QaGetSavedFileListSuccessCallback;
  }
  interface QaGetSavedFileListSuccessCallbackResult {
    /** 文件数组，每一项是一个 FileItem */
    fileList: QaGetSavedFileListSuccessCallbackResultFileItem;
  }
  /** 文件数组，每一项是一个 FileItem */
  interface QaGetSavedFileListSuccessCallbackResultFileItem {
    /** 文件保存时的时间戳，从1970/01/01 08:00:00 到当前时间的秒数 */
    createTime: number;
    /** 本地路径 */
    filePath: string;
    /** 本地文件大小，以字节为单位 */
    size: number;
  }
  interface QaRemoveSavedFileOption {
    /** 需要删除的文件路径 */
    filePath: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: QaRemoveSavedFileCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: QaRemoveSavedFileFailCallback;
    /** 接口调用成功的回调函数 */
    success?: QaRemoveSavedFileSuccessCallback;
  }
  interface QaSaveFileOption {
    /** 需要保存的文件的临时路径 */
    tempFilePath: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: QaSaveFileCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: QaSaveFileFailCallback;
    /** 接口调用成功的回调函数 */
    success?: QaSaveFileSuccessCallback;
  }
  interface QaSaveFileSuccessCallbackResult {
    /** 存储后的文件路径 */
    savedFilePath: number;
  }
  interface QaStartRecordOption {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: QaStartRecordCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: QaStartRecordFailCallback;
    /** 接口调用成功的回调函数 */
    success?: QaStartRecordSuccessCallback;
  }
  interface Animation {
    /** 
     *
     * 导出动画队列。**export 方法每次调用后会清掉之前的动画操作。** */
    export(): Array<Object>;
    /** [[Animation]()
     *
     * 设置背景色 */
    backgroundColor(
      /** 颜色值 */
      value: string,
    ): Animation;
    /** [[Animation]()
     *
     * 设置 bottom 值 */
    bottom(
      /** 长度值，如果传入 number 则默认使用 px，可传入其他自定义单位的长度值 */
      value: number | string,
    ): Animation;
    /** [[Animation]()
     *
     * 设置高度 */
    height(
      /** 长度值，如果传入 number 则默认使用 px，可传入其他自定义单位的长度值 */
      value: number | string,
    ): Animation;
    /** [[Animation]()
     *
     * 设置 left 值 */
    left(
      /** 长度值，如果传入 number 则默认使用 px，可传入其他自定义单位的长度值 */
      value: number | string,
    ): Animation;
    /** [[Animation]()
     *
     * 同 [transform-function matrix]() */
    matrix(): Animation;
    /** [[Animation]()
     *
     * 同 [transform-function matrix3d]() */
    matrix3d(): Animation;
    /** [[Animation]()
     *
     * 设置透明度 */
    opacity(
      /** 透明度，范围 0-1 */
      value: number,
    ): Animation;
    /** [[Animation]()
     *
     * 设置 right 值 */
    right(
      /** 长度值，如果传入 number 则默认使用 px，可传入其他自定义单位的长度值 */
      value: number | string,
    ): Animation;
    /** [[Animation]()
     *
     * 从原点顺时针旋转一个角度 */
    rotate(
      /** 旋转的角度。范围 [-180, 180] */
      angle: number,
    ): Animation;
    /** [[Animation]()
     *
     * 从 X 轴顺时针旋转一个角度 */
    rotate3d(
      /** 旋转轴的 x 坐标 */
      x: number,
      /** 旋转轴的 y 坐标 */
      y: number,
      /** 旋转轴的 z 坐标 */
      z: number,
      /** 旋转的角度。范围 [-180, 180] */
      angle: number,
    ): Animation;
    /** [[Animation]()
     *
     * 从 X 轴顺时针旋转一个角度 */
    rotateX(
      /** 旋转的角度。范围 [-180, 180] */
      angle: number,
    ): Animation;
    /** [[Animation]()
     *
     * 从 Y 轴顺时针旋转一个角度 */
    rotateY(
      /** 旋转的角度。范围 [-180, 180] */
      angle: number,
    ): Animation;
    /** [[Animation]()
     *
     * 从 Z 轴顺时针旋转一个角度 */
    rotateZ(
      /** 旋转的角度。范围 [-180, 180] */
      angle: number,
    ): Animation;
    /** [[Animation]()
     *
     * 缩放 */
    scale(
      /** 当仅有 sx 参数时，表示在 X 轴、Y 轴同时缩放sx倍数 */
      sx: number,
      /** 在 Y 轴缩放 sy 倍数 */
      sy?: number,
    ): Animation;
    /** [[Animation]()
     *
     * 缩放 */
    scale3d(
      /** x 轴的缩放倍数 */
      sx: number,
      /** y 轴的缩放倍数 */
      sy: number,
      /** z 轴的缩放倍数 */
      sz: number,
    ): Animation;
    /** [[Animation]()
     *
     * 缩放 X 轴 */
    scaleX(
      /** X 轴的缩放倍数 */
      scale: number,
    ): Animation;
    /** [[Animation]()
     *
     * 缩放 Y 轴 */
    scaleY(
      /** Y 轴的缩放倍数 */
      scale: number,
    ): Animation;
    /** [[Animation]()
     *
     * 缩放 Z 轴 */
    scaleZ(
      /** Z 轴的缩放倍数 */
      scale: number,
    ): Animation;
    /** [[Animation]()
     *
     * 对 X、Y 轴坐标进行倾斜 */
    skew(
      /** 对 X 轴坐标倾斜的角度，范围 [-180, 180] */
      ax: number,
      /** 对 Y 轴坐标倾斜的角度，范围 [-180, 180] */
      ay: number,
    ): Animation;
    /** [[Animation]()
     *
     * 对 X 轴坐标进行倾斜 */
    skewX(
      /** 倾斜的角度，范围 [-180, 180] */
      angle: number,
    ): Animation;
    /** [[Animation]()
     *
     * 对 Y 轴坐标进行倾斜 */
    skewY(
      /** 倾斜的角度，范围 [-180, 180] */
      angle: number,
    ): Animation;
    /** [[Animation]()
     *
     * 表示一组动画完成。可以在一组动画中调用任意多个动画方法，一组动画中的所有动画会同时开始，一组动画完成后才会进行下一组动画。 */
    step(option?: StepOption): Animation;
    /** [[Animation]()
     *
     * 设置 top 值 */
    top(
      /** 长度值，如果传入 number 则默认使用 px，可传入其他自定义单位的长度值 */
      value: number | string,
    ): Animation;
    /** [[Animation]()
     *
     * 平移变换 */
    translate(
      /** 当仅有该参数时表示在 X 轴偏移 tx，单位 px */
      tx?: number,
      /** 在 Y 轴平移的距离，单位为 px */
      ty?: number,
    ): Animation;
    /** [[Animation]()
     *
     * 对 xyz 坐标进行平移变换 */
    translate3d(
      /** 在 X 轴平移的距离，单位为 px */
      tx?: number,
      /** 在 Y 轴平移的距离，单位为 px */
      ty?: number,
      /** 在 Z 轴平移的距离，单位为 px */
      tz?: number,
    ): Animation;
    /** [[Animation]()
     *
     * 对 X 轴平移 */
    translateX(
      /** 在 X 轴平移的距离，单位为 px */
      translation: number,
    ): Animation;
    /** [[Animation]()
     *
     * 对 Y 轴平移 */
    translateY(
      /** 在 Y 轴平移的距离，单位为 px */
      translation: number,
    ): Animation;
    /** [[Animation]()
     *
     * 对 Z 轴平移 */
    translateZ(
      /** 在 Z 轴平移的距离，单位为 px */
      translation: number,
    ): Animation;
    /** [[Animation]()
     *
     * 设置宽度 */
    width(
      /** 长度值，如果传入 number 则默认使用 px，可传入其他自定义单位的长度值 */
      value: number | string,
    ): Animation;
  }
  interface BackgroundAudioManager {
    /** 
     *
     * 监听背景音频进入可播放状态事件。但不保证后面可以流畅播放 */
    onCanplay(
      /** 背景音频进入可播放状态事件的回调函数 */
      callback: BackgroundAudioManagerOnCanplayCallback,
    ): void;
    /** 
     *
     * 监听背景音频自然播放结束事件 */
    onEnded(
      /** 背景音频自然播放结束事件的回调函数 */
      callback: BackgroundAudioManagerOnEndedCallback,
    ): void;
    /** 
     *
     * 监听背景音频播放错误事件 */
    onError(
      /** 背景音频播放错误事件的回调函数 */
      callback: BackgroundAudioManagerOnErrorCallback,
    ): void;
    /** 
     *
     * 监听背景音频暂停事件 */
    onPause(
      /** 背景音频暂停事件的回调函数 */
      callback: BackgroundAudioManagerOnPauseCallback,
    ): void;
    /** 
     *
     * 监听背景音频播放事件 */
    onPlay(
      /** 背景音频播放事件的回调函数 */
      callback: BackgroundAudioManagerOnPlayCallback,
    ): void;
    /** 
     *
     * 监听背景音频完成跳转操作事件 */
    onSeeked(
      /** 背景音频完成跳转操作事件的回调函数 */
      callback: BackgroundAudioManagerOnSeekedCallback,
    ): void;
    /** 
     *
     * 监听背景音频开始跳转操作事件 */
    onSeeking(
      /** 背景音频开始跳转操作事件的回调函数 */
      callback: BackgroundAudioManagerOnSeekingCallback,
    ): void;
    /** 
     *
     * 监听背景音频停止事件 */
    onStop(
      /** 背景音频停止事件的回调函数 */
      callback: BackgroundAudioManagerOnStopCallback,
    ): void;
    /** 
     *
     * 监听背景音频播放进度更新事件 */
    onTimeUpdate(
      /** 背景音频播放进度更新事件的回调函数 */
      callback: BackgroundAudioManagerOnTimeUpdateCallback,
    ): void;
    /** 
     *
     * 监听音频加载中事件。当音频因为数据不足，需要停下来加载时会触发 */
    onWaiting(
      /** 音频加载中事件的回调函数 */
      callback: BackgroundAudioManagerOnWaitingCallback,
    ): void;
    /** 
     *
     * 暂停音乐 */
    pause(): void;
    /** 
     *
     * 播放音乐 */
    play(): void;
    /** 
     *
     * 跳转到指定位置 */
    seek(
      /** 跳转的位置，单位 s。精确到小数点后 3 位，即支持 ms 级别精确度 */
      currentTime: number,
    ): void;
    /** 
     *
     * 停止音乐 */
    stop(): void;
  }
  interface CanvasContext {
    /** 
*
* 创建一条弧线。
*
*   - 创建一个圆可以指定起始弧度为 0，终止弧度为 2 * Math.PI。
*   - 用 `stroke` 或者 `fill` 方法来在 `canvas` 中画弧线。
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')

// Draw coordinates
ctx.arc(100, 75, 50, 0, 2 * Math.PI)
ctx.setFillStyle('#EEEEEE')
ctx.fill()

ctx.beginPath()
ctx.moveTo(40, 75)
ctx.lineTo(160, 75)
ctx.moveTo(100, 15)
ctx.lineTo(100, 135)
ctx.setStrokeStyle('#AAAAAA')
ctx.stroke()

ctx.setFontSize(12)
ctx.setFillStyle('black')
ctx.fillText('0', 165, 78)
ctx.fillText('0.5*PI', 83, 145)
ctx.fillText('1*PI', 15, 78)
ctx.fillText('1.5*PI', 83, 10)

// Draw points
ctx.beginPath()
ctx.arc(100, 75, 2, 0, 2 * Math.PI)
ctx.setFillStyle('lightgreen')
ctx.fill()

ctx.beginPath()
ctx.arc(100, 25, 2, 0, 2 * Math.PI)
ctx.setFillStyle('blue')
ctx.fill()

ctx.beginPath()
ctx.arc(150, 75, 2, 0, 2 * Math.PI)
ctx.setFillStyle('red')
ctx.fill()

// Draw arc
ctx.beginPath()
ctx.arc(100, 75, 50, 0, 1.5 * Math.PI)
ctx.setStrokeStyle('#333333')
ctx.stroke()

ctx.draw()
```
*
* ![]((canvas/arc.png))
*
* 针对 arc(100, 75, 50, 0, 1.5 * Math.PI)的三个关键坐标如下：
*
* - 绿色: 圆心 (100, 75)
* - 红色: 起始弧度 (0)
* - 蓝色: 终止弧度 (1.5 * Math.PI) */
    arc(
      /** 圆心的 x 坐标 */
      x: number,
      /** 圆心的 y 坐标 */
      y: number,
      /** 圆的半径 */
      r: number,
      /** 起始弧度，单位弧度（在3点钟方向） */
      sAngle: number,
      /** 终止弧度 */
      eAngle: number,
      /** 弧度的方向是否是逆时针 */
      counterclockwise?: number,
    ): void;
    /** 
     *
     * 根据控制点和半径绘制圆弧路径。
     *
     **/
    arcTo(
      /** 第一个控制点的 x 轴坐标 */
      x1: number,
      /** 第一个控制点的 y 轴坐标 */
      y1: number,
      /** 第二个控制点的 x 轴坐标 */
      x2: number,
      /** 第二个控制点的 y 轴坐标 */
      y2: number,
      /** 圆弧的半径 */
      radius: number,
    ): void;
    /** 
*
* 开始创建一个路径。需要调用 `fill` 或者 `stroke` 才会使用路径进行填充或描边
*
*   - 在最开始的时候相当于调用了一次 `beginPath`。
*   - 同一个路径内的多次 `setFillStyle`、`setStrokeStyle`、`setLineWidth`等设置，以最后一次设置为准。
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')
// begin path
ctx.rect(10, 10, 100, 30)
ctx.setFillStyle('yellow')
ctx.fill()

// begin another path
ctx.beginPath()
ctx.rect(10, 40, 100, 30)

// only fill this rect, not in current path
ctx.setFillStyle('blue')
ctx.fillRect(10, 70, 100, 30)

ctx.rect(10, 100, 100, 30)

// it will fill current path
ctx.setFillStyle('red')
ctx.fill()
ctx.draw()
```
*
* ![]((canvas/fill-path.png)) */
    beginPath(): void;
    /** 
*
* 创建三次方贝塞尔曲线路径。曲线的起始点为路径中前一个点。
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')

// Draw points
ctx.beginPath()
ctx.arc(20, 20, 2, 0, 2 * Math.PI)
ctx.setFillStyle('red')
ctx.fill()

ctx.beginPath()
ctx.arc(200, 20, 2, 0, 2 * Math.PI)
ctx.setFillStyle('lightgreen')
ctx.fill()

ctx.beginPath()
ctx.arc(20, 100, 2, 0, 2 * Math.PI)
ctx.arc(200, 100, 2, 0, 2 * Math.PI)
ctx.setFillStyle('blue')
ctx.fill()

ctx.setFillStyle('black')
ctx.setFontSize(12)

// Draw guides
ctx.beginPath()
ctx.moveTo(20, 20)
ctx.lineTo(20, 100)
ctx.lineTo(150, 75)

ctx.moveTo(200, 20)
ctx.lineTo(200, 100)
ctx.lineTo(70, 75)
ctx.setStrokeStyle('#AAAAAA')
ctx.stroke()

// Draw quadratic curve
ctx.beginPath()
ctx.moveTo(20, 20)
ctx.bezierCurveTo(20, 100, 200, 100, 200, 20)
ctx.setStrokeStyle('black')
ctx.stroke()

ctx.draw()
```
*
* ![]((canvas/bezier-curve.png))
*
* 针对 moveTo(20, 20) bezierCurveTo(20, 100, 200, 100, 200, 20) 的三个关键坐标如下：
*
* - 红色：起始点(20, 20)
* - 蓝色：两个控制点(20, 100) (200, 100)
* - 绿色：终止点(200, 20) */
    bezierCurveTo(): void;
    /** 
*
* 清除画布上在该矩形区域内的内容
*
* **示例代码**
*
*
* clearRect 并非画一个白色的矩形在地址区域，而是清空，为了有直观感受，对 canvas 加了一层背景色。
* ```html
* <canvas canvas-id="myCanvas" style="border: 1px solid; background: #123456;"/>
* ```
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')
ctx.setFillStyle('red')
ctx.fillRect(0, 0, 150, 200)
ctx.setFillStyle('blue')
ctx.fillRect(150, 0, 150, 200)
ctx.clearRect(10, 10, 150, 75)
ctx.draw()
```
* ![]((canvas/clear-rect.png)) */
    clearRect(
      /** 矩形路径左上角的横坐标 */
      x: number,
      /** 矩形路径左上角的横坐标 */
      y: number,
      /** 矩形路径的宽度 */
      width: number,
      /** 矩形路径的高度 */
      height: number,
    ): void;
    /** 
*
* 从原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）。可以在使用 `clip` 方法前通过使用 `save` 方法对当前画布区域进行保存，并在以后的任意时间通过`restore`方法对其进行恢复。
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')

qa.downloadFile({
  url: 'xxxx',
  success: function(res) {
    ctx.save()
    ctx.beginPath()
    ctx.arc(50, 50, 25, 0, 2*Math.PI)
    ctx.clip()
    ctx.drawImage(res.tempFilePath, 25, 25)
    ctx.restore()
    ctx.draw()
  }
})
```
* ![]((canvas/clip.png))
*
**/
    clip(): void;
    /** 
*
* 关闭一个路径。会连接起点和终点。如果关闭路径后没有调用 `fill` 或者 `stroke` 并开启了新的路径，那之前的路径将不会被渲染。
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')
ctx.moveTo(10, 10)
ctx.lineTo(100, 10)
ctx.lineTo(100, 100)
ctx.closePath()
ctx.stroke()
ctx.draw()
```
* ![]((canvas/close-line.png))
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')
// begin path
ctx.rect(10, 10, 100, 30)
ctx.closePath()

// begin another path
ctx.beginPath()
ctx.rect(10, 40, 100, 30)

// only fill this rect, not in current path
ctx.setFillStyle('blue')
ctx.fillRect(10, 70, 100, 30)

ctx.rect(10, 100, 100, 30)

// it will fill current path
ctx.setFillStyle('red')
ctx.fill()
ctx.draw()
```
*
* ![]((canvas/close-path.png)) */
    closePath(): void;
    /** 
     *
     * 对指定的图像创建模式的方法，可在指定的方向上重复元图像
     *
     **/
    createPattern(
      /** 重复的图像源，仅支持包内路径和临时路径 */
      image: string,
      /** 如何重复图像 */
      repetition: string,
    ): void;
    /** 
*
* 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
*
* **示例代码**
*
*
* 第二次 draw() reserve 为 true。所以保留了上一次的绘制结果，在上下文设置的 fillStyle 'red' 也变成了默认的 'black'。
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')

ctx.setFillStyle('red')
ctx.fillRect(10, 10, 150, 100)
ctx.draw()
ctx.fillRect(50, 50, 150, 100)
ctx.draw(true)
```
* ![]((canvas/reserve.png))
*
* **示例代码**
*
*
* 第二次 draw() reserve 为 false。所以没有保留了上一次的绘制结果和在上下文设置的 fillStyle 'red'。
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')

ctx.setFillStyle('red')
ctx.fillRect(10, 10, 150, 100)
ctx.draw()
ctx.fillRect(50, 50, 150, 100)
ctx.draw()
```
* ![]((canvas/un-reserve.png)) */
    draw(
      /** 本次绘制是否接着上一次绘制。即 reserve 参数为 false，则在本次调用绘制之前 native 层会先清空画布再继续绘制；若 reserve 参数为 true，则保留当前画布上的内容，本次调用 drawCanvas 绘制的内容覆盖在上面，默认 false。 */
      reserve: boolean,
      /** 绘制完成后执行的回调函数 */
      callback: Function,
    ): void;
    /** 
*
* 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
*
* **示例代码**
*
*
* 第二次 draw() reserve 为 true。所以保留了上一次的绘制结果，在上下文设置的 fillStyle 'red' 也变成了默认的 'black'。
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')

ctx.setFillStyle('red')
ctx.fillRect(10, 10, 150, 100)
ctx.draw()
ctx.fillRect(50, 50, 150, 100)
ctx.draw(true)
```
* ![]((canvas/reserve.png))
*
* **示例代码**
*
*
* 第二次 draw() reserve 为 false。所以没有保留了上一次的绘制结果和在上下文设置的 fillStyle 'red'。
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')

ctx.setFillStyle('red')
ctx.fillRect(10, 10, 150, 100)
ctx.draw()
ctx.fillRect(50, 50, 150, 100)
ctx.draw()
```
* ![]((canvas/un-reserve.png)) */
    draw(
      /** 绘制完成后执行的回调函数 */
      callback: Function,
    ): void;
    /** 
*
* 绘制图像到画布
*
* **示例代码**
*
*
*
* 有三个版本的写法：
*
* - drawImage(dx, dy)
* - drawImage(dx, dy, dWidth, dHeight)
* - drawImage(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) 
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')

qa.chooseImage({
  success: function(res){
    ctx.drawImage(res.tempFilePaths[0], 0, 0, 150, 100)
    ctx.draw()
  }
})

```
* ![]((canvas/draw-image.png)) */
    drawImage(
      /** 所要绘制的图片资源 */
      imageResource: string,
      /** 图像的左上角在目标 canvas 上 x 轴的位置 */
      dx: number,
      /** 图像的左上角在目标 canvas 上 y 轴的位置 */
      dy: number,
      /** 在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放 */
      dWidth: number,
      /** 在目标画布上绘制图像的高度，允许对绘制的图像进行缩放 */
      dHeight: number,
      /** 源图像的矩形选择框的左上角 x 坐标 */
      sx: number,
      /** 源图像的矩形选择框的左上角 y 坐标 */
      sy: number,
      /** 源图像的矩形选择框的宽度 */
      sWidth: number,
      /** 源图像的矩形选择框的高度 */
      sHeight: number,
    ): void;
    /** 
*
* 对当前路径中的内容进行填充。默认的填充色为黑色。
*
* **示例代码**
*
*
*
* 如果当前路径没有闭合，fill() 方法会将起点和终点进行连接，然后填充。
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')
ctx.moveTo(10, 10)
ctx.lineTo(100, 10)
ctx.lineTo(100, 100)
ctx.fill()
ctx.draw()
```
*
* fill() 填充的的路径是从 beginPath() 开始计算，但是不会将 fillRect() 包含进去。
*
* ![]((canvas/fill-line.png))
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')
// begin path
ctx.rect(10, 10, 100, 30)
ctx.setFillStyle('yellow')
ctx.fill()

// begin another path
ctx.beginPath()
ctx.rect(10, 40, 100, 30)

// only fill this rect, not in current path
ctx.setFillStyle('blue')
ctx.fillRect(10, 70, 100, 30)

ctx.rect(10, 100, 100, 30)

// it will fill current path
ctx.setFillStyle('red')
ctx.fill()
ctx.draw()
```
*
* ![]((canvas/fill-path.png)) */
    fill(): void;
    /** 
*
* 填充一个矩形。用 [`setFillStyle`]() 设置矩形的填充色，如果没设置默认是黑色。
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')
ctx.setFillStyle('red')
ctx.fillRect(10, 10, 150, 75)
ctx.draw()
```
* ![]((canvas/fill-rect.png)) */
    fillRect(
      /** 矩形路径左上角的横坐标 */
      x: number,
      /** 矩形路径左上角的横坐标 */
      y: number,
      /** 矩形路径的宽度 */
      width: number,
      /** 矩形路径的高度 */
      height: number,
    ): void;
    /** 
*
* 在画布上绘制被填充的文本
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')

ctx.setFontSize(20)
ctx.fillText('Hello', 20, 20)
ctx.fillText('MINA', 100, 100)

ctx.draw()
```
* ![]((canvas/text.png)) */
    fillText(
      /** 在画布上输出的文本 */
      text: string,
      /** 绘制文本的左上角 x 坐标位置 */
      x: number,
      /** 绘制文本的左上角 y 坐标位置 */
      y: number,
      /** 需要绘制的最大宽度，可选 */
      maxWidth?: number,
    ): void;
    /** 
*
* 增加一个新点，然后创建一条从上次指定点到目标点的线。用 `stroke` 方法来画线条
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')
ctx.moveTo(10, 10)
ctx.rect(10, 10, 100, 50)
ctx.lineTo(110, 60)
ctx.stroke()
ctx.draw()
```
* ![]((canvas/line-to.png)) */
    lineTo(
      /** 目标位置的 x 坐标 */
      x: number,
      /** 目标位置的 y 坐标 */
      y: number,
    ): void;
    /** 
*
* 把路径移动到画布中的指定点，不创建线条。用 `stroke` 方法来画线条
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')
ctx.moveTo(10, 10)
ctx.lineTo(100, 10)

ctx.moveTo(10, 50)
ctx.lineTo(100, 50)
ctx.stroke()
ctx.draw()
```
* ![]((canvas/move-to.png)) */
    moveTo(
      /** 目标位置的 x 坐标 */
      x: number,
      /** 目标位置的 y 坐标 */
      y: number,
    ): void;
    /** 
*
* 创建二次贝塞尔曲线路径。曲线的起始点为路径中前一个点。
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')

// Draw points
ctx.beginPath()
ctx.arc(20, 20, 2, 0, 2 * Math.PI)
ctx.setFillStyle('red')
ctx.fill()

ctx.beginPath()
ctx.arc(200, 20, 2, 0, 2 * Math.PI)
ctx.setFillStyle('lightgreen')
ctx.fill()

ctx.beginPath()
ctx.arc(20, 100, 2, 0, 2 * Math.PI)
ctx.setFillStyle('blue')
ctx.fill()

ctx.setFillStyle('black')
ctx.setFontSize(12)

// Draw guides
ctx.beginPath()
ctx.moveTo(20, 20)
ctx.lineTo(20, 100)
ctx.lineTo(200, 20)
ctx.setStrokeStyle('#AAAAAA')
ctx.stroke()

// Draw quadratic curve
ctx.beginPath()
ctx.moveTo(20, 20)
ctx.quadraticCurveTo(20, 100, 200, 20)
ctx.setStrokeStyle('black')
ctx.stroke()

ctx.draw()
```
*
* ![]((canvas/quadratic-curve-to.png))
*
* 针对 moveTo(20, 20) quadraticCurveTo(20, 100, 200, 20) 的三个关键坐标如下：
*
* - 红色：起始点(20, 20)
* - 蓝色：控制点(20, 100)
* - 绿色：终止点(200, 20) */
    quadraticCurveTo(
      /** 贝塞尔控制点的 x 坐标 */
      cpx: number,
      /** 贝塞尔控制点的 y 坐标 */
      cpy: number,
      /** 结束点的 x 坐标 */
      x: number,
      /** 结束点的 y 坐标 */
      y: number,
    ): void;
    /** 
*
* 创建一个矩形路径。需要用 [`fill`]() 方法将矩形真正的画到 `canvas` 中
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')
ctx.rect(10, 10, 150, 75)
ctx.setFillStyle('red')
ctx.fill()
ctx.draw()
```
* ![]((canvas/fill-rect.png)) */
    rect(
      /** 矩形路径左上角的横坐标 */
      x: number,
      /** 矩形路径左上角的横坐标 */
      y: number,
      /** 矩形路径的宽度 */
      width: number,
      /** 矩形路径的高度 */
      height: number,
    ): void;
    /** 
*
* 恢复之前保存的绘图上下文。
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')

// save the default fill style
ctx.save()
ctx.setFillStyle('red')
ctx.fillRect(10, 10, 150, 100)

// restore to the previous saved state
ctx.restore()
ctx.fillRect(50, 50, 150, 100)

ctx.draw()
```
* ![]((canvas/save-restore.png)) */
    restore(): void;
    /** 
*
* 以原点为中心顺时针旋转当前坐标轴。多次调用旋转的角度会叠加。原点可以用 `translate` 方法修改。
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')

ctx.strokeRect(100, 10, 150, 100)
ctx.rotate(20 * Math.PI / 180)
ctx.strokeRect(100, 10, 150, 100)
ctx.rotate(20 * Math.PI / 180)
ctx.strokeRect(100, 10, 150, 100)

ctx.draw()
```
* ![]((canvas/rotate.png)) */
    rotate(
      /** 旋转角度，以弧度计 degrees * Math.PI/180；degrees 范围为 0-360 */
      rotate: number,
    ): void;
    /** 
*
* 保存绘图上下文。
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')

// save the default fill style
ctx.save()
ctx.setFillStyle('red')
ctx.fillRect(10, 10, 150, 100)

// restore to the previous saved state
ctx.restore()
ctx.fillRect(50, 50, 150, 100)

ctx.draw()
```
* ![]((canvas/save-restore.png)) */
    save(): void;
    /** 
*
* 在调用后，之后创建的路径其横纵坐标会被缩放。多次调用倍数会相乘。
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')

ctx.strokeRect(10, 10, 25, 15)
ctx.scale(2, 2)
ctx.strokeRect(10, 10, 25, 15)
ctx.scale(2, 2)
ctx.strokeRect(10, 10, 25, 15)

ctx.draw()
```
* ![]((canvas/scale.png)) */
    scale(
      /** 横坐标缩放的倍数 (1 = 100%，0.5 = 50%，2 = 200%) */
      scaleWidth: number,
      /** 纵坐标轴缩放的倍数 (1 = 100%，0.5 = 50%，2 = 200%) */
      scaleHeight: number,
    ): void;
    /** [CanvasContext.setFillStyle([Color]()
*
* 设置填充色。
*
* **代码示例**
*
*
* ```js
const ctx = qa.createCanvasContext('myCanvas')
ctx.setFillStyle('red')
ctx.fillRect(10, 10, 150, 75)
ctx.draw()
```
* ![]((canvas/fill-rect.png)) */
    setFillStyle(
      /** [Color]()
       *
       * 填充的颜色，默认颜色为 black。 */
      color: Color,
    ): void;
    /** 
*
* 设置字体的字号
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')

ctx.setFontSize(20)
ctx.fillText('20', 20, 20)
ctx.setFontSize(30)
ctx.fillText('30', 40, 40)
ctx.setFontSize(40)
ctx.fillText('40', 60, 60)
ctx.setFontSize(50)
ctx.fillText('50', 90, 90)

ctx.draw()
```
* ![]((canvas/font-size.png)) */
    setFontSize(
      /** 字体的字号 */
      fontSize: number,
    ): void;
    /** 
*
* 设置全局画笔透明度。
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')

ctx.setFillStyle('red')
ctx.fillRect(10, 10, 150, 100)
ctx.setGlobalAlpha(0.2)
ctx.setFillStyle('blue')
ctx.fillRect(50, 50, 150, 100)
ctx.setFillStyle('yellow')
ctx.fillRect(100, 100, 150, 100)

ctx.draw()
```
* ![]((canvas/global-alpha.png)) */
    setGlobalAlpha(
      /** 透明度。范围 0-1，0 表示完全透明，1 表示完全不透明。 */
      alpha: number,
    ): void;
    /** 
*
* 设置线条的端点样式
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')
ctx.beginPath()
ctx.moveTo(10, 10)
ctx.lineTo(150, 10)
ctx.stroke()

ctx.beginPath()
ctx.setLineCap('butt')
ctx.setLineWidth(10)
ctx.moveTo(10, 30)
ctx.lineTo(150, 30)
ctx.stroke()

ctx.beginPath()
ctx.setLineCap('round')
ctx.setLineWidth(10)
ctx.moveTo(10, 50)
ctx.lineTo(150, 50)
ctx.stroke()

ctx.beginPath()
ctx.setLineCap('square')
ctx.setLineWidth(10)
ctx.moveTo(10, 70)
ctx.lineTo(150, 70)
ctx.stroke()

ctx.draw()
```
* ![]((canvas/line-cap.png)) */
    setLineCap(
      /** 线条的结束端点样式 */
      lineCap: string,
    ): void;
    /** 
*
* 设置虚线样式。
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')

ctx.setLineDash([10, 20], 5);

ctx.beginPath();
ctx.moveTo(0,100);
ctx.lineTo(400, 100);
ctx.stroke();

ctx.draw()
```
* ![]((canvas/set-line-dash.png))
*
**/
    setLineDash(
      /** 一组描述交替绘制线段和间距（坐标空间单位）长度的数字 */
      pattern: Array<number>,
      /** 虚线偏移量 */
      offset: number,
    ): void;
    /** 
*
* 设置线条的交点样式
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')
ctx.beginPath()
ctx.moveTo(10, 10)
ctx.lineTo(100, 50)
ctx.lineTo(10, 90)
ctx.stroke()

ctx.beginPath()
ctx.setLineJoin('bevel')
ctx.setLineWidth(10)
ctx.moveTo(50, 10)
ctx.lineTo(140, 50)
ctx.lineTo(50, 90)
ctx.stroke()

ctx.beginPath()
ctx.setLineJoin('round')
ctx.setLineWidth(10)
ctx.moveTo(90, 10)
ctx.lineTo(180, 50)
ctx.lineTo(90, 90)
ctx.stroke()

ctx.beginPath()
ctx.setLineJoin('miter')
ctx.setLineWidth(10)
ctx.moveTo(130, 10)
ctx.lineTo(220, 50)
ctx.lineTo(130, 90)
ctx.stroke()

ctx.draw()
```
* ![]((canvas/line-join.png)) */
    setLineJoin(
      /** 线条的结束交点样式 */
      lineJoin: string,
    ): void;
    /** 
*
* 设置线条的宽度
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')
ctx.beginPath()
ctx.moveTo(10, 10)
ctx.lineTo(150, 10)
ctx.stroke()

ctx.beginPath()
ctx.setLineWidth(5)
ctx.moveTo(10, 30)
ctx.lineTo(150, 30)
ctx.stroke()

ctx.beginPath()
ctx.setLineWidth(10)
ctx.moveTo(10, 50)
ctx.lineTo(150, 50)
ctx.stroke()

ctx.beginPath()
ctx.setLineWidth(15)
ctx.moveTo(10, 70)
ctx.lineTo(150, 70)
ctx.stroke()

ctx.draw()
```
*
* ![]((canvas/line-width.png)) */
    setLineWidth(
      /** 线条的宽度，单位px */
      lineWidth: number,
    ): void;
    /** 
*
* 设置最大斜接长度。斜接长度指的是在两条线交汇处内角和外角之间的距离。当 [CanvasContext.setLineJoin()]() 为 miter 时才有效。超过最大倾斜长度的，连接处将以 lineJoin 为 bevel 来显示。
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')
ctx.beginPath()
ctx.setLineWidth(10)
ctx.setLineJoin('miter')
ctx.setMiterLimit(1)
ctx.moveTo(10, 10)
ctx.lineTo(100, 50)
ctx.lineTo(10, 90)
ctx.stroke()

ctx.beginPath()
ctx.setLineWidth(10)
ctx.setLineJoin('miter')
ctx.setMiterLimit(2)
ctx.moveTo(50, 10)
ctx.lineTo(140, 50)
ctx.lineTo(50, 90)
ctx.stroke()

ctx.beginPath()
ctx.setLineWidth(10)
ctx.setLineJoin('miter')
ctx.setMiterLimit(3)
ctx.moveTo(90, 10)
ctx.lineTo(180, 50)
ctx.lineTo(90, 90)
ctx.stroke()

ctx.beginPath()
ctx.setLineWidth(10)
ctx.setLineJoin('miter')
ctx.setMiterLimit(4)
ctx.moveTo(130, 10)
ctx.lineTo(220, 50)
ctx.lineTo(130, 90)
ctx.stroke()

ctx.draw()
```
* ![]((canvas/miter-limit.png)) */
    setMiterLimit(
      /** 最大斜接长度 */
      miterLimit: number,
    ): void;
    /** [CanvasContext.setStrokeStyle([Color]()
*
* 设置描边颜色。
*
* **代码示例**
*
*
* ```js
const ctx = qa.createCanvasContext('myCanvas')
ctx.setStrokeStyle('red')
ctx.strokeRect(10, 10, 150, 75)
ctx.draw()
```
* ![]((canvas/stroke-rect.png)) */
    setStrokeStyle(
      /** [Color]()
       *
       * 描边的颜色，默认颜色为 black。 */
      color: Color,
    ): void;
    /** 
*
* 设置文字的对齐
*
* **示例代码**
*
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')

ctx.setStrokeStyle('red')
ctx.moveTo(150, 20)
ctx.lineTo(150, 170)
ctx.stroke()

ctx.setFontSize(15)
ctx.setTextAlign('left')
ctx.fillText('textAlign=left', 150, 60)

ctx.setTextAlign('center')
ctx.fillText('textAlign=center', 150, 80)

ctx.setTextAlign('right')
ctx.fillText('textAlign=right', 150, 100)

ctx.draw()
```
*
* ![]((canvas/set-text-align.png))
*
**/
    setTextAlign(
      /** 文字的对齐方式 */
      align: string,
    ): void;
    /** 
*
* 设置文字的竖直对齐
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')

ctx.setStrokeStyle('red')
ctx.moveTo(5, 75)
ctx.lineTo(295, 75)
ctx.stroke()

ctx.setFontSize(20)

ctx.setTextBaseline('top')
ctx.fillText('top', 5, 75)

ctx.setTextBaseline('middle')
ctx.fillText('middle', 50, 75)

ctx.setTextBaseline('bottom')
ctx.fillText('bottom', 120, 75)

ctx.setTextBaseline('normal')
ctx.fillText('normal', 200, 75)

ctx.draw()
```
* ![]((canvas/set-text-baseline.png))
*
**/
    setTextBaseline(
      /** 文字的竖直对齐方式 */
      textBaseline: string,
    ): void;
    /** 
     *
     * 使用矩阵重新设置（覆盖）当前变换的方法
     *
     **/
    setTransform(
      /** 水平缩放 */
      scaleX: number,
      /** 垂直缩放 */
      scaleY: number,
      /** 水平倾斜 */
      skewX: number,
      /** 垂直倾斜 */
      skewY: number,
      /** 水平移动 */
      translateX: number,
      /** 垂直移动 */
      translateY: number,
    ): void;
    /** 
*
* 画出当前路径的边框。默认颜色色为黑色。
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')
ctx.moveTo(10, 10)
ctx.lineTo(100, 10)
ctx.lineTo(100, 100)
ctx.stroke()
ctx.draw()
```
* ![]((canvas/stroke-line.png))
*
* stroke() 描绘的的路径是从 beginPath() 开始计算，但是不会将 strokeRect() 包含进去。
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')
// begin path
ctx.rect(10, 10, 100, 30)
ctx.setStrokeStyle('yellow')
ctx.stroke()

// begin another path
ctx.beginPath()
ctx.rect(10, 40, 100, 30)

// only stoke this rect, not in current path
ctx.setStrokeStyle('blue')
ctx.strokeRect(10, 70, 100, 30)

ctx.rect(10, 100, 100, 30)

// it will stroke current path
ctx.setStrokeStyle('red')
ctx.stroke()
ctx.draw()
```
*
* ![]((canvas/stroke-path.png)) */
    stroke(): void;
    /** 
*
* 画一个矩形(非填充)。 用 [`setStrokeStyle`]() 设置矩形线条的颜色，如果没设置默认是黑色。
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')
ctx.setStrokeStyle('red')
ctx.strokeRect(10, 10, 150, 75)
ctx.draw()
```
* ![]((canvas/stroke-rect.png)) */
    strokeRect(
      /** 矩形路径左上角的横坐标 */
      x: number,
      /** 矩形路径左上角的横坐标 */
      y: number,
      /** 矩形路径的宽度 */
      width: number,
      /** 矩形路径的高度 */
      height: number,
    ): void;
    /** 
     *
     * 给定的 (x, y) 位置绘制文本描边的方法
     *
     **/
    strokeText(
      /** 要绘制的文本 */
      text: string,
      /** 文本起始点的 x 轴坐标 */
      x: number,
      /** 文本起始点的 y 轴坐标 */
      y: number,
      /** 需要绘制的最大宽度，可选 */
      maxWidth?: number,
    ): void;
    /** 
     *
     * 使用矩阵多次叠加当前变换的方法
     *
     **/
    transform(
      /** 水平缩放 */
      scaleX: number,
      /** 垂直缩放 */
      scaleY: number,
      /** 水平倾斜 */
      skewX: number,
      /** 垂直倾斜 */
      skewY: number,
      /** 水平移动 */
      translateX: number,
      /** 垂直移动 */
      translateY: number,
    ): void;
    /** 
*
* 对当前坐标系的原点 (0, 0) 进行变换。默认的坐标系原点为页面左上角。
*
* **示例代码**
*
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')

ctx.strokeRect(10, 10, 150, 100)
ctx.translate(20, 20)
ctx.strokeRect(10, 10, 150, 100)
ctx.translate(20, 20)
ctx.strokeRect(10, 10, 150, 100)

ctx.draw()
```
*
* ![]((canvas/translate.png)) */
    translate(
      /** 水平坐标平移量 */
      x: number,
      /** 竖直坐标平移量 */
      y: number,
    ): void;
    /** 
     *
     * 测量文本尺寸信息。目前仅返回文本宽度。同步接口。
     *
     **/
    measureText(
      /** 要测量的文本 */
      text: string,
    ): TextMetrics;
    /** [[CanvasGradient]()
*
* 创建一个圆形的渐变颜色。起点在圆心，终点在圆环。返回的`CanvasGradient`对象需要使用 [CanvasGradient.addColorStop()]() 来指定渐变点，至少要两个。
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')

// Create circular gradient
const grd = ctx.createCircularGradient(75, 50, 50)
grd.addColorStop(0, 'red')
grd.addColorStop(1, 'white')

// Fill with gradient
ctx.setFillStyle(grd)
ctx.fillRect(10, 10, 150, 80)
ctx.draw()
```
* ![]((canvas/circular-gradient.png)) */
    createCircularGradient(
      /** 圆心的 x 坐标 */
      x: number,
      /** 圆心的 y 坐标 */
      y: number,
      /** 圆的半径 */
      r: number,
    ): CanvasGradient;
    /** [[CanvasGradient]()
*
* 创建一个线性的渐变颜色。返回的`CanvasGradient`对象需要使用 [CanvasGradient.addColorStop()]() 来指定渐变点，至少要两个。
*
* **示例代码**
*
*
* ```javascript
const ctx = qa.createCanvasContext('myCanvas')

// Create linear gradient
const grd = ctx.createLinearGradient(0, 0, 200, 0)
grd.addColorStop(0, 'red')
grd.addColorStop(1, 'white')

// Fill with gradient
ctx.setFillStyle(grd)
ctx.fillRect(10, 10, 150, 80)
ctx.draw()
```
* ![]((canvas/linear-gradient.png)) */
    createLinearGradient(
      /** 起点的 x 坐标 */
      x0: number,
      /** 起点的 y 坐标 */
      y0: number,
      /** 终点的 x 坐标 */
      x1: number,
      /** 终点的 y 坐标 */
      y1: number,
    ): CanvasGradient;
  }
  interface CanvasGradient {
    /** [CanvasGradient.addColorStop(number stop, [Color]()
*
* 添加颜色的渐变点。小于最小 stop 的部分会按最小 stop 的 color 来渲染，大于最大 stop 的部分会按最大 stop 的 color 来渲染
*
* **示例代码**
*
*
* ```js
const ctx = qa.createCanvasContext('myCanvas')

// Create circular gradient
const grd = ctx.createLinearGradient(30, 10, 120, 10)
grd.addColorStop(0, 'red')
grd.addColorStop(0.16, 'orange')
grd.addColorStop(0.33, 'yellow')
grd.addColorStop(0.5, 'green')
grd.addColorStop(0.66, 'cyan')
grd.addColorStop(0.83, 'blue')
grd.addColorStop(1, 'purple')

// Fill with gradient
ctx.setFillStyle(grd)
ctx.fillRect(10, 10, 150, 80)
ctx.draw()
```
* ![]((canvas/color-stop.png)) */
    addColorStop(
      /** 表示渐变中开始与结束之间的位置，范围 0-1。 */
      stop: number,
      /** [Color]()
       *
       * 渐变点的颜色。 */
      color: Color,
    ): void;
  }
  interface DownloadTask {
    /** 
     *
     * 中断下载任务
     *
     **/
    abort(): void;
    /** 
     *
     * 取消监听下载进度变化事件
     *
     **/
    offProgressUpdate(
      /** 下载进度变化事件的回调函数 */
      callback: DownloadTaskOffProgressUpdateCallback,
    ): void;
    /** 
     *
     * 监听下载进度变化事件
     *
     **/
    onProgressUpdate(
      /** 下载进度变化事件的回调函数 */
      callback: DownloadTaskOnProgressUpdateCallback,
    ): void;
  }
  interface GeneralCallbackResult {
    errMsg: string;
  }
  interface InnerAudioContext {
    /** 
     *
     * 销毁当前实例 */
    destroy(): void;
    /** 
     *
     * 取消监听音频进入可以播放状态的事件
     *
     **/
    offCanplay(
      /** 音频进入可以播放状态的事件的回调函数 */
      callback: OffCanplayCallback,
    ): void;
    /** 
     *
     * 取消监听音频自然播放至结束的事件
     *
     **/
    offEnded(
      /** 音频自然播放至结束的事件的回调函数 */
      callback: OffEndedCallback,
    ): void;
    /** 
     *
     * 取消监听音频播放错误事件
     *
     **/
    offError(
      /** 音频播放错误事件的回调函数 */
      callback: OffErrorCallback,
    ): void;
    /** 
     *
     * 取消监听音频暂停事件
     *
     **/
    offPause(
      /** 音频暂停事件的回调函数 */
      callback: OffPauseCallback,
    ): void;
    /** 
     *
     * 取消监听音频播放事件
     *
     **/
    offPlay(
      /** 音频播放事件的回调函数 */
      callback: OffPlayCallback,
    ): void;
    /** 
     *
     * 取消监听音频完成跳转操作的事件
     *
     **/
    offSeeked(
      /** 音频完成跳转操作的事件的回调函数 */
      callback: OffSeekedCallback,
    ): void;
    /** 
     *
     * 取消监听音频进行跳转操作的事件
     *
     **/
    offSeeking(
      /** 音频进行跳转操作的事件的回调函数 */
      callback: OffSeekingCallback,
    ): void;
    /** 
     *
     * 取消监听音频停止事件
     *
     **/
    offStop(
      /** 音频停止事件的回调函数 */
      callback: OffStopCallback,
    ): void;
    /** 
     *
     * 取消监听音频播放进度更新事件
     *
     **/
    offTimeUpdate(
      /** 音频播放进度更新事件的回调函数 */
      callback: OffTimeUpdateCallback,
    ): void;
    /** 
     *
     * 取消监听音频加载中事件
     *
     **/
    offWaiting(
      /** 音频加载中事件的回调函数 */
      callback: OffWaitingCallback,
    ): void;
    /** 
     *
     * 监听音频进入可以播放状态的事件。但不保证后面可以流畅播放 */
    onCanplay(
      /** 音频进入可以播放状态的事件的回调函数 */
      callback: InnerAudioContextOnCanplayCallback,
    ): void;
    /** 
     *
     * 监听音频自然播放至结束的事件 */
    onEnded(
      /** 音频自然播放至结束的事件的回调函数 */
      callback: InnerAudioContextOnEndedCallback,
    ): void;
    /** 
     *
     * 监听音频播放错误事件 */
    onError(
      /** 音频播放错误事件的回调函数 */
      callback: InnerAudioContextOnErrorCallback,
    ): void;
    /** 
     *
     * 监听音频暂停事件 */
    onPause(
      /** 音频暂停事件的回调函数 */
      callback: InnerAudioContextOnPauseCallback,
    ): void;
    /** 
     *
     * 监听音频播放事件 */
    onPlay(
      /** 音频播放事件的回调函数 */
      callback: InnerAudioContextOnPlayCallback,
    ): void;
    /** 
     *
     * 监听音频完成跳转操作的事件 */
    onSeeked(
      /** 音频完成跳转操作的事件的回调函数 */
      callback: InnerAudioContextOnSeekedCallback,
    ): void;
    /** 
     *
     * 监听音频进行跳转操作的事件 */
    onSeeking(
      /** 音频进行跳转操作的事件的回调函数 */
      callback: InnerAudioContextOnSeekingCallback,
    ): void;
    /** 
     *
     * 监听音频停止事件 */
    onStop(
      /** 音频停止事件的回调函数 */
      callback: InnerAudioContextOnStopCallback,
    ): void;
    /** 
     *
     * 监听音频播放进度更新事件 */
    onTimeUpdate(
      /** 音频播放进度更新事件的回调函数 */
      callback: InnerAudioContextOnTimeUpdateCallback,
    ): void;
    /** 
     *
     * 监听音频加载中事件。当音频因为数据不足，需要停下来加载时会触发 */
    onWaiting(
      /** 音频加载中事件的回调函数 */
      callback: InnerAudioContextOnWaitingCallback,
    ): void;
    /** 
     *
     * 暂停。暂停后的音频再播放会从暂停处开始播放 */
    pause(): void;
    /** 
     *
     * 播放 */
    play(): void;
    /** 
     *
     * 跳转到指定位置 */
    seek(
      /** 跳转的时间，单位 s。精确到小数点后 3 位，即支持 ms 级别精确度 */
      position: number,
    ): void;
    /** 
     *
     * 停止。停止后的音频再播放会从头开始播放。 */
    stop(): void;
  }
  interface IntersectionObserver {
    /** 
     *
     * 停止监听。回调函数将不再触发
     *
     * **注意**
     *
     *
     * 与页面显示区域的相交区域并不准确代表用户可见的区域，因为参与计算的区域是“布局区域”，布局区域可能会在绘制时被其他节点裁剪隐藏（如遇祖先节点中 overflow 样式为 hidden 的节点）或遮盖（如遇 fixed 定位的节点）。 */
    disconnect(): void;
    /** 
     *
     * 指定目标节点并开始监听相交状态变化情况 */
    observe(
      /** 选择器 */
      targetSelector: string,
      /** 监听相交状态变化的回调函数 */
      callback: ObserveCallback,
    ): void;
    /** 
     *
     * 使用选择器指定一个节点，作为参照区域之一。 */
    relativeTo(
      /** 选择器 */
      selector: string,
      /** 用来扩展（或收缩）参照节点布局区域的边界 */
      margins?: RelativeToMargins,
    ): void;
    /** 
*
* 指定页面显示区域作为参照区域之一
*
* **示例代码**
*
*
* 下面的示例代码中，如果目标节点（用选择器 .target-class 指定）进入显示区域以下 100px 时，就会触发回调函数。
* ```javascript
Page({
  onLoad: function(){
    qa.createIntersectionObserver().relativeToViewport({bottom: 100}).observe('.target-class', (res) => {
      res.intersectionRatio // 相交区域占目标节点的布局区域的比例
      res.intersectionRect // 相交区域
      res.intersectionRect.left // 相交区域的左边界坐标
      res.intersectionRect.top // 相交区域的上边界坐标
      res.intersectionRect.width // 相交区域的宽度
      res.intersectionRect.height // 相交区域的高度
    })
  }
})
``` */
    relativeToViewport(
      /** 用来扩展（或收缩）参照节点布局区域的边界 */
      margins?: RelativeToViewportMargins,
    ): void;
  }
  interface MapContext {
    /** 
     *
     * 获取当前地图中心的经纬度。返回的是 gcj02 坐标系，可以用于 [qa.openLocation()]() */
    getCenterLocation(option?: GetCenterLocationOption): void;
    /** 
     *
     * 获取当前地图的视野范围
     *
     **/
    getRegion(option?: GetRegionOption): void;
    /** 
     *
     * 获取当前地图的缩放级别
     *
     **/
    getScale(option?: GetScaleOption): void;
    /** 
     *
     * 缩放视野展示所有经纬度
     *
     **/
    includePoints(option: IncludePointsOption): void;
    /** 
     *
     * 将地图中心移动到当前定位点。需要配合map组件的show-location使用 */
    moveToLocation(): void;
    /** 
     *
     * 平移marker，带动画
     *
     **/
    translateMarker(option: TranslateMarkerOption): void;
  }
  interface NodesRef {
    /** 
*
* 获取节点的相关信息。需要获取的字段在fields中指定。返回值是 `nodesRef` 对应的 `selectorQuery`
*
* **注意**
*
*
* computedStyle 的优先级高于 size，当同时在 computedStyle 里指定了 width/height 和传入了 size: true，则优先返回 computedStyle 获取到的 width/height。
*
* **示例代码**
*
*
* ```js
Page({
  getFields () {
    qa.createSelectorQuery().select('#the-id').fields({
      dataset: true,
      size: true,
      scrollOffset: true,
      properties: ['scrollX', 'scrollY'],
      computedStyle: ['margin', 'backgroundColor'],
      context: true,
    }, function (res) {
      res.dataset    // 节点的dataset
      res.width      // 节点的宽度
      res.height     // 节点的高度
      res.scrollLeft // 节点的水平滚动位置
      res.scrollTop  // 节点的竖直滚动位置
      res.scrollX    // 节点 scroll-x 属性的当前值
      res.scrollY    // 节点 scroll-y 属性的当前值
      // 此处返回指定要返回的样式名
      res.margin
      res.backgroundColor
      res.context    // 节点对应的 Context 对象
    }).exec()
  }
})
``` */
    fields(fields: Fields): void;
    /** [[SelectorQuery]()
*
* 添加节点的布局位置的查询请求。相对于显示区域，以像素为单位。其功能类似于 DOM 的 `getBoundingClientRect`。返回 `NodesRef` 对应的 `SelectorQuery`。
*
* **示例代码**
*
*
* ```js
Page({
  getRect () {
    qa.createSelectorQuery().select('#the-id').boundingClientRect(function(rect){
      rect.id      // 节点的ID
      rect.dataset // 节点的dataset
      rect.left    // 节点的左边界坐标
      rect.right   // 节点的右边界坐标
      rect.top     // 节点的上边界坐标
      rect.bottom  // 节点的下边界坐标
      rect.width   // 节点的宽度
      rect.height  // 节点的高度
    }).exec()
  },
  getAllRects () {
    qa.createSelectorQuery().selectAll('.a-class').boundingClientRect(function(rects){
      rects.forEach(function(rect){
        rect.id      // 节点的ID
        rect.dataset // 节点的dataset
        rect.left    // 节点的左边界坐标
        rect.right   // 节点的右边界坐标
        rect.top     // 节点的上边界坐标
        rect.bottom  // 节点的下边界坐标
        rect.width   // 节点的宽度
        rect.height  // 节点的高度
      })
    }).exec()
  }
})
``` */
    boundingClientRect(
      /** 回调函数，在执行 `SelectorQuery.exec` 方法后，节点信息会在 `callback` 中返回。 */
      callback?: BoundingClientRectCallback,
    ): SelectorQuery;
    /** [[SelectorQuery]()
*
* 添加节点的 Context 对象查询请求。目前支持 `VideoContext`、`CanvasContext` 和 `MapContext` 的获取。
*
* **示例代码**
*
*
* ```js
Page({
  getContext () {
    qa.createSelectorQuery().select('.the-video-class').context(function(res){
      console.log(res.context) // 节点对应的 Context 对象。如：选中的节点是 <video> 组件，那么此处即返回 VideoContext 对象
    }).exec()
  }
})
```
*
**/
    context(
      /** 回调函数，在执行 `SelectorQuery.exec` 方法后，返回节点信息。 */
      callback?: ContextCallback,
    ): SelectorQuery;
    /** [[SelectorQuery]()
*
* 添加节点的滚动位置查询请求。以像素为单位。节点必须是 `scroll-view` 或者 `viewport`，返回 `NodesRef` 对应的 `SelectorQuery`。
*
* **示例代码**
*
*
* ```js
Page({
  getScrollOffset () {
    qa.createSelectorQuery().selectViewport().scrollOffset(function(res){
      res.id      // 节点的ID
      res.dataset // 节点的dataset
      res.scrollLeft // 节点的水平滚动位置
      res.scrollTop  // 节点的竖直滚动位置
    }).exec()
  }
})
``` */
    scrollOffset(
      /** 回调函数，在执行 `SelectorQuery.exec` 方法后，节点信息会在 `callback` 中返回。 */
      callback?: ScrollOffsetCallback,
    ): SelectorQuery;
  }
  interface RecorderManager {
    /** 
     *
     * 监听录音错误事件 */
    onError(
      /** 录音错误事件的回调函数 */
      callback: RecorderManagerOnErrorCallback,
    ): void;
    /** 
     *
     * 监听录音暂停事件（只支持Android 7.0及以上设备） */
    onPause(
      /** 录音暂停事件的回调函数 */
      callback: RecorderManagerOnPauseCallback,
    ): void;
    /** 
     *
     * 监听录音继续事件（只支持Android 7.0及以上设备） */
    onResume(
      /** 录音继续事件的回调函数 */
      callback: OnResumeCallback,
    ): void;
    /** 
     *
     * 监听录音开始事件 */
    onStart(
      /** 录音开始事件的回调函数 */
      callback: OnStartCallback,
    ): void;
    /** 
     *
     * 监听录音结束事件 */
    onStop(
      /** 录音结束事件的回调函数 */
      callback: RecorderManagerOnStopCallback,
    ): void;
    /** 
     *
     * 暂停录音 */
    pause(): void;
    /** 
     *
     * 继续录音 */
    resume(): void;
    /** 
     *
     * 开始录音
     *
     * **采样率与编码码率限制**
     *
     *
     *  每种采样率有对应的编码码率范围有效值，设置不合法的采样率或编码码率会导致录音失败，具体对应关系如下表。
     *
     * | 采样率 | 编码码率       |
     * | ------ | -------------- |
     * | 8000   | 16000 ~ 48000  |
     * | 16000  | 24000 ~ 96000  |
     * | 44100  | 64000 ~ 320000 | */
    start(option: RecorderManagerStartOption): void;
    /** 
     *
     * 停止录音 */
    stop(): void;
  }
  interface RequestTask {
    /** 
     *
     * 中断请求任务
     *
     **/
    abort(): void;
  }
  interface SelectorQuery {
    /** [[NodesRef]()
     *
     * 执行所有的请求。请求结果按请求次序构成数组，在callback的第一个参数中返回。 */
    exec(
      /** 回调函数 */
      callback?: Function,
    ): NodesRef;
    /** [[NodesRef]()
     *
     * 在当前页面下选择第一个匹配选择器 `selector` 的节点。返回一个 `NodesRef` 对象实例，可以用于获取节点信息。
     *
     * **selector 语法**
     *
     *
     * selector类似于 CSS 的选择器，但仅支持下列语法。
     *
     * - ID选择器：#the-id
     * - class选择器（可以连续指定多个）：.a-class.another-class
     * - 子元素选择器：.the-parent > .the-child
     * - 后代选择器：.the-ancestor .the-descendant
     * - 跨自定义组件的后代选择器：.the-ancestor >>> .the-descendant
     * - 多选择器的并集：#a-node, .some-other-nodes */
    select(
      /** 选择器 */
      selector: string,
    ): NodesRef;
    /** [[NodesRef]()
     *
     * 在当前页面下选择匹配选择器 selector 的所有节点。
     *
     * **selector 语法**
     *
     *
     * selector类似于 CSS 的选择器，但仅支持下列语法。
     *
     * - ID选择器：#the-id
     * - class选择器（可以连续指定多个）：.a-class.another-class
     * - 子元素选择器：.the-parent > .the-child
     * - 后代选择器：.the-ancestor .the-descendant
     * - 跨自定义组件的后代选择器：.the-ancestor >>> .the-descendant
     * - 多选择器的并集：#a-node, .some-other-nodes */
    selectAll(
      /** 选择器 */
      selector: string,
    ): NodesRef;
    /** [[NodesRef]()
     *
     * 选择显示区域。可用于获取显示区域的尺寸、滚动位置等信息。 */
    selectViewport(): NodesRef;
    /** [[SelectorQuery]()
*
* 将选择器的选取范围更改为自定义组件 `component` 内。（初始时，选择器仅选取页面范围的节点，不会选取任何自定义组件中的节点）。
*
* **示例代码**
*
*
* ```js
Component({
  queryMultipleNodes (){
    const query = qa.createSelectorQuery().in(this)
    query.select('#the-id').boundingClientRect(function(res){
      res.top // 这个组件内 #the-id 节点的上边界坐标
    }).exec()
  }
})
```
*
**/
    in(
      /** 自定义组件实例 */
      component: any,
    ): SelectorQuery;
  }
  interface SocketTask {
    /** 
     *
     * 关闭 WebSocket 连接 */
    close(option: CloseOption): void;
    /** 
     *
     * 监听 WebSocket 连接关闭事件 */
    onClose(
      /** WebSocket 连接关闭事件的回调函数 */
      callback: OnCloseCallback,
    ): void;
    /** 
     *
     * 监听 WebSocket 错误事件 */
    onError(
      /** WebSocket 错误事件的回调函数 */
      callback: SocketTaskOnErrorCallback,
    ): void;
    /** 
     *
     * 监听 WebSocket 接受到服务器的消息事件 */
    onMessage(
      /** WebSocket 接受到服务器的消息事件的回调函数 */
      callback: SocketTaskOnMessageCallback,
    ): void;
    /** 
     *
     * 监听 WebSocket 连接打开事件 */
    onOpen(
      /** WebSocket 连接打开事件的回调函数 */
      callback: OnOpenCallback,
    ): void;
    /** 
     *
     * 通过 WebSocket 连接发送数据 */
    send(option: SendOption): void;
  }
  interface UploadTask {
    /** 
     *
     * 中断上传任务
     *
     **/
    abort(): void;
    /** 
     *
     * 取消监听上传进度变化事件
     *
     **/
    offProgressUpdate(
      /** 上传进度变化事件的回调函数 */
      callback: UploadTaskOffProgressUpdateCallback,
    ): void;
    /** 
     *
     * 监听上传进度变化事件
     *
     **/
    onProgressUpdate(
      /** 上传进度变化事件的回调函数 */
      callback: UploadTaskOnProgressUpdateCallback,
    ): void;
  }
  interface VideoContext {
    /** 
     *
     * 退出全屏
     *
     **/
    exitFullScreen(): void;
    /** 
     *
     * 暂停视频 */
    pause(): void;
    /** 
     *
     * 播放视频 */
    play(): void;
    /** 
     *
     * 进入全屏
     *
     **/
    requestFullScreen(option: VideoContextRequestFullScreenOption): void;
    /** 
     *
     * 跳转到指定位置 */
    seek(
      /** 跳转到的位置，单位 s */
      position: number,
    ): void;
    /** 
     *
     * 停止视频
     *
     **/
    stop(): void;
  }
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type AccessCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type AccessFailCallback = (result: AccessFailCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type AccessSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type AddPhoneContactCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type AddPhoneContactFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type AddPhoneContactSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type AppendFileCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type AppendFileFailCallback = (result: AppendFileFailCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type AppendFileSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type AuthorizeCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type AuthorizeFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type AuthorizeSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 背景音频进入可播放状态事件的回调函数 */
  type BackgroundAudioManagerOnCanplayCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 背景音频自然播放结束事件的回调函数 */
  type BackgroundAudioManagerOnEndedCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 背景音频播放错误事件的回调函数 */
  type BackgroundAudioManagerOnErrorCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 背景音频暂停事件的回调函数 */
  type BackgroundAudioManagerOnPauseCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 背景音频播放事件的回调函数 */
  type BackgroundAudioManagerOnPlayCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 背景音频完成跳转操作事件的回调函数 */
  type BackgroundAudioManagerOnSeekedCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 背景音频开始跳转操作事件的回调函数 */
  type BackgroundAudioManagerOnSeekingCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 背景音频停止事件的回调函数 */
  type BackgroundAudioManagerOnStopCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 背景音频播放进度更新事件的回调函数 */
  type BackgroundAudioManagerOnTimeUpdateCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 音频加载中事件的回调函数 */
  type BackgroundAudioManagerOnWaitingCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 回调函数，在执行 `SelectorQuery.exec` 方法后，节点信息会在 `callback` 中返回。 */
  type BoundingClientRectCallback = (
    result: BoundingClientRectCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type CanvasGetImageDataCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type CanvasGetImageDataFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type CanvasGetImageDataSuccessCallback = (
    result: CanvasGetImageDataSuccessCallbackResult,
    /** 图像像素点数据，一维数组，每四项表示一个像素点的 rgba */
    data: Uint8ClampedArray,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type CanvasPutImageDataCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type CanvasPutImageDataFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type CanvasPutImageDataSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type ChooseImageCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type ChooseImageFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type ChooseImageSuccessCallback = (
    result: ChooseImageSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type ChooseLocationCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type ChooseLocationFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type ChooseLocationSuccessCallback = (
    result: ChooseLocationSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type ChooseVideoCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type ChooseVideoFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type ChooseVideoSuccessCallback = (
    result: ChooseVideoSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type ClearStorageCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type ClearStorageFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type ClearStorageSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type CloseBLEConnectionCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type CloseBLEConnectionFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type CloseBLEConnectionSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type CloseBluetoothAdapterCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type CloseBluetoothAdapterFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type CloseBluetoothAdapterSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type CloseCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type CloseFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type CloseSocketCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type CloseSocketFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type CloseSocketSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type CloseSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type CompressImageCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type CompressImageFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type CompressImageSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type ConnectSocketCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type ConnectSocketFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type ConnectSocketSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type ConnectWifiCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type ConnectWifiFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type ConnectWifiSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 回调函数，在执行 `SelectorQuery.exec` 方法后，返回节点信息。 */
  type ContextCallback = (result: ContextCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type CopyFileCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type CopyFileFailCallback = (result: CopyFileFailCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type CopyFileSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type CreateBLEConnectionCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type CreateBLEConnectionFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type CreateBLEConnectionSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type DownloadFileCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type DownloadFileFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type DownloadFileSuccessCallback = (
    result: DownloadFileSuccessCallbackResult,
  ) => void;
  /** HTTP Response Header 事件的回调函数 */
  type DownloadTaskOffHeadersReceivedCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 下载进度变化事件的回调函数 */
  type DownloadTaskOffProgressUpdateCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** HTTP Response Header 事件的回调函数 */
  type DownloadTaskOnHeadersReceivedCallback = (
    result: DownloadTaskOnHeadersReceivedCallbackResult,
  ) => void;
  /** 下载进度变化事件的回调函数 */
  type DownloadTaskOnProgressUpdateCallback = (
    result: DownloadTaskOnProgressUpdateCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type ExitFullScreenCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type ExitFullScreenFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type ExitFullScreenSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type GetBLEDeviceCharacteristicsCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type GetBLEDeviceCharacteristicsFailCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用成功的回调函数 */
  type GetBLEDeviceCharacteristicsSuccessCallback = (
    result: GetBLEDeviceCharacteristicsSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type GetBLEDeviceServicesCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type GetBLEDeviceServicesFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type GetBLEDeviceServicesSuccessCallback = (
    result: GetBLEDeviceServicesSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type GetBackgroundAudioPlayerStateCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type GetBackgroundAudioPlayerStateFailCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用成功的回调函数 */
  type GetBackgroundAudioPlayerStateSuccessCallback = (
    result: GetBackgroundAudioPlayerStateSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type GetBatteryInfoCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type GetBatteryInfoFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type GetBatteryInfoSuccessCallback = (
    result: GetBatteryInfoSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type GetBluetoothAdapterStateCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type GetBluetoothAdapterStateFailCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用成功的回调函数 */
  type GetBluetoothAdapterStateSuccessCallback = (
    result: GetBluetoothAdapterStateSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type GetBluetoothDevicesCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type GetBluetoothDevicesFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type GetBluetoothDevicesSuccessCallback = (
    result: GetBluetoothDevicesSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type GetCenterLocationCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type GetCenterLocationFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type GetCenterLocationSuccessCallback = (
    result: GetCenterLocationSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type GetClipboardDataCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type GetClipboardDataFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type GetClipboardDataSuccessCallback = (
    option: GetClipboardDataSuccessCallbackOption,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type GetConnectedBluetoothDevicesCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type GetConnectedBluetoothDevicesFailCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用成功的回调函数 */
  type GetConnectedBluetoothDevicesSuccessCallback = (
    result: GetConnectedBluetoothDevicesSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type GetConnectedWifiCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type GetConnectedWifiFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type GetConnectedWifiSuccessCallback = (
    result: GetConnectedWifiSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type GetImageInfoCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type GetImageInfoFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type GetImageInfoSuccessCallback = (
    result: GetImageInfoSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type GetLocationCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type GetLocationFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type GetLocationSuccessCallback = (
    result: GetLocationSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type GetNetworkTypeCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type GetNetworkTypeFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type GetNetworkTypeSuccessCallback = (
    result: GetNetworkTypeSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type GetRegionCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type GetRegionFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type GetRegionSuccessCallback = (
    result: GetRegionSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type GetSavedFileInfoCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type GetSavedFileInfoFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type GetSavedFileInfoSuccessCallback = (
    result: GetSavedFileInfoSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type GetScaleCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type GetScaleFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type GetScaleSuccessCallback = (
    result: GetScaleSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type GetScreenBrightnessCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type GetScreenBrightnessFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type GetScreenBrightnessSuccessCallback = (
    option: GetScreenBrightnessSuccessCallbackOption,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type GetSettingCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type GetSettingFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type GetSettingSuccessCallback = (
    result: GetSettingSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type GetStorageCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type GetStorageFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type GetStorageInfoCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type GetStorageInfoFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type GetStorageInfoSuccessCallback = (
    option: GetStorageInfoSuccessCallbackOption,
  ) => void;
  /** 接口调用成功的回调函数 */
  type GetStorageSuccessCallback = (
    result: GetStorageSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type GetSystemInfoCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type GetSystemInfoFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type GetSystemInfoSuccessCallback = (
    result: GetSystemInfoSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type GetUserInfoCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type GetUserInfoFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type GetUserInfoSuccessCallback = (
    result: GetUserInfoSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type GetWifiListCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type GetWifiListFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type GetWifiListSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type HideLoadingCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type HideLoadingFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type HideLoadingSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type HideNavigationBarLoadingCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type HideNavigationBarLoadingFailCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用成功的回调函数 */
  type HideNavigationBarLoadingSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type HideTabBarCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type HideTabBarFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type HideTabBarRedDotCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type HideTabBarRedDotFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type HideTabBarRedDotSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type HideTabBarSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type HideToastCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type HideToastFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type HideToastSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type IncludePointsCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type IncludePointsFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type IncludePointsSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 音频进入可以播放状态的事件的回调函数 */
  type InnerAudioContextOnCanplayCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 音频自然播放至结束的事件的回调函数 */
  type InnerAudioContextOnEndedCallback = (res: GeneralCallbackResult) => void;
  /** 音频播放错误事件的回调函数 */
  type InnerAudioContextOnErrorCallback = (
    result: InnerAudioContextOnErrorCallbackResult,
  ) => void;
  /** 音频暂停事件的回调函数 */
  type InnerAudioContextOnPauseCallback = (res: GeneralCallbackResult) => void;
  /** 音频播放事件的回调函数 */
  type InnerAudioContextOnPlayCallback = (res: GeneralCallbackResult) => void;
  /** 音频完成跳转操作的事件的回调函数 */
  type InnerAudioContextOnSeekedCallback = (res: GeneralCallbackResult) => void;
  /** 音频进行跳转操作的事件的回调函数 */
  type InnerAudioContextOnSeekingCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 音频停止事件的回调函数 */
  type InnerAudioContextOnStopCallback = (res: GeneralCallbackResult) => void;
  /** 音频播放进度更新事件的回调函数 */
  type InnerAudioContextOnTimeUpdateCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 音频加载中事件的回调函数 */
  type InnerAudioContextOnWaitingCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type LoadFontFaceCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type LoadFontFaceFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type LoadFontFaceSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type LoginCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type LoginFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type LoginSuccessCallback = (result: LoginSuccessCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type MakePhoneCallCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type MakePhoneCallFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type MakePhoneCallSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type MkdirCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type MkdirFailCallback = (result: MkdirFailCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type MkdirSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type MuteCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type MuteFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type MuteSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type NavigateBackCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type NavigateBackFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type NavigateBackMiniProgramCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type NavigateBackMiniProgramFailCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用成功的回调函数 */
  type NavigateBackMiniProgramSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用成功的回调函数 */
  type NavigateBackSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type NavigateToCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type NavigateToFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type NavigateToMiniProgramCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type NavigateToMiniProgramFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type NavigateToMiniProgramSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用成功的回调函数 */
  type NavigateToSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type NotifyBLECharacteristicValueChangeCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type NotifyBLECharacteristicValueChangeFailCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用成功的回调函数 */
  type NotifyBLECharacteristicValueChangeSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 监听相交状态变化的回调函数 */
  type ObserveCallback = (result: ObserveCallbackResult) => void;
  /** 快应用切后台事件的回调函数 */
  type OffAppHideCallback = (res: GeneralCallbackResult) => void;
  /** 快应用切前台事件的回调函数 */
  type OffAppShowCallback = (res: GeneralCallbackResult) => void;
  /** 音频进入可以播放状态的事件的回调函数 */
  type OffCanplayCallback = (res: GeneralCallbackResult) => void;
  /** 音频自然播放至结束的事件的回调函数 */
  type OffEndedCallback = (res: GeneralCallbackResult) => void;
  /** 音频播放错误事件的回调函数 */
  type OffErrorCallback = (res: GeneralCallbackResult) => void;
  /** 快应用要打开的页面不存在事件的回调函数 */
  type OffPageNotFoundCallback = (res: GeneralCallbackResult) => void;
  /** 音频暂停事件的回调函数 */
  type OffPauseCallback = (res: GeneralCallbackResult) => void;
  /** 音频播放事件的回调函数 */
  type OffPlayCallback = (res: GeneralCallbackResult) => void;
  /** 音频完成跳转操作的事件的回调函数 */
  type OffSeekedCallback = (res: GeneralCallbackResult) => void;
  /** 音频进行跳转操作的事件的回调函数 */
  type OffSeekingCallback = (res: GeneralCallbackResult) => void;
  /** 音频停止事件的回调函数 */
  type OffStopCallback = (res: GeneralCallbackResult) => void;
  /** 音频播放进度更新事件的回调函数 */
  type OffTimeUpdateCallback = (res: GeneralCallbackResult) => void;
  /** 音频加载中事件的回调函数 */
  type OffWaitingCallback = (res: GeneralCallbackResult) => void;
  /** 加速度数据事件的回调函数 */
  type OnAccelerometerChangeCallback = (
    result: OnAccelerometerChangeCallbackResult,
  ) => void;
  /** 快应用错误事件的回调函数 */
  type OnAppErrorCallback = (
    /** 错误信息，包含堆栈 */
    error: string,
  ) => void;
  /** 快应用切后台事件的回调函数 */
  type OnAppHideCallback = (res: GeneralCallbackResult) => void;
  /** 快应用切前台事件的回调函数 */
  type OnAppShowCallback = (result: OnAppShowCallbackResult) => void;
  /** 低功耗蓝牙设备的特征值变化事件的回调函数 */
  type OnBLECharacteristicValueChangeCallback = (
    result: OnBLECharacteristicValueChangeCallbackResult,
  ) => void;
  /** 低功耗蓝牙连接状态的改变事件的回调函数 */
  type OnBLEConnectionStateChangeCallback = (
    result: OnBLEConnectionStateChangeCallbackResult,
  ) => void;
  /** 音乐暂停事件的回调函数 */
  type OnBackgroundAudioPauseCallback = (res: GeneralCallbackResult) => void;
  /** 音乐播放事件的回调函数 */
  type OnBackgroundAudioPlayCallback = (res: GeneralCallbackResult) => void;
  /** 音乐停止事件的回调函数 */
  type OnBackgroundAudioStopCallback = (res: GeneralCallbackResult) => void;
  /** 蓝牙适配器状态变化事件的回调函数 */
  type OnBluetoothAdapterStateChangeCallback = (
    result: OnBluetoothAdapterStateChangeCallbackResult,
  ) => void;
  /** 寻找到新设备的事件的回调函数 */
  type OnBluetoothDeviceFoundCallback = (
    result: OnBluetoothDeviceFoundCallbackResult,
  ) => void;
  /** WebSocket 连接关闭事件的回调函数 */
  type OnCloseCallback = (res: GeneralCallbackResult) => void;
  /** 罗盘数据变化事件的回调函数 */
  type OnCompassChangeCallback = (
    result: OnCompassChangeCallbackResult,
  ) => void;
  /** 设备方向变化事件的回调函数 */
  type OnDeviceMotionChangeCallback = (
    result: OnDeviceMotionChangeCallbackResult,
  ) => void;
  /** 已录制完指定帧大小的文件事件的回调函数 */
  type OnFrameRecordedCallback = (
    result: OnFrameRecordedCallbackResult,
  ) => void;
  /** 获取到 Wi-Fi 列表数据事件的回调函数 */
  type OnGetWifiListCallback = (result: OnGetWifiListCallbackResult) => void;
  /** 陀螺仪数据变化事件的回调函数 */
  type OnGyroscopeChangeCallback = (
    result: OnGyroscopeChangeCallbackResult,
  ) => void;
  /** 录音因为受到系统占用而被中断开始事件的回调函数 */
  type OnInterruptionBeginCallback = (res: GeneralCallbackResult) => void;
  /** 录音中断结束事件的回调函数 */
  type OnInterruptionEndCallback = (res: GeneralCallbackResult) => void;
  /** 内存不足告警事件的回调函数 */
  type OnMemoryWarningCallback = (
    result: OnMemoryWarningCallbackResult,
  ) => void;
  /** 网络状态变化事件的回调函数 */
  type OnNetworkStatusChangeCallback = (
    result: OnNetworkStatusChangeCallbackResult,
  ) => void;
  /** WebSocket 连接打开事件的回调函数 */
  type OnOpenCallback = (result: OnOpenCallbackResult) => void;
  /** 快应用要打开的页面不存在事件的回调函数 */
  type OnPageNotFoundCallback = (res: OnPageNotFoundResult) => void;
  /** 录音继续事件的回调函数 */
  type OnResumeCallback = (res: GeneralCallbackResult) => void;
  /** WebSocket 连接关闭事件的回调函数 */
  type OnSocketCloseCallback = (res: GeneralCallbackResult) => void;
  /** WebSocket 错误事件的回调函数 */
  type OnSocketErrorCallback = (res: GeneralCallbackResult) => void;
  /** WebSocket 接受到服务器的消息事件的回调函数 */
  type OnSocketMessageCallback = (
    result: OnSocketMessageCallbackResult,
  ) => void;
  /** WebSocket 连接打开事件的回调函数 */
  type OnSocketOpenCallback = (result: OnSocketOpenCallbackResult) => void;
  /** 录音开始事件的回调函数 */
  type OnStartCallback = (res: GeneralCallbackResult) => void;
  /** 快应用更新失败事件的回调函数 */
  type OnUpdateFailedCallback = (res: GeneralCallbackResult) => void;
  /** 快应用有版本更新事件的回调函数 */
  type OnUpdateReadyCallback = (res: GeneralCallbackResult) => void;
  /** 用户主动截屏事件的回调函数 */
  type OnUserCaptureScreenCallback = (res: GeneralCallbackResult) => void;
  /** 连接上 Wi-Fi 的事件的回调函数 */
  type OnWifiConnectedCallback = (
    result: OnWifiConnectedCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type OpenBluetoothAdapterCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type OpenBluetoothAdapterFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type OpenBluetoothAdapterSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type OpenDocumentCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type OpenDocumentFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type OpenDocumentSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type OpenLocationCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type OpenLocationFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type OpenLocationSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type PageScrollToCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type PageScrollToFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type PageScrollToSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type PauseBGMCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type PauseBGMFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type PauseBGMSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type PauseBackgroundAudioCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type PauseBackgroundAudioFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type PauseBackgroundAudioSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type PlayBGMCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type PlayBGMFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type PlayBGMSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type PlayBackgroundAudioCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type PlayBackgroundAudioFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type PlayBackgroundAudioSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type PlayCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type PlayFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type PlaySuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type PreviewImageCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type PreviewImageFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type PreviewImageSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type ReLaunchCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type ReLaunchFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type ReLaunchSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type ReadBLECharacteristicValueCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type ReadBLECharacteristicValueFailCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用成功的回调函数 */
  type ReadBLECharacteristicValueSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type ReadFileCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type ReadFileFailCallback = (result: ReadFileFailCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type ReadFileSuccessCallback = (
    result: ReadFileSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type ReaddirCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type ReaddirFailCallback = (result: ReaddirFailCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type ReaddirSuccessCallback = (result: ReaddirSuccessCallbackResult) => void;
  /** 录音错误事件的回调函数 */
  type RecorderManagerOnErrorCallback = (
    result: RecorderManagerOnErrorCallbackResult,
  ) => void;
  /** 录音暂停事件的回调函数 */
  type RecorderManagerOnPauseCallback = (res: GeneralCallbackResult) => void;
  /** 录音结束事件的回调函数 */
  type RecorderManagerOnStopCallback = (result: OnStopCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type RedirectToCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type RedirectToFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type RedirectToSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type RemoveStorageCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type RemoveStorageFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type RemoveStorageSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type RemoveTabBarBadgeCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type RemoveTabBarBadgeFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type RemoveTabBarBadgeSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type RenameCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type RenameFailCallback = (result: RenameFailCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type RenameSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type RequestCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type RequestFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type RequestFullScreenCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type RequestFullScreenFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type RequestFullScreenSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type RequestSuccessCallback = (result: RequestSuccessCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type ResumeBGMCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type ResumeBGMFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type ResumeBGMSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type RmdirCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type RmdirFailCallback = (result: RmdirFailCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type RmdirSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SaveImageToPhotosAlbumCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type SaveImageToPhotosAlbumFailCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用成功的回调函数 */
  type SaveImageToPhotosAlbumSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SaveVideoToPhotosAlbumCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type SaveVideoToPhotosAlbumFailCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用成功的回调函数 */
  type SaveVideoToPhotosAlbumSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type ScanCodeCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type ScanCodeFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type ScanCodeSuccessCallback = (
    result: ScanCodeSuccessCallbackResult,
  ) => void;
  /** 回调函数，在执行 `SelectorQuery.exec` 方法后，节点信息会在 `callback` 中返回。 */
  type ScrollOffsetCallback = (result: ScrollOffsetCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SeekBackgroundAudioCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type SeekBackgroundAudioFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type SeekBackgroundAudioSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SendCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type SendFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SendSocketMessageCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type SendSocketMessageFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type SendSocketMessageSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type SendSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SetBGMVolumeCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type SetBGMVolumeFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type SetBGMVolumeSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SetBackgroundColorCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type SetBackgroundColorFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type SetBackgroundColorSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SetBackgroundTextStyleCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type SetBackgroundTextStyleFailCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用成功的回调函数 */
  type SetBackgroundTextStyleSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SetClipboardDataCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type SetClipboardDataFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type SetClipboardDataSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SetEnableDebugCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type SetEnableDebugFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type SetEnableDebugSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SetInnerAudioOptionCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type SetInnerAudioOptionFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type SetInnerAudioOptionSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SetKeepScreenOnCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type SetKeepScreenOnFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type SetKeepScreenOnSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SetNavigationBarColorCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type SetNavigationBarColorFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type SetNavigationBarColorSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SetNavigationBarTitleCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type SetNavigationBarTitleFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type SetNavigationBarTitleSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SetScreenBrightnessCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type SetScreenBrightnessFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type SetScreenBrightnessSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SetStorageCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type SetStorageFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type SetStorageSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SetTabBarBadgeCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type SetTabBarBadgeFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type SetTabBarBadgeSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SetTabBarItemCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type SetTabBarItemFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type SetTabBarItemSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SetTabBarStyleCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type SetTabBarStyleFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type SetTabBarStyleSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SetTopBarTextCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type SetTopBarTextFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type SetTopBarTextSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SetWifiListCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type SetWifiListFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type SetWifiListSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type ShowActionSheetCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type ShowActionSheetFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type ShowActionSheetSuccessCallback = (
    result: ShowActionSheetSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type ShowLoadingCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type ShowLoadingFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type ShowLoadingSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type ShowModalCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type ShowModalFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type ShowModalSuccessCallback = (
    result: ShowModalSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type ShowNavigationBarLoadingCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type ShowNavigationBarLoadingFailCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用成功的回调函数 */
  type ShowNavigationBarLoadingSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type ShowTabBarCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type ShowTabBarFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type ShowTabBarRedDotCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type ShowTabBarRedDotFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type ShowTabBarRedDotSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type ShowTabBarSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type ShowToastCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type ShowToastFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type ShowToastSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 创建桌面图标，接口调用结束的回调函数（调用成功、失败都会执行） */
  type InstallShortcutCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 创建桌面图标，接口调用失败的回调函数 */
  type InstallShortcutFailCallback = (res: GeneralCallbackResult) => void;
  /** 创建桌面图标，接口调用成功的回调函数 */
  type InstallShortcutSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 获取桌面图标是否创建，接口调用结束的回调函数（调用成功、失败都会执行） */
  type HasInstallShortcutCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 获取桌面图标是否创建，接口调用失败的回调函数 */
  type HasInstallShortcutFailCallback = (res: GeneralCallbackResult) => void;
  /** 获取桌面图标是否创建，接口调用成功的回调函数 */
  type HasInstallShortcutSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SnapshotCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type SnapshotFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type SnapshotSuccessCallback = (res: GeneralCallbackResult) => void;
  /** WebSocket 错误事件的回调函数 */
  type SocketTaskOnErrorCallback = (
    result: SocketTaskOnErrorCallbackResult,
  ) => void;
  /** WebSocket 接受到服务器的消息事件的回调函数 */
  type SocketTaskOnMessageCallback = (
    result: SocketTaskOnMessageCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type StartAccelerometerCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type StartAccelerometerFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type StartAccelerometerSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type StartBeaconDiscoveryCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type StartBeaconDiscoveryFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type StartBeaconDiscoverySuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type StartBluetoothDevicesDiscoveryCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type StartBluetoothDevicesDiscoveryFailCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用成功的回调函数 */
  type StartBluetoothDevicesDiscoverySuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type StartCompassCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type StartCompassFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type StartCompassSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type StartCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type StartDeviceMotionListeningCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type StartDeviceMotionListeningFailCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用成功的回调函数 */
  type StartDeviceMotionListeningSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type StartFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type StartGyroscopeCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type StartGyroscopeFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type StartGyroscopeSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type StartPullDownRefreshCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type StartPullDownRefreshFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type StartPullDownRefreshSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 超过30s或页面 `onHide` 时会结束录像 */
  type StartRecordTimeoutCallback = (
    result: StartRecordTimeoutCallbackResult,
  ) => void;
  /** 接口调用成功的回调函数 */
  type StartSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type StartWifiCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type StartWifiFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type StartWifiSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type StatCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type StatFailCallback = (result: StatFailCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type StatSuccessCallback = (result: StatSuccessCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type StopAccelerometerCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type StopAccelerometerFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type StopAccelerometerSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type StopBGMCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type StopBGMFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type StopBGMSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type StopBackgroundAudioCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type StopBackgroundAudioFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type StopBackgroundAudioSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type StopBluetoothDevicesDiscoveryCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type StopBluetoothDevicesDiscoveryFailCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用成功的回调函数 */
  type StopBluetoothDevicesDiscoverySuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type StopCompassCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type StopCompassFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type StopCompassSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type StopDeviceMotionListeningCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type StopDeviceMotionListeningFailCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用成功的回调函数 */
  type StopDeviceMotionListeningSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type StopGyroscopeCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type StopGyroscopeFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type StopGyroscopeSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type StopPullDownRefreshCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type StopPullDownRefreshFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type StopPullDownRefreshSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type StopRecordCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type StopRecordFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type StopRecordSuccessCallback = (
    result: StopRecordSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type StopWifiCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type StopWifiFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type StopWifiSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SwitchCameraCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type SwitchCameraFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type SwitchCameraSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type SwitchTabCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type SwitchTabFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type SwitchTabSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type TakePhotoCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type TakePhotoFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type TakePhotoSuccessCallback = (
    result: TakePhotoSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type ToggleTorchCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type ToggleTorchFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type ToggleTorchSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type TranslateMarkerCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type TranslateMarkerFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type TranslateMarkerSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type UnlinkCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type UnlinkFailCallback = (result: UnlinkFailCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type UnlinkSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type UnzipCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type UnzipFailCallback = (result: UnzipFailCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type UnzipSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type UploadFileCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type UploadFileFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type UploadFileSuccessCallback = (
    result: UploadFileSuccessCallbackResult,
  ) => void;
  /** 上传进度变化事件的回调函数 */
  type UploadTaskOffProgressUpdateCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 上传进度变化事件的回调函数 */
  type UploadTaskOnProgressUpdateCallback = (
    result: UploadTaskOnProgressUpdateCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type VibrateLongCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type VibrateLongFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type VibrateLongSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type VibrateShortCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type VibrateShortFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type VibrateShortSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type WriteBLECharacteristicValueCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type WriteBLECharacteristicValueFailCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用成功的回调函数 */
  type WriteBLECharacteristicValueSuccessCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type WriteFileCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type WriteFileFailCallback = (result: WriteFileFailCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type WriteFileSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type QaGetFileInfoCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type QaGetFileInfoFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type QaGetFileInfoSuccessCallback = (
    result: QaGetFileInfoSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type QaGetSavedFileListCompleteCallback = (
    res: GeneralCallbackResult,
  ) => void;
  /** 接口调用失败的回调函数 */
  type QaGetSavedFileListFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type QaGetSavedFileListSuccessCallback = (
    result: QaGetSavedFileListSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type QaRemoveSavedFileCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type QaRemoveSavedFileFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type QaRemoveSavedFileSuccessCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type QaSaveFileCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type QaSaveFileFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type QaSaveFileSuccessCallback = (
    result: QaSaveFileSuccessCallbackResult,
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type QaStartRecordCompleteCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用失败的回调函数 */
  type QaStartRecordFailCallback = (res: GeneralCallbackResult) => void;
  /** 接口调用成功的回调函数 */
  type QaStartRecordSuccessCallback = (
    result: StartRecordSuccessCallbackResult,
  ) => void;

  // #end-region interfaces
}
