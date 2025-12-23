# Change log

- 2025.12.21(`v1.0.0`)：增加桑基图；工程结构调整；bug修复；
- 2022.02.05(`v0.9.11`): 修复 line 面积渐变 bug，options 边界 bug；增加实例内存销毁方法 destroy()；
- 2021.09.25(`v0.9.10`)：增加声明文件以支持 TypeScript；增加 ToolTip 的集成；
- 2021.06.20(`v0.9.9`)：修复微信小程序注册 bug。
- 2021.06.08(`v0.9.8`)：修复计算 bug；优化代码。
- 2020.09.08(`v0.9.7`)：增加图表提示辅助组件 ToolTips；FundCharts 适配 ToolTips。
- 2020.02.28(`v0.9.6`)：修复特殊情况下饼图 Pie 的间距 bug；柱状图增加堆叠效果（多数据项）。
- 2019.12.20(`v0.9.5`)：增加 React/Vue 组件；Pie/Radar 设置 origin 时不需要 x,y 必填。
- 2019.10.28(`v0.9.4`)：背景默认透明('#fff' -> `rgba(0,0,0,0)`)；折线图 line 初始动画方式替换，交互超出边界处理调整（执行 onFinish，展示边界值）；散点图增加圆点边框半径控制 borderRate。
- 2019.09.20(`v0.9.3`)：增加图形合并：line 和 kline、bar 和 line 可以组合。grid(line/bar/scatter/kline)：增加 x/y 坐标轴线显示控制(grid.showGrid)、增加 x/y 轴网格数量控制(xTickLength/yTickLength)、hover 回调参数增加 touchEvent 的 y 坐标值。所有图形增加动画时长控制(duration)。饼/环形 pie：增加起始角度控制(startAngle)。饼/环形/雷达图 pie/radar：触控交互区域进行范围限制。折线 line：修复 update()特殊调用情景的 bug。柱状图 bar：修复 barWidth 失效 bug。
- 2019.08.23(`v0.9.2`)：优化 line/pie/radar/bar 的 update 切换过渡动画；折线图 line 增加曲线展示(curveLine)；k 线图增加空心展示控制(upHollow)。
- 2019.07.18(`v0.9.1`)：增加柱状图/k 线图/饼图/环形图/雷达图交互反馈；web 端可直接在 canvas 元素上绘制；修复雷达图坐标及小程序网格 bug，修复小程序 hover 抖动 bug；
- 2019.06.20(`v0.9.0`)：增加 k 线图；增加小程序动画；修复柱状图 xaxis bug；开放 x/y 轴文案处理函数（handleTextX/handleTextY）；
- 2019.06.10(`beta`)：修复部分 bug(折线图/柱状图单点数据)；
- 2019.05.05(`beta`)：增加散点图；新增图形区域控制、动画执行回调等参数控制；
- 2019.04.16(`beta`)：增加雷达图（蜘蛛图）；柱状图修复负值控制；取消线性动画函数选择；
- 2019.04.08(`beta`)：折线图增加粗细控制、虚线可选等参数设置；画布背景色可设置；
- 2019.03.15(`beta`)：新增小程序端/nodejs 服务端支持；
