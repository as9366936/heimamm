// 自定义指令

// 导入Vue
import Vue from "vue"
// 导入仓库
import store from "../store/store.js"

// 只需要保证执行即可
Vue.directive("remove", {
    inserted: function (el, binding) {
        if(binding.value.includes(store.state.userInfo.role)) {
            // 配置的规则中 存在当前这个角色, 就移除他
            el.parentNode.removeChild(el);
        }
    }
}) 