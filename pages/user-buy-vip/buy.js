require("../../AB5D946455C842DFCD3BFC63A316D685.js");

var t = require("../../76F8096255C842DF109E616502B6D685.js");

Page({
    data: {
        listData: [ {
            code: "云解码读卡",
            text: "right",
            type: "right"
        }, {
            code: "云存储卡包",
            text: "right",
            type: "right"
        }, {
            code: "读卡额日限<50张\n间隔<60秒",
            text: "right",
            type: "right"
        }, {
            code: "读卡额日限<100张\n间隔<30秒",
            text: "error",
            type: "right"
        }, {
            code: "无限次数写卡",
            text: "error",
            type: "right"
        }, {
            code: "极速写卡",
            text: "error",
            type: "right"
        } ],
        products: "",
        buyShow: "",
        isLogin: ""
    },
    buy: function(e) {
        for (var o = e.currentTarget.dataset.id, a = this.data.products, n = 0; n < a.length; n++) this.data.products[n].checked = !1;
        this.data.products[o].checked = !0, this.setData({
            products: this.data.products
        });
        for (var i = -1, r = this.data.products, c = 0; c < r.length; c++) if (r[c].checked) {
            i = r[c].product_price;
            var s = r[c].id;
            break;
        }
        if (-1 == i) console.log("啥都没选"); else {
            var d = t.getRequestUrl() + "Openvipwxconfig/prepayId", u = {
                phone: t.getPhone(),
                token: t.obtain(),
                product_id: s
            };
            t.requestFn(d, "post", u, function(t) {
                wx.requestPayment({
                    timeStamp: t.data.timeStamp,
                    nonceStr: t.data.nonceStr,
                    package: t.data.package,
                    signType: "MD5",
                    paySign: t.data.paySign,
                    total_fee: .01,
                    success: function(t) {
                        console.log("支付成功！");
                    },
                    fail: function(t) {
                        console.log(t);
                    }
                });
            });
        }
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        if (0 == t.isLogin()) this.setData({
            isLogin: !1
        }); else {
            this.setData({
                isLogin: !0
            }), "ios" == wx.getSystemInfoSync().platform ? this.setData({
                buyShow: "ios"
            }) : this.setData({
                buyShow: "android"
            });
            var e = this, o = t.getRequestUrl() + "Product/monthCard";
            t.requestFn(o, "post", {}, function(t) {
                var o = t.data;
                o.forEach(function(e) {
                    e.checked = !1, t.data[0].checked = !0;
                }), e.setData({
                    products: t.data
                });
            });
        }
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});