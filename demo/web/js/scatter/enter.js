import FundCharts from '~'	// '~'为dist目录下index.js
import 'css/index.less'

const ScatterChart = FundCharts.scatter;

// chart 1
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

// chart 2
let _arr1 = [],
    _arr2 = [],
    _arr3 = [];
for (let i = 0; i < 60; i++) {
    if (i % 3 === 0) _arr1.push([Math.random() * 100, Math.random() * 100]);
    if (i % 2 === 0) _arr2.push([Math.random() * 80 + 5, Math.random() * 80 + 5]);
    _arr3.push([Math.random() * 50, Math.random() * 50]);
}

const chart2 = new ScatterChart({
    id: 'scatter2',
    yaxisfunc (data) {
        return data.toFixed(0) + '%'
    },
    xaxisfunc (data) {
        return data.toFixed(0) + '天'
    },
    chartTop: 20,
    chartLeft: 30,
    chartRight: 0,
    datas: [
        _arr1,
        _arr2,
        _arr3
    ]
});

chart2.init();

// chart 3
const chart3 = new ScatterChart({
    id: 'scatter3',
    datas: [
        _arr1,
        _arr2,
        _arr3
    ],
    range: {
        x: [0, 120],
        y: [0, 200]
    },
    noPointSide: true,  // 无描边
    chartLeft: 25,
    chartRight: 1,
    backgroundColor: '#000',
    colors: ['#00f', '#0f0', '#f00'],
    pointWidths: [2, 2, 2],
	noDash: true,
	handleTextY: (ctx, yaxis) => {
		console.log(yaxis);
		ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '10px Arial';
        ctx.fillStyle = '#fff';
		
		ctx.fillText(yaxis.min.toFixed(0), 10, chart3._chart.height - 30);
		ctx.fillText(yaxis.max.toFixed(0), 10, chart3.opts.chartTop + 10);
		ctx.fillText(((yaxis.max + yaxis.min) / 2).toFixed(0), 10, (chart3._chart.height - chart3.opts.chartTop) / 2 - 10);
	}
});

chart3.init();