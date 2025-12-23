declare type AnyObj = {
    [key: string]: unknown;
} | Record<string, unknown> | Record<string, never>;
/**
 * @function capitalize
 * @description first character capitalize
 * @param {string} param0
 * @return {string}
 */
declare const capitalize: (paramString: string) => string;
/**
 * @function generateId
 * @description get random id
 * @param {string} prefix
 * @return {string}
 */
declare const generateId: (prefix?: string) => string;
/**
 * @function getDefaultContainerStyle
 * @param props
 * @returns
 */
declare const getDefaultContainerStyle: (props?: AnyObj) => {
    height: string;
};

/**
 * @constnt
 */
declare const ID_PREFIX = "fundcharts-";

/**
 * FundCharts for ReactJS
 * (React v16.x+)
 * @author Wayne
 * @Date 2021-09-27 15:08:56
 * @LastEditTime 2023-06-24 20:33:14
 * @example
 * import { line } from './fundchart-react'
 * class LineDemo extends Component {
 *  render () {
 *    return (
 *      <Line axis={['1-11', '2-11', '3-11']} datas={[[1, 2, 3], [3, 4, 5]]}/>
 *      )
 *  }
 * }
 */

declare const FundCharts$1: AnyObj;

/**
 * FundCharts-vue
 * @author Wayne
 * @Date 2021-09-27 15:08:56
 * @LastEditTime 2023-06-24 20:33:14
 */

declare const FundCharts: AnyObj;

/**
 * @file index.ts - Main entry point for components package
 * @author Wayne
 * @date 2025-07-18
 */

declare type ComponentsType = Record<string, unknown>;

export { AnyObj, ComponentsType, ID_PREFIX, FundCharts$1 as ReactComponents, FundCharts as VueComponents, capitalize, generateId, getDefaultContainerStyle };
