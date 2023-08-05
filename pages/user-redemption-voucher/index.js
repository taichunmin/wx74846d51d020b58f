var t = (0, require("../../@babel/runtime/helpers/interopRequireDefault").default)(require("@vant/weapp/dialog/dialog")), a = require("../../8462214255C842DFE2044945663685D7.js");

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
        if ("" == t.detail.value) return a.showToast("请输入金币数量"), void this.setData({
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
        var o = this, n = o.data.inputCoinsCount;
        if ("" != n) return n > 2e3 ? (a.showToast("最多能兑换200代金券"), void this.setData({
            couponValue: 0
        })) : n % 10 != 0 ? (a.showToast("只能输入10的倍数"), void this.setData({
            couponValue: 0,
            disableStatus: "true"
        })) : void (n > o.data.gold_coin_count ? a.showToast("金币余额不够") : t.default.confirm({
            title: "温馨提示",
            message: "\n代金券换算规则：10金币等于1元代金券\n\n所有兑换的代金券只能抵扣商品的一半价格，例如：98.8元的商品可用490金币兑换49元代金券。\n\n注意：代金券一旦兑换后不退不换，且目前只支持在尼古拉实验室官方淘宝店使用",
            confirmButtonText: "确定兑换",
            cancelButtonText: "取消兑换"
        }).then(function() {
            a.redemptionVoucher(n, function(t) {
                1 == t.data.status ? o.setData({
                    overlay_show: !0,
                    reward: n,
                    gold_coin_count: t.data.data
                }) : a.showToast(t.data.msg);
            });
        }).catch(function() {
            a.showToast("用户取消兑换");
        }));
        a.showToast("请输入金币数量");
    },
    closeOverlay: function() {
        this.setData({
            overlay_show: !1
        }), wx.navigateBack();
    },
    onLoad: function(t) {
        var o = this;
        a.gold_coin_count(function(t) {
            0 == t ? o.setData({
                gold_coin_count: 0
            }) : o.setData({
                gold_coin_count: t
            });
        }), o.setBtnStyle();
    },
    onShow: function() {}
});