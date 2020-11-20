$(function () {
    $('#zhucebtn').on('click', function () {
        $('#denglureg').hide()
        $('#zhucereg').show()
    })
    $('#denglubtn').on('click', function () {
        $('#zhucereg').hide()
        $('#denglureg').show()
    })
    var form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    })
    //注册界面注册监听事件
    $('#zhuceFrom').on('submit', function (e) {
        //    阻止默认事件
        e.preventDefault()
        if ($('#zhucepass1').val() !== $('#zhucepass2').val()) {
            return console.log('两次输入的密码不一致');
        }
        var data = { username: $('#zhuceFrom [name="username"]').val(), password: $('#zhuceFrom [name="password"]').val() }
        $.ajax({
            type: "POST",
            url: "git/api/reguser",
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.use('layer', function () {
                        var layer = layui.layer;

                        layer.msg(res.message);
                    });
                }
                return layui.use('layer', function () {
                    var layer = layui.layer;
                    layer.msg(res.message);
                    $('#zhuceFrom')[0].reset()
                    setTimeout(function () {
                        $('#denglubtn').click()
                    }, 3000)


                });
            }
        });

    })
    // 登录界面注册监听事件
    $('#dengluFrom').on('submit', function (e) {
        //    阻止默认事件
        e.preventDefault()
        var data = { username: $('#dengluFrom [name="username"]').val(), password: $('#dengluFrom [name="password"]').val() }
        // const data = $('#dengluipt').val()
        $.ajax({
            type: "post",
            url: "/api/login",
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.use('layer', function () {
                        var layer = layui.layer;

                        layer.msg(res.message);
                    });
                }
                return layui.use('layer', function () {
                    var layer = layui.layer;
                    layer.msg(res.message);
                    $('#dengluFrom')[0].reset()
                });
            }
        });
    })



})