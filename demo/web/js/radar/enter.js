import FundCharts from '~'	// '~'为dist目录下index.js
import 'css/index.less'

const RadarChart = FundCharts.radar;



// chart 1
const chart1 = new RadarChart({
    id: 'radar1',
    data: [1, 2, 3, 4, 3.5, 3]
});

chart1.init();


// chart 2
const chart2 = new RadarChart({
    id: 'radar2',
    hidePoints: true,   // 无点
    datas: [
        [1, 2, 3, 4, 3.5, 3, 4],
        [4, 3, 3, 4, 3.5, 3, 4]
    ]
});

chart2.init();

setTimeout(() => {
    chart2.update({
        datas: [
            [6, 5, 4, 6, 5, 3, 2],
            [4, 3, 3, 4, 3.5, 4, 5]
        ]
    })
}, 3000);

// chart 3
const chart3 = new RadarChart({
    id: 'radar3',
    noAnimation: true,   // 无动画
    noFill: true,   // 无填充色
    gridNumber: 2,  // 网格数量
    maxRate: 1,     // 最高比例
    backgroundColor: '#000',    // 背景色
    datas: [
        [1, 2, 3, 4, 3.5, 3, 4],
        [4, 3, 3, 4, 3.5, 3, 4]
    ]
});

chart3.init();

// chart 4
const chart4 = new RadarChart({
    id: 'radar4',
    colors: ['#009966'],
    radius: 70,     // 半径
    gridNumber: 4,
    fillGrid: '#f00',   // 填充背景
    origin: {       // 中心
        x: 120,
        y: 100
    },
    data: [1, 2, 3, 4, 3.5],
    onAnimation: () => {
        let tits = ['吃', '喝', '住', '睡', '玩'];

        let ctx = chart4.ctx;
        ctx.lineWidth = 1;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '12px Arial';
        ctx.fillStyle = '#000';
        chart4.drawer.sideArr.map((item, index) => {
            ctx.fillText(
                tits[index], 
                chart4.drawer.origin.x + item.x * chart4.drawer.radius * 1.2, 
                chart4.drawer.origin.y + item.y * chart4.drawer.radius * 1.2
            );
        });
    }
});

chart4.init();
