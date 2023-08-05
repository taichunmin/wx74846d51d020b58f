var a = (0, require("../../@babel/runtime/helpers/interopRequireDefault").default)(require("@vant/weapp/dialog/dialog")), e = require("../../8462214255C842DFE2044945663685D7.js"), t = require("../../43635B5055C842DF2505335752E585D7.js");

Page({
    data: {
        dumpList: [],
        share_data: "",
        id: "",
        userName: "",
        showShareDialog: !1,
        appendAC: !0
    },
    onShareAppMessage: function(a) {
        var t = this.data.share_data.data.data, s = this.data.id, i = t[s].code, r = t[s].password, n = this.data.userName, o = this.data.appendAC;
        return e.createShareFriendMessage(n, i, r, o);
    },
    onUserShareToFriendClick: function() {
        this.setData({
            showShareDialog: !1
        });
    },
    onUserShareToLinkChipBoardClick: function() {
        var t = this.data.share_data.data.data, s = this.data.id, i = t[s].code, r = t[s].password, n = this.data.userName, o = this.data.appendAC, d = e.createShareLinkMessage(n, i, r, o);
        wx.setClipboardData({
            data: d,
            success: function(e) {
                a.default.alert({
                    message: "链接复制成功啦，快去发送给你的好友吧~"
                }).then(function() {});
            }
        }), this.setData({
            showShareDialog: !1
        });
    },
    onUserSwitchAutoAppendAC: function(a) {
        this.setData({
            appendAC: a.detail
        });
    },
    enableShareToFriendMenu: function(a) {
        a ? wx.showShareMenu({
            menus: [ "shareAppMessage" ]
        }) : wx.hideShareMenu({
            menus: [ "shareAppMessage" ]
        });
    },
    onUserCloseShareDialog: function() {
        this.enableShareToFriendMenu(!1), this.setData({
            showShareDialog: !1
        });
    },
    onUserSendToFirendClick: function(a) {
        var t = a.currentTarget.dataset.id;
        "已过期" != this.data.dumpList[t].term_of_validity ? (this.enableShareToFriendMenu(!0), 
        this.setData({
            showShareDialog: !0,
            id: t
        })) : e.showToast("该分享已过期");
    },
    onUserDeleteShareItemClick: function(t) {
        var s = this, i = this;
        a.default.confirm({
            message: "确定要取消分享吗？"
        }).then(function() {
            var a = t.currentTarget.dataset.id, r = s.data.dumpList[a].id;
            e.deleteShareData(r, function(a) {
                1 == a.data.status ? (e.showToast("取消分享成功"), i.showData()) : e.showToast("删除失败，请重试");
            });
        }).catch(function() {});
    },
    calcDateDiff: function(a, e) {
        var t, s, i, r;
        return t = a.split("-"), i = new Date(t[1] + "/" + t[2] + "/" + t[0]), s = e.split("-"), 
        r = new Date(s[1] + "/" + s[2] + "/" + s[0]), parseInt(Math.abs(i - r) / 1e3 / 60 / 60 / 24);
    },
    showData: function() {
        var a = this;
        e.pullShareData(function(e) {
            if (e.length <= 0) a.setData({
                dumpList: ""
            }); else {
                a.setData({
                    share_data: e
                });
                for (var s = e.data.data, i = [], r = 0; r < s.length; r++) {
                    var n, o = s[r].data.tag_info.tag_type, d = s[r].password, h = s[r].id, u = s[r].name, l = s[r].date_start, c = s[r].date_stop, p = a.calcDateDiff(l, c);
                    new Date(Date.parse(c.replace(/-/g, "/"))) <= new Date() ? (console.log("小于当前时间"), 
                    p = "已过期") : console.log("大于当前时间"), n = o == t.TAG_TYPE_LF_EM410X ? "#008EF5" : "#f5a200", 
                    i.push({
                        id: h,
                        name: u,
                        type: o == t.TAG_TYPE_LF_EM410X ? "ID卡" : "IC卡",
                        color: n,
                        date: l,
                        term_of_validity: p,
                        password: d
                    });
                }
                a.setData({
                    dumpList: i
                });
            }
        });
    },
    onShow: function() {
        this.enableShareToFriendMenu(!1);
        var a = this;
        e.get_nickname(function(e) {
            a.setData({
                userName: e.data
            }), a.showData();
        });
    }
});