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

export default [
    {
        path: 'chart',
        component: chart,
        meta: {
            // 允许访问的角色
            power: ['超级管理员', '管理员', '老师'],
            // 图标
            icon: "el-icon-pie-chart",
            // 名字
            name: "数据概览"
        }
    },
    {
        path: 'user',
        component: user,
        meta: {
            // 允许访问的角色
            power: ['超级管理员', '管理员'],
            // 图标
            icon: "el-icon-user",
            // 名字
            name: "用户列表"
        }
    },
    {
        path: 'question',
        component: question,
        meta: {
            // 允许访问的角色
            power: ['超级管理员', '管理员', '老师', '学生'],
            // 图标
            icon: "el-icon-edit-outline",
            // 名字
            name: "题库列表"
        }
    },
    {
        path: 'enterprise',
        component: enterprise,
        meta: {
            // 允许访问的角色
            power: ['超级管理员', '管理员', '老师'],
            // 图标
            icon: "el-icon-office-building",
            // 名字
            name: "企业列表"
        }
    },
    {
        path: 'subject',
        component: subject,
        meta: {
            // 允许访问的角色
            power: ['超级管理员', '管理员', '老师'],
            // 图标
            icon: "el-icon-notebook-2",
            // 名字
            name: "学科列表"
        }
    },
]