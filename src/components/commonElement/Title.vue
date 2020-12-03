<template>
  <div class="title-container">
    <slot></slot>
  </div>
</template>

<script>
/*
  // 参数：
  v-title：自定义指令；可选
  可添加自定义插槽

  // 使用方法一：
  <Title v-title="'我是标题'"></Title>

  // 使用方法二：
  <Title>
    <div class="title">我是标题</div>
  </Title>

*/

// vuex
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

// 工具函数
import { goPage } from "@/utils";

export default {
  name: "Title",
  data() {
    return {};
  },
  props: {},
  components: {},
  mixins: [],
  components: {},
  computed: {},
  filters: {},
  watch: {
    demoWatch: {
      handler(newValue, oldValue) {
        // console.log(newValue, oldValue);
      },
      immediate: true,
    },
    demoWatch1(newValue, oldValue) {
      // console.log(newValue, oldValue);
    },
  },
  // vue-router路由守卫，前置
  beforeRouteUpdate(to, from, next) {
    next();
  },
  // 销毁组件时执行
  destroyed() {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.title-container {
  /deep/ .title {
    font-size: 20px;
    font-weight: 600;
    padding: 8px 10px;
    margin-bottom: 10px;
  }
}
</style>
