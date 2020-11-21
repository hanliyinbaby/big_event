$(function () {
    const form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return layer.msg('你输入的密码必须在1 ~ 6个字符');
            }
        }
    })
    getziliao()
    function getziliao() {
        const layer = layui.layer
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return console.log(res.message);
                }
                form.val('userxinxi', res.data);
            }
        });
    }
    $('.layui-btn').on('click', function (e) {
        e.preventDefault()
        getziliao()
    })
    $('.layui-btn').on('click', function (e) {
        e.preventDefault()
        window.parent.getUserIfon()
    })
})