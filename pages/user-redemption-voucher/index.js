var t, a = (t = require("@vant/weapp/dialog/dialog")) && t.__esModule ? t : {
    default: t
};

var o = require("../../76F8096255C842DF109E616502B6D685.js");

Page({
    data: {
        gold_coin_count: 0,
        disableStatus: "false",
        inputCoinsCount: "",
        couponValue: 0,
        overlay_show: !1,
        reward: ""
    },
    onInputCoins: function(t) {
        if ("" == t.detail.value) return o.showToast("请输入金币数量"), void this.setData({
            couponValue: 0
        });
        this.setData({
            inputCoinsCount: t.detail.value,
            couponValue: t.detail.value / 10
        }), this.setBtnStyle();
    },
    setBtnStyle: function() {
        "" == this.data.inputCoinsCount ? this.setData({
            disableStatus: "true"
        }) : this.setData({
            disableStatus: "false"
        });
    },
    onConfirmRedemption: function() {
        var t = this, n = t.data.inputCoinsCount;
        if ("" != n) return n > 2e3 ? (o.showToast("最多能兑换200代金券"), void this.setData({
            couponValue: 0
        })) : n % 10 != 0 ? (o.showToast("只能输入10的倍数"), void this.setData({
            couponValue: 0,
            disableStatus: "true"
        })) : void (n > t.data.gold_coin_count ? o.showToast("金币余额不够") : a.default.confirm({
            title: "温馨提示",
            message: "\n代金券换算规则：10金币等于1元代金券\n\n所有兑换的代金券只能抵扣商品的一半价格，例如：98.8元的商品可用490金币兑换49元代金券。\n\n注意：代金券一旦兑换后不退不换，且目前只支持在尼古拉实验室官方淘宝店使用",
            confirmButtonText: "确定兑换",
            cancelButtonText: "取消兑换"
        }).then(function() {
            o.redemptionVoucher(n, function(a) {
                1 == a.data.status ? t.setData({
                    overlay_show: !0,
                    reward: n,
                    gold_coin_count: a.data.data
                }) : o.showToast(a.data.msg);
            });
        }).catch(function() {
            o.showToast("用户取消兑换");
        }));
        o.showToast("请输入金币数量");
    },
    closeOverlay: function() {
        this.setData({
            overlay_show: !1
        }), wx.navigateBack();
    },
    onLoad: function(t) {
        var a = this;
        o.gold_coin_count(function(t) {
            0 == t ? a.setData({
                gold_coin_count: 0
            }) : a.setData({
                gold_coin_count: t
            });
        }), a.setBtnStyle();
    },
    onShow: function() {}
});