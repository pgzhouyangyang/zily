import Vue from "vue"
import Router from "vue-router"
import store from "../store"
Vue.use(Router)
const routes = [
   
    {
        path: "/",
        component: ()=> import("@/views/index"),
        meta: {
            authority: true,
            routerName: "首页"
        },
        children: [
            {
                path: "/",
                name: "index",
                component: ()=> import("@/views/index/index") ,
                meta: {
                    authority: true,
                    routerName: "首页"
                }
            },
            {
                path: "/article",
                // name: "articleManagement",
                component: ()=> import("@/views/article/transition") ,
                meta: {
                    authority: true,
                    routerName: "文章管理"
                },
                children: [
                    {
                        path: "",
                        name: "article",
                        component: ()=> import("@/views/article/index") ,
                        meta: {
                            authority: true,
                            routerName: "文章列表"
                        }
                    },
                    {
                        path: "publish",
                        name: "publish",
                        component: ()=> import("@/views/article/publish"),
                        meta: {
                            authority: true,
                            routerName: "发布文章"
                        }
                    },
                ]
            },
           
            {
                path: "/user",
                // name: "userManagement",
                component: ()=> import("@/views/user/transition"),
                meta: {
                    authority: true,
                    routerName: "用户管理"
                },
                children: [
                    {
                        path: "",
                        name: "user",
                        component: ()=> import("@/views/user/index"),
                        meta: {
                            authority: true,
                            routerName: "用户列表"
                        }
                    },
                    {
                        path: "add",
                        name: "userAdd",
                        component: ()=> import("@/views/user/add"),
                        meta: {
                            authority: true,
                            routerName: "用户添加"
                        }
                    },
                ]
            },
            {
                path: "/setting",
                // name: "system",
                component: ()=> import("@/views/system/transition"),
                meta: {
                    authority: true,
                    routerName: "系统设置"
                },
                children: [
                    {
                        path: "",
                        name: "systemIndex",
                        component: ()=> import("@/views/system/index"),
                        meta: {
                            authority: true,
                            routerName: "首页设置"
                        }
                    },
                ]
            },
            {
                path: "/userCenter",
                name: "userCenter",
                component: ()=> import("@/views/user/userCenter"),
                meta: {
                    authority: true,
                    routerName: "个人中心"
                }
            }
        ]
        
    },
    {
        path: "/login",
        name: "login",
        component: ()=> import("@/views/login") 
    },
    {
        path: "/register",
        name: "register",
        component: ()=> import("@/views/register") 
    },
]

const router = new Router({
    routes
})

router.beforeEach((to, from, next) => {
    if(to.meta && to.meta.authority && !store.state.userInfo.token) {
        next({path:"/login", query:{ Rurl: to.fullPath}})
    } else {
        next()
    }
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

export default router