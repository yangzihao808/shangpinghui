import Vue from 'vue'
import App from './App.vue'
// 三级联动组件----全局组件
import TypeNav from './components/TypeNav'
// 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
// 引入MockSever.js ----mock数据
import "@/mock/mockSever"
// 引入路由
import router from './router'
// 引入Vuex
import store from '@/store'
// 引入swiper样式
import "swiper/css/swiper.css"
//引入分页器
import Pagination from "./components/Pagination"
// 统一接收API文件夹里面全部请求函数  统一引入
import * as API from "@/API";
import atm from "./assets/1.gif";
import { Button, MessageBox } from 'element-ui';
// 注册全局组件
Vue.component(Button.name, Button);
// ElementUI注册组件的时候，还有一种写法，挂载原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.component(Pagination.name, Pagination)
// 引入插件
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading: atm
});
// 引入表单校验插件
import "@/plugins/validate";
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由
  router,
  // 注册vuex:组件实例对象的身上会多出一个$store属性
  store
}).$mount('#app')
