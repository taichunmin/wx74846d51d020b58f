var a = require("../../6B5F0E3755C842DF0D39663027C585D7.js"), t = require("../../9434A3B355C842DFF252CBB492D585D7.js"), e = require("../../275D798255C842DF413B1185FE3585D7.js"), o = require("../../8E76785255C842DFE810105557B585D7.js"), i = require("../../1B8F0B7555C842DF7DE96372984685D7.js"), s = require("../../8462214255C842DFE2044945663685D7.js"), n = require("../../A3859AB555C842DFC5E3F2B2FA5585D7.js"), c = require("../../306D78F255C842DF560B10F52E4585D7.js"), r = {
    0: "寻卡",
    1: "读卡",
    2: "读卡完成"
};

Page({
    data: {
        pageStatus: 0,
        showReadProgress: !1,
        progress: 0,
        dumpSaved: !1,
        canExit: !1,
        showDumpSaveDialog: !1,
        dumpName: "",
        uid_hex: "",
        atqa: "",
        sak: "",
        card_type: "",
        decrypt: "",
        step: "",
        max: "",
        decryptShow: !1,
        time_msg: "",
        voiceData: "",
        reading_status: "false"
    },
    setPageStatus: function(a, t) {
        wx.setNavigationBarTitle({
            title: r[a]
        }), this.setData({
            pageStatus: a
        }, t);
    },
    gotoReadFail: function(a) {
        wx.redirectTo({
            url: "/pages/device-card-read-fail/fail?status=" + a
        });
    },
    onTagSearchTypeChange: function(a) {
        "HF" == a ? console.log("正在搜索高频卡") : console.log("正在搜索低频卡");
    },
    onTagReadingProgress: function(a) {
        var t = this;
        "true" == t.data.reading_status || t.setData({
            voiceData: i.AUDIO_READING_CARD,
            reading_status: "true"
        });
        a = parseInt(a);
        t.setData({
            progress: a
        }), a >= 60 && t.setData({
            decryptShow: !1
        }), 100 == a && setTimeout(function() {
            t.setPageStatus(2), t.setData({
                voiceData: i.AUDIO_READ_CARD_SUCCESS
            }), "cloud" == s.keyStoryPosition() && "IC卡" == t.data.card_type && s.saveReadCardHistory("One", t.data.uid_hex);
        }, 2e3);
    },
    onTagAttackCallback: function(a, e, o, i, s) {
        var n = "", c = !1;
        switch (a) {
          case t.TASK_NAME_FCHK:
            n = "扫默认密码";
            break;

          case t.TASK_NAME_DARKSIDE:
            n = "计算全加密";
            break;

          case t.TASK_NAME_NESTED:
            n = "计算半加密";
            break;

          case t.TASK_NAME_STATICNESTED:
            n = "计算无漏洞";
            break;

          case t.TASK_NAME_HARDNESTED:
            n = "计算HARD", c = !0;
        }
        this.setData({
            decrypt: n,
            max: e,
            step: o,
            time_msg: s,
            decryptShow: !(o >= e),
            showHardTips: c
        });
    },
    onTagNoFound: function() {
        var a = this;
        setTimeout(function() {
            a.gotoReadFail(o.miniapp.AUTO_SCAN_NO_TAG_FOUND);
        }, 2e3);
    },
    onTagFound: function(t) {
        console.log("标签信息是 " + JSON.stringify(t));
        var e = this;
        "EM410x" == t.tag_type ? "" !== e.data.voiceData || (console.log("id44444444444" + e.data.voiceData), 
        e.setData({
            card_type: "ID卡",
            uid_hex: t.uid_hex,
            uid_10d: c.convertEM410x10HIDTo10D(t.uid_hex),
            voiceData: i.AUDIO_DINGDING
        })) : "" !== e.data.voiceData || e.setData({
            card_type: "IC卡",
            atqa: t.atqa_hex,
            sak: t.sak_hex,
            uid_hex: t.uid_hex,
            voiceData: i.AUDIO_DING
        }), setTimeout(function() {
            t.readable ? e.setPageStatus(1, function() {
                a.startReadTagAllData(e.onTagReadingProgress);
            }) : e.gotoReadFail(o.miniapp.TAG_NO_SUPPORT_READ);
        }, 1e3);
    },
    onSaveDumpToCardWallet: function() {
        this.data.dumpSaved ? s.showToast("此卡片已经保存了") : this.setData({
            showDumpSaveDialog: !0
        });
    },
    onUserCancelDumpSave: function() {
        this.setData({
            showDumpSaveDialog: !1
        });
    },
    onUserConfirmDumpSave: function(t) {
        var e = this, o = t.detail.dumpName;
        if ("local" == (i = s.cloudOrLocal())) {
            var i;
            (i = s.saveCard(o)).isok ? (e.setData({
                canExit: !0,
                dumpSaved: !0,
                showDumpSaveDialog: !1
            }), s.showToast("保存成功！")) : s.showToast(i.message);
        } else {
            var n = a.createDumpInfoJsonFromMem();
            "" == o && s.createDefaultNickCloud(function(a) {}), s.saveDataToTheCloud(o, "", n, 1, function(a) {
                console.log("这里的res是" + JSON.stringify(a)), 1 == a.data.status ? (e.setData({
                    canExit: !0,
                    dumpSaved: !0,
                    showDumpSaveDialog: !1
                }), s.showToast(a.data.msg)) : s.showToast(a.data.msg);
            });
        }
    },
    gotoWriteCard: function() {
        wx.redirectTo({
            url: "/pages/device-card-write-ready/write"
        });
    },
    onTagErrorCallback: function(a) {
        this.gotoReadFail(a);
    },
    onDeviceDisconnectCallback: function(a) {
        console.log("在读卡页面监听到设备断开连接！"), this.showToastNoIcon("设备断开连接"), 2 != this.data.pageStatus && this.gotoReadFail(o.miniapp.BLE_DEVICE_DISCONNECTED);
    },
    onBleComErrorCallback: function() {
        this.gotoReadFail(o.minicopy.BLE_COMMUNICATION_ERR);
    },
    onBleComTimeoutCallback: function() {
        this.gotoReadFail(o.miniapp.BLE_DEVICE_COM_TIMEOUT);
    },
    showToastNoIcon: function(a) {
        setTimeout(function() {
            wx.showToast({
                icon: "none",
                title: a
            });
        }, 100);
    },
    showExitTipsAtSearching: function(t) {
        wx.showModal({
            content: "当前正在寻卡，确认退出吗？",
            success: function(e) {
                e.confirm && a.stopLoopCardScanner(function() {
                    t.detail.goBack();
                });
            }
        });
    },
    showExitTipsAtDumpNoSave: function(a) {
        var t = this;
        t.data.showDumpSaveDialog || wx.showActionSheet({
            alertText: "是否需要保存数据再退出？",
            itemList: [ "保存", "退出" ],
            success: function(e) {
                switch (e.tapIndex) {
                  case 0:
                    t.onSaveDumpToCardWallet();
                    break;

                  case 1:
                    a.detail.goBack();
                }
            },
            fail: function() {}
        });
    },
    onUserBack: function(a) {
        switch (this.data.pageStatus) {
          case 0:
            this.showExitTipsAtSearching(a);
            break;

          case 1:
            this.showToastNoIcon("读卡中，请稍等...");
            break;

          case 2:
            this.data.dumpSaved ? a.detail.goBack() : this.showExitTipsAtDumpNoSave(a);
        }
    },
    onLoad: function(a) {
        t.registerOnAttackKeysCbk(this.onTagAttackCallback), e.registerOnBLEDisconnectedCallback(this.onDeviceDisconnectCallback), 
        n.onComErrCallback(this.onBleComErrorCallback), n.onTimeoutCallback(this.onBleComTimeoutCallback), 
        n.onTagErrorCallback(this.onTagErrorCallback);
    },
    onUnload: function() {
        t.unregisterOnAttackKeysCbk(this.onTagAttackCallback), e.unregisterOnBLEDisconnectedCallback(this.onDeviceDisconnectCallback), 
        n.onComErrCallback(null), n.onTimeoutCallback(null), n.onTagErrorCallback(null);
    },
    onReady: function() {
        this.setPageStatus(0), a.startLoopTagScanner(6e4, this.onTagSearchTypeChange, this.onTagFound, this.onTagNoFound);
    },
    onShow: function() {
        this.setData({
            voiceData: ""
        });
    },
    onHide: function() {}
});