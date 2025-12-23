/**
 * @file sankey.ts - 桑基图实现
 * @author Wayne
 * @date 2025-07-18
 */

import { isWeapp } from 'fundcharts-core';
import Grid from '../factorys/GridFactory';

interface SankeyNode {
  id: string;
  name: string;
  value: number;
  color?: string;
}

interface SankeyLink {
  source: string | number;
  target: string | number;
  value: number;
  color?: string;
}

interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

interface NodePosition {
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
  name: string;
  color: string;
  layer: number;
  nodeId: string;
}

export default class SankeyDraw extends Grid {
  /**
   * @function SankeyDraw.setDataset
   * @description 计算并设置桑基图参数数据
   */
  protected setDataset(): void {
    const _chartjs = this.chartjs;
    const { opts } = _chartjs;

    // 对于桑基图，跳过父类的formatGridDatas，直接使用原始数据
    const { datas } = opts;

    if (!datas || !datas.nodes || !datas.links) {
      console.warn('SankeyDraw: Invalid data structure, expected {nodes: [], links: []}');
      return;
    }

    console.log(
      'SankeyDraw: Processing data with',
      datas.nodes.length,
      'nodes and',
      datas.links.length,
      'links'
    );

    // 处理节点和链接
    this.processSankeyData(datas as SankeyData);
  }

  /**
   * 处理桑基图数据
   */
  private processSankeyData(data: SankeyData): void {
    const { nodes, links } = data;

    // 创建节点映射
    const nodeMap = new Map<string, SankeyNode>();
    nodes.forEach((node, index) => {
      nodeMap.set(node.id || String(index), node);
    });

    // 处理链接，确保source和target是索引
    const processedLinks = links.map(link => ({
      source:
        typeof link.source === 'string' ? nodes.findIndex(n => n.id === link.source) : link.source,
      target:
        typeof link.target === 'string' ? nodes.findIndex(n => n.id === link.target) : link.target,
      value: link.value,
      color: link.color || '#4682B4',
    }));

    // 计算节点位置
    const nodePositions = this.calculateNodePositions(nodes, processedLinks);

    // 存储处理后的数据在chartjs.datasets中，符合Grid架构
    this.chartjs.datasets = [
      {
        nodes,
        links: processedLinks,
        positions: nodePositions,
      },
    ];

    // 同时保持datas的兼容性
    this.chartjs.opts.datas = {
      nodes,
      links: processedLinks,
      positions: nodePositions,
    };
  }

