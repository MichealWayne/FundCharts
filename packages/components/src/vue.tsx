/**
 * FundCharts-vue
 * @author Wayne
 * @Date 2021-09-27 15:08:56
 * @LastEditTime 2023-06-24 20:33:14
 */

import * as fundcharts from 'fundcharts';
import { AnyObj, capitalize, generateId } from './utils';

function wrap(ChartFactory: any) {
  const id = generateId();
  return {
    template: `<div :style="{height}" ref="${id}" :id="id"></div>`,
    data() {
      return {
        charter: '',
        id,
      };
    },
    props: {
      prefix: {
        type: String,
      },
      height: {
        type: String,
        default: '200px',
      },
      options: {
        type: Object,
        default: {},
      },
    },
    watch: {
      options(newVal: AnyObj) {
        if (newVal && this.charter) {
          try {
            this.charter.update(newVal);
          } catch (error) {
            console.error('FundCharts Vue component update error:', error);
          }
        }
      },
    },
    beforeMount() {
      if (this.prefix) this.id = this.prefix;
    },
    mounted() {
      if (this.$refs[id] && !this.charter) {
        try {
          const _id = this.id;
          const _charter = new ChartFactory({
            id: _id,
            ...this.options,
          });
          _charter.init();
          this.charter = _charter;
        } catch (error) {
          console.error('FundCharts Vue component initialization error:', error);
        }
      }
    },
    unmounted() {
      try {
        this.charter?.destroy();
      } catch (error) {
        console.error('FundCharts Vue component cleanup error:', error);
      }
    },
  };
}

const FundCharts: AnyObj = {} as AnyObj;
for (const key in fundcharts) {
  if (Object.prototype.hasOwnProperty.call(fundcharts, key)) {
    FundCharts[capitalize(key)] = wrap(fundcharts[key as keyof typeof fundcharts]);
  }
}

export default FundCharts;
