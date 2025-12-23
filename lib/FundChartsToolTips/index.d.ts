/**
 * FundCharts.ToolTips
 * @module Grid
 * @description Line/Bar/Scatter/Kline
 * @buildTime 2020.06
 */
/**
 * @function BasicToolTip
 * @description basic toolTip, no arrow
 * @fit Line/Bar
 */
declare const BasicToolTip: (index: number, values: number[], xaxis: string[], x: number, y: number) => void;
/**
 * @function ArrowToolTip
 * @description this toolTip has an arrow
 * @fit Line/Bar
 */
declare const ArrowToolTip: (index: number, values: number[], xaxis: string[], x: number, y: number) => void;
/**
 * @function KlineToolTip
 * @description Kline label.
 * @fit Kline
 */
declare const KlineToolTip: (index: number, values: number[], xaxis: string[], x: number, y: number) => void;

/**
 * FundCharts.ToolTips
 * @module Shape
 * @description Pie/Radar
 * @time 2020.06
 */
/**
 * @function PieCenterToolTip
 * @description basic
 * @fit Pie
 */
declare const PieCenterToolTip: (index: number, values: number[], xaxis: string[], x: number, y: number) => void;
/**
 * @function PieLabelToolTip
 * @description basic
 * @fit Pie
 */
declare const PieLabelToolTip: (index: number, values: number[], xaxis: string[], x: number, y: number) => void;
/**
 * @function LabelsToolTip
 * @description basic
 * @fit Pie
 */
declare const LabelsToolTip: (index: number, values: number[], xaxis: string[], x: number, y: number) => void;

/**
 * @author Wayne
 * @Date 2022-03-29 13:42:33
 * @LastEditTime 2022-07-19 15:34:43
 */

declare const _default: {
    BasicToolTip: (index: number, values: number[], xaxis: string[], x: number, y: number) => void;
    ArrowToolTip: (index: number, values: number[], xaxis: string[], x: number, y: number) => void;
    KlineToolTip: (index: number, values: number[], xaxis: string[], x: number, y: number) => void;
    PieCenterToolTip: (index: number, values: number[], xaxis: string[], x: number, y: number) => void;
    PieLabelToolTip: (index: number, values: number[], xaxis: string[], x: number, y: number) => void;
    LabelsToolTip: (index: number, values: number[], xaxis: string[], x: number, y: number) => void;
};

export { ArrowToolTip, BasicToolTip, KlineToolTip, LabelsToolTip, PieCenterToolTip, PieLabelToolTip, _default as default };
