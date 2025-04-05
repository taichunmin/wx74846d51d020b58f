var n, i = (n = require("@vant/weapp/dialog/dialog")) && n.__esModule ? n : {
    default: n
};

var e = require("../../76F8096255C842DF109E616502B6D685.js"), a = require("../../AB5D946455C842DFCD3BFC63A316D685.js");

Page({
    data: {
        colList: [ [ {
            iconTitle: "batchManagement",
            title: "电脑批量管理",
            bindTap: "batchManagement",
            buddling: "",
            content: [ {
                link: "",
                btn: "复制"
            } ]
        }, {
            iconTitle: "passwordLibraryManagement",
            title: "密码库管理",
            bindTap: "passwordLibraryManagement",
            buddling: ""
        }, {
            iconTitle: "cardPacketSharingRecord",
            title: "卡包分享记录",
            bindTap: "cardPacketSharingRecord",
            buddling: ""
        } ], [ {
            iconTitle: "couponExchange",
            title: "兑换VIP",
            bindTap: "couponExchange",
            buddling: ""
        }, {
            iconTitle: "voucher",
            title: "兑换代金券",
            bindTap: "voucher",
            buddling: ""
        } ], [ {
            iconTitle: "iconOrder",
            title: "我的订单",
            bindTap: "myOrder",
            buddling: ""
        }, {
            iconTitle: "shipToAddress",
            title: "收货地址",
            bindTap: "shipToAddress",
            buddling: ""
        } ], [ {
            iconTitle: "iconTask",
            title: "金币任务",
            bindTap: "iconTask",
            buddling: "做任务得金币"
        }, {
            iconTitle: "iconRanking",
            title: "金币排行",
            bindTap: "iconRanking",
            buddling: ""
        } ], [ {
            iconTitle: "iconSet",
            title: "功能设置",
            bindTap: "iconSet",
            buddling: ""
        }, {
            iconTitle: "iconQQGroup",
            title: "加入Q群",
            bindTap: "onJoinQQGroupChat",
            buddling: ""
        }, {
            iconTitle: "iconAbout",
            title: "关于我们",
            bindTap: "iconAbout",
            buddling: ""
        } ], [ {
            iconTitle: "iconOpinion",
            title: "意见反馈",
            bindTap: "iconOpinion",
            buddling: ""
        }, {
            iconTitle: "iconQuest",
            title: "问题帮助",
            bindTap: "iconQuest",
            buddling: ""
        } ], [ {
            iconTitle: "upLog",
            title: "更新日志",
            bindTap: "upLog",
            buddling: ""
        } ] ],
        link_data: "",
        show: !0,
        phone: "",
        selected: 3,
        remainingTimes: "",
        vip_end_date: "",
        expirationTime: "",
        vipText: "",
        permanentVip: "",
        gold_coin_count: "",
        show_phone: "",
        token: "",
        navHeight: "",
        imgUrl: "",
        buyWriteCardChanceEnable: !0,
        miniProgramVersion: ""
    },
    gotoPageAndLoginTips: function(n, a) {
        e.isLogin() ? wx.navigateTo({
            url: a
        }) : i.default.confirm({
            message: n,
            confirmButtonText: "登录",
            cancelButtonText: "取消"
        }).then(function() {
            wx.navigateTo({
                url: "/pages/user-login-onekey/login"
            });
        }).catch(function() {});
    },
    shipToAddress: function() {
        this.gotoPageAndLoginTips("该页面与用户有关联，需要登录后才能访问哦~", "/pages/shipping-address/index");
    },
    batchManagement: function() {
        this.gotoPageAndLoginTips("该页面与用户有关联，需要登录后才能访问哦~", "/pages/card-wallet-import-export/index");
    },
    passwordLibraryManagement: function() {
        wx.navigateTo({
            url: "/pages/device-m1-keys-manager/manager"
        });
    },
    cardPacketSharingRecord: function() {
        this.gotoPageAndLoginTips("该页面与用户有关联，需要登录后才能访问哦~", "/pages/card-dump-share-history/index");
    },
    jumpPersonalCenter: function() {
        wx.navigateTo({
            url: "/pages/user-info-details/info"
        });
    },
    jumpLogin: function() {
        0 == e.isLogin() ? wx.navigateTo({
            url: "/pages/user-login-onekey/login"
        }) : wx.navigateTo({
            url: "/pages/user-info-details/info"
        });
    },
    personCenter: function() {
        wx.navigateTo({
            url: "/pages/user-info-details/info"
        });
    },
    purchase: function() {
        this.data.buyWriteCardChanceEnable && wx.navigateTo({
            url: "/pages/user-buy-writetag-chance/chance"
        });
    },
    renewNow: function() {
        wx.navigateTo({
            url: "/pages/user-buy-vip/buy"
        });
    },
    couponExchange: function() {
        wx.navigateTo({
            url: "/pages/user-exchange-code/exchange"
        });
    },
    voucher: function() {
        wx.navigateTo({
            url: "/pages/user-voucher/index"
        });
    },
    iconRanking: function() {
        this.gotoPageAndLoginTips("该页面与用户有关联，需要登录后才能访问哦~", "/pages/reward-task-ranking/ranking");
    },
    iconTask: function() {
        this.gotoPageAndLoginTips("该页面与用户有关联，需要登录后才能访问哦~", "/pages/reward-task-list/list");
    },
    iconSet: function() {
        wx.navigateTo({
            url: "/pages/settings-program-main/settings"
        });
    },
    iconAbout: function() {
        wx.navigateTo({
            url: "/pages/about-nikolalab/about-us"
        });
    },
    iconOpinion: function() {
        wx.navigateTo({
            url: "/pages/user-feedback-commit/feedback"
        });
    },
    iconQuest: function() {
        wx.navigateTo({
            url: "/pages/user-device-help/help"
        });
    },
    upLog: function() {
        wx.navigateTo({
            url: "/pages/app-update-log/index"
        });
    },
    onJoinQQGroupChat: function() {
        wx.setClipboardData({
            data: "705338522",
            success: function() {
                wx.showModal({
                    content: "复制Q群号码 ".concat("705338522", " 成功，快去QQ添加吧。"),
                    showCancel: !1
                });
            },
            fail: function() {
                wx.showModal({
                    content: "复制失败，您可以手动添加：".concat("705338522"),
                    showCancel: !1
                });
            }
        });
    },
    copyLink: function() {
        wx.setClipboardData({
            data: this.data.link_data,
            success: function(n) {
                e.showToast("复制链接成功");
            }
        });
    },
    myOrder: function() {
        this.gotoPageAndLoginTips("该页面与用户有关联，需要登录后才能访问哦~", "/pages/user-my-order/index");
    },
    onLoad: function(n) {
        wx.hideTabBar(), this.setData({
            miniProgramVersion: wx.getAccountInfoSync().miniProgram.version
        });
    },
    onShow: function() {
        var n = this;
        e.getNavHeight(function(i) {
            n.setData({
                navHeight: i
            });
        }), "ios" == wx.getSystemInfoSync().platform ? n.setData({
            vipText: "了解更多",
            buyWriteCardChanceEnable: !1
        }) : n.setData({
            vipText: "立即开通",
            buyWriteCardChanceEnable: !0
        }), e.judgePhoneNumber(n);
        var i = e.obtain();
        e.isLogin() && (n.setData({
            show_phone: e.getPhone(),
            phone: e.getHidePhone(),
            token: i
        }), e.getHeadPortrait(function(i) {
            if (1 == i.data.status) {
                var e = a.getStorageSyncHasDefault("image_cache", {});
                Object.keys(e).length <= 0 ? (wx.setStorageSync("image_cache", i.data.data), n.setData({
                    imgUrl: i.data.data
                })) : n.setData({
                    imgUrl: e
                });
            } else n.setData({
                imgUrl: ""
            });
        }), e.gold_coin_count(function(i) {
            0 == i ? n.setData({
                gold_coin_count: 0
            }) : n.setData({
                gold_coin_count: i
            });
        }), e.remainNumber(function(i) {
            var e = i.data.data.remain_count, a = i.data.data.vip_end_date, t = i.data.data.expirationTime;
            if ("会员已过期" == t) return n.setData({
                expirationTime: "会员已过期",
                remainingTimes: e
            }), !1;
            var o = a.slice(0, 2);
            o = o >= 21 ? "永久VIP" : "", n.setData({
                remainingTimes: e,
                vip_end_date: a,
                expirationTime: t,
                permanentVip: o
            });
        }), e.pullPasswordAndLink(function(i) {
            "" != i && n.setData({
                "colList[0][0].content[0].link": i[0].link,
                link_data: i[0].link
            });
        }));
    }
});