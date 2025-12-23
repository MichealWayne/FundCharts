# FundCharts Components

A lightweight React/Vue chart component library based on [FundCharts](https://github.com/MichealWayne/FundCharts).

## Features

- 🚀 **Lightweight**: No third-party dependencies, small bundle size
- ⚛️ **Multi-framework**: Supports both React and Vue
- 📱 **Mobile-optimized**: Designed for mobile with touch interaction support
- 🔧 **Easy to use**: Simple API, plug-and-play
- 🎯 **High compatibility**: Supports Chrome49+, iOS11+, Android5+

## Installation

```bash
npm install fundcharts-components
```

## Quick Start

### React Usage

```jsx
import React from 'react';
import FundCharts from 'fundcharts-components/dist/react';

// Destructure chart components
const { Line, Bar, Pie } = FundCharts;

function App() {
  return (
    <div>
      <Line 
        axis={['Jan', 'Feb', 'Mar', 'Apr']}
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

### Vue Usage

```vue
<template>
  <div>
    <Line 
      :axis="['Jan', 'Feb', 'Mar', 'Apr']"
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

## Supported Chart Types

| Type   | Component | Description |
|--------|-----------|-------------|
| Line   | Line      | Single/multi line charts, configurable as area charts |
| Bar    | Bar       | Vertical/horizontal bar charts, supports stacking |
| Pie    | Pie       | Donut charts with configurable inner/outer radius |
| Radar  | Radar     | Multi-dimensional data display |
| Scatter| Scatter   | Large dataset scatter plot support |
| K-line | Kline     | Stock candlestick data display |
| Combo  | Combo     | Mixed chart type combinations |

## Common Parameters

### Basic Parameters

| Parameter | Type   | Default | Description |
|-----------|--------|---------|-------------|
| axis      | array  | -       | X-axis labels |
| datas     | array  | -       | Chart data, 2D array |
| height    | string | '200px' | Chart height |
| options   | object | {}      | Native FundCharts configuration |
| prefix    | string | -       | DOM ID prefix |

### Event Handling

```jsx
// React example
<Line 
  axis={['Jan', 'Feb', 'Mar']}
  datas={[[100, 200, 150]]}
  hover={(index, values, xaxis) => {
    console.log('Current index:', index);
    console.log('Current value:', values[0]);
    console.log('Current label:', xaxis);
  }}
/>
```

## Advanced Configuration

Use all native FundCharts configurations via the `options` parameter:

```jsx
<Line 
  axis={['Jan', 'Feb', 'Mar', 'Apr']}
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

## Browser Compatibility

- Chrome 49+
- Safari iOS 11+
- Android WebView 5+
- WeChat built-in browser 7.0+

## Usage Notes

1. **Container Height**: Must set container height for chart to display properly
2. **Data Format**: `datas` must be 2D array, even for single dataset
3. **Responsive**: Charts auto-adjust to container size, call `resize()` after container size changes

## Issue Reporting

For issues or questions:
- GitHub Issues: [Submit issue](https://github.com/MichealWayne/FundCharts-components/issues)
- Email: michealwayne@163.com

## License

MIT License