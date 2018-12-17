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
