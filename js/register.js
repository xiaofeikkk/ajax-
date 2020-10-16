$(function () {
    // 判断邮箱格式
    $('#email').blur(function () {
        var rg = /[@]/;
        if (!rg.test($(this).val())) {
            return alert('邮箱输入格式不正确，请重新输入');
        }
    });
    // 判断密码长度
    $('#password').blur(function () {
        if ($(this).val().length >= 13 || $(this).val().length <= 0) {
            return alert('密码长度大于13或小于0，请重新输入')
        }
    });
    // 判断确认密码是否正确
    $('#repassword').blur(function () {
        var pwd = $(this).parents('#userMsg').find('#password').val();
        if (pwd !== $(this).val()) {
            return alert('两次输入密码不一致');
        }
    })
    // 点击按钮注册
    $('.lowin-btn').click(function (e) {
        e.preventDefault();
        var userMsg = $(this).parents('#userMsg').serialize();
        console.log(userMsg);
        userRegiste(userMsg);
    })
});
// 请求数据
function userRegiste(userMsg) {
    if ($('#password').val() == $('#repassword').val()) {
        $.post(domain + '/api/member/register', userMsg, function (res) {
            if (res.code !== 2000) {
                return alert('注册失败');
            }
            location.assign('login.html'); // 跳转
        })
    }
}