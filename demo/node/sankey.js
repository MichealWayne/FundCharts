/**
 * @file sankey.js
 * @description Node.js 桑基图示例 - 基于 packages/charts/test/sankey.html 的 Node.js 实现
 * @author Wayne
 * @date 2025-07-18
 * @updated 2025-07-19
 *
 * 安装说明:
 * 1. 如果需要生成PNG图片，需要安装canvas依赖:
 *    npm install canvas
 * 2. 如果canvas安装失败，脚本会自动跳过PNG生成，只生成SVG
 * 3. macOS上安装canvas可能需要先安装系统依赖:
 *    brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
 */

const fs = require('fs');
const path = require('path');

// 尝试加载Canvas，如果失败则只生成SVG
let Canvas = null;
let FundCharts = null;

try {
  // 尝试加载 @napi-rs/canvas (更现代的实现)
  Canvas = require('@napi-rs/canvas');
  FundCharts = require('../../lib/FundCharts/lib/index.cjs.js');
  console.log('✅ Canvas 和 FundCharts 加载成功，支持PNG生成');
} catch (error) {
  try {
    // 回退到传统的 canvas
    Canvas = require('canvas');
    FundCharts = require('../../lib/FundCharts/lib/index.cjs.js');
    console.log('✅ Canvas 和 FundCharts 加载成功，支持PNG生成');
  } catch (error2) {
    console.log('⚠️  Canvas 或 FundCharts 加载失败，仅支持SVG生成');
    console.log('错误信息:', error2.message);
  }
}

// 能源流向数据 - 与 web 版本保持一致
const energyData = {
  nodes: [
    { id: 'energy', name: '总能源', value: 1000 },
    { id: 'oil', name: '石油', value: 400 },
    { id: 'gas', name: '天然气', value: 300 },
    { id: 'coal', name: '煤炭', value: 200 },
    { id: 'renewable', name: '可再生能源', value: 100 },
    { id: 'electricity', name: '电力', value: 600 },
    { id: 'transport', name: '交通', value: 300 },
    { id: 'industry', name: '工业', value: 400 },
    { id: 'residential', name: '居民', value: 200 },
    { id: 'losses', name: '损失', value: 100 },
  ],
  links: [
    { source: 'energy', target: 'oil', value: 400, color: '#ff6b6b' },
    { source: 'energy', target: 'gas', value: 300, color: '#4ecdc4' },
    { source: 'energy', target: 'coal', value: 200, color: '#45b7d1' },
    { source: 'energy', target: 'renewable', value: 100, color: '#96ceb4' },
    { source: 'oil', target: 'transport', value: 300, color: '#ff6b6b' },
    { source: 'oil', target: 'industry', value: 100, color: '#ff6b6b' },
    { source: 'gas', target: 'electricity', value: 200, color: '#4ecdc4' },
    { source: 'gas', target: 'residential', value: 100, color: '#4ecdc4' },
    { source: 'coal', target: 'electricity', value: 150, color: '#45b7d1' },
    { source: 'coal', target: 'industry', value: 50, color: '#45b7d1' },
    { source: 'renewable', target: 'electricity', value: 80, color: '#96ceb4' },
    { source: 'renewable', target: 'residential', value: 20, color: '#96ceb4' },
    { source: 'electricity', target: 'industry', value: 300, color: '#feca57' },
    { source: 'electricity', target: 'transport', value: 150, color: '#feca57' },
    { source: 'electricity', target: 'residential', value: 100, color: '#feca57' },
    { source: 'electricity', target: 'losses', value: 50, color: '#ff9ff3' },
  ],
};

// 网站流量数据 - 与 web 版本保持一致
const websiteData = {
  nodes: [
    { id: 'homepage', name: '首页', value: 1000 },
    { id: 'product', name: '产品页', value: 600 },
    { id: 'blog', name: '博客', value: 300 },
    { id: 'contact', name: '联系页', value: 100 },
    { id: 'signup', name: '注册页', value: 400 },
    { id: 'purchase', name: '购买页', value: 250 },
    { id: 'bounce', name: '跳出', value: 300 },
    { id: 'exit', name: '退出', value: 50 },
  ],
  links: [
    { source: 'homepage', target: 'product', value: 500, color: '#ff6b6b' },
    { source: 'homepage', target: 'blog', value: 300, color: '#4ecdc4' },
    { source: 'homepage', target: 'contact', value: 100, color: '#45b7d1' },
    { source: 'homepage', target: 'bounce', value: 100, color: '#ff9ff3' },
    { source: 'product', target: 'signup', value: 350, color: '#96ceb4' },
    { source: 'product', target: 'purchase', value: 100, color: '#feca57' },
    { source: 'product', target: 'exit', value: 50, color: '#ff9ff3' },
    { source: 'blog', target: 'product', value: 200, color: '#ff6b6b' },
    { source: 'blog', target: 'signup', value: 50, color: '#96ceb4' },
    { source: 'blog', target: 'exit', value: 50, color: '#ff9ff3' },
    { source: 'contact', target: 'signup', value: 80, color: '#96ceb4' },
    { source: 'contact', target: 'exit', value: 20, color: '#ff9ff3' },
  ],
};

