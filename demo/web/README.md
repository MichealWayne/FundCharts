# 启动查看测试demo

## webpack
控制台在根目录下(FundCharts目录与webpack.config.js平级)，执行

``` sh
    npm i
    npm run test
```

然后可在浏览器（开启手机模式）访问：[折线图/面积图http://localhost:3000/line.html](http://localhost:3000/line.html)、[柱状图http://localhost:3000/bar.html](http://localhost:3000/bar.html)、[饼图/环形图http://localhost:3000/pie.html](http://localhost:3000/pie.html)、[雷达图（蜘蛛图）http://localhost:3000/radar.html](http://localhost:3000/radar.html)、[散点图http://localhost:3000/scatter.html](http://localhost:3000/scatter.html)。

## 本地测试
建立html文件，`<script>`标签引入，如
``` html
<div id="chart" style="height: 120px;"></div>
<script src="./FundCharts.min.js"></script>
<script>
var BarChart = FundCharts.bar;

// chart 1
var chart1 = new BarChart({
    id: 'chart',
    xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11', '12-12'],
    series: [
        [1, 3, 2, 3, 3.2, 4, 5]
    ],
    hover(index, values, xaxis) {
        console.log(values[0], xaxis);
    }
});

chart1.init();
</script>
```