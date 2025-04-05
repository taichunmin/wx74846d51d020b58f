require("@babel/runtime/helpers/Objectvalues.js");

var e, t = require("@babel/runtime/helpers/classCallCheck.js"), n = require("@babel/runtime/helpers/createClass.js"), i = require("@babel/runtime/helpers/classPrivateFieldLooseBase.js"), c = require("@babel/runtime/helpers/classPrivateFieldLooseKey.js"), o = require("@babel/runtime/helpers/typeof.js"), r = require("AC1F69C355C842DFCA7901C4DB75D685.js"), a = !1, s = !1, u = !1, l = !1, f = !1, d = !0, h = new Array(), v = {}, C = null, g = function(e) {}, E = function(e, t) {
    return !1;
}, T = -1, y = [], m = [], p = [], b = [], k = [];

function w(e) {
    if ("object" == o(e) && e.hasOwnProperty("errCode")) switch (e.errCode) {
      case 1e4:
      case 10001:
      case 10008:
      case 10009:
        u = !1;
    }
    "function" == typeof C ? C(e) : console.log("出现设备异常 ".concat(JSON.stringify(e), " ，但是开发者没有注册设备异常处理器！"));
}

var D = w;

function S() {
    if (!u) throw "检测到蓝牙适配器未被初始化就调用了操作函数，这是不允许的，你应该在类似 onReady 中的生命周期中初始化设备";
}

function L(e) {
    for (var t = 0; t < e.devices.length; t++) {
        var n = e.devices[t];
        "function" == typeof g && g(n);
        var i = !0;
        n.lastFoundTimeStamp = new Date().getTime();
        for (var c = 0; c < h.length; c++) {
            var o = h[c], r = !1;
            "function" == typeof E && (r = E(o, n)), r && (i = !1, h[c] = n, m.forEach(function(e) {
                try {
                    e(o, n);
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    console.error("在更新BLE设备信息时出现代码层次未处理的异常: " + e);
                }
            }));
        }
        i && (h.push(n), y.forEach(function(e) {
            try {
                e(n);
            } catch (e) {
                e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                console.error("设备在寻找设备时出现代码层次未处理的异常: " + e);
            }
        }));
    }
}

function _() {
    S(), f || l ? console.log("开发者重复调用了扫描，这是不应该的！") : (l = !0, wx.startBluetoothDevicesDiscovery({
        allowDuplicatesKey: !0,
        interval: 0,
        powerLevel: "high",
        services: [ r.bleServiceUUIDDefinition.MINICOPY_SERVICE_BASE_UID, r.bleServiceUUIDDefinition.NRF52_DFU_SERVICE_BASE_UID ],
        success: function(e) {
            f = !0, h.forEach(function(e) {
                e.lastFoundTimeStamp = new Date().getTime();
            }), T = setInterval(function() {
                for (var e = 0; e < h.length; e++) {
                    var t = h[e], n = new Date().getTime();
                    if (n >= t.lastFoundTimeStamp) {
                        var i = v[t.deviceId];
                        if (i instanceof K && (i.isConnecting() || i.isConnected())) {
                            t.lastFoundTimeStamp = n;
                            continue;
                        }
                        n - t.lastFoundTimeStamp > 2500 && (console.log("时间差距: " + (n - t.lastFoundTimeStamp)), 
                        h.splice(e, 1), p.forEach(function(e) {
                            try {
                                e(t);
                            } catch (e) {
                                e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                                console.error("设备在移除设备时出现代码层次未处理的异常: " + e);
                            }
                        }));
                    }
                }
            }, 200), wx.onBluetoothDeviceFound(L);
        },
        fail: w,
        complete: function() {
            l = !1;
        }
    }));
}

function B(e) {
    S(), "function" != typeof e && (e = function() {}), f ? wx.stopBluetoothDevicesDiscovery({
        success: function(t) {
            e();
        },
        fail: function(t) {
            1e4 == t.errCode ? e() : w(t);
        },
        complete: function() {
            f = !1, clearInterval(T), wx.offBluetoothDeviceFound(L);
        }
    }) : (console.log("当前扫描未在进行，直接跳过！"), e());
}

