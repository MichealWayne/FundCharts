# FundChartsJS 轻量数据可视化库

<a href="http://blog.michealwayne.cn/FundCharts/docs/">
  <img style="width: 100%" src="https://blog.michealwayne.cn/images/fundchartspics/bg.png"/>
</a>

<p>
  <a href="https://www.npmjs.com/package/fundcharts" rel="nofollow"><img src="https://blog.michealwayne.cn/FundCharts/docs/assets/img/npm.91127fd2.svg" alt="npm package" data-canonical-src="./images/npm.svg" style="max-width:100%;"></a>
</p>

轻量级 canvas 数据可视化组件库，可在 web 端/小程序端/服务端 nodjes 运行。核心原则：**轻量**，**只注重图形**。
目前包含折线图、面积图、饼图、柱状图、雷达图（蜘蛛图）、雷达图、桑基图、散点图、K 线图，开放图形组合接口。

> 注：对于有 canvas 开发基础经验的人员来说，通过[实例的再次绘制](https://blog.michealwayne.cn/FundCharts/docs/twiceDraw/#%E4%BA%8C%E6%AC%A1%E7%BB%98%E5%88%B6)可以完全实现特殊的可视化定制效果。

## 文档

- **[使用文档>>](http://blog.michealwayne.cn/FundCharts/docs/)**；
- [English/npm](https://www.npmjs.com/package/fundcharts)
- codepen demo：[https://codepen.io/michealwayne/](https://codepen.io/michealwayne/)

### 工程说明

- 工程启动、调试等见[工程说明>>](./PROJECT_GUIDE.md)（使用 pnpm）

### 使用

- [开始](http://blog.michealwayne.cn/FundCharts/docs/guide/)
- [图形绘制](http://blog.michealwayne.cn/FundCharts/docs/graphs/)
  - [折线图/面积图](http://blog.michealwayne.cn/FundCharts/docs/graphs/#折线图-面积图：line)
  - [饼图/环形图](http://blog.michealwayne.cn/FundCharts/docs/graphs/#饼图-环形图：pie)
  - [柱状图](http://blog.michealwayne.cn/FundCharts/docs/graphs/#柱状图：bar)
  - [雷达图/蜘蛛图](http://blog.michealwayne.cn/FundCharts/docs/graphs/#雷达图（蜘蛛图）：radar)
  - [散点图](http://blog.michealwayne.cn/FundCharts/docs/graphs/#散点图：scatter)
  - [K 线图](http://blog.michealwayne.cn/FundCharts/docs/graphs/#k线图：kline)
  - [图形合并](http://blog.michealwayne.cn/FundCharts/docs/graphs/#图形合并)
- [加工绘制](http://blog.michealwayne.cn/FundCharts/docs/twiceDraw/)
- [ToolTips](http://blog.michealwayne.cn/FundCharts/docs/tooltips/)
- [小程序使用说明](http://blog.michealwayne.cn/FundCharts/docs/weapp/)
- [nodejs 服务端说明](http://blog.michealwayne.cn/FundCharts/docs/nodejs/)

### 目录结构

```
FundCharts
├─packages
│   ├─core        核心模块
│   ├─charts      图表工厂/图形实现
│   ├─toolTips    交互提示工具
│   └─components  组件封装
├─scripts
│   ├─build       构建脚本
│   └─jest        单测脚本
├─types          全局类型声明
├─lib            构建产物
├─docs           文档
├─demo           示例
├─coverage       单测报告
├─openspec       规范与变更说明
└─PROJECT_GUIDE.md 工程说明

```

### 特性

- **重图形**：只注重图形的可视化实现，画布以及换算提供全面接口供二次绘制。
- **轻量级**：体积小无依赖，全量直接引用仅 `30k`，开启 gzip 仅 `10.8k`；按需引用打包体积更小。
- **兼容好**：小程序端；web `Android4.4` 及以上，`iOS9` 及以上；`nodejs10.0` 及以上。

兼容：

### browser

- ios9 及以上
- android 4.4 及以上
- PC IE9+/Firefox/Opera/Chrome/Safari12+

> 注：与框架无冲突，配有[React/Vue 组件](https://blog.michealwayne.cn/FundCharts/docs/guide/#react-vue使用)。`v0.9.10`起支持 TypeScript 直接使用。

### weapp

- 兼容

### server

- nodejs v10+

## 最新版本

- [v0.9.11](https://www.npmjs.com/package/fundcharts)

（历史版本访问[FundCharts-versions](https://github.com/MichealWayne/FundCharts/tree/master/versions)）

## 更新信息

[change log](./CHANGELOG.md)

## 使用

[文档-FundCharts 的安装和使用](https://blog.michealwayne.cn/FundCharts/docs/guide/#安装和使用)

## 图形配置

[文档-FundCharts 图形及配置](https://blog.michealwayne.cn/FundCharts/docs/graphs/#折线图-面积图：line)

## 启动查看测试 demo

- [github-demos](./demo/)

<p>
<a href="https://github.com/MichealWayne/FundCharts/tree/master/demo">
  <img style="width: 375px" src="https://blog.michealwayne.cn/images/fundchartspics/guide/p-1.jpg" alt="combo1.jpg"/>
</a>
<a href="https://github.com/MichealWayne/FundCharts/tree/master/demo">
  <img style="width: 375px" src="https://blog.michealwayne.cn/images/fundchartspics/guide/p-2.jpg" alt="combo2.jpg"/>
</a>
</p>
<p>
<a href="https://github.com/MichealWayne/FundCharts/tree/master/demo">
  <img style="width: 375px" src="https://blog.michealwayne.cn/images/fundchartspics/gifs/line.gif" alt="line.gif"/>
</a>
<a href="https://github.com/MichealWayne/FundCharts/tree/master/demo">
  <img style="width: 375px" src="https://blog.michealwayne.cn/images/fundchartspics/gifs/pie.gif" alt="pie.gif"/>
</a>
</p>

## 其他

### 默认颜色组

```
'#fe5d4e',   // 红
'#43c2f7',   // 蓝
'#707ad9',   // 深蓝
'#ffa61b',   // 橙
'#64d290',   // 青
'#cf27bd'    // 紫
```

![colorArray](https://blog.michealwayne.cn/images/fundchartspics/colors.png)

- 反馈：[michealwayne@163.com](mailto:michealwayne@163.com)