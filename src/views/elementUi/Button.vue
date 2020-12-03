<template>
  <div class="element-button">
    <div>
      <Title v-title="'button'"></Title>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div>
  </div>
</template>

<script>
import Title from "@/components/commonElement/Title.vue";

// 工具函数
export default {
  name: "Button",
  components: {
    Title,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.element-button {
}
</style>
