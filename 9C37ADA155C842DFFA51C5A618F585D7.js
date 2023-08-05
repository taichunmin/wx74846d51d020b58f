var e = require("@babel/runtime/helpers/regeneratorRuntime.js"), t = require("@babel/runtime/helpers/asyncToGenerator.js"), n = require("@babel/runtime/helpers/classCallCheck.js"), r = require("@babel/runtime/helpers/createClass.js"), s = require("@babel/runtime/helpers/assertThisInitialized.js"), a = require("@babel/runtime/helpers/inherits.js"), E = require("@babel/runtime/helpers/createSuper.js"), _ = require("@babel/runtime/helpers/classPrivateFieldLooseBase.js"), i = require("@babel/runtime/helpers/classPrivateFieldLooseKey.js"), c = require("CA87121555C842DFACE17A12751685D7.js"), C = require("275D798255C842DF413B1185FE3585D7.js"), u = require("A3859AB555C842DFC5E3F2B2FA5585D7.js"), o = require("306D78F255C842DF560B10F52E4585D7.js"), O = require("068A852755C842DF60ECED206BE585D7.js"), R = i("m_data_received_callback"), T = i("m_zip_info"), l = i("m_on_progress_update_callback"), D = function(i) {
    a(v, i);
    var C, D, f, A, P, S, h, p, I, U, d = E(v);
    function v() {
        var e;
        n(this, v);
        for (var t = arguments.length, r = new Array(t), a = 0; a < t; a++) r[a] = arguments[a];
        return e = d.call.apply(d, [ this ].concat(r)), Object.defineProperty(s(e), R, {
            writable: !0,
            value: null
        }), Object.defineProperty(s(e), T, {
            writable: !0,
            value: {
                manifest: null,
                app_bin: null,
                app_dat: null
            }
        }), Object.defineProperty(s(e), l, {
            writable: !0,
            value: function(e) {
                console.log("开发者未覆盖OTA进度更新的回调，输出当前进度为：" + e);
            }
        }), e;
    }
    return r(v, [ {
        key: "getStatusCode",
        value: function(e, t) {
            if (null == e || e.length < 3) throw new Error("Invalid response length");
            if (e[0] != v.OPC.OP_CODE_RESPONSE || e[1] != t) throw new Error("Wrong response type");
            if (e[2] != v.RESULT.RES_CODE_SUCCESS && e[2] != v.RESULT.RES_CODE_OP_CODE_NOT_SUPPORTED && e[2] != v.RESULT.RES_CODE_INVALID_PARAMETER && e[2] != v.RESULT.RES_CODE_INSUFFICIENT_RESOURCES && e[2] != v.RESULT.RES_CODE_INVALID_OBJECT && e[2] != v.RESULT.RES_CODE_UNSUPPORTED_TYPE && e[2] != v.RESULT.RES_CODE_OPERATION_NOT_PERMITTED && e[2] != v.RESULT.RES_CODE_OPERATION_FAILED && e[2] != v.RESULT.RES_CODE_EXT_ERROR) throw new Error("Invalid response result");
            return e[2];
        }
    }, {
        key: "parseResponse",
        value: function(e, t, n) {
            var r = this.getStatusCode(e, t), s = !1;
            function a(e) {
                throw s ? new Error("非接受的扩展状态码: 0x".concat(r.toString(16))) : new Error("非接受的普通状态码: 0x".concat(r.toString(16)));
            }
            if (r == v.RESULT.RES_CODE_EXT_ERROR && (r = e[3], s = !0), Array.isArray(n)) {
                for (var E = 0; E < n.length; E++) if (n[E] == r) return {
                    request: t,
                    status: r,
                    data: e.slice(3)
                };
                a();
            } else {
                if (n == r) return {
                    request: t,
                    status: r,
                    data: e.slice(3)
                };
                a();
            }
        }
    }, {
        key: "unsignedBytesToInt",
        value: function(e, t) {
            return (255 & e[t]) + ((255 & e[t + 1]) << 8) + ((255 & e[t + 2]) << 16) + ((255 & e[t + 3]) << 24);
        }
    }, {
        key: "sendOpCode",
        value: function(e) {
            var t = this;
            return new Promise(function(n) {
                _(t, R)[R] = n;
                var r = o.bleServiceUUIDDefinition.NRF52_DFU_SERVICE_UUID_STR, s = o.bleServiceUUIDDefinition.NRF52_DFU_CTRL_CHARACT_STR;
                t.sendDataAutoSplitPacket(r, s, new Uint8Array(e), !1, function() {});
            });
        }
    }, {
        key: "sendPacket",
        value: function(e) {
            var t = this;
            return new Promise(function(n) {
                var r = o.bleServiceUUIDDefinition.NRF52_DFU_SERVICE_UUID_STR, s = o.bleServiceUUIDDefinition.NRF52_DFU_PACK_CHARACT_STR;
                t.sendDataAutoSplitPacket(r, s, new Uint8Array(e), !1, n, null);
            });
        }
    }, {
        key: "sendCreateObjectRequest",
        value: (U = t(e().mark(function t(n, r) {
            var s, a;
            return e().wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return v.OPC_WITH_DATA.OP_CODE_CREATE_OBJECT[1] = n, s = 4294967295 & r, v.OPC_WITH_DATA.OP_CODE_CREATE_OBJECT[2] = 255 & s, 
                    v.OPC_WITH_DATA.OP_CODE_CREATE_OBJECT[3] = s >> 8 & 255, v.OPC_WITH_DATA.OP_CODE_CREATE_OBJECT[4] = s >> 16 & 255, 
                    v.OPC_WITH_DATA.OP_CODE_CREATE_OBJECT[5] = s >> 24 & 255, e.next = 8, this.sendOpCode(v.OPC_WITH_DATA.OP_CODE_CREATE_OBJECT);

                  case 8:
                    return a = e.sent, e.abrupt("return", this.parseResponse(a, v.OPC.OP_CODE_CREATE_OBJECT, v.RESULT.RES_CODE_SUCCESS));

                  case 10:
                  case "end":
                    return e.stop();
                }
            }, t, this);
        })), function(e, t) {
            return U.apply(this, arguments);
        })
    }, {
        key: "sendSelectObjectRequest",
        value: (I = t(e().mark(function t(n) {
            var r;
            return e().wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return v.OPC_WITH_DATA.OP_CODE_SELECT_OBJECT[1] = n, e.next = 3, this.sendOpCode(v.OPC_WITH_DATA.OP_CODE_SELECT_OBJECT);

                  case 3:
                    return r = e.sent, r = this.parseResponse(r, v.OPC.OP_CODE_SELECT_OBJECT, v.RESULT.RES_CODE_SUCCESS), 
                    e.abrupt("return", {
                        size_max: this.unsignedBytesToInt(r.data, 0),
                        offset: this.unsignedBytesToInt(r.data, 4),
                        crc32: this.unsignedBytesToInt(r.data, 8)
                    });

                  case 6:
                  case "end":
                    return e.stop();
                }
            }, t, this);
        })), function(e) {
            return I.apply(this, arguments);
        })
    }, {
        key: "sendReadChecksumRequest",
        value: (p = t(e().mark(function t() {
            var n;
            return e().wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, this.sendOpCode(v.OPC_WITH_DATA.OP_CODE_CALCULATE_CHECKSUM);

                  case 2:
                    return n = e.sent, n = this.parseResponse(n, v.OPC.OP_CODE_CALCULATE_CRC, v.RESULT.RES_CODE_SUCCESS), 
                    e.abrupt("return", {
                        offset: this.unsignedBytesToInt(n.data, 0),
                        crc32: this.unsignedBytesToInt(n.data, 4)
                    });

                  case 5:
                  case "end":
                    return e.stop();
                }
            }, t, this);
        })), function() {
            return p.apply(this, arguments);
        })
    }, {
        key: "sendExecuteRequest",
        value: (h = t(e().mark(function t() {
            var n;
            return e().wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, this.sendOpCode(v.OPC_WITH_DATA.OP_CODE_EXECUTE);

                  case 2:
                    return n = e.sent, e.abrupt("return", this.parseResponse(n, v.OPC.OP_CODE_EXECUTE_OBJECT, v.RESULT.RES_CODE_SUCCESS));

                  case 4:
                  case "end":
                    return e.stop();
                }
            }, t, this);
        })), function() {
            return h.apply(this, arguments);
        })
    }, {
        key: "sendPacketReceiptNotificationsRequest",
        value: (S = t(e().mark(function t(n) {
            var r;
            return e().wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return v.OPC_WITH_DATA.OP_CODE_PACKET_RECEIPT_NOTIF_REQ[1] = 255 & n, v.OPC_WITH_DATA.OP_CODE_PACKET_RECEIPT_NOTIF_REQ[2] = n >> 8 & 255, 
                    e.next = 4, this.sendOpCode(v.OPC_WITH_DATA.OP_CODE_PACKET_RECEIPT_NOTIF_REQ);

                  case 4:
                    return r = e.sent, e.abrupt("return", this.parseResponse(r, v.OPC.OP_CODE_SET_RECEIPT_NOTIF, v.RESULT.RES_CODE_SUCCESS));

                  case 6:
                  case "end":
                    return e.stop();
                }
            }, t, this);
        })), function(e) {
            return S.apply(this, arguments);
        })
    }, {
        key: "sendPacketAndCheckCRC32",
        value: (P = t(e().mark(function t(n, r) {
            var s, a, E;
            return e().wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return s = n.length, e.next = 3, this.sendPacket(n);

                  case 3:
                    return r && (s += r.offset), e.next = 6, this.sendReadChecksumRequest();

                  case 6:
                    if ((a = e.sent).offset == s) {
                        e.next = 9;
                        break;
                    }
                    throw new Error("之前部分数据已经发送完成，请处理好此逻辑");

                  case 9:
                    if ((E = O.buf(n, r ? r.crc32 : void 0)) === a.crc32) {
                        e.next = 12;
                        break;
                    }
                    throw new Error("CRC 校验失败: ".concat(a.crc32, " != ").concat(E));

                  case 12:
                    return e.abrupt("return", a);

                  case 13:
                  case "end":
                    return e.stop();
                }
            }, t, this);
        })), function(e, t) {
            return P.apply(this, arguments);
        })
    }, {
        key: "transferInitPacket",
        value: (A = t(e().mark(function t() {
            var n, r, s, a;
            return e().wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return n = _(this, T)[T].app_dat, r = O.buf(n), e.next = 4, this.sendSelectObjectRequest(v.OBJECT_CREATE_TYPE.COMMAND);

                  case 4:
                    if ((s = e.sent).offset == n.length && s.crc32 == r) {
                        e.next = 24;
                        break;
                    }
                    if (a = O.buf(n, 0, s.offset), !(0 == s.offset || s.offset > n.length || s.crc32 != a)) {
                        e.next = 15;
                        break;
                    }
                    return console.log("在开始传输InitPacket前禁用PRN..."), e.next = 11, this.sendPacketReceiptNotificationsRequest(0);

                  case 11:
                    return console.log("PRN禁用成功，将继续发送InitPacket"), e.next = 14, this.sendCreateObjectRequest(v.OBJECT_CREATE_TYPE.COMMAND, n.length);

                  case 14:
                    console.log("创建InitPacket对象成功，接下来将启动发送数据包。");

                  case 15:
                    if (!(s.offset > 0)) {
                        e.next = 21;
                        break;
                    }
                    return e.next = 18, this.sendPacketAndCheckCRC32(n.slice(s.offset));

                  case 18:
                    console.log("InitPacket断电续传成功！"), e.next = 24;
                    break;

                  case 21:
                    return e.next = 23, this.sendPacketAndCheckCRC32(n);

                  case 23:
                    console.log("InitPacket整包传输成功！");

                  case 24:
                    return e.next = 26, this.sendExecuteRequest();

                  case 26:
                    console.log("InitPacket执行操作完成，验证信息无误！");

                  case 27:
                  case "end":
                    return e.stop();
                }
            }, t, this);
        })), function() {
            return A.apply(this, arguments);
        })
    }, {
        key: "transferFirmware",
        value: (f = t(e().mark(function t() {
            var n, r, s, a, E, i;
            return e().wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return n = null, r = _(this, T)[T].app_bin, s = O.buf(r), e.next = 5, this.sendSelectObjectRequest(v.OBJECT_CREATE_TYPE.DATA);

                  case 5:
                    if ((a = e.sent).offset == r.length && a.crc32 == s) {
                        e.next = 24;
                        break;
                    }
                    E = a.offset;

                  case 8:
                    if (!(E < r.length)) {
                        e.next = 21;
                        break;
                    }
                    return i = Math.min(r.length - E, a.size_max), e.next = 12, this.sendCreateObjectRequest(v.OBJECT_CREATE_TYPE.DATA, i);

                  case 12:
                    return e.next = 14, this.sendPacketAndCheckCRC32(r.slice(E, E + i), n);

                  case 14:
                    return n = e.sent, e.next = 17, this.sendExecuteRequest();

                  case 17:
                    _(this, l)[l](Math.round(n.offset / r.length * 100));

                  case 18:
                    E += a.size_max, e.next = 8;
                    break;

                  case 21:
                    a.offset > 0 ? console.log("Firmware断电续传成功！") : console.log("Firmware整包传输成功！"), 
                    e.next = 27;
                    break;

                  case 24:
                    return e.next = 26, this.sendExecuteRequest();

                  case 26:
                    _(this, l)[l](100);

                  case 27:
                    console.log("固件传输完成，验证信息无误！");

                  case 28:
                  case "end":
                    return e.stop();
                }
            }, t, this);
        })), function() {
            return f.apply(this, arguments);
        })
    }, {
        key: "loadByMemory",
        value: function(e) {
            for (var t = this, n = new ArrayBuffer(e.byteLength), r = e, s = new Uint8Array(n), a = new Uint8Array(r), E = 0; E < a.length; E++) s[E] = a[E];
            var i = c.parse(s.buffer);
            Object.keys(i).forEach(function(e) {
                var n = e, r = i[e];
                console.log("文件名称：".concat(n, ", 文件长度：").concat(r.length)), n == v.FILE_NAME_MANIFEST && (_(t, T)[T].manifest = JSON.parse(String.fromCharCode.apply(null, r))), 
                n == v.FILE_NAME_APP_DAT && (_(t, T)[T].app_dat = r), n == v.FILE_NAME_APP_BIN && (_(t, T)[T].app_bin = r);
            });
        }
    }, {
        key: "load",
        value: (D = t(e().mark(function t(n) {
            var r;
            return e().wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, new Promise(function(e) {
                        wx.getFileSystemManager().readFile({
                            filePath: n,
                            success: function(t) {
                                e(t.data);
                            }
                        });
                    });

                  case 2:
                    r = e.sent, this.loadByMemory(r);

                  case 4:
                  case "end":
                    return e.stop();
                }
            }, t, this);
        })), function(e) {
            return D.apply(this, arguments);
        })
    }, {
        key: "start",
        value: (C = t(e().mark(function t() {
            return e().wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return console.log("************* 第一阶段，传输初始包"), e.next = 3, this.transferInitPacket();

                  case 3:
                    return console.log("************* 第一阶段结束，开启第二阶段，传输固件包"), e.next = 6, this.transferFirmware();

                  case 6:
                    console.log("************* 第二阶段结束，OTA完成！");

                  case 7:
                  case "end":
                    return e.stop();
                }
            }, t, this);
        })), function() {
            return C.apply(this, arguments);
        })
    }, {
        key: "onProgressUpdate",
        value: function(e) {
            _(this, l)[l] = e;
        }
    }, {
        key: "onCharacteristicChanged",
        value: function(e) {
            var t = new Uint8Array(e.value);
            null != _(this, R)[R] ? _(this, R)[R](t) : console.warn("NRF52OTA收到了蓝牙数据但是没有处理: " + o.bytes2hex(t));
        }
    }, {
        key: "onMakeBLEWorkAfterConnected",
        value: function(e) {
            this.setCharacteristicValueChangeEnable(!0, o.bleServiceUUIDDefinition.NRF52_DFU_SERVICE_UUID_STR, o.bleServiceUUIDDefinition.NRF52_DFU_CTRL_CHARACT_STR, e);
        }
    }, {
        key: "getServiceMapDefinition",
        value: function() {
            var e = {};
            return e[o.bleServiceUUIDDefinition.NRF52_DFU_SERVICE_UUID_STR] = [ o.bleServiceUUIDDefinition.NRF52_DFU_PACK_CHARACT_STR, o.bleServiceUUIDDefinition.NRF52_DFU_CTRL_CHARACT_STR ], 
            e;
        }
    } ], [ {
        key: "parseManufacturerData",
        value: function(e) {
            return {
                address: o.bytes2hex(e, 2, 6),
                type: 0 == e[8] ? u.DeviceType.chameleonUltra : u.DeviceType.chameleonLite,
                hw_ver: e[9],
                fw_ver: o.bytes2Num(e, 10, 2)
            };
        }
    }, {
        key: "isThisMe",
        value: function(e) {
            var t = o.isThisDeviceByServices(e, [ o.bleServiceUUIDDefinition.NRF52_DFU_SERVICE_UUID_STR ]), n = e.localName || e.name, r = n.startsWith("CU-") || n.startsWith("CL-");
            return t && r;
        }
    } ]), v;
}(C.BaseBluetoothLowEnergy);

