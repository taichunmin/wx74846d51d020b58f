var e = require("../../D6EF5C7155C842DFB08934760C65D685.js"), t = require("../../614DB8F055C842DF072BD0F70136D685.js"), i = require("../../AB5D946455C842DFCD3BFC63A316D685.js"), o = require("../../8896821655C842DFEEF0EA119506D685.js"), r = require("../../76F8096255C842DF109E616502B6D685.js"), a = require("../../1D91D49255C842DF7BF7BC9565C6D685.js"), c = require("../../DFE4D8E455C842DFB982B0E32585D685.js");

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