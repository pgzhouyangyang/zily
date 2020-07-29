<template>
  <div class="container">
    <aside-bar></aside-bar>
    <div class="content">
      <header class="header">
        <div class="toolbar-content">
          <div class="toolbar-items">
            <i class="el-icon-message-solid"></i>
          </div>
          <div class="toolbar-items">
            <i class="el-icon-s-tools"></i>
          </div>
          <div class="toolbar-items">
            <el-dropdown trigger="click">
              <img src="../assets/images/20190630224926258000000.jpg" alt />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user-solid">个人中心</el-dropdown-item>
                <el-dropdown-item icon="el-icon-close">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </header>
      <div class="breadcrumb"></div>
      <main class="main">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
<script>
import AsideBar from "@/components/asideBar";
export default {
  data() {
    return {};
  },
  components: {
    AsideBar,
  },
};
</script>
<style>
.header {
  height: 64px;
  background: #fff;
  color: rgba(0, 0, 0, 0.87);
  margin-bottom: 40px;
  position: sticky;
  /* top: 0;
  background: #fff;
  z-index: 2; */
}
.container {
  height: 100vh;
  display: flex;
  overflow: hidden;
}
.content {
  flex: 1;
  /* padding: 0 20px; */
  overflow-x: hidden;
}
.main {
    padding: 20px;
}

.toolbar-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
}
.toolbar-items {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  box-sizing: content-box;
  cursor: pointer;
  margin: 0 5px;
  font-size: 24px;
  line-height: 35px;
  text-align: center;
  color: #999;
  transition: all 0.3s;
}
.toolbar-items:hover {
  background: #eee;
}
.toolbar-items img {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
