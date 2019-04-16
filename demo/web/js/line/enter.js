import FundCharts from '~/FundCharts.min'
import 'css/index.less'

const LineChart = FundCharts.line;

// chart 1
const chart1 = new LineChart({
    id: 'line1',
    xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11'],
    data: [1, 2, 3, 4, 3.5, 3, 4],
    hover(index, values, xaxis) {
        console.log(values[0], xaxis);
    }
});

chart1.init();

// chart 2
const chart2 = new LineChart({
    id: 'line2',
    xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11'],
    datas: [
        [1, 2, 3, 4, 3.5, 3, 4],
        [4, 3, 4, 2, 3, 5, 6]
    ],
	lineWidths: [3, 1],		// 折线粗细
    hover(index, values, xaxis, x) {
        console.log(values[0], xaxis);
		
		/** 自定义添加label */
        let _x = x;

        // rect
        let ctx = chart2.ctx;
        ctx.fillStyle = '#9d9d9d';
        let _rectX = _x - 32;
        _rectX = _rectX < 50 ? 50 : _rectX > 300 ? 300 : _rectX;
        ctx.fillRect(_rectX, 0, 64, 15);

        // text
        ctx.fillStyle = '#fff';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(xaxis + ':' + values, _rectX + 32, 9);
		ctx.closePath();
		ctx.stroke();
    }
});

chart2.init();

// chart 3
const chart3 = new LineChart({
	id: 'line3',
	xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11'],
    datas: [
        [1, 2, 3, 4, 3.5, 3, 4],
        [4, 3, 4, 2, 3, 5, 6],
		[6, 2, 4, 5, 5, 2, 1]
    ],
	colors: ['#f00', '#00f', '#0f0', '#ff0', '#0ff'],
	pointStyle: '#666',			// 点
	backgroundColor: '#222',	// 背景色
	noDash: true,			// 没有虚线
	noAnimation: true,		// 没有动画
	noHoverLine: true,		// 触控效果没有线
	lineWidths: [5, 3, 1]		// 折线粗细
});

chart3.init();


setTimeout(() => {
chart3.update({
xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11'],
    datas: [
    
        [4, 3, 4, 2, 3, 5, 6],
        [1, 2, 3, 4, 3.5, 3, 4],
		[6, 2, 4, 5, 5, 2, 1]
    ]
})
}, 3000);

// chart 4
const chart4 = new LineChart({
    id: 'line4',
    xaxis: ['03-11', '04-11', '05-11', '06-11', '07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11'],
    data: [4, 3, 4, 2, 1, 2, 3, 4, 3.5, 3, 4],
	hoverLineColor: 'orange',		// 触控线的颜色
    hover(index, values, xaxis) {
        let _dataset = chart4.dataset;
        let ctx = chart4.ctx;
        ctx.save();
        ctx.lineWidth = 1;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '$12px Arial';
        ctx.fillStyle = '#333';
        ctx.fillText(
            values[0].toFixed(2), 
            _dataset[index].x < 65 ? 65 : _dataset[index].x,
            _dataset[index].y - 15
        );
        ctx.restore();
    }
});

chart4.init();

setInterval(() => {
    chart4.drawer.drawHover(Math.floor(Math.random() * (chart4._chart.width - 50)) + 50);
}, 600)