function I() {
    for (var e in v) {
        var t = v[e];
        if (t instanceof K && t.isConnected()) return t.address;
    }
    return null;
}

var N = c("m_state"), O = c("m_mtu"), M = c("m_address"), A = c("m_name"), U = c("m_type"), x = c("m_services"), F = c("m_characteristics"), P = c("m_services_def"), j = c("getThisBLEDevice"), R = c("m_on_mtu_changed_call"), q = c("m_on_ble_connection_call"), W = c("m_on_characteristic_changed_call"), G = c("connectToBLE"), K = function() {
    function e(n) {
        var c = this;
        t(this, e), Object.defineProperty(this, G, {
            value: J
        }), Object.defineProperty(this, j, {
            value: V
        }), Object.defineProperty(this, N, {
            writable: !0,
            value: e.State.STATE_DISCONNECTED
        }), Object.defineProperty(this, O, {
            writable: !0,
            value: 0
        }), Object.defineProperty(this, M, {
            writable: !0,
            value: ""
        }), Object.defineProperty(this, A, {
            writable: !0,
            value: ""
        }), Object.defineProperty(this, U, {
            writable: !0,
            value: ""
        }), Object.defineProperty(this, x, {
            writable: !0,
            value: []
        }), Object.defineProperty(this, F, {
            writable: !0,
            value: {}
        }), Object.defineProperty(this, P, {
            writable: !0,
            value: []
        }), Object.defineProperty(this, R, {
            writable: !0,
            value: function(e) {
                e.deviceId == c.address && (c.mtu = e.mtu, console.log("onBLEMTUChange 监听到MTU改变的事件，当前的MTU是: " + e.mtu));
            }
        }), Object.defineProperty(this, q, {
            writable: !0,
            value: function(e) {
                var t = c;
                e.deviceId == t.address && 0 == e.connected && (console.log("基础蓝牙链接状态内部监听函数监听到设备 ".concat(e.deviceId, " 链接断开。")), 
                t.gcConnection(), wx.offBLEMTUChange(i(t, R)[R]), wx.offBLEConnectionStateChange(i(t, q)[q]), 
                wx.offBLECharacteristicValueChange(i(t, W)[W]), d && wx.getBluetoothAdapterState({
                    success: function(e) {
                        e.discovering ? console.log("断开设备后，检测到搜索运行中，因此跳过重启。") : e.available ? (_(), console.log("重启搜索成功: " + JSON.stringify(e))) : console.warn("警告，蓝牙适配器库判断到在设备断开后，蓝牙适配器也不可用，将跳过自动启动扫描！");
                    },
                    fail: function(e) {
                        console.warn("警告，蓝牙适配器库判断到在设备断开后，蓝牙适配器状态获取失败，将跳过自动启动扫描: " + JSON.stringify(e));
                    }
                }), i(c, j)[j](function(e) {
                    k.forEach(function(t) {
                        try {
                            "function" == typeof t && t(e);
                        } catch (e) {
                            e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                            console.error("在设备断开，进行回调通知时出现异常: " + e);
                        }
                    });
                }));
            }
        }), Object.defineProperty(this, W, {
            writable: !0,
            value: function(e) {
                e.deviceId == c.address && c.onCharacteristicChanged(e);
            }
        }), i(this, M)[M] = n, i(this, P)[P] = this.getServiceMapDefinition(), this.State = e.State;
    }
    return n(e, [ {
        key: "onStateChange",
        value: function(e) {}
    }, {
        key: "state",
        get: function() {
            return i(this, N)[N];
        },
        set: function(t) {
            if (-1 == Object.values(e.State).indexOf(t)) throw "不允许为不支持的状态 ".concat(t);
            i(this, N)[N] != t && (i(this, N)[N] = t, this.onStateChange(i(this, N)[N]));
        }
    }, {
        key: "mtu",
        get: function() {
            var t = i(this, O)[O];
            if (t < e.DEFAULT_MTU) throw "地址为:".concat(this.address, "的设备的mtu是").concat(t, "，此值非标准mtu值，请检查您的配置");
            return t;
        },
        set: function(t) {
            i(this, O)[O] != t && (i(this, O)[O] = t, console.warn("设置了地址为: ".concat(this.address, "的设备的mtu为").concat(t, "，谨记此值 -").concat(e.MTU_CMD_LEN, " 字节后才是传输数据的可用字节数！")));
        }
    }, {
        key: "mtu_only_data",
        get: function() {
            return i(this, O)[O] - e.MTU_CMD_LEN;
        }
    }, {
        key: "address",
        get: function() {
            return i(this, M)[M];
        },
        set: function(e) {
            throw "不允许运行时更改地址(目标地址为".concat(e, ")");
        }
    }, {
        key: "name",
        get: function() {
            return i(this, A)[A];
        },
        set: function(e) {
            i(this, A)[A] = e;
        }
    }, {
        key: "type",
        get: function() {
            return i(this, U)[U];
        },
        set: function(e) {
            i(this, U)[U] = e;
        }
    }, {
        key: "isConnecting",
        value: function() {
            return this.state == e.State.STATE_CONNECTING;
        }
    }, {
        key: "isConnected",
        value: function() {
            return this.state == e.State.STATE_CONNECTED || this.state == e.State.STATE_WORKING;
        }
    }, {
        key: "isWorking",
        value: function() {
            return this.state == e.State.STATE_WORKING;
        }
    }, {
        key: "services",
        get: function() {
            return i(this, x)[x];
        }
    }, {
        key: "characteristics",
        get: function() {
            return i(this, F)[F];
        }
    }, {
        key: "tryToChangeMTU",
        value: function(t) {
            return wx.setBLEMTU({
                deviceId: this.address,
                mtu: e.MAX_MTU,
                success: function(e) {
                    console.log("MTU请求设置完成，请开发去关注 wx.onBLEMTUChange 的回调事件！");
                },
                complete: t
            }), this;
        }
    }, {
        key: "setCharacteristicValueChangeEnable",
        value: function(e, t, n, i) {
            var c = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "indication", o = this;
            return wx.notifyBLECharacteristicValueChange({
                state: e,
                deviceId: o.address,
                serviceId: t,
                type: c,
                characteristicId: n,
                success: function(e) {
                    i();
                },
                fail: function(e) {
                    o.disconnect(function() {
                        w(e);
                    });
                }
            }), this;
        }
    }, {
        key: "onCharacteristicChanged",
        value: function(e) {
            console.info("onCharacteristicChanged 未被覆盖，并且收到了特征值变动的事件: ".concat(e));
        }
    }, {
        key: "onMakeBLEWorkAfterConnected",
        value: function(e) {
            throw r.errorMessage.NOT_IMPLEMENTED;
        }
    }, {
        key: "getServiceMapDefinition",
        value: function() {
            throw r.errorMessage.NOT_IMPLEMENTED;
        }
    }, {
        key: "connect",
        value: function(t) {
            var n = this;
            return v[this.address] = this, i(this, G)[G](function() {
                n.state = e.State.STATE_CONNECTED, n.onMakeBLEWorkAfterConnected(function() {
                    n.state = e.State.STATE_WORKING, t(), i(n, j)[j](function(e) {
                        b.forEach(function(t) {
                            try {
                                "function" == typeof t && t(e);
                            } catch (e) {
                                e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                                console.error("在设备链接，进行回调通知时出现异常: " + e);
                            }
                        });
                    });
                });
            }), this;
        }
    }, {
        key: "gcConnection",
        value: function() {
            this.state = e.State.STATE_DISCONNECTED, this.address in v && delete v[this.address];
        }
    }, {
        key: "disconnect",
        value: function(e) {
            var t = this;
            if (t.checkAdapter() && (t.isConnected() || t.isConnecting())) return wx.closeBLEConnection({
                deviceId: t.address,
                fail: function(e) {
                    t.gcConnection(), w(e);
                },
                success: function(n) {
                    t.gcConnection(), "function" == typeof e && e();
                }
            }), this;
            console.warn("请勿操作未连接的BLE设备！");
        }
    }, {
        key: "checkAdapter",
        value: function() {
            return S(), !0;
        }
    }, {
        key: "checkConnection",
        value: function() {
            if (!this.isConnected()) throw "请确保链接设备再进行操作";
            return !0;
        }
    }, {
        key: "sendDataAutoSplitPacket",
        value: function(e, t, n, i, c, o) {
            if (!(n instanceof Uint8Array)) throw "开发者在调用 sendDataPacket2BLE 时不可以传入非 Uint8Array 类型的参数！";
            if (null == o || null == o) switch (wx.getSystemInfoSync().platform) {
              case "ios":
                o = "write";
                break;

              case "android":
              default:
                o = "writeNoResponse";
            }
            if (this.checkAdapter() && (this.isWorking() || i && this.isConnected())) {
                var r = this;
                !function i(a) {
                    if (a >= n.length) c(); else {
                        var s = Math.min(r.mtu_only_data + a, n.length), u = n.slice(a, s);
                        wx.writeBLECharacteristicValue({
                            serviceId: e,
                            characteristicId: t,
                            deviceId: r.address,
                            value: u.buffer,
                            writeType: o,
                            success: function(e) {
                                i(a + u.length);
                            },
                            fail: w
                        });
                    }
                }(0);
            } else console.error("开发者调用 sendDataAutoSplitPacket 接口时务必先初始化适配器与连接蓝牙（蓝牙需要进入'WORKING'状态）");
            return this;
        }
    } ], [ {
        key: "isThisMe",
        value: function(e) {
            throw r.errorMessage.NOT_IMPLEMENTED;
        }
    } ]);
}();

