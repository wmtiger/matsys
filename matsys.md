碰到的问题

## AXIOS相关
axios在使用了create方法后
``` bash
const AX = axios.create({
  baseURL: process.env.BASE_API,
  url: '',
  timeout: 3000,
  method: 'post',
  responseType: 'arraybuffer'
})
```
其中method属性不生效，不知道是不是bug还是我哪里设置有问题，要在外面使用的时候，显式调用;
在baseURL上，在config中配置，这样可以通过webpack自动修改内外网的调用地址
``` bash
ax({
    method: 'post',
    data: {action: 10, strValues: [nickName, password]}
  })
```

## 调用外部第三方js的方法
``` bash
<html>
  <head>
    <meta charset="utf-8">
    <title>test</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
    <script src="./static/protobuf.js"></script>
    <script src="./static/bytebuffer.js"></script>
    <script src="./static/long.js"></script>
  </body>
</html>
```
在index.html中引入第三方js，然后在webpack.base.conf.js中设置 externals
``` bash
module.exports = {
  externals: {
    // 这里要注意，这个是第三方js的全局导出名，可以在开发者调试工具中
    // 输入: window. 来查看，到底引入的js是什么导出名
    'dcodeIO': 'dcodeIO',
  },
  ...
}
```

## protobufjs ver6.x.x 相关
在使用protobufjs新版的时候，注意加载解析proto文件的方法
``` bash
import pbjs from 'protobufjs'
var MessageVO
pbjs.load('../../static/protos/MessageVO.proto', (err, root) => {
  if (err) throw err
  MessageVO = root.lookupType('com.gameabc.bfc.model.bto.MessageVO')
})
```
在使用Long类型的时候，要注意fromNumber使用
``` bash
let a = pbjs.util.LongBits.fromNumber(222222222222222)
console.log(a, a.toNumber())
```