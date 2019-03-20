/*
 * chart config
 */
module.exports = {
    // in browser?
    inBrowser: typeof window !== 'undefined',

    background: '#fff',

    // line chart
    line: {
        colors: [
            '#fe5d4e',  // 红
            '#43c2f7'   // 蓝
        ]
    },

    // pie chart
    pie: {
        colors: [
            '#fe5d4e',  // 红
            '#43c2f7',   // 蓝
            '#707ad9', 
            '#3ba8ff', 
            '#ffa92f'
        ]
    },

    // bar chart
    bar: {
        margin: 60,
        colors: [
            '#fe5d4e',  // 红
            '#43c2f7',   // 蓝
            '#707ad9', 
            '#3ba8ff', 
            '#ffa92f'
        ]
    },

    dash: {
        color: '#e2e2e2',    // 灰
        length: 3   // 长度6px
    },

    font: {
        color: '#666',  // 字体颜色
        fontSize: {
            x: '12px',  // 字体大小（x轴）
            y: '10px'   // 字体大小（y轴）
        }
    }
};