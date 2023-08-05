var e = require("../../8462214255C842DFE2044945663685D7.js"), o = "";

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
        var o, t = this, n = e.systemInfo.mpenv;
        "SAAASDK" == n && (o = 1, wx.getPhoneMask({
            success: function(e) {
                console.log("本机号码的掩码获取成功了。"), t.setData({
                    thisPhoneOneKeyLoginMask: e.phoneMask
                });
            },
            fail: function(e) {
                console.error(e);
            }
        })), "WeChat" == n && (o = 0), this.setData({
            loginMethod: o
        });
    },
    judgeSystemType: function() {
        var o = e.judgeSystemType();
        this.setData({
            platform: o
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
        var o = !0;
        e.detail.value.length <= 0 && (this.showPermissionWarn(), o = !1), this.setData({
            canLogin: o
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
    onPhoneOneClickLogin: function(t) {
        console.log(t);
        var n = t.detail.code;
        wx.request({
            url: e.getRequestUrl() + "Login/loginByMyNumberOneClickLogin",
            method: "GET",
            data: {
                requestPhoneNumberCode: n,
                system_type: that.data.platform
            },
            success: function(t) {
                o = t.data.msg;
                var n = t.data.data;
                wx.setStorage({
                    key: "phoneObj",
                    data: o,
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
                        console.log("2222sdljsdlj" + JSON.stringify(e)), 1 == e.data && console.log("生成默认名称成功！");
                    });
                }, 1e3);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    getPhoneNumber: function(t) {
        "getPhoneNumber:ok" === t.detail.errMsg ? wx.request({
            url: e.getRequestUrl() + "Login/loginByWeChatOneClickLogin",
            data: {
                code: t.detail.code
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                if (1 == t.data.status) {
                    wx.showToast({
                        title: t.data.msg,
                        icon: "success",
                        duration: 1e3
                    }), e.getOpenId(t.data.data.phone), o = t.data.data.phone;
                    var n = t.data.data.token;
                    wx.setStorage({
                        key: "phoneObj",
                        data: o,
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