  /**
   * 计算节点位置 - 基于数据流层级的正确布局
   */
  private calculateNodePositions(nodes: SankeyNode[], links: any[]): NodePosition[] {
    const _chartjs = this.chartjs;
    const { _chart } = _chartjs;
    const opts = _chartjs.opts;

    // 使用默认值以防_chart未正确设置
    const chartWidth = _chart?.width || opts.width || 600;
    const chartHeight = _chart?.height || opts.height || 400;
    const chartLeft = opts.chartLeft || 50;
    const chartRight = opts.chartRight || 50;
    const chartTop = opts.chartTop || 50;
    const chartBottom = opts.chartBottom || 50;

    const width = chartWidth - chartLeft - chartRight;
    const height = chartHeight - chartTop - chartBottom;

    // 计算节点深度（层级）
    const nodeDepths = this.calculateNodeDepths(nodes, links);
    const maxDepth = Math.max(...Array.from(nodeDepths.values()));
    const columnCount = maxDepth + 1;

    // 按层级分组节点
    const layers: SankeyNode[][] = Array.from({ length: columnCount }, () => []);
    nodes.forEach(node => {
      const depth = nodeDepths.get(node.id) || 0;
      layers[depth].push(node);
    });

    const nodeWidth = Math.min(25, Math.max(15, width / (columnCount * 8))); // 动态节点宽度
    const nodePadding = Math.max(8, height * 0.02); // 动态节点间距

    const positions: NodePosition[] = [];

    layers.forEach((layer, layerIndex) => {
      if (layer.length === 0) return;

      // 使用全局最大值计算统一比例，确保不同层之间的节点高度比例一致
      const globalMaxValue = Math.max(...nodes.map(node => node.value));
      const baseHeight = Math.min(100, height * 0.12); // 基础高度
      const minNodeHeight = 20; // 最小节点高度

      // 计算该层所有节点的高度
      const layerNodeHeights = layer.map(node => {
        const proportionalHeight = (node.value / globalMaxValue) * baseHeight;
        return Math.max(minNodeHeight, proportionalHeight);
      });

      const totalLayerHeight =
        layerNodeHeights.reduce((sum, h) => sum + h, 0) + (layer.length - 1) * nodePadding;

      // 计算起始Y位置，使该层垂直居中
      let currentY = chartTop + Math.max(0, (height - totalLayerHeight) / 2);

      layer.forEach((node, nodeIndex) => {
        const nodeHeight = layerNodeHeights[nodeIndex];

        // 计算X位置：确保有足够空间显示标签
        let x: number;
        if (columnCount === 1) {
          x = chartLeft + width / 2 - nodeWidth / 2;
        } else if (layerIndex === 0) {
          x = chartLeft;
        } else if (layerIndex === columnCount - 1) {
          // 右侧节点留出更多空间给标签
          x = chartLeft + width - nodeWidth - Math.max(80, width * 0.15);
        } else {
          // 中间层均匀分布
          const availableWidth = width - Math.max(80, width * 0.15); // 为右侧标签预留空间
          x = chartLeft + (layerIndex / (columnCount - 1)) * (availableWidth - nodeWidth);
        }

        positions.push({
          x,
          y: currentY,
          width: nodeWidth,
          height: nodeHeight,
          value: node.value,
          name: node.name,
          color: node.color || this.getNodeColor(layerIndex, columnCount),
          layer: layerIndex,
          nodeId: node.id,
        });

        currentY += nodeHeight + nodePadding;
      });
    });

    console.log('Node depths:', nodeDepths);
    console.log(
      'Layers:',
      layers.map((layer, i) => ({ layer: i, nodes: layer.map(n => n.name) }))
    );
    console.log(
      'Positions:',
      positions.map(p => ({ name: p.name, layer: p.layer, x: p.x, y: p.y }))
    );

    return positions;
  }

  /**
   * 计算节点深度（层级）
   */
  private calculateNodeDepths(nodes: SankeyNode[], links: any[]): Map<string, number> {
    const nodeDepths = new Map<string, number>();
    const visited = new Set<number>();

    // 找到源节点（没有输入连接的节点）
    const sourceNodeIndices = nodes
      .map((_, index) => index)
      .filter(index => !links.some(link => link.target === index));

    // 如果没有明显的源节点，选择第一个节点作为源
    if (sourceNodeIndices.length === 0 && nodes.length > 0) {
      sourceNodeIndices.push(0);
    }

    // BFS计算深度
    const queue: Array<{ index: number; depth: number }> = [];
    sourceNodeIndices.forEach(index => {
      nodeDepths.set(nodes[index].id, 0);
      queue.push({ index, depth: 0 });
    });

    while (queue.length > 0) {
      const current = queue.shift();
      if (!current) continue;

      const { index, depth } = current;
      if (visited.has(index)) continue;
      visited.add(index);

      // 找到所有从当前节点出发的连接
      links
        .filter(link => link.source === index)
        .forEach(link => {
          const targetIndex = link.target;
          const targetId = nodes[targetIndex]?.id;
          if (
            targetId &&
            (!nodeDepths.has(targetId) || (nodeDepths.get(targetId) || 0) < depth + 1)
          ) {
            nodeDepths.set(targetId, depth + 1);
            queue.push({ index: targetIndex, depth: depth + 1 });
          }
        });
    }

    // 确保所有节点都有深度值
    nodes.forEach(node => {
      if (!nodeDepths.has(node.id)) {
        nodeDepths.set(node.id, 0);
      }
    });

    return nodeDepths;
  }

  /**
   * 根据层级获取节点颜色
   */
  private getNodeColor(layer: number, totalLayers: number): string {
    const colors = [
      '#4682B4',
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#96CEB4',
      '#FECA57',
      '#FF9FF3',
      '#54A0FF',
    ];
    return colors[layer % colors.length];
  }

