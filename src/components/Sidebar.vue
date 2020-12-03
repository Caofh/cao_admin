<template>
  <div class="sidebar c-flex-y-start">
    <!-- 子路由侧边栏 -->
    <div
      :class="['sidebar-item']"
      :style="{
        height:
          item.show && item.children && item.children.length
            ? (item.children.filter((item) => !item.hidden).length + 1) * 46 +
              'px'
            : '46px',
      }"
      v-for="(item, index) in children"
      :key="index"
    >
      <template v-if="!item.hidden">
        <div
          :class="[
            'title',
            'c-flex-x-end',
            {
              selected:
                curRoute.name === item.name ||
                curRoute.meta.selectedRouteName === item.name,
            },
          ]"
          @click="goPage(item)"
        >
          {{ item.meta && item.meta.title ? item.meta.title : "" }}

          <img
            v-if="item.children && item.children.length"
            :class="['icon-down', { up: item.show }]"
            src="@/assets/img/odc/icon-down.png"
          />
        </div>

        <!-- 子路由(自己引自己实现递归，直接引用export default中的name属性即可) -->
        <Sidebar
          v-if="item.children && item.children.length"
          :children="item.children"
        ></Sidebar>
      </template>
    </div>
  </div>
</template>

<script>
/*
  侧边栏组件
*/

// vuex
import { mapMutations, mapActions, mapState } from "vuex";

// 工具函数
import { pushPage } from "@/utils/index.js";
import { deepClone } from "@/utils/common/deepClone.js";

export default {
  name: "Sidebar",
  components: {},
  props: {
    children: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      // sidebar: [], // 侧边栏
    };
  },
  watch: {
    children: {
      handler(route) {
        // 添加侧边栏显示子路由标识(自动打开折叠)
        this.addToggleMark();
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState([
      "curRoute", // 当前路由
    ]),
  },
  beforeMount() {},
  beforeDestroy() {},
  created() {},
  mounted() {},
  methods: {
    // 添加侧边栏显示子路由标识(自动打开折叠)
    addToggleMark() {
      // 找到当前子路由的上一级路由的name
      let autoName = this.curRoute.matched[this.curRoute.matched.length - 2]
        .name;

      this.children.map((item) => {
        // 自动打开折叠
        if (item.name === autoName) {
          item.show = true;
        } else {
          item.show = false;
        }
      });

      this.$forceUpdate();
    },

    goPage(item) {
      // 如果含有子路由，不跳转，展开子路由视图
      if (item.children && item.children.length) {
        item.show = !item.show;

        this.$forceUpdate();

        return false;
      }

      let name = item.name || "";

      pushPage(this, {
        name: name,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 200px;

  .sidebar-item {
    box-sizing: border-box;
    width: 100%;
    // height: 46px;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: #0672ff;
    cursor: pointer;
    // padding-right: 80px;
    text-align: right;

    font-size: 14px;
    line-height: 22px;
    color: #333333;

    transition: $base-transition;
    overflow: hidden;

    .title {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: 46px;
      padding-right: 80px;

      .icon-down {
        position: absolute;
        width: 9px;
        height: 5px;
        top: 18px;
        right: 27px;

        transition: $base-transition;

        &.up {
          transform: rotate(-180deg);
        }
      }

      &.selected {
        border-left: 4px solid #0672ff;
        color: #0672ff;
        background: #c6dfff;
      }
    }
  }
}
</style>
