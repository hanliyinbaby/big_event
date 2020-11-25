$(function () {
    var layer = layui.layer
    var form = layui.form
    // 获取数据并渲染到界面
    diaoshuju()
    function diaoshuju() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取数据失败')
                }
                let muban1 = template('card', res)
                $('tbody').html(muban1)
            }
        });
    }
    // 给添加文章按钮注册点击事件
    var add_edit = null
    $('#add_edit').on('click', function () {
        // 弹出层
        add_edit = layer.open({
            type: 1,
            title: '添加文章类别',
            area: ['500px', '250px'],
            content: $('#add_edited').html()
        });
    })
    // 给弹出层中的添加按钮注册提交事件
    $('body').on('submit', '#add-edit', function (e) {
        e.preventDefault()
        //获取新添加的数据并渲染到页面上
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('添加文章失败')
                }
                layer.msg('添加文章成功')
                diaoshuju()
                layer.close(add_edit)
            }
        });
    })
    // 给编辑按钮注册点击事件
    var add_bianji = null
    $('body').on('click', '#bianji', function () {
        var id = $(this).attr('data-index')
        // 弹出层事件
        add_bianji = layer.open({
            type: 1,
            title: '修改文章类别',
            area: ['500px', '250px'],
            content: $('#add_bianji').html()
        });
        // 获取页面的数据填充到弹出层页面中
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取数据失败')
                }
                form.val('add-bianji', res.data)
            }
        });
    })
    // 更改页面的数据
    $('body').on('submit', '#add-bianji', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新信息失败！')
                }
                layer.msg('更新信息成功！')
                diaoshuju()
                layer.close(add_bianji)
            }
        });
    })
    //实现删除功能

    $('body').on('click', '#delet', function () {
        var id = $(this).attr('data-index')
        layer.confirm('确定要删除吗?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: "GET",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg('删除文章成功！')
                    diaoshuju()

                }
            });

            layer.close(index);
        });
    })
})