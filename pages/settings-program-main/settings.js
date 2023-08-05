var e = (0, require("../../@babel/runtime/helpers/interopRequireDefault").default)(require("@vant/weapp/dialog/dialog")), t = require("../../8462214255C842DFE2044945663685D7.js"), a = require("../../6B5F0E3755C842DF0D39663027C585D7.js"), o = (require("../../9434A3B355C842DFF252CBB492D585D7.js"), 
require("../../275D798255C842DF413B1185FE3585D7.js"));

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
        o.hasDeviceConnected() ? wx.navigateTo({
            url: "/pages/device-firmware-update/index"
        }) : t.showToast("设备没有连接");
    },
    turnOnExpertMode: function(e) {
        var t = e.detail;
        this.setData({
            defaultExpertMode: t
        }), wx.setStorageSync("turnOnExpertMode", t);
    },
    onLockUFUIDEnableChange: function(e) {
        var t = e.detail;
        a.setAutoUpLockUFUIDTagEnable(t), this.setData({
            lockUFUIDEnable: t
        }), console.log("切换锁定ufuid的使能状态完成：".concat(t));
    },
    onDetectGDMTagEnableChange: function(e) {
        var t = e.detail;
        a.setAutoDetectGDMTagEnable(t), this.setData({
            detectGDMTag: t
        }), console.log("切换自动侦测GDM卡的使能状态完成：".concat(t));
    },
    onWriteQinLin88TagEnableChange: function(e) {
        var t = e.detail;
        a.setAutoWriteQinLin88TagEnable(t), this.setData({
            writeQinLin88Tag: t
        });
    },
    onWrite71BTagAutoWrite16Sector: function(e) {
        var t = e.detail;
        a.setAutoWrite71BTag16SectorEnable(t), this.setData({
            autoWrite71BTag16Sector: t
        });
    },
    onBluetoothAndGPSNoCheckEnableChange: function(e) {
        var a = e.detail;
        t.setBluetoothAndGPSNoCheckEnable(a), this.setData({
            noCheckBLEAndGPS: a
        }), console.log("切换禁用蓝牙和GPS设置检查使能状态完成：".concat(a));
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
    getradio: function(a) {
        var o = this;
        if (1 == t.isLogin()) {
            console.log("已经登录了");
            for (var n = a.currentTarget.dataset.id, i = this.data.sheet, s = 0; s < i.length; s++) this.data.sheet[s].checked = !1;
            this.data.sheet[n].checked = !0, this.setData({
                sheet: this.data.sheet
            });
            for (var c, r, l = -1, h = 0; h < i.length; h++) if (i[h].checked) {
                l = h;
                break;
            }
            if (-1 == l) console.log("啥都没选"); else if (0 == l) if (c = "云端", r = "cloud", this.savePosition(r, c), 
            "saveCardData" == this.data.current_choose) {
                var u = t.getDumpNicks();
                Object.keys(u).length <= 0 ? t.showToast("本地没有数据需要保存到云端") : t.localDataSaveCloud(function(e) {
                    console.log("本地的数据保存到云端返回的状态是" + e), 1 == e ? (t.removeLocalDataStorage(), t.showToast("本地数据成功迁移到云端！")) : console.log("本地数据在云端已经存在，没有任何更新");
                });
            } else t.saveKeysMf1User(null), t.saveReadCardHistory("All", null); else e.default.confirm({
                message: "切换回本地之后，我们将删除您在云端的数据，以此保护您的隐私。如果您后续清除小程序缓存或者删除小程序会丢失数据，您确认要将数据迁移回本地吗？"
            }).then(function() {
                c = "本地", r = "local", "saveCardData" == o.data.current_choose ? t.cloudDataSaveToLocal() : (t.mf1UserSaveToLocal(), 
                t.rCCHSaveToLocal()), o.savePosition(r, c);
            }).catch(function() {});
        } else t.loginToast();
    },
    onShow: function() {
        var e = t.cloudOrLocal("cloudOrLocal", {});
        Object.keys(e).length <= 0 ? this.setData({
            item_name: "本地"
        }) : "cloud" == e ? this.setData({
            item_name: "云端"
        }) : "local" == e && this.setData({
            item_name: "本地"
        });
        var o = t.keyStoryPosition();
        "local" == o ? (wx.setStorageSync("keyStory", "local"), this.setData({
            CacheItemName: "本地"
        })) : "cloud" == o && this.setData({
            CacheItemName: "云端"
        }), this.setData({
            phone: t.getPhone(),
            defaultExpertMode: a.getStorageSyncHasDefault("turnOnExpertMode", {}),
            voiceTip: a.getStorageSyncHasDefault("turnOnVoiceTip", {}),
            lockUFUIDEnable: a.isAutoUplockUFUIDTagEnable(),
            detectGDMTag: a.isAutoDetectGDMTagEnable(),
            noCheckBLEAndGPS: t.isBluetoothAndGPSNoCheckEnable(),
            writeQinLin88Tag: a.isAutoWriteQinLin88TagEnable(),
            autoWrite71BTag16Sector: a.isAutoWrite71BTag16SectorEnable()
        });
    }
});