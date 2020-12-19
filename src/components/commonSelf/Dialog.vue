<template>
  <div :class="['dialog', { scroll: scroll }]" v-if="myShow" @click="close">
    <div :class="[`inner`, `${type}`, { show: innerShow, bg: bg }]" @click.stop>
      <div class="close" @click="close">
        <svg
          t="1608368479020"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1153"
        >
          <path
            d="M585.412525 512.594747L973.601616 124.418586c19.600808-19.600808 19.600808-51.898182 0-71.49899l-2.120404-2.120404c-19.600808-19.600808-51.898182-19.600808-71.49899 0L511.793131 439.518384 123.61697 50.799192c-19.600808-19.600808-51.898182-19.600808-71.49899 0l-2.120404 2.120404c-20.11798 19.600808-20.11798 51.898182 0 71.49899l388.189091 388.189091L49.997576 900.783838c-19.587879 19.600808-19.587879 51.898182 0 71.49899l2.120404 2.120404c19.600808 19.600808 51.898182 19.600808 71.49899 0L511.793131 586.214141l388.189091 388.176162c19.600808 19.600808 51.898182 19.600808 71.49899 0l2.120404-2.120404c19.600808-19.600808 19.600808-51.898182 0-71.49899L585.412525 512.594747z m0 0"
            p-id="1154"
          ></path>
        </svg>
      </div>

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
  bg：是否含有默认内容背景色（白色）；true：有背景色；false：无背景色；默认true；

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
    // 弹窗内容默认颜色(可关掉)
    bg: {
      type: Boolean,
      default: true,
    },
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
      this.$emit("dialogClose");
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
  background: rgba(51, 51, 51, 0.7);
  z-index: 999;

  .inner {
    position: absolute;
    transition: all 0.2s linear;

    &.bg {
      background: #fff;
    }

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
      background: #fff;
    }

    .close {
      position: absolute;
      top: 16px;
      right: 20px;
      width: 14px;
      height: 14px;
      cursor: pointer;
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
