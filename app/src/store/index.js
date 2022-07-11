import Vue from "vue"
import Vuex from "vuex"
// 需要使用插件
Vue.use(Vuex);
// 引入小仓库
import home from "./home"
import search from "./search"
import detail from "./detail/detail";
import shopcart from "./shopcart/shopcart";
import user from "./user/user";
import trade from "./trade/trade";
// 对外暴露store的实例
export default new Vuex.Store({
    // 实现Vuex仓库模块开发存储数据
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
});