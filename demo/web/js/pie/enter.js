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

// chart 3
const chart3 = new PieChart({
    id: 'pie3',
    annularRate: 0.8,
	backgroundColor: '#000',	// 背景色
    origin: {
        x: 100,
        y: 100
    },
    datas: [0.4, 0.6]
});

chart3.init();
