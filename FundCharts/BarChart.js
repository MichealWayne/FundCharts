import Bar from './charts/bar.draw'
import { retinaScale, setContext } from './utils/drawer'
import { cloneObjDeep } from './utils/base'

export default class BarChart {
    constructor(options = {}) {
        let {
            id
        } = options;

        if (!id) throw new Error('Error!no container id in options.(FundChart)');

        this.$el = document.getElementById(id);

        options.colors = options.colors || [];
        this.opts = options;
    }

    /*
     * 适配手机
     */
    _retinaScale () {
        let canvas = this.canvas,
            ctx = this.ctx;

        this.pixelRatio = retinaScale(canvas, ctx);
    }

    /**
     * 更新内容
     */
    update (options) {
        if (!options) return false;
        this.opts = cloneObjDeep(this.opts, options);

        this.drawer.draw(true);
    }

    init () {
        setContext(this);
        this._retinaScale();

        this.drawer = new Bar(this);
        this.drawer.init();
    }
}