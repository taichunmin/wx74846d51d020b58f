var t = require("../../8462214255C842DFE2044945663685D7.js");

Page({
    data: {
        username: "",
        contactInformation: "",
        wangwangNumber: "",
        usernameError: "",
        phoneError: "手机号格式错误",
        fileList: [],
        imgLength: 0,
        canSubmit: !0,
        showView: !1,
        chooseData: "",
        show_data: [ "请选择", "首次好评", "追评" ]
    },
    openPopup: function() {
        this.setData({
            showView: !0
        });
    },
    closePopup: function() {
        this.setData({
            showView: !1
        });
    },
    selectData: function(t) {
        this.setData({
            showView: !1,
            chooseData: t.detail.value
        });
    },
    deleteImage: function(t) {
        console.log(t);
        var a = this.data.fileList, e = void 0 === a ? [] : a;
        e.splice(t.detail.index, 1), this.setData({
            fileList: e
        }), this.setData({
            imgLength: this.data.fileList.length
        });
    },
    username: function(t) {
        this.setData({
            username: t.detail
        });
    },
    contactInformation: function(t) {
        this.setData({
            contactInformation: t.detail
        });
    },
    wangwangNumber: function(t) {
        this.setData({
            wangwangNumber: t.detail
        });
    },
    videoTitle: function(t) {
        this.setData({
            videoTitle: t.detail
        });
    },
    fansNumber: function(t) {
        this.setData({
            fansNumber: t.detail
        });
    },
    videoLike: function(t) {
        this.setData({
            videoLike: t.detail
        });
    },
    afterRead: function(a) {
        for (var e = a.detail.file, i = this.data.fileList, n = void 0 === i ? [] : i, o = 0; o < e.length; o++) if (e[o].size >= 1048576) return void t.showToast("图片大小超出1M");
        e.forEach(function(t) {
            n.push({
                url: t.url
            });
        }), this.setData({
            fileList: n
        }), this.setData({
            imgLength: this.data.fileList.length
        });
    },
    submit: function() {
        var a = this;
        if (0 != a.data.canSubmit) {
            var e = this.data.username, i = this.data.contactInformation, n = this.data.wangwangNumber, o = a.data.chooseData;
            if (console.log("username是" + e), "" == e) return t.showToast("需要填写姓名"), !1;
            if ("" == i) return t.showToast("需要填写联系方式"), !1;
            if ("" == n) return t.showToast("需要填写旺旺号"), !1;
            if ("" == o || "请选择" == o) return t.showToast("请选择好评类型"), !1;
            if ("" == a.data.fileList) return t.showToast("请至少上传一张图片"), !1;
            for (var s = 0; s < e.length; s++) {
                var r = e[s].charCodeAt();
                if (r >= 48 && r <= 57) return console.log("存在数字" + e[s]), this.setData({
                    usernameError: "不能存在数字"
                }), !1;
            }
            if (i.length < 5) t.showToast("联系方式输入不对"); else if (0 != t.judegPhone(i)) {
                var u = "~·`!！@#$￥%^…&*()（）—-_=+[]{}【】、|\\;:；：'\"“‘,./<>《》?？，。", h = u.length;
                for (s = 0; s < h; s++) if (-1 != e.indexOf(u.substring(s, s + 1))) return console.log("存在特殊字符"), 
                this.setData({
                    usernameError: "不能存在特殊字符"
                }), !1;
                a.setData({
                    canSubmit: !1
                });
                var c = t.randomUuid();
                wx.showLoading({
                    title: "上传中"
                });
                var f = a.data.fileList, l = t.obtain(this), d = t.getPhone();
                for (s = 0; s < f.length; s++) wx.uploadFile({
                    url: t.getRequestUrl() + "Taobaopraise/newUploadimg",
                    filePath: f[s].url,
                    name: "file",
                    formData: {
                        user_name: a.data.username,
                        contact_information: a.data.contactInformation,
                        wangwang_number: a.data.wangwangNumber,
                        chooseData: a.data.chooseData,
                        phone: d,
                        token: l,
                        uuid: c
                    },
                    success: function(e) {
                        e = JSON.parse(e.data);
                        if (wx.hideLoading({}), 2 == e.status) return t.showToast("上传失败，文件仅支持 png,jpg,jpeg 格式"), 
                        a.setData({
                            canSubmit: !0
                        }), !1;
                        1 == e.status ? (wx.showToast({
                            title: e.msg,
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.navigateBack();
                        }, 1e3)) : (a.setData({
                            canSubmit: !0
                        }), wx.showToast({
                            title: e.msg,
                            icon: "error",
                            duration: 1e3
                        }));
                    },
                    fail: function(t) {
                        console.log("错误的原因是" + JSON.stringify(t));
                    }
                });
            }
        }
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        t.checkToken(this);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});