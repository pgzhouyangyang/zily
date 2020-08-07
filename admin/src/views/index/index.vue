<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :md="12" :lg="6">
        <div class="index-card">
          <div class="card-icon">
            <i class="el-icon-s-management"></i>
          </div>
          <div class="card-text">
            <p>文章数量</p>
            <h3>50</h3>
          </div>
          <div class="hr"></div>
          <div class="card-bottom">
            <i class="el-icon-refresh"></i> 最后更新于刚刚
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :md="12" :lg="6">
        <div class="index-card">
          <div class="card-icon" style="background:#ff9800">
            <i class="el-icon-s-custom"></i>
          </div>
          <div class="card-text">
            <p>用户总数</p>
            <h3>50</h3>
          </div>
          <div class="hr"></div>
          <div class="card-bottom">
            <i class="el-icon-refresh"></i> 最后更新于刚刚
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :md="12" :lg="6">
        <div class="index-card">
          <div class="card-icon" style="background:#f44336">
            <span>
              <span>+</span>
              <i class="el-icon-s-management"></i>
            </span>
          </div>
          <div class="card-text">
            <p>今日新增文章</p>
            <h3>50</h3>
          </div>
          <div class="hr"></div>
          <div class="card-bottom">
            <i class="el-icon-refresh"></i> 最后更新于刚刚
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :md="12" :lg="6">
        <div class="index-card">
          <div class="card-icon" style="background: #29b6f6 ">
            <span>
              <span>+</span>
              <i class="el-icon-s-custom"></i>
            </span>
          </div>
          <div class="card-text">
            <p>今日新增注册用户</p>
            <h3>50</h3>
          </div>
          <div class="hr"></div>
          <div class="card-bottom">
            <i></i> 最后更新于刚刚
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="table-wrapper">
      <el-table :data="tableData" stripe style="width: 100%" size="small">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="index" width="60" label="序号"></el-table-column>
        <el-table-column label="封面" width="80">
          <template slot-scope="scope">
            <div class="cover-wrap">
              <img :src="scope.row.thumbnail.url" alt />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="caption" label="标题" max-width="300px" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
             <el-link
             :underline="false"
             :type="scope.row.status == 1 ? 'success' : 'warning'"
             >
             {{scope.row.status == 1 ? "发布" : "草稿"}}
                <i :class="[scope.row.status == 1 ? ' el-icon-s-platform' : 'iconfont icon-draft']"></i>
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
             {{scope.row.public == 1 ? "仅自己" : "所有人"}}
               <i  class="iconfont" :class="[scope.row.public == 1 ? 'icon-ceyes' : 'icon-view']"></i>
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column prop="date" label="创建时间" :show-overflow-tooltip="true"></el-table-column>
        <!-- <el-table-column label="操作" min-width="100px">
          <template slot-scope="scope">
            <div class="actions">
              <el-link type="info" :underline="false" icon="iconfont icon-edit" title="编辑" @click="onedit(scope.row)"></el-link>
              <el-link type="info" :underline="false" icon="iconfont icon-delete" title="删除" @click="ondelete(scope.row)"></el-link>

              <el-link v-if="scope.row.status == 0" type="info" :underline="false" icon="el-icon-s-promotion" title="发布" @click="onpublish(scope.row)"></el-link>
               <el-link v-else type="info" :underline="false" icon="iconfont icon-rev" title="撤销" @click="onrevocation(scope.row)"></el-link>
            </div>
          </template>
        </el-table-column> -->
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
      pageSize: 20,
      pageNow: 1,
      total: 0,
      tableData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let res = await fetch("/article", {
        params: {
          pageSize: this.pageSize,
          pageNow: this.pageNow,
          ...this.search
        }
      });
      this.tableData = res.body.data;
      this.total = res.body.totalSize;
    },
     handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.pageNow = val;
      this.getData();
    },
  }
};
</script>
<style scoped>
.index-card {
  position: relative;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 10px 16px;
  margin: 16px 0;
  text-align: right;
  color: #9e9e9e;
}
.card-icon {
  position: absolute;
  top: -20px;
  /* padding: 20px; */
  background: linear-gradient(60deg, #66bb6a, #43a047);
  border-radius: 4px;
  box-shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.2),
    0 10px 14px 1px rgba(0, 0, 0, 0.14), 0 4px 18px 3px rgba(0, 0, 0, 0.12);
  left: 0;
  color: #fff;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-icon i {
  line-height: 40px;
  vertical-align: top;
  font-size: 40px;
}
.hr {
  background: #eee;
  margin: 12px 0;
  height: 1px;
}
.card-text > h3 {
  font-size: 32px;
  color: #2196f3;
}

.card-bottom {
  font-size: 12px;
}

</style>