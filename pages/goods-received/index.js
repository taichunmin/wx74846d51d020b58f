var a = require("../../8462214255C842DFE2044945663685D7.js");

Page({
    data: {
        navBarHeight: "",
        menuButtonHeight: "",
        blockPosition: "",
        goodsData: "",
        unpaid: !1,
        db_order_number: ""
    },
    back: function() {
        wx.navigateBack();
    },
    getNavHeight: function() {
        var a = wx.getSystemInfoSync().statusBarHeight, t = wx.getMenuButtonBoundingClientRect(), e = a + t.height + 2 * (t.top - a), o = e - t.height - 5;
        this.setData({
            blockPosition: a + o,
            navBarHeight: a,
            menuButtonHeight: e - t.height - 5
        });
    },
    onCopyUIDBtnClickCall: function(t) {
        wx.setClipboardData({
            data: t.currentTarget.dataset.smile,
            success: function(t) {
                a.showToast("快递单号复制成功");
            }
        });
    },
    editAddress: function() {
        var t = this, e = t.data.goodsData.id;
        wx.navigateTo({
            url: "/pages/shipping-address/index?mode=1&address_id=".concat(t.data.goodsData.address_info.address_id),
            events: {
                someEvent: function(o) {
                    var s = o.data[0].id, d = o.data[0].consignee, n = o.data[0].phone, i = o.data[0].address, r = d + " " + n + " " + i;
                    a.updateHistoryaddress(e, r, d, n, i, s, function(e) {
                        if (1 == e.data.status) {
                            var o = t.data.goodsData;
                            o.address_info = JSON.parse(e.data.data[0].address_info), t.setData({
                                goodsData: o
                            }), a.showToast("更改成功");
                        } else a.showToast("更改失败或者没变动");
                    });
                }
            }
        });
    },
    loadData: function(a) {
        var t;
        null != a.address_info && (a.address_info.consignee_phone = a.address_info.consignee_phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")), 
        t = null != a.goods_need_gold_coins ? "金币" : 0 == a.deduct_gold_coins ? "微信支付" : "微信支付+金币", 
        "true" == a.order_payment_status && "false" == a.order_status ? a.order_status_text = "待收货" : "false" == a.order_payment_status && "cancel" == a.order_status || "false" == a.order_payment_status && "manualCancellation" == a.order_status ? a.order_status_text = "已取消" : "true" == a.order_payment_status && "true" == a.order_status || null != a.goods_need_gold_coins && "success" == a.order_status ? a.order_status_text = "已完成" : "false" == a.order_payment_status && "false" == a.order_status && (a.order_status_text = "待支付", 
        this.setData({
            unpaid: !0
        })), null != a.goods_need_gold_coins ? (a.amount_display = "false", a.goldCoin_display = "true") : null == a.goods_need_gold_coins && 0 == a.deduct_gold_coins ? (a.amount_display = "true", 
        a.goldCoin_display = "false") : null == a.goods_need_gold_coins && a.deduct_gold_coins > 0 && (a.amount_display = "true", 
        a.goldCoin_display = "true"), a.pay_method = t, this.setData({
            goodsData: a
        });
    },
    immediatePayment: function() {
        wx.showLoading();
        var t = this;
        a.goToPay(t.data.db_order_number, function(e) {
            wx.requestPayment({
                timeStamp: e.data.timeStamp,
                nonceStr: e.data.nonceStr,
                package: e.data.package,
                signType: "MD5",
                paySign: e.data.paySign,
                total_fee: .01,
                success: function(e) {
                    a.showToast("支付成功！"), wx.redirectTo({
                        url: "/pages/user-payment-succeeded/index?db_order_number=" + t.data.db_order_number,
                        complete: function() {
                            wx.hideLoading({});
                        }
                    });
                },
                fail: function(t) {
                    wx.hideLoading({}), a.showToast("取消支付或支付失败");
                }
            });
        });
    },
    onCancelOrder: function() {
        var t = this, e = this.data.goodsData.item_order_number;
        wx.showModal({
            title: "",
            content: "是否取消订单？",
            success: function(o) {
                o.confirm ? a.cancelOrder(e, function(e) {
                    1 == e.data.status ? (a.showToast(e.data.msg), t.data.goodsData.order_status = "manualCancellation", 
                    t.data.goodsData.order_status_text = "已取消", t.setData({
                        goodsData: t.data.goodsData
                    })) : a.showToast(e.data);
                }) : console.log("用户点击取消");
            }
        });
    },
    onGoToGoodsDetail: function() {
        var t = this.data.goodsData.goods_id;
        a.queryGoodsById(t, function(a) {
            var t = a.data.data;
            t[0].merchandise = JSON.parse(t[0].merchandise), t[0].commodity_classification = JSON.parse(t[0].commodity_classification);
            var e = {
                id: t[0].id,
                goods_name: t[0].merchandise.goods_name,
                goods_describe: t[0].merchandise.goods_describe,
                goods_price: t[0].merchandise.goods_price,
                needGoldCoin: t[0].merchandise.needGoldCoin,
                sold_count: t[0].merchandise.sold_count,
                gold_coin_deduction: t[0].merchandise.gold_coin_deduction,
                payment_method: t[0].merchandise.payment_method,
                delivery_time: t[0].merchandise.delivery_time,
                goods_transport: t[0].merchandise.goods_transport,
                grounding: t[0].grounding,
                purchase_limit_count: t[0].merchandise.purchase_limit_count,
                rotationChartImg: t[0].merchandise.rotationChartImg,
                detailsImg: t[0].merchandise.detailsImg,
                commodity_classification: t[0].commodity_classification,
                show: "true"
            };
            wx.navigateTo({
                url: "/pages/goods-details/index?data=" + JSON.stringify(e)
            });
        });
    },
    onLoad: function(a) {
        var t = JSON.parse(a.data);
        this.setData({
            db_order_number: t.item_order_number
        }), this.loadData(t), this.getNavHeight();
    },
    onShow: function() {}
});