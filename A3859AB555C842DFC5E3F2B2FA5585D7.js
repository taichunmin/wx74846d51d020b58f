var e = require("@babel/runtime/helpers/typeof.js"), t = require("@babel/runtime/helpers/assertThisInitialized.js"), r = require("@babel/runtime/helpers/inherits.js"), i = require("@babel/runtime/helpers/createSuper.js"), s = require("@babel/runtime/helpers/classPrivateFieldLooseBase.js"), n = require("@babel/runtime/helpers/classPrivateFieldLooseKey.js"), o = require("@babel/runtime/helpers/createClass.js"), a = require("@babel/runtime/helpers/classCallCheck.js"), c = require("275D798255C842DF413B1185FE3585D7.js"), _ = require("306D78F255C842DF560B10F52E4585D7.js"), p = require("8E76785255C842DFE810105557B585D7.js"), u = require("2335D01055C842DF4553B817299585D7.js"), y = {
    miniCopy: "MiniCopy",
    svipCopy: "SVIP MiniCopy",
    chameleonUltra: "ChameleonUltra",
    chameleonLite: "ChameleonLite"
}, C = function() {
    console.log("出现通信超时异常，但是开发者没有注册超时处理器！");
}, l = function() {
    console.log("出现通信数据异常，但是开发者没有注册数据异常处理器！");
}, h = function(e) {
    console.log("开发者没有注册标签异常处理器: 0x" + e.toString(16));
}, D = null, f = {};

function v(e) {
    null != h && h(e);
}

c.onDeviceFoundBeforeCheck(function(e) {
    if (-1 != e.advertisServiceUUIDs.indexOf(_.bleServiceUUIDDefinition.MINICOPY_SERVICE_UUID_STR) && (e.deviceAdvDeviceType = y.miniCopy, 
    e.advertisData)) {
        var t = new Uint8Array(e.advertisData);
        if (t.length >= 6 && (e.deviceAdvId = _.bytes2hex(t.slice(0, 6))), t.length >= 8 && (e.deviceAdvFWVerNum = t[6] << 8 & 65535 + (255 & t[7])), 
        t.length >= 10) {
            var r = _.bytes2hex(t, 8, 2);
            r in O.TYPE_HEX ? e.deviceAdvDeviceType = O.TYPE_HEX[r] : e.deviceAdvDeviceType = y.miniCopy;
        }
    }
}), c.onDeviceFoundCheckIsSame(function(e, t) {
    return _.isSameBleNFCMiniCopyDevice(e, t);
});

var A = o(function e(t, r, i) {
    a(this, e), this.cmd = t, this.status = r, this.data = i;
}), R = n("response_buffer"), T = n("wait_response_map"), M = n("id_timeout_timer"), E = function(n) {
    r(p, n);
    var c = i(p);
    function p() {
        var e;
        a(this, p);
        for (var r = arguments.length, i = new Array(r), s = 0; s < r; s++) i[s] = arguments[s];
        return e = c.call.apply(c, [ this ].concat(i)), Object.defineProperty(t(e), R, {
            writable: !0,
            value: []
        }), Object.defineProperty(t(e), T, {
            writable: !0,
            value: {}
        }), Object.defineProperty(t(e), M, {
            writable: !0,
            value: -1
        }), e;
    }
    return o(p, [ {
        key: "onStateChange",
        value: function(e) {
            var t = this;
            switch (e) {
              case this.State.STATE_CONNECTED:
                s(this, M)[M] = setInterval(function() {
                    for (var e in s(t, T)[T]) {
                        var r = s(t, T)[T][e];
                        if (r.timeoutMS > 0 && new Date().getTime() > r.timeStart + r.timeoutMS) {
                            if (delete s(t, T)[T][e], r.throwAtTimeout) null != C && C(); else (0, r.callback)(null);
                            var i = "cmd == 0x".concat(e.toString(16));
                            console.log("任务超时，自动移除: \n任务信息：\n" + i);
                        }
                    }
                }, 100), console.log("通信建立，自动任务超时检测定时器已自动启动。");
                break;

              case this.State.STATE_DISCONNECTED:
                for (var r in clearInterval(s(this, M)[M]), s(this, M)[M] = -1, s(this, T)[T]) delete s(this, T)[T][r];
                console.log("通信断开，自动任务超时检测定时器已自动回收。");
                break;

              case this.State.STATE_WORKING:
            }
        }
    }, {
        key: "onCharacteristicChanged",
        value: function(t) {
            if (t.value.byteLength <= 0) console.error("无效的数据接收长度，跳过本次操作！"); else {
                var r = new Uint8Array(t.value);
                Array.prototype.push.apply(s(this, R)[R], r);
                var i = null;
                try {
                    i = this.onResponseDataParse(s(this, R)[R]);
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return console.error("处理通信时出现未处理的运行时异常: ".concat(e)), s(this, R)[R].length = 0, 
                    void l();
                }
                if (null != i && null != i) {
                    if (!(i instanceof p.ResponseData)) throw new Error("请开发者确保解析数据的结果返回的是事先规定的 ResponseData 类型，错误类型为 ".concat(e(i)));
                    if (i.cmd in s(this, T)[T]) {
                        var n = s(this, T)[T][i.cmd];
                        delete s(this, T)[T][i.cmd];
                        var o = n.callback;
                        if ("function" == typeof o) try {
                            o(i);
                        } catch (e) {
                            e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                            throw console.error("回调处理设备应答的数据时，出现了未处理的运行时异常: ".concat(e)), e;
                        } else console.error("在回调BLE有状态串口指令时发现此回调引用非函数类型，无法调用。");
                    } else console.warn("在待处理命令回调映射表中没有找到任务的回调对象！");
                } else console.log("没有解析到有效指令包含的数据包，可能是开发者遗漏返回值或者确实还没有有效应答。");
            }
        }
    }, {
        key: "sendAndWaitResponse",
        value: function(e, t, r, i, n, o, a, c, _) {
            var p = this;
            this.sendDataAutoSplitPacket(e, t, i, a, function() {
                s(p, T)[T][r] = {
                    callback: c,
                    timeoutMS: n,
                    timeStart: new Date().getTime(),
                    throwAtTimeout: o
                };
            }, _);
        }
    }, {
        key: "onResponseDataParse",
        value: function(e) {
            throw new Error(_.errorMessage.NOT_IMPLEMENTED);
        }
    }, {
        key: "transfer",
        value: function(e, t, r, i, s, n, o) {
            throw new Error(_.errorMessage.NOT_IMPLEMENTED);
        }
    } ]), p;
}(c.BaseBluetoothLowEnergy);

