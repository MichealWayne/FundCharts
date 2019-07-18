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
const chart1 = new FundCharts.scatter({
    id: 'scatter1',
    width: 750,
    height: 375,
    data: [
        [1, 3],
        [2, 4],
        [5, 6],
        [3, 5],
        [6, 6],
        [7, 5],
        [8, 3],
        [3, 4]
    ],
    Canvas: Canvas,
    handleOut: canvas => {
		let out = fs.createWriteStream(path.join(__dirname, './scatter1.jpg')), 
			stream = canvas.createJPEGStream();

		stream.on('data', function(chunk) {
			out.write(chunk);
		});
	}
});

chart1.init();

// chart 1
const chart2 = new FundCharts.scatter({
    id: 'scatter2',
    width: 750,
    height: 375,
    datas: [
        [
		[1, 3],
		[2, 4],
		[5, 6],
		[3, 5],
		[6, 6],
		[7, 5],
		[8, 3],
		[3, 4],
		[7, 3],
		[8, 4]
	    ],
	[
		[3, 4.2],
 		[4.2, 5.2],
		[3.3, 3.4],
		[0.3, 0,6]
	    ],
	[
		[6.1, 6.2],
 		[9.2, 7.2],
		[4.3, 5.4],
		[3.6, 5,6]
	    ]
    ],
    Canvas: Canvas,
    handleOut: canvas => {
		let out = fs.createWriteStream(path.join(__dirname, './scatter2.jpg')), 
			stream = canvas.createJPEGStream();

		stream.on('data', function(chunk) {
			out.write(chunk);
		});
	}
});

chart2.init();
