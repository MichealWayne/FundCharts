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
    hover(index, values, xaxis) {
        console.log(values[0], xaxis);
    }
});

chart2.init();