E.ResponseData = A;

var O = function(e) {
    r(s, E);
    var t = i(s);
    function s(e) {
        var r;
        return a(this, s), (r = t.call(this, e)).device_firmware_ver_info = {
            codeNumber: 0,
            codeString: "0.0"
        }, r.device_factroy_otp_info = {
            serial: "",
            hardware: 0,
            oscxtal: "",
            otpflag: 0
        }, r.crc_table = [ 0, 4129, 8258, 12387, 16516, 20645, 24774, 28903, 33032, 37161, 41290, 45419, 49548, 53677, 57806, 61935, 4657, 528, 12915, 8786, 21173, 17044, 29431, 25302, 37689, 33560, 45947, 41818, 54205, 50076, 62463, 58334, 9314, 13379, 1056, 5121, 25830, 29895, 17572, 21637, 42346, 46411, 34088, 38153, 58862, 62927, 50604, 54669, 13907, 9842, 5649, 1584, 30423, 26358, 22165, 18100, 46939, 42874, 38681, 34616, 63455, 59390, 55197, 51132, 18628, 22757, 26758, 30887, 2112, 6241, 10242, 14371, 51660, 55789, 59790, 63919, 35144, 39273, 43274, 47403, 23285, 19156, 31415, 27286, 6769, 2640, 14899, 10770, 56317, 52188, 64447, 60318, 39801, 35672, 47931, 43802, 27814, 31879, 19684, 23749, 11298, 15363, 3168, 7233, 60846, 64911, 52716, 56781, 44330, 48395, 36200, 40265, 32407, 28342, 24277, 20212, 15891, 11826, 7761, 3696, 65439, 61374, 57309, 53244, 48923, 44858, 40793, 36728, 37256, 33193, 45514, 41451, 53516, 49453, 61774, 57711, 4224, 161, 12482, 8419, 20484, 16421, 28742, 24679, 33721, 37784, 41979, 46042, 49981, 54044, 58239, 62302, 689, 4752, 8947, 13010, 16949, 21012, 25207, 29270, 46570, 42443, 38312, 34185, 62830, 58703, 54572, 50445, 13538, 9411, 5280, 1153, 29798, 25671, 21540, 17413, 42971, 47098, 34713, 38840, 59231, 63358, 50973, 55100, 9939, 14066, 1681, 5808, 26199, 30326, 17941, 22068, 55628, 51565, 63758, 59695, 39368, 35305, 47498, 43435, 22596, 18533, 30726, 26663, 6336, 2273, 14466, 10403, 52093, 56156, 60223, 64286, 35833, 39896, 43963, 48026, 19061, 23124, 27191, 31254, 2801, 6864, 10931, 14994, 64814, 60687, 56684, 52557, 48554, 44427, 40424, 36297, 31782, 27655, 23652, 19525, 15522, 11395, 7392, 3265, 61215, 65342, 53085, 57212, 44955, 49082, 36825, 40952, 28183, 32310, 20053, 24180, 11923, 16050, 3793, 7920 ], 
        r.type = y.miniCopy, r.m_process_pos = 0, r.m_packet_cmd = 0, r.m_cmd_status = 0, 
        r.m_data_length = 0, r.m_data_crc16 = 0, r;
    }
    return o(s, [ {
        key: "calcCRC16",
        value: function(e) {
            for (var t = 65535, r = 0, i = e.length; r < i; ++r) {
                var s = 255 & (e[r] ^ t >> 8);
                t = this.crc_table[s] ^ t << 8;
            }
            return 65535 & t;
        }
    }, {
        key: "packetU8Buffer",
        value: function(e, t, r) {
            if (!(Number.isInteger(e) && Number.isInteger(t))) throw "packetU8Buffer 检测到有不合格的传入参数，请解决这个问题！";
            var i = new Array();
            i.push(1, 11), i.push(e, t);
            var s = new Uint8Array(2);
            return null != r ? (_.num2Bytes(r.length, 2, s), Array.prototype.push.apply(i, s), 
            s[0] = s[1] = 0, Array.prototype.push.apply(i, s), Array.prototype.push.apply(i, r)) : i.push(0, 0, 0, 0), 
            i.push(23, 4), _.num2Bytes(this.calcCRC16(i), 2, s), i[6] = s[0], i[7] = s[1], new Uint8Array(i);
        }
    }, {
        key: "resetDataParseParam",
        value: function() {
            this.m_process_pos = 0, this.m_packet_cmd = 0, this.m_cmd_status = 0, this.m_data_length = 0, 
            this.m_data_crc16 = 0;
        }
    }, {
        key: "onResponseDataParse",
        value: function(e) {
            if (e.length < 10) console.log("检测到接收缓冲区中的数据量太小，不足以形成一个最小包！"); else {
                var t = !1;
                try {
                    if (0 == this.m_process_pos) {
                        if (1 != e[this.m_process_pos++] || 11 != e[this.m_process_pos++]) return console.error("包头无效"), 
                        void (t = !0);
                        if (this.m_packet_cmd = e[this.m_process_pos++], 0 == this.m_packet_cmd) return console.error("通信异常，非法访问！（cmd == 0x00）"), 
                        void (t = !0);
                        this.m_cmd_status = e[this.m_process_pos++], this.m_data_length = _.bytes2Num(e, this.m_process_pos, 2), 
                        this.m_process_pos += 2, this.m_data_crc16 = _.bytes2Num(e, this.m_process_pos, 2), 
                        e[this.m_process_pos] = 0, e[this.m_process_pos + 1] = 0, this.m_process_pos += 2;
                    }
                    if (this.m_process_pos + this.m_data_length + 2 > e.length) return void console.log("数据不完整，等待下一帧！");
                    var r = null;
                    if (this.m_data_length > 0 && (r = e.slice(this.m_process_pos, this.m_process_pos + this.m_data_length), 
                    this.m_process_pos += this.m_data_length), 23 != e[this.m_process_pos++] || 4 != e[this.m_process_pos++]) return console.error("包尾无效"), 
                    void (t = !0);
                    if (this.calcCRC16(e.slice(0, this.m_process_pos)) != this.m_data_crc16) return console.error("BLE通信异常，CRC校验失败，将自动重试通信！"), 
                    void (t = !0);
                    var i = new E.ResponseData(this.m_packet_cmd, this.m_cmd_status, r);
                    return this.resetDataParseParam(), e.length = 0, i;
                } finally {
                    t && (this.resetDataParseParam(), l());
                }
            }
        }
    }, {
        key: "transfer",
        value: function(e, t, r, i, s, n, o) {
            var a = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : "writeNoResponse", c = this.packetU8Buffer(e, t, r);
            this.sendAndWaitResponse(_.bleServiceUUIDDefinition.MINICOPY_SERVICE_UUID_STR, _.bleServiceUUIDDefinition.MINICOPY_SEND_CHARACT_STR, e, c, i, s, n, o, a);
        }
    }, {
        key: "requestGetFactroyConfig",
        value: function(e, t) {
            this.transfer(s.CMD.RCOPY_CMD_FACTROY_INFO_OTP_GET, 0, null, e, !1, !0, t);
        }
    }, {
        key: "requestFirmwareVerCodes",
        value: function(e, t) {
            this.transfer(s.CMD.RCOPY_CMD_GET_FIRMWARE_VERSION, 0, null, e, !1, !0, t);
        }
    }, {
        key: "requestGetBLEDeviceName",
        value: function(e, t) {
            this.transfer(s.CMD.RCOPY_CMD_DEVICE_NAME_GET, 0, null, e, !1, !0, t);
        }
    }, {
        key: "requestGetDeviceConfigs",
        value: function(e, t) {
            this.transfer(s.CMD.RCOPY_CMD_DEVICE_CONFIG_GET, 0, null, e, !1, !0, t);
        }
    }, {
        key: "requestSetDeviceConfigs",
        value: function(e, t, r) {
            this.transfer(s.CMD.RCOPY_CMD_DEVICE_CONFIG_SET, 0, new Uint8Array(e), t, !1, !0, r);
        }
    }, {
        key: "requestGetBaseDeviceInfo",
        value: function(e, t) {
            var r = this;
            r.requestFirmwareVerCodes(1500, function(i) {
                null == i ? t() : (r.device_firmware_ver_info.codeNumber = 65535 & (i.data[0] << 8 & 65535 | 255 & i.data[1]), 
                r.device_firmware_ver_info.codeString = "".concat(i.data[0], ".").concat(i.data[1]), 
                r.requestGetFactroyConfig(2e3, function(i) {
                    if (null == i || i.status != p.minicopy.FLASH_OPERATE_SUCC_RET) t(); else {
                        var s = _.bytes2OTPInfo(i.data);
                        r.device_factroy_otp_info.serial = s.serial, r.device_factroy_otp_info.hardware = s.hw_ver, 
                        r.device_factroy_otp_info.oscxtal = s.oscxtal, r.device_factroy_otp_info.otpflag = s.otpflag, 
                        r.requestGetBLEDeviceName(2e3, function(i) {
                            null == i || i.status != p.minicopy.FLASH_OPERATE_SUCC_RET ? t() : (r.name = _.utf8ToString(i.data), 
                            console.log("通过协议读取到的设备名是: " + r.name), e());
                        });
                    }
                }));
            });
        }
    }, {
        key: "onMakeBLEWorkAfterConnected",
        value: function(e) {
            var t = this;
            function r(e, r) {
                t.disconnect(function() {
                    c.throwAdapterErrMessage({
                        errno: 1509005,
                        errCode: e,
                        errMsg: r
                    });
                });
            }
            t.setCharacteristicValueChangeEnable(!0, _.bleServiceUUIDDefinition.MINICOPY_SERVICE_UUID_STR, _.bleServiceUUIDDefinition.MINICOPY_RECV_CHARACT_STR, function() {
                t.requestGetBaseDeviceInfo(function() {
                    "ffffffffffffffffffffffffffffffff" == t.device_factroy_otp_info.serial.toLowerCase() ? r(10101, "复卡机出厂信息为空，需要返厂重新录入。") : e();
                }, function() {
                    r(10100, "获取复卡机设备信息失败");
                });
            });
        }
    }, {
        key: "getServiceMapDefinition",
        value: function() {
            var e = {};
            return e[_.bleServiceUUIDDefinition.MINICOPY_SERVICE_UUID_STR] = [ _.bleServiceUUIDDefinition.MINICOPY_SEND_CHARACT_STR, _.bleServiceUUIDDefinition.MINICOPY_RECV_CHARACT_STR ], 
            e;
        }
    }, {
        key: "requestReadChipUniqueID",
        value: function(e, t) {
            this.transfer(s.CMD.RCOPY_CMD_CHIP_UNIQUE_ID, 0, null, e, !1, !0, t);
        }
    }, {
        key: "requestSetFactroyConfig",
        value: function(e, t, r, i, n) {
            var o = new Array();
            Array.prototype.push.apply(o, e), Array.prototype.push.apply(o, t), Array.prototype.push.apply(o, [ r, 0 ]), 
            this.transfer(s.CMD.RCOPY_CMD_FACTROY_INFO_OTP_SET, 0, new Uint8Array(o), i, !1, !0, n);
        }
    }, {
        key: "requestSetBLEDeviceName",
        value: function(e, t, r) {
            var i = _.strToUTF8(e);
            console.log('requestSetBLEDeviceName 检测到设备名称 "'.concat(e, '" 占用字节数: ') + i.length), 
            this.transfer(s.CMD.RCOPY_CMD_DEVICE_NAME_SET, 0, new Uint8Array(i), t, !1, !0, r);
        }
    } ], [ {
        key: "isThisMe",
        value: function(e) {
            return _.isThisDeviceByServices(e, [ _.bleServiceUUIDDefinition.MINICOPY_SERVICE_UUID_STR ]);
        }
    } ]), s;
}();

