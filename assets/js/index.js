$(function() {
        // 调用getUserInfo获取用户的基本信息
        getUserInfo()
        varlayui = layui.layer
        $('#btnLogout').on('click', function() {
            // console.log(ok);
            // 提示用户是否确认退出
            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
                //do something
                // console.log('ok');
                // 1.清空本地存储的token
                localStorage.removeItem('token')
                    // 重新跳转到登录页面
                location.href = '/code/login.html'
                    // 关闭confirm询问框
                layer.close(index);
            });
        })
    })
    // 获取用户的基本信息
    //调用了函数就可以发请求了
function getUserInfo() {
    $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // headers 就是请求头配置对象
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                // 调用renderAvatar渲染用户的头像
                renderAvatar(res.data)
            },
            // 不论成功或失败 最终都会调用complete函数
            // complete: function(res) {
            //     // console.log('执行了 complete 回调：')
            //     // console.log(res)
            //     // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         //     // 1. 强制清空 token
            //         localStorage.removeItem('token')
            //             //         // 2. 强制跳转到登录页面
            //         location.href = '/code/login.html'
            //     }
            // }
        })
        // 渲染用户的头像
        // 有优先级 如果有nickname(昵称) 就以昵称为准 如果没有昵称 就用登录的名字username
    function renderAvatar(user) {
        // 1. 获取用户的名称
        var name = user.nickname || user.username
            // 2. 设置欢迎的文本
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
            // 3. 按需渲染用户的头像
            // 判断是否有user_pic(图片头像) 如果有 先渲染图片头像
        if (user.user_pic !== null) {
            // 3.1 渲染图片头像
            $('.layui-nav-img')
                .attr('src', user.user_pic)
                .show()
                // 隐藏文本头像
            $('.text-avatar').hide()
        } else {
            // 3.2 渲染文本头像
            // 把图片头像隐藏
            $('.layui-nav-img').hide()
                // 设置文本内容 name[0]第一个字符 toUpperCase字符统一转为大写
            var first = name[0].toUpperCase()
            $('.text-avatar')
                .html(first)
                .show()
        }
    }
}