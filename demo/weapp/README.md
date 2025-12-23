# FundCharts 小程序 demo

## 测试

\*注意，先拷 FundCharts.min.js 库再进行测试。

目录说明：

- line：折线图/面积图
- bar：柱状图
- pie：饼图/环形图
- radar：雷达图
- scatter：散点图
- kline：k 线图
- combo：组合图
- sankey：桑基图

在小程序 app.json 页面表中注册各 demo 页面，跳转即可查看 demo。
如：

```json
// app.json
{
  "pages": ["pages/line/index"]
  // ...
}
```

## 注意

除触控事件需节点绑定，配置时需传入 width/height，其他使用及配置方式同 web 端。
