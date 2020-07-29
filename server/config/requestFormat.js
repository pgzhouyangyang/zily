module.exports = (data, option = {})=> {
    if(data) {
        return {
            body: data,
            message: "操作成功",
            errcode: 0,
            ...option
        }
    }
    return {
        body: data,
        message: "操作失败",
        errcode: -1,
        ...option
    }
}