var e = require("../../04AF9D0355C842DF62C9F50458A585D7.js"), t = require("../../275D798255C842DF413B1185FE3585D7.js"), a = require("../../8462214255C842DFE2044945663685D7.js"), n = require("../../306D78F255C842DF560B10F52E4585D7.js"), i = require("../../A3859AB555C842DFC5E3F2B2FA5585D7.js");

Page({
    data: {
        configEnable: {
            readResponse: {
                title: "等待应答",
                enable: !0,
                key: "readResponse"
            },
            appendCRC: {
                title: "追加CRC",
                enable: !0,
                key: "appendCRC"
            },
            bitsFrame: {
                title: "比特帧模式",
                enable: !1,
                key: "bitsFrame"
            },
            autoSelect: {
                title: "发送数据前自动选卡",
                enable: !1,
                key: "autoSelect"
            },
            keepField: {
                title: "发送数据后保持射频",
                enable: !1,
                key: "keepField"
            },
            checkRespCRC: {
                title: "收到数据后校验CRC",
                enable: !1,
                key: "checkRespCRC"
            }
        },
        configInput: {
            bitsNumber: {
                enable: !1,
                title: "结尾字节发几个比特",
                placeholder: "大于0个，小于8个比特。",
                value: 7,
                maxlength: 1,
                key: "bitsNumber"
            },
            respTimeout: {
                enable: !0,
                title: "读取超时(ms)",
                placeholder: "上限5000（五秒）",
                value: 100,
                maxlength: 4,
                key: "respTimeout"
            }
        },
        inputPosition: {
            inputData: null,
            inputCount: null,
            inputDelay: null
        },
        responseData: [],
        showViewMask: !1,
        hexDataSendValue: "",
        autoClearMaxValue: 10,
        sending: !1,
        autoSendConfig: {
            enable: !1,
            max: 9999,
            delay: 1e3,
            count: 0
        }
    },
    onConfigEnableChange: function(e) {
        var t = e.currentTarget.dataset.key, a = this.data.configEnable[t].enable;
        switch (this.data.configEnable[t].enable = !a, t) {
          case this.data.configEnable.appendCRC.key:
          case this.data.configEnable.bitsFrame.key:
            t == this.data.configEnable.appendCRC.key ? this.data.configEnable.bitsFrame.enable = !1 : this.data.configEnable.appendCRC.enable = !1;
        }
        this.data.configInput.respTimeout.enable = this.data.configEnable.readResponse.enable, 
        this.data.configInput.bitsNumber.enable = this.data.configEnable.bitsFrame.enable, 
        this.setData({
            configEnable: this.data.configEnable,
            configInput: this.data.configInput
        });
    },
    onConfigValueInput: function(e) {
        var t = e.detail.value, a = e.currentTarget.dataset.key;
        this.data.configInput[a].value = t, this.setData({
            configInput: this.data.configInput
        });
    },
    onConfigAutoSendEnableChange: function() {
        var e = this.data.autoSendConfig.enable;
        this.data.autoSendConfig.enable = !e, this.setData({
            autoSendConfig: this.data.autoSendConfig
        });
    },
    onConfigAutoSendValueInput: function(e) {
        var t = e.detail.value, a = e.currentTarget.dataset.key;
        this.data.autoSendConfig[a] = parseInt(t), this.setData({
            autoSendConfig: this.data.autoSendConfig
        });
    },
    onInputWidgetFocusCall: function(e) {
        if (e.detail.height) {
            var t = e.currentTarget.dataset.id, a = e.detail.height, n = "position: absolute; bottom: ".concat(a + 12, "px; background: #222426; z-index: 3;");
            n != this.data.inputPosition && (this.data.inputPosition[t] = n, this.setData({
                inputPosition: this.data.inputPosition,
                showViewMask: !0
            }));
        }
    },
    onInputWidgetBlurCall: function(e) {
        var t = e.currentTarget.dataset.id;
        this.data.inputPosition[t] = null, this.setData({
            inputPosition: this.data.inputPosition,
            showViewMask: !1
        });
    },
    onAutoClearDataRecvMax: function(e) {
        var t = e.detail.value;
        this.setData({
            autoClearMaxValue: parseInt(t)
        });
    },
    getNowFormatDate: function() {
        var e = new Date();
        return "".concat(e.getFullYear(), "-").concat(e.getMonth() + 1, "-").concat(e.getDate(), " ").concat(e.getHours(), ":").concat(e.getMinutes(), ":").concat(e.getSeconds());
    },
    onHexTagDataInput: function(e) {
        var t = e.detail.value;
        this.setData({
            hexDataSendValue: t
        });
    },
    parseInput2HexDataBytes: function() {
        for (var e = this.data.hexDataSendValue, t = "", a = 0; a < e.length; a++) {
            var i = e[a];
            /[a-fA-F0-9]/.test(i) && (t += i);
        }
        return 0 == t.length || t.length > 128 || t.length % 2 != 0 ? [] : n.hex2bytes(t);
    },
    scrolleRespView2Bottom: function() {
        var e = this;
        wx.createSelectorQuery().select("#viewResponseDataList").boundingClientRect(function(t) {
            e.setData({
                scrollTop: t.height
            });
        }).exec();
    },
    onClearListClickCall: function() {
        this.setData({
            responseData: []
        });
    },
    appendDataResult2View: function(e) {
        this.data.responseData.length + 1 > this.data.autoClearMaxValue && (this.data.responseData.length = 0), 
        this.data.responseData.push(e), this.setData({
            responseData: this.data.responseData
        }), this.scrolleRespView2Bottom();
    },
    onSendDataClickCall: function() {
        if (this.data.sending) a.showToast("请先稍等之前的任务执行完成哦~"); else {
            var s = this, o = new i.Raw14aArgs();
            if (o.readResponse = this.data.configEnable.readResponse.enable, o.appendCRC = this.data.configEnable.appendCRC.enable, 
            o.bitsFrame = this.data.configEnable.bitsFrame.enable, o.autoSelect = this.data.configEnable.autoSelect.enable, 
            o.keepField = this.data.configEnable.keepField.enable, o.checkRespCRC = this.data.configEnable.checkRespCRC.enable, 
            o.bitsNumber = parseInt(this.data.configInput.bitsNumber.value), o.bitsNumber > 8 || o.bitsNumber < 1) a.showToast("比特帧模式下，允许最多8个比特，最少1个比特"); else if (o.respTimeout = parseInt(this.data.configInput.respTimeout.value), 
            o.respTimeout > 5e3 || o.respTimeout < 1) a.showToast("读取超时只允许 1ms - 5000ms"); else {
                var l = s.parseInput2HexDataBytes();
                if (0 != l.length) if (t.hasDeviceConnected()) {
                    i.getReader(!1).request14443ARAWCommand(o, l, function t(a) {
                        var u = {
                            date: s.getNowFormatDate(),
                            result: e.getMsg(a.status),
                            data: a.data ? n.bytes2hex(a.data) : "无应答"
                        };
                        if (s.appendDataResult2View(u), s.data.autoSendConfig.enable) {
                            var d = s.data.autoSendConfig.max;
                            s.data.autoSendConfig.count > d ? s.setData({
                                sending: !1
                            }) : (s.setData({
                                "autoSendConfig.count": s.data.autoSendConfig.count + 1
                            }), setTimeout(function() {
                                i.getReader(!1).request14443ARAWCommand(o, l, t);
                            }, s.data.autoSendConfig.delay));
                        } else s.setData({
                            sending: !1
                        });
                    }), s.setData({
                        sending: !0,
                        "autoSendConfig.count": 0
                    });
                } else s.appendDataResult2View({
                    date: s.getNowFormatDate(),
                    result: "蓝牙已断开",
                    data: "请重新连接蓝牙后再继续操作"
                }); else a.showToast("请确保要发送的数据输入正确！");
            }
        }
    },
    onUserBack: function(e) {
        console.log("返回事件被14A RAW界面拦截处理");
        this.data.sending ? a.showToast("请等待或者结束任务执行") : e.detail.goBack();
    },
    btnDevUnfinish: function() {
        a.showToast("此功能尚未开发完成");
    },
    onLoad: function(e) {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});