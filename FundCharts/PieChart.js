/*
 * PieChart 饼图
 * @author: Micheal Wayne
 * @build time: 2018.08.16
 */


import Pie from './charts/pie.draw'
import { retinaScale, setContext } from './utils/drawer'
import { inBrowser } from './config'

export default class PieChart {
    constructor(options = {}) {
        let {
            id
        } = options;

        if (!id) throw new Error('Error!no container id in options.(FundChart)');

        if (inBrowser) this.$el = document.getElementById(id);

        options.colors = options.colors || [];
        this.opts = options;
    }

    /*
     * 适配手机
     */
    _retinaScale () {
        let canvas = this.canvas,
            ctx = this.ctx;

        retinaScale(canvas, ctx);
    }

    init () {
        setContext(this, inBrowser);
        if (inBrowser) this._retinaScale();

        this.drawer = new Pie(this);
        this.drawer.init();
    }
}