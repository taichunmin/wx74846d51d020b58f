var e, t = (e = require("@vant/weapp/dialog/dialog")) && e.__esModule ? e : {
    default: e
};

var a = require("../../76F8096255C842DF109E616502B6D685.js"), o = require("../../AB5D946455C842DFCD3BFC63A316D685.js"), n = (require("../../53CD6E9355C842DF35AB0694BD16D685.js"), 
require("../../D6EF5C7155C842DFB08934760C65D685.js")), s = require("../../A781651255C842DFC1E70D15E296D685.js");

Page({
    data: {
        show: !1,
        current_choose: "",
        sheet_title: "",
        sheet: [ {
            text: "云端",
            checked: !1
        }, {
            text: "本地",
            checked: !1
        } ],
        phone: "",
        item_name: "",
        CacheItemName: "",
        defaultExpertMode: "",
        saveKeyStore: "",
        voiceTip: !1,
        lockUFUIDEnable: !0,
        detectGDMTag: !0,
        noCheckBLEAndGPS: !1,
        writeQinLin88Tag: !0,
        autoWrite71BTag16Sector: !0
    },
    firmwareUpdate: function() {
        n.hasDeviceConnected() ? wx.navigateTo({
            url: "/pages/device-firmware-update/index"
        }) : a.showToast("设备没有连接");
    },
    turnOnExpertMode: function(e) {
        var t = e.detail;
        this.setData({
            defaultExpertMode: t
        }), wx.setStorageSync("turnOnExpertMode", t);
    },
    onLockUFUIDEnableChange: function(e) {
        var t = e.detail;
        o.setAutoUpLockUFUIDTagEnable(t), this.setData({
            lockUFUIDEnable: t
        }), console.log("切换锁定ufuid的使能状态完成：".concat(t));
    },
    onDetectGDMTagEnableChange: function(e) {
        var t = e.detail;
        o.setAutoDetectGDMTagEnable(t), this.setData({
            detectGDMTag: t
        }), console.log("切换自动侦测GDM卡的使能状态完成：".concat(t));
    },
    onWriteQinLin88TagEnableChange: function(e) {
        var t = e.detail;
        o.setAutoWriteQinLin88TagEnable(t), this.setData({
            writeQinLin88Tag: t
        });
    },
    onWrite71BTagAutoWrite16Sector: function(e) {
        var t = e.detail;
        o.setAutoWrite71BTag16SectorEnable(t), this.setData({
            autoWrite71BTag16Sector: t
        });
    },
    onBluetoothAndGPSNoCheckEnableChange: function(e) {
        var t = e.detail;
        a.setBluetoothAndGPSNoCheckEnable(t), this.setData({
            noCheckBLEAndGPS: t
        }), console.log("切换禁用蓝牙和GPS设置检查使能状态完成：".concat(t));
    },
    sheetShow: function() {
        this.setData({
            show: !0,
            current_choose: "saveCardData",
            sheet_title: "卡片数据保存位置"
        });
    },
    turnOnSaveKeyStore: function() {
        this.setData({
            show: !0,
            current_choose: "keyStore",
            sheet_title: "密钥库保存位置"
        });
    },
    cancel: function() {
        this.setData({
            show: !1
        });
    },
    savePosition: function(e, t) {
        "saveCardData" == this.data.current_choose ? (wx.setStorageSync("saveAddress", e), 
        this.setData({
            show: !1,
            item_name: t
        })) : (wx.setStorageSync("keyStory", e), this.setData({
            show: !1,
            CacheItemName: t
        }));
    },
    getradio: function(e) {
        var o = this;
        if (1 == a.isLogin()) {
            console.log("已经登录了");
            for (var n = e.currentTarget.dataset.id, i = this.data.sheet, c = 0; c < i.length; c++) this.data.sheet[c].checked = !1;
            this.data.sheet[n].checked = !0, this.setData({
                sheet: this.data.sheet
            });
            for (var r, l, h = -1, u = 0; u < i.length; u++) if (i[u].checked) {
                h = u;
                break;
            }
            if (-1 == h) console.log("啥都没选"); else if (0 == h) if (r = "云端", l = "cloud", this.savePosition(l, r), 
            "saveCardData" == this.data.current_choose) {
                var d = a.getDumpNicks();
                Object.keys(d).length <= 0 ? a.showToast("本地没有数据需要保存到云端") : (a.localDataSaveCloud(function(e) {
                    console.log("本地的数据保存到云端返回的状态是" + JSON.stringify(e)), 1 == e.data.status ? (a.removeLocalDataStorage(), 
                    a.showToast(e.data.msg)) : a.showToast(e.data.msg);
                }), s.localFolderDataSaveCloud(function(e) {
                    console.log("上传文件夹返回的信息  " + JSON.stringify(e)), e.data.status, a.showToast(e.data.msg);
                }));
            } else a.saveKeysMf1User(null), a.saveReadCardHistory("All", null); else t.default.confirm({
                message: "切换回本地之后，我们将删除您在云端的数据，以此保护您的隐私。如果您后续清除小程序缓存或者删除小程序会丢失数据，您确认要将数据迁移回本地吗？"
            }).then(function() {
                r = "本地", l = "local", "saveCardData" == o.data.current_choose ? (a.cloudDataSaveToLocal(), 
                setTimeout(function() {
                    s.cloudFolderDataSaveLocal(function(e) {
                        1 == e.data.status && a.showToast("数据迁移成功");
                    });
                }, 500)) : (a.mf1UserSaveToLocal(), a.rCCHSaveToLocal()), o.savePosition(l, r);
            }).catch(function() {});
        } else a.loginToast();
    },
    onShow: function() {
        s.initData();
        var e = a.cloudOrLocal("cloudOrLocal", {});
        Object.keys(e).length <= 0 ? this.setData({
            item_name: "本地"
        }) : "cloud" == e ? this.setData({
            item_name: "云端"
        }) : "local" == e && this.setData({
            item_name: "本地"
        });
        var t = a.keyStoryPosition();
        "local" == t ? (wx.setStorageSync("keyStory", "local"), this.setData({
            CacheItemName: "本地"
        })) : "cloud" == t && this.setData({
            CacheItemName: "云端"
        }), this.setData({
            phone: a.getPhone(),
            defaultExpertMode: o.getStorageSyncHasDefault("turnOnExpertMode", {}),
            voiceTip: o.getStorageSyncHasDefault("turnOnVoiceTip", {}),
            lockUFUIDEnable: o.isAutoUplockUFUIDTagEnable(),
            detectGDMTag: o.isAutoDetectGDMTagEnable(),
            noCheckBLEAndGPS: a.isBluetoothAndGPSNoCheckEnable(),
            writeQinLin88Tag: o.isAutoWriteQinLin88TagEnable(),
            autoWrite71BTag16Sector: o.isAutoWrite71BTag16SectorEnable()
        });
    }
});