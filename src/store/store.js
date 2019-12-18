// store.js
import Vue from "vue"
import Vuex from "vuex"
// use一下
Vue.use(Vuex);
// 创建仓库
const store = new Vuex.Store({
    // 类似Vue实例中的data
    state: {
        // 用户信息
        userInfo: "",
    }
})

export default store