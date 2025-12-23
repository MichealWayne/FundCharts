/**
 * @config
 * @description FundCharts ToolTip configuration and environment detection
 * @author Wayne
 * @Date 2022-03-29 13:42:33
 * @LastEditTime 2025-07-03 10:12:45
 */

import { Environment, ConfigConstants } from './types';

/**
 * Detects if the current environment is WeChat Mini Program.
 * This detection is used to determine the appropriate rendering approach
 * and device pixel ratio calculation method.
 *
 * @name FundCharts.isWeapp
 * @type {boolean}
 * @readonly
 * @since 1.0.0
 *
 * @sample {fundcharts} tooltips/config/environment-detection/
 *         Environment detection usage
 */
const isWeapp = typeof wx !== 'undefined' && typeof wx.getSystemInfoSync !== 'undefined';

/**
 * Gets the device pixel ratio for the current environment.
 * This function handles both web browser and WeChat Mini Program environments,
 * returning the appropriate pixel ratio for high DPI displays.
 *
 * @name FundCharts.getDevicePixelRatio
 * @function
 * @returns {number} The device pixel ratio (1 for normal displays, 2+ for high DPI displays)
 * @since 1.0.0
 *
 * @sample {fundcharts} tooltips/config/device-pixel-ratio/
 *         Device pixel ratio calculation
 */
const getDevicePixelRatio = (): number => {
  if (isWeapp) {
    return wx.getSystemInfoSync().pixelRatio || 1;
  }
  return window.devicePixelRatio || 1;
};

/**
 * Default configuration for FundCharts ToolTips.
 * This configuration object contains all the default settings for tooltip
 * rendering, styling, and environment-specific behavior.
 *
 * @name FundCharts.tooltipConfig
 * @type {Environment & ConfigConstants}
 * @since 1.0.0
 *
 * @sample {fundcharts} tooltips/config/basic-config/
 *         Basic tooltip configuration
 * @sample {fundcharts} tooltips/config/custom-styles/
 *         Custom tooltip styling
 */
const config: Environment & ConfigConstants = {
  /**
   * Environment detection flag indicating if running in WeChat Mini Program.
   * This affects rendering behavior and pixel ratio calculation.
   *
   * @type {boolean}
   * @readonly
   * @default Determined by environment detection
   */
  isWeapp,

  /**
   * Device pixel ratio for high DPI display support.
   * This value is used to scale tooltip elements appropriately
   * for different display densities.
   *
   * @type {number}
   * @readonly
   * @default Calculated by getDevicePixelRatio()
   */
  dpr: getDevicePixelRatio(),

  /**
   * Mathematical constant for circular calculations.
   * Used for pie chart tooltip positioning and circular animations.
   *
   * @type {number}
   * @readonly
   * @default Math.PI * 2
   */
  circularAngle: Math.PI * 2,

  /**
   * Default width of the tooltip box in pixels.
   * This value is used when no specific width is provided.
   *
   * @type {number}
   * @default 70
   *
   * @sample {fundcharts} tooltips/config/tooltip-dimensions/
   *         Custom tooltip dimensions
   */
  width: 70,

  /**
   * Default height of the tooltip box in pixels.
   * This value is used when no specific height is provided.
   *
   * @type {number}
   * @default 20
   *
   * @sample {fundcharts} tooltips/config/tooltip-dimensions/
   *         Custom tooltip dimensions
   */
  height: 20,

  /**
   * Default font specification for general tooltip text.
   * Uses CSS font shorthand format.
   *
   * @type {string}
   * @default '10px Arial'
   *
   * @sample {fundcharts} tooltips/config/font-styles/
   *         Custom font styles
   */
  font: '10px Arial',

  /**
   * Font specification for pie chart tooltip text.
   * Uses bold weight and larger size for better visibility on pie charts.
   *
   * @type {string}
   * @default 'bold 22px Arial'
   *
   * @sample {fundcharts} tooltips/config/pie-tooltip-styles/
   *         Custom pie chart tooltip styles
   */
  pieFont: 'bold 22px Arial',

  /**
   * Font specification for tooltip labels.
   * Uses bold weight for emphasis on label text.
   *
   * @type {string}
   * @default 'bold 12px Arial'
   *
   * @sample {fundcharts} tooltips/config/label-styles/
   *         Custom label styles
   */
  labelFont: 'bold 12px Arial',

  /**
   * Text alignment for tooltip content.
   * Controls how text is aligned within the tooltip box.
   *
   * @type {string}
   * @default 'center'
   *
   * @sample {fundcharts} tooltips/config/text-alignment/
   *         Custom text alignment
   */
  textAlign: 'center',

  /**
   * Color configuration for tooltip elements.
   * Defines the color scheme used for different parts of the tooltip.
   *
   * @type {Object}
   * @property {string} color - Text color for general tooltip content
   * @property {string} backgroundColor - Background color of the tooltip box
   * @property {string} valColor - Text color for value display
   *
   * @sample {fundcharts} tooltips/config/color-scheme/
   *         Custom color scheme
   * @sample {fundcharts} tooltips/config/theme-colors/
   *         Theme-based colors
   */
  colors: {
    /**
     * Text color for general tooltip content.
     * Used for labels, descriptions, and other text elements.
     *
     * @type {string}
     * @default '#fff'
     *
     * @sample {fundcharts} tooltips/config/text-colors/
     *         Custom text colors
     */
    color: '#fff',

    /**
     * Background color of the tooltip box.
     * This color fills the tooltip container background.
     *
     * @type {string}
     * @default '#bdbdbd'
     *
     * @sample {fundcharts} tooltips/config/background-colors/
     *         Custom background colors
     */
    backgroundColor: '#bdbdbd',

    /**
     * Text color for value display in tooltips.
     * Used specifically for highlighting data values.
     *
     * @type {string}
     * @default '#eee'
     *
     * @sample {fundcharts} tooltips/config/value-colors/
     *         Custom value colors
     */
    valColor: '#eee',
  },
};

export default config;
