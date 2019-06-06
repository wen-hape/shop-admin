<template>
  <div>
    index
    <el-button type="primary">主要按钮</el-button>
    <p>
      <router-view></router-view>
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted(){

    // 请求测试接口
    this.$axios({
      url: "https://api.github.com/users",
      method: "GET",
      // get请求参数
      params: {
        abc: 123
      }
    }).then(res => {
      console.log(res)
    })
  }
}
</script>

<style>

</style>
