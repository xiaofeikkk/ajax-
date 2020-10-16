$(function () {
    // 返回
    $('.icon-fanhui').click(function () {
        location.assign('goodsList.html')
    })
    getCar(); // 初始化页面
})
// 获取请求，渲染页面
function getCar() {
    var token = localStorage.getItem('myToken');
    $.get(domain + '/api/cart/getlist', { token: token }, function (res) {
        if (res.code !== 2000) {
            $('.kon-cat').css('display', 'block');
            $('.kon-lj').click(function () {
                location.assign('goodsList.html');
            })
            return console.log('没有商品');
        }
        console.log(res);
        if (res.data !== null) {
            var html = template('tpl-carGood', res);
            $('.product').html(html);
            $('.kon-cat').css('display', 'none');
        } else {
            $('.kon-lj').click(function () {
                location.assign('goodsList.html');
            })
        }
        removeGood(token); // 删除商品
        editGood(token); // 修改商品数量
    })
}
// 删除商品
function removeGood(token) {
    $('.product-del').click(function () {
        var gid = $(this).attr('data-id');
        $.get(domain + '/api/cart/remove', { id: gid, token: token }, function (res) {
            if (res.code !== 2000) {
                return alert('删除失败');
            }
            getCar();
        })
    })
}
// 修改商品数量
function editGood(token) {
    $('.product-jian').click(function () {
        var num = $(this).parents('.product_gw').attr('data-num');
        var gid = $(this).parents('.product-amount').siblings('.product-del').attr('data-id');
        if (num == 1) {
            $.get(domain + '/api/cart/remove', { id: gid, token: token }, function (res) {
                if (res.code !== 2000) {
                    return alert('删除失败');
                }
                getCar();
            })
        } else {
            num--;
            $.get(domain + '/api/cart/edit', { token: token, id: gid, num: num }, function (res) {
                if (res.code !== 2000) {
                    return alert('修改失败');
                }
                getCar();
            })
        }
    });
    $('.product-add').click(function () {
        var num = $(this).parents('.product_gw').attr('data-num');
        var gid = $(this).parents('.product-amount').siblings('.product-del').attr('data-id');
        num++;
        $.get(domain + '/api/cart/edit', { token: token, id: gid, num: num }, function (res) {
            if (res.code !== 2000) {
                return alert('修改失败');
            }
            getCar();
        })
    })
}