function V(e) {
    for (var t = this, n = null, i = 0; i < h.length; i++) if (h[i].deviceId == t.address) {
        n = h[i];
        break;
    }
    null == n ? wx.getBluetoothDevices({
        success: function(i) {
            for (var c = 0; c < i.devices.length; c++) i.devices[c].deviceId == t.address && (n = i.devices[c]);
            null == n && (n = {
                RSSI: -1,
                advertisData: [],
                advertisServiceUUIDs: t.services,
                connectable: !t.isConnected(),
                deviceId: t.address,
                localName: t.name,
                name: t.name,
                serviceData: null
            }), e(n);
        },
        fail: function(e) {
            w(e);
        }
    }) : e(n);
}

function J(t) {
    var n = this;
    if (n.checkAdapter() && (n.isConnected() || n.isConnecting())) console.warn("请勿重复连接到BLE设备！"); else {
        n.state = e.State.STATE_CONNECTING;
        var c = function(e) {
            n.mtu = e.mtu, console.log("MTU获取成功，当前的MTU是: " + n.mtu), t();
        }, o = function() {
            wx.getBLEMTU({
                deviceId: n.address,
                writeType: "writeNoResponse",
                success: c,
                fail: function(e) {
                    n.disconnect(function() {
                        w(e);
                    });
                }
            });
        }, r = function(e) {
            console.log("搜寻到的服务: " + JSON.stringify(e)), e.services.forEach(function(e) {
                return n.services.push(e.uuid);
            });
            for (var t = Object.keys(i(n, P)[P]), c = 0; c < t.length; c++) {
                var r = t[c];
                if (-1 == n.services.indexOf(r)) return void n.disconnect(function() {
                    w({
                        errno: 1509002,
                        errCode: 10004,
                        errMsg: "BLE服务搜寻失败，请开关蓝牙后重试，或者联系我司排查。"
                    });
                });
            }
            !function e(t) {
                var c = Object.keys(i(n, P)[P]);
                if (t >= c.length) n.tryToChangeMTU(o); else {
                    var r = c[t];
                    wx.getBLEDeviceCharacteristics({
                        deviceId: n.address,
                        serviceId: r,
                        success: function(c) {
                            console.log("搜寻到的特征: " + JSON.stringify(c)), r in n.characteristics || (n.characteristics[r] = []), 
                            c.characteristics.forEach(function(e) {
                                return n.characteristics[r].push(e.uuid);
                            });
                            for (var o = i(n, P)[P][r], a = 0; a < o.length; a++) {
                                var s = o[a];
                                if (-1 == n.characteristics[r].indexOf(s)) return void n.disconnect(function() {
                                    w({
                                        errno: 1509002,
                                        errCode: 10005,
                                        errMsg: "BLE特征搜寻失败，请开关蓝牙后重试，或者联系我司排查。"
                                    });
                                });
                            }
                            e(t + 1);
                        },
                        fail: function(e) {
                            n.disconnect(function() {
                                w(e);
                            });
                        }
                    });
                }
            }(0);
        };
        wx.createBLEConnection({
            deviceId: n.address,
            timeout: 3e3,
            success: function(e) {
                wx.onBLEConnectionStateChange(i(n, q)[q]), wx.onBLEMTUChange(i(n, R)[R]), wx.onBLECharacteristicValueChange(i(n, W)[W]), 
                wx.getBLEDeviceServices({
                    deviceId: n.address,
                    success: r,
                    fail: function(e) {
                        n.disconnect(function() {
                            w(e);
                        });
                    }
                });
            },
            fail: function(t) {
                n.state = e.State.STATE_DISCONNECTED, w(t);
            }
        });
    }
}

