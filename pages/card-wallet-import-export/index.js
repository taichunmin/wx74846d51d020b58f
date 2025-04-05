var a = require("../../76F8096255C842DF109E616502B6D685.js");

Page({
    data: {
        nameEditor: {
            showNameEditor: !1,
            defaultName: ""
        },
        password: "",
        link: ""
    },
    edit: function() {
        this.data.nameEditor.showNameEditor = !0, this.setData({
            nameEditor: this.data.nameEditor
        });
    },
    onUserCancelNameEdit: function() {
        this.data.nameEditor.showNameEditor = !1, this.setData({
            nameEditor: this.data.nameEditor
        });
    },
    onUserConfirmNameEdit: function(t) {
        var o = this, n = t.detail.dumpName;
        "请输入需要修改的密码" != n ? a.updateTagDataManagePassword(n, function(t) {
            console.log("修改密码" + JSON.stringify(t)), 1 == t ? (a.showToast("修改密码成功！"), o.data.nameEditor.showNameEditor = !1, 
            o.setData({
                nameEditor: o.data.nameEditor
            }), o.queryData()) : a.showToast("修改密码失败！");
        }) : a.showToast("输入内容不能为空");
    },
    copyLink: function() {
        wx.setClipboardData({
            data: this.data.link,
            success: function(t) {
                a.showToast("复制链接成功");
            }
        });
    },
    queryData: function() {
        var t = this;
        a.pullPasswordAndLink(function(a) {
            t.setData({
                password: a[0].password,
                link: a[0].link
            });
        });
    },
    onLoad: function(a) {},
    onReady: function() {},
    onShow: function() {
        a.createTagDataManagePassword(function(a) {
            console.log("333" + JSON.stringify(a)), 0 == a ? console.log("已经生成随机密码或者是生成随机密码失败") : console.log("生成随机密码成功");
        }), this.queryData();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});