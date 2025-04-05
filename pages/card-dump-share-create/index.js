var a = require("../../76F8096255C842DF109E616502B6D685.js");

Page({
    data: {
        acceptData: "",
        radio: "1",
        nameEditor: {
            showNameEditor: !1,
            defaultName: ""
        },
        access_code: "",
        closing_date: "",
        show: !1,
        time_later: "",
        date_value: 3,
        custom_height: "",
        access_code_required: !0,
        userName: ""
    },
    onChangeSwitch: function(a) {
        this.setData({
            access_code_required: a.detail
        });
    },
    onChange: function(a) {
        this.setData({
            radio: a.detail
        }), 2 == a.detail || this.setData({
            access_code: "",
            access_code_required: !1
        });
    },
    onPrivateKeyInput: function(a) {
        this.setData({
            access_code: a.detail.value
        });
    },
    afterDate: function(a) {
        var t = new Date().getTime() + 3600 * a * 24 * 1e3, e = new Date(t);
        return "".concat(e.getFullYear(), "-").concat(e.getMonth() + 1, "-").concat(e.getDate());
    },
    onGetDate: function(a) {
        this.setData({
            date_value: a.detail
        });
    },
    onSubmitShare: function() {
        wx.showLoading({
            title: "加载中"
        });
        var t = this, e = t.data.acceptData, c = t.data.access_code, s = t.data.closing_date, n = t.data.card_name;
        if (2 == t.data.radio && c.length <= 0) a.showToast("请输入访问码"); else {
            if ("" == c) ; else if (!/[a-zA-z0-9]{4}/.test(c)) return void a.showToast("数据必须是a-z和0-9组成且等于4位");
            s = t.afterDate(t.data.date_value), console.log("user_name " + JSON.stringify(t.data.userName)), 
            a.submitShareData(n, e, c, s, function(a) {
                if (1 == a.data.status) {
                    var e = a.data.msg[0], c = t.data.access_code, s = t.data.access_code_required, o = t.data.date_value, i = t.data.userName;
                    wx.hideLoading(), wx.redirectTo({
                        url: "/pages/card-dump-share-success/index?dumpName=".concat(n, "&userName=").concat(i, "&shareCode=").concat(e, "&accessCode=").concat(c, "&expireDay=").concat(o, "&appendAC=").concat(s)
                    });
                }
            });
        }
    },
    navigationBar: function() {
        var a = this, t = wx.getMenuButtonBoundingClientRect();
        wx.getSystemInfo({
            success: function(e) {
                var c = e.statusBarHeight, s = c + t.height + 2 * (t.top - c);
                a.setData({
                    custom_height: s
                });
            }
        });
    },
    onLoad: function(a) {
        var t = a.name, e = JSON.parse(decodeURIComponent(a.data));
        e = {
            tag_data: e.tag_data,
            tag_info: e.tag_info,
            tag_date: e.tag_date
        }, this.setData({
            card_name: t,
            acceptData: e
        });
    },
    onShow: function() {
        var t = this;
        this.navigationBar(), a.get_nickname(function(a) {
            t.setData({
                userName: a.data.data
            });
        });
    }
});