e = K, K.State = {
    STATE_DISCONNECTED: "disconnected",
    STATE_CONNECTING: "connecting",
    STATE_CONNECTED: "connected",
    STATE_WORKING: "working"
}, K.MTU_CMD_LEN = 3, K.DEFAULT_MTU = 20 + e.MTU_CMD_LEN, K.MAX_MTU = 512, module.exports = {
    BaseBluetoothLowEnergy: K,
    startBLEDevicesAdapter: function(e) {
        a ? console.log("开发者重复调用了初始化，自动跳过！") : (a = !0, wx.openBluetoothAdapter({
            mode: "central",
            success: function(t) {
                u = !0, e(), console.log("适配器初始化成功！");
            },
            fail: w,
            complete: function() {
                a = !1, console.log("适配器初始化完成，请关注上面的初始化结果！");
            }
        }));
    },
    isLeAdapterInitialized: function() {
        return u;
    },
    checkAdapterInitialized: S,
    closeBLEDevicesAdapter: function(e) {
        S(), s ? console.log("开发者重复调用了反初始化，这是不应该的！") : (s = !0, B(function() {
            u && wx.closeBluetoothAdapter({
                success: function(t) {
                    e(), console.log("适配器关闭成功！");
                },
                fail: w,
                complete: function() {
                    u = !1, s = !1;
                }
            });
        }));
    },
    startBLEDevicesScanner: _,
    closeBLEDevicesScanner: B,
    onBLEDeviceErrCallback: function(e) {
        C = e;
    },
    throwAdapterErrMessage: D,
    registerOnBLEConnectedCallback: function(e) {
        r.addUniqueCallbackToList(b, e);
    },
    unregisterOnBLEConnectedCallback: function(e) {
        r.removeCallbackFromList(b, e);
    },
    registerOnBLEDisconnectedCallback: function(e) {
        r.addUniqueCallbackToList(k, e);
    },
    unregisterOnBLEDisconnectedCallback: function(e) {
        r.removeCallbackFromList(k, e);
    },
    onDeviceFoundCheckIsSame: function(e) {
        "function" == typeof e && (E = e);
    },
    onDeviceFoundBeforeCheck: function(e) {
        "function" == typeof e && (g = e);
    },
    getBLEDevicesFoundList: function() {
        return h;
    },
    hasDeviceConnected: function() {
        return null != I();
    },
    getAddressByConnection: I,
    getDeviceNameByConnection: function() {
        var e = I();
        return null == e ? "unknown" : v[e].name;
    },
    setAuthRediscoveryEnable: function(e) {
        d = e;
    },
    registerDeviceFoundCallback: function(e) {
        r.addUniqueCallbackToList(y, e);
    },
    registerDeviceRemovedCallback: function(e) {
        r.addUniqueCallbackToList(p, e);
    },
    unregisterDeviceFoundCallback: function(e) {
        r.removeCallbackFromList(y, e);
    },
    unregisterDeviceRemovedCallback: function(e) {
        r.removeCallbackFromList(p, e);
    },
    registerDeviceUpdatedCallback: function(e) {
        r.addUniqueCallbackToList(m, e);
    },
    unregisterDeviceUpdatedCallback: function(e) {
        r.removeCallbackFromList(m, e);
    }
};