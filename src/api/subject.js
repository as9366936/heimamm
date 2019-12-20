// 导入 抽取的  axios的请求对象
import instance from "../utils/request.js"


// 添加学科
export function subjectAdd(data) {
    return instance({
        url: "/subject/add",
        method: "post",
        data,
    });
}

// 学科列表
export function subjectList(params) {
    return instance({
        url: "/subject/list",
        method: "get",
        params,
    });
}

// 学科状态设置
export function subjectStatus(data) {
    return instance({
        url: "/subject/status",
        method: "post",
        data,
    });
}

// 学科编辑
export function subjectEdit(data) {
    return instance({
        url: "/subject/edit",
        method: "post",
        data,
    });
}

// 学科删除
export function subjectRemove(data) {
    return instance({
        url: "/subject/remove",
        method: "post",
        data,
    });
}

