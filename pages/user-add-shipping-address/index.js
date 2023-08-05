var e = (0, require("../../@babel/runtime/helpers/interopRequireDefault").default)(require("@vant/weapp/dialog/dialog")), a = require("../../8462214255C842DFE2044945663685D7.js");

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
        var t = this, s = t.data.textAreaValue;
        if ("" == s) return a.showToast("请输入内容"), t.setData({
            consignee: "",
            receiving_phone: "",
            address: ""
        }), void t.checkInput();
        var i = s.replace(/\r|\n/gi, "");
        a.identificationAddress(i, function(e) {
            var s = e.data.data.name, i = e.data.data.mobile, n = e.data.data.detail;
            "" != s || "" != i || "" != n ? (t.setData({
                consignee: e.data.data.name,
                receiving_phone: e.data.data.mobile,
                address: e.data.data.detail
            }), t.checkInput()) : a.showToast("地址解析失败，请检查格式");
        });
    },
    upAddress: function(e, t, s, i, n) {
        a.updateShippingaddress(e, t, s, i, n, function(e) {
            1 == e.data.status ? (a.showToast("修改成功！"), setTimeout(function() {
                wx.navigateBack();
            }, 1e3)) : a.showToast("内容没变动，修改失败！");
        });
    },
    saveShippingaddress: function() {
        var e = this, t = e.data.consignee, s = e.data.receiving_phone, i = e.data.address, n = e.data.defalutAddress;
        if (/^[\d]+$/.test(s)) {
            console.log("是数字");
            for (var d = "~·`!！@#$￥%^…&*()（）—-_=+[]{}【】、|\\;:；,，：'\"“‘./<>《》?？。", r = d.length, o = 0; o < r; o++) if (-1 != i.indexOf(d.substring(o, o + 1))) return a.showToast("不能存在特殊字符"), 
            !1;
            if ("" != t) if ("" != s) if (11 == s.length) if ("" != i) if (/^[0-9]/.test(i)) a.showToast("收货地址有误"); else if ("" == n ? n = "false" : 1 == n ? n = "true" : 0 == n && (n = "false"), 
            "" !== e.data.address_id) {
                var c = e.data.address_id;
                e.upAddress(t, s, i, n, c);
            } else a.saveTheReceivingAddress(t, s, i, n, function(t) {
                1 == t.data.status ? (a.showToast("添加成功！"), setTimeout(function() {
                    e.getOpenerEventChannel().emit("someEvent", {
                        data: ""
                    }), wx.navigateBack({
                        delta: -1
                    });
                }, 1e3)) : 2 == t.data.status ? a.showToast("地址已经存在！") : a.showToast("添加失败！");
            }); else a.showToast("收货地址不能为空"); else a.showToast("电话号码长度不正确"); else a.showToast("电话号码不能为空"); else a.showToast("收货人不能为空");
        } else a.showToast("电话号码有误");
    },
    deleteAddress: function() {
        var t = this;
        e.default.confirm({
            message: "确定要删除此地址吗？"
        }).then(function() {
            var e = t.data.address_id;
            a.deleteTheReceivingAddress(e, function(e) {
                1 == e.data.status ? (a.showToast("删除成功！"), setTimeout(function() {
                    wx.navigateBack();
                }, 1e3)) : a.showToast("删除失败！");
            });
        }).catch(function() {});
    },
    onLoad: function(e) {
        var t = this, s = e.goods_id, i = e.address_id, n = e.mode;
        null != i && a.queryTheReceivingAddress(function(e) {
            if (1 == e.data.status) {
                for (var a, d, r = e.data.data, o = 0; o < r.length; o++) i == r[o].id && (d = "true" == (a = r[o]).default_address);
                t.setData({
                    consignee: a.consignee,
                    receiving_phone: a.receiving_phone,
                    address: a.address,
                    defalutAddress: d,
                    clearUserName: !0,
                    clearPhoneNumber: !0,
                    clearAddress: !0,
                    goods_id: s,
                    address_id: i,
                    mode: n
                });
            }
        });
    },
    onShow: function() {}
});