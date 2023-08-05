var n = (0, require("../../@babel/runtime/helpers/interopRequireDefault").default)(require("@vant/weapp/dialog/dialog")), i = require("../../8462214255C842DFE2044945663685D7.js"), e = require("../../6B5F0E3755C842DF0D39663027C585D7.js");

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
        miniProgramVersion: ""
    },
    gotoPageAndLoginTips: function(e, t) {
        i.isLogin() ? wx.navigateTo({
            url: t
        }) : n.default.confirm({
            message: e,
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
        0 == i.isLogin() ? wx.navigateTo({
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
        wx.navigateTo({
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
                i.showToast("复制链接成功");
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
        i.getNavHeight(function(i) {
            n.setData({
                navHeight: i
            });
        }), "ios" == wx.getSystemInfoSync().platform ? n.setData({
            vipText: "了解更多"
        }) : n.setData({
            vipText: "立即开通"
        }), i.judgePhoneNumber(n);
        var t = i.obtain();
        i.isLogin() && (n.setData({
            show_phone: i.getPhone(),
            phone: i.getHidePhone(),
            token: t
        }), i.getHeadPortrait(function(i) {
            if (1 == i.data.status) {
                var t = e.getStorageSyncHasDefault("image_cache", {});
                Object.keys(t).length <= 0 ? (wx.setStorageSync("image_cache", i.data.data), n.setData({
                    imgUrl: i.data.data
                })) : n.setData({
                    imgUrl: t
                });
            } else n.setData({
                imgUrl: ""
            });
        }), i.gold_coin_count(function(i) {
            0 == i ? n.setData({
                gold_coin_count: 0
            }) : n.setData({
                gold_coin_count: i
            });
        }), i.remainNumber(function(i, e, t) {
            if ("会员已过期" == t) return n.setData({
                expirationTime: "会员已过期",
                remainingTimes: i
            }), !1;
            var a = e.slice(0, 2);
            a = a >= 21 ? "永久VIP" : "", n.setData({
                remainingTimes: i,
                vip_end_date: e,
                expirationTime: t,
                permanentVip: a
            });
        }), i.pullPasswordAndLink(function(i) {
            n.setData({
                "colList[0][0].content[0].link": i[0].link,
                link_data: i[0].link
            });
        }));
    }
});