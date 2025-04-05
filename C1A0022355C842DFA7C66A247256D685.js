var e, t = require("@babel/runtime/helpers/regeneratorRuntime.js"), n = require("@babel/runtime/helpers/asyncToGenerator.js"), r = require("@babel/runtime/helpers/classCallCheck.js"), s = require("@babel/runtime/helpers/createClass.js"), a = require("@babel/runtime/helpers/possibleConstructorReturn.js"), E = require("@babel/runtime/helpers/getPrototypeOf.js"), _ = require("@babel/runtime/helpers/inherits.js"), i = require("@babel/runtime/helpers/classPrivateFieldLooseBase.js"), c = require("@babel/runtime/helpers/classPrivateFieldLooseKey.js");

function o(e, t, n) {
    return t = E(t), a(e, function() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
            return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        } catch (e) {
            e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
            return !1;
        }
    }() ? Reflect.construct(t, n || [], E(e).constructor) : t.apply(e, n));
}

var u = require("B867604655C842DFDE0108414566D685.js"), C = require("D6EF5C7155C842DFB08934760C65D685.js"), O = require("DFE4D8E455C842DFB982B0E32585D685.js"), R = require("AC1F69C355C842DFCA7901C4DB75D685.js"), T = require("43BCA8D455C842DF25DAC0D34346D685.js"), l = c("m_data_received_callback"), f = c("m_zip_info"), D = c("m_on_progress_update_callback"), P = function(e) {
    function a() {
        var e;
        r(this, a);
        for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++) n[s] = arguments[s];
        return e = o(this, a, [].concat(n)), Object.defineProperty(e, l, {
            writable: !0,
            value: null
        }), Object.defineProperty(e, f, {
            writable: !0,
            value: {
                manifest: null,
                app_bin: null,
                app_dat: null
            }
        }), Object.defineProperty(e, D, {
            writable: !0,
            value: function(e) {
                console.log("开发者未覆盖OTA进度更新的回调，输出当前进度为：" + e);
            }
        }), e;
    }
    return _(a, e), s(a, [ {
        key: "getStatusCode",
        value: function(e, t) {
            if (null == e || e.length < 3) throw new Error("Invalid response length");
            if (e[0] != a.OPC.OP_CODE_RESPONSE || e[1] != t) throw new Error("Wrong response type");
            if (e[2] != a.RESULT.RES_CODE_SUCCESS && e[2] != a.RESULT.RES_CODE_OP_CODE_NOT_SUPPORTED && e[2] != a.RESULT.RES_CODE_INVALID_PARAMETER && e[2] != a.RESULT.RES_CODE_INSUFFICIENT_RESOURCES && e[2] != a.RESULT.RES_CODE_INVALID_OBJECT && e[2] != a.RESULT.RES_CODE_UNSUPPORTED_TYPE && e[2] != a.RESULT.RES_CODE_OPERATION_NOT_PERMITTED && e[2] != a.RESULT.RES_CODE_OPERATION_FAILED && e[2] != a.RESULT.RES_CODE_EXT_ERROR) throw new Error("Invalid response result");
            return e[2];
        }
    }, {
        key: "parseResponse",
        value: function(e, t, n) {
            var r = this.getStatusCode(e, t), s = !1;
            function E(e) {
                throw s ? new Error("非接受的扩展状态码: 0x".concat(r.toString(16))) : new Error("非接受的普通状态码: 0x".concat(r.toString(16)));
            }
            if (r == a.RESULT.RES_CODE_EXT_ERROR && (r = e[3], s = !0), Array.isArray(n)) {
                for (var _ = 0; _ < n.length; _++) if (n[_] == r) return {
                    request: t,
                    status: r,
                    data: e.slice(3)
                };
                E();
            } else {
                if (n == r) return {
                    request: t,
                    status: r,
                    data: e.slice(3)
                };
                E();
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
                i(t, l)[l] = n;
                var r = R.bleServiceUUIDDefinition.NRF52_DFU_SERVICE_UUID_STR, s = R.bleServiceUUIDDefinition.NRF52_DFU_CTRL_CHARACT_STR;
                t.sendDataAutoSplitPacket(r, s, new Uint8Array(e), !1, function() {});
            });
        }
    }, {
        key: "sendPacket",
        value: function(e) {
            var t = this;
            return new Promise(function(n) {
                var r = R.bleServiceUUIDDefinition.NRF52_DFU_SERVICE_UUID_STR, s = R.bleServiceUUIDDefinition.NRF52_DFU_PACK_CHARACT_STR;
                t.sendDataAutoSplitPacket(r, s, new Uint8Array(e), !1, n, null);
            });
        }
    }, {
        key: "sendCreateObjectRequest",
        value: (U = n(t().mark(function e(n, r) {
            var s, E;
            return t().wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return a.OPC_WITH_DATA.OP_CODE_CREATE_OBJECT[1] = n, s = 4294967295 & r, a.OPC_WITH_DATA.OP_CODE_CREATE_OBJECT[2] = 255 & s, 
                    a.OPC_WITH_DATA.OP_CODE_CREATE_OBJECT[3] = s >> 8 & 255, a.OPC_WITH_DATA.OP_CODE_CREATE_OBJECT[4] = s >> 16 & 255, 
                    a.OPC_WITH_DATA.OP_CODE_CREATE_OBJECT[5] = s >> 24 & 255, e.next = 8, this.sendOpCode(a.OPC_WITH_DATA.OP_CODE_CREATE_OBJECT);

                  case 8:
                    return E = e.sent, e.abrupt("return", this.parseResponse(E, a.OPC.OP_CODE_CREATE_OBJECT, a.RESULT.RES_CODE_SUCCESS));

                  case 10:
                  case "end":
                    return e.stop();
                }
            }, e, this);
        })), function(e, t) {
            return U.apply(this, arguments);
        })
    }, {
        key: "sendSelectObjectRequest",
        value: (I = n(t().mark(function e(n) {
            var r;
            return t().wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return a.OPC_WITH_DATA.OP_CODE_SELECT_OBJECT[1] = n, e.next = 3, this.sendOpCode(a.OPC_WITH_DATA.OP_CODE_SELECT_OBJECT);

                  case 3:
                    return r = e.sent, r = this.parseResponse(r, a.OPC.OP_CODE_SELECT_OBJECT, a.RESULT.RES_CODE_SUCCESS), 
                    e.abrupt("return", {
                        size_max: this.unsignedBytesToInt(r.data, 0),
                        offset: this.unsignedBytesToInt(r.data, 4),
                        crc32: this.unsignedBytesToInt(r.data, 8)
                    });

                  case 6:
                  case "end":
                    return e.stop();
                }
            }, e, this);
        })), function(e) {
            return I.apply(this, arguments);
        })
    }, {
        key: "sendReadChecksumRequest",
        value: (h = n(t().mark(function e() {
            var n;
            return t().wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, this.sendOpCode(a.OPC_WITH_DATA.OP_CODE_CALCULATE_CHECKSUM);

                  case 2:
                    return n = e.sent, n = this.parseResponse(n, a.OPC.OP_CODE_CALCULATE_CRC, a.RESULT.RES_CODE_SUCCESS), 
                    e.abrupt("return", {
                        offset: this.unsignedBytesToInt(n.data, 0),
                        crc32: this.unsignedBytesToInt(n.data, 4)
                    });

                  case 5:
                  case "end":
                    return e.stop();
                }
            }, e, this);
        })), function() {
            return h.apply(this, arguments);
        })
    }, {
        key: "sendExecuteRequest",
        value: (p = n(t().mark(function e() {
            var n;
            return t().wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, this.sendOpCode(a.OPC_WITH_DATA.OP_CODE_EXECUTE);

                  case 2:
                    return n = e.sent, e.abrupt("return", this.parseResponse(n, a.OPC.OP_CODE_EXECUTE_OBJECT, a.RESULT.RES_CODE_SUCCESS));

                  case 4:
                  case "end":
                    return e.stop();
                }
            }, e, this);
        })), function() {
            return p.apply(this, arguments);
        })
    }, {
        key: "sendPacketReceiptNotificationsRequest",
        value: (S = n(t().mark(function e(n) {
            var r;
            return t().wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return a.OPC_WITH_DATA.OP_CODE_PACKET_RECEIPT_NOTIF_REQ[1] = 255 & n, a.OPC_WITH_DATA.OP_CODE_PACKET_RECEIPT_NOTIF_REQ[2] = n >> 8 & 255, 
                    e.next = 4, this.sendOpCode(a.OPC_WITH_DATA.OP_CODE_PACKET_RECEIPT_NOTIF_REQ);

                  case 4:
                    return r = e.sent, e.abrupt("return", this.parseResponse(r, a.OPC.OP_CODE_SET_RECEIPT_NOTIF, a.RESULT.RES_CODE_SUCCESS));

                  case 6:
                  case "end":
                    return e.stop();
                }
            }, e, this);
        })), function(e) {
            return S.apply(this, arguments);
        })
    }, {
        key: "sendPacketAndCheckCRC32",
        value: (A = n(t().mark(function e(n, r) {
            var s, a, E;
            return t().wrap(function(e) {
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
                    if ((E = T.buf(n, r ? r.crc32 : void 0)) === a.crc32) {
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
            }, e, this);
        })), function(e, t) {
            return A.apply(this, arguments);
        })
    }, {
        key: "transferInitPacket",
        value: (P = n(t().mark(function e() {
            var n, r, s, E;
            return t().wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return n = i(this, f)[f].app_dat, r = T.buf(n), e.next = 4, this.sendSelectObjectRequest(a.OBJECT_CREATE_TYPE.COMMAND);

                  case 4:
                    if ((s = e.sent).offset == n.length && s.crc32 == r) {
                        e.next = 24;
                        break;
                    }
                    if (E = T.buf(n, 0, s.offset), !(0 == s.offset || s.offset > n.length || s.crc32 != E)) {
                        e.next = 15;
                        break;
                    }
                    return console.log("在开始传输InitPacket前禁用PRN..."), e.next = 11, this.sendPacketReceiptNotificationsRequest(0);

                  case 11:
                    return console.log("PRN禁用成功，将继续发送InitPacket"), e.next = 14, this.sendCreateObjectRequest(a.OBJECT_CREATE_TYPE.COMMAND, n.length);

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
            }, e, this);
        })), function() {
            return P.apply(this, arguments);
        })
    }, {
        key: "transferFirmware",
        value: (C = n(t().mark(function e() {
            var n, r, s, E, _, c;
            return t().wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return n = null, r = i(this, f)[f].app_bin, s = T.buf(r), e.next = 5, this.sendSelectObjectRequest(a.OBJECT_CREATE_TYPE.DATA);

                  case 5:
                    if ((E = e.sent).offset == r.length && E.crc32 == s) {
                        e.next = 24;
                        break;
                    }
                    _ = E.offset;

                  case 8:
                    if (!(_ < r.length)) {
                        e.next = 21;
                        break;
                    }
                    return c = Math.min(r.length - _, E.size_max), e.next = 12, this.sendCreateObjectRequest(a.OBJECT_CREATE_TYPE.DATA, c);

                  case 12:
                    return e.next = 14, this.sendPacketAndCheckCRC32(r.slice(_, _ + c), n);

                  case 14:
                    return n = e.sent, e.next = 17, this.sendExecuteRequest();

                  case 17:
                    i(this, D)[D](Math.round(n.offset / r.length * 100));

                  case 18:
                    _ += E.size_max, e.next = 8;
                    break;

                  case 21:
                    E.offset > 0 ? console.log("Firmware断电续传成功！") : console.log("Firmware整包传输成功！"), 
                    e.next = 27;
                    break;

                  case 24:
                    return e.next = 26, this.sendExecuteRequest();

                  case 26:
                    i(this, D)[D](100);

                  case 27:
                    console.log("固件传输完成，验证信息无误！");

                  case 28:
                  case "end":
                    return e.stop();
                }
            }, e, this);
        })), function() {
            return C.apply(this, arguments);
        })
    }, {
        key: "loadByMemory",
        value: function(e) {
            for (var t = this, n = new ArrayBuffer(e.byteLength), r = e, s = new Uint8Array(n), E = new Uint8Array(r), _ = 0; _ < E.length; _++) s[_] = E[_];
            var c = u.parse(s.buffer);
            Object.keys(c).forEach(function(e) {
                var n = e, r = c[e];
                console.log("文件名称：".concat(n, ", 文件长度：").concat(r.length)), n == a.FILE_NAME_MANIFEST && (i(t, f)[f].manifest = JSON.parse(String.fromCharCode.apply(null, r))), 
                n == a.FILE_NAME_APP_DAT && (i(t, f)[f].app_dat = r), n == a.FILE_NAME_APP_BIN && (i(t, f)[f].app_bin = r);
            });
        }
    }, {
        key: "load",
        value: (c = n(t().mark(function e(n) {
            var r;
            return t().wrap(function(e) {
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
            }, e, this);
        })), function(e) {
            return c.apply(this, arguments);
        })
    }, {
        key: "start",
        value: (E = n(t().mark(function e() {
            return t().wrap(function(e) {
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
            }, e, this);
        })), function() {
            return E.apply(this, arguments);
        })
    }, {
        key: "onProgressUpdate",
        value: function(e) {
            i(this, D)[D] = e;
        }
    }, {
        key: "onCharacteristicChanged",
        value: function(e) {
            var t = new Uint8Array(e.value);
            null != i(this, l)[l] ? i(this, l)[l](t) : console.warn("NRF52OTA收到了蓝牙数据但是没有处理: " + R.bytes2hex(t));
        }
    }, {
        key: "onMakeBLEWorkAfterConnected",
        value: function(e) {
            this.setCharacteristicValueChangeEnable(!0, R.bleServiceUUIDDefinition.NRF52_DFU_SERVICE_UUID_STR, R.bleServiceUUIDDefinition.NRF52_DFU_CTRL_CHARACT_STR, e);
        }
    }, {
        key: "getServiceMapDefinition",
        value: function() {
            var e = {};
            return e[R.bleServiceUUIDDefinition.NRF52_DFU_SERVICE_UUID_STR] = [ R.bleServiceUUIDDefinition.NRF52_DFU_PACK_CHARACT_STR, R.bleServiceUUIDDefinition.NRF52_DFU_CTRL_CHARACT_STR ], 
            e;
        }
    } ], [ {
        key: "parseManufacturerData",
        value: function(e) {
            return {
                address: R.bytes2hex(e, 2, 6),
                type: 0 == e[8] ? O.DeviceType.chameleonUltra : O.DeviceType.chameleonLite,
                hw_ver: e[9],
                fw_ver: R.bytes2Num(e, 10, 2)
            };
        }
    }, {
        key: "isThisMe",
        value: function(e) {
            var t = R.isThisDeviceByServices(e, [ R.bleServiceUUIDDefinition.NRF52_DFU_SERVICE_UUID_STR ]), n = e.localName || e.name, r = n.startsWith("CU-") || n.startsWith("CL-");
            return t && r;
        }
    } ]);
    var E, c, C, P, A, S, p, h, I, U;
}(C.BaseBluetoothLowEnergy);

