$(function () {
    $('.aui-navBar-item').click(function () {
        location.assign('goodsList.html')
    });
    var gid = localStorage.getItem('gId');
    // console.log(gid);
    getGood(gid);
})
// 获取请求，渲染页面
function getGood(gid) {
    $.get(domain + '/api/goods/getinfo', { id: gid }, function (res) {
        if (res.code !== 2000) {
            return alert('获取失败');
        }
        // console.log(res);
        var html = template('tpl-goods', res);
        $('.aui-scrollView').prepend(html);
    })
}