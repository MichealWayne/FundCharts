/**
 * @types
 * @description FundCharts ToolTip type definitions and interfaces
 * @author Wayne
 * @Date 2022-03-29 13:42:33
 * @LastEditTime 2025-06-21 15:28:43
 */

/**
 * Represents a 2D coordinate point with x and y coordinates.
 * Used for positioning tooltips, data points, and other chart elements.
 *
 * @name FundCharts.PointPosition
 * @interface
 * @since 1.0.0
 */
export interface PointPosition {
  /**
   * The horizontal coordinate (x-axis position).
   *
   * @type {number}
   * @required
   */
  x: number;

  /**
   * The vertical coordinate (y-axis position).
   *
   * @type {number}
   * @required
   */
  y: number;
}

/**
 * An array of coordinate points.
 * Used to represent multiple data points or path segments.
 *
 * @name FundCharts.PointsMap
 * @type {PointPosition[]}
 * @since 1.0.0
 */
export type PointsMap = PointPosition[];

/**
 * Parameters for drawing points on canvas.
 * Contains all necessary information for rendering individual data points.
 *
 * @name FundCharts.PointDrawParams
 * @interface
 * @since 1.0.0
 */
export interface PointDrawParams {
  /**
   * The canvas rendering context for drawing operations.
   *
   * @type {CanvasRenderingContext2D}
   * @required
   */
  ctx: CanvasRenderingContext2D;

  /**
   * The x-coordinate for the point position.
   *
   * @type {number}
   * @required
   */
  x: number;

  /**
   * The y-coordinate for the point position.
   *
   * @type {number}
   * @required
   */
  y: number;

  /**
   * The fill color for the point.
   * Can be any valid CSS color value.
   *
   * @type {string}
   * @required
   */
  color: string;

  /**
   * The stroke color for the point border.
   * Can be any valid CSS color value.
   *
   * @type {string}
   * @required
   */
  strokeColor: string;

  /**
   * The width/size of the point in pixels.
   *
   * @type {number}
   * @required
   */
  width: number;

  /**
   * The stroke width of the point border in pixels.
   *
   * @type {number}
   * @required
   */
  strokeWidth: number;
}

/**
 * Extended canvas rendering context for WeChat Mini Program environment.
 * Adds the `draw` method required by WeChat Mini Program canvas API.
 *
 * @name FundCharts.WeappCanvasRenderingContext2D
 * @interface
 * @extends CanvasRenderingContext2D
 * @since 1.0.0
 * @private
 */
export interface WeappCanvasRenderingContext2D extends CanvasRenderingContext2D {
  /**
   * WeChat Mini Program specific draw method.
   * This method is called to execute the drawing commands.
   *
   * @type {Function}
   * @param {...any[]} args - Drawing command arguments
   * @returns {void}
   */
  draw: (...args: any[]) => void;
}

/**
 * Configuration options for tooltip rendering and behavior.
 * Controls the appearance, positioning, and content of tooltips.
 *
 * @name FundCharts.ToolTipConfig
 * @interface
 * @since 1.0.0
 *
 * @sample {fundcharts} tooltips/types/basic-config/
 *         Basic tooltip configuration
 * @sample {fundcharts} tooltips/types/custom-renderers/
 *         Custom tooltip renderers
 */
export interface ToolTipConfig {
  /**
   * Width of the tooltip box in pixels.
   *
   * @type {number}
   * @optional
   * @default 70
   */
  width?: number;

  /**
   * Height of the tooltip box in pixels.
   *
   * @type {number}
   * @optional
   * @default 20
   */
  height?: number;

  /**
   * Font specification for tooltip text.
   * Uses CSS font shorthand format.
   *
   * @type {string}
   * @optional
   * @default '10px Arial'
   */
  font?: string;

  /**
   * Text color for tooltip content.
   *
   * @type {string}
   * @optional
   * @default '#fff'
   */
  color?: string;

  /**
   * Background color of the tooltip box.
   *
   * @type {string}
   * @optional
   * @default '#bdbdbd'
   */
  backgroundColor?: string;

