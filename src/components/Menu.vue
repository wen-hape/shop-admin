<template>
      <el-menu
        default-active="1-1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isShow"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">购物商城</span>
          </template>
            <el-menu-item index='1-1'>
                <template slot='title'>
                    <router-link to='/admin/goods-list'>商品管理</router-link>
                </template>
            </el-menu-item>
            <el-menu-item index='1-2'>
                <template slot='title'>
                    <router-link to='/admin/category-list'>栏目管理</router-link>
                </template>
            </el-menu-item>
        </el-submenu>
      </el-menu>
      
</template>

<script>
export default {
    props:['isShow']
};
</script>

<style scoped>
    .el-menu-vertical-demo{
        height: 100%;;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

    .el-menu-vertical-demo a{
        color:inherit;
        text-decoration: none;
    }
</style>
