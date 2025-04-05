var t = require("../../76F8096255C842DF109E616502B6D685.js");

Page({
    data: {
        username: "",
        contactInformation: "",
        videoTitle: "",
        platformAccount: "",
        usernameError: "",
        videoTitleError: "",
        phoneError: "手机号格式错误",
        fileList: [],
        imgLength: 0,
        canSubmit: !0,
        showView: !1,
        chooseData: "",
        platform_name_chooseData: "",
        show_data: "",
        mode: "",
        platform_list: ""
    },
    platformNameOpenPopup: function() {
        this.setData({
            showView: !0,
            show_data: this.data.platform_list,
            mode: 1
        });
    },
    openPopup: function() {
        this.setData({
            showView: !0,
            show_data: [ "请选择", "原创", "非原创" ],
            mode: 2
        });
    },
    closePopup: function() {
        this.setData({
            showView: !1
        });
    },
    selectData: function(t) {
        1 == this.data.mode ? this.setData({
            showView: !1,
            platform_name_chooseData: t.detail.value
        }) : this.setData({
            showView: !1,
            chooseData: t.detail.value
        });
    },
    deleteImage: function(t) {
        console.log(t);
        var a = this.data.fileList, o = void 0 === a ? [] : a;
        o.splice(t.detail.index, 1), this.setData({
            fileList: o
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
    videoTitle: function(t) {
        this.setData({
            videoTitle: t.detail
        });
    },
    platformAccount: function(t) {
        this.setData({
            platformAccount: t.detail
        });
    },
    afterRead: function(a) {
        console.log(a.detail);
        var o = a.detail.file, e = this.data.fileList, i = void 0 === e ? [] : e;
        console.log(o);
        for (var n = 0; n < o.length; n++) if (o[n].size > 1048576) return void t.showToast("图片大小超出1M");
        o.forEach(function(t) {
            i.push({
                url: t.url
            });
        }), this.setData({
            fileList: i
        }), console.log("fileList是 " + JSON.stringify(this.data.fileList)), this.setData({
            imgLength: this.data.fileList.length
        }), console.log("长度是 " + this.data.imgLength);
    },
    submit: function() {
        var a = this;
        if (0 != a.data.canSubmit) {
            var o = a.data.username, e = a.data.contactInformation, i = a.data.platform_name_chooseData, n = a.data.videoTitle, s = a.data.platformAccount, r = a.data.chooseData;
            if ("" == o) return t.showToast("需要填写姓名"), !1;
            if ("" == e) return t.showToast("需要填写联系方式"), !1;
            if ("" == i) return t.showToast("需要填写平台名称"), !1;
            if ("" == n) return t.showToast("需要填写视频标题"), !1;
            if ("" == s) return t.showToast("需要填写平台账号"), !1;
            if ("" == r || "请选择" == r) return t.showToast("请选择视频发布类型"), !1;
            if ("" == a.data.fileList) return t.showToast("请至少上传一张图片"), !1;
            for (var l = 0; l < o.length; l++) {
                var f = o[l].charCodeAt();
                if (f >= 48 && f <= 57) return console.log("存在数字" + o[l]), this.setData({
                    usernameError: "不能存在数字"
                }), !1;
            }
            var u = "~·`!！@#$￥%^…&*()（）—-_=+[]{}【】、|\\;:；：'\"“‘,./<>《》?？，。", c = u.length;
            for (l = 0; l < c; l++) if (-1 != o.indexOf(u.substring(l, l + 1))) return console.log("存在特殊字符"), 
            this.setData({
                usernameError: "不能存在特殊字符"
            }), !1;
            if (0 != t.judegPhone(e)) {
                for (l = 0; l < "`@#${}[]".length; l++) if (-1 != n.indexOf("`@#${}[]".substring(l, l + 1))) return console.log("存在特殊字符"), 
                this.setData({
                    videoTitleError: "不能存在特殊字符"
                }), !1;
                a.setData({
                    canSubmit: !1
                });
                var h = t.randomUuid();
                wx.showLoading({
                    title: "上传中"
                });
                var d = a.data.fileList, m = t.obtain(this), g = t.getPhone();
                for (l = 0; l < d.length; l++) wx.uploadFile({
                    url: t.getRequestUrl() + "Tiktok/newUploadImg",
                    filePath: d[l].url,
                    name: "file",
                    formData: {
                        user_name: a.data.username,
                        contact_information: a.data.contactInformation,
                        platform_name: a.data.platform_name_chooseData,
                        video_title: a.data.videoTitle,
                        platform_account: a.data.platformAccount,
                        chooseData: r,
                        phone: g,
                        token: m,
                        uuid: h
                    },
                    success: function(o) {
                        o = JSON.parse(o.data);
                        if (wx.hideLoading({}), 2 == o.status) return t.showToast("上传失败，文件仅支持 png,jpg,jpeg 格式"), 
                        a.setData({
                            canSubmit: !0
                        }), !1;
                        1 == o.status ? (wx.showToast({
                            title: o.msg,
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.navigateBack();
                        }, 1e3)) : (a.setData({
                            canSubmit: !0
                        }), wx.showToast({
                            title: o.msg,
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
        var a = this;
        t.query_video_platform(function(t) {
            for (var o = [], e = 0; e < t.length; e++) o.push(t[e].platform);
            o.unshift("请选择"), a.setData({
                platform_list: o
            });
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});