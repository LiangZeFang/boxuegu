/**
 * Created by Administrator on 2017/2/26.
 */
define(['jquery'], function ($) {
    //左侧导航下拉列表
    $('.navs li:nth-of-type(4) a').on('click', function () {
        $(this).next().stop().slideToggle();
    });
    $.ajax({
        url: '/v6/login',
        type: 'post',
        data: {
            tc_name: 123456,
            tc_pass: 123456
        },
        success: function () {
            console.log('成功');
        },
        error: function () {
            console.log('失败');
        }
    });
});