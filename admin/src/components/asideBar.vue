<template>
    <nav class="sidebar" :class="{collapse: isCollapse}">
        <div class="info">
            <div class="photo">
                <img src="../assets/images/20190630224926258000000.jpg" alt="">
            </div>
            <div class="name">zily后台管理</div>
            <div class="expand" @click="oncollapse">
                <i :class="[ isCollapse ? 'el-icon-arrow-right' : ' el-icon-arrow-left']"></i>
            </div>
        </div>
        <el-menu :collapse="isCollapse" :router="true">
             <el-submenu index="">
                <template slot="title">
                    <i class="el-icon-s-custom"></i>
                    <span>用户管理</span>
                </template>
                <el-menu-item index="/user">用户列表</el-menu-item>
                <el-menu-item index="/user/add">用户添加</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-s-finance"></i>
                    <span>文章管理</span>
                </template>
                <el-menu-item index="/article/publish">发布文章</el-menu-item>
                <el-menu-item index="/article">文章列表</el-menu-item>
                
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-s-tools"></i>
                    <span>系统配置</span>
                </template>
                <el-menu-item index="1-2">首页设置</el-menu-item>
            </el-submenu>
        </el-menu>
    </nav>
</template>
<script>
export default {
    data() {
        return {
            isCollapse: false
        };
    },
    methods: {
        oncollapse() {
            this.isCollapse = !this.isCollapse
        }
    }
};
</script>
<style scoped>
    .sidebar {
        flex: 0 0 auto;
       width: 256px;
       box-shadow: 0 10px 30px -12px rgba(0,0,0,.42), 0 4px 25px 0 rgba(0,0,0,.12), 0 8px 10px -5px rgba(0,0,0,.2);
       transition: all 0.3s;
       position: relative;
       z-index: 10;
    }
    .info {
        padding:0 16px;
        display: flex;
        color: #333;
        align-items: center;
        justify-content: space-between;
        color: rgba(0,0,0,.87);
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
    .collapse .photo{
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
