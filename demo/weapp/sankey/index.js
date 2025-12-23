/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * FundCharts
 * 桑基图 SankeyChart
 */

const FundCharts = require('../../../lib/FundCharts/lib/index.cjs'); // 注意拷FundCharts.min.js

const SankeyChart = FundCharts.sankey;
let sankeyChart1 = null;
let sankeyChart2 = null;
let sankeyChart3 = null;

Page({
  data: {
    currentChart: 0,
    chartTitles: ['能源流向分析', '网站用户行为', '个人财务流向'],
  },

  onReady() {
    // 延迟执行，确保Canvas 2D节点已准备好
    setTimeout(() => {
      this.drawSankey();
    }, 300); // 增加延迟时间
  },

  /**
   * 画桑基图
   */
  drawSankey() {
    // 能源流向数据
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

    // 网站流量数据
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

    // 财务流向数据
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

    // chart 1 - 能源流向图
    sankeyChart1 = new SankeyChart({
      id: 'sankey1',
      width: 375,
      height: 280,
      datas: energyData,
      nodeWidth: 20,
      nodePadding: 8,
      align: 'justify',
    });

    sankeyChart1.init();

    // chart 2 - 网站流量图
    sankeyChart2 = new SankeyChart({
      id: 'sankey2',
      width: 375,
      height: 280,
      datas: websiteData,
      nodeWidth: 20,
      nodePadding: 8,
      align: 'center',
    });

    sankeyChart2.init();

    // chart 3 - 财务流向图
    sankeyChart3 = new SankeyChart({
      id: 'sankey3',
      width: 375,
      height: 280,
      datas: financeData,
      nodeWidth: 20,
      nodePadding: 8,
      align: 'left',
    });

    sankeyChart3.init();
  },



  // 桑基图交互事件
  sankeyTouchstart: function (e) {
    const chartId = e.currentTarget.dataset.chart;
    let chart;

    switch (chartId) {
      case 'sankey1':
        chart = sankeyChart1;
        break;
      case 'sankey2':
        chart = sankeyChart2;
        break;
      case 'sankey3':
        chart = sankeyChart3;
        break;
      default:
        return;
    }

    if (!chart || !e.touches[0]) return;

    const event = e.touches[0];
    // 这里可以添加桑基图的交互逻辑
    // 由于桑基图的交互比较复杂，这里只是示例
    console.log('Sankey touch event:', event.x, event.y);
  },

  sankeyTouchmove: function (e) {
    const chartId = e.currentTarget.dataset.chart;
    let chart;

    switch (chartId) {
      case 'sankey1':
        chart = sankeyChart1;
        break;
      case 'sankey2':
        chart = sankeyChart2;
        break;
      case 'sankey3':
        chart = sankeyChart3;
        break;
      default:
        return;
    }

    if (!chart || !e.touches[0]) return;

    const event = e.touches[0];
    // 这里可以添加桑基图的移动交互逻辑
    console.log('Sankey move event:', event.x, event.y);
  },
});
