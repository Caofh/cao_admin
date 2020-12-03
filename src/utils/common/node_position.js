
// 基于jquery返回所有位置相关信息(传入jquery对象)
function jquery_position ($node) {
  let offset = $node.offset()

  let position = $node.position()
  // console.log(offset)
  // console.log(position)
  if (position) {
    offset.p_top = position && position.top ? position.top : ''
    offset.p_left = position && position.left ? position.left : ''
  }

  return offset
}

// 原生js返回所有位置相关信息(传入js原声对象)
/*
let ele = document.querySelector('.information')
let nodeInfo = origin_position(ele)

console.log(nodeInfo)
*/
function origin_position (ele) {
  let rect = ele.getBoundingClientRect()

  // 相对于positio父级元素位置
  let p_top = ele.offsetTop
  let p_left = ele.offsetLeft

  rect.p_top = p_top
  rect.p_left = p_left

  return rect
}

// window的宽高
function origin_window () {
  const innerW = window.innerWidth
  const innerH = window.innerHeight
  const top = document.documentElement.scrollTop
  const left = document.documentElement.scrollLeft

  return {
      width: innerW,
      height: innerH,
      top: top,
      left: left,
  }
}

export {
  jquery_position,
  origin_position,
  origin_window,
}