  /**
   * 将十六进制颜色转换为微信小程序兼容的 rgba 格式
   * @param color 十六进制颜色值 (如 #FF6B6B)
   * @param alpha 透明度 (0-1)
   * @returns rgba 格式的颜色字符串
   */
  private convertToRgba(color: string, alpha: number): string {
    // 如果已经是 rgba 格式，直接返回
    if (color.startsWith('rgba(')) {
      return color;
    }
    
    // 如果是 rgb 格式，转换为 rgba
    if (color.startsWith('rgb(')) {
      return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
    }
    
    // 处理十六进制颜色
    let hex = color.replace('#', '');
    
    // 处理简写格式 (如 #FFF -> #FFFFFF)
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }
    
    // 解析 RGB 值
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  /**
   * 绘制桑基图
   */
  public draw(update?: boolean): void {
    const _chartjs = this.chartjs;
    const { ctx } = _chartjs;

    // 如果是更新，重新处理数据
    if (update) {
      this.setDataset();
    }

    // 从datasets中获取数据，符合Grid架构
    const datasets = _chartjs.datasets;
    if (!datasets || !datasets[0]) {
      console.warn('SankeyDraw: No datasets found');
      return;
    }

    const { positions, links } = datasets[0];

    if (!positions || !links) {
      console.warn('SankeyDraw: Missing positions or links data');
      return;
    }

    console.log('SankeyDraw: Drawing with positions:', positions.length, 'nodes');
    console.log('SankeyDraw: Drawing with links:', links.length, 'links');

    // 清空画布
    this.clearCtn(update);

    // 绘制链接（先绘制，避免覆盖节点）
    this.drawLinks(ctx, links, positions);

    // 绘制节点
    this.drawNodes(ctx, positions);

    // 绘制标签
    this.drawLabels(ctx, positions);
  }

  /**
   * 绘制节点
   */
  private drawNodes(ctx: CanvasRenderingContext2D, positions: NodePosition[]): void {
    positions.forEach(pos => {
      // 绘制节点矩形
      ctx.fillStyle = pos.color;
      ctx.fillRect(pos.x, pos.y, pos.width, pos.height);

      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.strokeRect(pos.x, pos.y, pos.width, pos.height);
    });
  }

  /**
   * 绘制链接 - 优化版本
   */
  private drawLinks(ctx: CanvasRenderingContext2D, links: any[], positions: NodePosition[]): void {
    // 按值大小排序，先绘制小的连接，避免被大的覆盖
    const sortedLinks = [...links].sort((a, b) => b.value - a.value);
    const maxValue = Math.max(...links.map((l: any) => l.value));

    sortedLinks.forEach(link => {
      const sourcePos = positions[link.source];
      const targetPos = positions[link.target];

      if (!sourcePos || !targetPos) {
        console.warn('Invalid link:', link, 'sourcePos:', sourcePos, 'targetPos:', targetPos);
        return;
      }

      const sourceX = sourcePos.x + sourcePos.width;
      const sourceY = sourcePos.y + sourcePos.height / 2;
      const targetX = targetPos.x;
      const targetY = targetPos.y + targetPos.height / 2;

      // 计算线条宽度，使用更合理的比例
      const minWidth = 1;
      const maxWidth = Math.min(25, Math.max(sourcePos.height, targetPos.height) * 0.3);
      const lineWidth = Math.max(minWidth, (link.value / maxValue) * maxWidth);

      // 绘制带渐变的连接路径
      this.drawFlowPath(ctx, {
        sourceX,
        sourceY,
        targetX,
        targetY,
        width: lineWidth,
        color: link.color || '#4682B4',
        value: link.value,
      });
    });
  }