  /**
   * Text alignment within the tooltip.
   *
   * @type {CanvasTextAlign}
   * @optional
   * @default 'center'
   */
  textAlign?: CanvasTextAlign;

  /**
   * Custom function to generate tooltip content.
   * Receives the data object and returns formatted string content.
   *
   * @type {Function}
   * @param {any} data - The data object for the tooltip
   * @returns {string} Formatted tooltip content
   * @optional
   *
   * @sample {fundcharts} tooltips/types/custom-content/
   *         Custom tooltip content
   */
  showTip?: (data: any) => string;

  /**
   * Custom function to format value display in tooltips.
   * Receives a numeric value and returns formatted string.
   *
   * @type {Function}
   * @param {number} value - The numeric value to format
   * @returns {string} Formatted value string
   * @optional
   *
   * @sample {fundcharts} tooltips/types/value-formatting/
   *         Custom value formatting
   */
  showValTip?: (value: number) => string;

  /**
   * Top position offset for tooltip placement.
   *
   * @type {number}
   * @optional
   */
  top?: number;

  /**
   * Width of X-axis tooltip element.
   *
   * @type {number}
   * @optional
   */
  xWidth?: number;

  /**
   * Height of X-axis tooltip element.
   *
   * @type {number}
   * @optional
   */
  xHeight?: number;

  /**
   * Width of Y-axis tooltip element.
   *
   * @type {number}
   * @optional
   */
  yWidth?: number;

  /**
   * Height of Y-axis tooltip element.
   *
   * @type {number}
   * @optional
   */
  yHeight?: number;

  /**
   * Color for value text in tooltips.
   *
   * @type {string}
   * @optional
   * @default '#eee'
   */
  valColor?: string;

  /**
   * Y-coordinate for value text positioning.
   *
   * @type {number}
   * @optional
   */
  valY?: number;

  /**
   * X-coordinate for value text positioning.
   *
   * @type {number}
   * @optional
   */
  valX?: number;
}

/**
 * Data structure for tooltip information.
 * Contains the data and positioning information needed for tooltip rendering.
 *
 * @name FundCharts.ToolTipData
 * @interface
 * @since 1.0.0
 */
export interface ToolTipData {
  /**
   * X-axis data label or category.
   *
   * @type {string}
   * @required
   */
  xData: string;

  /**
   * Array of Y-axis data values.
   * Contains the actual data points for the tooltip.
   *
   * @type {number[]}
   * @required
   */
  yDatas: number[];

  /**
   * X-coordinate position for tooltip placement.
   *
   * @type {number}
   * @required
   */
  xPos: number;

  /**
   * Y-coordinate position for tooltip placement.
   *
   * @type {number}
   * @required
   */
  yPos: number;

  /**
   * Index of the data point in the dataset.
   *
   * @type {number}
   * @required
   */
  index: number;
}

/**
 * Complete context for tooltip rendering.
 * Contains all necessary information for tooltip rendering including
 * canvas context, chart options, and drawing utilities.
 *
 * @name FundCharts.ToolTipContext
 * @interface
 * @since 1.0.0
 * @private
 */
export interface ToolTipContext {
  /**
   * Canvas rendering context for drawing operations.
   *
   * @type {CanvasRenderingContext2D}
   * @required
   */
  ctx: CanvasRenderingContext2D;

  /**
   * Chart options and configuration.
   *
   * @type {Object}
   * @property {ToolTipConfig} toolTip - Tooltip configuration options
   * @property {number} chartLeft - Left boundary of chart area
   * @property {number} chartRight - Right boundary of chart area
   * @property {number} chartTop - Top boundary of chart area
   * @property {string[]} colors - Array of chart colors
   * @property {number[]} widthRates - Optional width rate multipliers
   * @required
   */
  opts: {
    toolTip?: ToolTipConfig;
    chartLeft: number;
    chartRight: number;
    chartTop: number;
    colors: string[];
    widthRates?: number[];
  };

  /**
   * Chart dimensions and metadata.
   *
   * @type {Object}
   * @property {number} width - Chart width in pixels
   * @property {number} height - Chart height in pixels
   * @required
   */
  _chart: {
    width: number;
    height: number;
  };

