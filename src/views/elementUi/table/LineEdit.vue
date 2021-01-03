<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip min-width="300px" label="标题">
        <template slot-scope="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.title" style="width: 300px" />
            <el-button
              class="cancel-btn"
              type="warning"
              @click="cancelEdit(row)"
            >
              取消
            </el-button>
          </template>
          <span v-else>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="作者"
        prop="author"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="操作"
        width="200"
      >
        <template slot-scope="{ row }">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            @click="confirmEdit(row)"
          >
            保存
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="row.edit = !row.edit"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { getList } from "@/api/table";

export default {
  name: "InlineEditTable",
  data() {
    return {
      list: null,
      listLoading: true,
      elementLoadingText: "正在加载...",
      queryForm: {
        pageNo: 1,
        pageSize: 20,
        title: "",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      // const { data } = await getList(this.queryForm);
      let data = [
        {
          author: "董刚",
          datetime: "2010-12-19 20:33:12",
          id: "430000197908149174",
          img:
            "https://picsum.photos/200/200?random=539FCC3c-f493-7341-DcfE-BD5c4bbA1deE",
          pageViews: 1901,
          percent: 85,
          smallImg:
            "https://picsum.photos/40/40?random=71FBc842-Cdfc-93Ec-934e-DD5edAb878be",
          status: "draft",
          switch: true,
          title: "西。",
          uuid: "FeC7b030-f79b-1cBc-28ad-905D5F9d9fe0",
        },
      ];
      this.list = data.map((v) => {
        this.$set(v, "edit", false);
        v.originalTitle = v.title;
        return v;
      });
      this.listLoading = false;
    },
    cancelEdit(row) {
      row.title = row.originalTitle;
      row.edit = false;
    },
    confirmEdit(row) {
      row.edit = false;
      row.originalTitle = row.title;
    },
  },
};
</script>
