require("../../AB5D946455C842DFCD3BFC63A316D685.js");

var t = require("../../76F8096255C842DF109E616502B6D685.js");

Page({
    data: {
        products: ""
    },
    getradio: function(t) {
        for (var e = t.currentTarget.dataset.id, a = this.data.products, c = 0; c < a.length; c++) this.data.products[c].checked = !1;
        this.data.products[e].checked = !0, this.setData({
            products: this.data.products
        });
    },
    buyNow: function() {
        for (var e = -1, a = this.data.products, c = 0; c < a.length; c++) if (a[c].checked) {
            e = a[c].product_price;
            var o = a[c].id;
            break;
        }
        if (-1 == e) console.log("啥都没选"); else {
            var n = t.getRequestUrl() + "Purcheasewxconfig/prepayId", r = {
                phone: t.getPhone(),
                token: t.obtain(),
                product_id: o
            };
            t.requestFn(n, "post", r, function(t) {
                wx.requestPayment({
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
            });
        }
    },
    onShow: function() {
        var e = this, a = t.getRequestUrl() + "Product/subCard";
        t.requestFn(a, "post", {}, function(t) {
            var a = t.data;
            a.forEach(function(e) {
                e.checked = !1, t.data[0].checked = !0;
            }), e.setData({
                products: t.data
            });
        });
    },
    onHide: function() {}
});