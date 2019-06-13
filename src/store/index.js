//导入vuex
import Vuex from "vuex";
import Vue from "vue";
//注册插件
Vue.use(Vuex);
//调用vuex创建一个仓库
const store = new Vuex.Store({
    //数据位置
    state:{
        //读取本地数据，如果没有设置为空
        user:JSON.parse(localStorage.getItem('user')) || {}
    },
    //设置数据库的方法
    mutations:{
        setUser(state,data){
            state.user = data;

            //保存数据到本地
            localStorage.setItem('user',JSON.stringify(data));
        }
    }
});

export default store;
