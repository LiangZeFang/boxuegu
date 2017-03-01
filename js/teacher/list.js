define(['jquery', 'common', 'nprogress','template'], function($, undefined, nprogress,template) {

    // 该页所有的js加载完毕，进度条结束。
    nprogress.done();
    ////讲师列表数据缓存
    //var treacherListCache;
    //try{
    //    treacherListCache = JSON.parse(localStorage.getItem('treacherListCache'));
    //}
    //渲染讲师列表
    $.get('/v6/teacher',function(data){
        if(data.code == 200){
            var html = template('teacher-list-tp1',{list:data.result});
            $('#teacher-list-tbody').html(html);
        }
    });
    //通过事件委托给动态生成的a标签绑定点击事件
    //然后获取讲师详细信息
    $('#teacher-list-tbody').on('click','.teacher-view',function(){
        $.get('/v6/teacher/view' ,{
            tc_id:$(this).parent().attr('data-id')
        },function(data){
            if(data.code == 200){
                var html= template('teacher-view-tp1',data.result);
                $('#teacherModal').html(html);
            }
        });
    });
});
