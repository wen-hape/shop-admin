<template>
    <div>
        <el-row type="flex" justify="space-between">
            <div class="arrow" @click="handleClick">
                <i class="el-icon-back"></i>
            </div>
            <div>
                {{user.uname}} {{user.realname}}
                <span @click="handleLogout" 
                class="logout">退出</span>
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            user:{}
        }
    },
    methods: {
        handleClick(){
            this.$emit("click");
        },
        //登录退出
        handleLogout(){
            //调用退出的接口
            this.$axios({
                url:'http://localhost:8899/admin/account/logout',
                method:'GET',
                withCredentials:true
            }).then(res => {
                const {status,message} = res.data;
                if(status === 0){
                    this.$message.success(message);
                    //跳转到登陆页
                    this.$router.push('/login')
                    //清除本地的用户数据
                    localStorage.removeItem('user')
                }
            })
        }
    },
    mounted(){
        //读取vuex的store数据
        this.user = this.$store.state.user;
    }
}
</script>

<style scoped>
    .arrow{
        cursor: pointer;
    }
</style>
