import FundCharts from '~/FundCharts.min'
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