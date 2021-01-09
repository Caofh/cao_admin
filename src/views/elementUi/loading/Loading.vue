<template>
  <div class="loading-container">
    <el-divider content-position="left">传统loading</el-divider>
    <el-button type="primary" @click="handleLoading()">默认效果</el-button>
    <el-button type="primary" @click="handleLoading(1)">效果1</el-button>
    <el-button type="primary" @click="handleLoading(2)">效果2</el-button>
    <el-button type="primary" @click="handleLoading(3)">效果3</el-button>
    <el-button type="primary" @click="handleLoading(4)">效果4</el-button>
    <el-button type="primary" @click="handleLoading(5)">效果5</el-button>
    <el-button type="primary" @click="handleLoading(6)">效果6</el-button>
    <el-button type="primary" @click="handleLoading(7)">效果7</el-button>
    <el-button type="primary" @click="handleLoading(8)">效果8</el-button>
    <el-button type="primary" @click="handleLoading(9)">效果9</el-button>
    <br />
    <br />
    <br />
    <el-divider content-position="left">多彩loading</el-divider>
    <el-button type="primary" @click="handleColorfullLoading(1)">
      效果1
    </el-button>
    <el-button type="primary" @click="handleColorfullLoading(2)">
      效果2
    </el-button>
    <el-button type="primary" @click="handleColorfullLoading(3)">
      效果3
    </el-button>
    <el-button type="primary" @click="handleColorfullLoading(4)">
      效果4
    </el-button>
  </div>
</template>

<script>
import { Loading } from "element-ui";

export default {
  name: "Loading",
  data() {
    return {
      loadingText: "正在加载中...",
    };
  },
  methods: {
    handleLoading(index) {
      const Loading = this.$baseLoading(index);
      setTimeout(() => {
        Loading.close();
      }, 1000);
    },
    handleColorfullLoading(index) {
      const Loading = this.$baseColorfullLoading(index);
      setTimeout(() => {
        Loading.close();
      }, 1000);
    },

    /* 全局加载层 */
    $baseLoading(index, text) {
      let loading;
      if (!index) {
        loading = Loading.service({
          lock: true,
          text: text || this.loadingText,
          background: "hsla(0,0%,100%,.8)",
        });
      } else {
        loading = Loading.service({
          lock: true,
          text: text || this.loadingText,
          spinner: "vab-loading-type" + index,
          background: "hsla(0,0%,100%,.8)",
        });
      }
      return loading;
    },
    /* 全局多彩加载层 */
    $baseColorfullLoading(index, text) {
      let loading;
      if (!index) {
        loading = Loading.service({
          lock: true,
          text: text || this.loadingText,
          spinner: "dots-loader",
          background: "hsla(0,0%,100%,.8)",
        });
      } else {
        switch (index) {
          case 1:
            index = "dots";
            break;
          case 2:
            index = "gauge";
            break;
          case 3:
            index = "inner-circles";
            break;
          case 4:
            index = "plus";
            break;
        }
        loading = Loading.service({
          lock: true,
          text: text || this.loadingText,
          spinner: index + "-loader",
          background: "hsla(0,0%,100%,.8)",
        });
      }
      return loading;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/loading.scss";

.loading-container {
  .el-button {
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 0;
  }

  .el-button + .el-button {
    margin-right: 10px;
    margin-left: 0;
  }
}
</style>
