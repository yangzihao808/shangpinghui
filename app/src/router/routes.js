//  路由配置信息
export default [
    {
        path: '/home',
        component: () => import("@/pages/Home"),
        meta: { show: true }
    },
    {
        path: '/login',
        component: () => import("@/pages/Login"),
        meta: { show: false }
    },
    {
        path: '/register',
        component: () => import("@/pages/Register"),
        meta: { show: false }
    },
    {
        path: '/detail/:skuid',
        component: () => import("@/pages/Detail"),
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        component: () => import("@/pages/AddCartSuccess"),
        name: "addcartsuccess",
        meta: { show: true }
    },
    {
        path: '/shopcart',
        component: () => import("@/pages/ShopCart"),
        meta: { show: true }
    },
    {
        path: '/trade',
        component: () => import("@/pages/Trade"),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            // 去交易页面必须从购物车来
            if (from.path == "/shopcart") {
                next();
            } else {
                // 其他的路由组件来的，停留在当前
                next(false);
            }
        }
    },
    {
        path: '/pay',
        component: () => import("@/pages/Pay"),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == "/trade") {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: '/paysuccess',
        component: () => import("@/pages/PaySuccess"),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == "/pay") {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: '/center',
        component: () => import("@/pages/Center"),
        meta: { show: true },
        // 二级路由
        children: [
            {
                path: 'myorder',
                component: () => import("@/pages/Center/MyOrder"),
            },
            {
                path: 'group',
                component: () => import("@/pages/Center/Group"),
            }, {
                path: "/center",
                redirect: "/center/myorder"
            }
        ]
    },
    {
        path: '/search/:keyword?',
        name: 'search',
        component: () => import("@/pages/Search"),
        props: route => ({ keyword3: route.params.keyword, keyword4: route.query.keyword2 }),
        meta: { show: true }
    },
    // 重定向，在项目跑起来的时候，访问/，立马让他定向到页面
    {
        path: "*",
        redirect: '/home'
    }
]