  /**
   * 绘制流向路径
   */
  private drawFlowPath(
    ctx: CanvasRenderingContext2D,
    pathData: {
      sourceX: number;
      sourceY: number;
      targetX: number;
      targetY: number;
      width: number;
      color: string;
      value: number;
    }
  ): void {
    const { sourceX, sourceY, targetX, targetY, width, color } = pathData;

    // 创建渐变效果
    const gradient = ctx.createLinearGradient(sourceX, sourceY, targetX, targetY);
    gradient.addColorStop(0, this.convertToRgba(color, 0.9)); // 90% 透明度
    gradient.addColorStop(1, this.convertToRgba(color, 0.6)); // 60% 透明度

    // 计算贝塞尔曲线控制点
    const curvature = 0.6;
    const controlX1 = sourceX + (targetX - sourceX) * curvature;
    const controlX2 = targetX - (targetX - sourceX) * curvature;

    // 绘制路径
    ctx.beginPath();

    // 上边缘
    ctx.moveTo(sourceX, sourceY - width / 2);
    ctx.bezierCurveTo(
      controlX1,
      sourceY - width / 2,
      controlX2,
      targetY - width / 2,
      targetX,
      targetY - width / 2
    );

    // 下边缘
    ctx.lineTo(targetX, targetY + width / 2);
    ctx.bezierCurveTo(
      controlX2,
      targetY + width / 2,
      controlX1,
      sourceY + width / 2,
      sourceX,
      sourceY + width / 2
    );

    ctx.closePath();

    // 填充渐变
    ctx.fillStyle = gradient;
    ctx.fill();

    // 添加边框
    ctx.strokeStyle = this.convertToRgba(color, 0.25);
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  /**
   * 绘制标签 - 优化版本，解决文字对齐问题
   */
  private drawLabels(ctx: CanvasRenderingContext2D, positions: NodePosition[]): void {
    const _chartjs = this.chartjs;
    const opts = _chartjs.opts;

    // 获取画布尺寸信息
    const chartLeft = opts.chartLeft || 50;

    // 获取节点标签配置
    const nodeLabelConfig = opts.nodeLabel || {};
    const labelOffset = nodeLabelConfig.offset !== undefined ? nodeLabelConfig.offset : 5;
    const fontSize = nodeLabelConfig.fontSize || 11;

    // 按层级分组节点
    const layerGroups: { [key: string]: NodePosition[] } = {};
    positions.forEach(pos => {
      if (!layerGroups[pos.layer]) {
        layerGroups[pos.layer] = [];
      }
      layerGroups[pos.layer].push(pos);
    });

    // 获取最大层级
    const maxLayer = Math.max(...positions.map(p => p.layer));

    // 为每个层级绘制标签，避免重叠
    Object.keys(layerGroups).forEach(layerIndex => {
      const layer = parseInt(layerIndex);
      const nodes = layerGroups[layer];

      // 按y坐标排序节点
      nodes.sort((a, b) => a.y - b.y);

      // 为每个节点绘制标签
      nodes.forEach(pos => {
        const isLeftLayer = layer === 0;
        const isRightLayer = layer === maxLayer;

        // 设置字体和颜色
        const fontColor = opts.font?.color || '#333';
        const fontFamily = opts.font?.fontFamily || 'Arial, sans-serif';
        const fontWeight = opts.font?.fontWeight || 'bold';

        ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
        ctx.fillStyle = fontColor;

        // 测量文本宽度和高度
        const nameHeight = fontSize; // 字体高度
        const padding = 2; // 最小化文本间距

        // 计算文字位置，确保不会超出画布边界和避免重叠
        let nameX: number, nameY: number, valueX: number, valueY: number;
        const textYCenter = pos.y + pos.height / 2;

        if (isLeftLayer) {
          // 左侧层级，标签放在左边
          ctx.textAlign = 'right';
          ctx.textBaseline = 'middle';

          // 确保有足够的左侧空间
          nameX = Math.max(chartLeft / 2, pos.x - labelOffset);

          // 检查并调整Y位置以避免重叠
          nameY = textYCenter;
          valueX = nameX;
          valueY = nameY + nameHeight + padding;
        } else if (isRightLayer) {
          // 右侧层级
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          nameX = pos.x + pos.width + labelOffset;
          nameY = textYCenter;
          valueX = nameX;
          valueY = nameY + nameHeight + padding;
        } else {
          // 中间层级，直接将文字放在节点上
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          nameX = pos.x + pos.width / 2;
          nameY = textYCenter;
          valueX = nameX;
          valueY = nameY + nameHeight + padding;
        }

        // 绘制节点名称
        ctx.fillText(pos.name, nameX, nameY);

        // 节点值 - 使用更小的字体和更淡的颜色
        ctx.font = `${fontSize * 0.8}px ${fontFamily}`;
        ctx.fillStyle = this.convertToRgba(fontColor, 0.6); // 半透明

        // 保持与名称相同的对齐方式
        ctx.fillText(String(pos.value), valueX, valueY);
      });
    });
  }

  /**
   * @function SankeyDraw.init
   * @description 初始化注入
   */
  init() {
    this.setDataset();
    this.draw(true);
    this.setEvents();
    if (isWeapp) this.chartjs.canvas.draw();
  }
}
