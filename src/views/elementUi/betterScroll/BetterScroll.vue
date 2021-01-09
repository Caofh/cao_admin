<template>
  <div class="better-scroll-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        动画时长
        <el-slider
          v-model="time"
          style="width: 300px"
          :min="100"
          :max="3000"
        ></el-slider>

        <el-button @click="handleScrollTo(100)">滚动到100像素位置</el-button>
        <el-button @click="handleScrollTo(300)">滚动到300像素位置</el-button>
        <el-button @click="handleScrollBy(100)">向下滚动100像素</el-button>
        <el-button @click="handleScrollBy(-50)">向上滚动50像素</el-button>
        <el-button @click="handleScrollToElement(15)">滚动到第15个</el-button>
        <el-button @click="handleScrollToElement(25)">滚动到第25个</el-button>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div ref="wrapper" class="right-content">
          <ul>
            <li v-for="n in 100" :id="`bs-item-${n}`" :key="n">n : {{ n }}</li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BScroll from "better-scroll";
// import BScroll from "@better-scroll/core";

export default {
  name: "BetterScroll",
  data() {
    return {
      time: 1000,
      BS: null,
    };
  },
  mounted() {
    this.scrollInit();
  },
  beforeDestroy() {
    this.scrollDestroy();
  },
  methods: {
    handleScrollTo(y) {
      this.BS.scrollTo(0, -y, this.time);
    },
    handleScrollBy(y) {
      this.BS.scrollBy(0, -y, this.time);
    },
    handleScrollToElement(n) {
      this.BS.scrollToElement(`#bs-item-${n}`, this.time);
    },
    scrollInit() {
      this.BS = new BScroll(this.$refs["wrapper"], {
        probeType: 3,
        click: true,
        pullUpLoad: true,
      });

      this.BS.on("scrollStart", () => {
        console.log("scrollStart-");
      });
      this.BS.on("scroll", ({ y }) => {
        console.log("scrolling-");
      });
      this.BS.on("scrollEnd", (pos) => {
        console.log(pos);
      });
      this.BS.on("pullingUp", () => {
        //当滚动到底部的时候调用。
        console.log("底部到了");

        // 400ms后提供下一次的pullingUp消费机会(文档：https://better-scroll.github.io/docs/zh-CN/plugins/pullup.html#%E4%BD%BF%E7%94%A8)
        setTimeout(() => {
          this.BS.finishPullUp();
        }, 400);
      });
    },
    scrollDestroy() {
      if (this.BS) {
        this.BS.destroy();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.better-scroll-container {
  .right-content {
    height: 300px;
    margin-top: 40px;
    overflow: hidden;
  }
}
</style>
