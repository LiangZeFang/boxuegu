/**
 * Created by Administrator on 2017/2/25.
 */
requirejs.config({
    baseUrl: '/',
    paths: {
        //第三方库加载路径
        jquery: 'lib/jquery/jquery.min',
        bootstrap: 'lib/bootstrap/js/bootstrap.min',
        jqueryCookie: 'lib/jquery-cookie/jquery.cookie',
        nprogress:'lib/nprogress/nprogress',
        template:'lib/artTemplate-3.0.1/template',
        //自己的加载路径
        courseAddStep1:'/js/course/add_step1',
        courseAddStep2:'/js/course/add_step2',
        courseAddStep3:'/js/course/add_step3',
        courseAdd:'/js/course/add',
        courseCategoryAdd:'/js/course/category_add',
        courseCategory:'js/course/category',
        courseList:'js/course/list',
        courseTopic:'js/course/topic',
        repass:'js/home/repass',
        settings:'js/home/settings',
        teacherAdd:'js/teacher/add',
        teacherList:'js/teacher/list',
        userList: 'js/user/list',
        userProfile: 'js/user/profile',
        common: 'js/common/common',
        login: 'js/home/login',
        index:'js/index'
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        }
    }
});
//优先以最快的速度开启页面的进度条
require(['nprogress'],function(nprogress){
   nprogress.start();
});
//先加载这两个
require(['jquery', 'bootstrap', 'common']);
//这里获取页面的pathname，然后对应的加载js
(function (window) {
    //获取路径
    var pathname = window.location.pathname;
    /*
     判断登录状态：
     1、登录页
     1.1、没有SESSID，不用管
     1.2、有SESSID，跳转到首页
     2、其他页
     2.1、没有SESSID，跳转奥登录页
     2.2、有，不用管
     */
    require(['jquery', 'jqueryCookie'], function ($, undefined) {
        var sessID = $.cookie('PHPSESSID');
        //登录状态前端效验
        if (pathname === '/html/home/login.html' && sessID) {
            location.href = '/';
            //又如果不是在登录并且没有SESSID就跳转到登录页
        } else if (pathname !== '/html/home/login.html' && !sessID) {
            location.href = '/html/home/login.html';
        }
        //如果没有发生页面跳转，就加载对应的js模块
        switch (pathname) {
            case '/html/user/list.html':
                require(['userList']);
                break;
            case '/html/user/profile.html':
                require(['userProfile']);
                break;
            case '/html/teacher/add.html':
                require(['teacherAdd']);
                break;
            case '/html/teacher/list.html':
                require(['teacherList']);
                break;
            //course
            case '/html/course/add.html':
                require(['courseAdd']);
                break;
            case '/html/course/add_step1.html':
                require(['courseAddStep1']);
                break;
            case '/html/course/add_step2.html':
                require(['courseAddStep2']);
                break;
            case '/html/course/add_step3.html':
                require(['courseAddStep3']);
                break;
            case '/html/course/category.html':
                require(['courseCategory']);
                break;
            case '/html/course/category_add.html':
                require(['courseCategoryAdd']);
                break;
            case '/html/course/list.html':
                require(['courseList']);
                break;
            case '/html/course/topic.html':
                require(['courseTopic']);
                break;
            //home
            case '/html/home/login.html':
                require(['login']);
                break;
            case '/html/home/settings.html':
                require(['settings']);
                break;
            case '/html/home/repass.html':
                require(['settings']);
                break;
            case '/':
                require(['index']);
                break;
        }
    });
})(window);