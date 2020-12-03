<template>
  <div :class="['dialog', { scroll: scroll }]" v-if="myShow" @click="close">
    <div :class="[`inner`, `${type}`, { show: innerShow }]" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
/*
  // 参数：
  type：弹窗效果：fade：渐入；moveUp：自下而上（默认为fade）
  v-title：自定义指令；可选
  scroll：弹窗内容可以滚动；可选

  // 使用方法：
  <Dialog v-model="show" v-title="'我是标题'" scroll :type="'fade'">
    <div class="dia-inner">123</div>
  </Dialog>
*/
export default {
  name: "Dialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "fade",
    },
    scroll: Boolean, // 允许弹窗滚动
  },
  data() {
    return {
      myShow: false,
      innerShow: false,
    };
  },
  computed: {},
  watch: {
    value(newValue, oldValue) {
      this.myShow = newValue;
      // 渐入效果
      this.$nextTick(() => {
        setTimeout(() => {
          this.innerShow = newValue;
        }, 50);
      });
    },
    myShow(newValue, oldValue) {
      this.$emit("input", newValue);
    },
  },
  mounted() {},
  methods: {
    close() {
      this.myShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);

  .inner {
    position: absolute;
    transition: all 0.2s linear;
    background: #fff;

    &.fade {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
    }

    &.moveUp {
      top: 100%;
      left: 50%;
      transform: translate(-50%, 0);
    }

    &.show {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 1;
    }

    /deep/ .title {
      box-sizing: border-box;
      width: 100%;
      padding: 16px 20px;
      font-size: 16px;
      font-weight: 600;
      border-bottom: 1px solid #f0f0f0;
    }
  }

  &.scroll {
    overflow-y: scroll;

    .inner {
      position: none;
      top: 0;
      left: 50%;
      transform: translate(-50%, 0);
      margin: 100px 0;
    }
  }
}
</style>
