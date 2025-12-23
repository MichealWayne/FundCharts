/**
 * @config build
 * @author Wayne
 * @date 2022.03.24
 */

import fs from 'fs';
import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import eslint from '@rollup/plugin-eslint';
import ts from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import copy from 'rollup-plugin-cpy';
import strip from '@rollup/plugin-strip';
import { terser } from 'rollup-plugin-terser';

import packageList from '../../package-list.json';

const isProd = process.env.NODE_ENV === 'production';

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

// ts
const tsPlugin = ts({
  tsconfig: getPath('./tsconfig.json'), // 导入本地ts配置
  extensions,
});

const terserPlugin = isProd
  ? [
      terser(),
      strip({
        include: ['**/*.ts'],
        functions: ['console.*'],
      }),
    ]
  : [];

// eslint
const esPlugin = eslint({
  throwOnError: true,
  include: ['packages/**/src/*.ts', 'packages/**/src/*.tsx'],
  exclude: ['node_modules/**', 'lib/**', '__tests__/**'],
});

// 基础配置
const commonConf = {
  input: getPath('./src/index.ts'),
  external: externals,
  plugins: [
    nodeResolve(extensions),

    commonjs(),
    esPlugin,
    tsPlugin,
    // dts(),
    ...terserPlugin,
  ],
};

const outputDtsMap = [];

// rome-ignore lint/complexity/useFlatMap: <explanation>
const outputModuleMap = packageList
  .map(pkgInfo => {
    outputDtsMap.push({
      name: `${pkgInfo.name}.d`,
      input: pkgInfo.from,
      file: `lib/${pkgInfo.name}/index.d.ts`,
      format: 'es',
      plugins: [
        dts(),
        copy({
          files: [
            path.resolve(pkgInfo.from, '../package.json'),
            path.resolve(pkgInfo.from, '../README.md'),
          ],
          dest: `lib/${pkgInfo.name}/`,
          options: {
            verbose: true,
          },
        }),
      ],
    });
    // 配置了不同平台的入口，则放置在不同目录下
    // 引用模块时通过build.config.ts中的importOnDemand处理
    if (pkgInfo.platformsEntries) {
      // rome-ignore lint/complexity/useFlatMap: <explanation>
      return Object.keys(pkgInfo.platformsEntries)
        .map(platform => {
          return pkgInfo.modules.map(type => ({
            name: pkgInfo.name,
            input: pkgInfo.platformsEntries[platform],
            file: `lib/${pkgInfo.name}/lib/${type}/${platform}/index.js`,
            format: type,
          }));
        })
        .flat(1);
    }
    return pkgInfo.modules.map(type => ({
      name: pkgInfo.name,
      input: pkgInfo.from,
      file: `lib/${pkgInfo.name}/lib/index.${type}.js`,
      format: type,
    }));
  })
  .flat(1);

const buildConf = options => Object.assign({}, commonConf, options);

export default outputModuleMap
  .map(output =>
    buildConf({
      input: output.input,
      output: {
        name: output.name,
        file: output.file,
        format: output.format,
        banner,
        sourcemap: false,
        exports: ['cjs', 'umd'].includes(output.format) ? getExportMode(output.name) : undefined,
        globals: output.format === 'umd' ? globalsMap : undefined,
      },
    })
  )
  .concat(
    ...outputDtsMap.map(output =>
      buildConf({
        input: output.input,
        output: {
          name: output.name,
          file: output.file,
          format: output.format,
          sourcemap: false,
        },
        plugins: output.plugins,
      })
    )
  );
