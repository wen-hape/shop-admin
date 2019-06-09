<template>
<div class="form-wrapper">
  <el-form
    :model="form"
    :rules="rules"
    ref="form"
    label-width="100px"
    class="form"
  >
    <el-form-item label="账号" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        password: "",
        username: ""
      },
      rules: {
        //required:true必须要输入 message提示的信息 trigger：blur失去焦点触发
          username:[{required:true,message:'请输入用户名',trigger:'blur'}],
          password:[{required:true,message:'请输入密码',trigger:'blur'}]
      }
    };
  },
  methods: {
    onSubmit(){
        const data = {
            uname:this.form.username,
            upwd:this.form.password
        }
        this.$refs.form.validate((valid)=>{
            if(valid){
                this.$axios({
                    url:"http://localhost:8899/admin/account/login",
                    method:'POST',
                    data,
                    withCredentials:true
                }).then(res=>{
                    const{message,status} = res.data;
                    if(status === 0){
                        this.$router.push('/');
                    }
                    if(status === 1){
                        this.$message.error(message);
                    }
                })
            }
        })
    }
  }
};
</script>

<style>
    .form-wrapper{
        width:100%;
        position: absolute;
        top:0;
        bottom: 0;
        /* 设置盒子宽高全屏 */
    }
    .form{
        width: 500px;
        position: absolute;
        left: 50%;
        margin-left: -250px;
        top: 50%;
        margin-top: -95px;
    }
</style>
