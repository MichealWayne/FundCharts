# FundCharts（1.0） 轻量数据可视化

<a href="http://blog.michealwayne.cn/FundCharts/docs/">
	<img style="width: 100%" src="http://blog.michealwayne.cn/images/fundchartspics/bg.png"/>
</a>

**[文档>>](http://blog.michealwayne.cn/FundCharts/docs/)**

轻量级canvas数据可视化组件库，可在web端/小程序端/服务端nodjes运行。核心原则：**轻量**，**只注重图形**。
目前包含折线图、面积图、饼图、柱状图、雷达图（蜘蛛图）、雷达图、散点图、K线图。（codepen demo：[https://codepen.io/michealwayne/](https://codepen.io/michealwayne/)）


> 注：对于有一定canvas开发经验的人员来说，通过[实例的再次绘制](#实例的再次绘制)可以完全实现特殊的可视化定制化效果。

### 向导
- [开始](http://blog.michealwayne.cn/FundCharts/docs/guide/)
- [图形](http://blog.michealwayne.cn/FundCharts/docs/graphs/)
    - [折线图/面积图](http://blog.michealwayne.cn/FundCharts/docs/graphs/#折线图-面积图：line)
    - [饼图/环形图](http://blog.michealwayne.cn/FundCharts/docs/graphs/#饼图-环形图：pie)
    - [柱状图](http://blog.michealwayne.cn/FundCharts/docs/graphs/#柱状图：bar)
    - [雷达图/蜘蛛图](http://blog.michealwayne.cn/FundCharts/docs/graphs/#雷达图（蜘蛛图）：radar)
    - [散点图](http://blog.michealwayne.cn/FundCharts/docs/graphs/#散点图：scatter)
	- [K线图](http://blog.michealwayne.cn/FundCharts/docs/graphs/#k线图：kline)
- [二次绘制](http://blog.michealwayne.cn/FundCharts/docs/twiceDraw/)
- [小程序](http://blog.michealwayne.cn/FundCharts/docs/weapp/)
- [nodejs服务端](http://blog.michealwayne.cn/FundCharts/docs/nodejs/)



### 目录结构

```
FundCharts
├─dist    FundCharts，供demo测试使用
│   ├─BarChart.js     柱状图
│   ├─KlineChart.js   K线图
│   ├─LineChart.js    折线图/面积图		  
│   ├─PieChart.js     饼图/环形图
│   ├─RadarChart.js   雷达图（蜘蛛图）
│   └─ScatterChart.js 散点图
├─demo    使用案例
├─docs    文档
├─FundCharts.min.js   FundCharts，web/weapp端使用库
└─FundCharts-node.js  FundCharts，nodejs端使用库

```

### 特性
- **重图形**：只注重图形的可视化实现，画布以及换算提供全面接口供二次绘制。
- **轻量级**：体积小无依赖，全量直接引用仅31k，开启gzip仅9.3k；按需引用打包更小。
- **兼容好**：小程序端；web Android4及以上，ios7及以上；nodejs8.0及以上。

兼容：
### browser
- ios7及以上
- android 4及以上

> 注：与Vue、React、Angular等框架无冲突。

### weapp
- 兼容

### server
- nodejs v8.0+

## 更新信息
- 2019.06.20：增加k线图；增加小程序动画；修复柱状图xaxis bug；开放x/y轴文案处理函数（handleTextX/handleTextY）；
- 2019.06.10：修复部分bug(折线图/柱状图单点数据)；
- 2019.05.05：增加散点图；新增图形区域控制、动画执行回调等参数控制；
- 2019.04.16：增加雷达图（蜘蛛图）；柱状图修复负值控制；取消线性动画函数选择；
- 2019.04.08：折线图增加粗细控制、虚线可选等参数设置；画布背景色可设置；
- 2019.03.15：新增小程序端/nodejs服务端支持；

## 使用
[文档-FundCharts的安装和使用](http://blog.michealwayne.cn/FundCharts/docs/guide/#安装和使用)

## 图形配置
[文档-FundCharts图形及配置](http://blog.michealwayne.cn/FundCharts/docs/graphs/#折线图-面积图：line)

## 启动查看测试demo
[github-demos](./demos/)


## 其他

### 默认颜色组
```
'#fe5d4e',  // 红
'#43c2f7',   // 蓝
'#707ad9',   // 深蓝
'#ffa61b',   // 橙
'#64d290',   // 青
'#cf27bd'    // 紫  
```

![colorArray](http://blog.michealwayne.cn/images/fundchartspics/colors.png)



- 反馈：[michealwayne@163.com](mailto:michealwayne@163.com)