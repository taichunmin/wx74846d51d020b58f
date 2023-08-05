var a = require("../../8462214255C842DFE2044945663685D7.js");

Page({
    data: {
        currentPage: 1,
        lastPage: 0,
        goods_data: [],
        showLoginView: !1
    },
    onUserSearch: function(a) {
        var t = a.detail, o = this.data.goods_data;
        if ("" == t) {
            for (var e = 0; e < o.length; e++) o[e].show = "true";
            this.setData({
                goods_data: o
            });
        } else {
            for (e = 0; e < o.length; e++) o[e].show = "false", o[e].goods_name.indexOf(t) >= 0 && (o[e].show = "true");
            this.setData({
                goods_data: o
            });
        }
    },
    onClearSearch: function() {
        for (var a = 0; a < this.data.goods_data.length; a++) this.data.goods_data[a].show = "true";
        this.setData({
            goods_data: this.data.goods_data
        });
    },
    getGoodsList: function() {
        var t = this;
        a.goldCoinGoods(t.data.currentPage, function(a) {
            var o = a.data.data.data.last_page, e = a.data.data.data.data;
            if (1 == a.data.status) {
                for (var s = [], d = 0; d < e.length; d++) e[d].merchandise = JSON.parse(e[d].merchandise), 
                e[d].commodity_classification = JSON.parse(e[d].commodity_classification), s.push({
                    id: e[d].id,
                    goods_name: e[d].merchandise.goods_name,
                    goods_describe: e[d].merchandise.goods_describe,
                    goods_price: e[d].merchandise.goods_price,
                    needGoldCoin: e[d].merchandise.needGoldCoin,
                    sold_count: e[d].merchandise.sold_count,
                    gold_coin_deduction: e[d].merchandise.gold_coin_deduction,
                    payment_method: e[d].merchandise.payment_method,
                    delivery_time: e[d].merchandise.delivery_time,
                    goods_transport: e[d].merchandise.goods_transport,
                    grounding: e[d].grounding,
                    purchase_limit_count: e[d].merchandise.purchase_limit_count,
                    rotationChartImg: e[d].merchandise.rotationChartImg,
                    detailsImg: e[d].merchandise.detailsImg,
                    commodity_classification: e[d].commodity_classification,
                    show: "true",
                    login_display: e[d].login_display
                });
                var i = t.data.goods_data.concat(s);
                t.setData({
                    lastPage: o,
                    goods_data: i
                });
            }
        });
    },
    onLoad: function(a) {
        wx.hideTabBar();
    },
    onShow: function() {
        a.isLogin() ? this.setData({
            showLoginView: !0
        }) : this.setData({
            showLoginView: !1
        }), 0 == this.data.goods_data.length && this.getGoodsList();
    },
    onReachBottom: function() {
        var a = this;
        if (a.data.currentPage == a.data.lastPage) return !1;
        a.setData({
            currentPage: a.data.currentPage + 1
        }, function() {
            a.getGoodsList();
        });
    }
});