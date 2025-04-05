var e, a = (e = require("@vant/weapp/dialog/dialog")) && e.__esModule ? e : {
    default: e
};

var t = require("../../76F8096255C842DF109E616502B6D685.js");

Page({
    data: {
        consignee: "",
        receiving_phone: "",
        address: "",
        textAreaValue: "",
        defalutAddress: "",
        canSave: !1,
        isIPhoneXSeries: !1,
        clearUserName: !1,
        clearPhoneNumber: !1,
        clearAddress: !1,
        clearIntelligentFilling: !1,
        goods_id: "",
        address_id: "",
        mode: ""
    },
    clearUserName: function() {
        this.setData({
            consignee: "",
            clearUserName: !1
        }), this.checkInput();
    },
    clearPhoneNumber: function() {
        this.setData({
            receiving_phone: "",
            clearPhoneNumber: !1
        }), this.checkInput();
    },
    clearAddress: function() {
        this.setData({
            address: "",
            clearAddress: !1
        }), this.checkInput();
    },
    clearIntelligentFilling: function() {
        this.setData({
            textAreaValue: "",
            clearIntelligentFilling: !1
        });
    },
    turnOnDefaultAddress: function(e) {
        var a = e.detail;
        this.setData({
            defalutAddress: a
        }), this.checkInput();
    },
    checkInput: function() {
        this.data.consignee.length <= 0 || this.data.receiving_phone.length <= 0 || this.data.address.length <= 0 ? this.setData({
            canSave: !1
        }) : this.setData({
            canSave: !0
        });
    },
    bindTextAreaBlur: function(e) {
        "" !== this.data.address_id && this.setData({
            clearIntelligentFilling: !0
        }), this.setData({
            textAreaValue: e.detail.value
        }), this.checkInput();
    },
    userNameInput: function(e) {
        "" !== this.data.address_id && this.setData({
            clearUserName: !0
        }), this.setData({
            consignee: e.detail.value
        }), this.checkInput();
    },
    userPhone: function(e) {
        "" !== this.data.address_id && this.setData({
            clearPhoneNumber: !0
        }), this.setData({
            receiving_phone: e.detail.value
        }), this.checkInput();
    },
    userAddressInput: function(e) {
        "" !== this.data.address_id && this.setData({
            clearAddress: !0
        }), this.setData({
            address: e.detail.value
        }), this.checkInput();
    },
    distinguish: function(e) {
        var a = this, s = a.data.textAreaValue;
        if ("" == s) return t.showToast("请输入内容"), a.setData({
            consignee: "",
            receiving_phone: "",
            address: ""
        }), void a.checkInput();
        var i = s.replace(/\r|\n/gi, "");
        t.identificationAddress(i, function(e) {
            var s = e.data.data.name, i = e.data.data.mobile, d = e.data.data.detail;
            "" != s || "" != i || "" != d ? (a.setData({
                consignee: e.data.data.name,
                receiving_phone: e.data.data.mobile,
                address: e.data.data.detail
            }), a.checkInput()) : t.showToast("地址解析失败，请检查格式");
        });
    },
    upAddress: function(e, a, s, i, d) {
        t.updateShippingaddress(e, a, s, i, d, function(e) {
            1 == e.data.status ? (t.showToast("修改成功！"), setTimeout(function() {
                wx.navigateBack();
            }, 1e3)) : t.showToast("内容没变动，修改失败！");
        });
    },
    saveShippingaddress: function() {
        var e = this, a = e.data.consignee, s = e.data.receiving_phone, i = e.data.address, d = e.data.defalutAddress;
        if (/^[\d]+$/.test(s)) {
            console.log("是数字");
            for (var n = "~·`!！@#$￥%^…&*()（）—-_=+[]{}【】、|\\;:；,，：'\"“‘./<>《》?？。", r = n.length, o = 0; o < r; o++) if (-1 != i.indexOf(n.substring(o, o + 1))) return t.showToast("不能存在特殊字符"), 
            !1;
            if ("" != a) if ("" != s) if (11 == s.length) if ("" != i) if (/^[0-9]/.test(i)) t.showToast("收货地址有误"); else if ("" == d ? d = "false" : 1 == d ? d = "true" : 0 == d && (d = "false"), 
            "" !== e.data.address_id) {
                var c = e.data.address_id;
                e.upAddress(a, s, i, d, c);
            } else t.saveTheReceivingAddress(a, s, i, d, function(a) {
                1 == a.data.status ? (t.showToast("添加成功！"), setTimeout(function() {
                    e.getOpenerEventChannel().emit("someEvent", {
                        data: ""
                    }), wx.navigateBack({
                        delta: -1
                    });
                }, 1e3)) : 2 == a.data.status ? t.showToast("地址已经存在！") : t.showToast("添加失败！");
            }); else t.showToast("收货地址不能为空"); else t.showToast("电话号码长度不正确"); else t.showToast("电话号码不能为空"); else t.showToast("收货人不能为空");
        } else t.showToast("电话号码有误");
    },
    deleteAddress: function() {
        var e = this;
        a.default.confirm({
            message: "确定要删除此地址吗？"
        }).then(function() {
            var a = e.data.address_id;
            t.deleteTheReceivingAddress(a, function(e) {
                1 == e.data.status ? (t.showToast("删除成功！"), setTimeout(function() {
                    wx.navigateBack();
                }, 1e3)) : t.showToast("删除失败！");
            });
        }).catch(function() {});
    },
    onLoad: function(e) {
        var a = this, s = e.goods_id, i = e.address_id, d = e.mode;
        null != i && t.queryTheReceivingAddress(function(e) {
            if (1 == e.data.status) {
                for (var t, n, r = e.data.data, o = 0; o < r.length; o++) i == r[o].id && (n = "true" == (t = r[o]).default_address);
                a.setData({
                    consignee: t.consignee,
                    receiving_phone: t.receiving_phone,
                    address: t.address,
                    defalutAddress: n,
                    clearUserName: !0,
                    clearPhoneNumber: !0,
                    clearAddress: !0,
                    goods_id: s,
                    address_id: i,
                    mode: d
                });
            }
        });
    },
    onShow: function() {}
});