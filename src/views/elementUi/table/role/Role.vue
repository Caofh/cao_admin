<template>
  <div class="roleManagement-container">
    <div class="c-flex-x-between">
      <div>
        <el-button
          icon="el-icon-plus"
          type="primary"
          size="small"
          @click="handleEdit"
        >
          添加
        </el-button>
        <el-button
          icon="el-icon-delete"
          type="danger"
          size="small"
          @click="handleDelete"
        >
          批量删除
        </el-button>
      </div>
      <div>
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.permission"
              placeholder="请输入查询条件"
              size="small"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              size="small"
              @click="queryData"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-table
      class="table-list"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
    >
      <el-table-column show-overflow-tooltip type="selection"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="id"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="permission"
        label="权限码"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        fixed="right"
        label="操作"
        width="200"
      >
        <template v-slot="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      :current-page="queryForm.pageNo"
      :page-size="queryForm.pageSize"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <edit ref="edit" @fetchData="fetchData"></edit>
  </div>
</template>

<script>
// import { getList, doDelete } from "@/api/roleManagement";
import Edit from "./components/RoleManagementEdit";

export default {
  name: "RoleManagement",
  components: { Edit },
  data() {
    return {
      list: null,
      listLoading: true,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      selectRows: "",
      elementLoadingText: "正在加载...",
      queryForm: {
        pageNo: 1,
        pageSize: 10,
        permission: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    setSelectRows(val) {
      this.selectRows = val;
    },
    handleEdit(row) {
      if (row.id) {
        this.$refs["edit"].showEdit(row);
      } else {
        this.$refs["edit"].showEdit();
      }
    },
    handleDelete(row) {
      console.log(row.id);
      this.eleToast(this, "操作成功", "success");
      this.fetchData();
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.queryForm.pageNo = val;
      this.fetchData();
    },
    queryData() {
      this.queryForm.pageNo = 1;
      this.fetchData();
    },
    async fetchData() {
      this.listLoading = true;

      let list = [
        {
          id: "1",
          permission: "admin",
        },
        {
          id: "2",
          permission: "edit",
        },
      ];

      this.list = list;
      this.total = list.length;
      setTimeout(() => {
        this.listLoading = false;
      }, 300);
    },
  },
};
</script>

<style lang="scss" scoped>
.roleManagement-container {
  .table-list {
    /deep/ td {
      padding: 4px 0;
    }
  }

  .pagination {
    margin-top: 20px;
  }
}
</style>
