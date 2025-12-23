/**
 * @config
 * @description FundCharts default configuration options
 * @author Wayne
 * @Date 2022-02-10 13:31:44
 * @LastEditTime 2025-07-03 10:06:12
 */

import { isWeapp, DEFAULT_GRID_CHART_PADDING } from 'fundcharts-core';

/**
 * Device pixel ratio for responsive rendering.
 * Uses 2 for WeChat Mini Program environment, 1 for web browsers.
 */
const DPR = isWeapp ? 2 : 1;

/**
 * Global default settings for FundCharts.
 *
 * This configuration object contains all the default options that apply to
 * charts globally. These settings can be overridden on a per-chart basis
 * when creating individual chart instances.
 *
 * @name FundCharts.defaultConfig
 * @type {Object}
 */
const Config = {
  /**
   * The unique identifier for the chart container element.
   * This ID is used to mount the chart to the specified DOM element.
   *
   * @type {string}
   * @default ''
   */
  id: '',

  /**
   * The background color of the chart. Can be any valid CSS color value
   * including rgba, hex, or named colors.
   *
   * @sample {fundcharts} charts/config/background-color/
   *         Custom background color
   *
   * @type {string}
   * @default 'rgba(0,0,0,0)'
   */
  backgroundColor: 'rgba(0,0,0,0)',

  /**
   * An array containing the default colors for the chart's series. When
   * all colors are used, new colors are pulled from the start again.
   *
   * Default colors can also be set on a series or series.type basis.
   *
   * @sample {fundcharts} charts/config/colors/
   *         Assign a global color theme
   *
   * @type {Array<string>}
   * @default [
   *     "#fe5d4e",
   *     "#43c2f7",
   *     "#707ad9",
   *     "#ffa61b",
   *     "#64d290",
   *     "#cf27bd"
   * ]
   */
  colors: [
    '#fe5d4e', // 红
    '#43c2f7', // 蓝
    '#707ad9', // 深蓝
    '#ffa61b', // 橙
    '#64d290', // 青
    '#cf27bd', // 紫
  ],

  /**
   * The duration of animations in milliseconds. This affects all
   * animated transitions including data updates, hover effects, and
   * initial rendering animations.
   *
   * @sample {fundcharts} charts/config/animation-duration/
   *         Custom animation duration
   *
   * @type {number}
   * @default 600
   */
  duration: 600,

  /**
   * An array of event names that the chart should listen to for
   * interactive features. By default, mobile touch events are enabled.
   *
   * @sample {fundcharts} charts/config/events/
   *         Custom event configuration
   *
   * @type {Array<string>}
   * @default ['touchstart', 'touchmove']
   */
  events: ['touchstart', 'touchmove'],

  /**
   * The color of the hover line that appears when hovering over
   * chart elements like data points or bars.
   *
   * @type {string}
   * @default '#999'
   */
  hoverLineColor: '#999',

  /**
   * The opacity level for highlighting elements on hover.
   * Values range from 0 (transparent) to 1 (opaque).
   *
   * @type {number}
   * @default 0.5
   */
  hoverHighlight: 0.5,

  /**
   * Configuration options for the chart grid.
   *
   * @optionparent grid
   */
  grid: {
    /**
     * The length of Y-axis tick marks in pixels.
     *
     * @type {number}
     * @default 5
     */
    yTickLength: 5,
  },

  /**
   * Configuration options specific to bar charts.
   *
   * @optionparent bar
   */
  bar: {
    /**
     * The margin around bar chart elements in pixels.
     * This value is automatically adjusted for device pixel ratio.
     *
     * @type {number}
     * @default 60 / DPR
     */
    margin: 60 / DPR,
  },

  /**
   * The top position of the chart area relative to the container.
   *
   * @type {number}
   * @default 0
   */
  chartTop: 0,

  /**
   * The left position of the chart area. Automatically adjusted
   * for device pixel ratio and default grid padding.
   *
   * @type {number}
   * @default DEFAULT_GRID_CHART_PADDING.left / DPR
   */
  chartLeft: DEFAULT_GRID_CHART_PADDING.left / DPR,

  /**
   * The right position of the chart area using default grid padding.
   *
   * @type {number}
   * @default DEFAULT_GRID_CHART_PADDING.right
   */
  chartRight: DEFAULT_GRID_CHART_PADDING.right,

  /**
   * Configuration options for dashed line styles.
   *
   * @optionparent dash
   */
  dash: {
    /**
     * The color of dashed lines used in various chart elements.
     *
     * @type {string}
     * @default '#e2e2e2'
     */
    color: '#e2e2e2',

    /**
     * The length of each dash segment in pixels.
     * This value is automatically adjusted for device pixel ratio.
     *
     * @type {number}
     * @default 3 / DPR
     */
    length: 3 / DPR,
  },

  /**
   * Configuration options for text rendering and typography.
   *
   * @optionparent font
   */
  font: {
    /**
     * The default color for all text elements in the chart.
     *
     * @type {string}
     * @default '#666'
     */
    color: '#666',

    /**
     * The font family to use for all text elements.
     *
     * @type {string}
     * @default 'Arial'
     */
    fontFamily: 'Arial',

    /**
     * Configuration for font sizes of different chart elements.
     *
     * @optionparent font.fontSize
     */
    fontSize: {
      /**
       * Font size for X-axis labels and text.
       *
       * @type {string}
       * @default '11px'
       */
      x: '11px',

      /**
       * Font size for Y-axis labels and text.
       *
       * @type {string}
       * @default '10px'
       */
      y: '10px',
    },
  },
};

export default Config;