O.TYPE_HEX = {
    B401: y.miniCopy,
    B402: y.svipCopy
}, O.CMD = {
    RCOPY_CMD_NESTED_DETDIST: 48,
    RCOPY_CMD_NESTED_DEFAULT: 49,
    RCOPY_CMD_FCHK_OneSECTOR: 50,
    RCOPY_CMD_SCAN_TAG_FIELD: 51,
    RCOPY_CMD_DARKSIDE_RECOVER: 52,
    RCOPY_CMD_ANTENNA_DELAY: 53,
    RCOPY_CMD_DARKSIDE_DETECT: 54,
    RCOPY_CMD_STATICNESTED_DETECT: 55,
    RCOPY_CMD_WEAKNESTED_DETECT: 56,
    RCOPY_CMD_READER_LF: 57,
    RCOPY_CMD_WRITE_82XX: 64,
    RCOPY_CMD_CHIP_UNIQUE_ID: 65,
    RCOPY_CMD_WRITE_55XX: 66,
    RCOPY_CMD_AUTH_MF_USE_522: 67,
    RCOPY_CMD_READ_MF_1_BLOCK: 68,
    RCOPY_CMD_READ_MF_N_BLOCK: 69,
    RCOPY_CMD_WRITE_MF_1_BLOCK: 70,
    RCOPY_CMD_WRITE_MF_N_BLOCK: 71,
    RCOPY_CMD_READ_GEN1A_1_BLOCK: 72,
    RCOPY_CMD_READ_GEN1A_N_BLOCK: 73,
    RCOPY_CMD_WRITE_GEN1A_1_BLOCK: 80,
    RCOPY_CMD_WRITE_GEN1A_N_BLOCK: 81,
    RCOPY_CMD_UNLOCK_GEN1A_TAG: 82,
    RCOPY_CMD_UPLOCK_GEN1A_TAG: 83,
    RCOPY_CMD_FCHK_AllSECTOR: 84,
    RCOPY_CMD_GEN1A_DETECT: 85,
    RCOPY_CMD_14ASTD_ATS_GET: 86,
    RCOPY_CMD_MFSTD_NT_CHECK: 87,
    RCOPY_CMD_MFSIZE_MAX_CHECK: 88,
    RCOPY_CMD_READ_SOMEKEYB: 89,
    RCOPY_CMD_MF_KNOWN_CHECK: 96,
    RCOPY_CMD_ST_NT2_VARIABLES_DETECT: 97,
    RCOPY_CMD_ST_NT2_VARIABLES_COLLECT: 98,
    RCOPY_CMD_GET_FIRMWARE_VERSION: 99,
    RCOPY_CMD_82XX_WRITE_BLOCK: 100,
    RCOPY_CMD_82XX_READ_BLOCK: 101,
    RCOPY_CMD_FACTROY_INFO_OTP_SET: 102,
    RCOPY_CMD_FACTROY_INFO_OTP_GET: 103,
    RCOPY_CMD_DEVICE_NAME_SET: 104,
    RCOPY_CMD_DEVICE_NAME_GET: 105,
    RCOPY_CMD_NESTED_CORE2: 112,
    RCOPY_CMD_14443_A_RAW_CMD: 113,
    RCOPY_CMD_GDM_TEST_VALID: 114,
    RCOPY_CMD_GDM_READ_BLOCK_ONCE: 115,
    RCOPY_CMD_GDM_READ_BLOCK_MULT: 116,
    RCOPY_CMD_GDM_WRITE_BLOCK_ONCE: 117,
    RCOPY_CMD_GDM_WRITE_BLOCK_MULT: 118,
    RCOPY_CMD_HARD_NONCES_ACQUIRE: 119,
    RCOPY_CMD_STATIC_HARD_CHECK: 120,
    RCOPY_CMD_DEVICE_CONFIG_GET: 128,
    RCOPY_CMD_DEVICE_CONFIG_SET: 129
};

