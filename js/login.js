$(function () {
    // 点击登录按钮
    $('.login-btn').click(function (e) {
        e.preventDefault();
        var userMsg = $(this).parents('#userMsg').serialize();
        userLogin(userMsg);
    });
});
function userLogin(userMsg) {
    $.post(domain + '/api/member/login', userMsg, function (res) {
        if (res.code !== 2000) {
            return alert('登录失败');
        }
        localStorage.setItem('myToken', res.token); // 保存token
        location.assign('goodsList.html'); // 跳转
    })
}

