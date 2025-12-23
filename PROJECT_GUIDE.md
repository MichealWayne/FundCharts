# 工程说明

## 本地开发环境

- node：`v12.22.0`及以上
- 包管理：[pnpm](https://pnpm.io/zh/installation)，建议 `v8.0.0` 及以上

### 安装依赖

- 1.安装 pnpm：[https://pnpm.io/zh/installation](https://pnpm.io/zh/installation)，验证：`pnpm -v`
- 2.安装 node 依赖包：

```bash
pnpm install
```

## 运行/测试/debug

### 开发模式

启动开发环境（带热更新和sourcemap）：

```bash
pnpm dev
```

该命令会监听文件变化，自动重新构建，并生成sourcemap便于调试。

### 单元测试

保证文件在`packages/**/__tests__`目录下，文件格式为`ts`/`tsx`。执行命令：

```bash
pnpm test:unit
```

## 工程目录结构

```
FundCharts
├─packages
│   ├─core      核心模块
│   ├─charts    图表工厂
│   ├─toolTips  交互提示工具
│   └─components 组件模块
├─scripts
│   ├─build     构建脚本
│   └─jest      单测脚本
├─types      全局类型声明
├─coverage   单测报告
├─docs       文档
└─lib        构建产物
```

## 构建

开发构建（带sourcemap）：

```bash
pnpm build
```

生产构建（不带sourcemap，代码压缩）：

```bash
pnpm build:prod
```

## 版本策略

- 工作区内所有包保持统一版本号，发布时同步更新。
