<template>
  <div class="Verify-container">
    <Verify
      @success="success"
      :imgName="imgName"
      @error="error"
      :showButton="false"
      :type="1"
    ></Verify>

    <el-divider content-position="left"></el-divider>

    <Verify
      @success="success"
      :imgName="imgName"
      @error="error"
      :showButton="false"
      :type="2"
    ></Verify>

    <el-divider content-position="left"></el-divider>

    <Verify
      @success="success"
      :imgName="imgName"
      @error="error"
      :showButton="false"
      :type="3"
    ></Verify>

    <el-divider content-position="left"></el-divider>

    <Verify
      @success="success"
      :imgName="imgName"
      @error="error"
      :showButton="false"
      :type="4"
    ></Verify>

    <el-divider content-position="left"></el-divider>

    <Verify
      @success="success"
      :imgName="imgName"
      @error="error"
      :showButton="false"
      :type="5"
    ></Verify>
  </div>
</template>

<script>
import Verify from "./verifyPlugin/components/Verify";

export default {
  name: "VerifyPage",
  data() {
    return {
      imgName: [
        "http://118.190.207.166:8890/uploads/image/cut_072657_2966.png",
        "http://erp.tpdoc.cn/uploads/image/cut_080300_8791.png",
        "http://erp.tpdoc.cn/uploads/image/cut_040225_2724.png",
        "http://118.190.207.166:8890/uploads/image/cut_070439_2263.png",
      ],
    };
  },
  props: {},
  mixins: [],
  components: { Verify },
  computed: {},
  filters: {},
  watch: {},
  // vue-router路由守卫，前置
  beforeRouteUpdate(to, from, next) {
    next();
  },
  // 销毁组件时执行
  destroyed() {},
  created() {},
  mounted() {},
  methods: {
    success(obj) {
      this.eleToast(this, "success", "success");
      obj.refresh();
    },
    error() {
      this.eleToast(this, "fail", "error");
    },
  },
};
</script>

<style lang="scss" scoped>
.Verify-container {
}
</style>
