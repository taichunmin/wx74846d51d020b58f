var e = require("../../275D798255C842DF413B1185FE3585D7.js"), t = require("../../43635B5055C842DF2505335752E585D7.js"), i = require("../../6B5F0E3755C842DF0D39663027C585D7.js"), o = require("../../8E76785255C842DFE810105557B585D7.js"), r = require("../../8462214255C842DFE2044945663685D7.js"), a = require("../../1B8F0B7555C842DF7DE96372984685D7.js"), c = require("../../A3859AB555C842DFC5E3F2B2FA5585D7.js");

Page({
    data: {
        progressStep: 0,
        cardNumber: "",
        circleWidth: "",
        smallCircleWidth: "",
        voiceData: ""
    },
    successCodeList: [],
    timerIDGotoWriteSuccess: -1,
    timerIDGotoWriteFailure: -1,
    gotoWriteFailure: function(e) {
        this.timerIDGotoWriteFailure = setTimeout(function() {
            wx.redirectTo({
                url: "/pages/device-card-write-fail/fail?status=" + e
            });
        }, 1e3);
    },
    gotoWriteSuccess: function(e) {
        var t = "/pages/device-card-write-success/success";
        null != e && (t += "?status=".concat(e)), this.timerIDGotoWriteSuccess = setTimeout(function() {
            wx.redirectTo({
                url: t
            });
        }, 2e3);
    },
    clearGotoWriteResultTimer: function() {
        clearTimeout(this.timerIDGotoWriteSuccess), clearTimeout(this.timerIDGotoWriteFailure);
    },
    onTagErrorCallback: function(e) {
        e in this.successCodeList ? this.gotoWriteSuccess(e) : this.gotoWriteFailure(e);
    },
    onDeviceDisconnectCallback: function(e) {
        console.log("在读卡页面监听到设备断开连接！"), this.gotoWriteFailure(o.miniapp.BLE_DEVICE_DISCONNECTED);
    },
    onBleComErrorCallback: function() {
        this.gotoWriteFailure(o.minicopy.BLE_COMMUNICATION_ERR);
    },
    onBleComTimeoutCallback: function() {
        this.gotoWriteFailure(o.miniapp.BLE_DEVICE_COM_TIMEOUT);
    },
    onWriteCardProgressCall: function(e) {
        "" !== this.data.voiceData || this.setData({
            voiceData: a.AUDIO_WRITING_CARD
        }), this.setData({
            progressStep: Math.round(e)
        }), 100 == e && this.gotoWriteSuccess();
    },
    onUserBack: function(e) {
        r.showToast("请先等待写卡完成哦~");
    },
    onShow: function() {
        var e = t.getTagInformation(), o = 128 * (wx.getSystemInfoSync().windowWidth / 750), r = o / 75 * 61;
        console.log("屏幕高度是" + o), this.setData({
            circleWidth: o,
            smallCircleWidth: r,
            cardNumber: e.uid_hex
        }, function() {
            i.startWriteCardDatas(this.onWriteCardProgressCall);
        }), this.setData({
            voiceData: ""
        });
    },
    onLoad: function(t) {
        e.registerOnBLEDisconnectedCallback(this.onDeviceDisconnectCallback), c.onComErrCallback(this.onBleComErrorCallback), 
        c.onTimeoutCallback(this.onBleComTimeoutCallback), c.onTagErrorCallback(this.onTagErrorCallback);
    },
    onUnload: function() {
        this.clearGotoWriteResultTimer(), e.unregisterOnBLEDisconnectedCallback(this.onDeviceDisconnectCallback), 
        c.onComErrCallback(null), c.onTimeoutCallback(null), c.onTagErrorCallback(null);
    }
});