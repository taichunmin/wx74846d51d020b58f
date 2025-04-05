var t = require("../../76F8096255C842DF109E616502B6D685.js");

Page({
    data: {
        imgCodeIcon: "",
        input_phone: "",
        input_graphic_verification_code: "",
        input_mobile_verification_code: "",
        uuid: "",
        remainText: "获取验证码",
        disabled: !1,
        currentTime: 60,
        platform: "",
        navHeight: "",
        loginStatus: !1
    },
    checkInput: function() {
        this.data.input_phone.length <= 0 || this.data.input_graphic_verification_code.length <= 0 || this.data.input_mobile_verification_code.length <= 0 ? this.setData({
            loginStatus: !1
        }) : this.setData({
            loginStatus: !0
        });
    },
    clearPhone: function() {
        this.setData({
            input_phone: ""
        });
    },
    clearImgCode: function() {
        this.setData({
            input_graphic_verification_code: ""
        });
    },
    clearPhoneCode: function() {
        this.setData({
            input_mobile_verification_code: ""
        });
    },
    onGetPhone: function(t) {
        var e = t.detail.value;
        this.setData({
            input_phone: e
        }), this.checkInput();
    },
    onGetGraphicVerificationCode: function(t) {
        var e = t.detail.value;
        this.setData({
            input_graphic_verification_code: e
        }), this.checkInput();
    },
    vertifyCodeInput: function(t) {
        var e = t.detail.value;
        this.setData({
            input_mobile_verification_code: e
        }), this.checkInput();
    },
    onGetMobileVerificationCode: function() {
        var e = this;
        e.setData({
            disabled: !0
        });
        var i = t.getRequestUrl() + "Login/getCode", a = {
            phone: e.data.input_phone,
            uuid: e.data.uuid,
            code: e.data.input_graphic_verification_code
        };
        t.requestFn(i, "post", a, function(i) {
            if (1 == i.data.status) {
                wx.showToast({
                    title: "短信验证码已发送",
                    icon: "none",
                    duration: 2e3
                });
                var a = e.data.currentTime, n = setInterval(function() {
                    a--, e.setData({
                        remainText: a + "s"
                    }), a <= 0 && (clearInterval(n), e.setData({
                        remainText: "重新发送",
                        currentTime: 61,
                        disabled: !1,
                        color: "#59b550"
                    }));
                }, 1e3);
            } else t.showToast(i.data.msg), e.getCode(), e.setData({
                disabled: !1
            });
        });
    },
    onLogin: function() {
        var e = this, i = t.getRequestUrl() + "Login/loginByMobileVerificationCode", a = {
            phone: e.data.input_phone,
            mobileVerificationCode: e.data.input_mobile_verification_code,
            system_type: e.data.platform
        };
        t.requestFn(i, "post", a, function(i) {
            1 == i.data.status ? (wx.showToast({
                title: i.data.msg,
                icon: "success",
                duration: 1e3
            }), t.getOpenId(i.data.data.phone), wx.setStorage({
                key: "phoneObj",
                data: i.data.data.phone,
                success: function(t) {}
            }), wx.setStorage({
                key: "token",
                data: i.data.data.token,
                success: function(t) {}
            }), e.getOpenerEventChannel().emit("closeMainLoginPage"), wx.navigateBack({
                delta: -1
            })) : t.showToast(i.data.msg);
        });
    },
    onUserLoginCancel: function() {
        wx.navigateBack();
    },
    onNextPic: function() {
        this.getCode();
    },
    getCode: function() {
        var e = this, i = t.getRequestUrl() + "Verifycode/verifyCode", a = {
            key: e.data.input_graphic_verification_code
        };
        t.requestFn(i, "post", a, function(t) {
            e.setData({
                imgCodeIcon: t.data.data.img,
                uuid: t.data.data.uuid
            });
        });
    },
    judgeSystemType: function() {
        var e = t.judgeSystemType();
        this.setData({
            platform: e
        });
    },
    getNavHeight: function() {
        var t = wx.getSystemInfoSync().statusBarHeight, e = wx.getMenuButtonBoundingClientRect(), i = t + e.height + 2 * (e.top - t);
        this.setData({
            navHeight: i
        });
    },
    onLoad: function(t) {
        this.getNavHeight(), this.judgeSystemType(), this.getCode();
    },
    onShow: function() {}
});