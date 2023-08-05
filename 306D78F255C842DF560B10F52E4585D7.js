var r = "0000".concat("AE00", "-0000-1000-8000-00805F9B34FB"), e = "0000".concat("FE59", "-0000-1000-8000-00805F9B34FB");

function n(r) {
    return void 0 === r || null == r;
}

function t(r, e, t) {
    return "string" == typeof r ? r : (n(e) && (e = 0), n(t) && (t = r.length), Array.prototype.map.call(r.slice(e, e + t), function(r) {
        return ("00" + r.toString(16)).slice(-2);
    }).join("").toUpperCase());
}

function o(r, e, t) {
    if ("string" != typeof r) return r;
    var o = [];
    n(e) && (e = 0), n(t) && (t = r.length);
    for (var i = e; i < t; i += 2) o.push(parseInt(r.substr(i, 2), 16));
    return o;
}

function i(r, e, n) {
    for (;e--; ) n[e] = 255 & r, r >>= 8;
}

function a(r, e, n) {
    var t = new Uint8Array(r), o = new DataView(t.buffer);
    switch (n) {
      case 2:
        return o.getUint16(e);

      case 4:
        return o.getUint32(e);
    }
    var i = "bytes2Num不支持此转换长度: " + n;
    throw console.error(i), new Error(i);
}

function c(r, e) {
    var n = e && r.length > 0 && r[0] >= 128, t = [];
    return r.forEach(function(e, o) {
        n && (e = 256 - (o == r.length - 1 ? 0 : 1) - e);
        for (var i = 0; e > 0 || i < t.length; i++) e += 256 * (t[i] || 0), t[i] = e % 10, 
        e = (e - t[i]) / 10;
    }), 0 == t.length ? "0" : (n ? "-" : "") + t.reverse().join("");
}

function s(r, e, n) {
    return c(r.slice(e, e + n), !1);
}

function u(r, e, n) {
    return a(r, e, n).toString();
}

