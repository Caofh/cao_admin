<template>
  <div class="nav c-flex-x-between">
    <div class="left c-flex-x-start">
      <!-- logo -->
      <div class="logo c-flex-x-start">
        <div class="logo-inner" @click="goHome">demo项目</div>
      </div>

      <!-- nav核心部分 -->
      <div class="nav-part c-flex-x-start">
        <div
          :class="[
            'nav-item',
            {
              selected:
                curRoute.matched &&
                curRoute.matched[0] &&
                curRoute.matched[0].name === item.name,
              hidden: !item.name,
            },
          ]"
          v-for="(item, index) in allRouters"
          :key="index"
          v-if="!item.hidden"
          @click="goPage(item, index)"
        >
          {{ item.meta && item.meta.title ? item.meta.title : "" }}
        </div>

        <!-- 下方划线 -->
        <div
          class="under-line"
          v-if="navLineInfo"
          :style="{
            width:
              navLineInfo[activeIndex] && navLineInfo[activeIndex].width
                ? navLineInfo[activeIndex].width + 'px'
                : '0',
            left:
              navLineInfo[activeIndex] && navLineInfo[activeIndex].left
                ? navLineInfo[activeIndex].left + 'px'
                : '0',
          }"
        ></div>
      </div>
    </div>

    <!-- 右边部分 -->
    <div class="right">导航</div>
  </div>
</template>

<script>
/*
  顶部导航组件
*/

// vuex
import { mapMutations, mapActions, mapState } from "vuex";

// 工具函数
import { pushPage } from "@/utils/index.js";
import { jquery_position } from "@/utils/common/node_position.js";

export default {
  name: "Nav",
  props: {},
  data() {
    return {
      activeIndex: 0, // 当前蓝色下划线处于位置的索引
      navLineInfo: "",
    };
  },
  watch: {
    $route: {
      handler(route) {
        if (route.matched && route.matched.length) {
          let name =
            route && route.matched && route.matched[0] && route.matched[0].name
              ? route.matched[0].name
              : ""; // 找到当前路由的顶级路由(一级路由)

          // 设置当前选中nav对应的索引
          this.setActiveIndex(name);
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState([
      "curRoute", // 当前路由
    ]),
    allRouters() {
      return this.$router.options.routes;
    },
  },
  mounted() {
    this.$nextTick(() => {
      // 计算nav中各个项目的位置信息
      this.navPosInfo();
    });
  },
  methods: {
    ...mapMutations([
      "setAni", // 改变转场效果
    ]),

    goHome() {
      pushPage(this, {
        name: "Home",
      });
    },

    // 计算nav中各个项目的位置信息
    navPosInfo() {
      // 所有nav的item的位置信息
      let navLineInfo = this.allRouters.map((item, index) => {
        let nodeInfo = jquery_position($(".nav-part .nav-item").eq(index));

        // 暂存当前所处选中tab的索引
        if (item.name === this.curRoute.name) {
          this.activeIndex = index;
        }

        return {
          width:
            nodeInfo && nodeInfo.width ? Number(nodeInfo.width) - 26 * 2 : 0,
          left: nodeInfo && nodeInfo.p_left ? Number(nodeInfo.p_left) + 26 : 0,
        };
      });

      // 所有nav的item的位置信息
      this.navLineInfo = navLineInfo;
    },

    goPage(item, index) {
      // console.log(item)

      let name = item.name || "";

      // 如果有子路由，默认加载第一个子路由页面
      let children = item.children || [];
      if (children && children.length) {
        name =
          children && children[0] && children[0].name ? children[0].name : "";
      }

      pushPage(this, {
        name: name,
      });
    },
    // 设置当前选中nav对应的索引
    setActiveIndex(name) {
      // 找到当前选中nav对应的索引
      let activeIndex = "";
      for (let i = 0; i < this.allRouters.length; i++) {
        if (
          this.allRouters &&
          this.allRouters[i] &&
          this.allRouters[i].name === name
        ) {
          activeIndex = i;
        }
      }

      this.activeIndex = activeIndex;
    },
  },
};
</script>

<style lang="scss" scoped >
.nav {
  height: 64px;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);

  .logo {
    width: 188px;
    height: 100%;
    padding-left: 24px;
    cursor: pointer;

    .logo-inner {
      width: 108px;
      height: 20px;
      font-family: Gugi;
      font-size: 20px;
      line-height: 100%;
      color: #005edb;
    }
  }

  .nav-part {
    position: relative;

    .nav-item {
      padding: 0 26px;
      height: 100%;
      color: #999999;
      cursor: pointer;

      &.selected {
        font-weight: 500;
        color: #000000;
      }

      &.hidden {
        width: 0;
        height: 0;
        padding: 0;
        margin: 0;
      }
    }

    .under-line {
      position: absolute;
      top: 25px;
      height: 4px;
      background: #0672ff;
      border-radius: 2px;

      transition: $base-transition;
    }
  }
}
</style>
