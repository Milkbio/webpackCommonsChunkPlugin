# webpackCommonsChunkPlugin用法测试

entry中可以包含公共模块，比如entry1 、entry2共同依赖的第三方库jquery，
此时plugins可以加入以下：
```
new webpack.optimize.CommonsChunkPlugin({
    name: ['vendor', 'runtime'],
    minChunks: Infinity
}),
new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    chunks: ['index', 'result']
})
```
1. minChunks默认值是2，当entry数量大于等于3时Infinity生效，此时可以把
jquery打包到vendor，webpack运行文件打包到runtime

2. chunks属性声明从哪几个入口文件中提取公共模块，一般是自定义公共模块，
如上可以从index result中把双方都依赖的自定义common公共模块打包到common.js中


### 以下为测试CommonsChunkPlugin所经历的步骤

A:
1.入口文件只有两个入口index result

2.plugins里只有CommonsChunkPlugin({name: 'common'})

3.此时打包后有3个js，其中index result里只有各自原来的内容，外面包裹一层function，
  而common里面是自执行函数，函数参数是modules，函数体里实现了webpackJsonp，传入的参数是个数组，数组里
  是一个function，function里面包含了common原来的内容
  (function(modules){
	一个webpackJsonp函数实现等
  })([(function(){...common原来的内容})])

B:
1.入口文件还是只有只有两个入口index result

2.此时plugins加CommonsChunkPlugin({name: 'manifest'})

3.打包后有4个js，common index result manifest，其中common index result里只有原来的内容，manifest是运行时