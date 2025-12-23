/**
 * @config dev
 * @author Wayne
 * @date 2024.07.24
 * 开发模式配置，支持热更新和sourcemap
 */

import fs from 'fs';
import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import eslint from '@rollup/plugin-eslint';
import ts from 'rollup-plugin-typescript2';

import packageList from '../../package-list.json';

const getPath = _path => path.resolve(path.join(__dirname, '../../'), _path);
const extensions = ['.js', '.ts', '.tsx'];
const externals = ['react', 'react-dom', 'vue', 'fundcharts'];

const exportModeMap = {
  FundCharts: 'default',
  FundchartsCore: 'named',
  FundChartsToolTips: 'named',
  FundChartsComponents: 'named',
};

const globalsMap = {
  react: 'React',
  'react-dom': 'ReactDOM',
  vue: 'Vue',
  fundcharts: 'FundCharts',
};

const getExportMode = name => exportModeMap[name] || 'named';

const getPackageJson = () => {
  const pkgPath = getPath('./package.json');
  return JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
};

const formatAuthor = author => {
  if (!author) {
    return '';
  }
  if (typeof author === 'string') {
    const match = author.match(/^([^<]+?)\s*<([^>]+)>/);
    if (match) {
      return `${match[1].trim()}(${match[2].trim()})`;
    }
    return author.trim();
  }
  if (typeof author === 'object') {
    const name = author.name ? String(author.name).trim() : '';
    const email = author.email ? String(author.email).trim() : '';
    if (name && email) {
      return `${name}(${email})`;
    }
    return name || email;
  }
  return String(author);
};

const packageJson = getPackageJson();
const banner = `/*!
 * FundCharts
 * @description: ${packageJson.description || ''}
 * @version: ${packageJson.version || ''}
 * @author: ${formatAuthor(packageJson.author)}
 * @time: 2018~${new Date().getFullYear()}
 */`;

// ts - 开发模式
const tsPlugin = ts({
  tsconfig: getPath('./tsconfig.json'),
  extensions,
  clean: true,
});

// eslint - 开发模式不阻断构建
const esPlugin = eslint({
  throwOnError: false,
  include: ['packages/**/src/*.ts', 'packages/**/src/*.tsx'],
  exclude: ['node_modules/**', 'lib/**', '__tests__/**'],
});

// 基础配置 - 开发模式
const commonConf = {
  plugins: [nodeResolve(extensions), commonjs(), esPlugin, tsPlugin],
  external: externals,
};

const buildConf = options => Object.assign({}, commonConf, options);

const outputModuleMap = packageList
  .map(pkgInfo => {
    if (pkgInfo.platformsEntries) {
      return Object.keys(pkgInfo.platformsEntries)
        .map(platform => {
          return pkgInfo.modules.map(type => ({
            name: pkgInfo.name,
            input: pkgInfo.platformsEntries[platform],
            file: `lib/${pkgInfo.name}/lib/${type}/${platform}/index.js`,
            format: type,
          }));
        })
        .flat(2);
    }
    return pkgInfo.modules.map(type => ({
      name: pkgInfo.name,
      input: pkgInfo.from,
      file: `lib/${pkgInfo.name}/lib/index.${type}.js`,
      format: type,
    }));
  })
  .flat();

export default outputModuleMap.map(output =>
  buildConf({
    input: output.input,
    output: {
      name: output.name,
      file: output.file,
      format: output.format,
      banner,
      sourcemap: true,
      exports: ['cjs', 'umd'].includes(output.format) ? getExportMode(output.name) : undefined,
      globals: output.format === 'umd' ? globalsMap : undefined,
    },
    watch: {
      buildDelay: 100,
      exclude: ['node_modules/**'],
      include: ['packages/**/src/**'],
    },
  })
);
