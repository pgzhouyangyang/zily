<template>
  <div class="article">
    <div class="table-header">
      <el-form :inline="true" ref="searchForm" :model="search" size="small ">
        <el-form-item label="用户名：">
          <el-input v-model="search.username" clearable placeholder="用户名"></el-input>
        </el-form-item>
         <el-form-item label="姓名：">
          <el-input v-model="search.name" clearable placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onsearch" size="mini">查询</el-button>
          <el-button type="default" @click="onreset" size="mini">重置</el-button>
        </el-form-item>
          <el-form-item style="float: right">
          <el-button type="primary" @click="onadd" size="mini">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-wrapper">
      <el-table :data="tableData" stripe style="width: 100%" size="small" :show-overflow-tooltip="true">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="index" width="60" label="序号"></el-table-column>
         <el-table-column label="头像" width="80">
          <template slot-scope="scope">
            <div class="cover-wrap">
              <img :src="scope.row.avatar" v-if="scope.row.avatar" alt />
               <img src="../../assets/images/2.jpg" v-else alt />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="username"  label="用户名" width="100px"></el-table-column>
        <el-table-column prop="name"  label="姓名"  width="100px"></el-table-column>
        <el-table-column prop="sex"  label="性别"  width="80px">
             <template slot-scope="scope">
                <el-link
                :underline="false"
                :type="scope.row.status == 1 ? 'success' : 'warning'">
                    <i class="iconfont" :class="[scope.row.sex == 1 ? 'icon-man' : 'icon-woman']" :style="{color: scope.row.sex == 1 ? '#2196f3' : '#00BCD4', fontSize: '20px'}"></i>
                </el-link>
            </template>
        </el-table-column>
         <el-table-column prop="age"  label="年龄" width="80px"></el-table-column>
          <el-table-column prop="phone"  label="手机号"></el-table-column>
           <el-table-column prop="email"  label="邮箱" min-width="150px" :show-overflow-tooltip="true"></el-table-column>
        <!-- <el-table-column prop="regTime" label="注册时间" :show-overflow-tooltip="true"></el-table-column> -->
         <el-table-column prop="status"  label="状态" width="60px">
            <template slot-scope="scope">
                <el-link
                :underline="false"
                :type="scope.row.status == 1 ? 'danger' : 'success'">
                   {{scope.row.status == 1 ? "封禁" : "正常"}}
                </el-link>
            </template>
         </el-table-column>
        <el-table-column label="操作" min-width="100px">
          <template slot-scope="scope">
            <div class="actions">
              <el-link type="info"  icon="iconfont icon-edit" :underline="false" title="编辑" @click="onedit(scope.row)"></el-link>
              <el-link type="info" icon="iconfont icon-delete" :underline="false" title="删除" @click="ondelete(scope.row)"></el-link>
              <el-link type="info" icon="el-icon-remove" v-if="scope.row.status == 0" :underline="false" title="禁用" @click="ondisabled(scope.row)"></el-link>
              <el-link type="info" icon="iconfont icon-deblocking" v-else :underline="false" title="解封" @click="ondeblocking(scope.row)"></el-link>
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
        username: "",
        name: ""
      },
      pageSize: 20,
      pageNow: 1,
      total: 0,
      tableData: [],
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
    onsearch() {
      this.getData();
    },
    onreset() {
      this.$refs["searchForm"].resetFields();
      this.search = {
          username: "",
            name: "",
      }
      this.getData();
    },
    async getData() {
      let res = await fetch("/user", {
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
      this.$confirm('确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
           await fetch(`/deleteUser/${row._id}`, {
             method: "POST"
           });
          this.getData();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
    },
    onedit(row) {
        this.$router.push({
          path: "/user/add",
          query: {id: row._id}
      })
    },
    onadd() {
      this.$router.push("/user/add")
    },
    ondisabled(row) {
        this.$confirm('确认禁用该用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {

          await fetch(`/updateUserStatus/${row._id}`, {
             method: "POST",
             body: JSON.stringify({
               status: 1
             })
           });
          this.getData();
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        })
    },
    ondeblocking(row) {
        this.$confirm('确认解封该用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {

           await fetch(`/updateUserStatus/${row._id}`, {
             method: "POST",
             body: JSON.stringify({
               status: 0
             })
           });
          this.getData();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
    }
  },
};
</script>
<style lang="css" scoped>
  .cover-wrap img {
    border-radius: 50%;
  }
</style>
