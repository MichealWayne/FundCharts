# FundCharts ToolTips

A comprehensive tooltip library for FundCharts, providing various tooltip styles and configurations for different chart types.

## Features

- **Multiple ToolTip Styles**: Basic, Arrow, Kline, Pie Center, Pie Label, and Labels tooltips
- **Cross-Platform Support**: Works in both web browsers and WeChat Mini Programs
- **Customizable**: Extensive configuration options for colors, fonts, and positioning
- **TypeScript Support**: Full TypeScript definitions included
- **High Performance**: Optimized rendering with minimal overhead

## Installation

```bash
npm install fundcharts-tooltips
```

## Usage

### Basic Usage

```typescript
import { BasicToolTip, ArrowToolTip } from 'fundcharts-tooltips';

// Basic tooltip without arrow
const basicTooltip = BasicToolTip;

// Tooltip with arrow pointing to data point
const arrowTooltip = ArrowToolTip;
```

### Configuration

```typescript
const tooltipConfig = {
  width: 100,
  height: 30,
  font: '12px Arial',
  color: '#ffffff',
  backgroundColor: '#333333',
  textAlign: 'center' as CanvasTextAlign,
  showTip: (xData: string, yDatas: number[]) =>
    `${xData}: ${yDatas.join(', ')}`,
  showValTip: (value: number) => `${value.toFixed(2)}%`,
};
```

### Chart Types Support

#### Line/Bar Charts

```typescript
import { BasicToolTip, ArrowToolTip } from 'fundcharts-tooltips';

// Basic tooltip for line/bar charts
const lineTooltip = BasicToolTip;

// Arrow tooltip pointing to data points
const barTooltip = ArrowToolTip;
```

#### Kline Charts

```typescript
import { KlineToolTip } from 'fundcharts-tooltips';

// Specialized tooltip for Kline charts
const klineTooltip = KlineToolTip;
```

#### Pie Charts

```typescript
import {
  PieCenterToolTip,
  PieLabelToolTip,
  LabelsToolTip,
} from 'fundcharts-tooltips';

// Center tooltip for pie charts
const centerTooltip = PieCenterToolTip;

// Label tooltip with connecting lines
const labelTooltip = PieLabelToolTip;

// Simple labels tooltip
const labelsTooltip = LabelsToolTip;
```

## API Reference

### ToolTip Types

#### BasicToolTip

Basic tooltip without arrow, suitable for line and bar charts.

#### ArrowToolTip

Tooltip with arrow pointing to data points, ideal for precise data point indication.

#### KlineToolTip

Specialized tooltip for Kline charts with dual-axis labels.

#### PieCenterToolTip

Center tooltip for pie charts showing category and percentage.

#### PieLabelToolTip

Label tooltip with connecting lines for pie chart segments.

#### LabelsToolTip

Simple labels tooltip for pie and radar charts.

### Configuration Options

| Option            | Type              | Default        | Description                      |
| ----------------- | ----------------- | -------------- | -------------------------------- |
| `width`           | `number`          | `70`           | Tooltip width in pixels          |
| `height`          | `number`          | `20`           | Tooltip height in pixels         |
| `font`            | `string`          | `'10px Arial'` | Font specification               |
| `color`           | `string`          | `'#fff'`       | Text color                       |
| `backgroundColor` | `string`          | `'#bdbdbd'`    | Background color                 |
| `textAlign`       | `CanvasTextAlign` | `'center'`     | Text alignment                   |
| `showTip`         | `function`        | -              | Custom tooltip text function     |
| `showValTip`      | `function`        | -              | Custom value formatting function |

### Environment Detection

The library automatically detects the running environment:

- **Web Browser**: Uses `window.devicePixelRatio`
- **WeChat Mini Program**: Uses `wx.getSystemInfoSync().pixelRatio`

## Development

### Setup

This package is part of the FundCharts monorepo. For development setup, see the root [README](../../README.md).

### Scripts

- `npm run build` - Build the library
- `npm run test` - Run tests (uses root Jest config)
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint (uses root ESLint config)
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier (uses root Prettier config)
- `npm run type-check` - Run TypeScript type checking

### Testing

```bash
npm test
```

The test suite includes:

- Unit tests for utility functions
- Mock canvas context for testing (provided by root Jest config)
- Environment detection tests

### Code Quality

This package uses the root-level configuration for:

- **ESLint**: Code linting rules defined in `../../.eslintrc.js`
- **Prettier**: Code formatting rules defined in `../../.prettierrc.js`
- **Jest**: Test configuration defined in `../../scripts/jest/jest.config.js`
- **TypeScript**: Type checking configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

ISC License

## Changelog

See [CHANGELOGS.md](./CHANGELOGS.md) for version history and changes. 4. Add tests for new functionality 5. Run the test suite 6. Submit a pull request

## License

ISC License

## Changelog

See [CHANGELOGS.md](./CHANGELOGS.md) for version history and changes.
