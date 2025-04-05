var e = require("../../D6EF5C7155C842DFB08934760C65D685.js"), t = require("../../F9C23E6755C842DF9FA45660EB56D685.js"), a = require("../../DFE4D8E455C842DFB982B0E32585D685.js"), n = require("../../76F8096255C842DF109E616502B6D685.js");

Page({
    data: {
        showFWStatusLoading: !0,
        codeString: "",
        updateNotes: [],
        pageShow: 0,
        updatingMsg: "",
        updateFailMsg: "",
        canRetry: !0,
        fwStatusMsg: "",
        progress: 0,
        latestVerCode: 0,
        latestVerStr: ""
    },
    ota_data_cache: null,
    ble_device_id: null,
    next_can_enter_ota: !1,
    next_can_start_ota: !1,
    onUserBack: function(e) {
        2 == this.data.pageShow ? n.showToast("请耐心等待更新完成哦~") : 4 == this.data.pageShow ? n.showToast("为了避免数据错乱，请点击按钮退出小程序~") : e.detail.goBack();
    },
    showPageByIndex: function(e) {
        this.setData({
            pageShow: e
        });
    },
    showUpdateFail: function(e, t) {
        this.setData({
            pageShow: 3,
            updateFailMsg: e,
            canRetry: t
        });
    },
    checkUpdate: function() {
        var e = this, t = a.getDevice(), n = a.getSerial(), o = -1, i = "";
        t instanceof a.DeviceClass.MiniCopy && (o = t.device_firmware_ver_info.codeNumber, 
        i = t.device_firmware_ver_info.codeString), e.setData({
            showFWStatusLoading: !0,
            codeString: i
        }), wx.request({
            url: "".concat("https://rcopy.nikola-lab.cn/server1", "/openapi/firmware/check"),
            data: {
                serial: n,
                verCode: o
            },
            timeout: 5e3,
            dataType: "json",
            success: function(t) {
                var a = t.data;
                if (console.log(JSON.stringify(a)), 0 == a.code) {
                    var n = (a = a.result).latest_version;
                    n > o ? e.setData({
                        pageShow: 1,
                        updateNotes: a.firmware_notes
                    }) : e.setData({
                        pageShow: 0,
                        fwStatusMsg: "已是最新版本"
                    }), e.setData({
                        latestVerCode: n,
                        latestVerStr: "v".concat(n >> 8 & 255, ".").concat(255 & n)
                    });
                } else e.setData({
                    fwStatusMsg: "查询更新失败: ".concat(a.msg)
                });
            },
            fail: function() {
                e.setData({
                    fwStatusMsg: "查询更新失败，请检查网络设置"
                });
            },
            complete: function() {
                e.setData({
                    showFWStatusLoading: !1
                });
            }
        });
    },
    onStartUpdateBtnCall: function() {
        var e = this;
        wx.showModal({
            title: "警告",
            content: "更新前请确保：\r\n使用5v2a充电插头连接设备，不使用充电宝或者笔记本进行供电，并且确保更新途中电源连接稳定，中途断电会损坏设备，不做售后处理",
            cancelText: "取消更新",
            confirmText: "确认更新",
            success: function(t) {
                t.confirm && e.startUpdate();
            }
        });
    },
    onRestartUpdateBtnCall: function() {
        this.startUpdate();
    },
    startUpdate: function() {
        var e = this;
        null == e.ota_data_cache ? (e.setData({
            pageShow: 2,
            updatingMsg: "正在下载固件",
            progress: 0
        }), e.downloadFirmwareAndRead(function(t) {
            for (var a = new ArrayBuffer(t.data.byteLength), n = t.data, o = new Uint8Array(a), i = new Uint8Array(n), s = 0; s < i.length; s++) o[s] = i[s];
            var c = o.buffer;
            e.ota_data_cache = c, e.updateFromDataCache();
        })) : e.updateFromDataCache();
    },
    downloadFirmwareAndRead: function(e) {
        var t = this, n = a.getSerial(), o = this.data.latestVerCode, i = "".concat("https://rcopy.nikola-lab.cn/server1", "/openapi/firmware/download?verCode=").concat(o, "&serial=").concat(n);
        wx.downloadFile({
            url: i,
            timeout: 8e3,
            success: function(a) {
                switch (a.statusCode) {
                  case 200:
                    var n = wx.getFileSystemManager();
                    n.readFile({
                        filePath: a.tempFilePath,
                        success: e,
                        fail: function() {
                            t.showUpdateFail("读取固件失败", !0);
                        },
                        complete: function() {
                            n.removeSavedFile({
                                filePath: a.tempFilePath
                            });
                        }
                    });
                    break;

                  case 401:
                    t.showUpdateFail("无权下载此文件", !0);
                    break;

                  case 500:
                    t.showUpdateFail("服务器内部错误，请联系管理员。", !0);
                }
            },
            fail: function() {
                t.showUpdateFail("下载失败", !0);
            }
        }).onProgressUpdate(function(e) {
            t.setData({
                progress: e.progress
            });
        });
    },
    updateFromDataCache: function() {
        var n = t.getFrimwareInfo();
        if (this.setData({
            pageShow: 2,
            updatingMsg: "正在加载固件",
            progress: 0
        }), null == n) {
            var o = t.load(this.ota_data_cache);
            if (void 0 !== o) return this.ota_data_cache = null, console.log("固件加载失败: " + o), 
            void this.showUpdateFail("固件加载失败", !0);
            n = t.getFrimwareInfo(), console.log("OTA固件中的信息: " + JSON.stringify(n));
        }
        var i = e.getAddressByConnection();
        null != i || null != this.ble_device_id ? (null == i ? i = this.ble_device_id : this.ble_device_id = i, 
        this.next_can_enter_ota = !0, e.hasDeviceConnected() ? (e.setAuthRediscoveryEnable(!1), 
        a.disconnectExistsDevice(), console.log("开始断开来自于NFCAPI库的连接。")) : this.connectToOTALibraryAndStart()) : this.showUpdateFail("不允许未建立连接就发起更新！", !0);
    },
    showUpdatingMsg: function(e) {
        this.setData({
            pageShow: 2,
            updatingMsg: e
        });
    },
    connectToOTALibraryAndStart: function() {
        var e = this;
        e.next_can_enter_ota && (e.setData({
            pageShow: 2,
            updatingMsg: "正在将设备连接到更新器",
            progress: 0
        }), e.next_can_enter_ota = !1, e.next_can_start_ota = !0, t.deviceDisconnect(), 
        t.deviceConnect({
            deviceId: e.ble_device_id,
            connected: function(a) {
                console.log("欲OTA的设备已经连接: " + JSON.stringify(a)), e.next_can_start_ota && (e.next_can_start_ota = !1, 
                console.log("将会自动启动OTA过程！"), e.showUpdatingMsg("正在更新固件"), t.startUpdate({
                    rebootMode: 2,
                    progress: function(t) {
                        if (t.txSize >= t.frimSize) e.showPageByIndex(4); else {
                            var a = Math.round(t.txSize / t.frimSize * 100);
                            a != e.data.progress && e.setData({
                                pageShow: 2,
                                progress: a
                            });
                        }
                    },
                    fail: function(t) {
                        e.showUpdateFail("更新失败: " + t.errMsg, !0);
                    }
                }));
            },
            disconnected: function() {
                console.log("设备已断开");
            },
            fail: function(t) {
                e.showUpdateFail("连接设备到更新器失败", !0);
            }
        }));
    },
    onBLEDisconnectedCallback: function() {
        console.log("断开来自于NFCAPI库的连接完成。"), this.connectToOTALibraryAndStart();
    },
    onRestartMiniProgramCall: function() {
        wx.exitMiniProgram({
            success: function() {
                console.log("退出完成！");
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    onLoad: function() {
        wx.setKeepScreenOn({
            keepScreenOn: !0
        }), e.registerOnBLEDisconnectedCallback(this.onBLEDisconnectedCallback), this.checkUpdate();
    },
    onUnload: function() {
        wx.setKeepScreenOn({
            keepScreenOn: !1
        }), e.unregisterOnBLEDisconnectedCallback(this.onBLEDisconnectedCallback), e.setAuthRediscoveryEnable(!0);
    }
});