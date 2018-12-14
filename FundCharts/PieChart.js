import Pie from './charts/pie.draw'
import { getStyle } from './utils/doms'

export default class PieChart {
    constructor(options = {}) {
        let {
            id
        } = options;

        if (!id) throw new Error('Error!no container id in options.(FundChart)');

        this.$el = document.getElementById(id);
        this.$el.style.webkitUserSelect = 'none';
        this.$el.style.userSelect = 'none';

        options.colors = options.colors || [];
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

    init () {
        this._setContext();
        this._retinaScale();

        this.drawer = new Pie(this);
        this.drawer.init();
    }
}