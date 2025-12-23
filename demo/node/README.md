# FundCharts 服务端 nodejs 版 Demo

## 安装 canvas

```sh
npm i --save canvas
```

## 测试

```sh
node line.js
node pie.js
node bar.js
node radar.js
node scatter.js
node kline.js
node combo.js
node sankey.js
```

## 桑基图说明

桑基图示例 (`sankey.js`) 支持两种输出格式：

- **PNG 格式**: 使用 @napi-rs/canvas 生成高质量的 PNG 图片
- **SVG 格式**: 无需额外依赖，生成矢量图形

脚本会自动尝试加载 Canvas 依赖，如果失败会跳过 PNG 生成，只生成 SVG 文件。

### Canvas 依赖安装

推荐使用现代的 @napi-rs/canvas（已包含在项目中）：

```sh
npm install @napi-rs/canvas
```

如果需要使用传统的 canvas 包：

```sh
# macOS 需要先安装系统依赖
brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
npm install canvas
```

### 生成的文件

运行 `node sankey.js` 会生成以下文件：

- `sankey-energy.png/svg` - 能源流向图
- `sankey-website.png/svg` - 网站流量图
- `sankey-finance.png/svg` - 财务流向图
