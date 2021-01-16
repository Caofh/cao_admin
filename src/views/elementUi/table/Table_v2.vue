<template>
  <div class="group-list-container">
    <!-- title -->
    <Title class="title" v-title="'小组管理'"></Title>
    <!-- title -->

    <div class="condition c-flex-x-between">
      <div class="condition-1 c-flex-x-start">
        <el-input
          class="email"
          v-model="condition.email"
          placeholder="请输姓名或邮箱"
        ></el-input>

        <div class="choose-times">
          <el-date-picker
            v-model="condition.times"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
        </div>

        <div class="confirm c-flex-x-center">筛选</div>
        <div class="export c-flex-x-center">导出数据</div>
      </div>

      <div class="condition-2 c-flex-x-end">
        <div class="btn">创建小组</div>
      </div>
    </div>

    <!-- 表格 -->
    <div class="table-list">
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column fixed label="ID" width="80">
          <template slot-scope="scope">
            <div class="c-flex-x-start">
              {{ scope.$index }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="名称"> </el-table-column>
        <el-table-column label="图片" width="100">
          <template slot-scope="scope">
            <div class="c-flex-x-start" @click="showView(scope.row)">
              <img class="img" :src="scope.row.imgUrl || ''" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="小组属性"> </el-table-column>
        <el-table-column prop="province" label="成员数"> </el-table-column>
        <el-table-column prop="city" label="状态"> </el-table-column>
        <el-table-column prop="address" label="创建时间" width="300">
        </el-table-column>
        <el-table-column label="排序" width="80">
          <template slot-scope="scope">
            <el-input placeholder="排序序号"></el-input>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >进入小组</el-button
            >
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >上线</el-button
            >
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pagination c-flex-x-end">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 分页 -->
    <!-- 表格 -->

    <!-- 预览大图组件（elementUi） -->
    <ImageViewer
      v-if="showViewer"
      :on-close="viewClose"
      :initialIndex="initialIndex"
      :url-list="srcList"
    />
    <!-- 预览大图组件（elementUi） -->
  </div>
</template>

<script>
// vuex
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

// 工具函数
import { goPage } from "@/utils";
import ImageViewer from "@/components/commonElement/imageViewer/image-viewer.vue";
import Title from "@/components/commonElement/Title.vue";
import { stopScroll } from "@/utils/index.js";

export default {
  name: "group-list-container",
  data() {
    // 每页的pageSize
    let pageSizes = [20, 40, 100];

    return {
      loading: true,
      tableData: [],
      // 分页
      pageSizes: pageSizes,
      pageSize: pageSizes[0],
      currentPage: 1,
      total: 0,
      // 分页

      // 筛选条件
      condition: {
        email: "", // 邮箱
        times: "", // 选择的时间范围
      },
      // 时间快捷选项
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },

      // 预览大图
      srcList: [],
      initialIndex: 0, // 当前图片索引
      showViewer: false,
      // 预览大图
    };
  },
  props: {},
  components: {
    ImageViewer,
    Title,
  },
  mixins: [],
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
  mounted() {
    this.start();
  },
  methods: {
    start() {
      let page = 1;
      this.loadData(page);
    },

    loadData(page) {
      this.loading = true;

      setTimeout(() => {
        this.tableData = [
          {
            date: "2016-05-02",
            name: "王小虎",
            imgUrl:
              "http://118.190.207.166:8890/uploads/image/cut_071918_8935.png",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333,
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            imgUrl:
              "http://118.190.207.166:8890/uploads/image/cut_071918_8935.png",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1517 弄",
            zip: 200333,
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            imgUrl:
              "http://118.190.207.166:8890/uploads/image/cut_071918_8935.png",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1519 弄",
            zip: 200333,
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            imgUrl:
              "http://118.190.207.166:8890/uploads/image/cut_071918_8935.png",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1516 弄",
            zip: 200333,
          },
        ];
        this.total = 400;

        this.loading = false;
      }, 400);
    },

    handleClick(row) {
      console.log(row);

      this.pushPage({
        name: "groupDetail",
      });
    },
    showView(item) {
      stopScroll(true);

      let imgList = [item.imgUrl];
      this.srcList = imgList;

      // 当前图片索引
      this.initialIndex = 0;

      console.log(this.srcList);
      console.log(this.initialIndex);

      this.showViewer = true;
    },
    viewClose() {
      stopScroll(false);
      this.showViewer = false;
    },

    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);

      this.loadData(val);
    },
    // 分页
  },
};
</script>

<style lang="scss" scoped>
.group-list-container {
  padding: 20px;

  .title {
    margin-bottom: 20px;
  }

  .condition {
    margin-bottom: 20px;

    .condition-1 {
      .email {
        width: 200px;
        margin-right: 20px;
      }

      .choose-times {
        margin-right: 20px;
      }

      .confirm {
        @include btn;
        margin-right: 20px;
      }

      .export {
        @include fontLight {
          line-height: 20px;
          color: #0672ff;
        }
      }
    }

    .condition-2 {
      .btn {
        @include btn {
          width: 100px;
          height: 34px;
          line-height: 34px;
          background: #0672ff;
          border: none;
          color: #fff;
        }
      }
    }
  }

  .table-list {
    // min-height: 100px;

    /deep/ .is-leaf {
      background: #fafafa;
      border: none;
      border-bottom: 1px solid #ebebeb;
    }

    /deep/ td {
      padding: 4px 0;
      border: none;
      border-bottom: 1px solid #ebebeb;
    }

    .img {
      width: 50px;
      height: 50px;
      cursor: pointer;
    }
  }

  .pagination {
    margin-top: 20px;
  }
}
</style>
