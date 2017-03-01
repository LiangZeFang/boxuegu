/**
 * Created by Administrator on 2017/2/25.
 */
define(['jquery', 'jqueryCookie','nprogress'], function ($, undefined,nprogress) {
    /*
     1、先监听form表单的提交事件，
     2、事件回调return false阻止默认的提交
     3、事件回调中通过ajax的方式发送表单数据
     4、如果返回结果中的code为200.证明登录成功，跳转到首页
     */
    var userInfo = null;
    try{
        userInfo = JSON.parse($.cookie('userInfo'))
    }catch(e){
        userInfo = {};
    }
    console.log(1);
    $('.login .avatar img').attr('src',userInfo.tc_avatar? userInfo.tc_avatar:'/img/monkey.png');
    $('#form-login').on('submit', function () {
        $.ajax({
            url: '/v6/login',
            type: 'post',
            data: $(this).serialize(),
            success: function (data) {
                if (data.code === 200) {
                    $.cookie('userInfo', JSON.stringify(data.result), {path: '/'});
                    location.href = '/';
                }
            }
        });
        return false;
    });
    nprogress.done();
});
