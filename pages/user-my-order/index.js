var e = require("../../76F8096255C842DF109E616502B6D685.js");

Page({
    data: {
        history_data: [],
        showData: [],
        pageList: [ "全部", "待收货", "已取消", "已完成" ],
        pageShow: 0,
        timeIntervalSeveral: ""
    },
    onTabClick: function(e) {
        var a = e.currentTarget.dataset.id, t = this.data.history_data;
        switch (a) {
          case 0:
            this.orderHistory();
            break;

          case 1:
            this.organizeData("goodsToBeReceivedShow", 1, t);
            break;

          case 2:
            this.organizeData("order_status", 2, t);
            break;

          case 3:
            this.organizeData("order_status", 3, t);
        }
        this.setData({
            pageShow: a
        });
    },
    organizeData: function(a, t, o) {
        for (var i = [], s = 0; s < o.length; s++) if (1 == t) 1 == o[s][a] && i.push(o[s]); else if (2 == t) "cancel" != o[s][a] && "manualCancellation" != o[s][a] || i.push(o[s]); else if (3 == t) "success" != o[s][a] && "true" != o[s][a] || i.push(o[s]); else if (0 == t) return void this.setData({
            showData: o,
            history_data: o
        });
        i.length <= 0 && e.showToast("暂无数据"), this.setData({
            showData: i,
            history_data: o
        });
    },
    timeFormat: function(e) {
        return e < 10 ? "0" + e : e;
    },
    severalCountDown: function() {
        for (var e = this, a = 0, t = {}, o = e.data.showData, i = [], s = 0; s < o.length; s++) "已超时，系统自动取消订单" != o[s].timeRemaining && i.push(o[s]);
        i.forEach(function(o) {
            var i = new Date(o.timeRemaining.replace(/-/g, "/")).getTime(), s = new Date().getTime();
            if ((a = (i - s) / 1e3) > 0) {
                var n = parseInt(a / 3600), r = parseInt(a % 86400 % 3600 / 60), d = parseInt(a % 86400 % 3600 % 60);
                t = {
                    hou: e.timeFormat(n),
                    min: e.timeFormat(r),
                    sec: e.timeFormat(d)
                };
            } else t = {
                hou: "00",
                min: "00",
                sec: "00"
            }, clearTimeout(e.data.timeIntervalSeveral);
            o.time = [ t ];
        });
        var n = setTimeout(e.severalCountDown, 1e3);
        e.setData({
            timeIntervalSeveral: n,
            showData: o
        });
    },
    orderHistory: function() {
        var a = this;
        e.queryHistory(function(e) {
            for (var t = e.data, o = [], i = 0; i < t.length; i++) {
                var s, n, r, d, c, u, h, l, m = JSON.parse(t[i].goods_info), g = t[i].goods_need_gold_coins, _ = t[i].deduct_gold_coins, f = t[i].price_after_discount, p = t[i].order_status, w = t[i].order_payment_status;
                "true" == p || "cancel" == p || "true" == w || "false" == p || "manualCancellation" == p ? h = !0 : "success" == p && (h = !1), 
                u = "false" == p && "true" == w, s = null != g || 0 != _, n = null != f, r = null != t[i].express_information && "false" == p && "true" == w, 
                d = null == g && "false" == p && "false" == w, c = null == g && "false" == p && "false" == w, 
                l = 0 == t[i].timeRemaining ? "已超时，系统自动取消订单" : t[i].timeRemaining;
                var v = {
                    id: t[i].id,
                    goods_id: m.goods_id,
                    select_index: m.select_index,
                    goods_name: m.goods_name,
                    classification_name: m.classification_name,
                    classification_img: m.classification_img,
                    purchase_count: m.purchase_count,
                    goods_need_gold_coins: g,
                    order_create_time: t[i].order_create_time,
                    deduct_gold_coins: _,
                    price_after_discount: f,
                    goodsToBeReceivedShow: u,
                    goldCoinShow: s,
                    moneyShow: n,
                    orderStatusShow: h,
                    orderRemainingTimeShow: c,
                    goToPayShow: d,
                    confirmReceiptShow: r,
                    payment_amount: t[i].payment_amount,
                    order_payment_status: w,
                    order_status: p,
                    time: "",
                    timeRemaining: l,
                    receiving_time: t[i].receiving_time,
                    express_information: JSON.parse(t[i].express_information),
                    address_info: JSON.parse(t[i].address_info),
                    item_order_number: t[i].item_order_number
                };
                o.push(v);
            }
            switch (a.data.pageShow) {
              case 0:
                a.organizeData("", 0, o);
                break;

              case 1:
                a.organizeData("goodsToBeReceivedShow", 1, o);
                break;

              case 2:
                a.organizeData("order_status", 2, o);
                break;

              case 3:
                a.organizeData("order_status", 3, o);
            }
        });
    },
    onGoodsClick: function(e) {
        var a = e.currentTarget.dataset.id, t = this.data.showData[a];
        this.setData({
            history_data: [],
            showData: []
        }), wx.navigateTo({
            url: "/pages/goods-received/index?data=" + JSON.stringify(t)
        });
    },
    confirmReceipt: function(a) {
        var t = this;
        wx.showModal({
            title: "",
            content: "是否确认收货？",
            success: function(o) {
                if (o.confirm) {
                    var i = a.currentTarget.dataset.id, s = t.data.showData[i].id;
                    e.confirmReceipt(s, function(a) {
                        1 == a.data.status ? (e.showToast(a.data.msg), t.orderHistory()) : e.showToast(a.data);
                    });
                } else console.log("用户点击取消");
            }
        });
    },
    goToPay: function(a) {
        var t = this;
        wx.showLoading();
        var o = a.currentTarget.dataset.id, i = (n = this.data.history_data[o]).item_order_number, s = e.getRequestUrl() + "Goldcoincash/prepayId", n = {
            phone: e.getPhone(),
            token: e.obtain(),
            db_order_number: i
        };
        e.requestFn(s, "post", n, function(a) {
            0 != a.data.status ? wx.requestPayment({
                timeStamp: a.data.timeStamp,
                nonceStr: a.data.nonceStr,
                package: a.data.package,
                signType: "MD5",
                paySign: a.data.paySign,
                total_fee: .01,
                success: function(a) {
                    wx.hideLoading({}), e.showToast("支付成功！"), t.setData({
                        confirmOrderShow: !1
                    });
                },
                fail: function(e) {
                    wx.hideLoading({}), console.log(e);
                }
            }) : e.showToast(a.data.msg);
        });
    },
    onLoad: function(e) {
        var a = this;
        a.orderHistory(), setTimeout(function() {
            a.severalCountDown();
        }, 2e3);
    },
    onShow: function() {
        this.data.history_data.length <= 0 && this.orderHistory();
    },
    onUnload: function() {
        clearTimeout(this.data.timeIntervalSeveral);
    }
});