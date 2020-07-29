import Vue from "vue"
import Router from "vue-router"
// import Arc from "../views/article/index.vue"

Vue.use(Router)
const routes = [
   
    {
        path: "/",
        component: ()=> import("@/views/index"),
        redirect: '/',
        children: [
            {
                path: "/",
                name: "index",
                component: ()=> import("@/views/index/index") 
            },
            {
                path: "/article",
                name: "article",
                component: ()=> import("@/views/article/index") 
            },
            {
                path: "/article/publish",
                name: "publish",
                component: ()=> import("@/views/article/publish") 
            }
        ]
        
    },
    {
        path: "/login",
        component: ()=> import("@/views/login") 
    },
    
]
export default new Router({
    routes
})