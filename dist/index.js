/**
 * FundCharts
 * @description: 移动端轻量级canvas数据可视化组件。折线图、饼图(环形图)、柱状图、雷达图（蜘蛛图）、散点图、k线图。
 * @version: 0.9.1
 * @author: Micheal Wayne(michealwayne@163.com)
 * @build time: 2018-11-22
 * @update time: 2019-07-18
 */

module.exports = {
    line: require('./LineChart').default,
    pie: require('./PieChart').default,
    bar: require('./BarChart').default,
    radar: require('./RadarChart').default,
    scatter: require('./ScatterChart').default,
    kline: require('./KlineChart').default
};