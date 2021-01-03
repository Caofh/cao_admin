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
      <el-link
        class="link"
        type="primary"
        href="https://element.eleme.io/#/zh-CN/component/button"
        target="_blank"
      >
        elementui的button地址
      </el-link>
    </div>

    <div class="icon-part">
      <Title v-title="'icon'"></Title>
      <i class="el-icon-edit"></i>
      <i class="el-icon-share"></i>
      <i class="el-icon-platform-eleme"></i>
      <i class="el-icon-eleme"></i>
      <i class="el-icon-delete-solid"></i>
      <i class="el-icon-delete"></i>
      <i class="el-icon-s-tools"></i>
      <i class="el-icon-setting"></i>
      <el-link
        class="link"
        type="primary"
        href="https://element.eleme.io/#/zh-CN/component/icon"
        target="_blank"
      >
        elementui的icon地址
      </el-link>
    </div>

    <div class="link-part">
      <Title v-title="'link'"></Title>
      <el-link href="javascript:;"> 默认链接 </el-link>
      <el-link
        class="link"
        type="primary"
        href="https://element.eleme.io/#/zh-CN/component/link"
        target="_blank"
      >
        elementui的link地址
      </el-link>
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
  .icon-part {
    /deep/ i {
      font-size: 20px;
      margin: 0 10px 10px 0;
    }
  }

  .link {
    margin-left: 50px;
    font-size: 18px;
  }
}
</style>
