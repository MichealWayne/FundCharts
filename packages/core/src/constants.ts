/**
 * @constants
 * @description FundCharts core constants and default values
 * @author Wayne
 * @Date 2022-06-06 21:04:20
 * @LastEditTime 2022-08-05 14:15:23
 */

/**
 * Default canvas dimensions for chart rendering.
 * These values define the initial size of the chart canvas element
 * when no specific dimensions are provided.
 *
 * @name FundCharts.DEFAULT_CANVAS_SIZE
 * @type {Object}
 * @property {number} width - The default width of the chart canvas in pixels
 * @property {number} height - The default height of the chart canvas in pixels
 *
 * @sample {fundcharts} core/constants/canvas-size/
 *         Custom canvas dimensions
 *
 * @default {width: 500, height: 500}
 */
export const DEFAULT_CANVAS_SIZE = {
  /**
   * The default width of the chart canvas in pixels.
   * This value is used when no width is specified in the chart configuration.
   *
   * @type {number}
   * @default 500
   */
  width: 500,

  /**
   * The default height of the chart canvas in pixels.
   * This value is used when no height is specified in the chart configuration.
   *
   * @type {number}
   * @default 500
   */
  height: 500,
};

/**
 * Default padding values for the chart grid area.
 * These values define the spacing between the chart content and the canvas edges,
 * providing space for axes, labels, and other chart elements.
 *
 * @name FundCharts.DEFAULT_GRID_CHART_PADDING
 * @type {Object}
 * @property {number} top - Top padding in pixels
 * @property {number} right - Right padding in pixels
 * @property {number} bottom - Bottom padding in pixels
 * @property {number} left - Left padding in pixels
 *
 * @sample {fundcharts} core/constants/grid-padding/
 *         Custom grid padding configuration
 *
 * @default {top: 0, right: 15, bottom: 30, left: 50}
 */
export const DEFAULT_GRID_CHART_PADDING = {
  /**
   * Top padding for the chart grid area in pixels.
   * This space is reserved above the chart content for titles or other elements.
   *
   * @type {number}
   * @default 0
   */
  top: 0,

  /**
   * Right padding for the chart grid area in pixels.
   * This space is reserved on the right side for Y-axis labels and tick marks.
   *
   * @type {number}
   * @default 15
   */
  right: 15,

  /**
   * Bottom padding for the chart grid area in pixels.
   * This space is reserved below the chart content for X-axis labels and tick marks.
   *
   * @type {number}
   * @default 30
   */
  bottom: 30,

  /**
   * Left padding for the chart grid area in pixels.
   * This space is reserved on the left side for Y-axis labels and tick marks.
   *
   * @type {number}
   * @default 50
   */
  left: 50,
};

/**
 * Default animation duration for chart transitions and effects.
 * This value controls the speed of all animated transitions including
 * data updates, hover effects, and initial rendering animations.
 *
 * @name FundCharts.DEFAULT_ANIMATION_TIME
 * @type {number}
 *
 * @sample {fundcharts} core/constants/animation-time/
 *         Custom animation duration
 *
 * @default 600
 */
export const DEFAULT_ANIMATION_TIME = 600;
