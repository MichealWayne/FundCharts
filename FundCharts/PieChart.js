import Pie from './charts/pie.draw'
import { retinaScale, setContext } from './utils/drawer'

export default class PieChart {
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

        retinaScale(canvas, ctx);
    }

    init () {
        setContext(this);
        this._retinaScale();

        this.drawer = new Pie(this);
        this.drawer.init();
    }
}