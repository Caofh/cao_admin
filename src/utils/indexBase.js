
import cookie from 'component-cookie' // 第三方cookie插件：首页地址：https://github.com/component/cookie#readme

let projectName = 'learning_manage'

//返回传递给他的任意对象的类(返回：array、object、number、string)
function typeOf(o) {
  if (o === null) return "Null";
  if (o === undefined) return "Undefined";

  return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
}

// 坐标像素转换(count:设计图(750)上的px值)，设计图的px => 真实dom中的px
function changePx(count) {
  const winWidth = window.screen.width;
  const ratio = winWidth / 750; // 比例
  return count * ratio;
}

/* H5设置本地存储(示例如下)
  1. h5.setStorage('20191111_game_v1', '哈哈哈')
  2. h5.setStorage('20191111_game_v1', {a:1, b:2})
 */
function setStorage(key, value) {
  // if (!/^learning_manage_.*/.test(key)) {
  if (!new RegExp(`^${projectName}_.*`, "g").test(key)) {
    throw new Error(`${projectName}项目设置localStorage的key值必须以"${projectName}_"开头，请修改!`)
    return false
  }

  const v = typeOf(value) === 'string' ? value : JSON.stringify(value) || '';
  localStorage.setItem(key, v);
}

/* H5删除本地存储(示例如下)
  h5.removeStorage('20191111_game_v1')
 */
function removeStorage(key) {
  localStorage.getItem(key) && localStorage.removeItem(key);
}

/* H5获取本地存储(示例如下)
  1. let data = h5.getStorage('20191111_game_v1')
  2. let data = h5.getStorage('20191111_game_v1', 'deviceId')
  console.log(data)
 */
function getStorage(key, subKey) {
  let res = '';
  const stringLocal = localStorage.getItem(key) || '';
  let parseLocal = '';

  try {
    parseLocal = JSON.parse(stringLocal);
  } catch (error) {
    parseLocal = stringLocal;
  }

  // 区分是否有subKey
  if (!subKey) {
    res = parseLocal;
  } else {
    if (typeOf(parseLocal) === 'object') {
      res = parseLocal[subKey] || '';
    }
  }

  return res;
}

// 浏览器返回上一页
function goBack(cache = false) {
  if (cache) {
    // 暂存上一页的input值
    window.history.go(-1)
  } else {
    // 不暂存上一页的input值，全部刷新
    window.history.back(-1)
  }
}

// 当前页面history数量
function historyLen() {
  return window.history.length
}

// 第三方cookie插件：首页地址：https://github.com/component/cookie#readme
/* 设置cookie
  用法一：
  setCookie('topay_cli_manage_name', '123')
 
  用法二：
  setCookie('topay_cli_manage_name', '123', {
    path: /abc/,
    maxage: 60000, // 过期时间（毫秒）
  })
*/
function setCookie(key, value, config) {
  if (!/^topay_cli_manage_.*/.test(key)) {
    throw new Error(
      `${projectName}_项目设置localStorage的key值最必须以"${projectName}_"开头，请修改!`
    )
  }

  let defaultConfig = {
    path: '/'
  }
  Object.assign(defaultConfig, config)

  cookie(key, value, defaultConfig)
}

/*
  用法一：
  clearCookie('htopay_cli_manage_name')
 
  用法二：
  clearCookie('htopay_cli_manage_name', {
    path: /abc/,
  })
*/
function clearCookie(key, config = {}) {
  if (!/^topay_cli_manage_.*/.test(key)) {
    throw new Error(
      `${projectName}_项目设置localStorage的key值最必须以"${projectName}_"开头，请修改!`
    )
  }

  let defaultConfig = {
    path: '/'
  }
  Object.assign(defaultConfig, config)
  cookie(key, null, defaultConfig)
}

/* 获取cookie
  getCookie('topay_cli_manage_name')
*/
function getCookie(key) {
  if (!/^topay_cli_manage_.*/.test(key)) {
    throw new Error(
      `${projectName}_项目设置localStorage的key值最必须以"${projectName}_"开头，请修改!`
    )
  }

  return cookie(key)
}


export {
  typeOf,
  changePx,
  setStorage,
  getStorage,
  removeStorage,
  goBack,
  historyLen,
  setCookie,
  getCookie,
  clearCookie,
};
