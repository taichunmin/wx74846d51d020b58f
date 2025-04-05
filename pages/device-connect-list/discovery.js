var e = require("../../D6EF5C7155C842DFB08934760C65D685.js"), n = require("../../76F8096255C842DF109E616502B6D685.js"), i = require("../../DFE4D8E455C842DFB982B0E32585D685.js"), t = -1;

Page({
    data: {
        deviceList: [],
        isConnecting: !1,
        sendVip: !0,
        activity_type: ""
    },
    showAllDevice: function() {
        for (var n = e.getBLEDevicesFoundList(), i = [], t = 0; t < n.length; t++) {
            var c = n[t];
            i.push({
                name: c.name,
                connected: c.deviceId == e.getAddressByConnection()
            });
        }
        this.setData({
            deviceList: i
        });
    },
    setConnecting: function(e) {
        this.setData({
            isConnecting: e
        });
    },
    onDeviceStatusChange: function(e) {
        this.showAllDevice();
    },
    onBLEDeviceConnectOkCallback: function() {
        e.closeBLEDevicesScanner(), this.setConnecting(!1), wx.hideLoading({
            success: function(e) {
                wx.showToast({
                    title: "连接成功！",
                    icon: "success",
                    duration: 1e3
                });
            }
        });
        var t = i.getSerial();
        n.isSVIPDevice(t), this.showAllDevice(), n.checkActivity(this), n.deviceConnectRecord(t);
    },
    onSendVipConfirm: function() {
        var e = this;
        n.sendVip(this.data.activity_type, function(i) {
            "更新成功" == i.data && (e.setData({
                sendVip: !0
            }), n.showToast("已经领取"));
        });
    },
    onBLEDeviceDisconnectOkCallback: function() {
        console.log("连接列表页监听到设备断开连接！"), n.showToast("设备已断开连接"), this.showAllDevice(), this.setConnecting(!1);
    },
    onBLEAdapterErrorCall: function(e) {
        console.log("在主页面初始化蓝牙适配器遇到的问题" + JSON.stringify(e)), n.processBLEError(e), this.setConnecting(!1);
    },
    onUserConnectDeviceForItem: function(t) {
        if (e.isLeAdapterInitialized()) {
            var c = t.currentTarget.dataset.id, o = e.getBLEDevicesFoundList()[c];
            if (e.hasDeviceConnected()) o.deviceId == e.getAddressByConnection() ? i.disconnectExistsDevice() : n.showToast("请先断开之前的连接"); else {
                if (!n.isLogin(this)) return void n.checkToken();
                console.log("已经登录"), wx.showLoading({
                    title: "正在连接中"
                }), this.setConnecting(!0), i.connectAutoCheckDevice(o), console.log("当前点击第" + c + "个，设备ID是:" + o.deviceId + "，设备名是: " + o.name);
            }
        } else n.showToast("蓝牙可能没有打开哦~");
    },
    onShow: function() {
        this.showAllDevice();
    },
    onLoad: function(n) {
        var i = this;
        e.registerDeviceFoundCallback(this.onDeviceStatusChange), e.registerDeviceRemovedCallback(this.onDeviceStatusChange), 
        e.registerOnBLEConnectedCallback(this.onBLEDeviceConnectOkCallback), e.registerOnBLEDisconnectedCallback(this.onBLEDeviceDisconnectOkCallback), 
        e.onBLEDeviceErrCallback(this.onBLEAdapterErrorCall), console.log("页面加载完成，注册回调完成！"), 
        t = setInterval(function() {
            i.showAllDevice();
        }, 1e3);
    },
    onUnload: function() {
        e.unregisterDeviceFoundCallback(this.onDeviceStatusChange), e.unregisterDeviceRemovedCallback(this.onDeviceStatusChange), 
        e.unregisterOnBLEConnectedCallback(this.onBLEDeviceConnectOkCallback), e.unregisterOnBLEDisconnectedCallback(this.onBLEDeviceDisconnectOkCallback), 
        e.onBLEDeviceErrCallback(null), clearInterval(t), t = -1;
    }
});