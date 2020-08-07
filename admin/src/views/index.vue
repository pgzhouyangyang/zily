<template>
  <div class="container">
    <aside-bar></aside-bar>
    <div class="content">
      <header class="header">
        <div class="toolbar-content">
          <!-- <div class="toolbar-items">
            <i class="el-icon-message-solid"></i>
          </div>
          <div class="toolbar-items">
            <i class="el-icon-s-tools"></i>
          </div> -->
          <div class="toolbar-items">
            <el-dropdown trigger="click" @command="command">
              <img :src="avatarSrc" alt />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user-solid" command="usercenter">个人中心</el-dropdown-item>
                <el-dropdown-item icon="el-icon-close" command="loginout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </header>
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <template  v-for="(item, index) in breadcrumb">
            <el-breadcrumb-item :key="index" :to="{path: item.path || '/'}" v-if="path != '/'">{{item.meta.routerName}}</el-breadcrumb-item> 
          </template>
          
        </el-breadcrumb>
      </div>
      <main class="main">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
<script>
import AsideBar from "@/components/asideBar";
import defaultAvatar from "../assets/images/2.jpg"
export default {
  data() {
    return {
      userInfo: this.$store.state,
      breadcrumb: [],
      path: this.$route.path
    };
  },
  created() {
    this.breadcrumb = this.$route.matched
  },
  computed: {
    avatarSrc() {
      return this.userInfo.avatar || defaultAvatar
    }
  },
  watch: {
     $route(newRoute) {
      this.breadcrumb = newRoute.matched;
      this.path = newRoute.path;
    }
  },
  methods: {
    command(val) {
      this[val].call(this)
    },
    loginout() {
      this.$store.commit("clearUserInfo");
      this.$router.replace("/login")
    },
    usercenter() {
      this.$router.replace("/userCenter")
    }
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
  margin-bottom: 20px;
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
.breadcrumb {
   padding: 20px;
}
</style>