module.exports = {
    bleServiceUUIDDefinition: {
        MINICOPY_SERVICE_BASE_UID: "AE00",
        MINICOPY_SERVICE_UUID_STR: r,
        MINICOPY_SEND_CHARACT_STR: "0000AE01-0000-1000-8000-00805F9B34FB",
        MINICOPY_RECV_CHARACT_STR: "0000AE02-0000-1000-8000-00805F9B34FB",
        NRF52_DFU_SERVICE_BASE_UID: "FE59",
        NRF52_DFU_SERVICE_UUID_STR: e,
        NRF52_DFU_PACK_CHARACT_STR: "8EC90002-F315-4F60-9FB8-838830DAEA50",
        NRF52_DFU_CTRL_CHARACT_STR: "8EC90001-F315-4F60-9FB8-838830DAEA50"
    },
    errorMessage: {
        NOT_IMPLEMENTED: "未实现的函数，请开发者实现此函数。"
    },
    addUniqueCallbackToList: function(r, e) {
        if ("function" == typeof e) {
            if (-1 == r.indexOf(e)) return r.push(e), !0;
            console.error("不允许添加重复的引用: " + e);
        } else console.error("不允许添加非回调函数的引用: " + e);
        return !1;
    },
    removeCallbackFromList: function(r, e) {
        if ("function" == typeof e) {
            var n = r.indexOf(e);
            return -1 == n ? (console.error("不存在注册历史的引用: " + e), !1) : (r.splice(n, 1), !0);
        }
        return console.error("不允许添加非回调函数的引用: " + e), !1;
    },
    isSameBleNFCMiniCopyDevice: function(r, e) {
        var n = r.deviceId == e.deviceId, t = !1;
        return r.deviceAdvId && e.deviceAdvId && (t = r.deviceAdvId == e.deviceAdvId), n || t;
    },
    utf8ToString: function(r) {
        var e = "";
        r.forEach(function(r) {
            e += r < 127 ? String.fromCharCode(r) : "%" + r.toString(16).toUpperCase();
        });
        try {
            return decodeURI(e);
        } catch (r) {
            r = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(r);
            return e;
        }
    },
    isThisDeviceByServices: function(r, e) {
        if (0 == r.advertisServiceUUIDs.length) return console.warn("无法通过设备广播的服务UUID来判断是否是该类型的设备，因为该设备没有广播服务UUID。"), 
        !1;
        Array.isArray(e) || (e = Object.keys(e));
        for (var n = 0; n < e.length; n++) {
            var t = e[n].toUpperCase();
            if (-1 != r.advertisServiceUUIDs.indexOf(t)) return !0;
        }
        return !1;
    },
    getStorageSyncHasDefault: function(r, e) {
        var n;
        try {
            var t = wx.getStorageSync(r);
            (null == t || void 0 === t || "string" == typeof t && 0 == t.length) && (t = e), 
            n = t;
        } catch (r) {
            r = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(r);
            n = e, console.log(r);
        }
        return n;
    },
    bytes2hex: t,
    hex2bytes: o,
    num2Bytes: i,
    bytes2Num: a,
    strToUTF8: function(r) {
        for (var e = new Array(), n = 0, t = 0; t < r.length; t++) {
            var o = encodeURI(r[t]);
            if (1 == o.length) e[n++] = o.charCodeAt(0); else for (var i = o.split("%"), a = 1; a < i.length; a++) e[n++] = parseInt("0x" + i[a]);
        }
        return e;
    },
    chunkArray: function(r, e) {
        for (var n = new Array(), t = 0, o = r.length / e, i = 0; i < o; i++) {
            for (var a = new Array(), c = 0; c < e && (a[c] = r[t++], t != r.length); c++) ;
            n[i] = a;
        }
        return n;
    },
    calcIDBcc: function(r, e, t) {
        var o = 0;
        n(e) && (e = 0), n(t) && (t = r.length);
        for (var i = e; i < t; i++) o ^= r[i];
        return o;
    },
    bytes2Uint32Str: u,
    bytes2Uint64Str: s,
    generateUUID: function() {
        var r = new Date().getTime();
        try {
            window.performance && "function" == typeof window.performance.now && (r += performance.now());
        } catch (r) {}
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
            var n = (r + 16 * Math.random()) % 16 | 0;
            return r = Math.floor(r / 16), ("x" == e ? n : 3 & n | 8).toString(16);
        });
    },
    convertEM410x10HIDTo10D: function(r) {
        var e = c(o((r = new Array(11 - r.length).join("0") + r).substring(2)));
        return new Array(11 - e.length).join("0") + e;
    },
    convertEM410x10DIDTo10H: function(r) {
        var e = [];
        i(parseInt(r), 4, e);
        var n = t(e);
        return new Array(11 - n.length).join("0") + n;
    },
    bytes2NestedDistObj: function(r) {
        return (r instanceof Uint8Array || r instanceof Array) && 8 == r.length ? {
            uid: u(r, 0, 4),
            dist: u(r, 4, 4)
        } : (console.log("bytes2NestedDistObj 发现传入的数据不符合规范！"), null);
    },
    bytes2NestedObj: function(r, e, n, t) {
        if ((n instanceof Uint8Array || n instanceof Array) && n.length % 9 == 0) {
            for (var o = new Array(), i = 0; i < n.length; i += 9) {
                var a = {
                    nt1: u(n, i, 4),
                    nt2: u(n, i + 4, 4),
                    par: n[i + 8] + ""
                };
                o.push(a);
            }
            return {
                uid: t.uid,
                dist: t.dist,
                type: "" + e,
                block: "" + r,
                cores: o
            };
        }
        return console.log("bytes2NestedObj 发现传入的数据不符合规范！"), null;
    },
    bytes2StaticNestedObj: function(r, e, n) {
        if ((n instanceof Uint8Array || n instanceof Array) && (n.length - 4) % 8 == 0) {
            for (var t = new Array(), o = u(n, 0, 4), i = 4; i < n.length; i += 8) {
                var a = {
                    nt1: u(n, i, 4),
                    nt2: u(n, i + 4, 4)
                };
                t.push(a);
            }
            return {
                uid: o,
                type: "" + e,
                block: "" + r,
                cores: t
            };
        }
        return console.log("bytes2StaticNestedObj 发现传入的数据不符合规范！"), null;
    },
    bytes2DarksideObj: function(r) {
        return (r instanceof Uint8Array || r instanceof Array) && 32 == r.length ? (console.log("par解析结果: " + s(r, 8, 8)), 
        {
            uid: u(r, 0, 4),
            nt1: u(r, 4, 4),
            par: s(r, 8, 8),
            ks1: s(r, 16, 8),
            nr: u(r, 24, 4),
            ar: u(r, 28, 4)
        }) : (console.log("bytes2DarksideObj 发现传入的数据不符合规范！"), null);
    },
    bytes2OTPInfo: function(r) {
        if (20 != r.length) {
            var e = "解析字节数组为OTP信息的时候，发现长度不等于20个字节，这不符合OTP信息的既定长度！";
            throw console.error(e), e;
        }
        return {
            serial: t(r, 0, 16).toLowerCase(),
            hw_ver: r[16] << 8 & 65535 | r[17],
            oscxtal: r[18],
            otpflag: r[19]
        };
    },
    bytes2Nested2Obj: function(r, e, n) {
        if ((n instanceof Uint8Array || n instanceof Array) && (n.length - 4) % 8 == 0) {
            for (var t = new Array(), o = u(n, 0, 4), i = 4, a = 12; a < n.length; i += 4, a += 4) {
                var c = {
                    nt: u(n, i, 4),
                    ks: u(n, a, 4)
                };
                t.push(c);
            }
            return {
                uid: o,
                type: "" + e,
                block: "" + r,
                cores: t
            };
        }
        return console.log("bytes2Nested2Obj 发现传入的数据不符合规范！"), null;
    }
};