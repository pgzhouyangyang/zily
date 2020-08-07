<template>
<div class="menu-slot">
    <template v-for="value in this.menuData">
      <el-submenu :index="value.index" v-if="value.children" :key="value.index">
        <template slot="title">
          <i :class="value.icon"></i>
          <span slot="title">{{ value.name }}</span>
        </template>
        <menu-tree :menuData="value.children"></menu-tree>
        <!-- <MenuTree :menuData="value.children"></MenuTree> -->
      </el-submenu>
      <el-menu-item :index="value.path" v-else :key="value.index">
        <i :class="value.icon"></i>
        <span slot="title">{{ value.name }}</span>
      </el-menu-item>
    </template>
</div>
</template>
<script>
export default {
  name: "menuTree",
  props: ["menuData"],
  data() {
    return {

    };
  }
};
</script>
