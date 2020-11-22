$(function () {
    var form = layui.form
    form.verify({
        nick: function (value) {
            if (value.length > 6) {
                return layer.msg('你输入的昵称必须在1 ~ 6个字符');
            }
        }
    })
    getziliao()
    function getziliao() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message)
                form.val('userxinxi', res.data)
            }


        });

    }

    $('#btnset').on('click', function (e) {
        e.preventDefault()
        getziliao()

    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                window.parent.getUserIfon()
                $('.layui-form')[0].reset()

            }
        });
    })
})