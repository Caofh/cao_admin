<template>
  <div id="app">
    <!-- nav -->
    <Nav></Nav>

    <div class="main-content c-flex-x-start">
      <Sidebar
        v-if="children && children.length"
        :children="children"
      ></Sidebar>

      <!-- 主内容(ani:本标识为选择是否显示页面切换转场效果) -->
      <transition-group
        v-if="ani"
        :class="[
          'main-transition',
          { 'has-sidebar': children && children.length },
        ]"
        mode="out-in"
        name="fade-transform"
      >
        <router-view v-if="newPage" :key="key" class="container" />
      </transition-group>
      <div v-else-if="newPage" class="main-transition">
        <router-view :key="key" class="container" />
      </div>
    </div>
  </div>
</template>

<script>
// vuex
import { mapMutations, mapActions, mapState } from "vuex";

// 组件
import Nav from "@/components/Nav.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "App",
  components: {
    Nav,
    Sidebar,
  },
  data() {
    return {
      newPage: true, // 新页面显示标识
      children: "", // 当前页的子路由
    };
  },
  computed: {
    ...mapState([
      "curRoute", // 当前路由
      "ani", // 是否显示转场效果
    ]),
    key() {
      return this.$route.path;
    },
  },
  watch: {
    $route: {
      handler(route) {
        // 页面交互效果
        this.newPage = false;
        setTimeout(() => {
          this.newPage = true;
        }, 200);

        // 侧边栏数据
        let routeMainName =
          this.curRoute &&
          this.curRoute.matched &&
          this.curRoute.matched[0] &&
          this.curRoute.matched[0].name
            ? this.curRoute.matched[0].name
            : ""; // 当前页面的顶级路由name
        let routeData = this.$router.options.routes.find(
          (item) => item.name === routeMainName
        ); // 当前顶级路由的完整路由信息

        // 当前的子路由数组
        let children =
          routeData && routeData.children ? routeData.children : "";
        if (!children) {
          this.children = children;
        } else {
          setTimeout(() => {
            this.children = children;
          }, 100);
        }
      },
      immediate: true,
    },
  },
  created() {
    setTimeout(() => {
      // let routeMainName = this.curRoute.matched[0].name || '' // 当前页面的顶级路由name
      // let routeData = this.$router.options.routes.find(item => item.name === routeMainName) // 当前顶级路由的完整路由信息
      // // 当前的子路由数组
      // let children = routeData.children || []
      // console.log(children)
    }, 2000);
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
body {
  background: #f5f5f5;

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #333333;

    .main-content {
      margin-top: 20px;
      align-items: flex-start;

      .main-transition {
        box-sizing: border-box;
        width: 100%;
        background: #fff;

        &.has-sidebar {
          width: calc(100% - 240px);
          margin-left: 20px;
        }

        .container {
          text-align: left;
          padding: 10px;
        }
      }
    }
  }
}
</style>