e = P, P.FILE_NAME_APP_BIN = "application.bin", P.FILE_NAME_APP_DAT = "application.dat", 
P.FILE_NAME_MANIFEST = "manifest.json", P.OBJECT_CREATE_TYPE = {
    COMMAND: 1,
    DATA: 2
}, P.OPC = {
    OP_CODE_CREATE_OBJECT: 1,
    OP_CODE_SET_RECEIPT_NOTIF: 2,
    OP_CODE_CALCULATE_CRC: 3,
    OP_CODE_EXECUTE_OBJECT: 4,
    OP_CODE_SELECT_OBJECT: 6,
    OP_CODE_RESPONSE: 96
}, P.OPC_WITH_DATA = {
    OP_CODE_CREATE_OBJECT: [ e.OPC.OP_CODE_CREATE_OBJECT, 0, 0, 0, 0, 0 ],
    OP_CODE_PACKET_RECEIPT_NOTIF_REQ: [ e.OPC.OP_CODE_SET_RECEIPT_NOTIF, 0, 0 ],
    OP_CODE_CALCULATE_CHECKSUM: [ e.OPC.OP_CODE_CALCULATE_CRC ],
    OP_CODE_EXECUTE: [ e.OPC.OP_CODE_EXECUTE_OBJECT ],
    OP_CODE_SELECT_OBJECT: [ e.OPC.OP_CODE_SELECT_OBJECT, 0 ]
}, P.RESULT = {
    RES_CODE_INVALID: 0,
    //!< 操作码无效。
    RES_CODE_SUCCESS: 1,
    //!< 操作成功。
    RES_CODE_OP_CODE_NOT_SUPPORTED: 2,
    //!< 操作码不支持。
    RES_CODE_INVALID_PARAMETER: 3,
    //!< 有缺少的或者是无效的参数。
    RES_CODE_INSUFFICIENT_RESOURCES: 4,
    //!< 数据对象内存不足。
    RES_CODE_INVALID_OBJECT: 5,
    //!< 数据对象与固件和硬件要求不匹配，签名错误，或解析命令失败。
    RES_CODE_UNSUPPORTED_TYPE: 7,
    //!< 请求创建的对象类型无效。
    RES_CODE_OPERATION_NOT_PERMITTED: 8,
    //!< DFU进程的状态不允许此操作。
    RES_CODE_OPERATION_FAILED: 10,
    //!< 操作失败。
    RES_CODE_EXT_ERROR: 11
}, P.RESULT_EXT = {
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
}, module.exports = P;