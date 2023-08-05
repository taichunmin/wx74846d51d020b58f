require("../../6B5F0E3755C842DF0D39663027C585D7.js");

var t = require("../../8462214255C842DFE2044945663685D7.js");

Page({
    data: {
        products: ""
    },
    getradio: function(t) {
        for (var o = t.currentTarget.dataset.id, e = this.data.products, a = 0; a < e.length; a++) this.data.products[a].checked = !1;
        this.data.products[o].checked = !0, this.setData({
            products: this.data.products
        });
    },
    buyNow: function() {
        for (var o = -1, e = this.data.products, a = 0; a < e.length; a++) if (e[a].checked) {
            o = e[a].product_price;
            var n = e[a].id;
            break;
        }
        if (-1 == o) console.log("啥都没选"); else {
            console.log("我想购买: " + o), console.log("商品的id是: " + n);
            var c = t.getPhone(), s = t.obtain(this);
            console.log("手机号是: " + c), wx.request({
                url: t.getRequestUrl() + "Purcheasewxconfig/prepayId",
                data: {
                    phone: c,
                    product_id: n,
                    token: s
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(t) {
                    console.log("新数据是" + JSON.stringify(t)), wx.requestPayment({
                        timeStamp: t.data.timeStamp,
                        nonceStr: t.data.nonceStr,
                        package: t.data.package,
                        signType: "MD5",
                        paySign: t.data.paySign,
                        total_fee: .01,
                        success: function(t) {
                            console.log("支付成功！" + JSON.stringify(t));
                        },
                        fail: function(t) {
                            console.log(t);
                        }
                    });
                }
            });
        }
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        var o = this;
        wx.request({
            url: t.getRequestUrl() + "Product/subCard",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log("请求的数据是" + JSON.stringify(t));
                var e = t.data;
                e.forEach(function(o) {
                    o.checked = !1, t.data[0].checked = !0;
                }), o.setData({
                    products: t.data
                }), console.log("pro" + JSON.stringify(o.data.products));
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});