<template>
  <div class="CssVar-container" :style="cssVar">
    <div class="css-var-loading">
      <h4>一、利用css变量做loading</h4>
      <VarLoading></VarLoading>
    </div>

    <el-divider content-position="left"> </el-divider>

    <div class="car-part">
      <h4>二、css变量和"calc"计算属性结合，使js控制css样式更优雅。</h4>
      <div class="car">我是丰田卡罗拉</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.CssVar-container {
  .car-part {
    height: 100px;
    .car {
      font-size: calc(var(--size) * 1px);
    }
  }
}
</style>

<script>
import VarLoading from "./components/var-loading/Index.vue";

export default {
  name: "CssVar",
  components: {
    VarLoading,
  },
  data() {
    return {
      cssVar: {
        "--size": 12,
      },

      mark: 0,
      type: "add", // add 或 sub
    };
  },
  mounted() {
    this.change();
  },
  methods: {
    change() {
      requestAnimationFrame(() => {
        let size = this.cssVar["--size"];
        // size++

        this.mark++;

        if (this.mark >= 20) {
          this.mark = 0;
          this.type = this.type === "add" ? (this.type = "sub") : "add";
        }

        if (this.type === "add") {
          this.cssVar["--size"]++;
        } else {
          this.cssVar["--size"]--;
        }

        this.change();
      });
    },
  },
};
</script>
