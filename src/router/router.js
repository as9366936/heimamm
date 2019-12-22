// 导入Vue
import Vue from "vue"
// 导入登录组件
import login from "../views/login/login.vue"
// 导入首页组件
import index from "../views/index/index.vue"

// 解决   Uncaught (in promise) undefined   异常报错 (在使用被禁用的账号登录的时候)
// ----------------------------------------
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
// ----------------------------------------

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

// 导入 token 工具函数
import { getToken, removeToken } from "../utils/token"

// 导入 element-ui的 Message
import { Message } from "element-ui";

// 导入 获取用户信息的接口
import { getUserInfo } from "../api/userInfo.js"

// 导入仓库
import store from "../store/store.js"

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
        // // 路由重定向
        // redirect: "/index/chart",
        meta: {
            power: ['管理员', '老师', '学生']
        },
        // 嵌套路由
        children: [
            {
                path: 'chart',
                component: chart,
                meta: {
                    power: ['管理员', '老师']
                }
            },
            {
                path: 'user',
                component: user,
                meta: {
                    power: ['管理员']
                }
            },
            {
                path: 'question',
                component: question,
                meta: {
                    power: ['管理员', '老师', '学生']
                }
            },
            {
                path: 'enterprise',
                component: enterprise,
                meta: {
                    power: ['管理员', '老师']
                }
            },
            {
                path: 'subject',
                component: subject,
                meta: {
                    power: ['管理员', '老师']
                }
            },
        ]
    },
]
// 创建
const router = new VueRouter({
    routes  // routes: routes
});

// 创建路由白名单数组
const whitePaths = ["/login", "/"];

// 导航守卫 全局前置守卫
router.beforeEach((to, from, next) => {
    // 去的路由信息
    // window.console.log(to);
    // 来的路由信息
    // window.console.log(from);
    // 继续向后执行, 如果不执行, 卡住不动
    // next();

    // 除了登录页面,都需要做登录判断 (除了白名单,都需要做登录判断)
    // if (to.path != "/login")
    if (whitePaths.includes(to.path.toLocaleLowerCase()) === false) {
        // 必须要登录才可以访问
        if (!getToken()) {
            Message.warning("嗯哼,暗度陈仓吗?");
            next("/login");
        } else {
            // 有token,对token进行判断
            getUserInfo().then(res => {
                // window.console.log(res);
                if (res.data.code === 200) {
                    // token是对的
                    // 状态判断
                    if (res.data.data.status === 0) {
                        // 禁用状态
                        Message.warning("你的账号已被管理员禁用,请与管理员联系!");
                        next("/login");
                    } else {
                        // 启用状态
                        // 修改头像地址 基地址拼接上    图片地址
                        res.data.data.avatar = process.env.VUE_APP_BASEURL + "/" + res.data.data.avatar;
                        // commit 提交到仓库
                        store.commit("changeUserInfo", res.data.data);

                        // 判断当前这个用户是否可以去
                        // window.console.log(to);
                        // window.console.log(res.data.data);
                        // meta访问的白名单匹配
                        if(to.meta.power.includes(res.data.data.role)){
                            // 存在
                            next()
                        }else{
                            Message.warning('你没有访问这里的权限哦!请联系管理员')
                        }
                    }
                } else if (res.data.code === 206) {
                    // token不对,警告
                    Message.warning("Lok'tar ogar! 联盟的走开");
                    // 把token干掉
                    removeToken();
                    // 返回登录页面
                    next("/login");
                }
            });
        }
    } else {
        // 是登录页 直接放过去
        next();
    }

});

// 暴露出去
export default router