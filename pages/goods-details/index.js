var a = (0, require("../../@babel/runtime/helpers/interopRequireDefault").default)(require("@vant/weapp/dialog/dialog")), t = (require("../../8462214255C842DFE2044945663685D7.js"), 
require("../../8462214255C842DFE2044945663685D7.js"));

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
        t.pullAddressData(function(t) {
            t.length <= 0 ? a.setData({
                addressData: null
            }) : a.setData({
                addressData: t[0]
            });
        });
    },
    onChoosePayMethod: function(a) {
        var e = this;
        e.setData({
            userInputGoldCoin: 0
        });
        for (var s, o = a.currentTarget.dataset.id, i = e.data.cashAndGoldCoinsData, d = 0; d < i.length; d++) i[d].checked = !1;
        if (i[o].checked = !0, 0 == o) {
            var n = i[0].cash;
            e.data.select_category[0].price = n.slice(0, n.length - 1), e.setData({
                select_category: e.data.select_category,
                needGoldCoin: 0
            });
        } else {
            var c, r;
            c = null != e.data.goods_data.commodity_classification ? e.data.select_category[0].index : "", 
            2 == o ? (r = "true", e.setData({
                userInputStatus: "true"
            })) : (r = "false", e.setData({
                userInputStatus: "false"
            })), t.calculatedAmount(e.data.goods_data.id, 1, !0, c, r, e.data.userInputGoldCoin, function(a) {
                if (1 == a.data.status) {
                    var t = e.data.select_category;
                    t[0].price = a.data.data.final_price, e.setData({
                        select_category: t,
                        needGoldCoin: a.data.data.deduct_gold_coins
                    });
                }
            });
        }
        s = 0 != o, e.setData({
            cashAndGoldCoinsData: i,
            cashChoose: s,
            purchase_count: 1,
            payment_method_index: o
        });
    },
    onUserInputGoldCoin: function(a) {
        var e, s = this;
        s.setData({
            userInputStatus: !0,
            userInputGoldCoin: a.detail.value
        }), "" == a.detail.value && (a.detail.value = 0), null != s.data.goods_data.commodity_classification && (e = s.data.select_category[0].index), 
        t.calculatedAmount(s.data.goods_data.id, 1, !0, e, s.data.userInputStatus, a.detail.value, function(a) {
            var e = s.data.select_category, o = s.data.cashAndGoldCoinsData;
            1 == a.data.status ? (o[2].actualPayment = a.data.data.final_price + "元", e[0].price = a.data.data.final_price, 
            s.setData({
                select_category: e,
                cashAndGoldCoinsData: o,
                needGoldCoin: a.data.data.deduct_gold_coins
            })) : (t.showToast(a.data.msg), o[2].actualPayment = a.data.data.original_price + "元", 
            e[0].price = a.data.data.original_price, s.setData({
                select_category: e,
                cashAndGoldCoinsData: o,
                userInputGoldCoin: 0
            }));
        });
    },
    onPurchaseLimit: function() {
        1 == this.data.purchase_count ? t.showToast("购买件数只能是>=1且小于" + this.data.select_category[0].purchase_limit_count) : t.showToast("此商品限购" + this.data.select_category[0].purchase_limit_count + "件");
    },
    onGetCount: function(a) {
        var e = this;
        if (a.detail.length > 1) {
            if (0 == a.detail.substr(0, 1)) return e.setData({
                purchase_count: 1
            }), void t.showToast("不能以0开头");
        } else if (0 == a.detail) return e.setData({
            purchase_count: 1
        }), void t.showToast("不能为0");
        e.setData({
            purchase_count: a.detail
        });
        var s = e.data.goods_data, o = e.data.select_category[0].index, i = e.data.userInputStatus, d = e.data.userInputGoldCoin;
        t.calculatedAmount(s.id, a.detail, e.data.cashChoose, o, i, d, function(a) {
            var s = e.data.select_category, o = e.data.cashAndGoldCoinsData;
            1 == a.data.status ? (s[0].price = a.data.data.final_price, 2 == e.data.payment_method_index && (o[2].actualPayment = a.data.data.final_price + "元", 
            e.setData({
                cashAndGoldCoinsData: o
            })), e.setData({
                select_category: s,
                needGoldCoin: a.data.data.deduct_gold_coins
            })) : 0 == a.data.status && (t.showToast("金币不够"), 2 == e.data.payment_method_index && (s[0].price = a.data.data.original_price, 
            o[2].actualPayment = a.data.data.original_price + "元", e.setData({
                cashAndGoldCoinsData: o,
                select_category: s,
                purchase_count: 1,
                userInputGoldCoin: 0,
                needGoldCoin: 0
            })));
        });
    },
    categorySelect: function(a) {
        if (t.isLogin()) {
            var e = this, s = a.currentTarget.dataset.id, o = this.data.goods_data;
            e.currentCategorySelect(o, s);
            var i = e.data.select_category[0].index;
            e.setData({
                userInputStatus: "false",
                userInputGoldCoin: 0
            }), t.calculatedAmount(o.id, 1, !0, i, "false", 0, function(a) {
                if (1 == a.data.status) {
                    var t = [ {
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
                    e.setData({
                        cashAndGoldCoinsData: t
                    });
                }
            }), e.setData({
                goods_data: o
            });
        } else this.loginTips();
    },
    setStatus: function(a, t, e) {
        var s = a.commodity_classification, o = s[t].classification_name, i = s[t].classification_img, d = s[t].price, n = s[t].purchase_limit_count, c = s[t].needGoldCoinCount;
        d = s[t].price;
        if (0 == e) {
            for (var r = 0; r < s.length; r++) s[r].checked = !1;
            s[t].checked = !0, this.setData({
                select_category: [ {
                    index: t,
                    img_url: i,
                    category_name: o,
                    price: d,
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
                    price: d,
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
        a.default.confirm({
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
        t.isLogin() ? "goldCoin" == this.data.goods_type ? this.goodsExchange() : this.buyNow() : this.loginTips();
    },
    addressInfo: function() {
        var a = this.data.addressData;
        if (null == a || 0 == a.length) return null;
        var t = a.id, e = a.consignee, s = a.phone, o = a.address;
        a = e + " " + s + " " + o;
        var i = {};
        i.address_id = t, i.consignee = e, i.consignee_phone = s, i.consignee_address = o;
        var d = {};
        return d.mailAddress = a, d.address_info = i, d;
    },
    buyNow: function() {
        wx.showLoading("订单生成中");
        var e = this, s = t.getPhone(), o = t.obtain(), i = e.addressInfo();
        if (null != i) {
            var d = i.mailAddress, n = i.address_info, c = e.data.select_category[0].index, r = e.data.userInputStatus, u = e.data.userInputGoldCoin;
            wx.request({
                url: t.getRequestUrl() + "Createorder/createOrder",
                data: {
                    phone: s,
                    token: o,
                    product_id: e.data.goods_data.id,
                    mailAddress: d,
                    address_info: n,
                    choose: e.data.cashChoose,
                    purchase_count: e.data.purchase_count,
                    select_index: c,
                    userInputStatus: r,
                    userInputGoldCoin: u
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(a) {
                    if (0 != a.data.status && 2 != a.data.status) {
                        if (1 == a.data.status) {
                            var i = a.data.data;
                            wx.request({
                                url: t.getRequestUrl() + "Goldcoincash/prepayId",
                                data: {
                                    phone: s,
                                    token: o,
                                    db_order_number: i
                                },
                                header: {
                                    "content-type": "application/json"
                                },
                                success: function(a) {
                                    t.goToPay(i, function(a) {
                                        wx.requestPayment({
                                            timeStamp: a.data.timeStamp,
                                            nonceStr: a.data.nonceStr,
                                            package: a.data.package,
                                            signType: "MD5",
                                            paySign: a.data.paySign,
                                            total_fee: .01,
                                            success: function(a) {
                                                wx.navigateTo({
                                                    url: "/pages/user-payment-succeeded/index?db_order_number=" + i,
                                                    complete: function() {
                                                        wx.hideLoading({});
                                                    }
                                                });
                                            },
                                            fail: function(a) {
                                                t.showToast("用户取消支付"), e.setData({
                                                    needGoldCoin: 0
                                                }), t.queryOrderInfo(i, function(a) {
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
                    } else t.showToast(a.data.msg);
                }
            });
        } else a.default.alert({
            message: "请先选择一个收货地址"
        }).then(function() {});
    },
    goodsExchange: function() {
        var e = this, s = e.data.select_category[0].category_name, o = !1;
        if ("安卓OTG供电插头" == s || "苹果OTG供电插头" == s) o = !0; else if (1 == this.data.isvip) return void t.showToast("您已经是永久VIP，无需兑换");
        wx.showModal({
            title: "",
            content: "确认兑换吗？",
            success: function(s) {
                if (s.confirm) {
                    var i = e.data.select_category[0].index, d = e.data.goods_data.id, n = e.addressInfo();
                    if (1 == o) {
                        if (null == n) return void a.default.alert({
                            message: "请先选择一个收货地址"
                        }).then(function() {});
                        var c = n.mailAddress, r = n.address_info;
                    }
                    var u = d, l = t.getPhone(), h = t.obtain();
                    wx.request({
                        url: t.getRequestUrl() + "goldcoin/commodityExchange",
                        data: {
                            phone: l,
                            token: h,
                            exchange_item: u,
                            select_category_index: i,
                            mailAddress: c,
                            address_info: r
                        },
                        header: {
                            "content-type": "application/json"
                        },
                        success: function(a) {
                            if (0 != a.data.status) if (1 == a.data.status) {
                                var s;
                                if ("10次写卡次数" == a.data.msg || "30次写卡次数" == a.data.msg || "50次写卡次数" == a.data.msg) s = {
                                    number: a.data.msg.slice(0, 3),
                                    text: a.data.msg.slice(3, 7)
                                }, e.setData({
                                    goods_name_frequency: s,
                                    monthly_card: ""
                                }); else e.setData({
                                    monthly_card: a.data.msg,
                                    goods_name_frequency: ""
                                });
                                "VIP永久" == a.data.msg && e.setData({
                                    isvip: !0
                                }), e.setData({
                                    overlayShow: !0,
                                    exchange_status: "success"
                                });
                            } else "金币余额不足" == a.data.msg ? e.setData({
                                overlayShow: !0,
                                exchange_status: "fail"
                            }) : "已经兑换过了" == a.data.msg ? t.showToast("每个账户只能兑换苹果/安卓转接头各一个") : 0 == a.data.status && t.showToast("兑换失败，请与客服联系"); else t.showToast(a.data.msg);
                        }
                    });
                } else console.log("用户点击取消");
            }
        });
    },
    calculatedAmount: function(a) {
        var e = this, s = this.data.select_category[0].index;
        t.calculatedAmount(a.id, 1, !0, s, !1, 0, function(a) {
            if (1 == a.data.status) {
                var t = [ {
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
                } ], s = e.data.select_category;
                s[0].price = a.data.data.original_price, e.setData({
                    cashAndGoldCoinsData: t,
                    select_category: s
                });
            }
        }), e.setData({
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
        t.remainNumber(function(t, e, s) {
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
        t.isLogin() ? (this.setData({
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