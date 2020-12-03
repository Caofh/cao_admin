/* eslint-disable */

import gateWay from './gateway.config'

/*
  基础信息配置文件
 */

// 全局错误提示
const errMsg = '网络错误，请稍后重试~'

// 需要的第三方插件url集合
const sourceJs = {
  eruda: {
    name: 'eruda', //页面调试工具；文档：https://github.com/liriliri/eruda
    global: 'eruda',
    ver: '0.0.1',
    isLoad: true,
    cache: false,
    // src: 'https://mstatic.secooimg.com/activity2018/js/comm/eruda.min.js'
    // src: 'https://cdn.jsdelivr.net/npm/eruda'
    src: `${gateWay.pluginsHost}/plugins/eruda/eruda.min.js`,
  },
  zepto: {
    name: 'zepto', // zepto；文档：https://github.com/madrobby/zepto
    global: 'Zepto', // 第三方插件的全局变量名，用于避免重复加载
    ver: '0.0.1',
    isLoad: true,
    cache: false,
    // src: 'https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js'
    src: `${gateWay.pluginsHost}/plugins/zepto/zepto.min.js`,
  },
  moment: { // 文档：http://momentjs.cn/
    name: 'moment',
    global: 'moment', // 第三方插件的全局变量名，用于避免重复加载
    ver: '0.0.1',
    isLoad: true,
    cache: false,
    // src: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js'
    src: `${gateWay.pluginsHost}/plugins/moment/moment.min.js`,
  },
  echarts: { // 文档：https://echarts.apache.org/zh/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts
    name: 'echarts',
    global: 'echarts', // 第三方插件的全局变量名，用于避免重复加载
    ver: '0.0.1',
    isLoad: true,
    cache: false,
    // src: 'https://cdn.bootcss.com/echarts/3.7.0/echarts.simple.js'
    // src: 'https://lib.baomitu.com/echarts/4.9.0-rc.1/echarts.min.js'
    src: `${gateWay.pluginsHost}/plugins/echarts/echarts.min.js`,
  },
  echartsWordcloud: { // 文档：https://github.com/ecomfe/echarts-wordcloud
    name: 'echartsWordcloud',
    global: 'echartsWordcloud', // 第三方插件的全局变量名，用于避免重复加载
    ver: '0.0.1',
    isLoad: true,
    cache: false,
    src: `${gateWay.pluginsHost}/plugins/echarts/echartsWordcloud.min.js`,
  },
}

export {
  errMsg,
  sourceJs,
}
