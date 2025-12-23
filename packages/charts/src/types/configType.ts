/**
 * @types
 * @description FundCharts configuration type definitions and interfaces
 * @author Wayne
 * @Date 2021-10-12 11:47:52
 * @LastEditTime 2022-08-19 09:56:51
 */

import { AnyFunc } from 'fundcharts-core';

/**
 * Configuration options specific to bar charts.
 * These options control the visual appearance and behavior of bar chart elements.
 *
 * @name FundCharts.BarOption
 * @interface
 * @since 1.0.0
 */
export interface BarOption {
  /**
   * The margin around bar chart elements in pixels.
   * This value controls the spacing between bars and other chart elements.
   *
   * @type {number}
   * @default 60
   *
   * @sample {fundcharts} charts/types/bar-margin/
   *         Custom bar margin configuration
   */
  readonly margin: number;
}

/**
 * Configuration options for dashed line styles.
 * These options control the appearance of dashed lines used in grid lines,
 * trend lines, and other chart elements.
 *
 * @name FundCharts.DashOption
 * @interface
 * @since 1.0.0
 */
export interface DashOption {
  /**
   * The color of dashed lines used in various chart elements.
   * Can be any valid CSS color value including rgba, hex, or named colors.
   *
   * @type {string}
   * @default '#e2e2e2'
   *
   * @sample {fundcharts} charts/types/dash-color/
   *         Custom dash line color
   */
  readonly color: string;

  /**
   * The length of each dash segment in pixels.
   * This value controls the visual appearance of dashed lines.
   *
   * @type {number}
   * @default 3
   *
   * @sample {fundcharts} charts/types/dash-length/
   *         Custom dash segment length
   */
  readonly length: number;
}

/**
 * Configuration options for text rendering and typography.
 * These options control the appearance of all text elements in the chart
 * including labels, titles, and axis text.
 *
 * @name FundCharts.FontOption
 * @interface
 * @since 1.0.0
 */
export interface FontOption {
  /**
   * The default color for all text elements in the chart.
   * Can be any valid CSS color value.
   *
   * @type {string}
   * @default '#666'
   *
   * @sample {fundcharts} charts/types/font-color/
   *         Custom font color
   */
  readonly color: string;

  /**
   * Configuration for font sizes of different chart elements.
   * Allows separate control of X and Y axis text sizes.
   *
   * @type {Object}
   * @property {number|string} x - Font size for X-axis labels and text
   * @property {number|string} y - Font size for Y-axis labels and text
   *
   * @sample {fundcharts} charts/types/font-size/
   *         Custom font size configuration
   */
  readonly fontSize: {
    /**
     * Font size for X-axis labels and text.
     * Can be specified as a number (interpreted as pixels) or CSS string.
     *
     * @type {number|string}
     * @default '11px'
     */
    x: number | string;

    /**
     * Font size for Y-axis labels and text.
     * Can be specified as a number (interpreted as pixels) or CSS string.
     *
     * @type {number|string}
     * @default '10px'
     */
    y: number | string;
  };

  /**
   * The font family to use for all text elements.
   * Should be a valid CSS font-family value.
   *
   * @type {string}
   * @default 'Arial'
   *
   * @sample {fundcharts} charts/types/font-family/
   *         Custom font family
   */
  readonly fontFamily: string;
}

/**
 * Main configuration options for FundCharts.
 * This interface defines all available configuration options that can be
 * passed to chart instances. All properties are optional except for colors.
 *
 * @name FundCharts.Options
 * @interface
 * @since 1.0.0
 *
 * @sample {fundcharts} charts/types/basic-config/
 *         Basic configuration example
 * @sample {fundcharts} charts/types/advanced-config/
 *         Advanced configuration with all options
 */
export interface Options {
  /**
   * The background color of the chart container.
   * Can be any valid CSS color value including rgba, hex, or named colors.
   *
   * @type {string}
   * @optional
   * @default 'rgba(0,0,0,0)'
   *
   * @sample {fundcharts} charts/types/background-color/
   *         Custom background color
   */
  readonly backgroundColor?: string;

  /**
   * An array containing the colors for the chart's series.
   * When all colors are used, new colors are pulled from the start again.
   * This property is required and must contain at least one color.
   *
   * @type {Array<string>}
   * @required
   *
   * @sample {fundcharts} charts/types/color-palette/
   *         Custom color palette
   */
  readonly colors: Array<string>;

  /**
   * Configuration options specific to bar charts.
   * Only applies when rendering bar chart types.
   *
   * @type {BarOption}
   * @optional
   *
   * @sample {fundcharts} charts/types/bar-config/
   *         Bar chart specific configuration
   */
  readonly bar?: BarOption;

  /**
   * Configuration options for dashed line styles.
   * Controls the appearance of dashed lines throughout the chart.
   *
   * @type {DashOption}
   * @optional
   *
   * @sample {fundcharts} charts/types/dash-config/
   *         Dash line configuration
   */
  readonly dash?: DashOption;

  /**
   * Configuration options for text rendering and typography.
   * Controls the appearance of all text elements in the chart.
   *
   * @type {FontOption}
   * @optional
   *
   * @sample {fundcharts} charts/types/font-config/
   *         Font configuration
   */
  readonly font?: FontOption;

  /**
   * An array of event names that the chart should listen to.
   * By default, mobile touch events are enabled.
   *
   * @type {Array<string>}
   * @optional
   * @default ['touchstart', 'touchmove']
   *
   * @sample {fundcharts} charts/types/events-config/
   *         Custom event configuration
   */
  readonly events?: Array<string>;

  /**
   * The color of the hover line that appears when hovering over chart elements.
   *
   * @type {string}
   * @optional
   * @default '#999'
   *
   * @sample {fundcharts} charts/types/hover-line-color/
   *         Custom hover line color
   */
  readonly hoverLineColor?: string;

  /**
   * Index signature to allow additional properties.
   * This enables extensibility for future configuration options.
   *
   * @type {any}
   * @optional
   */
  [propName: string]: any;
}

/**
 * Configuration state interface that extends the main Options interface.
 * This interface is used internally by the chart engine to maintain
 * the current configuration state.
 *
 * @name FundCharts.ConfigState
 * @interface
 * @extends Options
 * @since 1.0.0
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConfigState extends Options {}

/**
 * Error state interface for handling chart errors and exceptions.
 * Provides a standardized way to handle and report chart-related errors.
 *
 * @name FundCharts.ErrorState
 * @interface
 * @since 1.0.0
 * @private
 */
export interface ErrorState {
  /**
   * Function to handle content-related errors.
   * This function is called when chart content cannot be rendered
   * or when data processing fails.
   *
   * @type {AnyFunc}
   * @required
   *
   * @sample {fundcharts} charts/types/error-handling/
   *         Custom error handling
   */
  contain: AnyFunc;
}
