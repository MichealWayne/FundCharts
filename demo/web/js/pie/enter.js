import FundCharts from '~'	// '~'为dist目录下index.js
import 'css/index.less'

const PieChart = FundCharts.pie;

// chart 1
const chart1 = new PieChart({
    id: 'pie1',
    datas: [0.1, 0.2, 0.3, 0.4]
});

chart1.init();

// chart 2
const chart2 = new PieChart({
    id: 'pie2',
    annularRate: false,
    datas: [0.1, 0.2, 0.3, 0.2, 0.2]
});

chart2.init();

setTimeout(() => {
    chart2.update({
        datas: [0.3, 0.2, 0.1, 0.4]
    })
}, 2000);

// chart 3
const chart3 = new PieChart({
    id: 'pie3',
    annularRate: 0.8,
    lineWidth: 4,
	backgroundColor: '#000',	// 背景色
    origin: {
        x: 100,
        y: 100
    },
    datas: [0.5, 0.2, 0.2, 0.1]
});

chart3.init();

// chart 4
const chart4 = new PieChart({
    id: 'pie4',
    radius: 90,       // 半径
    lineWidth: 2,
    annularRate: false,
    widthRates: [0.5, 0.6, 0.7, 0.8, 1],     // 控制宽度
    datas: [0.05, 0.1, 0.25, 0.3, 0.3]
});

chart4.init();

// chart 5
const chart5 = new PieChart({
    id: 'pie5',
	annularRate: 0.9,
	colors: ['#f63'],
	backgroundColor: '#000',	// 背景色
    datas: [0.4],
	onAnimation: rate => {
		let ctx = chart5.ctx,
			_origin = chart5.drawer.origin,
			_radius = chart5.drawer.radiusWhite;
		
		// draw circle
		ctx.strokeStyle = '#525356';
		ctx.strokeWidth = 1;        

        ctx.moveTo(_origin.x, _origin.y);
		ctx.beginPath();
        ctx.arc(_origin.x, _origin.y, _radius - 1, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
		ctx.stroke();
		
		// draw texts
		ctx.fillStyle = '#f63';
        ctx.font = 'bold 22px consolas';
        ctx.textAlign = 'center';
        ctx.fillText('FundChart', _origin.x, 90);
        ctx.fillText((rate * 40).toFixed(2) + '%', _origin.x, 120);
	}
});
chart5.init();
console.log(chart5);
