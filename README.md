# FundCharts（Beta） 数据可视化

移动端轻量级canvas数据可视化组件库。

特性：
- 无三方库依赖
- 体积小，全量引用仅15k，按需引用更小
- 兼容好

兼容：
- ios7+
- android4+

## 使用

### 全量引用
``` js
	<script src="./FundCharts.min.js"></script>
```

### 按需引用
``` js
	import 'LineChart' from 'FundCharts/LineChart'
```

## 1.LineChart 折线图

![line demo picture 1](http://blog.michealwayne.cn/images/github/FundCharts/line1.jpg)
![line demo picture 2](http://blog.michealwayne.cn/images/github/FundCharts/line2.jpg)


### 1.1 准备工作
- 容器，需含id属性及配置宽高，如
``` html
    <div id="chart" style="height: 2rem;"></div>
```
- x轴标签数组
- 数据项数组

### 1.2 初始化

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

### 1.3 更新
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

## 2.PieChart 饼图
![pie demo picture 1](http://blog.michealwayne.cn/images/github/FundCharts/pie1.jpg)
![pie demo picture 1](http://blog.michealwayne.cn/images/github/FundCharts/pie2.jpg)

### 2.1 准备工作
- 容器，需含id属性及配置宽高，如
``` html
    <div id="chart" style="height: 2rem;"></div>
```
- 比例数组

### 1.2 初始化

字段 | 默认值 | 说明
---- | ----- | ----
id | -- | 容器id
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