D.FILE_NAME_APP_BIN = "application.bin", D.FILE_NAME_APP_DAT = "application.dat", 
D.FILE_NAME_MANIFEST = "manifest.json", D.OBJECT_CREATE_TYPE = {
    COMMAND: 1,
    DATA: 2
}, D.OPC = {
    OP_CODE_CREATE_OBJECT: 1,
    OP_CODE_SET_RECEIPT_NOTIF: 2,
    OP_CODE_CALCULATE_CRC: 3,
    OP_CODE_EXECUTE_OBJECT: 4,
    OP_CODE_SELECT_OBJECT: 6,
    OP_CODE_RESPONSE: 96
}, D.OPC_WITH_DATA = {
    OP_CODE_CREATE_OBJECT: [ D.OPC.OP_CODE_CREATE_OBJECT, 0, 0, 0, 0, 0 ],
    OP_CODE_PACKET_RECEIPT_NOTIF_REQ: [ D.OPC.OP_CODE_SET_RECEIPT_NOTIF, 0, 0 ],
    OP_CODE_CALCULATE_CHECKSUM: [ D.OPC.OP_CODE_CALCULATE_CRC ],
    OP_CODE_EXECUTE: [ D.OPC.OP_CODE_EXECUTE_OBJECT ],
    OP_CODE_SELECT_OBJECT: [ D.OPC.OP_CODE_SELECT_OBJECT, 0 ]
}, D.RESULT = {
    RES_CODE_INVALID: 0,
    RES_CODE_SUCCESS: 1,
    RES_CODE_OP_CODE_NOT_SUPPORTED: 2,
    RES_CODE_INVALID_PARAMETER: 3,
    RES_CODE_INSUFFICIENT_RESOURCES: 4,
    RES_CODE_INVALID_OBJECT: 5,
    RES_CODE_UNSUPPORTED_TYPE: 7,
    RES_CODE_OPERATION_NOT_PERMITTED: 8,
    RES_CODE_OPERATION_FAILED: 10,
    RES_CODE_EXT_ERROR: 11
}, D.RESULT_EXT = {
    ERROR_NO_ERROR: 0,
    ERROR_INVALID_ERROR_CODE: 1,
    ERROR_WRONG_COMMAND_FORMAT: 2,
    ERROR_UNKNOWN_COMMAND: 3,
    ERROR_INIT_COMMAND_INVALID: 4,
    ERROR_FW_VERSION_FAILURE: 5,
    ERROR_HW_VERSION_FAILURE: 6,
    ERROR_SD_VERSION_FAILURE: 7,
    ERROR_SIGNATURE_MISSING: 8,
    ERROR_WRONG_HASH_TYPE: 9,
    ERROR_HASH_FAILED: 10,
    ERROR_WRONG_SIGNATURE_TYPE: 11,
    ERROR_VERIFICATION_FAILED: 12,
    ERROR_INSUFFICIENT_SPACE: 13
}, module.exports = D;