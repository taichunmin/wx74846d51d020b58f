require("@babel/runtime/helpers/Objectvalues.js");

var e = require("@babel/runtime/helpers/classCallCheck.js"), t = require("@babel/runtime/helpers/createClass.js"), n = require("@babel/runtime/helpers/classPrivateFieldLooseBase.js"), i = require("@babel/runtime/helpers/classPrivateFieldLooseKey.js"), c = require("@babel/runtime/helpers/typeof.js"), o = require("306D78F255C842DF560B10F52E4585D7.js"), r = !1, a = !1, s = !1, u = !1, l = !1, f = !0, d = new Array(), h = {}, v = null, C = function(e) {}, g = function(e, t) {
    return !1;
}, E = -1, T = [], y = [], m = [], p = [], b = [];

function k(e) {
    if ("object" == c(e) && e.hasOwnProperty("errCode")) switch (e.errCode) {
      case 1e4:
      case 10001:
      case 10008:
      case 10009:
        s = !1;
    }
    "function" == typeof v ? v(e) : console.log("出现设备异常 ".concat(JSON.stringify(e), " ，但是开发者没有注册设备异常处理器！"));
}

var w = k;

function D() {
    if (!s) throw "检测到蓝牙适配器未被初始化就调用了操作函数，这是不允许的，你应该在类似 onReady 中的生命周期中初始化设备";
}

function S(e) {
    for (var t = 0; t < e.devices.length; t++) {
        var n = e.devices[t];
        "function" == typeof C && C(n);
        var i = !0;
        n.lastFoundTimeStamp = new Date().getTime();
        for (var c = 0; c < d.length; c++) {
            var o = d[c], r = !1;
            "function" == typeof g && (r = g(o, n)), r && (i = !1, d[c] = n, y.forEach(function(e) {
                try {
                    e(o, n);
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    console.error("在更新BLE设备信息时出现代码层次未处理的异常: " + e);
                }
            }));
        }
        i && (d.push(n), T.forEach(function(e) {
            try {
                e(n);
            } catch (e) {
                e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                console.error("设备在寻找设备时出现代码层次未处理的异常: " + e);
            }
        }));
    }
}

function L() {
    D(), l || u ? console.log("开发者重复调用了扫描，这是不应该的！") : (u = !0, wx.startBluetoothDevicesDiscovery({
        allowDuplicatesKey: !0,
        interval: 0,
        powerLevel: "high",
        services: [ o.bleServiceUUIDDefinition.MINICOPY_SERVICE_BASE_UID, o.bleServiceUUIDDefinition.NRF52_DFU_SERVICE_BASE_UID ],
        success: function(e) {
            l = !0, d.forEach(function(e) {
                e.lastFoundTimeStamp = new Date().getTime();
            }), E = setInterval(function() {
                for (var e = 0; e < d.length; e++) {
                    var t = d[e], n = new Date().getTime();
                    if (n >= t.lastFoundTimeStamp) {
                        var i = h[t.deviceId];
                        if (i instanceof G && (i.isConnecting() || i.isConnected())) {
                            t.lastFoundTimeStamp = n;
                            continue;
                        }
                        n - t.lastFoundTimeStamp > 2500 && (console.log("时间差距: " + (n - t.lastFoundTimeStamp)), 
                        d.splice(e, 1), m.forEach(function(e) {
                            try {
                                e(t);
                            } catch (e) {
                                e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                                console.error("设备在移除设备时出现代码层次未处理的异常: " + e);
                            }
                        }));
                    }
                }
            }, 200), wx.onBluetoothDeviceFound(S);
        },
        fail: k,
        complete: function() {
            u = !1;
        }
    }));
}

function _(e) {
    D(), "function" != typeof e && (e = function() {}), l ? wx.stopBluetoothDevicesDiscovery({
        success: function(t) {
            e();
        },
        fail: function(t) {
            1e4 == t.errCode ? e() : k(t);
        },
        complete: function() {
            l = !1, clearInterval(E), wx.offBluetoothDeviceFound(S);
        }
    }) : (console.log("当前扫描未在进行，直接跳过！"), e());
}

function B() {
    for (var e in h) {
        var t = h[e];
        if (t instanceof G && t.isConnected()) return t.address;
    }
    return null;
}

