import BarChart from '@/BarChart'
import 'css/index.less'

// chart 1
const chart1 = new BarChart({
    id: 'bar1',
    xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11', '12-12'],
    series: [
        [1, 3, 2, 3, 3.2, 4, 5]
    ],
    hover(index, values, xaxis) {
        console.log(values[0], xaxis);
    }
});

chart1.init();

// chart 2
const chart2 = new BarChart({
    id: 'bar2',
    xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11', '12-12', '12-13', '12-14', '12-15', '12-16', '12-17', '12-18', '12-19', '12-20'],
    series: [
        [1, 3, 2, 3, 3.2, 4, 5, 6, 3, 5, 3, 2, 3, 3.2, 4, 5],
        [2, 3, 5, 1, 2, 3, 6, 7, 3, 4, 2, 4, 3, 3.2, 4, 5],
        [4, 2, 1, 1, 1, 4, 7, 5, 5, 3, 2, 2, 4, 4, 3, 2]
    ],
    hover(index, values, xaxis) {
        console.log(values[0], xaxis);
    }
});

chart2.init();


setTimeout(function () {
    chart2.update({
        series: [
            [4, 2, 1, 6, 1, 4, 3, 5, 5, 3, 2, 2, 7, 4, 3, 6],
            [2, 3, 5, 5, 2, 3, 6, 7, 3, 4, 2, 4, 3, 5, 2, 3],
            [3, 3, 2, 3, 3.2, 4, 5, 6, 3, 5, 3, 2, 3, 3, 4, 2]
        ]
    })
}, 5000);