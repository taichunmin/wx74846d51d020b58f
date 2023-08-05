var t = (0, require("../../@babel/runtime/helpers/interopRequireDefault").default)(require("@vant/weapp/dialog/dialog")), e = require("../../8462214255C842DFE2044945663685D7.js");

Page({
    data: {
        gold_coin_count: "0",
        signShow: !1,
        overlay_show: !1,
        list: [ {
            icon: "sign_in",
            text1: "每日签到",
            text2: "签到送金币",
            number: "0",
            number1: "1",
            btnText: "签到",
            bindTap: "signIn"
        }, {
            icon: "suggest",
            text1: "提出建议",
            text2: "建议合理送20金币",
            number: "0",
            number1: "3",
            btnText: "去完成",
            bindTap: "suggest"
        }, {
            icon: "praise",
            text1: "淘宝好评",
            text2: "好评截图(文字+图片)送50金币,追评送20金币",
            number: "0",
            number1: "2",
            btnText: "去完成",
            bindTap: "praise"
        } ],
        list1: [ {
            title: "发布视频或文章",
            describle: "通过审核奖励20-100金币",
            number: "0",
            number1: "2",
            btnText: "去完成",
            bindTap: "tiktok",
            disabled: "false"
        }, {
            title: "播放量奖励",
            describle: "原创视频播放量达到3000奖励200金币,上不封顶",
            number: "0",
            btnText: "去完成",
            bindTap: "playbackReward",
            disabled: "false"
        } ],
        prohibition: !1,
        remainder: ""
    },
    playbackReward: function() {
        if ("true" != this.data.prohibition) return "true" == this.data.list1[1].disabled ? void e.showToast("请等待审核") : void wx.navigateTo({
            url: "/pages/reward-task-video/index"
        });
        e.showToast("禁止做任务，解禁剩" + this.data.remainder + "天");
    },
    gold_coin_details: function() {
        wx.navigateTo({
            url: "/pages/reward-task-detailed-history/history"
        });
    },
    task_record: function() {
        wx.navigateTo({
            url: "/pages/reward-task-status-history/index"
        });
    },
    signIn: function() {
        wx.navigateTo({
            url: "/pages/user-sign-in/index"
        });
    },
    suggest: function() {
        "true" == this.data.prohibition ? e.showToast("禁止做任务，解禁剩" + this.data.remainder + "天") : wx.navigateTo({
            url: "/pages/user-feedback-commit/feedback"
        });
    },
    tiktok: function() {
        if ("true" != this.data.prohibition) return "true" == this.data.list1[0].disabled ? void e.showToast("今日已达上限") : void wx.navigateTo({
            url: "/pages/reward-task-tiktok/tiktok"
        });
        e.showToast("禁止做任务，解禁剩" + this.data.remainder + "天");
    },
    praise: function() {
        var i = this;
        t.default.alert({
            title: "温馨提示",
            message: "好评仅限于尼古拉实验室官方TB店铺和PDD店铺"
        }).then(function() {
            "true" == i.data.prohibition ? e.showToast("禁止做任务，解禁剩" + i.data.remainder + "天") : wx.navigateTo({
                url: "/pages/reward-taobao-praise/index"
            });
        });
    },
    checkGoldCoinCount: function() {
        var t = this;
        e.gold_coin_count(function(e) {
            console.log("金币的数量" + e), 0 == e ? t.setData({
                gold_coin_count: 0
            }) : t.setData({
                gold_coin_count: e
            });
        });
    },
    onLoad: function(t) {
        var i = this;
        e.prohibition(function(t) {
            console.log("000 " + JSON.stringify(t)), 1 == t.data.status && "true" == t.data.data.state && i.setData({
                prohibition: "true",
                remainder: t.data.data.remainder
            });
        });
    },
    onShow: function() {
        var t = this;
        t.checkGoldCoinCount(), e.checkSign(function(e) {
            "今天已签到" == e.msg ? t.setData({
                signShow: !0,
                "list[0].number": 1
            }) : t.setData({
                signShow: !1,
                "list[0].number": 0
            });
        }), e.checkFeedback(function(e) {
            console.log("反馈res是" + e), "今天已完成" == e ? t.setData({
                "list[1].btnText": "完成",
                "list[1].number": 3
            }) : t.setData({
                "list[1].btnText": "去完成",
                "list[1].number": e
            });
        }), e.checkTiktokStatus(function(e) {
            "今天已完成" == e ? t.setData({
                "list1[0].btnText": "完成",
                "list1[0].number": 2,
                "list1[0].disabled": "true"
            }) : t.setData({
                "list1[0].btnText": "去完成",
                "list1[0].number": e
            });
        }), e.check_video_rewards_count(function(e) {
            console.log("22w" + JSON.stringify(e)), "已完成" == e ? t.setData({
                "list1[1].btnText": "完成",
                "list1[1].disabled": "true"
            }) : t.setData({
                "list1[1].btnText": "去完成"
            });
        }), e.checkTaoBaoPraise(function(e) {
            "今天已完成" == e ? t.setData({
                "list[2].number": 2,
                "list[2].btnText": "完成"
            }) : t.setData({
                "list[2].btnText": "去完成",
                "list[2].number": e
            });
        });
    }
});