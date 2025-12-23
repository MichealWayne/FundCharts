/*
 * @author Wayne
 * @Date 2025-07-18 16:19:04
 * @LastEditTime 2025-07-18 20:26:56
 */
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

import React, { useRef, useState, useEffect } from 'react';
import * as fundcharts from 'fundcharts';

import { AnyObj, capitalize, generateId, getDefaultContainerStyle } from './utils';

const wrap =
  (ChartFactory: any) =>
  ({ prefix, options, ...props }: { prefix?: string; options: AnyObj }) => {
    const ref = useRef();
    const [id] = useState(generateId(prefix));
    const [charter, setCharter] = useState(null);

    useEffect(() => {
      if (ref.current) {
        try {
          if (!charter) {
            const _charter = new ChartFactory({
              id,
              ...options,
              ...props,
            });
            _charter.init();
            setCharter(_charter);
          } else {
            charter.update({
              ...options,
              ...props,
            });
          }
        } catch (error) {
          console.error('FundCharts React component initialization error:', error);
        }
      }
      return () => {
        try {
          charter?.destroy();
        } catch (error) {
          console.error('FundCharts React component cleanup error:', error);
        }
      };
    }, [ref, id, options, charter, props]);

    return React.createElement('div', {
      style: getDefaultContainerStyle(props as AnyObj),
      id: id,
      ref: ref,
    });
  };

const FundCharts: AnyObj = {} as AnyObj;
for (const key in fundcharts) {
  if (Object.prototype.hasOwnProperty.call(fundcharts, key)) {
    FundCharts[capitalize(key)] = wrap(fundcharts[key as keyof typeof fundcharts]);
  }
}

export default FundCharts;
