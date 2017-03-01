/**
 * Created by Administrator on 2017/2/26.
 */
define(['jquery', 'jqueryCookie'], function ($, undefined) {
    //ajax请求loading
    //ajaxStart ajax请求开始时执行函数
    $(document).ajaxStart(function(){
        $('.overlay').show();
        //ajaxStop ajax请求结束时执行函数
    }).ajaxStop(function(){
        $('overlay').hide();
    });
    //左侧导航下拉列表
    $('.navs li:nth-of-type(4) a').on('click', function () {
        $(this).next().stop().slideToggle();
    });
    /*
    * 根据页面路径定位左侧导航
    * 1、获取当前页面的pathname
    * 2、然后获取所有的a，remove掉active class，
    * 然后再使用pathname获取到应该被选中的a，给它添加active class即可
    * 3、最后获取该a标签所有的父ul标签，让他们展示*/
    var pathname = window.location.pathname;
    $('.navs a').removeClass('active').filter('[href="'+pathname+'"]')//[href="'+pathname+'这样写等于是找有href属性和路径是/的意思，href="/"
        .addClass('active').parents('ul').show();
    //退出功能
    $('#logout').on('click', function () {
        $.post('/v6/logout', function (data) {
            if (data.code == 200) {
                location.href = '/html/home/login.html';
            }
        });
    });
    //获取本地cookie用户信息。同时做容错处理
    var userInfo = null;
    try {
        userInfo = JSON.parse($.cookie('userInfo'));
    } catch (e) {
        userInfo = {};
    }
    //然后展示到左侧导航栏
    $('.aside .profile h4').html(userInfo.tc_name ? userInfo.tc_name : '你大爷');
    $('.aside .profile img').attr('src', userInfo.tc_avatar ? userInfo.tc_avatar : '/img/default.jpg');
});