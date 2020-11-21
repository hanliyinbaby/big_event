$(function () {
    $.ajaxPrefilter(function (options) {

        options.url = "http://ajax.frontend.itheima.net" + options.url
        //请求头的操作
        if (options.url.indexOf('/my/') != -1) {
            options.headers = { Authorization: localStorage.getItem("token") || '' }
            //登录拦截，如果有权限可以登录，如果没有权限无法登录
            options.complete = function (res) {
                if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
                    localStorage.removeItem("token")
                    location.href = "/login.html"
                }
            }
        }

    })
})