var d = function() {
    function t(e) {
        a(this, t), this.device = e;
    }
    return o(t, [ {
        key: "close",
        value: function(e) {
            this.device.disconnect(e);
        }
    }, {
        key: "transfer",
        value: function(e, t, r, i, s) {
            this.device.transfer(e, t, r, i, !0, !1, s);
        }
    }, {
        key: "requestOnce410FieldScan",
        value: function(e, t) {
            switch (this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_READER_LF, 0, null, e, t);
            }
        }
    }, {
        key: "requestOnceWrite55XXTag",
        value: function(e, t, r) {
            var i = new Array();
            switch (Array.prototype.push.apply(i, e), Array.prototype.push.apply(i, [ 32, 32, 102, 102 ]), 
            [ [ 81, 36, 54, 72 ], [ 25, 146, 4, 39 ] ].forEach(function(e) {
                return Array.prototype.push.apply(i, e);
            }), this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_WRITE_55XX, 0, new Uint8Array(i), t, r);
            }
        }
    }, {
        key: "requestOnceWrite82XXTag",
        value: function(e, t, r) {
            var i = new Array();
            switch (Array.prototype.push.apply(i, e), [ [ 187, 221, 51, 153 ] ].forEach(function(e) {
                return Array.prototype.push.apply(i, e);
            }), this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_WRITE_82XX, 0, new Uint8Array(i), t, r);
            }
        }
    }, {
        key: "requestMfAuthentication",
        value: function(e, t, r, i, s) {
            var n = new Array();
            switch (n.push(t, e), Array.prototype.push.apply(n, r), this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_AUTH_MF_USE_522, 0, new Uint8Array(n), i, s);
            }
        }
    }, {
        key: "requestRDBLOnceStandard",
        value: function(e, t, r, i, s) {
            var n = new Array();
            switch (n.push(t, e), Array.prototype.push.apply(n, r), this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_READ_MF_1_BLOCK, 0, new Uint8Array(n), i, s);
            }
        }
    }, {
        key: "requestRDSCOnceStandard",
        value: function(e, t, r, i, s, n) {
            var o = new Array();
            o.push(t, u.mifare_sector_2_block(e)), Array.prototype.push.apply(o, r);
            for (var a = [ 0, 0 ], c = 0; c < i.length; c++) {
                var _ = i[c];
                if (_ >= 16 || _ < 0) throw "requestRDSCOnceStandard 判断有无效的使能读取block：" + _;
                a[_ / 8 & 255] |= 1 << (_ % 8 & 255);
            }
            switch (Array.prototype.push.apply(o, a), this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_READ_MF_N_BLOCK, 0, new Uint8Array(o), s, n);
            }
        }
    }, {
        key: "requestWRBLOnceStandard",
        value: function(e, t, r, i, s, n) {
            var o = new Array();
            switch (o.push(t, e), Array.prototype.push.apply(o, r), Array.prototype.push.apply(o, i), 
            this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_WRITE_MF_1_BLOCK, 0, new Uint8Array(o), s, n);
            }
        }
    }, {
        key: "requestWRBLMoreStandard",
        value: function(e, t, r, i, s, n, o) {
            if (i.length != s.length) {
                var a = "requestWRBLMoreStandard 检测到使能列表和传入的block数据组大小不匹配！";
                throw console.log(a), a;
            }
            var c = new Array();
            c.push(t, u.mifare_sector_2_block(e)), Array.prototype.push.apply(c, r);
            for (var _ = [ 0, 0 ], p = 0; p < i.length; p++) {
                var C = i[p];
                if (C >= 16 || C < 0) throw "requestWRBLMoreStandard 判断有无效的使能读取block：" + C;
                _[C / 8 & 255] |= 1 << (C % 8 & 255);
            }
            switch (Array.prototype.push.apply(c, _), s.forEach(function(e) {
                return Array.prototype.push.apply(c, e);
            }), this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_WRITE_MF_N_BLOCK, 0, new Uint8Array(c), n, o);
            }
        }
    }, {
        key: "requestRDBLOnceNoKeyRequire",
        value: function(e, t, r, i) {
            switch (this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(e, 0, new Uint8Array([ t ]), r, i);
            }
        }
    }, {
        key: "requestRDBLMoreNoKeyRequire",
        value: function(e, t, r, i, s) {
            var n = new Array();
            switch (n.push(t, r), this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(e, 0, new Uint8Array(n), i, s);
            }
        }
    }, {
        key: "requestWRBLOnceNoKeyRequire",
        value: function(e, t, r, i, s) {
            var n = new Array();
            switch (n.push(t), Array.prototype.push.apply(n, r), this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(e, 0, new Uint8Array(n), i, s);
            }
        }
    }, {
        key: "requestWRBLMoreNoKeyRequire",
        value: function(e, t, r, i, s) {
            var n = new Array();
            switch (n.push(t, r.length), r.forEach(function(e) {
                return Array.prototype.push.apply(n, e);
            }), this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(e, 0, new Uint8Array(n), i, s);
            }
        }
    }, {
        key: "requestRDBLOnceGen1ATag",
        value: function(e, t, r) {
            switch (this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.requestRDBLOnceNoKeyRequire(O.CMD.RCOPY_CMD_READ_GEN1A_1_BLOCK, e, t, r);
            }
        }
    }, {
        key: "requestRDBLMoreGen1ATag",
        value: function(e, t, r, i) {
            switch (this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.requestRDBLMoreNoKeyRequire(O.CMD.RCOPY_CMD_READ_GEN1A_N_BLOCK, e, t, r, i);
            }
        }
    }, {
        key: "requestWRBLOnceGen1ATag",
        value: function(e, t, r, i) {
            switch (this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.requestWRBLOnceNoKeyRequire(O.CMD.RCOPY_CMD_WRITE_GEN1A_1_BLOCK, e, t, r, i);
            }
        }
    }, {
        key: "requestWRBLMoreGen1ATag",
        value: function(e, t, r, i) {
            switch (this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.requestWRBLMoreNoKeyRequire(O.CMD.RCOPY_CMD_WRITE_GEN1A_N_BLOCK, e, t, r, i);
            }
        }
    }, {
        key: "requestOnce14AFieldScan",
        value: function(e, t) {
            switch (this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_SCAN_TAG_FIELD, 0, null, e, t);
            }
        }
    }, {
        key: "request14AGetATSDataArr",
        value: function(e, t) {
            switch (this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_14ASTD_ATS_GET, 0, null, e, t);
            }
        }
    }, {
        key: "requestFCheckMf1SecKeysImpl",
        value: function(e, t, r, i, s) {
            var n = new Array();
            switch (n.push(t, e), r.forEach(function(e) {
                return Array.prototype.push.apply(n, "string" == typeof e ? _.hex2bytes(e) : e);
            }), this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_FCHK_OneSECTOR, 0, new Uint8Array(n), i, s);
            }
        }
    }, {
        key: "requestFCheckMf1SecKeys",
        value: function(e, t, r, i, s) {
            var n = this;
            if (r.length > 80) {
                var o = _.chunkArray(r, 80), a = 0;
                n.requestFCheckMf1SecKeysImpl(e, t, o[a++], i, function c(_) {
                    if (null == _) s(null); else if (_.status == p.minicopy.HF_TAG_OK) if (255 != _.data[0]) {
                        var u = 80 * (a - 1) + _.data[0];
                        _.data = [ u ], s(_);
                    } else console.log("当前进度: ".concat(a, ", ").concat(o.length)), a >= o.length ? (_.data = [ r.length ], 
                    s(_)) : n.requestFCheckMf1SecKeysImpl(e, t, o[a++], i, c); else s(_);
                });
            } else n.requestFCheckMf1SecKeysImpl(e, t, r, i, s);
        }
    }, {
        key: "requestFCheckMfNSecKeys",
        value: function(e, t, r, i) {
            if (!(e instanceof Uint8Array || e instanceof Array)) throw "requestFCheckMfNSecKeys只允许传入数组，该数组是需要批量验证密钥的扇区，最小0，最大39。";
            for (var s = [ 0, 0, 0, 0, 0 ], n = 0; n < e.length; n++) {
                var o = e[n];
                if (o >= 40 || o < 0) throw "requestFCheckMfNSecKeys 判断有无效的使能验证扇区：" + o;
                s[o / 8 & 255] |= 1 << (o % 8 & 255);
            }
            var a = new Array();
            switch (Array.prototype.push.apply(a, s), t.forEach(function(e) {
                return Array.prototype.push.apply(a, "string" == typeof e ? _.hex2bytes(e) : e);
            }), this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_FCHK_AllSECTOR, 0, new Uint8Array(a), r, i);
            }
        }
    }, {
        key: "requestMfReadKeyBByKeyA",
        value: function(t, r, i) {
            if ("object" != e(t)) throw "requestMfReadKeyBByKeyA只允许传入映射表，该数组是需要批量读取密钥B的扇区到密钥的映射列表";
            for (var s = [ 0, 0, 0, 0, 0 ], n = [], o = 0, a = Object.keys(t); o < a.length; o++) {
                var c = a[o];
                if (c >= 40 || c < 0) throw "requestMfReadKeyBByKeyA 判断有无效的使能验证扇区：" + c;
                s[c / 8 & 255] |= 1 << (c % 8 & 255), n.push(t[c]);
            }
            var p = new Array();
            switch (Array.prototype.push.apply(p, s), n.forEach(function(e) {
                return Array.prototype.push.apply(p, "string" == typeof e ? _.hex2bytes(e) : e);
            }), this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_READ_SOMEKEYB, 0, new Uint8Array(p), r, i);
            }
        }
    }, {
        key: "requestNestedDistDetect",
        value: function(e, t, r, i, s) {
            var n = new Array();
            switch (n.push(t, e), Array.prototype.push.apply(n, r), this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_NESTED_DETDIST, 0, new Uint8Array(n), i, s);
            }
        }
    }, {
        key: "requestNested2NtCollect",
        value: function(e, t, r, i, s, n, o) {
            var a = new Array();
            switch (a.push(t, e), Array.prototype.push.apply(a, r), a.push(s, i), this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_NESTED_DEFAULT, 0, new Uint8Array(a), n, o);
            }
        }
    }, {
        key: "requestDarksideRecovery",
        value: function(e, t, r, i, s, n) {
            var o = new Array();
            switch (o.push(t, e), o.push(r, i), this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_DARKSIDE_RECOVER, 0, new Uint8Array(o), s, n);
            }
        }
    }, {
        key: "requestMF1AntResetDelay",
        value: function(e, t, r) {
            var i = new ArrayBuffer(4);
            switch (new DataView(i).setUint32(0, e), this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_ANTENNA_DELAY, 0, new Uint8Array(i), t, r);
            }
        }
    }, {
        key: "requestGEN1ATAGLoophole",
        value: function(e, t) {
            switch (this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_GEN1A_DETECT, 0, null, e, t);
            }
        }
    }, {
        key: "requestDarksideLoophole",
        value: function(e, t) {
            switch (this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_DARKSIDE_DETECT, 0, null, e, t);
            }
        }
    }, {
        key: "requestStaticNTLoophole",
        value: function(e, t) {
            switch (this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_STATICNESTED_DETECT, 0, null, e, t);
            }
        }
    }, {
        key: "requestNestedNTLoophole",
        value: function(e, t) {
            switch (this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_WEAKNESTED_DETECT, 0, null, e, t);
            }
        }
    }, {
        key: "requestCheckMf3TimeAuth",
        value: function(e, t) {
            switch (this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_MFSTD_NT_CHECK, 0, null, e, t);
            }
        }
    }, {
        key: "requestCheckMfBlockSize",
        value: function(e, t) {
            switch (this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_MFSIZE_MAX_CHECK, 0, null, e, t);
            }
        }
    }, {
        key: "requestUnlockChineseTag",
        value: function(e, t) {
            switch (this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_UNLOCK_GEN1A_TAG, 0, null, e, t);
            }
        }
    }, {
        key: "requestUplockChineseTag",
        value: function(e, t) {
            switch (this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_UPLOCK_GEN1A_TAG, 0, null, e, t);
            }
        }
    }, {
        key: "requestAuthMF1KnownKeys",
        value: function(e, t, r) {
            var i = new Array();
            switch (e.forEach(function(e) {
                return Array.prototype.push.apply(i, e);
            }), this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_MF_KNOWN_CHECK, 0, new Uint8Array(i), t, r);
            }
        }
    }, {
        key: "requestNTLoopholeByKey",
        value: function(e, t, r, i, s, n) {
            var o = new Array();
            switch (o.push(t, e), Array.prototype.push.apply(o, r), this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(s, 0, new Uint8Array(o), i, n);
            }
        }
    }, {
        key: "requestSTDiffNTLoophole",
        value: function(e, t, r, i, s) {
            this.requestNTLoopholeByKey(e, t, r, i, O.CMD.RCOPY_CMD_ST_NT2_VARIABLES_DETECT, s);
        }
    }, {
        key: "requestSTHardNTLoophole",
        value: function(e, t, r, i, s) {
            this.requestNTLoopholeByKey(e, t, r, i, O.CMD.RCOPY_CMD_STATIC_HARD_CHECK, s);
        }
    }, {
        key: "requestSTDiff2NtCollect",
        value: function(e, t, r, i, s, n, o) {
            var a = new Array();
            switch (a.push(t, e), Array.prototype.push.apply(a, r), a.push(s, i), this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_ST_NT2_VARIABLES_COLLECT, 0, new Uint8Array(a), n, o);
            }
        }
    }, {
        key: "requestReadThe82XXBlock",
        value: function(e, t, r, i) {
            var s = new Array();
            switch (s.push(e), Array.prototype.push.apply(s, t), this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_82XX_READ_BLOCK, 0, new Uint8Array(s), r, i);
            }
        }
    }, {
        key: "requestWriteZX82XXBlock",
        value: function(e, t, r, i, s) {
            var n = new Array();
            switch (n.push(e), Array.prototype.push.apply(n, t), Array.prototype.push.apply(n, r), 
            this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_82XX_WRITE_BLOCK, 0, new Uint8Array(n), i, s);
            }
        }
    }, {
        key: "requestNestedL2Recovery",
        value: function(e, t, r, i, s, n, o, a) {
            var c = new Array();
            switch (e = e ? 1 : 0, c.push(e, r, t), Array.prototype.push.apply(c, i), c.push(n, s), 
            this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_NESTED_CORE2, 0, new Uint8Array(c), o, a);
            }
        }
    }, {
        key: "request14443ARAWCommand",
        value: function(e, t, r) {
            if (!(e instanceof S)) throw "configObj 非 Raw14aArgs 类型，请确认您的传入参数类型！";
            var i = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
            i[0] = e.readResponse ? 1 : 0, i[1] = e.appendCRC ? 1 : 0, i[2] = e.bitsFrame ? 1 : 0, 
            i[3] = e.autoSelect ? 1 : 0, i[4] = e.keepField ? 1 : 0, i[5] = e.checkRespCRC ? 1 : 0, 
            i[6] = e.bitsNumber;
            var s = [ 0, 0 ];
            _.num2Bytes(e.respTimeout, 2, s), i[7] = s[0], i[8] = s[1], t && t.length > 0 && Array.prototype.push.apply(i, t);
            var n = e.respTimeout + 3e3;
            switch (this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_14443_A_RAW_CMD, 0, new Uint8Array(i), n, r);
            }
        }
    }, {
        key: "requestCheckValidGDMTag",
        value: function(e, t) {
            switch (this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_GDM_TEST_VALID, 0, null, e, t);
            }
        }
    }, {
        key: "requestRDBLOnceMFGDMTag",
        value: function(e, t, r) {
            switch (this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.requestRDBLOnceNoKeyRequire(O.CMD.RCOPY_CMD_GDM_READ_BLOCK_ONCE, e, t, r);
            }
        }
    }, {
        key: "requestRDBLMoreMFGDMTag",
        value: function(e, t, r, i) {
            switch (this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.requestRDBLMoreNoKeyRequire(O.CMD.RCOPY_CMD_GDM_READ_BLOCK_MULT, e, t, r, i);
            }
        }
    }, {
        key: "requestWRBLOnceMFGDMTag",
        value: function(e, t, r, i) {
            switch (this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.requestWRBLOnceNoKeyRequire(O.CMD.RCOPY_CMD_GDM_WRITE_BLOCK_ONCE, e, t, r, i);
            }
        }
    }, {
        key: "requestWRBLMoreMFGDMTag",
        value: function(e, t, r, i) {
            switch (this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.requestWRBLMoreNoKeyRequire(O.CMD.RCOPY_CMD_GDM_WRITE_BLOCK_MULT, e, t, r, i);
            }
        }
    }, {
        key: "requestHardNestedNonces",
        value: function(e, t, r, i, s, n, o, a) {
            var c = new Array();
            switch (e = e ? 1 : 0, c.push(e, r, t), Array.prototype.push.apply(c, i), c.push(n, s), 
            this.device.type) {
              case y.miniCopy:
              case y.svipCopy:
                this.transfer(O.CMD.RCOPY_CMD_HARD_NONCES_ACQUIRE, 0, new Uint8Array(c), o, a);
            }
        }
    } ]), t;
}(), m = function(t) {
    r(n, d);
    var s = i(n);
    function n(e) {
        var t;
        return a(this, n), (t = s.call(this, e)).requestOnce410FieldScan = t.proxy(t.requestOnce410FieldScan, p.minicopy.LF_TAG_OK), 
        t.requestOnceWrite55XXTag = t.proxy(t.requestOnceWrite55XXTag, p.minicopy.LF_TAG_OK), 
        t.requestOnceWrite82XXTag = t.proxy(t.requestOnceWrite82XXTag, p.minicopy.LF_TAG_OK), 
        t.requestOnce14AFieldScan = t.proxy(t.requestOnce14AFieldScan, p.minicopy.HF_TAG_OK), 
        t.requestMfAuthentication = t.proxy(t.requestMfAuthentication, p.minicopy.HF_TAG_OK), 
        t.request14AGetATSDataArr = t.proxy(t.request14AGetATSDataArr, p.minicopy.HF_TAG_OK), 
        t.requestCheckMf3TimeAuth = t.proxy(t.requestCheckMf3TimeAuth, p.minicopy.HF_TAG_OK), 
        t.requestCheckMfBlockSize = t.proxy(t.requestCheckMfBlockSize, p.minicopy.HF_TAG_OK), 
        t.requestRDBLOnceStandard = t.proxy(t.requestRDBLOnceStandard, p.minicopy.HF_TAG_OK), 
        t.requestRDSCOnceStandard = t.proxy(t.requestRDSCOnceStandard, p.minicopy.HF_TAG_OK), 
        t.requestWRBLOnceStandard = t.proxy(t.requestWRBLOnceStandard, p.minicopy.HF_TAG_OK), 
        t.requestWRBLMoreStandard = t.proxy(t.requestWRBLMoreStandard, p.minicopy.HF_TAG_OK), 
        t.requestRDBLOnceGen1ATag = t.proxy(t.requestRDBLOnceGen1ATag, p.minicopy.HF_TAG_OK), 
        t.requestRDBLMoreGen1ATag = t.proxy(t.requestRDBLMoreGen1ATag, p.minicopy.HF_TAG_OK), 
        t.requestWRBLOnceGen1ATag = t.proxy(t.requestWRBLOnceGen1ATag, p.minicopy.HF_TAG_OK), 
        t.requestWRBLMoreGen1ATag = t.proxy(t.requestWRBLMoreGen1ATag, p.minicopy.HF_TAG_OK), 
        t.requestFCheckMf1SecKeys = t.proxy(t.requestFCheckMf1SecKeys, p.minicopy.HF_TAG_OK), 
        t.requestFCheckMfNSecKeys = t.proxy(t.requestFCheckMfNSecKeys, p.minicopy.HF_TAG_OK), 
        t.requestMfReadKeyBByKeyA = t.proxy(t.requestMfReadKeyBByKeyA, p.minicopy.HF_TAG_OK), 
        t.requestNestedDistDetect = t.proxy(t.requestNestedDistDetect, p.minicopy.HF_TAG_OK), 
        t.requestNested2NtCollect = t.proxy(t.requestNested2NtCollect, p.minicopy.HF_TAG_OK), 
        t.requestDarksideRecovery = t.proxy(t.requestDarksideRecovery, p.minicopy.HF_TAG_OK), 
        t.requestMF1AntResetDelay = t.proxy(t.requestMF1AntResetDelay, p.minicopy.HF_TAG_OK), 
        t.requestGEN1ATAGLoophole = t.proxy(t.requestGEN1ATAGLoophole, p.minicopy.HF_TAG_OK), 
        t.requestDarksideLoophole = t.proxy(t.requestDarksideLoophole, p.minicopy.HF_TAG_OK), 
        t.requestUnlockChineseTag = t.proxy(t.requestUnlockChineseTag, p.minicopy.HF_TAG_OK), 
        t.requestUplockChineseTag = t.proxy(t.requestUplockChineseTag, p.minicopy.HF_TAG_OK), 
        t.requestAuthMF1KnownKeys = t.proxy(t.requestAuthMF1KnownKeys, p.minicopy.HF_TAG_OK), 
        t.requestSTDiff2NtCollect = t.proxy(t.requestSTDiff2NtCollect, p.minicopy.HF_TAG_OK), 
        t.requestNestedL2Recovery = t.proxy(t.requestNestedL2Recovery, p.minicopy.HF_TAG_OK), 
        t.requestRDBLOnceMFGDMTag = t.proxy(t.requestRDBLOnceMFGDMTag, p.minicopy.HF_TAG_OK), 
        t.requestRDBLMoreMFGDMTag = t.proxy(t.requestRDBLMoreMFGDMTag, p.minicopy.HF_TAG_OK), 
        t.requestWRBLOnceMFGDMTag = t.proxy(t.requestWRBLOnceMFGDMTag, p.minicopy.HF_TAG_OK), 
        t.requestWRBLMoreMFGDMTag = t.proxy(t.requestWRBLMoreMFGDMTag, p.minicopy.HF_TAG_OK), 
        t.requestHardNestedNonces = t.proxy(t.requestHardNestedNonces, p.minicopy.HF_TAG_OK), 
        t.requestStaticNTLoophole = t.proxy(t.requestStaticNTLoophole, [ p.minicopy.HF_TAG_OK, p.minicopy.NESTED_TAG_IS_STATIC ]), 
        t.requestNestedNTLoophole = t.proxy(t.requestNestedNTLoophole, [ p.minicopy.HF_TAG_OK, p.minicopy.NESTED_TAG_IS_STATIC, p.minicopy.NESTED_TAG_IS_HARD ]), 
        t.requestSTDiffNTLoophole = t.proxy(t.requestSTDiffNTLoophole, [ p.minicopy.HF_TAG_OK, p.minicopy.NESTED_TAG_IS_STATIC_VARIABLES_NT2 ]), 
        t.requestSTHardNTLoophole = t.proxy(t.requestSTHardNTLoophole, [ p.minicopy.HF_TAG_OK, p.minicopy.NESTED_TAG_IS_HARD, p.minicopy.NESTED_TAG_IS_STATIC_HARD ]), 
        t;
    }
    return o(n, [ {
        key: "proxy",
        value: function(t, r) {
            var i = this;
            return function() {
                if (0 == arguments.length || "function" != typeof arguments[arguments.length - 1]) throw "无法自动封箱代理该函数，开发者至少要保证onRespCall在实参结尾被定义：" + arguments.callee;
                var s = arguments[arguments.length - 1];
                arguments[arguments.length - 1] = function(t) {
                    if (r instanceof Uint8Array || r instanceof Array) -1 != r.indexOf(t.status) ? s(t) : v(t.status); else {
                        if ("number" != typeof r) throw "开发者传入参数异常，proxyTagErrorEvent 不支持此类型的状态值: " + e(r);
                        t.status == r ? s(t) : v(t.status);
                    }
                }, t.apply(i, Array.prototype.slice.call(arguments, 0));
            };
        }
    } ]), n;
}(), S = o(function e() {
    a(this, e), this.readResponse = !0, this.appendCRC = !0, this.bitsFrame = !1, this.autoSelect = !1, 
    this.keepField = !1, this.checkRespCRC = !1, this.bitsNumber = 0, this.respTimeout = 250;
});

