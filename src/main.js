import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
// element: 1.导入组件
import ElementUI from "element-ui"
// element的样式
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router"

// element: 2.注册element插件
Vue.use(ElementUI);
Vue.use(VueRouter);

const routes=[

];

const router = new VueRouter({routes})

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
