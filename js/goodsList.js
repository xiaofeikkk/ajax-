// 页数
var pageCount;
$(function () {
    // 页数
    var pageNum = 1;
    // 初始化页面
    getGoodsList(1, '');
    // 点击搜索框
    $('#search').keyup(function () {
        var str = $(this).val();
        getGoodsList(1, str);
        if (pageCount == 1) {
            $('.aui-pagination-next').addClass('disabled');
        }
    });

    if (pageNum == pageCount) {
        $('.aui-pagination-next').addClass('disabled');
    }
    // 点击前一页
    $('.aui-pagination-prev').click(function () {
        $(this).removeClass('disabled').siblings('.aui-pagination-next').removeClass('disabled');
        if (pageNum == 1) {
            return false;
        } else if (pageNum == 2) {
            $(this).addClass('disabled');
        }
        pageNum--;
        getGoodsList(pageNum, '');
    });
    // 点击下一页
    $('.aui-pagination-next').click(function () {
        $(this).removeClass('disabled').siblings('.aui-pagination-prev').removeClass('disabled');
        if (pageNum == pageCount) {
            return false;
        } else if (pageNum == pageCount - 1) {
            $(this).addClass('disabled');
        }
        pageNum++;
        getGoodsList(pageNum, '');
    });
    // 点击购物车跳转
    $('.van-tabbar-item').click(function () {
        location.assign('cart.html');
    })
});

// 获取数据，渲染页面
function getGoodsList(page, search) {
    $.get(domain + '/api/goods/getlist', { page: page, search: search }, function (res) {
        if (res.code !== 2000) {
            return alert('服务器繁忙，请稍后再试');
        }
        console.log(res);
        pageCount = res.page.pageCount;
        var goodsHTML = template('tpl-good', res);
        // num(res.page.pageCount);
        $('.aui-list-theme-box').html(goodsHTML);
        var pageHTML = template('tpl-page', res);
        $('.aui-pagination-page').html(pageHTML);
        addToCar(); // 点击添加入购物车
        goToGoodsInfo(); // 跳转到详情页面
    })
}
// 加入购物车
function addToCar() {
    $('.aui-coupon').click(function () {
        var gid = $(this).parents('.aui-list-item').attr('data-id');
        var price = $(this).attr('data-price');
        var token = localStorage.getItem('myToken');
        var goodMsg = { gid: gid, price: price, token: token };
        $.get(domain + '/api/cart/add', goodMsg, function (res) {
            if (res.code !== 2000) {
                return alert('添加失败');
            }
            console.log('添加成功');
        })
    })
}
// 详情页面
function goToGoodsInfo() {
    $('.aui-list-theme-img').click(function () {
        var id = $(this).parents('.aui-list-item').attr('data-id');
        $.get(domain + '/api/goods/getinfo', { id: id }, function (res) {
            if (res.code !== 2000) {
                return alert('获取失败');
            }
            localStorage.setItem('gId', id);
            location.assign('goodsInfo.html');
        })
    });
    $('.aui-list-theme-title').click(function () {
        var id = $(this).parents('.aui-list-item').attr('data-id');
        $.get(domain + '/api/goods/getinfo', { id: id }, function (res) {
            if (res.code !== 2000) {
                return alert('获取失败');
            }
            localStorage.setItem('gId', id);
            location.assign('goodsInfo.html');
        })
    })
}