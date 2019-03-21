# FundCharts（Beta） 数据可视化

轻量级canvas数据可视化组件库，可在web端/小程序端/服务端nodjes运行。核心原则：**轻量**，**只注重图形**。目前包含折线图、饼图、柱状图，预计下一期添加雷达图，散点图，K线图。


```
FundCharts
├─demo    使用案例
├─FundCharts.min.js   web/weapp端使用库
└─FundCharts-node.js  nodejs端使用库
```

特性：
- 无三方库依赖
- 体积小，全量引用仅20k，开启gzip更小
- 兼容好

兼容：
### browser
- ios7+
- android4+

### weapp
- 兼容

### server
- nodejs v8.0+

## 更新信息
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

然后可在浏览器（开启手机模式）访问：http://localhost:3000/line.html、http://localhost:3000/bar.html、http://localhost:3000/pie.html。

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
```

成功则可在/demo/node/目录下查看到对应图片。

## 1 Web网页端
### 1.1 LineChart 折线图


``` js
	const LineChart = FundCharts.line
```

![line demo picture 1](http://blog.michealwayne.cn/images/github/FundCharts/line1.jpg)
![line demo picture 2](http://blog.michealwayne.cn/images/github/FundCharts/line2.jpg)


#### 1.1.1 准备工作
- 容器，需含id属性及配置宽高，如
``` html
    <div id="chart" style="height: 2rem;"></div>
```
- x轴标签数组
- 数据项数组

#### 1.1.2 初始化

字段 | 默认值 | 说明
---- | ----- | ----
id | -- | 容器id
xaxis | -- | x轴标签数组
yaxisfunc | -- | （可选）y轴单位显示处理（函数）
data/datas | -- | 数据项数组（多条时字段传datas） 
colors | ['#fe5d4e', '#43c2f7'] | （可选）折线颜色(六位十六进制，不可简写)
noGradient | false | 无渐变效果
hover | -- | （可选）交互返回函数（第一个参数为索引，Number；第二个参数为对应数值集合，Array；第三个参数为x轴标签值）

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

#### 1.1.3 更新
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

### 1.2 PieChart 饼图

``` js
	const PieChart = FundCharts.pie
```

![pie demo picture 1](http://blog.michealwayne.cn/images/github/FundCharts/pie1.jpg)
![pie demo picture 2](http://blog.michealwayne.cn/images/github/FundCharts/pie2.jpg)

#### 1.2.1 准备工作
- 容器，需含id属性及配置宽高，如
``` html
    <div id="chart" style="height: 2rem;"></div>
```
- 比例数组

#### 1.2.2 初始化

字段 | 默认值 | 说明
---- | ----- | ----
id | -- | 容器id
annularRate | 0.6 | 空心比例（0或false时为饼图，其余为环形图）
radius | -- | 饼图直径，默认取高度height/20 - 20
origin | -- | 圆心坐标{x: 水平坐标, y: 垂直坐标}
datas | -- | 比例数组，请确认数组和为1
colors | ['#fe5d4e', '#43c2f7', '#707ad9', '#3ba8ff', '#ffa92f'] | （可选）折线颜色(六位十六进制，不可简写)（可选）交互返回函数（第一个参数为索引，Number；第二个参数为对应数值集合，Array；第三个参数为x轴标签值）

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

![bar demo picture 1](http://blog.michealwayne.cn/images/github/FundCharts/bar1.png)

#### 1.3.1 准备工作
- 容器，需含id属性及配置宽高，如
``` html
    <div id="chart" style="height: 2rem;"></div>
```
- x轴标签数组
- 数据项数组

#### 1.3.2 初始化

字段 | 默认值 | 说明
---- | ----- | ----
id | -- | 容器id
xaxis | -- | x轴标签数组
barMargin | 60 | （可选）柱形图之间间隔
series | -- | 数据项数组 
colors | ['#fe5d4e', '#43c2f7'] | （可选）折线颜色(六位十六进制，不可简写)


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
        datas: [
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
      width: 375,	// 设置宽度
      height: 212,	// 设置高度
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
			  chartInit.drawer.drawHover(event.x);
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

- 反馈：michealwayne@163.com