

import title from '@/tpl/title.tpl'

export default {
  /*
    ***向所加元素内，向前追加一个title的代码块：<div class="title">我是标题</div>
    用法：
    <div v-title="我是标题"></div>
  */
  title: {
    inserted: function (el, binding) {
      // console.log(el)
      // console.log(el.parentNode)
      // console.log(binding)

      // 添加title
      let html = title({
        title: binding.value
      })

      let nodeInner = $(el).children('.inner')
      if (nodeInner.length) {
        $(el).children('.inner').prepend(html)
      } else {
        $(el).prepend(html)
      }

    }

  }
}
