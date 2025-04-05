var e = require("../../76F8096255C842DF109E616502B6D685.js"), t = "";

Page({
    data: {
        canLogin: !1,
        loginMethod: -1,
        thisPhoneOneKeyLoginMask: "",
        platform: ""
    },
    onLoad: function() {
        this.judgeSystemType();
    },
    onShow: function() {
        var t, o = this, n = e.systemInfo.mpenv;
        "SAAASDK" == n && (t = 1, wx.getPhoneMask({
            success: function(e) {
                console.log("本机号码的掩码获取成功了。"), o.setData({
                    thisPhoneOneKeyLoginMask: e.phoneMask
                });
            },
            fail: function(e) {
                console.error(e);
            }
        })), "WeChat" == n && (t = 0), this.setData({
            loginMethod: t
        });
    },
    judgeSystemType: function() {
        var t = e.judgeSystemType();
        this.setData({
            platform: t
        });
    },
    onUserClickReadPrivacyPolicy: function() {
        wx.navigateTo({
            url: "/pages/user-agreement/agreement"
        });
    },
    showPermissionWarn: function() {
        wx.showToast({
            title: "请先同意《法律声明及隐私政策》",
            icon: "none",
            duration: 2e3
        });
    },
    onCheckChange: function(e) {
        var t = !0;
        e.detail.value.length <= 0 && (this.showPermissionWarn(), t = !1), this.setData({
            canLogin: t
        });
    },
    checkPermission: function() {
        this.data.canLogin || this.showPermissionWarn();
    },
    onOtherPhoneLogin: function(e) {
        wx.navigateTo({
            url: "/pages/user-login-verification-code/index",
            events: {
                closeMainLoginPage: function() {
                    return wx.navigateBack();
                }
            }
        });
    },
    onPhoneOneClickLogin: function(o) {
        var n = o.detail.code, a = e.getRequestUrl() + "Login/loginByMyNumberOneClickLogin", s = {
            requestPhoneNumberCode: n,
            system_type: that.data.platform
        };
        e.requestFn(a, "GET", s, function(o) {
            t = o.data.msg;
            var n = o.data.data;
            wx.setStorage({
                key: "phoneObj",
                data: t,
                success: function(e) {
                    console.log("数据缓存成功");
                }
            }), wx.setStorage({
                key: "token",
                data: n,
                success: function(e) {
                    console.log("数据缓存成功");
                }
            }), wx.removeStorageSync("image_cache"), setTimeout(function() {
                wx.navigateBack(), e.creatDefaultUserName(function(e) {
                    1 == e.data && console.log("生成默认名称成功！");
                });
            }, 1e3);
        });
    },
    getPhoneNumber: function(o) {
        "getPhoneNumber:ok" === o.detail.errMsg ? wx.request({
            url: e.getRequestUrl() + "Login/loginByWeChatOneClickLogin",
            data: {
                code: o.detail.code
            },
            header: {
                "content-type": "application/json"
            },
            success: function(o) {
                if (1 == o.data.status) {
                    wx.showToast({
                        title: o.data.msg,
                        icon: "success",
                        duration: 1e3
                    }), e.getOpenId(o.data.data.phone), t = o.data.data.phone;
                    var n = o.data.data.token;
                    wx.setStorage({
                        key: "phoneObj",
                        data: t,
                        success: function(e) {
                            console.log("数据缓存成功");
                        }
                    }), wx.setStorage({
                        key: "token",
                        data: n,
                        success: function(e) {
                            console.log("数据缓存成功");
                        }
                    }), wx.removeStorageSync("image_cache"), setTimeout(function() {
                        wx.navigateBack(), e.creatDefaultUserName(function(e) {
                            1 == e.data && console.log("生成默认名称成功！");
                        });
                    }, 1e3);
                } else e.showToast("登录失败，请重新登录！");
            },
            fail: function(e) {
                console.log("请求失败: " + JSON.stringify(e)), wx.showToast({
                    title: "获取openid失败",
                    icon: "none",
                    duration: 2e3
                });
            }
        }) : (console.log("用户拒绝"), wx.showModal({
            title: "提示",
            content: "你已拒绝授权，请重新点击并授权",
            showCancel: !1,
            confirmText: "知道了"
        }));
    }
});