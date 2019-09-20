/**
 * FundCharts-node
 * node test
 * @type pie
 */

const fs = require('fs');
const path = require('path');
const Canvas = require('canvas');
const {FundCharts} = require('../../FundCharts-node');

let PieChart = FundCharts.pie;

// chart 1
const chart1 = new PieChart({
    id: 'pie1',
    datas: [0.1, 0.2, 0.3, 0.4],
    Canvas: Canvas,
    handleOut: canvas => {
		let out = fs.createWriteStream(path.join(__dirname, './pie1.jpg')), 
			stream = canvas.createJPEGStream();

		stream.on('data', function(chunk) {
			out.write(chunk);
		});
	}
});

chart1.init();

// chart 2
const chart2 = new PieChart({
    id: 'pie2',
    annularRate: false,
    datas: [0.1, 0.2, 0.3, 0.2, 0.2],
    Canvas: Canvas,
    handleOut: canvas => {
		let out = fs.createWriteStream(path.join(__dirname, './pie2.jpg')), 
			stream = canvas.createJPEGStream();

		stream.on('data', function(chunk) {
			out.write(chunk);
		});
	}
});

chart2.init();

// chart 3
const chart3 = new PieChart({
    id: 'pie3',
    annularRate: 0,
    origin: {
        x: 200,
        y: 200
    },
    datas: [0.3, 0.1, 0.2, 0.4],
    widthRates: [0.8, 0.9, 1.0, 1.1],
    width: 750,
    height: 375,
    Canvas: Canvas,
    handleOut: canvas => {
		let out = fs.createWriteStream(path.join(__dirname, './pie3.jpg')), 
			stream = canvas.createJPEGStream();

		stream.on('data', function(chunk) {
			out.write(chunk);
		});
	}
});

chart3.init();
