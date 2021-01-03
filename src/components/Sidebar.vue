<template>
  <el-collapse v-model="activeName" :class="['sidebar']">
    <template v-if="!item.hidden" v-for="(item, index) in children">
      <div v-if="!item.children" :class="['sidebar-item', `level-${level}`]">
        <div
          :class="[
            'title',
            {
              selected:
                curRoute.name === item.name ||
                curRoute.meta.selectedRouteName === item.name,
            },
          ]"
          :style="{
            'padding-left': level * 20 + 'px',
          }"
          @click="goPage(item)"
        >
          <div
            v-if="
              curRoute.name === item.name ||
              curRoute.meta.selectedRouteName === item.name
            "
            class="left-line"
          ></div>

          {{ item.meta && item.meta.title ? item.meta.title : "" }}

          <img
            v-if="item.children && item.children.length"
            :class="['icon-down', { up: item.show }]"
            src="@/assets/img/odc/icon-down.png"
          />
        </div>
      </div>
      <el-collapse-item v-else :name="item.name">
        <template slot="title">
          <div
            :class="['title', `level-${level}`]"
            :style="{
              'padding-left': level * 20 + 'px',
            }"
          >
            {{ item.meta && item.meta.title ? item.meta.title : "" }}
          </div>
        </template>

        <template v-if="!item.hidden">
          <!-- 子路由(自己引自己实现递归，直接引用export default中的name属性即可) -->
          <Sidebar
            v-if="item.children && item.children.length"
            :children="item.children"
            :level="level + 1"
          ></Sidebar>
        </template>
      </el-collapse-item>
    </template>
  </el-collapse>
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
    // 当前路由级别
    level: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      // sidebar: [], // 侧边栏
      activeName: "",
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
          this.activeName = item.name;
        }
      });

      this.$forceUpdate();
    },

    goPage(item) {
      // 如果含有子路由，不跳转，展开子路由视图
      if (item.children && item.children.length) {
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
  background: #fff;

  /deep/ .el-collapse-item {
    .el-collapse-item__header {
      border-bottom: 1px solid #ebeef5;

      .title {
        width: 100%;

        font-weight: 600;
        color: #0672ff;
        cursor: pointer;
        text-align: left;
        font-size: 14px;
        line-height: 22px;
        color: #333;
        padding-right: 60px;
      }
    }

    .el-collapse-item__wrap {
      .el-collapse-item__content {
        padding-bottom: 0;
      }
      .el-collapse {
        border-top: none;
        border-bottom: none;
      }
      .sidebar-item {
        border-bottom: none;
      }
    }
  }

  .sidebar-item {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: #0672ff;
    cursor: pointer;
    text-align: right;
    border-bottom: 1px solid #ebeef5;

    font-size: 14px;
    line-height: 22px;
    color: #333333;

    transition: $base-transition;
    overflow: hidden;

    width: 100%;
    height: 46px;

    .title {
      // padding-right: 180px;

      position: absolute;
      box-sizing: border-box;
      width: 100%;
      height: 46px;
      text-align: left;
      line-height: 46px;

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

      .left-line {
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: #0672ff;
      }

      &.selected {
        // border-left: 4px solid #0672ff;
        color: #0672ff;
        background: #c6dfff;
        // background: #f5f5f5;
      }
    }
  }
}
</style>
