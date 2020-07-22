module.exports = (data, option = {})=> {
    if(data) {
        return {
            body: data,
            message: "success",
            errcode: 0,
            ...option
        }
    }
    return {
        body: data,
        message: "error",
        errcode: -1,
        ...option
    }
}