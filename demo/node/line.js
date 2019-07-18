/*
 * node test
 * if `/dist/FundCharts-node.js` is not existed, run `npm run build:node`
 * @type line
 */

const fs = require('fs');
const path = require('path');
const Canvas = require('canvas');
const {FundCharts} = require('../../FundCharts-node');


// chart 1
const chart1 = new FundCharts.line({
    id: 'line1',
    width: 750,
    height: 375,
    xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11'],
    data: [1, 2, 3, 4, 3.5, 3, 4],
    Canvas: Canvas,
    handleOut: canvas => {
		let out = fs.createWriteStream(path.join(__dirname, './line1.jpg')), 
			stream = canvas.createJPEGStream();

		stream.on('data', function(chunk) {
			out.write(chunk);
		});
	}
});

chart1.init();

// chart 1
const chart2 = new FundCharts.line({
    id: 'line2',
    width: 750,
    height: 375,
    xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11'],
    datas: [
        [1, 2, 3, 4, 3.5, 3, 4],
        [4, 3, 4, 2, 3, 5, 6]
    ],
    Canvas: Canvas,
    handleOut: canvas => {
		let out = fs.createWriteStream(path.join(__dirname, './line2.jpg')), 
			stream = canvas.createJPEGStream();

		stream.on('data', function(chunk) {
			out.write(chunk);
		});
	}
});

chart2.init();