// 财务数据 - 与 web 版本保持一致
const financeData = {
  nodes: [
    { id: 'income', name: '总收入', value: 10000 },
    { id: 'salary', name: '工资收入', value: 8000 },
    { id: 'bonus', name: '奖金收入', value: 2000 },
    { id: 'rent', name: '房租', value: 3000 },
    { id: 'food', name: '餐饮', value: 2000 },
    { id: 'transport', name: '交通', value: 1000 },
    { id: 'entertainment', name: '娱乐', value: 1500 },
    { id: 'savings', name: '储蓄', value: 2000 },
    { id: 'investment', name: '投资', value: 500 },
  ],
  links: [
    { source: 'income', target: 'salary', value: 8000, color: '#ff6b6b' },
    { source: 'income', target: 'bonus', value: 2000, color: '#4ecdc4' },
    { source: 'salary', target: 'rent', value: 3000, color: '#45b7d1' },
    { source: 'salary', target: 'food', value: 2000, color: '#96ceb4' },
    { source: 'salary', target: 'transport', value: 1000, color: '#feca57' },
    { source: 'salary', target: 'entertainment', value: 1500, color: '#ff9ff3' },
    { source: 'salary', target: 'savings', value: 500, color: '#54a0ff' },
    { source: 'bonus', target: 'savings', value: 1500, color: '#54a0ff' },
    { source: 'bonus', target: 'investment', value: 500, color: '#5f27cd' },
  ],
};

// 创建桑基图PNG版本
function createSankeyChart(data, filename, title) {
  if (!Canvas) {
    console.log(`⚠️  跳过PNG生成 ${title} - Canvas不可用`);
    return null;
  }

  console.log(`正在生成PNG ${title}...`);

  try {
    // 使用Canvas直接绘制
    const canvas = Canvas.createCanvas(800, 600);
    const ctx = canvas.getContext('2d');

    // 注册中文字体（如果可用）
    try {
      Canvas.registerFont('/System/Library/Fonts/PingFang.ttc', { family: 'PingFang SC' });
    } catch (e) {
      // 字体注册失败，使用默认字体
    }

    // 清空背景
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(0, 0, 800, 600);

    // 绘制标题
    ctx.fillStyle = '#333';
    ctx.font = 'bold 16px "PingFang SC", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, 400, 30);

    // 计算布局
    const layout = calculateSankeyLayout(data, 600, 500, 20, 8);

    // 绘制连接线
    layout.links.forEach(link => {
      ctx.fillStyle = link.color;
      ctx.globalAlpha = 0.7;
      drawCanvasPath(ctx, link);
      ctx.fill();
    });

    // 绘制节点
    ctx.globalAlpha = 1;
    layout.nodes.forEach(node => {
      const x = 100 + node.x;
      const y = 60 + node.y;

      ctx.fillStyle = node.color || '#4682B4';
      ctx.fillRect(x, y, 20, node.height);

      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, 20, node.height);

      // 节点标签
      ctx.fillStyle = '#333';
      ctx.font = '11px "PingFang SC", Arial, sans-serif';
      const labelX = node.x < 300 ? x - 5 : x + 25;
      const textAlign = node.x < 300 ? 'right' : 'left';
      ctx.textAlign = textAlign;
      ctx.fillText(node.name, labelX, y + node.height / 2 - 4);
      ctx.font = '10px "PingFang SC", Arial, sans-serif';
      ctx.fillStyle = '#666';
      ctx.fillText(String(node.value), labelX, y + node.height / 2 + 8);
    });

    // 保存PNG文件
    const buffer = canvas.toBuffer('image/png');
    const filepath = path.join(__dirname, filename);
    fs.writeFileSync(filepath, buffer);
    console.log(`✅ PNG ${title} 已生成: ${filepath}`);

    return canvas;
  } catch (error) {
    console.error(`❌ 生成PNG ${title} 失败:`, error.message);
    return null;
  }
}

