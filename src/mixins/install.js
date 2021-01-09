
import base from './base'

export default {
  install(Vue) {
    Vue.mixin({
      ...base,
    })
  }
}