var a, t = (a = require("@vant/weapp/dialog/dialog")) && a.__esModule ? a : {
    default: a
};

require("../../76F8096255C842DF109E616502B6D685.js");

var e = require("../../76F8096255C842DF109E616502B6D685.js");

Page({
    data: {
        showLoginView: !1,
        received_data: [],
        navBarHeight: "",
        menuButtonHeight: "",
        needGoldCoin: 0,
        cashAndGoldCoinsData: "",
        total: "",
        purchase_count: 1,
        cashChoose: !1,
        payment_method_index: 0,
        addressData: null,
        categoryBox: !1,
        imgArr: [],
        select_category: "",
        goods_type: "",
        goods_data: [],
        overlayShow: !1,
        exchange_status: "",
        isvip: "",
        goods_name_frequency: "",
        monthly_card: "",
        userInputStatus: !1,
        userInputGoldCoin: 0,
        showAddress: !1
    },
    getNavHeight: function() {
        var a = wx.getSystemInfoSync().statusBarHeight, t = wx.getMenuButtonBoundingClientRect(), e = a + t.height + 2 * (t.top - a);
        this.setData({
            navBarHeight: a,
            menuButtonHeight: e - t.height - 5
        });
    },
    back: function() {
        wx.navigateBack();
    },
    openCategoryBox: function() {
        this.setData({
            categoryBox: !0
        });
    },
    onSelect: function() {
        var a = this;
        wx.navigateTo({
            url: "/pages/shipping-address/index?mode=1&address_id=".concat(a.data.addressData.id),
            events: {
                someEvent: function(t) {
                    a.setData({
                        addressData: t.data[0]
                    });
                }
            }
        });
    },
    addAddress: function() {
        var a = this;
        wx.navigateTo({
            url: "/pages/user-add-shipping-address/index",
            events: {
                someEvent: function(t) {
                    a.pullAaddressData();
                }
            }
        });
    },
    pullAaddressData: function() {
        var a = this;
        e.pullAddressData(function(t) {
            t.length <= 0 ? a.setData({
                addressData: null
            }) : a.setData({
                addressData: t[0]
            });
        });
    },
    onChoosePayMethod: function(a) {
        var t = this;
        t.setData({
            userInputGoldCoin: 0
        });
        for (var s, o = a.currentTarget.dataset.id, d = t.data.cashAndGoldCoinsData, i = 0; i < d.length; i++) d[i].checked = !1;
        if (d[o].checked = !0, 0 == o) {
            var n = d[0].cash;
            t.data.select_category[0].price = n.slice(0, n.length - 1), t.setData({
                select_category: t.data.select_category,
                needGoldCoin: 0
            });
        } else {
            var c, r;
            c = null != t.data.goods_data.commodity_classification ? t.data.select_category[0].index : "", 
            2 == o ? (r = "true", t.setData({
                userInputStatus: "true"
            })) : (r = "false", t.setData({
                userInputStatus: "false"
            })), e.calculatedAmount(t.data.goods_data.id, 1, !0, c, r, t.data.userInputGoldCoin, function(a) {
                if (1 == a.data.status) {
                    var e = t.data.select_category;
                    e[0].price = a.data.data.final_price, t.setData({
                        select_category: e,
                        needGoldCoin: a.data.data.deduct_gold_coins
                    });
                }
            });
        }
        s = 0 != o, t.setData({
            cashAndGoldCoinsData: d,
            cashChoose: s,
            purchase_count: 1,
            payment_method_index: o
        });
    },
    onUserInputGoldCoin: function(a) {
        var t, s = this;
        s.setData({
            userInputStatus: !0,
            userInputGoldCoin: a.detail.value
        }), "" == a.detail.value && (a.detail.value = 0), null != s.data.goods_data.commodity_classification && (t = s.data.select_category[0].index), 
        e.calculatedAmount(s.data.goods_data.id, 1, !0, t, s.data.userInputStatus, a.detail.value, function(a) {
            var t = s.data.select_category, o = s.data.cashAndGoldCoinsData;
            1 == a.data.status ? (o[2].actualPayment = a.data.data.final_price + "元", t[0].price = a.data.data.final_price, 
            s.setData({
                select_category: t,
                cashAndGoldCoinsData: o,
                needGoldCoin: a.data.data.deduct_gold_coins
            })) : (e.showToast(a.data.msg), o[2].actualPayment = a.data.data.original_price + "元", 
            t[0].price = a.data.data.original_price, s.setData({
                select_category: t,
                cashAndGoldCoinsData: o,
                userInputGoldCoin: 0
            }));
        });
    },
    onPurchaseLimit: function() {
        1 == this.data.purchase_count ? e.showToast("购买件数只能是>=1且小于" + this.data.select_category[0].purchase_limit_count) : e.showToast("此商品限购" + this.data.select_category[0].purchase_limit_count + "件");
    },
    onGetCount: function(a) {
        var t = this;
        if (a.detail.length > 1) {
            if (0 == a.detail.substr(0, 1)) return t.setData({
                purchase_count: 1
            }), void e.showToast("不能以0开头");
        } else if (0 == a.detail) return t.setData({
            purchase_count: 1
        }), void e.showToast("不能为0");
        t.setData({
            purchase_count: a.detail
        });
        var s = t.data.goods_data, o = t.data.select_category[0].index, d = t.data.userInputStatus, i = t.data.userInputGoldCoin;
        e.calculatedAmount(s.id, a.detail, t.data.cashChoose, o, d, i, function(a) {
            var s = t.data.select_category, o = t.data.cashAndGoldCoinsData;
            1 == a.data.status ? (s[0].price = a.data.data.final_price, 2 == t.data.payment_method_index && (o[2].actualPayment = a.data.data.final_price + "元", 
            t.setData({
                cashAndGoldCoinsData: o
            })), t.setData({
                select_category: s,
                needGoldCoin: a.data.data.deduct_gold_coins
            })) : 0 == a.data.status && (e.showToast("金币不够"), 2 == t.data.payment_method_index && (s[0].price = a.data.data.original_price, 
            o[2].actualPayment = a.data.data.original_price + "元", t.setData({
                cashAndGoldCoinsData: o,
                select_category: s,
                purchase_count: 1,
                userInputGoldCoin: 0,
                needGoldCoin: 0
            })));
        });
    },
    categorySelect: function(a) {
        if (e.isLogin()) {
            var t = this, s = a.currentTarget.dataset.id, o = this.data.goods_data;
            t.currentCategorySelect(o, s);
            var d = t.data.select_category[0].index;
            t.setData({
                userInputStatus: "false",
                userInputGoldCoin: 0
            }), e.calculatedAmount(o.id, 1, !0, d, "false", 0, function(a) {
                if (1 == a.data.status) {
                    var e = [ {
                        pay_method: "现金",
                        cash: a.data.data.original_price + "元",
                        checked: !0,
                        actualPayment: a.data.data.original_price
                    }, {
                        pay_method: "现金+金币",
                        cash: a.data.data.final_price + "元+" + a.data.data.deduct_gold_coins + "金币",
                        checked: !1,
                        actualPayment: a.data.data.final_price
                    }, {
                        pay_method: "自定义抵扣金币",
                        checked: !1,
                        actualPayment: "0元"
                    } ];
                    t.setData({
                        cashAndGoldCoinsData: e
                    });
                }
            }), t.setData({
                goods_data: o
            });
        } else this.loginTips();
    },
    setStatus: function(a, t, e) {
        var s = a.commodity_classification, o = s[t].classification_name, d = s[t].classification_img, i = s[t].price, n = s[t].purchase_limit_count, c = s[t].needGoldCoinCount;
        i = s[t].price;
        if (0 == e) {
            for (var r = 0; r < s.length; r++) s[r].checked = !1;
            s[t].checked = !0, this.setData({
                select_category: [ {
                    index: t,
                    img_url: d,
                    category_name: o,
                    price: i,
                    purchase_limit_count: n
                } ],
                goods_data: a,
                needGoldCoin: "" == c ? 0 : c
            });
        } else {
            var u = a.rotationChartImg[0];
            this.setData({
                select_category: [ {
                    index: t,
                    img_url: u,
                    category_name: "",
                    price: i,
                    purchase_limit_count: n
                } ],
                goods_data: this.data.goods_data
            });
        }
    },
    currentCategorySelect: function(a, t) {
        var e = a.commodity_classification;
        if (null != e) if (0 != e[t].stock) this.setStatus(a, t, !1); else for (var s = 0; s < e.length; s++) {
            if (0 != e[s].stock) return void this.setStatus(a, s, !1);
            this.setStatus(a, s, !1);
        }
    },
    previewImage: function() {
        for (var a, t = this.data.imgArr, e = 0; e < t.length; e++) t[e] == this.data.select_category[0].img_url && (a = e), 
        t[e] = t[e];
        wx.previewImage({
            current: t[a],
            urls: t
        });
    },
    closeCategoryBox: function() {
        this.setData({
            categoryBox: !1
        });
    },
    loginTips: function() {
        t.default.confirm({
            message: "购买商品需要先登录哦~",
            confirmButtonText: "登录",
            cancelButtonText: "取消"
        }).then(function() {
            wx.navigateTo({
                url: "/pages/user-login-onekey/login"
            });
        }).catch(function() {});
    },
    submit: function() {
        e.isLogin() ? "goldCoin" == this.data.goods_type ? this.goodsExchange() : this.buyNow() : this.loginTips();
    },
    addressInfo: function() {
        var a = this.data.addressData;
        if (null == a || 0 == a.length) return null;
        var t = a.id, e = a.consignee, s = a.phone, o = a.address;
        a = e + " " + s + " " + o;
        var d = {};
        d.address_id = t, d.consignee = e, d.consignee_phone = s, d.consignee_address = o;
        var i = {};
        return i.mailAddress = a, i.address_info = d, i;
    },
    buyNow: function() {
        wx.showLoading("订单生成中");
        var a = this, s = e.getPhone(), o = e.obtain(), d = a.addressInfo();
        if (null != d) {
            var i = d.mailAddress, n = d.address_info, c = a.data.select_category[0].index, r = a.data.userInputStatus, u = a.data.userInputGoldCoin;
            wx.request({
                url: e.getRequestUrl() + "Createorder/createOrder",
                data: {
                    phone: s,
                    token: o,
                    product_id: a.data.goods_data.id,
                    mailAddress: i,
                    address_info: n,
                    choose: a.data.cashChoose,
                    purchase_count: a.data.purchase_count,
                    select_index: c,
                    userInputStatus: r,
                    userInputGoldCoin: u
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(t) {
                    if (0 != t.data.status && 2 != t.data.status) {
                        if (1 == t.data.status) {
                            var d = t.data.data;
                            wx.request({
                                url: e.getRequestUrl() + "Goldcoincash/prepayId",
                                data: {
                                    phone: s,
                                    token: o,
                                    db_order_number: d
                                },
                                header: {
                                    "content-type": "application/json"
                                },
                                success: function(t) {
                                    e.goToPay(d, function(t) {
                                        wx.requestPayment({
                                            timeStamp: t.data.timeStamp,
                                            nonceStr: t.data.nonceStr,
                                            package: t.data.package,
                                            signType: "MD5",
                                            paySign: t.data.paySign,
                                            total_fee: .01,
                                            success: function(a) {
                                                wx.navigateTo({
                                                    url: "/pages/user-payment-succeeded/index?db_order_number=" + d,
                                                    complete: function() {
                                                        wx.hideLoading({});
                                                    }
                                                });
                                            },
                                            fail: function(t) {
                                                e.showToast("用户取消支付"), a.setData({
                                                    needGoldCoin: 0
                                                }), e.queryOrderInfo(d, function(a) {
                                                    wx.navigateTo({
                                                        url: "/pages/goods-received/index?data=".concat(JSON.stringify(a)),
                                                        complete: function() {
                                                            wx.hideLoading({});
                                                        }
                                                    });
                                                });
                                            }
                                        });
                                    });
                                }
                            });
                        }
                    } else e.showToast(t.data.msg);
                }
            });
        } else t.default.alert({
            message: "请先选择一个收货地址"
        }).then(function() {});
    },
    goodsExchange: function() {
        var a = this, s = a.data.select_category[0].category_name, o = !1;
        if ("安卓OTG供电插头" == s || "苹果OTG供电插头" == s) o = !0; else if (1 == this.data.isvip) return void e.showToast("您已经是永久VIP，无需兑换");
        wx.showModal({
            title: "",
            content: "确认兑换吗？",
            success: function(s) {
                if (s.confirm) {
                    var d = a.data.select_category[0].index, i = a.data.goods_data.id, n = a.addressInfo();
                    if (1 == o) {
                        if (null == n) return void t.default.alert({
                            message: "请先选择一个收货地址"
                        }).then(function() {});
                        var c = n.mailAddress, r = n.address_info;
                    }
                    var u = i, l = e.getPhone(), h = e.obtain();
                    wx.request({
                        url: e.getRequestUrl() + "goldcoin/commodityExchange",
                        data: {
                            phone: l,
                            token: h,
                            exchange_item: u,
                            select_category_index: d,
                            mailAddress: c,
                            address_info: r
                        },
                        header: {
                            "content-type": "application/json"
                        },
                        success: function(t) {
                            if (0 != t.data.status) if (1 == t.data.status) {
                                var s;
                                if ("10次写卡次数" == t.data.msg || "30次写卡次数" == t.data.msg || "50次写卡次数" == t.data.msg) s = {
                                    number: t.data.msg.slice(0, 3),
                                    text: t.data.msg.slice(3, 7)
                                }, a.setData({
                                    goods_name_frequency: s,
                                    monthly_card: ""
                                }); else a.setData({
                                    monthly_card: t.data.msg,
                                    goods_name_frequency: ""
                                });
                                "VIP永久" == t.data.msg && a.setData({
                                    isvip: !0
                                }), a.setData({
                                    overlayShow: !0,
                                    exchange_status: "success"
                                });
                            } else "金币余额不足" == t.data.msg ? a.setData({
                                overlayShow: !0,
                                exchange_status: "fail"
                            }) : "已经兑换过了" == t.data.msg ? e.showToast("每个账户只能兑换苹果/安卓转接头各一个") : 0 == t.data.status && e.showToast("兑换失败，请与客服联系"); else e.showToast(t.data.msg);
                        }
                    });
                } else console.log("用户点击取消");
            }
        });
    },
    calculatedAmount: function(a) {
        var t = this, s = this.data.select_category[0].index;
        e.calculatedAmount(a.id, 1, !0, s, !1, 0, function(a) {
            if (1 == a.data.status) {
                var e = [ {
                    pay_method: "现金",
                    cash: a.data.data.original_price + "元",
                    checked: !0,
                    actualPayment: a.data.data.original_price
                }, {
                    pay_method: "现金+金币",
                    cash: a.data.data.final_price + "元+" + a.data.data.deduct_gold_coins + "金币",
                    checked: !1,
                    actualPayment: a.data.data.final_price
                }, {
                    pay_method: "自定义抵扣金币",
                    checked: !1,
                    actualPayment: "0元"
                } ], s = t.data.select_category;
                s[0].price = a.data.data.original_price, t.setData({
                    cashAndGoldCoinsData: e,
                    select_category: s
                });
            }
        }), t.setData({
            goods_data: a
        });
    },
    closeOverlay: function() {
        this.setData({
            overlayShow: !1
        });
    },
    checkVip: function() {
        var a = this;
        e.remainNumber(function(t, e, s) {
            if (null == e) a.setData({
                isvip: !1
            }); else {
                var o = e.slice(0, 2);
                o >= 21 && (o = "永久VIP", a.setData({
                    isvip: !0
                }));
            }
        });
    },
    onLoad: function(a) {
        this.getNavHeight();
        var t = JSON.parse(a.data);
        this.setData({
            received_data: t
        }), this.currentCategorySelect(t, 0, !1), "goldCoin" == t.payment_method && this.setData({
            goods_type: "goldCoin"
        }), "goldCoinAndCash" == t.payment_method && this.setData({
            goods_type: "goldCoinAndCash"
        }), "cash" == t.payment_method && this.setData({
            goods_type: "cash"
        });
        for (var e = [], s = 0; s < t.commodity_classification.length; s++) e.push(t.commodity_classification[s].classification_img);
        this.setData({
            imgArr: e
        }), t.goods_name.indexOf("插头") && "48小时内发货" == t.delivery_time && this.setData({
            showAddress: !0
        });
    },
    onShow: function() {
        e.isLogin() ? (this.setData({
            payment_method_index: 0,
            cashChoose: !1
        }), this.calculatedAmount(this.data.received_data), null == this.data.addressData && this.pullAaddressData(), 
        this.checkVip(), this.setData({
            showLoginView: !0
        })) : this.setData({
            showLoginView: !1
        });
    }
});