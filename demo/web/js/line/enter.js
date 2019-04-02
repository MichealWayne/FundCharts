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
    hover(index, values, xaxis, x) {
        console.log(values[0], xaxis);
		
		/** 自定义添加label */
        let _x = x;

        // rect
        let ctx = chart2.ctx;
        ctx.fillStyle = '#9d9d9d';
        let _rectX = _x - 32;
        _rectX = _rectX < 50 ? 50 : _rectX > 300 ? 300 : _rectX;
        ctx.rect(_rectX, 0, 64, 15);
        ctx.fill();

        // text
        ctx.fillStyle = '#fff';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(xaxis + ':' + values, _rectX + 32, 9);
    }
});

chart2.init();
