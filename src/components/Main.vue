<template>
    <div class="main">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item,index) in info" :key="index">
            {{item}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data(){
        return{
            info:[]
        }
    },
    watch:{
        $route(){
            this.getRoute();
        }
    },
    methods:{
        getRoute:function(){
            //获取到matched的每一项的meta信息
            const arr = this.$route.matched;
            let info = [];
            arr.forEach(v => {
                info.push(v.meta)
            });
            this.info = info;
        }
    },
    mounted(){
        //组件加载完成后获取meta信息
        this.getRoute()
    }
}
</script>

<style scoped>
    .main{
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
    }
</style>
