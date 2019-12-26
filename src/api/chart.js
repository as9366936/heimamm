// 导入 抽取的  axios的请求对象
import instance from "../utils/request.js"

// 面板数据接口
export function chartTitle(data){
    return instance({
        url: "/data/title",
        method: "post",
        data,
    })
}

// 企业题目数据统计
export function chartStatistics(data){
    return instance({
        url: "/data/statistics",
        method: "post",
        data,
    })
}

// 热门城市题目统计
export function chartHot_cities(data){
    return instance({
        url: "/data/hot_cities",
        method: "post",
        data,
    })
}