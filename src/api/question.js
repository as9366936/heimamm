// 导入 抽取的  axios的请求对象
import instance from "../utils/request.js"


// 发布题目
export function questionAdd(data) {
    return instance({
        url: "/question/add",
        method: "post",
        data,
    });
}

// 获取题目信息
export function questionOne(data) {
    return instance({
        url: "/question/one",
        method: "post",
        data,
    });
}

// 设置题目状态
export function questionStatus(data) {
    return instance({
        url: "/question/status",
        method: "post",
        data,
    });
}

// 删除题目
export function questionRemove(data) {
    return instance({
        url: "/question/remove",
        method: "post",
        data,
    });
}

// 题目列表
export function questionList(params) {
    return instance({
        url: "/question/list",
        method: "get",
        params,
    });
}

// 编辑题目接口
export function questionEdit(data) {
    return instance({
        url: "/question/edit",
        method: "post",
        data,
    });
}

// 上传文件
export function questionUpload(data) {
    return instance({
        url: "/question/upload",
        method: "post",
        data,
    });
}



