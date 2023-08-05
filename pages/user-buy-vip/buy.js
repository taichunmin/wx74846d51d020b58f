require("../../6B5F0E3755C842DF0D39663027C585D7.js");

var t = require("../../8462214255C842DFE2044945663685D7.js");

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
        for (var o = e.currentTarget.dataset.id, n = this.data.products, a = 0; a < n.length; a++) this.data.products[a].checked = !1;
        this.data.products[o].checked = !0, this.setData({
            products: this.data.products
        });
        for (var i = -1, c = this.data.products, s = 0; s < c.length; s++) if (c[s].checked) {
            i = c[s].product_price;
            var r = c[s].id;
            break;
        }
        if (-1 == i) console.log("啥都没选"); else {
            console.log("我想购买: " + i), console.log("商品的id是: " + r);
            var d = t.getPhone(), u = t.obtain(this);
            console.log("手机号是: " + d), wx.request({
                url: t.getRequestUrl() + "Openvipwxconfig/prepayId",
                data: {
                    phone: d,
                    product_id: r,
                    token: u
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
                            console.log("支付成功！");
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
        if (0 == t.isLogin()) console.log("没有登录"), this.setData({
            isLogin: !1
        }); else {
            console.log("有登录"), this.setData({
                isLogin: !0
            }), "ios" == wx.getSystemInfoSync().platform ? this.setData({
                buyShow: "ios"
            }) : this.setData({
                buyShow: "android"
            }), t.checkToken(this);
            var e = this;
            wx.request({
                url: t.getRequestUrl() + "Product/monthCard",
                data: {},
                header: {
                    "content-type": "application/json"
                },
                success: function(t) {
                    console.log("请求的数据是" + JSON.stringify(t));
                    var o = t.data;
                    o.forEach(function(e) {
                        e.checked = !1, t.data[0].checked = !0;
                    }), e.setData({
                        products: t.data
                    }), console.log("pro" + JSON.stringify(e.data.products));
                }
            });
        }
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});