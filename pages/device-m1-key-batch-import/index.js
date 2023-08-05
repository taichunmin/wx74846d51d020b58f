var t = require("../../@babel/runtime/helpers/defineProperty"), a = require("../../@babel/runtime/helpers/typeof"), e = require("../../9434A3B355C842DFF252CBB492D585D7.js"), s = require("../../6B5F0E3755C842DF0D39663027C585D7.js"), i = require("../../8462214255C842DFE2044945663685D7.js");

Page({
    data: {
        text_value: "",
        view_data: "",
        cache_data: "",
        save_data: "",
        placeholder: "请输入需要导入的密码",
        height: "",
        canSubmit: "",
        mode: "",
        cacheKey: ""
    },
    calculationHeight: function() {
        var t = this, a = wx.createSelectorQuery();
        a.select("#left-icon-block").boundingClientRect(), a.exec(function(a) {
            t.setData({
                height: a[0].height + "px"
            });
        });
    },
    addData: function(e) {
        console.log("这里的数据类型是 " + a(e)), console.log("数据是 " + JSON.stringify(e));
        for (var s = e.split("\n"), i = [], o = [], n = 0; n < s.length; n++) {
            if (s[n].trim(), s[n].startsWith("#")) {
                console.log("有特殊字符");
                var c = s[n].slice(1);
                console.log("之前的数据是" + JSON.stringify(s[n])), /^[a-fA-F0-9]{12}$/.test(c) ? (s[n].startsWith("#") ? (console.log("有#号不保存"), 
                o.push({
                    status: "",
                    data: s[n]
                }), console.log("是否有空格" + s[n].length)) : (i.push(c), o.push({
                    status: !0,
                    data: s[n]
                })), this.setData({
                    canLogin: !0,
                    save_data: i,
                    view_data: o
                })) : (o.push({
                    status: !1,
                    data: s[n]
                }), this.setData(t({
                    view_data: o,
                    canLogin: !1
                }, "view_data", o)));
            } else /^[a-fA-F0-9]{12}$/.test(s[n]) ? (i.push(s[n]), o.push({
                status: !0,
                data: s[n]
            }), this.setData({
                canLogin: !0,
                save_data: i,
                view_data: o
            })) : (0 == s[n].length ? o.push({
                status: "",
                data: s[n]
            }) : o.push({
                status: !1,
                data: s[n]
            }), this.setData({
                view_data: o,
                canLogin: !1
            }));
            console.log("要显示在页面上的是" + JSON.stringify(this.data.view_data));
        }
        this.calculationHeight();
    },
    userAddressInput: function(t) {
        console.log("111" + JSON.stringify(t.detail.value)), "" != t.detail.value ? (this.setData({
            placeholder: ""
        }), this.addData(t.detail.value)) : this.setData({
            view_data: "",
            placeholder: "请输入需要导入的密码",
            save_data: ""
        });
    },
    back: function() {
        wx.showToast({
            title: "密码导入成功",
            icon: "success",
            duration: 1e3
        }), setTimeout(function() {
            wx.navigateBack();
        }, 1e3);
    },
    isMf1PasswordFormat: function(t) {
        return /[A-Fa-f0-9]{12}/.test(t);
    },
    importPassword: function() {
        var t = this.data.save_data;
        console.log("需要保存的数据是" + JSON.stringify(t));
        for (var a = [], s = 0; s < t.length; s++) this.isMf1PasswordFormat(t[s]) ? (t[s] = t[s].toUpperCase(), 
        -1 == a.indexOf(t[s]) && a.push(t[s])) : i.showToast("输入秘钥错误（12个HEX字符）");
        if (1 == this.data.mode) {
            e.setUserCustomTagKey(a), "cloud" == i.keyStoryPosition() && i.updateCloudKey("edit", null, "userKey"), 
            this.back();
        } else {
            if (wx.setStorageSync(this.data.cacheKey, a), "cloud" == i.keyStoryPosition()) {
                var o = this.data.cacheKey.slice(5);
                i.updateCloudKey("edit", o, "RCCHKey");
            }
            this.back();
        }
    },
    onShow: function() {},
    onLoad: function(t) {
        var a = t.key;
        if (1 == this.data.mode) var i = e.getUserCustomTagKey(); else {
            i = s.getStorageSyncHasDefault(a, []);
            for (var o = 0; o < i.length; o++) i[o] = i[o].toUpperCase();
        }
        var n = i.join("\n");
        this.setData({
            mode: t.mode,
            cacheKey: a,
            text_value: n
        }), this.addData(n);
    }
});