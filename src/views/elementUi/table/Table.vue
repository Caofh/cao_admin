<template>
  <div class="Table-container">
    <!-- title -->
    <Title v-title="'表格'"></Title>
    <!-- title -->

    <!-- 表格 -->
    <el-table class="table-list" :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="date" label="日期" width="200">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="200"> </el-table-column>
      <el-table-column label="图片" width="80">
        <template slot-scope="scope">
          <div class="c-flex-x-center" @click="showView(scope.row)">
            <img class="img" :src="scope.row.imgUrl || ''" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="province" label="省份" width="200">
      </el-table-column>
      <el-table-column prop="city" label="市区" width="200"> </el-table-column>
      <el-table-column prop="address" label="地址" width="300">
      </el-table-column>
      <el-table-column prop="zip" label="邮编" width="200"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格 -->

    <!-- 分页 -->
    <div class="pagination c-flex-x-end">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
    <!-- 分页 -->

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
  name: "Table",
  data() {
    return {
      tableData: [
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
      ],

      // 预览大图
      srcList: [],
      initialIndex: 0, // 当前图片索引
      showViewer: false,
      // 预览大图

      // 分页
      currentPage: 4,
      // 分页
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
  mounted() {},
  methods: {
    handleClick(row) {
      console.log(row);
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
    },
    // 分页
  },
};
</script>

<style lang="scss" scoped>
.Table-container {
  .table-list {
    /deep/ td {
      padding: 4px 0;
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
