$(function () {

    getUserIfon()
    //退出功能的实现，利用layui.layer
    $('#loyout').on('click', function () {
        var layer = layui.layer
        layer.confirm('确认退出登录 ?', { icon: 3, title: '提示' }, function (index) {
            location.href = '/login.html'
            layer.close(index);
        });
    })
})
//封装getUserIfon函数，来获取数据
function getUserIfon() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status != 0) {
                return layui.layer.msg(res.message)
            }
            return userPic(res.data)
        }
    });
}
//获取用户名并渲染在页面
function userPic(user) {
    //获取用户的名称
    var name = user.nickname || user.username
    $('.username1').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic == null) {
        $('.layui-nav-img').hide()
        $('.text').html(name[0].toUpperCase()).show()
        $('.text1').html(name[0].toUpperCase()).show()
    } else {
        $('.text').hide()
        $('.text1').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()
    }

}