var e = (0, require("../../@babel/runtime/helpers/interopRequireDefault").default)(require("@vant/weapp/dialog/dialog")), a = require("../../8462214255C842DFE2044945663685D7.js");

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
        var s = a.createShareLinkMessage(this.data.userName, this.data.shareCode, this.data.accessCode, this.data.appendAC);
        wx.setClipboardData({
            data: s,
            success: function(a) {
                e.default.alert({
                    message: "链接复制成功啦，快去发送给你的好友吧~"
                }).then(function() {});
            }
        });
    },
    onShareAppMessage: function(e) {
        return a.createShareFriendMessage(this.data.userName, this.data.shareCode, this.data.accessCode, this.data.appendAC);
    }
});