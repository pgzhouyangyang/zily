<template>
  <div class="article">
    <div class="table-header">
      <el-form :inline="true" ref="searchForm" :model="search" size="small ">
        <el-form-item label="标题：">
          <el-input
            v-model="search.caption"
            clearable
            placeholder="标题"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="关键字：">
          <el-input
            v-model="search.key"
            clearable
            placeholder="关键字"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="作者：">
          <el-input
            v-model="search.author"
            clearable
            placeholder="作者"
          ></el-input>
        </el-form-item>
        <el-form-item label="开始日期：">
          <el-date-picker
            v-model="search.startDate"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期：">
          <el-date-picker
            v-model="search.endDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onsearch" size="mini"
            >查询</el-button
          >
          <el-button type="default" @click="onreset" size="mini"
            >重置</el-button
          >
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" @click="onadd" size="mini">添加</el-button>

          <el-button type="danger" @click="ondeleteBatch" size="mini"
            >删除</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="table-wrapper">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        size="small"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column type="index" width="60" label="序号"></el-table-column>
        <el-table-column label="封面" width="80">
          <template slot-scope="scope">
            <div class="cover-wrap">
              <img :src="scope.row.thumbnail.url" alt />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="caption"
          label="标题"
          max-width="300px"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-link
              :underline="false"
              :type="scope.row.status == 1 ? 'success' : 'warning'"
            >
              {{ scope.row.status == 1 ? "发布" : "草稿" }}
              <i
                :class="[
                  scope.row.status == 1
                    ? ' el-icon-s-platform'
                    : 'iconfont icon-draft',
                ]"
              ></i>
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="public" label="公开度">
          <template slot-scope="scope">
            <el-link
              :type="scope.row.public == 1 ? 'primary' : 'success'"
              size="mini"
              :underline="false"
            >
              {{ scope.row.public == 1 ? "仅自己" : "所有人" }}
              <i
                class="iconfont"
                :class="[scope.row.public == 1 ? 'icon-ceyes' : 'icon-view']"
              ></i>
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column label="置顶">
          <template slot-scope="scope">
            <el-link
              :underline="false"
              :type="scope.row.isTop ? 'success' : 'warning'"
            >
              {{ scope.row.isTop ? "是" : "否" }}
              <i
                :class="[
                  scope.row.isTop
                    ? ' el-icon-s-platform'
                    : 'iconfont icon-draft',
                ]"
              ></i>
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建时间"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="操作" min-width="100px">
          <template slot-scope="scope">
            <div class="actions">
              <el-link
                type="info"
                :underline="false"
                icon="iconfont icon-edit"
                title="编辑"
                @click="onedit(scope.row)"
              ></el-link>
              <el-link
                type="info"
                :underline="false"
                icon="iconfont icon-delete"
                title="删除"
                @click="ondelete(scope.row)"
              ></el-link>

              <el-link
                v-if="scope.row.status == 0"
                type="info"
                :underline="false"
                icon="el-icon-s-promotion"
                title="发布"
                @click="onpublish(scope.row)"
              ></el-link>
              <el-link
                v-else
                type="info"
                :underline="false"
                icon="iconfont icon-rev"
                title="撤销"
                @click="onrevocation(scope.row)"
              ></el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-footer">
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNow"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: {
        caption: "",
        key: "",
        author: "",
        startDate: "",
        endDate: "",
      },
      pageSize: 20,
      pageNow: 1,
      total: 0,
      tableData: [],
      multipleSelection: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.pageNow = val;
      this.getData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    onsearch() {
      this.getData();
    },
    onreset() {
      this.$refs["searchForm"].resetFields();
      this.search = {
        caption: "",
        key: "",
        author: "",
        startDate: "",
        endDate: "",
      };
      this.getData();
    },
    onadd() {
      this.$router.push("/article/publish");
    },
    async getData() {
      let res = await fetch("/article", {
        params: {
          pageSize: this.pageSize,
          pageNow: this.pageNow,
          ...this.search,
        },
      });
      this.tableData = res.body.data;
      this.total = res.body.totalSize;
    },
    ondelete(row) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await fetch(`/deleteArticle/${row._id}`, {
          method: "POST",
        });
        this.getData();
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    ondeleteBatch() {
      let ids = this.multipleSelection.map((item) => item._id);
      if (!ids.length) {
       return  this.$message({
          type: "error",
          message: "请选择要删除的数据!",
        });
      }
      this.$confirm("确认删除所选数据吗吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await fetch(`/deleteArticle/${ids}`, {
          method: "POST",
        });
        this.getData();
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    onedit(row) {
      this.$router.push({
        path: "/article/publish",
        query: { id: row._id },
      });
    },
    onpublish(row) {
      this.$confirm("确认发布吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let res = await fetch(`/updateStatus/${row._id}`, {
          method: "POST",
          body: JSON.stringify({
            status: 1,
          }),
        });
        this.getData();
        this.$message(res.message);
      });
    },
    onrevocation(row) {
      this.$confirm("确认撤销吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let res = await fetch(`/updateStatus/${row._id}`, {
          method: "POST",
          body: JSON.stringify({
            status: 0,
          }),
        });
        this.getData();
        this.$message(res.message);
      });
    },
  },
};
</script>
