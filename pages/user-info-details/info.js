var t = require("../../6B5F0E3755C842DF0D39663027C585D7.js"), a = require("../../A3859AB555C842DFC5E3F2B2FA5585D7.js"), e = require("../../8462214255C842DFE2044945663685D7.js");

Page({
    data: {
        nickname: "",
        dialog_show: !1,
        isClearShow: !1,
        input_value: "",
        fileList: [],
        photo_src: "",
        imgUrl: ""
    },
    chose_photo: function(t) {
        var a = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                t.tempFiles[0].size >= 204800 ? e.showToast("图片大小超出200K") : (a.setData({
                    photo_src: t.tempFilePaths[0]
                }), e.up_head_portrait(t.tempFilePaths[0], function(t) {
                    1 == t.status ? (wx.showToast({
                        title: "上传成功",
                        icon: "success",
                        duration: 1e3
                    }), e.getHeadPortrait(function(t) {
                        1 == t.data.status ? (wx.setStorageSync("image_cache", t.data.data), a.setData({
                            imgUrl: t.data.data
                        })) : a.setData({
                            imgUrl: ""
                        });
                    })) : wx.showToast({
                        title: t.msg,
                        icon: "error",
                        duration: 1e3
                    });
                }));
            },
            fail: function(t) {
                console.log("失败原因" + t);
            }
        });
    },
    edit: function() {
        this.setData({
            dialog_show: !0
        });
    },
    onCardNameInput: function(t) {
        var a = t.detail.value;
        this.setData({
            isClearShow: !0,
            input_value: a
        });
    },
    clearTap: function() {
        this.setData({
            input_value: ""
        });
    },
    onSaveCancel: function() {
        this.setData({
            dialog_show: !1
        });
    },
    onSaveDumpClick: function() {
        var t = this;
        if ("" != t.data.input_value) {
            for (var a = t.data.input_value, i = "~·`!！@#$￥%^…&*()（）—-_=+[]{}【】、|\\;:；：'\"“‘,./<>《》?？，。", o = i.length, n = 0; n < o; n++) if (-1 != a.indexOf(i.substring(n, n + 1))) return void e.showToast("不能存在特殊字符！");
            e.save_nickname(a, function(a) {
                1 == a.data.status ? (e.showToast("保存成功！"), t.getNickName(), t.onSaveCancel()) : (e.showToast(a.data.msg), 
                t.onSaveCancel());
            });
        } else e.showToast("请输入昵称");
    },
    getNickName: function() {
        var t = this;
        e.get_nickname(function(a) {
            1 == a.data.status ? t.setData({
                nickname: a.data.data
            }) : t.setData({
                nickname: ""
            });
        });
    },
    getHeadPortrait: function() {
        var a = this;
        e.getHeadPortrait(function(e) {
            if (1 == e.data.status) {
                var i = t.getStorageSyncHasDefault("image_cache", {});
                Object.keys(i).length <= 0 ? (wx.setStorageSync("image_cache", e.data.data), a.setData({
                    imgUrl: e.data.data
                })) : a.setData({
                    imgUrl: i
                });
            } else a.setData({
                imgUrl: ""
            });
        });
    },
    logIn: function() {
        wx.navigateTo({
            url: "/pages/user-login-onekey/login"
        });
    },
    logOut: function() {
        wx.showModal({
            title: "提示",
            content: "是否确认退出登录？",
            success: function(t) {
                t.confirm && (console.log("用户点击确定"), e.removeAppStorage(), a.disconnectExistsDevice(), 
                wx.navigateBack());
            }
        });
    },
    onLoad: function(t) {},
    onShow: function() {
        if (0 == e.isLogin()) e.loginToast(); else {
            var t = e.getHidePhone(), a = e.getPhone(), i = e.obtain();
            this.setData({
                show_phone: a,
                hide_phone: t,
                token: i
            }), this.getNickName(), this.getHeadPortrait();
        }
    }
});