// 为Canvas绘制路径
function drawCanvasPath(ctx, link) {
  const { source, target, height, sourceY, targetY } = link;

  const x0 = 100 + source.x + 20;
  const x1 = 100 + target.x;
  const y0 = 60 + (sourceY - height / 2);
  const y1 = 60 + (targetY - height / 2);

  const curvature = 0.5;
  const xi = (x0 + x1) / 2;
  const x2 = xi - curvature * (xi - x0);
  const x3 = xi + curvature * (x1 - xi);

  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.bezierCurveTo(x2, y0, x3, y1, x1, y1);
  ctx.lineTo(x1, y1 + height);
  ctx.bezierCurveTo(x3, y1 + height, x2, y0 + height, x0, y0 + height);
  ctx.closePath();
}

// 创建SVG版本
function createSankeySVG(data, filename, title) {
  console.log(`正在生成SVG ${title}...`);

  const width = 800;
  const height = 600;
  const margin = { top: 60, right: 100, bottom: 40, left: 100 };
  const nodeWidth = 20;
  const nodePadding = 8;

  const svg = [
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`,
    `<defs>`,
    `  <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="0%">`,
    `    <stop offset="0%" style="stop-opacity:0.6"/>`,
    `    <stop offset="100%" style="stop-opacity:0.3"/>`,
    `  </linearGradient>`,
    `</defs>`,
    `<style>`,
    `  .node { stroke: #fff; stroke-width: 1; }`,
    `  .link { fill: url(#linkGradient); stroke: none; opacity: 0.7; }`,
    `  .node-label { font-family: Arial, sans-serif; font-size: 11px; fill: #333; }`,
    `  .title { font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; fill: #333; }`,
    `</style>`,
    `<rect width="${width}" height="${height}" fill="#fafafa"/>`,
    `<text x="${width / 2}" y="30" text-anchor="middle" class="title">${title}</text>`,
  ];

  // 计算桑基图布局
  const layout = calculateSankeyLayout(
    data,
    width - margin.left - margin.right,
    height - margin.top - margin.bottom,
    nodeWidth,
    nodePadding
  );

  // 绘制连接线（先绘制，这样节点会在上层）
  layout.links.forEach(link => {
    if (link.sourceY && link.targetY) {
      const path = createSankeyPath(link);
      svg.push(`<path d="${path}" fill="${link.color}" class="link"/>`);
    }
  });

  // 绘制节点
  layout.nodes.forEach(node => {
    const x = margin.left + node.x;
    const y = margin.top + node.y;

    svg.push(
      `<rect x="${x}" y="${y}" width="${nodeWidth}" height="${node.height}" fill="${
        node.color || '#4682B4'
      }" class="node"/>`
    );

    // 节点标签
    const labelX = node.x < (width - margin.left - margin.right) / 2 ? x - 5 : x + nodeWidth + 5;
    const textAnchor = node.x < (width - margin.left - margin.right) / 2 ? 'end' : 'start';
    svg.push(
      `<text x="${labelX}" y="${
        y + node.height / 2 - 8
      }" text-anchor="${textAnchor}" class="node-label">${node.name}</text>`
    );
    svg.push(
      `<text x="${labelX}" y="${
        y + node.height / 2 + 8
      }" text-anchor="${textAnchor}" class="node-label" style="font-size: 10px; fill: #666;">${
        node.value
      }</text>`
    );
  });

  svg.push('</svg>');

  const filepath = path.join(__dirname, filename);
  fs.writeFileSync(filepath, svg.join('\n'));
  console.log(`✅ SVG ${title} 已生成: ${filepath}`);

  return filepath;
}

// 计算桑基图布局
function calculateSankeyLayout(data, width, height, nodeWidth, nodePadding) {
  const nodes = data.nodes.map(node => ({ ...node, sourceLinks: [], targetLinks: [] }));
  const links = data.links.map(link => ({ ...link }));

  // 计算节点的层级（从左到右）
  const nodeDepths = new Map();
  const visited = new Set();

  // 找到源节点（没有输入的节点）
  const sourceNodes = nodes.filter(node => !links.some(link => link.target === node.id));

  // BFS计算深度
  const queue = sourceNodes.map(node => ({ id: node.id, depth: 0 }));
  sourceNodes.forEach(node => nodeDepths.set(node.id, 0));

  while (queue.length > 0) {
    const { id, depth } = queue.shift();
    if (visited.has(id)) continue;
    visited.add(id);

    links
      .filter(link => link.source === id)
      .forEach(link => {
        if (!nodeDepths.has(link.target)) {
          nodeDepths.set(link.target, depth + 1);
          queue.push({ id: link.target, depth: depth + 1 });
        }
      });
  }

  // 按层级分组节点
  const maxDepth = Math.max(...Array.from(nodeDepths.values()));
  const layers = Array.from({ length: maxDepth + 1 }, () => []);

  nodes.forEach(node => {
    const depth = nodeDepths.get(node.id) || 0;
    layers[depth].push(node);
  });

  // 计算节点位置
  const layerWidth = width / (maxDepth + 1);

  layers.forEach((layer, layerIndex) => {
    const totalValue = layer.reduce((sum, node) => sum + node.value, 0);
    const availableHeight = height - (layer.length - 1) * nodePadding;

    let currentY = 0;
    layer.forEach(node => {
      node.x = layerIndex * layerWidth + layerWidth / 2 - nodeWidth / 2;
      node.y = currentY;
      node.height = Math.max(20, (node.value / totalValue) * availableHeight * 0.8);
      currentY += node.height + nodePadding;
    });

    // 居中对齐
    const totalHeight = currentY - nodePadding;
    const offset = (height - totalHeight) / 2;
    layer.forEach(node => {
      node.y += offset;
    });
  });

  // 为每个节点计算连接点位置
  nodes.forEach(node => {
    node.sourceLinks = links.filter(link => link.source === node.id);
    node.targetLinks = links.filter(link => link.target === node.id);
  });

  // 计算每个连接的精确位置
  const processedLinks = [];

  // 为每个节点计算输出和输入连接的累积位置
  const nodeOutputY = new Map();
  const nodeInputY = new Map();

  nodes.forEach(node => {
    nodeOutputY.set(node.id, node.y);
    nodeInputY.set(node.id, node.y);
  });

  // 处理所有连接
  links.forEach(link => {
    const sourceNode = nodes.find(n => n.id === link.source);
    const targetNode = nodes.find(n => n.id === link.target);

    if (!sourceNode || !targetNode) return;

    // 计算连接高度（基于源节点的比例）
    const sourceTotal = links
      .filter(l => l.source === sourceNode.id)
      .reduce((sum, l) => sum + l.value, 0);
    const linkHeight = Math.max(2, (link.value / sourceTotal) * sourceNode.height);

    // 获取当前的Y位置
    const currentSourceY = nodeOutputY.get(sourceNode.id);
    const currentTargetY = nodeInputY.get(targetNode.id);

    processedLinks.push({
      source: sourceNode,
      target: targetNode,
      value: link.value,
      height: linkHeight,
      color: link.color || '#4682B4',
      sourceY: currentSourceY + linkHeight / 2,
      targetY: currentTargetY + linkHeight / 2,
    });

    // 更新Y位置
    nodeOutputY.set(sourceNode.id, currentSourceY + linkHeight);
    nodeInputY.set(targetNode.id, currentTargetY + linkHeight);
  });

  return { nodes, links: processedLinks };
}

// 创建桑基图路径
function createSankeyPath(link) {
  const { source, target, height, sourceY, targetY } = link;

  const x0 = source.x + 20; // nodeWidth
  const x1 = target.x;
  const y0 = sourceY - height / 2;
  const y1 = targetY - height / 2;

  // 使用简单的直线连接，确保对齐
  if (Math.abs(x1 - x0) < 100) {
    // 如果距离很近，使用直线
    return `M${x0},${y0}L${x1},${y1}L${x1},${y1 + height}L${x0},${y0 + height}Z`;
  } else {
    // 使用贝塞尔曲线
    const curvature = 0.5;
    const xi = (x0 + x1) / 2;
    const x2 = xi - curvature * (xi - x0);
    const x3 = xi + curvature * (x1 - xi);

    return `M${x0},${y0}C${x2},${y0} ${x3},${y1} ${x1},${y1}L${x1},${y1 + height}C${x3},${
      y1 + height
    } ${x2},${y0 + height} ${x0},${y0 + height}Z`;
  }
}

// 主函数
function main() {
  console.log('🎯 FundCharts 桑基图 Node.js 示例');
  console.log('====================================');

  try {
    // 生成PNG图表
    createSankeyChart(energyData, 'sankey-energy.png', '能源流向图');
    createSankeyChart(websiteData, 'sankey-website.png', '网站流量图');
    createSankeyChart(financeData, 'sankey-finance.png', '财务流向图');

    // 生成SVG图表
    createSankeySVG(energyData, 'sankey-energy.svg', '能源流向图');
    createSankeySVG(websiteData, 'sankey-website.svg', '网站流量图');
    createSankeySVG(financeData, 'sankey-finance.svg', '财务流向图');

    console.log('\n🎉 所有图表已生成完成！');
    console.log('📁 文件保存在: demo/node/');
  } catch (error) {
    console.error('❌ 生成图表失败:', error);
    console.error('错误详情:', error.stack);
  }
}

// 运行示例
if (require.main === module) {
  main();
}

module.exports = {
  energyData,
  websiteData,
  financeData,
  createSankeyChart,
  createSankeySVG,
  main,
};
