import PieChart from '@/PieChart'
import 'css/index.less'

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
    origin: {
        x: 100,
        y: 100
    },
    datas: [0.4, 0.6]
});

chart3.init();