/**
 * @author Wayne
 * @Date 2021-09-27 15:09:24
 * @LastEditTime 2023-06-24 19:18:16
 */
import { ID_PREFIX } from './constant';

export type AnyObj =
  | {
      [key: string]: unknown;
    }
  | Record<string, unknown>
  | Record<string, never>;

/**
 * @function capitalize
 * @description first character capitalize
 * @param {string} param0
 * @return {string}
 */
export const capitalize = (paramString: string) =>
  paramString.charAt(0).toUpperCase() + paramString.slice(1);

/**
 * @function generateId
 * @description get random id
 * @param {string} prefix
 * @return {string}
 */
export const generateId = (prefix = ID_PREFIX) => `${prefix}${String(Math.random()).slice(-8)}`;

/**
 * @function getDefaultContainerStyle
 * @param props
 * @returns
 */
export const getDefaultContainerStyle = (props?: AnyObj) => {
  const style = props?.style ? (props.style as Record<string, unknown>) : {};
  return {
    ...style,
    height: (props?.height as string) || '200px',
  };
};
