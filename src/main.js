import Vue from 'vue'
import App from './App.vue'
// 导入接收 路由
import router from './router/router.js'
// 导入接收 仓库
import store from './store/store.js'

// 导入饿了么 ui
import ElementUI from 'element-ui';
// 导入饿了么 的样式
import 'element-ui/lib/theme-chalk/index.css';
// 注册一下
Vue.use(ElementUI);

// 导入全局样式
import "./style/bass.css";

// 全局过滤器只要保证运行 即可  不需要使用值
import './filters/filters.js'

// 导入自定义指令 不需要使用值
import "./directives/directives.js"

Vue.config.productionTip = false

// 测试环境变量
// window.console.log(process.env.VUE_APP_BASEURL);
// 点出所有的
// window.console.log(process.env);

new Vue({
  // 挂载到Vue实例上 router
  router,
  // 挂载到Vue实例上 store
  store,
  render: h => h(App),
}).$mount('#app')