var I = i("m_state"), N = i("m_mtu"), O = i("m_address"), M = i("m_name"), A = i("m_type"), U = i("m_services"), x = i("m_characteristics"), F = i("m_services_def"), P = i("getThisBLEDevice"), j = i("m_on_mtu_changed_call"), R = i("m_on_ble_connection_call"), q = i("m_on_characteristic_changed_call"), W = i("connectToBLE"), G = function() {
    function i(t) {
        var c = this;
        e(this, i), Object.defineProperty(this, W, {
            value: V
        }), Object.defineProperty(this, P, {
            value: K
        }), Object.defineProperty(this, I, {
            writable: !0,
            value: i.State.STATE_DISCONNECTED
        }), Object.defineProperty(this, N, {
            writable: !0,
            value: 0
        }), Object.defineProperty(this, O, {
            writable: !0,
            value: ""
        }), Object.defineProperty(this, M, {
            writable: !0,
            value: ""
        }), Object.defineProperty(this, A, {
            writable: !0,
            value: ""
        }), Object.defineProperty(this, U, {
            writable: !0,
            value: []
        }), Object.defineProperty(this, x, {
            writable: !0,
            value: {}
        }), Object.defineProperty(this, F, {
            writable: !0,
            value: []
        }), Object.defineProperty(this, j, {
            writable: !0,
            value: function(e) {
                e.deviceId == c.address && (c.mtu = e.mtu, console.log("onBLEMTUChange 监听到MTU改变的事件，当前的MTU是: " + e.mtu));
            }
        }), Object.defineProperty(this, R, {
            writable: !0,
            value: function(e) {
                var t = c;
                e.deviceId == t.address && 0 == e.connected && (console.log("基础蓝牙链接状态内部监听函数监听到设备 ".concat(e.deviceId, " 链接断开。")), 
                t.gcConnection(), wx.offBLEMTUChange(n(t, j)[j]), wx.offBLEConnectionStateChange(n(t, R)[R]), 
                wx.offBLECharacteristicValueChange(n(t, q)[q]), f && wx.getBluetoothAdapterState({
                    success: function(e) {
                        e.discovering ? console.log("断开设备后，检测到搜索运行中，因此跳过重启。") : e.available ? (L(), console.log("重启搜索成功: " + JSON.stringify(e))) : console.warn("警告，蓝牙适配器库判断到在设备断开后，蓝牙适配器也不可用，将跳过自动启动扫描！");
                    },
                    fail: function(e) {
                        console.warn("警告，蓝牙适配器库判断到在设备断开后，蓝牙适配器状态获取失败，将跳过自动启动扫描: " + JSON.stringify(e));
                    }
                }), n(c, P)[P](function(e) {
                    b.forEach(function(t) {
                        try {
                            "function" == typeof t && t(e);
                        } catch (e) {
                            e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                            console.error("在设备断开，进行回调通知时出现异常: " + e);
                        }
                    });
                }));
            }
        }), Object.defineProperty(this, q, {
            writable: !0,
            value: function(e) {
                e.deviceId == c.address && c.onCharacteristicChanged(e);
            }
        }), n(this, O)[O] = t, n(this, F)[F] = this.getServiceMapDefinition(), this.State = i.State;
    }
    return t(i, [ {
        key: "onStateChange",
        value: function(e) {}
    }, {
        key: "state",
        get: function() {
            return n(this, I)[I];
        },
        set: function(e) {
            if (-1 == Object.values(i.State).indexOf(e)) throw "不允许为不支持的状态 ".concat(e);
            n(this, I)[I] != e && (n(this, I)[I] = e, this.onStateChange(n(this, I)[I]));
        }
    }, {
        key: "mtu",
        get: function() {
            var e = n(this, N)[N];
            if (e < i.DEFAULT_MTU) throw "地址为:".concat(this.address, "的设备的mtu是").concat(e, "，此值非标准mtu值，请检查您的配置");
            return e;
        },
        set: function(e) {
            n(this, N)[N] != e && (n(this, N)[N] = e, console.warn("设置了地址为: ".concat(this.address, "的设备的mtu为").concat(e, "，谨记此值 -").concat(i.MTU_CMD_LEN, " 字节后才是传输数据的可用字节数！")));
        }
    }, {
        key: "mtu_only_data",
        get: function() {
            return n(this, N)[N] - i.MTU_CMD_LEN;
        }
    }, {
        key: "address",
        get: function() {
            return n(this, O)[O];
        },
        set: function(e) {
            throw "不允许运行时更改地址(目标地址为".concat(e, ")");
        }
    }, {
        key: "name",
        get: function() {
            return n(this, M)[M];
        },
        set: function(e) {
            n(this, M)[M] = e;
        }
    }, {
        key: "type",
        get: function() {
            return n(this, A)[A];
        },
        set: function(e) {
            n(this, A)[A] = e;
        }
    }, {
        key: "isConnecting",
        value: function() {
            return this.state == i.State.STATE_CONNECTING;
        }
    }, {
        key: "isConnected",
        value: function() {
            return this.state == i.State.STATE_CONNECTED || this.state == i.State.STATE_WORKING;
        }
    }, {
        key: "isWorking",
        value: function() {
            return this.state == i.State.STATE_WORKING;
        }
    }, {
        key: "services",
        get: function() {
            return n(this, U)[U];
        }
    }, {
        key: "characteristics",
        get: function() {
            return n(this, x)[x];
        }
    }, {
        key: "tryToChangeMTU",
        value: function(e) {
            return wx.setBLEMTU({
                deviceId: this.address,
                mtu: i.MAX_MTU,
                success: function(e) {
                    console.log("MTU请求设置完成，请开发去关注 wx.onBLEMTUChange 的回调事件！");
                },
                complete: e
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
                        k(e);
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
            throw o.errorMessage.NOT_IMPLEMENTED;
        }
    }, {
        key: "getServiceMapDefinition",
        value: function() {
            throw o.errorMessage.NOT_IMPLEMENTED;
        }
    }, {
        key: "connect",
        value: function(e) {
            var t = this;
            return h[this.address] = this, n(this, W)[W](function() {
                t.state = i.State.STATE_CONNECTED, t.onMakeBLEWorkAfterConnected(function() {
                    t.state = i.State.STATE_WORKING, e(), n(t, P)[P](function(e) {
                        p.forEach(function(t) {
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
            this.state = i.State.STATE_DISCONNECTED, this.address in h && delete h[this.address];
        }
    }, {
        key: "disconnect",
        value: function(e) {
            var t = this;
            if (t.checkAdapter() && (t.isConnected() || t.isConnecting())) return wx.closeBLEConnection({
                deviceId: t.address,
                fail: function(e) {
                    t.gcConnection(), k(e);
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
            return D(), !0;
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
                            fail: k
                        });
                    }
                }(0);
            } else console.error("开发者调用 sendDataAutoSplitPacket 接口时务必先初始化适配器与连接蓝牙（蓝牙需要进入'WORKING'状态）");
            return this;
        }
    } ], [ {
        key: "isThisMe",
        value: function(e) {
            throw o.errorMessage.NOT_IMPLEMENTED;
        }
    } ]), i;
}();

function K(e) {
    for (var t = this, n = null, i = 0; i < d.length; i++) if (d[i].deviceId == t.address) {
        n = d[i];
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
            k(e);
        }
    }) : e(n);
}

function V(e) {
    var t = this;
    if (t.checkAdapter() && (t.isConnected() || t.isConnecting())) console.warn("请勿重复连接到BLE设备！"); else {
        t.state = G.State.STATE_CONNECTING;
        var i = function(n) {
            t.mtu = n.mtu, console.log("MTU获取成功，当前的MTU是: " + t.mtu), e();
        }, c = function() {
            wx.getBLEMTU({
                deviceId: t.address,
                writeType: "writeNoResponse",
                success: i,
                fail: function(e) {
                    t.disconnect(function() {
                        k(e);
                    });
                }
            });
        }, o = function(e) {
            console.log("搜寻到的服务: " + JSON.stringify(e)), e.services.forEach(function(e) {
                return t.services.push(e.uuid);
            });
            for (var i = Object.keys(n(t, F)[F]), o = 0; o < i.length; o++) {
                var r = i[o];
                if (-1 == t.services.indexOf(r)) return void t.disconnect(function() {
                    k({
                        errno: 1509002,
                        errCode: 10004,
                        errMsg: "BLE服务搜寻失败，请开关蓝牙后重试，或者联系我司排查。"
                    });
                });
            }
            !function e(i) {
                var o = Object.keys(n(t, F)[F]);
                if (i >= o.length) t.tryToChangeMTU(c); else {
                    var r = o[i];
                    wx.getBLEDeviceCharacteristics({
                        deviceId: t.address,
                        serviceId: r,
                        success: function(c) {
                            console.log("搜寻到的特征: " + JSON.stringify(c)), r in t.characteristics || (t.characteristics[r] = []), 
                            c.characteristics.forEach(function(e) {
                                return t.characteristics[r].push(e.uuid);
                            });
                            for (var o = n(t, F)[F][r], a = 0; a < o.length; a++) {
                                var s = o[a];
                                if (-1 == t.characteristics[r].indexOf(s)) return void t.disconnect(function() {
                                    k({
                                        errno: 1509002,
                                        errCode: 10005,
                                        errMsg: "BLE特征搜寻失败，请开关蓝牙后重试，或者联系我司排查。"
                                    });
                                });
                            }
                            e(i + 1);
                        },
                        fail: function(e) {
                            t.disconnect(function() {
                                k(e);
                            });
                        }
                    });
                }
            }(0);
        };
        wx.createBLEConnection({
            deviceId: t.address,
            timeout: 3e3,
            success: function(e) {
                wx.onBLEConnectionStateChange(n(t, R)[R]), wx.onBLEMTUChange(n(t, j)[j]), wx.onBLECharacteristicValueChange(n(t, q)[q]), 
                wx.getBLEDeviceServices({
                    deviceId: t.address,
                    success: o,
                    fail: function(e) {
                        t.disconnect(function() {
                            k(e);
                        });
                    }
                });
            },
            fail: function(e) {
                t.state = G.State.STATE_DISCONNECTED, k(e);
            }
        });
    }
}

G.State = {
    STATE_DISCONNECTED: "disconnected",
    STATE_CONNECTING: "connecting",
    STATE_CONNECTED: "connected",
    STATE_WORKING: "working"
}, G.MTU_CMD_LEN = 3, G.DEFAULT_MTU = 20 + G.MTU_CMD_LEN, G.MAX_MTU = 512, module.exports = {
    BaseBluetoothLowEnergy: G,
    startBLEDevicesAdapter: function(e) {
        r ? console.log("开发者重复调用了初始化，自动跳过！") : (r = !0, wx.openBluetoothAdapter({
            mode: "central",
            success: function(t) {
                s = !0, e(), console.log("适配器初始化成功！");
            },
            fail: k,
            complete: function() {
                r = !1, console.log("适配器初始化完成，请关注上面的初始化结果！");
            }
        }));
    },
    isLeAdapterInitialized: function() {
        return s;
    },
    checkAdapterInitialized: D,
    closeBLEDevicesAdapter: function(e) {
        D(), a ? console.log("开发者重复调用了反初始化，这是不应该的！") : (a = !0, _(function() {
            s && wx.closeBluetoothAdapter({
                success: function(t) {
                    e(), console.log("适配器关闭成功！");
                },
                fail: k,
                complete: function() {
                    s = !1, a = !1;
                }
            });
        }));
    },
    startBLEDevicesScanner: L,
    closeBLEDevicesScanner: _,
    onBLEDeviceErrCallback: function(e) {
        v = e;
    },
    throwAdapterErrMessage: w,
    registerOnBLEConnectedCallback: function(e) {
        o.addUniqueCallbackToList(p, e);
    },
    unregisterOnBLEConnectedCallback: function(e) {
        o.removeCallbackFromList(p, e);
    },
    registerOnBLEDisconnectedCallback: function(e) {
        o.addUniqueCallbackToList(b, e);
    },
    unregisterOnBLEDisconnectedCallback: function(e) {
        o.removeCallbackFromList(b, e);
    },
    onDeviceFoundCheckIsSame: function(e) {
        "function" == typeof e && (g = e);
    },
    onDeviceFoundBeforeCheck: function(e) {
        "function" == typeof e && (C = e);
    },
    getBLEDevicesFoundList: function() {
        return d;
    },
    hasDeviceConnected: function() {
        return null != B();
    },
    getAddressByConnection: B,
    getDeviceNameByConnection: function() {
        var e = B();
        return null == e ? "unknown" : h[e].name;
    },
    setAuthRediscoveryEnable: function(e) {
        f = e;
    },
    registerDeviceFoundCallback: function(e) {
        o.addUniqueCallbackToList(T, e);
    },
    registerDeviceRemovedCallback: function(e) {
        o.addUniqueCallbackToList(m, e);
    },
    unregisterDeviceFoundCallback: function(e) {
        o.removeCallbackFromList(T, e);
    },
    unregisterDeviceRemovedCallback: function(e) {
        o.removeCallbackFromList(m, e);
    },
    registerDeviceUpdatedCallback: function(e) {
        o.addUniqueCallbackToList(y, e);
    },
    unregisterDeviceUpdatedCallback: function(e) {
        o.removeCallbackFromList(y, e);
    }
};