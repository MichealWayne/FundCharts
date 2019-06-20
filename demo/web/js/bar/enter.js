import FundCharts from '~'	// '~'为dist目录下index.js
import 'css/index.less'

const BarChart = FundCharts.bar;

// chart 1
const chart1 = new BarChart({
    id: 'bar1',
    xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11', '12-12'],
    data: [1, 3, 2, 3, 3.2, 4, 5]
});

chart1.init();

// chart 2
const chart2 = new BarChart({
    id: 'bar2',
    xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11', '12-12', '12-13', '12-14', '12-15', '12-16', '12-17', '12-18', '12-19', '12-20'],
    chartLeft: 30,
    chartRight: 1,
    chartTop: 20,
    datas: [
        [1, 3, 2, 3, 3.2, 4, 5, 6, 3, 5, 3, 2, 3, 3.2, 4, 5],
        [2, 3, 5, 1, 2, 3, 6, 7, 3, 4, 2, 4, 3, 3.2, 4, 5],
        [4, 2, 1, 1, 1, 4, 7, 5, 5, 3, 2, 2, 4, 4, 3, 2]
    ]
});

chart2.init();


setTimeout(function () {
    chart2.update({
        datas: [
            [4, 2, 1, 6, 1, 4, 3, 5, 5, 3, 2, 2, 7, 4, 3, 6],
            [2, 3, 5, 5, 2, 3, 6, 7, 3, 4, 2, 4, 3, 5, 2, 3],
            [3, 3, 2, 3, 3.2, 4, 5, 6, 3, 5, 3, 2, 3, 3, 4, 2]
        ]
    })
}, 5000);

// chart 3
const chart3 = new BarChart({
    id: 'bar2',
    xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11', '12-12', '12-13', '12-14', '12-15', '12-16', '12-17', '12-18', '12-19', '12-20'],
    data: [1, 3, 2, 3, 3.2, 4, 5, -6.1, -3, -5, 3, 2, 3, 3.2, 4, 5],
    colors: ['#6892df', '#f96063'],
    font: {         
        color: '#eee',  // x/y轴文字颜色
        fontSize: {     // x/y轴文字大小
            x: '8px',
            y: '8px'
        }
    },
    negativeColor: '#88dd4c',   // 负值指定颜色
    noAnimation: true, // 没有动画
	backgroundColor: '#333'	// 背景色
});

chart3.init();

// chart 4
let timeArr = ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11', '12-12'],
    valArr = [1, 3, 2, 3, 3.2, 4, 5, -3];
const chart4 = new BarChart({
    id: 'bar4',
    xaxis: timeArr,
    range: {        // 范围
        min: -10,
        max: 10
    },
    data: valArr,
    onAnimation: process => {
        let ctx = chart4.ctx;
        let datasets = chart4.dataset;
        let _zero = chart4.drawer.zeroY;

        ctx.lineWidth = 1;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '#12px Arial';
        ctx.fillStyle = '#000';
        datasets.map((item, index) => {
            ctx.fillText(
                valArr[index].toFixed(2), 
                item.x + 10,
                item.y + 10 * (item.y > _zero && 1 || -1) * process
            );
        })
    }
});

chart4.init();
