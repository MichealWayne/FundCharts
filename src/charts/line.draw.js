/**
 * line chart
 * drawer
 */

import { each, getColorRgb } from '../utils/base'
import { Animation } from '../utils/animate'
import Config from '../config'

export default class Draw {
    constructor (FundChart) {
        if (!FundChart) throw new Error('Error!no canvas element.(FundChart-draw)');
        this.chartjs = FundChart;

        if (this.chartjs.opts.colors) {
            Config.line.colors = this.chartjs.opts.colors.concat(Config.line.colors);
        }
    }

    /**
     * 求斜边长度
     */
    _getBeveling(x, y) {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }

    /**
     * 绘制虚线
     */
    _drawDashLine(context, x1, y1, x2, y2, dashLen) {
        dashLen = dashLen === undefined ? 5 : dashLen;
        //得到斜边的总长度  
        let beveling = this._getBeveling(x2 - x1, y2 - y1);
        //计算有多少个线段  
        let num = Math.floor(beveling / dashLen);
        context.beginPath();
        for (let i = 0; i < num; i++) {
            context[i % 2 == 0 ? 'moveTo' : 'lineTo'](x1 + (x2 - x1) / num * i, y1 + (y2 - y1) / num * i);
        }
        context.closePath();
        context.stroke();
    }

    /**
     * 清理区域
     * @param {Boolean} lineCtnBool 是否只清理图形区域
     */
    clearCtn (lineCtnBool) {
        let ctx = this.chartjs.ctx;

        ctx.beginPath();
        if (lineCtnBool) ctx.rect(46, 0, this.chartjs._chart.width, this.chartjs._chart.height - 22);
        else ctx.rect(0, 0, this.chartjs._chart.width, this.chartjs._chart.height);
        ctx.fillStyle = Config.background;
        ctx.fill();
        ctx.closePath();
    }

    /**
     * 折线图——画虚线
     */
    drawDashs () {
        let width = this.chartjs._chart.width - 13;
        let height = this.chartjs._chart.height;
        let ctx = this.chartjs.ctx;

        let _unit = (height - 30) / 4;
        ctx.lineWidth = 0;
        ctx.strokeStyle = Config.dash.color;

        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            this._drawDashLine(ctx, 50, i * _unit + 5, width, i * _unit + 5, Config.dash.length);
        }

