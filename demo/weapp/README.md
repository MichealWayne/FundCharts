# FundCharts 小程序测试

## 测试
*先拷FundCharts.min.js再进行测试。

目录说明：
- line：折线图/面积图
- bar：柱状图
- pie：饼图/环形图
- radar：雷达图
- scatter：散点图
- kline：k线图


在小程序app.json页面表中注册各demo页面，跳转即可查看demo。
如：
``` json
// app.json
{
  "pages":[
    "pages/line/index"
  ]
  ...
}
```


## 注意
除触控事件需节点绑定，其他使用及配置方式同web端。