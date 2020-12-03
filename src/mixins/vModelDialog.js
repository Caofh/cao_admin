/**
 * 可以使用v-model绑定弹窗组件的显示隐藏（缺点不可多个弹窗共同使用）
 用法：
  子组件：
  <template>
    <div v-if="innerVisible">
    
    </div>
  </template>

  父组件调用自组件：
  <Son v-model="show"></Son>

  父组件js:
  this.show = false

  methods: {
    toggle () {

    }
  }
 */
export default {
  model: {
    prop: 'visible',
    event: 'toggle'
  },
  props: {
    visible: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  computed: {
    innerVisible: {
      get: function () {
        return this.visible
      },
      set: function (val) {
        this.$emit('toggle', val)
      }
    }
  }
}
