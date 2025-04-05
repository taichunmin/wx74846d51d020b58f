var a = require("../../AB5D946455C842DFCD3BFC63A316D685.js"), t = require("../../53CD6E9355C842DF35AB0694BD16D685.js"), e = require("../../614DB8F055C842DF072BD0F70136D685.js"), o = require("../../D6EF5C7155C842DFB08934760C65D685.js"), i = require("../../8896821655C842DFEEF0EA119506D685.js"), s = require("../../1D91D49255C842DF7BF7BC9565C6D685.js"), n = require("../../76F8096255C842DF109E616502B6D685.js"), c = require("../../DFE4D8E455C842DFB982B0E32585D685.js"), r = require("../../AC1F69C355C842DFCA7901C4DB75D685.js"), u = {
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
        reading_status: "false",
        fchkStatus: {
            show: !1,
            current: 0,
            max: 0
        }
    },
    setPageStatus: function(a, t) {
        wx.setNavigationBarTitle({
            title: u[a]
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
            voiceData: s.AUDIO_READING_CARD,
            reading_status: "true"
        });
        a = parseInt(a);
        t.setData({
            progress: a
        }), a >= 60 && t.setData({
            decryptShow: !1
        }), 100 == a && setTimeout(function() {
            t.setPageStatus(2), t.setData({
                voiceData: s.AUDIO_READ_CARD_SUCCESS
            }), "cloud" == n.keyStoryPosition() && "IC卡" == t.data.card_type && n.saveReadCardHistory("One", t.data.uid_hex);
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
            break;

          case t.TASK_NAME_RF08S_2X1NT:
            n = "计算三代卡";
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
            a.gotoReadFail(i.miniapp.AUTO_SCAN_NO_TAG_FOUND);
        }, 2e3);
    },
    onTagFound: function(t) {
        console.log("标签信息是 " + JSON.stringify(t));
        var e = this;
        "EM410x" == t.tag_type ? "" !== e.data.voiceData || (console.log("id44444444444" + e.data.voiceData), 
        e.setData({
            card_type: "ID卡",
            uid_hex: t.uid_hex,
            uid_10d: r.convertEM410x10HIDTo10D(t.uid_hex),
            voiceData: s.AUDIO_DINGDING
        })) : "" !== e.data.voiceData || e.setData({
            card_type: "IC卡",
            atqa: t.atqa_hex,
            sak: t.sak_hex,
            uid_hex: t.uid_hex,
            voiceData: s.AUDIO_DING
        }), setTimeout(function() {
            t.readable ? e.setPageStatus(1, function() {
                a.startReadTagAllData(e.onTagReadingProgress);
            }) : e.gotoReadFail(i.miniapp.TAG_NO_SUPPORT_READ);
        }, 1e3);
    },
    onSaveDumpToCardWallet: function() {
        this.data.dumpSaved ? n.showToast("此卡片已经保存了") : this.setData({
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
        if ("local" == (i = n.cloudOrLocal())) {
            var i;
            (i = n.saveCard("/", o)).isok ? (e.setData({
                canExit: !0,
                dumpSaved: !0,
                showDumpSaveDialog: !1
            }), n.showToast("保存成功！")) : n.showToast(i.message);
        } else {
            var s = a.createDumpInfoJsonFromMem();
            "" == o && n.createDefaultNickCloud(function(a) {}), n.saveDataToTheCloud(o, "", s, 1, "/", function(a) {
                1 == a.data.status ? (e.setData({
                    canExit: !0,
                    dumpSaved: !0,
                    showDumpSaveDialog: !1
                }), n.showToast(a.data.msg)) : n.showToast(a.data.msg);
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
        console.log("在读卡页面监听到设备断开连接！"), this.showToastNoIcon("设备断开连接"), 2 != this.data.pageStatus && this.gotoReadFail(i.miniapp.BLE_DEVICE_DISCONNECTED);
    },
    onBleComErrorCallback: function() {
        this.gotoReadFail(i.minicopy.BLE_COMMUNICATION_ERR);
    },
    onBleComTimeoutCallback: function() {
        this.gotoReadFail(i.miniapp.BLE_DEVICE_COM_TIMEOUT);
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
    onMF1FCHKProgressUpdateCallback: function(a, t) {
        e.getTagInformation().tag_type == e.TAG_TYPE_MF1_RF08S ? this.setData({
            fchkStatus: {
                show: !0,
                max: t,
                current: a
            }
        }) : this.setData({
            fchkStatus: {
                show: !1
            }
        });
    },
    onLoad: function(a) {
        t.registerOnAttackKeysCbk(this.onTagAttackCallback), o.registerOnBLEDisconnectedCallback(this.onDeviceDisconnectCallback), 
        c.onComErrCallback(this.onBleComErrorCallback), c.onTimeoutCallback(this.onBleComTimeoutCallback), 
        c.onTagErrorCallback(this.onTagErrorCallback), null != c.getDevice() && c.getReader(!0).registerOnFCHKProgressCallback(this.onMF1FCHKProgressUpdateCallback);
    },
    onUnload: function() {
        t.unregisterOnAttackKeysCbk(this.onTagAttackCallback), o.unregisterOnBLEDisconnectedCallback(this.onDeviceDisconnectCallback), 
        c.onComErrCallback(null), c.onTimeoutCallback(null), c.onTagErrorCallback(null), 
        null != c.getDevice() && c.getReader(!0).unregisterOnFCHKProgressCallback(this.onMF1FCHKProgressUpdateCallback);
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