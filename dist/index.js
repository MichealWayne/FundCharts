/**
 * FundCharts
 * @description: lightweight canvas charts. include: Line、Circle、Bar、Radar、Scatter、K-line.
 * @version: 0.9.10
 * @author: Micheal Wayne(michealwayne@163.com)
 * @build time: 2018-11-22
 * @update time: 2021-09-25
 */

module.exports = {
  line: require('./LineChart').default,
  pie: require('./PieChart').default,
  bar: require('./BarChart').default,
  radar: require('./RadarChart').default,
  scatter: require('./ScatterChart').default,
  kline: require('./KlineChart').default
};