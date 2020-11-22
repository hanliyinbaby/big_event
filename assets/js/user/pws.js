$(function () {
    var form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        passPws: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return layer.meg('新密码与旧密码不能一致，请重新输入！')
            }
        },
        passPwss: function (value) {
            if (value != $('[name=newpws]').val()) {
                return '两次输入的密码不一致，请重新输入！'
            }
        }

    })
    $('#reset1').on('click', function (e) {
        e.preventDefault()
        $('.layui-form')[0].reset()
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.removeItem('token')
                window.parent.location.href = '/login.html'
            }
        });
    })
})