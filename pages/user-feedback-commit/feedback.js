var t = require("../../8462214255C842DFE2044945663685D7.js");

Page({
    data: {
        currentNoteLen: 0,
        limitNoteLen: "",
        fileList: [],
        imgLength: 0,
        textAreaValue: "",
        contactInformation: "",
        imgUrlList: [],
        commit_count: "",
        canSubmit: !0
    },
    bindTextAreaBlur: function(t) {
        this.setData({
            textAreaValue: t.detail.value
        }), console.log("textarea的值是" + t.detail.value);
    },
    limitWord: function(t) {
        var e = t.detail.value, a = parseInt(e.length);
        a > this.data.noteMaxLen || this.setData({
            currentNoteLen: a,
            limitNoteLen: this.data.noteMaxLen - a
        });
    },
    input: function(t) {
        console.log("input的值是" + t.detail.value), this.setData({
            contactInformation: t.detail.value
        });
    },
    deleteImage: function(t) {
        console.log(t);
        var e = this.data.fileList, a = void 0 === e ? [] : e;
        a.splice(t.detail.index, 1), this.setData({
            fileList: a
        }), this.setData({
            imgLength: this.data.fileList.length
        });
    },
    afterRead: function(e) {
        console.log(e.detail);
        for (var a = e.detail.file, i = this.data.fileList, n = void 0 === i ? [] : i, o = 0; o < a.length; o++) if (a[o].size > 1048576) return void t.showToast("图片大小超出1M");
        a.forEach(function(t) {
            n.push({
                url: t.url
            });
        }), this.setData({
            fileList: n
        }), this.setData({
            imgLength: this.data.fileList.length
        }), console.log("长度是 " + this.data.imgLength);
    },
    submit: function() {
        var e = this;
        if (0 != e.data.canSubmit) if (0 == t.isLogin()) wx.navigateTo({
            url: "/pages/user-login-onekey/login"
        }); else {
            if ("今天已完成" == e.data.commit_count) return void t.showToast("今天的反馈次数已达上限");
            var a = Date.parse(new Date());
            a /= 1e3;
            var i = new Date(1e3 * a), n = (i.getFullYear(), i.getMonth() + 1 < 10 ? i.getMonth() : i.getMonth(), 
            i.getDate() < 10 ? i.getDate() : i.getDate(), i.getHours(), i.getMinutes(), i.getSeconds(), 
            this.data.fileList), o = e.data.textAreaValue, s = (e.data.imgUrlList, e.data.contactInformation);
            if ("" == o) return t.showToast("反馈的内容不能为空！"), !1;
            if ("" == n) return t.showToast("请至少选择一张图片上传"), !1;
            if (0 == t.judegPhone(s)) return;
            e.setData({
                canSubmit: !1
            });
            var l = t.randomUuid();
            wx.showLoading({
                title: "上传中"
            });
            n = e.data.fileList;
            for (var u = t.obtain(e), r = t.getPhone(), c = 0; c < n.length; c++) wx.uploadFile({
                url: t.getRequestUrl() + "Feedback/newUploadImg",
                filePath: n[c].url,
                name: "file",
                formData: {
                    phone: r,
                    token: u,
                    feedback_content: e.data.textAreaValue,
                    contact_information: e.data.contactInformation,
                    uuid: l
                },
                success: function(a) {
                    a = JSON.parse(a.data);
                    if (wx.hideLoading({}), 2 == a.status) return t.showToast("上传失败，文件仅支持 png,jpg,jpeg 格式"), 
                    e.setData({
                        canSubmit: !0
                    }), !1;
                    1 == a.status ? (wx.showToast({
                        title: a.msg,
                        icon: "success",
                        duration: 1e3
                    }), setTimeout(function() {
                        wx.navigateBack();
                    }, 1e3)) : (e.setData({
                        canSubmit: !0
                    }), wx.showToast({
                        title: a.msg,
                        icon: "error",
                        duration: 1e3
                    }));
                },
                fail: function(t) {
                    console.log("错误的原因是" + JSON.stringify(t));
                }
            });
        }
    },
    record: function() {
        wx.navigateTo({
            url: "/pages/user-feedback-history/history"
        });
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        var e = this;
        0 == t.isLogin() ? console.log("没有登录！") : t.checkFeedback(function(t) {
            console.log("反馈res是" + t), "今天已完成" == t && e.setData({
                commit_count: "今天已完成"
            });
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});