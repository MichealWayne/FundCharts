# FundCharts web demo


## 启动查看测试demo
（PC浏览器请开启手机调试模式）
- 折线图/面积图：`line.html`
- 柱状图：`bar.html`
- 饼图/环形图：`pie.html`
- 雷达图（蜘蛛图）：`radar.html`
- 散点图：`scatter.html`
- K线图：`kline.html`

## 本地测试
### webpack可模块引用，如
``` js
import {line} from 'fundcharts'
// or
import line from 'fundcharts/LineChart'
```

### 建立html文件，`<script>`标签引入，如
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