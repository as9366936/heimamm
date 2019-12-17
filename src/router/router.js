// 导入Vue
import Vue from "vue"
// 导入登录组件
import login from "../views/login/login.vue"
// 导入首页组件
import index from "../views/index/index.vue"

// 导入嵌套路由的组件
// 数据(图表)组件
import chart from "../views/index/chart/chart.vue"
// 用户组件
import user from "../views/index/user/user.vue"
// 题库组件
import question from "../views/index/question/question.vue"
// 企业组件
import enterprise from "../views/index/enterprise/enterprise.vue"
// 学科组件
import subject from "../views/index/subject/subject.vue"

// 导包 导入VueRouter
import VueRouter from 'vue-router'
// Use一下 注册
Vue.use(VueRouter)
// 规则
const routes = [
    {
        path: '/login',
        component: login
    },
    {
        path: '/',
        component: login
    },
    {
        path: '/index',
        component: index,
        // 嵌套路由
        children: [
            {
                path: 'chart',
                component: chart,
            },
            {
                path: 'user',
                component: user,
            },
            {
                path: 'question',
                component: question,
            },
            {
                path: 'enterprise',
                component: enterprise,
            },
            {
                path: 'subject',
                component: subject,
            },
        ]
    },
]
// 创建
const router = new VueRouter({
    routes  // routes: routes
})
// 暴露出去
export default router