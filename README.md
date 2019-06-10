# FundCharts（1.0） 轻量数据可视化

轻量级canvas数据可视化组件库，可在web端/小程序端/服务端nodjes运行。核心原则：**轻量**，**只注重图形**。
目前包含折线图、面积图、饼图、柱状图、雷达图（蜘蛛图），预计下一期添加雷达图（√），散点图（√），K线图。（codepen demo：[https://codepen.io/michealwayne/](https://codepen.io/michealwayne/)）

> 注：对于有一定canvas开发经验的人员来说，通过[实例的再次绘制](#实例的再次绘制)可以完全实现特殊的可视化定制化效果。

### 向导
- [web](#1-web网页端)
    - [折线图/面积图](#11-linechart-折线图面积图)
    - [饼图/环形图](#12-piechart-饼图环形图)
    - [柱状图](#13-barchart-柱状图)
    - [雷达图/蜘蛛图](#14-radarchart-雷达图蜘蛛图)
    - [散点图](#15-scatterchart-散点图)
- [小程序](#2-小程序)
- [nodejs服务端](#3-nodejs服务端)
- [实例的再次绘制](#实例的再次绘制)


### 目录结构

```
FundCharts
├─dist    FundCharts，供demo测试使用
├─demo    使用案例
├─FundCharts.min.js   web/weapp端使用库
└─FundCharts-node.js  nodejs端使用库
```



### 特性
- 无三方库依赖；
- 体积小，全量直接引用仅26.6k，开启gzip仅9k；
- 兼容好

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
- 2019.06.10：修复部分bug(折线图/柱状图单点数据)
- 2019.05.05：增加散点图；新增图形区域控制、动画执行回调等参数控制；
- 2019.04.16: 增加雷达图（蜘蛛图）；柱状图修复负值控制；取消线性动画函数选择；
- 2019.04.08: 折线图增加粗细控制、虚线可选等参数设置；画布背景色可设置；
- 2019.03.15: 新增小程序端/nodejs服务端支持；

## 使用

### browser(FundCharts.min.js)
``` html
<script src="./FundCharts.min.js"></script>
```
``` js
var LineChart = FundCharts.line;
```

### weapp
``` js
const FundCharts = require('./FundCharts.min.js');

const LineChart = FundCharts.line;
```

### nodejs(FundCharts-node.js)
nodejs服务端需安装[node-canvas]及其环境(https://www.npmjs.com/package/canvas)。

``` js
const Canvas = require('Canvas');
const { FundCharts } = require('./FundCharts-node');
    
let LineChart = FundCharts.line;
```


## 启动查看测试demo


### browser
``` sh
npm i
npm run test
```

然后可在浏览器（开启手机模式）访问：[http://localhost:3000/line.html](http://localhost:3000/line.html)、[http://localhost:3000/bar.html](http://localhost:3000/bar.html)、[http://localhost:3000/pie.html](http://localhost:3000/pie.html)、[http://localhost:3000/radar.html](http://localhost:3000/radar.html)、[http://localhost:3000/scatter.html](http://localhost:3000/scatter.html)。

### weapp
可复制`demo/weapp/`代码到小程序环境中启动查看。

运行成功则可看到如下界面：
![weapp demo picture 1](http://blog.michealwayne.cn/images/github/FundCharts/FundCharts-weapp.png)

### nodejs
安装完node-canvas所需的环境后，
``` sh
npm i -D canvas
    
node /demo/node/line
node /demo/node/bar
node /demo/node/pie
node /demo/node/radar
node /demo/node/scatter
```

成功则可在/demo/node/目录下查看到对应图片。

## 实例的再次绘制
**创建实例后，实例的canvas属性及ctx属性分别对应canvas实例的canvas及context，因此可用此属性再次绘制，以满足特殊定制化的需求**。如

``` js
// demo1
let chart = new LineChart({
    id: 'chart',
    data: [1, 2, 3, 4, 3.5, 3, 4],
    xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11']
    hover(index, values, xaxis, _x) {
        // rect
        let ctx = chart.ctx;
        ctx.fillStyle = '#9d9d9d';
        let _rectX = _x - 32;
        _rectX = _rectX < 50 ? 50 : _rectX > 300 ? 300 : _rectX;
        ctx.rect(_rectX, 0, 64, 15);
        ctx.fill();

        // text
        ctx.fillStyle = '#fff';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(xaxis + ':' + values, _rectX + 32, 9);
    } 
});

chart.init();

// 图表上添加矩形蒙版
_zsChart.ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
_zsChart.ctx.fillRect(50, 0, _zsChart._chart.width - 65, -_zsChart.drawer.yRate * 30);
    
```

``` js
// demo2
const chart = new RadarChart({
    id: 'radar',
    data: [1, 2, 3, 4, 3.5],
    onAnimation: () => {    // 雷达图添加文字标注
        let tits = ['吃', '喝', '住', '睡', '玩'];

        let ctx = chart.ctx,
            _drawer = chart.drawer;
        ctx.lineWidth = 1;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '12px Arial';
        ctx.fillStyle = '#000';
        _drawer.sideArr.map((item, index) => {
            ctx.fillText(
                tits[index], 
                _drawer.origin.x + item.x * _drawer.radius * 1.2, 
                _drawer.origin.y + item.y * _drawer.radius * 1.2
            );
        });
    }
});

chart.init();
```

### 可视化实例部分参数说明
(如上述chart变量就是折线图的一个实例)

- canvas: canvas实例；
- ctx: canvas的content实例；
- dataset: 数据点对应位置坐标集合；
- drawer：数据处理实例，包含一些转换函数；
- opts：设置参数；
- _chart：图表尺寸，单位px
    - width: 宽
    - height: 高


## 1 Web网页端
### 1.1 LineChart 折线图、面积图

> 折线图默认第一条为渐变面积图，可通过设置noGradient字段为纯折线图或通过allGradient设置为纯面积图。


``` js
const LineChart = FundCharts.line
```

![line demo picture 1](http://blog.michealwayne.cn/images/fundchartspics/line/1.png)
![line demo picture 2](http://blog.michealwayne.cn/images/fundchartspics/line/2.png)
![line demo picture 3](http://blog.michealwayne.cn/images/fundchartspics/line/3.png)
![line demo picture 4](http://blog.michealwayne.cn/images/fundchartspics/line/4.png)

#### 1.1.1 准备工作
- 容器，需含id属性及配置宽高，如
``` html
<div id="chart" style="height: 2rem;"></div>
```
- x轴标签数组
- 数据项数组

#### 1.1.2 实例化

字段 | 默认值 | 类型 | 说明
---- | ----- | ---- | ----
allGradient | false | Boolean | （可选）是否为面积图，默认第一条折线为面积图
chartLeft | 50 | Number | （可选）图表主要内容（图形区域）距左边距离
chartRight | 15 | Number | （可选）图表主要内容（图形区域）距右边距离
chartTop | 0 | Number | （可选）图表主要内容（图形区域）距顶部距离
id | -- | String | 容器id
xaxis | -- | Array< String/Number> | x轴标签数组
yaxisfunc | -- | Function | （可选）y轴单位显示处理（函数）
data/datas | -- | Array< Number / Array< Number>> | 数据项数组（多条时字段传datas） 
colors | ['#fe5d4e', '#43c2f7', '#707ad9', '#3ba8ff', '#ffa92f'] | Array<String> | （可选）折线颜色(六位十六进制)
noGradient | false | Boolean | （可选）无渐变效果
noDash | false | Boolean | （可选）无虚线
noHoverLine | false | Boolean | （可选）触控后不展示线条
noAnimation | false | Boolean | （可选）无动画
lineWidths | -- | Array< Number> | （可选）折线粗细数组，如[3, 1]
hover | -- | Function | （可选）交互返回函数（第一个参数为索引，Number；第二个参数为对应数值集合，Array；第三个参数为x轴标签值，第四个参数为触控点的水平x坐标）
noHoverEvent | false | Boolean | （可选）无交互事件
onAnimation | -- | Function | （可选）动画执行时回调
onFinish | -- | Function | （可选）动画结束后回调
range | -- | Object | （可选）自定义范围，需包含min及max参数，如range: {min: 0, max: 15}
hoverLineColor | '#999' | String | （可选）触控后线条颜色
backgroundColor | '#fff' | String | （可选）画布背景色


单条，如
``` js
const chart = new LineChart({
    id: 'chart',
    xaxis: ['09-11', '09-22', '10-11'],
    yaxisfunc (data) {
        return (data * 100).toFixed(2) + '%'
    },
    data: [1, 2, 3, 4],
    colors: ['#0000ff'],
    hover (index, values, xaxis) {
        document.getElementById('showvalue').innerHTML = values[0];
        document.getElementById('showtime').innerHTML = xaxis;
    }
});

chart.init();
```

多条，如
``` js
const chart = new LineChart({
    id: 'chart',
    xaxis: ['09-11', '09-22', '10-11'],
    datas: [
        [1, 2, 3, 4],
        [1, 5, 3, 2]
    ],
    hover (index, values, xaxis) {
        document.getElementById('showvalue').innerHTML = values[0];
        document.getElementById('showvalue2').innerHTML = values[1];
        document.getElementById('showtime').innerHTML = xaxis;
    }
});

chart.init();
```

#### 1.1.3 更新数据
update()方法

``` js
chart.update({
    xaxis: ['10-12', '10-23', '11-12', '11-23', '12-11'],
    datas: [
        [2, 4, 3, 2, 4],
        [3, 4, 5, 3, 5]
    ]
});
```

#### 1.1.4 触摸事件及模拟
触摸事件目前只支持移动端。

模拟触摸事件可通过调用实例的drawer.drawHover(x坐标)方法触发，
如：
``` js
setTimeout(() => {
    chart.drawer.drawHover(365);
}, 1000);
```
效果如：
![line demo picture 3](http://blog.michealwayne.cn/images/github/FundCharts/line3.png)


### 1.2 PieChart 饼图、环形图

``` js
const PieChart = FundCharts.pie
```

![pie demo picture](http://blog.michealwayne.cn/images/github/FundCharts/pie1.jpg)
![pie demo picture 1](http://blog.michealwayne.cn/images/fundchartspics/pie/1.png)
![pie demo picture 2](http://blog.michealwayne.cn/images/fundchartspics/pie/2.png)
![pie demo picture 3](http://blog.michealwayne.cn/images/fundchartspics/pie/3.png)
![pie demo picture 4](http://blog.michealwayne.cn/images/fundchartspics/pie/4.png)


#### 1.2.1 准备工作
- 容器，需含id属性及配置宽高，如
``` html
<div id="chart" style="height: 2rem;"></div>
```
- 比例数组

#### 1.2.2 实例化

字段 | 默认值 | 类型 | 说明
---- | ----- | ---- | ----
id | -- | String | 容器id
annularRate | 0.6 | Number/Boolean | （可选）空心比例（0或false时为饼图，其余为环形图）
radius | -- | Number | （可选）饼图直径，默认取高度height/20 - 20
origin | -- | Object | （可选）圆心坐标{x: 水平坐标, y: 垂直坐标}
datas | -- | Array< Number> | 比例数组，请确认数组和为1
colors | ['#fe5d4e', '#43c2f7', '#707ad9', '#3ba8ff', '#ffa92f'] | Array<String> | （可选）折线颜色(六位十六进制)
lineWidth | 0 | Number | （可选）饼图/环形图之间空隙
widthRates | null | Array< Number> | （可选）各饼图半径比例，范围0~1
noAnimation | false | Boolean | （可选）无动画
onAnimation | -- | Function | （可选）动画执行时回调
onFinish | -- | Function | （可选）动画结束后回调
backgroundColor | '#fff' | String | （可选）画布背景色

单条，如
``` js
const chart = new PieChart({
    id: 'chart',
    datas: [0.1, 0.2, 0.3, 0.4],
    colors: ['#0000ff'],
});

chart.init();
```

### 1.3 BarChart 柱状图
``` js
const BarChart = FundCharts.bar
```

![bar demo picture 1](http://blog.michealwayne.cn/images/fundchartspics/bar/1.png)
![bar demo picture 2](http://blog.michealwayne.cn/images/fundchartspics/bar/2.png)
![bar demo picture 3](http://blog.michealwayne.cn/images/fundchartspics/bar/3.png)
![bar demo picture 4](http://blog.michealwayne.cn/images/fundchartspics/bar/4.png)


#### 1.3.1 准备工作
- 容器，需含id属性及配置宽高，如
``` html
<div id="chart" style="height: 2rem;"></div>
```
- x轴标签数组
- 数据项数组

#### 1.3.2 实例化

字段 | 默认值 | 类型 | 说明
---- | ----- | ---- | ---
id | -- | String | 容器id
xaxis | -- | Array< String/Number> | x轴标签数组
barMargin | 60 | Number | （可选）柱形图之间间隔
chartLeft | 50 | Number | （可选）图表主要内容（图形区域）距左边距离
chartRight | 15 | Number | （可选）图表主要内容（图形区域）距右边距离
chartTop | 0 | Number | （可选）图表主要内容（图形区域）距顶部距离
data/datas | -- | Array< Number / Array< Number>> | 数据项数组（多条时字段传datas）**早期版本为series字段，现统一为data/datas**
colors | ['#fe5d4e', '#43c2f7', '#707ad9', '#3ba8ff', '#ffa92f'] | Array<String> | （可选）折线颜色(六位十六进制)
negativeColor | -- | String | （可选）负值指定颜色
noAnimation | false | Boolean | （可选）无动画
noDash | false | Boolean | （可选）无虚线
onAnimation | -- | Function | （可选）动画执行时回调
onFinish | -- | Function | （可选）动画结束后回调
range | -- | Object | （可选）自定义范围，需包含min及max参数，如range: {min: 0, max: 15}
backgroundColor | '#fff' | String | （可选）画布背景色

单条，如
``` js
const chart = new BarChart({
    id: 'chart',
    xaxis: ['09-11', '09-22', '10-11'],
    series: [1, 2, 3]
});

chart.init();
```

多条，如
``` js
const chart = new BarChart({
    id: 'chart',
    xaxis: ['09-11', '09-22', '10-11', '11-22'],
    series: [
        [1, 2, 3, 4],
        [1, 5, 3, 2],
        [5, 3, 4, 2]
    ],
    barMargin: 20
});

chart.init();
```

#### 1.3.3 更新
update()方法

``` js
chart.update({
    xaxis: ['10-12', '10-23', '11-12', '11-23', '12-11'],
    series: [
        [2, 4, 3, 2, 4],
        [3, 4, 5, 3, 5]
    ]
});
```

### 1.4 RadarChart 雷达图（蜘蛛图）
``` js
const RadarChart = FundCharts.radar
```

![radar demo picture 1](http://blog.michealwayne.cn/images/fundchartspics/radar/1.png)
![radar demo picture 2](http://blog.michealwayne.cn/images/fundchartspics/radar/2.png)
![radar demo picture 3](http://blog.michealwayne.cn/images/fundchartspics/radar/3.png)
![radar demo picture 4](http://blog.michealwayne.cn/images/fundchartspics/radar/4.png)

#### 1.4.1 准备工作
- 容器，需含id属性及配置宽高，如
``` html
<div id="chart" style="height: 2rem;"></div>
```
- 数据项数组

#### 1.4.2 实例化

字段 | 默认值 | 类型 | 说明
---- | ----- | ---- | ----
id | -- | String | 容器id
radius | -- | Number | （可选）雷达图图直径，默认取高度height/20 - 20
origin | -- | Object | （可选）圆心坐标{x: 水平坐标, y: 垂直坐标}
data/datas | -- | Array< Number / Array< Number>> | 数据项数组（多条时字段传datas）
colors | ['#fe5d4e', '#43c2f7', '#707ad9', '#3ba8ff', '#ffa92f'] | Array<String> | （可选）折线颜色(六位十六进制)
widthRates | null | Array< Number> | （可选）各饼图半径比例，范围0~1
noAnimation | false | Boolean | （可选）无动画
noFill | false | Boolean | （可选）无填充色
fillGrid | '' | String | （可选）网格填充色
gridNumber | 3 | Number | （可选）网格线数量，>=1
maxRate | 0.9 | Number | （可选）数据点最高比例，0~1，为1时最大数据点贴边
hidePoints | false | Boolean | （可选）隐藏点
onAnimation | -- | Function | （可选）动画执行时回调
onFinish | -- | Function | （可选）动画结束后回调
backgroundColor | '#fff' | String | （可选）画布背景色

单条，如
``` js
const chart = new RadarChart({
    id: 'chart',
    data: [1, 2, 3, 4, 3.5, 3]
});

chart.init();
```

多条，如
``` js
const chart = new RadarChart({
    id: 'chart',
    xaxis: ['09-11', '09-22', '10-11', '11-22'],
    datas: [
        [1, 2, 3, 4, 3.5, 3, 4],
        [4, 3, 3, 4, 3.5, 3, 4]
    ]
});

chart.init();
```

#### 1.4.3 更新
update()方法

``` js
chart.update({
    datas: [
        [2, 4, 3, 2, 4],
        [3, 4, 5, 3, 5]
    ]
});
```

### 1.5 ScatterChart 散点图
``` js
    const ScatterChart = FundCharts.scatter
```

![scatter demo picture 1](http://blog.michealwayne.cn/images/fundchartspics/scatter/1.png)
![scatter demo picture 2](http://blog.michealwayne.cn/images/fundchartspics/scatter/2.png)
![scatter demo picture 3](http://blog.michealwayne.cn/images/fundchartspics/scatter/3.png)


#### 1.5.1 准备工作
- 容器，需含id属性及配置宽高，如
``` html
<div id="chart" style="height: 2rem;"></div>
```

- 数据项数组

#### 1.5.2 实例化

字段 | 默认值 | 类型 | 说明
---- | ----- | ---- | ---
id | -- | String | 容器id
chartLeft | 50 | Number | （可选）图表主要内容（图形区域）距左边距离
chartRight | 15 | Number | （可选）图表主要内容（图形区域）距右边距离
chartTop | 0 | Number | （可选）图表主要内容（图形区域）距顶部距离
series | -- | Array< Array< Number>> | 数据项数组 
xaxisfunc | -- | Function | （可选）x轴单位显示处理（函数）
yaxisfunc | -- | Function | （可选）y轴单位显示处理（函数）
colors | ['#fe5d4e', '#43c2f7', '#707ad9', '#3ba8ff', '#ffa92f'] | Array<String> | （可选）点的颜色(六位十六进制)
noAnimation | false | Boolean | （可选）无动画
noDash | false | Boolean | （可选）无虚线
onAnimation | -- | Function | （可选）动画执行时回调
onFinish | -- | Function | （可选）动画结束后回调
pointWidths | [6... ] | Array< Number> |（可选）散点半径（不包括描边）
noPointSide | false | Boolean | （可选）无描边
range | -- | Object | （可选）自定义范围，需包含x及y参数，如range: {x: [0, 10], y: [1, 15]}
backgroundColor | '#fff' | String | （可选）画布背景色

单项，如
``` js
const chart1 = new ScatterChart({
    id: 'scatter1',
    data: [
        [1, 2],
        [3, 4],
        [3, 5.5],
        [3.5, 4.4],
        [5, 6],
        [7, 3]
    ]
});

chart1.init();
```

多项，如
``` js
const chart2 = new ScatterChart({
    id: 'scatter2',
    datas: [
        [
            [1, 2],
            [3, 4],
            [3, 5.5],
            [3.5, 4.4],
            [5, 6],
            [7, 3]
        ],
        [
            [8, 7],
            [7, 6],
            [3, 5.5],
            [3.5, 4.4],
            [5, 6],
            [7, 3],
            [1, 3]
        ]
    ]
});

chart2.init();
```

#### 1.5.3 更新
update()方法

``` js
chart.update({
    xaxis: ['10-12', '10-23', '11-12', '11-23', '12-11'],
    series: [
        [2, 4, 3, 2, 4],
        [3, 4, 5, 3, 5]
    ]
});
```

## 2 小程序
小程序的使用跟web端类似，只有如下几点不同的地方。

### 2.1 必须设置width、height参数
小程序环境无法获取原生canvas的宽高，因此为保持形状不变形，需要设置参数width/height为canvas的宽高，如
``` js
chartInit = new LineChart({
    id: 'chart',
    xaxis: ['09-11', '09-22', '10-11'],
    yaxisfunc(data) {
    return (data * 100).toFixed(2) + '%'
    },
    Ctx: ctx,
    width: 375,    // 设置宽度
    height: 212,    // 设置高度
    xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11'],
    datas: [
    [1, 2, 3, 4, 3.5, 3, 4],
    [4, 3, 4, 2, 3, 5, 6]
    ]
});

chartInit.init();
```

### 2.2 涉及到交互需要主动设定绑定事件
小程序环境无法通过添加动作事件来完成交互的展示，因此比起web需要多一些绑定的操作，如
``` wxml
<canvas
    style="width: 375px; height: 212px;"
    canvas-id="chart"
    bindtouchstart="chartTouchstart"
    bindtouchmove="chartTouchmove"
></canvas>
```

``` js
let chartInit = null;

    //...
        onLoad () {
            chartInit = new LineChart({
              id: 'chart',
              xaxis: ['09-11', '09-22', '10-11'],
              yaxisfunc(data) {
                return (data * 100).toFixed(2) + '%'
              },
              Ctx: ctx,
              width: 375,
              height: 212,
              xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11'],
              data: [1, 2, 3, 4, 3.5, 3, 4]
            });

            chartInit.init();
        },
        
        // touch start
        chartTouchstart: function (e) {
            if (e) {
              let event = e.touches[0];
              chartInit.drawer.drawHover(event.x);        // 折线图的hover处理
            }
        },
        // touch move
        chartTouchmove: function (e) {
            if (e) {
              let event = e.touches[0];
              chartInit.drawer.drawHover(event.x);
            }
        },
    //...
```

## 3 nodejs服务端

nodejs服务端需要引FundCharts-node.js，其使用跟web端类似，不过没有动画跟交互（导出图片），nodejs服务端需安装[node-canvas]及其环境(https://www.npmjs.com/package/canvas)。

调用如下例：
``` js
const fs = require('fs');
const path = require('path');
const Canvas = require('canvas');
const {FundCharts} = require('../../dist/FundCharts-node');


// chart 1
const chart1 = new FundCharts.line({
    id: 'line1',
    width: 750,
    height: 375,
    xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11'],
    data: [1, 2, 3, 4, 3.5, 3, 4],
    Canvas: Canvas,
    handleOut: canvas => {
        let out = fs.createWriteStream(path.join(__dirname, './line1.jpg')), 
            stream = canvas.createJPEGStream();

        stream.on('data', function(chunk) {
            out.write(chunk);
        });
    }
});

chart1.init();
```

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


- 反馈：michealwayne@163.com