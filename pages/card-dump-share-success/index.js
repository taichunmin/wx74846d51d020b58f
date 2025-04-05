var e, a = (e = require("@vant/weapp/dialog/dialog")) && e.__esModule ? e : {
    default: e
};

var s = require("../../76F8096255C842DF109E616502B6D685.js");

Page({
    data: {
        userName: "",
        dumpName: "",
        shareCode: "",
        accessCode: "",
        expireDay: 0,
        appendAC: !1
    },
    onLoad: function(e) {
        wx.showLoading({
            title: "加载中"
        }), this.setData({
            userName: e.userName,
            dumpName: e.dumpName,
            shareCode: e.shareCode,
            accessCode: e.accessCode,
            expireDay: parseInt(e.expireDay),
            appendAC: "true" == e.appendAC
        }, function() {
            wx.hideLoading();
        });
    },
    onUserShareToLinkChipBoardClick: function() {
        var e = s.createShareLinkMessage(this.data.userName, this.data.shareCode, this.data.accessCode, this.data.appendAC);
        wx.setClipboardData({
            data: e,
            success: function(e) {
                a.default.alert({
                    message: "链接复制成功啦，快去发送给你的好友吧~"
                }).then(function() {});
            }
        });
    },
    onShareAppMessage: function(e) {
        return s.createShareFriendMessage(this.data.userName, this.data.shareCode, this.data.accessCode, this.data.appendAC);
    }
});