function q(e) {
    null != D && (D.address in f && delete f[D.address], D = null, console.log("".concat(e, "后， 发现蓝牙断开链接成功，已经自动进行资源回收。")));
}

c.registerOnBLEDisconnectedCallback(function(e) {
    var t = null;
    null != e && (t = e.deviceId);
    var r = null;
    null != D && (r = D.address), console.log("全局监听的BLE链接断开信息：通知的设备地址 = ".concat(t, ", 缓存的设备地址 = ").concat(r)), 
    null != t && null != r && t == r && q("全局监听BLE链接");
}), module.exports = {
    DeviceType: y,
    Raw14aArgs: S,
    DeviceClass: {
        BluetoothLowEnergyStatefulCMD: E,
        MiniCopy: O,
        RFIDReader: d,
        RFIDReaderStateful: m
    },
    connectAutoCheckDevice: function(e) {
        if (O.isThisMe(e)) {
            var t = e.deviceAdvDeviceType;
            console.log("尝试连接到 ".concat(t));
            var r = new O(e.deviceId);
            r.connect(function() {
                console.log("".concat(t, " 连接成功！")), r.type = t, D = r;
            });
        }
    },
    disconnectExistsDevice: function() {
        null != D && D instanceof c.BaseBluetoothLowEnergy && (D.isConnected() ? D.disconnect(function() {
            q("用户主动断连");
        }) : D = null);
    },
    getDevice: function() {
        return D;
    },
    getReader: function(e) {
        var t = D.address, r = null;
        return r = t in f ? f[t] : f[t] = {
            stateful: new m(D),
            normal: new d(D)
        }, e ? r.stateful : r.normal;
    },
    getSerial: function() {
        var e = "unknown";
        return D instanceof O && (e = D.device_factroy_otp_info.serial), e;
    },
    onTimeoutCallback: function(e) {
        C = e;
    },
    onComErrCallback: function(e) {
        l = e;
    },
    onTagErrorCallback: function(e) {
        h = e;
    },
    throwTagErrorEvent: v
};