/*
 * FundChart 个基折线图
 * @author: Micheal Wayne
 * @build time: 2018.08.16
 */

import { cloneObjDeep } from './utils/base'
import { getStyle } from './utils/doms'
import Draw from './charts/line.draw'

export default class LineChart {
    constructor (options = {}) {
        let {
            id
        } = options
        if (!id) throw new Error('Error!no container id in options.(FundChart)');
        this.$el = document.getElementById(id);
        this.$el.style.webkitUserSelect = 'none';
        this.$el.style.userSelect = 'none';
    
        this.opts = options;
    }

    /*
     * 设置布局
     */
    _setContext () {
        let _canvas = document.createElement('canvas');
        _canvas.id = this.opts.id + 'Canvas';
        _canvas.width = getStyle(this.$el, 'width');
        _canvas.height = getStyle(this.$el, 'height');

        this.$el.appendChild(_canvas);
        this.canvas = _canvas;
        this.ctx = _canvas.getContext('2d');
        this._chart = {
            width: _canvas.width,
            height: _canvas.height
        };
    }

    /*
     * 适配手机
     */
    _retinaScale () {
        let canvas = this.canvas,
            ctx = this.ctx;

        const pixelRatio = window.devicePixelRatio || 1;

        if (pixelRatio === 1) return false;
        let height = canvas.height;
        let width = canvas.width;

        canvas.height = height * pixelRatio;
        canvas.width = width * pixelRatio;
        ctx.scale(pixelRatio, pixelRatio);

        canvas.style.height = height + 'px';
        canvas.style.width = width + 'px';
    }

    /*
     * 更新内容
     */
    update (options) {
        if (!options) return false;
        this.opts = cloneObjDeep(this.opts, options);

        this.drawer.draw(true);
    }

    init () {
        this._setContext();
        this._retinaScale();

        this.drawer = new Draw(this);
        this.drawer.init();
    }
}