  /**
   * Array of data point collections.
   * Each element represents a series of data points.
   *
   * @type {PointsMap[]}
   * @required
   */
  datasets: PointsMap[];

  /**
   * Drawing utilities and coordinate system information.
   *
   * @type {Object}
   * @property {number} zeroY - Y-coordinate of zero line
   * @property {PointPosition} origin - Origin point coordinates
   * @property {number} radius - Radius for circular charts
   * @property {number[]} centerArr - Center point array
   * @property {number} yBasic - Basic Y-axis value
   * @property {number} yRate - Y-axis rate multiplier
   * @required
   */
  drawer: {
    zeroY?: number;
    origin: PointPosition;
    radius: number;
    centerArr: number[];
    yBasic: number;
    yRate: number;
  };

  /**
   * Width of bar elements for bar charts.
   *
   * @type {number}
   * @optional
   */
  barWidth?: number;

  /**
   * Side positioning flag for tooltip placement.
   *
   * @type {boolean}
   * @optional
   */
  side?: boolean;

  /**
   * Raw dataset array.
   *
   * @type {any[]}
   * @optional
   */
  dataset?: any[];
}

/**
 * Function type for custom tooltip rendering.
 * Receives tooltip context and data, performs custom rendering logic.
 *
 * @name FundCharts.ToolTipRenderer
 * @type {Function}
 * @param {ToolTipContext} context - Complete tooltip rendering context
 * @param {ToolTipData} data - Tooltip data and positioning information
 * @returns {void}
 * @since 1.0.0
 *
 * @sample {fundcharts} tooltips/types/custom-renderer/
 *         Custom tooltip renderer implementation
 */
export type ToolTipRenderer = (context: ToolTipContext, data: ToolTipData) => void;

/**
 * Environment detection information.
 * Contains flags and values for different runtime environments.
 *
 * @name FundCharts.Environment
 * @interface
 * @since 1.0.0
 */
export interface Environment {
  /**
   * Flag indicating if running in WeChat Mini Program environment.
   *
   * @type {boolean}
   * @required
   */
  isWeapp: boolean;

  /**
   * Device pixel ratio for high DPI display support.
   *
   * @type {number}
   * @required
   */
  dpr: number;
}

/**
 * Configuration constants for tooltip rendering.
 * Contains default values and constants used throughout tooltip system.
 *
 * @name FundCharts.ConfigConstants
 * @interface
 * @since 1.0.0
 */
export interface ConfigConstants {
  /**
   * Mathematical constant for circular calculations (2π).
   *
   * @type {number}
   * @required
   * @default Math.PI * 2
   */
  circularAngle: number;

  /**
   * Default tooltip width in pixels.
   *
   * @type {number}
   * @required
   * @default 70
   */
  width: number;

  /**
   * Default tooltip height in pixels.
   *
   * @type {number}
   * @required
   * @default 20
   */
  height: number;

  /**
   * Default font specification for tooltip text.
   *
   * @type {string}
   * @required
   * @default '10px Arial'
   */
  font: string;

  /**
   * Font specification for pie chart tooltips.
   *
   * @type {string}
   * @required
   * @default 'bold 22px Arial'
   */
  pieFont: string;

  /**
   * Font specification for tooltip labels.
   *
   * @type {string}
   * @required
   * @default 'bold 12px Arial'
   */
  labelFont: string;

  /**
   * Default text alignment for tooltip content.
   *
   * @type {CanvasTextAlign}
   * @required
   * @default 'center'
   */
  textAlign: CanvasTextAlign;

  /**
   * Color configuration for tooltip elements.
   *
   * @type {Object}
   * @property {string} color - Text color for general content
   * @property {string} backgroundColor - Background color of tooltip box
   * @property {string} valColor - Text color for value display
   * @required
   */
  colors: {
    /**
     * Text color for general tooltip content.
     *
     * @type {string}
     * @default '#fff'
     */
    color: string;

    /**
     * Background color of the tooltip box.
     *
     * @type {string}
     * @default '#bdbdbd'
     */
    backgroundColor: string;

    /**
     * Text color for value display in tooltips.
     *
     * @type {string}
     * @default '#eee'
     */
    valColor: string;
  };
}
