/* eslint-disable */

const protocol = window.location.protocol // 当前协议
const host = protocol + '//' + window.location.host // 当前host

// 开发环境地址(npm run serve)
const devHost = {
  // 接口地址域名相关
  baseApi: 'http://tpdoc.cn:3001',
  pluginsHost: '', // 第三方资源地址

}

// 测试环境地址(npm run test)
const testHost = {
  // 接口地址域名相关
  baseApi: 'http://tpdoc.cn:3001',
  pluginsHost: `${host}/project/cao_admin/dist`, // 第三方资源地址

}

// 线上环境地址(npm run build)
const proHost = {
  // 接口地址域名相关
  baseApi: 'http://tpdoc.cn:3001',
  pluginsHost: `${host}/project/cao_admin/dist`, // 第三方资源地址

}

// 区分环境选择静态资源地址
const env = process.env.VUE_APP_ENV

let exportConfig = ''
if (env === 'production') {
  exportConfig = proHost
} else if (env === 'test') {
  exportConfig = testHost
} else {
  exportConfig = devHost
}


export default exportConfig


