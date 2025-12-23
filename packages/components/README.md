# FundCharts Components

轻量级的 React/Vue 图表组件库，基于 [FundCharts](https://github.com/MichealWayne/FundCharts) 封装。

## 特性

- 🚀 **轻量级**：无第三方依赖，体积小
- ⚛️ **多框架支持**：同时支持 React 和 Vue
- 📱 **移动端优化**：专为移动端设计，支持触摸交互
- 🔧 **简单易用**：简洁的 API，开箱即用
- 🎯 **兼容性强**：支持 Chrome49+、iOS11+、Android5+

## 安装

```bash
npm install fundcharts-components
```

## 快速开始

### React 使用方式

```jsx
import React from 'react';
import FundCharts from 'fundcharts-components/dist/react';

// 使用解构获取图表组件
const { Line, Bar, Pie } = FundCharts;

function App() {
  return (
    <div>
      <Line 
        axis={['1月', '2月', '3月', '4月']}
        datas={[[120, 200, 150, 80]]}
        height="300px"
      />
      
      <Bar 
        axis={['A', 'B', 'C', 'D']}
        datas={[[20, 40, 30, 50]]}
        height="300px"
      />
    </div>
  );
}
```

### Vue 使用方式

```vue
<template>
  <div>
    <Line 
      :axis="['1月', '2月', '3月', '4月']"
      :datas="[[120, 200, 150, 80]]"
      height="300px"
    />
    
    <Bar 
      :axis="['A', 'B', 'C', 'D']"
      :datas="[[20, 40, 30, 50]]"
      height="300px"
    />
  </div>
</template>

<script>
import FundCharts from 'fundcharts-components/dist/vue';

export default {
  components: {
    Line: FundCharts.Line,
    Bar: FundCharts.Bar,
  }
}
</script>
```

## 支持的图表类型

| 图表类型 | 组件名 | 描述 |
|----------|--------|------|
| 折线图   | Line   | 支持单条/多条折线，可配置为面积图 |
| 柱状图   | Bar    | 支持垂直/水平柱状图，可配置堆叠 |
| 饼图     | Pie    | 支持环形图，可配置内外半径 |
| 雷达图   | Radar  | 支持多维度数据展示 |
| 散点图   | Scatter| 支持大数据量散点展示 |
| K线图    | Kline  | 支持股票K线数据展示 |
| 组合图   | Combo  | 支持多种图表组合展示 |

## 通用参数

### 基础参数

| 参数名   | 类型   | 默认值 | 说明 |
|----------|--------|--------|------|
| axis     | array  | -      | X轴标签数据 |
| datas    | array  | -      | 图表数据，二维数组 |
| height   | string | '200px'| 图表高度 |
| options  | object | {}     | FundCharts原生配置 |
| prefix   | string | -      | DOM ID前缀 |

### 事件处理

```jsx
// React示例
<Line 
  axis={['1月', '2月', '3月']}
  datas={[[100, 200, 150]]}
  hover={(index, values, xaxis) => {
    console.log('当前索引:', index);
    console.log('当前值:', values[0]);
    console.log('当前标签:', xaxis);
  }}
/>
```

## 高级配置

通过 `options` 参数可以使用 FundCharts 的所有原生配置：

```jsx
<Line 
  axis={['1月', '2月', '3月', '4月']}
  datas={[[120, 200, 150, 80]]}
  options={{
    color: ['#1890ff', '#52c41a'],
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%'
    },
    tooltip: {
      show: true,
      formatter: '{b}: {c}'
    }
  }}
/>
```

## 浏览器兼容性

- Chrome 49+
- Safari iOS 11+
- Android WebView 5+
- 微信内置浏览器 7.0+

## 注意事项

1. **容器高度**：必须设置容器高度，否则图表无法正常显示
2. **数据格式**：`datas` 必须是二维数组，即使只有一条数据
3. **响应式**：图表会根据容器大小自动调整，但需要在容器尺寸变化后手动调用 `resize()`

## 问题反馈

如遇到问题，请通过以下方式反馈：
- GitHub Issues: [提交issue](https://github.com/MichealWayne/FundCharts-components/issues)
- 邮箱: michealwayne@163.com

## 许可证

MIT License