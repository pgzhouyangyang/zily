<template>
  <nav class="sidebar" :class="{ collapse: isCollapse }">
    <div class="info">
      <div class="photo">
        <router-link to="/"
          ><img src="../assets/images/logo.jpg" alt=""
        /></router-link>
      </div>
      <div class="name">zily后台管理</div>
      <div class="expand" @click="oncollapse">
        <i
          :class="[isCollapse ? 'el-icon-arrow-right' : ' el-icon-arrow-left']"
        ></i>
      </div>
    </div>
    <el-menu
      :collapse="isCollapse"
      :router="true"
      :default-active="activeIndex"
    >
      <menu-tree :menuData="menu"></menu-tree>
    </el-menu>
  </nav>
</template>
<script>
import MenuTree from "./menuTree";
export default {
  data() {
    return {
      isCollapse: false,
      menu: [
        {
          name: "首页",
          path: "/",
          index: "-1",
          icon: "el-icon-s-platform"
        },
        {
          name: "用户管理",
          path: "",
          index: "1",
          icon: "el-icon-s-custom",
          children: [
            {
              name: "用户列表",
              path: "/user",
              index: "1-1",
              icon: "",
            },
            {
              name: "用户添加",
              path: "/user/add",
              index: "1-2",
              icon: "",
            },
          ],
        },
        {
          name: "文章管理",
          path: "",
          index: "2",
          icon: "el-icon-s-finance",
          children: [
            {
              name: "文章列表",
              path: "/article",
              index: "2-1",
              icon: "",
            },
            {
              name: "发布文章",
              path: "/article/publish",
              index: "2-2",
              icon: "",
            },
          ],
        },
        {
          name: "系统配置",
          path: "",
          index: "3",
          icon: "el-icon-s-tools",
          children: [
            {
              name: "首页设置",
              path: "/setting",
              index: "3-1",
              icon: "",
            },
          ],
        },
      ],
    };
  },
  methods: {
    oncollapse() {
      this.isCollapse = !this.isCollapse;
    },
    getMenuIndex(menu = [], index) {
      let result = null;
      for (let i = 0; i < menu.length; i++) {
        if (menu[i].path == index) {
          return menu[i].path;
        }
        if (menu[i].children) {
          result = this.getMenuIndex(menu[i].children, index);
          if (result) {
            return result;
          }
        }
      }
    },
  },
  computed: {
    activeIndex() {
      return this.getMenuIndex(this.menu, this.$route.path)
    },
  },
  components: {
    MenuTree,
  },
};
</script>
<style scoped>
.sidebar {
  flex: 0 0 auto;
  width: 256px;
  box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.42),
    0 4px 25px 0 rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  position: relative;
  z-index: 10;
}
.info {
  padding: 0 16px;
  display: flex;
  color: #333;
  align-items: center;
  justify-content: space-between;
  color: rgba(0, 0, 0, 0.87);
  height: 56px;
  border-bottom: 1px solid #eee;
}
.photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}
.photo img {
  width: 100%;
  height: 100%;
}
.name {
  text-align: center;
  font-weight: 500;
  overflow: hidden;
}
.collapse.sidebar {
  width: 64px;
}
.collapse .photo {
  width: 0;
}
.collapse .name {
  width: 0;
}
.expand {
  font-size: 20px;
  line-height: 20px;
  padding: 5px;
  cursor: pointer;
  transition: all 0.3s;
}
.expand i {
  display: inline-block;
  vertical-align: top;
}
.expand:hover {
  background: #eee;
  border-radius: 50%;
}

.el-menu {
  margin-top: 20px;
  border-right: none;
}
</style>

<style>
.el-menu--collapse > .menu-slot > .el-menu-item span,
.el-menu--collapse > .menu-slot > .el-submenu > .el-submenu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
.el-menu--collapse > .menu-slot > .el-menu-item .el-submenu__icon-arrow,
.el-menu--collapse
  > .menu-slot
  > .el-submenu
  > .el-submenu__title
  .el-submenu__icon-arrow {
  display: none;
}
</style>
