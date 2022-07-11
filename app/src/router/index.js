// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes"
// 使用插件
Vue.use(VueRouter)
// 引入store
import store from "@/store"
// 先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push|replace方法
// 第一个参数：告诉原来push方法，你往哪里跳转（传递那些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.replace(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
// 配置路由
let router = new VueRouter({
    // 配置路由
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 返回的y等于0，代表滚动条在最上方
        return { y: 0 }
    }
});
// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
    // next();
    let token = store.state.user.token;
    // 用户信息
    let name = store.state.user.userInfo.name;
    // 用户已经登录了
    if (token) {
        // 用户已经登录了不能去login
        if (to.path == "/login") {
            next("/home")
        } else {
            // 登录了，但去的不是login
            if (name) {
                next();
            } else {
                //    没有用户信息，派发action，让仓库存储用户信息在跳转
                try {
                    //  获取用户信息成功
                    await store.dispatch("getUserInfo")
                    next();
                } catch (error) {
                    // token失效了获取不到用户信息，重新登录
                    // 清除token
                    await store.dispatch("userLogout");
                    next("/login");
                }
            }
        }
    } else {
        // 未登录不能去交易相关的，不能去支付相关的
        // 未登录去上面这些路由应跳转去登录页面，不是的放行
        let toPath = to.path;
        if (toPath.indexOf("/trade") != -1 || toPath.indexOf("/pay") != -1 || toPath.indexOf("/center") != -1) {
            // 把未登录的时候想去而没有去成的信息存储于地址栏中
            next("/login?redirect=" + toPath)
        } else {
            next()
        }
    }
})
export default router;