        ctx.save();
    }

    /**
     * 计算参数数据
     */
    setDataset () {
        let _data = this.chartjs.opts.data;
        let _datas = this.chartjs.opts.datas;

        let minData,
            maxData;
        let _min,
            _range,
            _setRange = this.chartjs.opts.range;
        if (_setRange) {
            console.log(_setRange)
            if (_setRange.min === undefined || _setRange.max === undefined) throw new Error('Error! param range need min and max');
            _min = _setRange.min;
            _range = _setRange.max - _setRange.min;
        } else {
            if (_datas) {
                this.chartjs.multline = true;   // 多条

                each(_datas, item => {
                    let _min = Math.min.apply(null, item);
                    let _max = Math.max.apply(null, item);

                    minData = minData && minData < _min ? minData : _min;
                    maxData = maxData && maxData > _max ? maxData : _max;
                });
            } else {
                minData = Math.min.apply(null, _data);
                maxData = Math.max.apply(null, _data);
            }

            
            _range = (maxData - minData);
            if (_range > 2) _range = Math.ceil(_range / 4) * 4;
            else _range = _range * 1.2;
            
            _min = _range > 2 ? Math.floor(minData) : minData;
            if (_min + _range < maxData) _min = minData;
        }
        this.yaxis = {
            min: _min,
            max: _min + _range,
            range: _range,
            unit: _range / 4
        };

        // y = yRate * value + yBasic
        this.yRate = (30 - this.chartjs._chart.height) / this.yaxis.range;
        this.yBasic = 5 - this.yaxis.max * this.yRate;

        let _xlength = _data ? _data.length : _datas[0].length;
        this.xaxis = {
            min: 0,
            max: _xlength - 1,
            range: _xlength,
            unit: 1
        };

        // x = xRate * index + 50;
        this.xRate = (this.chartjs._chart.width - 65) / (_xlength - 1);
        this.xBasic = 50;

        if (this.chartjs.multline) {
            let _datasets = [];

            each(_datas, item => {
                let _dataset = [];
                for (let i = 0; i < item.length; i++) {
                    _dataset.push({
                        x: i * this.xRate + this.xBasic,
                        y: item[i] * this.yRate + this.yBasic,
                        value: item[i]
                    });
                }

                _datasets.push(_dataset);
            });

            this.chartjs.datasets = _datasets;
        } else {
            let _dataset = [];

            each(_data, (item, i) => {
                _dataset.push({
                    x: i * this.xRate + this.xBasic,
                    y: _data[i] * this.yRate + this.yBasic,
                    value: _data[i]
                });
            });

            this.chartjs.dataset = _dataset;
        }
        
    }

    /**
     * 绘制文案 
     */
    drawTexts () {
        let ctx = this.chartjs.ctx;
        let _xaxis = this.chartjs.opts.xaxis;
        let width = this.chartjs._chart.width;
        let height = this.chartjs._chart.height;

        ctx.lineWidth = 1;
        ctx.textAlign = 'right';
        ctx.font = `${Config.font.fontSize.y} Arial`;
        ctx.fillStyle = Config.font.color;

        // x title
        ctx.fillText(_xaxis[_xaxis.length - 1], width - 15, height - 10);
        ctx.textAlign = 'left';
        ctx.fillText(_xaxis[0], 50, height - 10);

        ctx.font = '${Config.font.fontSize.x} Arial';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';

        // y title
        let _yaxis = this.yaxis;
        for (let i = 0; i < 5; i++) {
            let _val = _yaxis.min + i * _yaxis.unit;
            ctx.fillText(
                this.chartjs.opts.yaxisfunc ? this.chartjs.opts.yaxisfunc(_val)
                : _val.toFixed(2), 
                45, 
                this.yRate * _val + this.yBasic
            );
        }
    }

    /**
     * 折线图——绘制折线
     */
    drawLine (process = 1) {
        let ctx = this.chartjs.ctx;
        
        ctx.lineWidth = 1;
        let ymax = this.chartjs._chart.height - 24;

        const drawLinearGradient = color => {
            if (this.chartjs.opts.noGradient) return false;
            let grad = ctx.createLinearGradient(0, 0, 0, 170);
            const colorArr = getColorRgb(color);
            grad.addColorStop(0, `rgba(${colorArr.join(',')}, 0.3)`);
            grad.addColorStop(0.8, `rgba(${colorArr.join(',')}, 0.1)`);
            grad.addColorStop(1, `rgba(${colorArr.join(',')}, 0.05)`);

            ctx.fillStyle = grad;
            ctx.fill();
        };
        
        if (this.chartjs.multline) {
            let _datasets = this.chartjs.datasets;

            each(_datasets, (item, index) => {
                if (index === 0) {
                    ctx.beginPath();
                    ctx.lineWidth = 0;
                    ctx.strokeStyle = Config.background;
                    ctx.moveTo(50, this.chartjs._chart.height - 24);
                    for (let i = 0; i < _datasets[0].length; i++) {
                        ctx.lineTo(_datasets[index][i].x, ymax * (1 - process) + _datasets[index][i].y * process);
                    }
                    ctx.lineTo(_datasets[0][_datasets[0].length - 1].x, ymax);
                    ctx.closePath();
                
                    drawLinearGradient(Config.line.colors[index]);
                    ctx.stroke();
                }

                ctx.lineWidth = 1;
                ctx.strokeStyle = Config.line.colors[index];
                ctx.beginPath();

                ctx.moveTo(_datasets[index][0].x, ymax * (1 - process) + _datasets[index][0].y * process);

                each(_datasets[index], item => {
                    ctx.lineTo(item.x, ymax * (1 - process) + item.y * process);
                });
                
                ctx.stroke();
            });
        } else {
            let _dataset = this.chartjs.dataset;
            
            ctx.beginPath();
            ctx.lineWidth = 0;
            ctx.strokeStyle = Config.background;
            ctx.moveTo(50, this.chartjs._chart.height - 24);
            for (let i = 0; i < _dataset.length; i++) {
                ctx.lineTo(_dataset[i].x, ymax * (1 - process) + _dataset[i].y * process);
            }
            ctx.lineTo(_dataset[_dataset.length - 1].x, ymax);
            ctx.closePath();
            
            drawLinearGradient(Config.line.colors[0]);
            ctx.stroke();

            ctx.strokeStyle = Config.line.colors[0];
            ctx.beginPath();

            ctx.moveTo(_dataset[0].x, ymax * (1 - process) + _dataset[0].y * process);

            each(_dataset, item => {
                ctx.lineTo(item.x, ymax * (1 - process) + item.y * process);
            });
            
            ctx.stroke();
        }

        ctx.save();
    }

    /**
     * 折线图——交互——画点
     */
    drawPoint (x, y, color, strokeStyle) {
        let ctx = this.chartjs.ctx;

        ctx.beginPath();
        ctx.strokeStyle = strokeStyle || '#fff';
        ctx.lineWidth = 1;
        ctx.arc(x, y, 4, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
    }

    /**
     * 折线图——交互——事件交互展示
     */
    drawHover (x) {
        this.draw(null, true);

        let ctx = this.chartjs.ctx;

        if (x > this.chartjs._chart.width - 15 || x < 50) return false;

        let _index = Math.round((x - this.xBasic) / this.xRate);
        let _values = [];
        let _x;
        let pointsArr = [];
        
        // points
        if (this.chartjs.multline) {
            let _datasets = this.chartjs.datasets;

            each(_datasets, (item, index) => {
                if (!this.chartjs.opts.hideHoverPoints) {
                    pointsArr.push(() => {
                        this.drawPoint(item[_index].x, item[_index].y - 1, Config.line.colors[index]);
                    });                
                }
                _x = item[_index].x;
                _values.push(item[_index].value);
            });
        } else {
            let _dataset = this.chartjs.dataset;

            if (!this.chartjs.opts.hideHoverPoints) {
                pointsArr.push(() => {
                    this.drawPoint(_dataset[_index].x, _dataset[_index].y - 1, Config.line.colors[0]);
                });
            }
            _x = _dataset[_index].x;
            _values.push(_dataset[_index].value);
        }

        // line
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#999';
        ctx.beginPath();
        ctx.moveTo(_x, 6);
        ctx.lineTo(_x, this.chartjs._chart.height - 25);
        ctx.stroke();

        // points
        if (pointsArr.length) _.fn.each(pointsArr, draw => { draw() })
        
        if (this.chartjs.opts.hover) this.chartjs.opts.hover(_index, _values, this.chartjs.opts.xaxis[_index]);
        ctx.restore();
    }

    /**
     * 折线图——事件——event
     */
    setEvents () {
        this.chartjs.canvas.addEventListener('touchstart', e => {
            let x = e.touches[0].clientX;

            this.drawHover(x);
        }, false);

        this.chartjs.canvas.addEventListener('touchmove', e => {
            let x = e.touches[0].clientX;

            this.drawHover(x);
            return false;
        }, false);
    }

    /**
     * 折线图——总控
     */
    draw (databool, noanimatebool) {
        this.clearCtn(!databool);
        this.drawDashs();
        
        if (databool) {
            this.setDataset();
            this.drawTexts();
        }
        
        if (noanimatebool) this.drawLine();
        else {
            Animation({
                timing: 'easeInOut',
                duration: 400,
                onProcess: processrate => {
                    this.clearCtn(true);
                    this.drawDashs();
                    this.drawLine(processrate);
                },
                onAnimationFinish: () => {
                    console.log('chart finish');
                }
            });
        }
    }

    /**
     * init
     */
    init () {
        this.draw(true);
        if (!this.chartjs.opts.noHoverEvent) this.setEvents();
    }
}