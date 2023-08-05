var e = require("../../6B5F0E3755C842DF0D39663027C585D7.js"), t = require("../../275D798255C842DF413B1185FE3585D7.js"), i = require("../../8462214255C842DFE2044945663685D7.js"), c = require("../../306D78F255C842DF560B10F52E4585D7.js"), n = require("../../A3859AB555C842DFC5E3F2B2FA5585D7.js"), a = require("../../9C37ADA155C842DFFA51C5A618F585D7.js"), o = require("../../A4B4ED0255C842DFC2D285056D6585D7.js"), s = !0, l = !0, r = !0, u = -1, d = !1, h = !1;

Page({
    data: {
        pageStatus: 0,
        isAuthorizeLost: !1,
        systemSettingsLostList: [],
        showFindDialog: !1,
        deviceSelected: null,
        deviceNameConnected: "",
        sendVip: !0,
        activity_type: "",
        btnText: "",
        device3DImageFilePath: "",
        deviceStaticImageFilePath: ""
    },
    setPageStatus: function(e, t) {
        this.setData({
            pageStatus: e
        }, t);
    },
    setAuthorizeLost: function() {
        this.setData({
            pageStatus: 1,
            isAuthorizeLost: !0
        });
    },
    setSystemSettingsLost: function(e, t) {
        this.setData({
            pageStatus: 1,
            isAuthorizeLost: !1,
            systemSettingsLostList: e
        }, t);
    },
    onSendVipConfirm: function() {
        var e = this;
        i.sendVip(this.data.activity_type, function(t) {
            "更新成功" == t.data && (e.setData({
                sendVip: !0
            }), i.showToast("已经领取"));
        });
    },
    onUserDisconnectClick: function() {
        wx.showModal({
            title: "提示",
            content: "确定断开连接吗？",
            success: function(e) {
                e.confirm && n.disconnectExistsDevice();
            }
        });
    },
    onGotoReadTagClick: function() {
        1 == e.getStorageSyncHasDefault("turnOnExpertMode", {}) ? wx.navigateTo({
            url: "/pages/device-master-mode/index"
        }) : wx.navigateTo({
            url: "/pages/device-card-reading/reading"
        });
    },
    onCloseDeviceFoundDialog: function() {
        this.setData({
            showFindDialog: !1
        });
    },
    loadDevice3DImageToShow: function() {
        var e = this, t = o.IMG_DEVICE_STATIC_ENTITY[this.data.deviceSelected.deviceAdvDeviceType];
        null != t ? this.setData({
            device3DImageFilePath: t.url,
            deviceStaticImageFilePath: t.url
        }) : console.error("显示静态设备平面图时发现该设备映射的类型不存在: " + this.data.deviceSelected.deviceAdvDeviceType);
        var c = o.IMG_DEVICE_ROTATE_3D_GIF[this.data.deviceSelected.deviceAdvDeviceType];
        null != c ? i.pullImageAndCache(c.name, c.url, function(t) {
            e.setData({
                device3DImageFilePath: t
            });
        }) : console.error("显示3D旋转图时发现该设备映射的类型不存在: " + this.data.deviceSelected.deviceAdvDeviceType);
    },
    onBLEAdapterErrorCall: function(e) {
        console.log("在主页面初始化蓝牙适配器遇到的问题" + JSON.stringify(e)), i.processBLEError(e), 10003 == e.errCode && (this.createResourceCheckTimer(), 
        this.setData({
            showFindDialog: !0
        }), this.loadDevice3DImageToShow());
    },
    onBLEDeviceFoundCallback: function(e) {
        if (r) {
            if (console.log("需要重新选定设备: " + JSON.stringify(e)), n.DeviceClass.MiniCopy.isThisMe(e) && (r = !1, 
            this.setData({
                showFindDialog: !0,
                deviceSelected: e
            }), this.loadDevice3DImageToShow()), a.isThisMe(e)) {
                var t = new Uint8Array(e.advertisData), i = a.parseManufacturerData(t), c = "发现了一个可以OTA的变色龙52设备，其信息是：" + "".concat(JSON.stringify(i));
                wx.showModal({
                    title: "测试",
                    content: c,
                    showCancel: !1
                });
            }
        } else console.log("不需要重新选定设备");
    },
    onBLEDeviceUpdateCallback: function(e, t) {
        r || c.isSameBleNFCMiniCopyDevice(e, this.data.deviceSelected) && this.setData({
            deviceSelected: t
        });
    },
    onBLEDeviceRemoveCallback: function(e) {
        console.log("设备被移除了: " + JSON.stringify(e)), r || e.deviceId == this.data.deviceSelected.deviceId && (r = !0, 
        this.setData({
            showFindDialog: !1,
            deviceSelected: null
        }));
    },
    connectFirstDevice: function() {
        if (t.isLeAdapterInitialized()) {
            if (1 != i.isLogin(this)) return console.log("未登录"), i.login(this), !1;
            console.log("已经登录"), this.cancelResourceCheckTimer(), wx.showLoading({
                title: "正在连接中"
            });
            var e = this.data.deviceSelected;
            n.connectAutoCheckDevice(e);
        } else i.showToast("检测到蓝牙没有打开哦~");
    },
    updateStatusIfBLEDisconnected: function() {
        2 != this.data.pageStatus && (this.setPageStatus(0), l = !0, this.createResourceCheckTimer());
    },
    onBLEDeviceDisconnectCallback: function() {
        this.updateStatusIfBLEDisconnected();
    },
    updateStatusIfBLEConnected: function() {
        var e = t.getDeviceNameByConnection();
        if (3 != this.data.pageStatus) {
            l = !1, t.closeBLEDevicesScanner(), this.setPageStatus(3), this.setData({
                deviceNameConnected: e,
                showFindDialog: !1
            }), wx.hideLoading({
                success: function(e) {
                    wx.showToast({
                        title: "连接成功！",
                        icon: "success",
                        duration: 1e3
                    });
                }
            });
            var c = n.getSerial();
            i.isSVIPDevice(c), i.checkActivity(this), i.deviceConnectRecord(c);
        } else t.hasDeviceConnected() && this.setData({
            deviceNameConnected: e
        });
    },
    onBLEDeviceConnectCallback: function() {
        this.updateStatusIfBLEConnected();
    },
    onBLEAdapterInitOkCallback: function() {
        console.log("蓝牙适配器已经被初始化了，将会自动启动设备扫描。"), this.setPageStatus(2), setTimeout(function() {
            t.startBLEDevicesScanner();
        }, 500);
    },
    createResourceCheckTimer: function() {
        var e = this;
        u = setTimeout(function() {
            e.onTimerCheckResourceCall();
        }, 2e3);
    },
    onTimerCheckResourceCall: function() {
        var e = this;
        this.checkSystemSettings(function() {
            s ? (s = !1, t.isLeAdapterInitialized() ? t.closeBLEDevicesAdapter(function() {
                setTimeout(function() {
                    t.startBLEDevicesAdapter(e.onBLEAdapterInitOkCallback);
                }, 500);
            }) : t.startBLEDevicesAdapter(e.onBLEAdapterInitOkCallback)) : t.hasDeviceConnected() ? e.setPageStatus(3) : e.setPageStatus(2), 
            l ? e.createResourceCheckTimer() : console.log("不需要继续检查资源完整性，将不会再次启动检测定时器。");
        }, function() {
            e.createResourceCheckTimer(), s = !0;
        });
    },
    onOpenAppAuthorizeSettingClick: function() {
        wx.openAppAuthorizeSetting();
    },
    onOpenSystemBluetoothSettingClick: function() {
        wx.openSystemBluetoothSetting();
    },
    checkSystemSettings: function(e, t) {
        var c = wx.getSystemInfoSync(), n = [], a = {
            title: "打开手机蓝牙",
            success: c.bluetoothEnabled
        };
        switch (c.platform) {
          case "ios":
            var o = "denied" != wx.getAppAuthorizeSetting().bluetoothAuthorized;
            o && n.push(a), n.push({
                title: "打开微信蓝牙权限",
                success: o,
                click: "onOpenAppAuthorizeSettingClick"
            });
            break;

          case "android":
            a.click = "onOpenSystemBluetoothSettingClick", n.push(a), n.push({
                title: "打开手机定位",
                success: c.locationEnabled
            }), n.push({
                title: "打开微信定位权限",
                success: c.locationAuthorized,
                click: "onOpenAppAuthorizeSettingClick"
            });
            break;

          case "mac":
            a.click = "onOpenSystemBluetoothSettingClick", n.push(a);
        }
        var s = !0;
        for (var l in n) if (!n[l].success) {
            s = !1;
            break;
        }
        s || i.isBluetoothAndGPSNoCheckEnable() ? (i.isBluetoothAndGPSNoCheckEnable() && this.setPageStatus(2), 
        e()) : (this.setSystemSettingsLost(n), t());
    },
    checkMiniProgramSettings: function(e, t) {
        "WeChat" == i.systemInfo.mpenv ? wx.authorize({
            scope: "scope.bluetooth",
            success: e,
            fail: function(e) {
                console.log("wx.authorize 接口调用错误: " + JSON.stringify(e)), t();
            }
        }) : e();
    },
    onUserTryReAuthorizeCallback: function() {
        var e = this;
        wx.openSetting({
            success: function(t) {
                t.authSetting["scope.bluetooth"] ? (console.log("用户已经授予小程序蓝牙权限，将继续检查其他的系统资源完整性..."), 
                d = !0, e.onTimerCheckResourceCall()) : wx.showToast({
                    icon: "none",
                    title: "请勾选允许使用蓝牙"
                });
            }
        });
    },
    onShow: function() {
        var c = e.getStorageSyncHasDefault("turnOnExpertMode", {});
        1 == c ? this.setData({
            btnText: "专家模式"
        }) : (0 == c || Object.keys(c).length <= 0) && this.setData({
            btnText: "开始读卡"
        }), i.defaultSave(), h || (t.onBLEDeviceErrCallback(this.onBLEAdapterErrorCall), 
        t.registerDeviceFoundCallback(this.onBLEDeviceFoundCallback), t.registerDeviceUpdatedCallback(this.onBLEDeviceUpdateCallback), 
        t.registerDeviceRemovedCallback(this.onBLEDeviceRemoveCallback), t.registerOnBLEConnectedCallback(this.onBLEDeviceConnectCallback), 
        t.registerOnBLEDisconnectedCallback(this.onBLEDeviceDisconnectCallback), h = !0), 
        d && (-1 == u && this.onTimerCheckResourceCall(), t.hasDeviceConnected() ? this.updateStatusIfBLEConnected() : this.updateStatusIfBLEDisconnected());
    },
    beforeRouteChange: function() {
        t.onBLEDeviceErrCallback(null), t.unregisterDeviceFoundCallback(this.onBLEDeviceFoundCallback), 
        t.unregisterDeviceUpdatedCallback(this.onBLEDeviceUpdateCallback), t.unregisterDeviceRemovedCallback(this.onBLEDeviceRemoveCallback), 
        t.unregisterOnBLEConnectedCallback(this.onBLEDeviceConnectCallback), t.unregisterOnBLEDisconnectedCallback(this.onBLEDeviceDisconnectCallback), 
        h = !1;
    },
    cancelResourceCheckTimer: function() {
        -1 != u && (clearTimeout(u), u = -1);
    },
    onHide: function() {
        this.cancelResourceCheckTimer();
    },
    onLoad: function(e) {
        var t = this;
        wx.hideTabBar(), this.checkMiniProgramSettings(function() {
            d = !0, t.onTimerCheckResourceCall();
        }, function() {
            t.setAuthorizeLost("小程序无蓝牙权限", "连接Mini复卡机需要蓝牙权限。", !0);
        }), "SAAASDK" == i.systemInfo.mpenv && "devtools" != i.systemInfo.platform && (console.log("开始调试多端"), 
        wx.setEnableDebug({
            enableDebug: !0
        }));
    }
});