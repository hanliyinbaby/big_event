$(function () {
    var layer = layui.layer
    var form = layui.form
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    //渲染页面
    initShuju()
    function initShuju() {
        $.ajax({
            type: "GET",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取数据失败！')
                }
                var htmlstr = template('tplList', res)
                $('tbody').html(htmlstr)
                renderPage(res.total)
            }
        });
    }
    // 定义时间过滤器
    template.defaults.imports.dataFormat = function times(data) {
        var data = new Date(data)
        var y = data.getFullYear()
        var m = padZero(data.getMonth() + 1)
        var d = padZero(data.getDate())

        var hh = padZero(data.getHours())
        var mm = padZero(data.getMinutes())
        var ss = padZero(data.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n

    }
    initCate()

    // 初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 通过 layui 重新渲染表单区域的UI结构
                form.render()
            }
        })
    }
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        // 为查询参数对象 q 中对应的属性赋值
        q.cate_id = cate_id
        q.state = state
        // 根据最新的筛选条件，重新渲染表格的数据
        initShuju()
    })
    function renderPage(total) {
        layui.use('laypage', function () {
            var laypage = layui.laypage;

            //执行一个laypage实例
            laypage.render({
                elem: 'fenPage',
                count: total,
                layout: ['limit', 'prev', 'page', 'next'],
                limits: [2, 3, 5, 10],
                limit: q.pagesize, // 每页显示几条数据
                curr: q.pagenum,
                jump: function (obj, first) {
                    // console.log(obj.curr)
                    // 把最新的页码值，赋值到 q 这个查询参数对象中
                    q.pagenum = obj.curr
                    q.pagesize = obj.limit
                    if (!first) {
                        initShuju()
                    }

                }

            });
        });
    }
    // 编辑功能
    // $('tbody').on('click', '#bianji_list', function () {

    //     var id = $(this).attr('data-bid')
    //     $.ajax({
    //         type: "method",
    //         url: "/my/article/" + id,
    //         success: function (res) {
    //             if (res.status !== 0) {
    //                 return layer.msg('获取数据失败！')
    //             }
    //             layer.msg('获取数据成功！')
    //         }
    //     });
    // })
    // 删除数据
    $('tbody').on('click', '#delet', function () {
        var id = $(this).attr('data-id')
        var len = $('#bianji_list').length
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                methed: "GET",
                url: "/my/article/delete/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除数据失败！')
                    }
                    layer.msg('删除数据成功！')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initShuju()
                }
            });
            layer.close(index);
        });

    })
})