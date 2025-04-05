var e = require("@babel/runtime/helpers/createForOfIteratorHelper.js"), t = require("@babel/runtime/helpers/typeof.js"), n = require("614DB8F055C842DF072BD0F70136D685.js"), r = require("AC1F69C355C842DFCA7901C4DB75D685.js"), a = require("CD54331355C842DFAB325B146BB5D685.js"), o = require("605A704755C842DF063C18409AC5D685.js"), c = require("5194A7A455C842DF37F2CFA3A5D5D685.js"), s = require("8896821655C842DFEEF0EA119506D685.js"), u = require("6A5B005755C842DF0C3D685076E5D685.js"), i = require("DFE4D8E455C842DFB982B0E32585D685.js"), l = [ 0, 32, 56, 64, 80, 96, 104, 112, 120, 128, 136, 144, 152, 160, 176, 192, 200, 224, 256 ], f = [], y = 0, _ = 0, E = null, T = null, k = [ "ffffffffffff", "000000000000", "a0a1a2a3a4a5", "d3f7d3f7d3f7", "b0b1b2b3b4b5", "c0c1c2c3c4c5", "d0d1d2d3d4d5", "aabbccddeeff", "1a2b3c4d5e6f", "123456789abc", "010203040506", "123456abcdef", "abcdef123456", "2612C6DE84CA", "707B11FC1481", "5C8FF9990DA2", "D01AFEEB890A", "75CCB59C9BED", "4B791BEA7BCC" ], A = [];

function g() {
    var e = n.getTagInformation().tag_type;
    return e == n.TAG_TYPE_MF1_STDHD || e == n.TAG_TYPE_MF1_STDST ? 50 : 30;
}

function d(e, t) {
    return 2 * t * e * g() + 18888;
}

function S(e, t, n, r) {
    A.forEach(function(s) {
        if ("function" == typeof s) {
            var u = 0, i = n;
            switch (e) {
              case "fchk":
                u = t * n * g(), i = m(r), console.log("fchk需要的毫秒数是: " + u);
                break;

              case a.TASK_NAME_DARKSIDE:
                u = 4e3, h(r);
                break;

              case a.TASK_NAME_NESTED:
              case a.TASK_NAME_NESTED2:
                u = 5e3 * (t - n), h(r);
                break;

              case a.TASK_NAME_STATICNESTED:
                u = 1500 * (t - n), h(r);
                break;

              case o.TASK_NAME_HARDNESTED:
                u = 5e4 * (t - n), h(r);
                break;

              case c.TASK_NAME_RF08S_2X1NT:
                u = 36e4 * (t - n), h(r);
                break;

              default:
                throw "无法识别的解密任务，请开发者做好此异常的处理: " + e;
            }
            s(e, t, i, r, u / 1e3);
        }
    });
}

function h(e) {
    var t = [];
    Array.isArray(e) ? e.forEach(function(e) {
        t.push(r.bytes2hex(e));
    }) : Object.keys(e).forEach(function(n) {
        var r = e[n];
        null != r.keya && t.push(r.keya), null != r.keyb && t.push(r.keyb);
    });
    var a = n.getTagInformation().uid_hex, o = "keys_".concat(a).toLowerCase();
    wx.setStorageSync(o, t);
}

function b(e) {
    var t = "keys_".concat(e).toLowerCase();
    return r.getStorageSyncHasDefault(t, []);
}

function N(e, t, n) {
    return {
        block: e,
        type: t,
        key: n
    };
}

function p(e, t, n, o) {
    var c = new Array(), s = 0, u = [], l = function(n) {
        n.data[0] < u.length ? o(N(e, t, u[n.data[0]])) : o(null);
    }, f = function(r) {
        if (r.length > 0) {
            var a = d((u = r).length, 1);
            i.getReader(!0).requestFCheckMf1SecKeys(e, t, u, a, l);
        } else s <= 255 ? i.getReader(!0).requestDarksideRecovery(e, t, 0, n, 3e3, y) : o(null);
    }, y = function(n) {
        var o = r.bytes2DarksideObj(n.data);
        c.push(o);
        var u = r.mergeDarksideObjs(e, t, c);
        s += 1, a.requestDecryptWaitCall(a.TASK_NAME_DARKSIDE, u, f);
    };
    i.getReader(!0).requestDarksideRecovery(e, t, 1, n, 1e3 * n + 5e3, y);
}

function v(e, t, n, o, c, s, u, l) {
    var f = [], y = 0, _ = 0;
    function E() {
        i.getReader(!0).requestNested2NtCollect(e, t, n, o, c, 3e3, A);
    }
    var T = function(e) {
        e.data[0] < f.length ? l(N(o, c, f[e.data[0]])) : (y += 1, E());
    }, k = function(a) {
        if (a.length > 0) {
            var k = d((f = a).length, 1);
            i.getReader(!0).requestFCheckMf1SecKeys(o, c, f, k, T);
        } else y <= 30 ? _ > 6 ? (_ = 0, i.getReader(!0).requestNestedDistDetect(e, t, n, 3e3, function(e) {
            s = r.bytes2NestedDistObj(e.data), console.log("检测到之前的Distance无法解密出密钥，重新采集Distance，解析结果是: " + JSON.stringify(s)), 
            u(s), E();
        })) : (_ += 1, E()) : l(null);
    }, A = function(e) {
        var t = r.bytes2NestedObj(o, c, e.data, s);
        console.log("采集到的随机数数据是: " + JSON.stringify(t)), y += 1, a.requestDecryptWaitCall(a.TASK_NAME_NESTED, t, k);
    };
    E();
}

function D(e, t, n, o, c, s) {
    var u = [], l = 0;
    function f() {
        i.getReader(!0).requestSTDiff2NtCollect(e, t, n, o, c, 3e3, E);
    }
    var y = function(e) {
        e.data[0] < u.length ? s(N(o, c, u[e.data[0]])) : (l += 1, f());
    }, _ = function(e) {
        if (e.length > 0) {
            var t = d((u = e).length, 1);
            i.getReader(!0).requestFCheckMf1SecKeys(o, c, u, t, y);
        } else l <= 3 ? f() : s(null);
    }, E = function(e) {
        var t = r.bytes2StaticNestedObj(o, c, e.data);
        l += 1, a.requestDecryptWaitCall(a.TASK_NAME_STATICNESTED, t, _);
    };
    f();
}

function R(e) {
    var t = new Array(), n = 0;
    try {
        n = u.mifare_secs_count_all(e);
    } catch (e) {
        e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
        throw i.throwTagErrorEvent(s.minicopy.HF_ERRSTAT), e;
    }
    for (var r = 0; r < n; r++) t.push(r);
    return t;
}

function K(e, n) {
    if (null != n && "object" == t(n)) {
        for (var r = Object.keys(n), a = 0, o = 0; o < r.length; o++) {
            null != n[r[o]][e] && (a += 1);
        }
        return a;
    }
    throw "getKeyAMapKeyFoundCount 传入了非正常的keymap参数。";
}

function C(e) {
    return K("keya", e);
}

function M(e) {
    return K("keyb", e);
}

function m(e) {
    return C(e) + M(e);
}

function F(e) {
    return Object.keys(e).length == C(e);
}

function q(e) {
    return 2 * Object.keys(e).length == m(e);
}

function O(e) {
    return 0 == m(e);
}

function w(e) {
    for (var t = Object.keys(e), n = 0; n < t.length; n++) {
        var r = t[n], a = u.mifare_to_trail_block(u.mifare_sector_2_block(r));
        if (null != e[r].keya) return {
            block: a,
            type: 96,
            key_hex: e[r].keya
        };
        if (null != e[r].keyb) return {
            block: a,
            type: 97,
            key_hex: e[r].keyb
        };
    }
    return null;
}

function H(e) {
    for (var t = Object.keys(e), n = [], r = 0; r < t.length; r++) {
        var a = t[r];
        null != e[a].keya && null != e[a].keyb || n.push(a);
    }
    return n;
}

function x(e, t, n) {
    for (var r = Object.keys(n), a = 0; a < r.length; a++) {
        var o = r[a], c = u.mifare_to_trail_block(u.mifare_sector_2_block(o));
        if (null == n[o][e]) return {
            block: c,
            type: t
        };
    }
    return null;
}

function I(e) {
    return x("keya", 96, e);
}

function j(e) {
    return x("keyb", 97, e);
}

function U(e, t) {
    for (var n = Object.keys(t), r = 0; r < n.length; r++) {
        var a = n[r];
        void 0 === e[a] && (e[a] = {
            keya: null,
            keyb: null
        }), null != t[a].keya && (e[a].keya = t[a].keya), null != t[a].keyb && (e[a].keyb = t[a].keyb);
    }
}

function B(t, n, a) {
    var o, c = {};
    (o = Array.isArray(t) ? t : Object.keys(t)).sort(function(e, t) {
        return e - t;
    });
    var s = function(t) {
        var n, s = 0, u = e(o);
        try {
            for (u.s(); !(n = u.n()).done; ) {
                var i = n.value;
                1 == (t.data[i / 8 & 255] >> (i % 8 & 255) & 1) && (c[i].keyb = r.bytes2hex(t.data, 6 * s + 5, 6), 
                s++);
            }
        } catch (e) {
            e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
            u.e(e);
        } finally {
            u.f();
        }
        a(c);
    }, u = d(n.length, o.length);
    i.getReader(!0).requestFCheckMfNSecKeys(t, n, u, function(e) {
        for (var o = 0; o < t.length; o++) {
            var u = t[o], l = e.data.slice(2 * u, 2 * u + 2), f = 255 != l[0], y = 255 != l[1], _ = f ? r.bytes2hex(n[l[0]], 0, 6) : null, E = y ? r.bytes2hex(n[l[1]], 0, 6) : null;
            c[u] = {
                keya: _,
                keyb: E
            };
        }
        if (q(c)) console.log("本次密钥检索已经发现全部的密钥！"), a(c); else if (C(c) > 0) if (function(e) {
            return Object.keys(e).length == M(e);
        }(c)) console.log("本次密钥检索已经发现全部的密钥B！"), a(c); else {
            var T = {}, k = Object.keys(c);
            for (o = 0; o < k.length; o++) {
                u = k[o];
                null == c[u].keyb && null != c[u].keya && (T[u] = c[u].keya);
            }
            Object.keys(T).length > 0 ? (console.log("本次密钥检索有未发现的密钥B，将启动读取，需要读取密钥B的扇区的A秘钥信息: ".concat(JSON.stringify(T))), 
            i.getReader(!0).requestMfReadKeyBByKeyA(T, 3e3, s)) : (console.log("本次密钥检索没有未发现的密钥B。"), 
            a(c));
        } else console.log("本次密钥检索未发现最少一个密钥A！"), a(c);
    });
}

function X(e, t, n) {
    var a = {};
    if (t.length > 80) {
        console.log("requestGetAllKeyForMaps检测到秘钥数量过大，需拆分。");
        var o = r.chunkArray(t, 80), c = 0;
        B(e, o[c++], function e(t) {
            if (U(a, t), q(t)) n(a); else {
                var r = H(a);
                c >= o.length ? n(a) : B(r, o[c++], e);
            }
        });
    } else B(e, t, n);
}

function L(e, t, n, r, a, o) {
    "function" != typeof a && (a = function(e) {
        console.warn("在需要通知更新distObj的位置没有接受更新distObj，请注意此业务逻辑勿影响到解密！");
    }), v(t.block, t.type, e, n.block, n.type, r, a, o);
}

function P(e) {
    var t = {};
    return e.forEach(function(e) {
        t[e] = {
            keya: null,
            keyb: null
        };
    }), t;
}

function Y() {
    return b("mf1_user");
}

function G() {
    var e, t, r = [ k ];
    e = !1, (t = i.getDevice()) instanceof i.DeviceClass.MiniCopy && t.device_firmware_ver_info.codeNumber >= 258 && (e = !0), 
    e ? (console.info("检查到设备的固件版本大于等于v1.2，已自动开启历史秘钥加速检索的支持！"), Q() && (r.push(b(n.getTagInformation().uid_hex)), 
    console.log("根据用户偏好已引入读卡历史秘钥进行检索。")), W() && (r.push(Y()), console.log("根据用户偏好已引入用户自定义秘钥进行检索。"))) : console.warn("检查到设备的固件版本小于v1.2，不支持历史秘钥加速检索！");
    var a = [];
    return r.forEach(function(e) {
        Array.isArray(e) && e.forEach(function(e) {
            "string" == typeof e && /[A-Fa-f0-9]{12}/.test(e) && (e = e.toLowerCase(), -1 == a.indexOf(e) && a.push(e));
        });
    }), console.log("最终需要扫描已知秘钥个数: ".concat(a.length)), a;
}

function z(e, t, n) {
    var a, o = w(t), c = r.hex2bytes(o.key_hex);
    a = F(t) ? j(t) : I(t), n(o.block, o.type, c, a.block, a.type, e);
}

function J(e, t, n, r) {
    var a = R(e), o = 2 * a.length, c = {}, s = G();
    console.log("开始尝试扫描空标签，第一步是fchk。"), S("fchk", o, s.length, P(a)), X(a, s, function(e) {
        U(c, e), q(e) ? t(c) : O(e) ? i.throwTagErrorEvent(r) : i.throwTagErrorEvent(n);
    });
}

function W() {
    return r.getStorageSyncHasDefault("preference_user_customkey_enable", !0);
}

function Q() {
    return r.getStorageSyncHasDefault("preference_read_historykey_enable", !0);
}

function V(e, t) {
    var n = e >>> 24;
    0 == f[n] && (_ += function(e) {
        for (var t = 0, n = 0; n < 32; n++) 0 != (e & 1 << n) && t++;
        return t % 2;
    }(4278190080 & e | 8 & t), f[n] = !0, y++);
}

function Z(e, t, n, a, o, c) {
    for (var u = [], T = 0, k = 0; k < 256; k++) f[k] = !1;
    _ = 0, y = 0;
    i.getReader(!0).requestHardNestedNonces(!1, e, t, n, a, o, 3e4, function f(k) {
        T += 1, "function" == typeof E ? E(T) : console.warn("警告，未通过 setHardnestedOnAcquireCbk 注册有效回调，Hard采集的排队进度将无法得到通知！");
        for (var A = 0; A < k.data.length; A += 9) {
            var g = r.bytes2Num(k.data, A + 0, 4), d = r.bytes2Num(k.data, A + 4, 4), S = k.data[A + 8];
            V(g, S >>> 4), V(d, 15 & S);
        }
        if (Array.prototype.push.apply(u, k.data), 256 == y) {
            for (var h = !1, b = 0; b < l.length; b++) if (_ == l[b]) {
                h = !0;
                break;
            }
            h ? c(u) : (console.log("hardnested_first_byte_num超限但是got_match为false: " + _), i.throwTagErrorEvent(s.miniapp.HARD_NESTED_NOT_MFC_EV1));
        } else i.getReader(!0).requestHardNestedNonces(!1, e, t, n, a, o, 3e4, f);
    });
}

function $(e, t, n, r, a, c) {
    var s = [], u = [], l = function(o) {
        console.log(o), o.data[0] < s.length ? c(N(r, a, s[o.data[0]])) : Z(e, t, n, r, a, y);
    }, f = function(o) {
        if (o.length > 0) {
            var f = d((s = o).length, 1);
            console.log("解密完成，开始验证目标块 ".concat(r, "，目标类型 ").concat(a)), i.getReader(!0).requestFCheckMf1SecKeys(r, a, s, f, l);
        } else u.length < 614400 ? Z(e, t, n, r, a, y) : c(null);
    }, y = function(e) {
        Array.prototype.push.apply(u, e), o.requestDecryptWaitCall(u, f);
    };
    i.getReader(!0).requestOnce14AFieldScan(3e3, function(o) {
        var c, s = o.data[10];
        switch (s) {
          case 4:
            c = o.data.slice(0, 4);
            break;

          case 7:
            c = o.data.slice(3, 7);
            break;

          case 10:
            c = o.data.slice(6, 10);
            break;

          default:
            throw "无效的UID长度：" + s;
        }
        Array.prototype.push.apply(u, c), Array.prototype.push.apply(u, [ r, 1 & a ]), Z(e, t, n, r, a, y);
    });
}

function ee(e, t, n) {
    var a = [], o = function(r) {
        r.data[0] < a.length ? n(N(e, t, a[r.data[0]])) : n(null);
    }, s = function(n) {
        var r = d((a = n).length, 1);
        i.getReader(!0).requestFCheckMf1SecKeys(e, t, a, r, o);
    };
    i.getReader(!0).requestRF08sNestedRecovery(e, 3e3, function(n) {
        var a = r.bytes2RF08s2x1NTObj(n.data);
        console.log("采集完成，本次采集的数据是: ".concat(JSON.stringify(a))), c.requestDecryptWaitCall(e, 96 == t, a, s);
    });
}

function te(e, t) {
    var n;
    ee((n = F(t) ? j(t) : I(t)).block, n.type, e);
}

o.setOnQueueUpUpdatedCbk(function(e) {
    "function" == typeof T ? T(e) : console.warn("警告，未通过 setHardnestedOnQueueUpCbk 注册有效回调，Hard解密的排队进度将无法得到通知！");
}), module.exports = {
    TASK_NAME_FCHK: "fchk",
    TASK_NAME_DARKSIDE: a.TASK_NAME_DARKSIDE,
    TASK_NAME_NESTED: a.TASK_NAME_NESTED,
    TASK_NAME_NESTED2: a.TASK_NAME_NESTED2,
    TASK_NAME_STATICNESTED: a.TASK_NAME_STATICNESTED,
    TASK_NAME_HARDNESTED: o.TASK_NAME_HARDNESTED,
    TASK_NAME_RF08S_2X1NT: c.TASK_NAME_RF08S_2X1NT,
    setCacheKesy4Mifare: h,
    getCacheKeys4Mifare: b,
    getDefaultPublicKey: function() {
        var e = [];
        return k.forEach(function(t) {
            return e.push(t);
        }), e;
    },
    getUserCustomTagKey: Y,
    setUserCustomTagKey: function(e) {
        wx.setStorageSync("keys_mf1_user", e);
    },
    getReadTagHistoryKeys: function() {
        var e = [];
        return wx.getStorageInfoSync().keys.forEach(function(t) {
            if (/keys_[a-fA-F0-9]+/.test(t)) {
                var n = t.match(/keys_([a-fA-F0-9]+)/)[1], r = b(n);
                e.push({
                    uid: n,
                    size: r.length
                });
            }
        }), e;
    },
    setReadTagHistoryKeys: function(e, t) {
        var n = "keys_".concat(e).toLowerCase();
        wx.setStorageSync(n, t);
    },
    delReadTagHistoryKeys: function(e) {
        var t = "keys_".concat(e).toLowerCase();
        wx.removeStorageSync(t);
    },
    isUserCustomKeyEnable: W,
    isReadHistoryKeyEnable: Q,
    isNested2DecryptEnable: function() {
        return r.getStorageSyncHasDefault("preference_nested2_decrypt_enable", !1);
    },
    setUserCustomKeyEnable: function(e) {
        wx.setStorageSync("preference_user_customkey_enable", e);
    },
    setReadHistoryKeyEnable: function(e) {
        wx.setStorageSync("preference_read_historykey_enable", e);
    },
    setNested2DecryptEnable: function(e) {
        wx.setStorageSync("preference_nested2_decrypt_enable", e);
    },
    requestDarksideRecovery: p,
    requestWkNestedRecovery: v,
    requestSTNestedRecovery: D,
    requestHDNestedRecovery: $,
    requestRF08sNestedRecovery: ee,
    requestNestedKeyForSize: function(e, t) {
        var n = R(e), o = 2 * n.length, c = {}, l = G(), f = null, y = !1;
        function _(e) {
            f = e;
        }
        function E(e) {
            var t, n = w(c), a = r.hex2bytes(n.key_hex);
            (t = F(c) ? j(c) : I(c), console.log("需要解密的目标扇区数据: " + JSON.stringify(t)), null != f) ? L(a, n, t, f, y ? null : _, e) : (console.log("开始侦测距离: ".concat(JSON.stringify(n), ", ").concat(n.key_hex)), 
            i.getReader(!1).requestNestedDistDetect(n.block, n.type, a, 3e3, function(o) {
                switch (o.status) {
                  case s.minicopy.HF_TAG_OK:
                    f = r.bytes2NestedDistObj(o.data), console.log("侦测距离完成，解析结果是: " + JSON.stringify(f)), 
                    L(a, n, t, f, _, e);
                    break;

                  case s.minicopy.NESTED_TAG_IS_STATIC:
                    y = !0, i.getReader(!1).requestOnce14AFieldScan(3e3, function(o) {
                        var c = o.data[10];
                        f = {
                            uid: r.bytes2Uint32Str(o.data, 0, c),
                            dist: "10"
                        }, console.log("识别到具有上电固定NT特性的卡片，将自动进行兼容性解密支持。"), L(a, n, t, f, null, e);
                    });
                    break;

                  default:
                    i.throwTagErrorEvent(o.status);
                }
            }));
        }
        var T = function(e) {
            U(c, e), q(c) ? (S(a.TASK_NAME_NESTED, o, m(c), c), t(c)) : (S(a.TASK_NAME_NESTED, o, m(c), c), 
            E(k));
        }, k = function(e) {
            if (null == e) return i.throwTagErrorEvent(s.miniapp.NESTED_TASK_RETRY_MAX), void console.log("解密失败了，nested超过重试上限还是未能解密该卡片！");
            var n = u.mifare_block_2_sector(e.block), l = {};
            l[n] = {
                keya: null,
                keyb: null
            };
            var f = r.bytes2hex(e.key, 0, e.key.length);
            (96 == e.type ? l[n].keya = f : l[n].keyb = f, U(c, l), S(a.TASK_NAME_NESTED, o, m(c), c), 
            q(c)) ? t(c) : X(H(c), [ f ], T);
        }, A = function(e) {
            U(c, e), S(a.TASK_NAME_NESTED, o, m(c), c), q(c) ? t(c) : E(k);
        }, g = function(e) {
            if (null == e) return console.log("解密失败了，darkside超过重试上限还是未能解密该卡片！"), void i.throwTagErrorEvent(s.miniapp.DARKSIDE_TASK_RETRY_MAX);
            X(n, [ r.bytes2hex(e.key, 0, e.key.length) ], A);
        };
        console.log("开始尝试解密普通标签，第一步是fchk。"), S("fchk", o, l.length, P(n)), X(n, l, function(e) {
            U(c, e), q(e) ? t(c) : O(e) ? (S(a.TASK_NAME_DARKSIDE, o, 0, c), p(3, 96, 21, g)) : (S(a.TASK_NAME_NESTED, o, m(c), c), 
            E(k));
        });
    },
    requestFastSTKeyForSize: function(e, t) {
        var n = R(e), o = 2 * n.length, c = {}, l = G(), f = function(e) {
            U(c, e), S(a.TASK_NAME_STATICNESTED, o, m(c), c), q(c) ? t(c) : z(y, c, D);
        }, y = function(e) {
            if (null == e) return i.throwTagErrorEvent(s.miniapp.NESTED_TASK_RETRY_MAX), void console.log("解密失败了，nested超过重试上限还是未能解密该卡片！");
            var n = u.mifare_block_2_sector(e.block), l = {};
            l[n] = {
                keya: null,
                keyb: null
            };
            var y = r.bytes2hex(e.key, 0, e.key.length);
            (96 == e.type ? l[n].keya = y : l[n].keyb = y, U(c, l), S(a.TASK_NAME_STATICNESTED, o, m(c), c), 
            q(c)) ? t(c) : X(H(c), [ y ], f);
        }, _ = function(e) {
            e.status == s.minicopy.NESTED_TAG_IS_STATIC_VARIABLES_NT2 ? z(y, c, D) : i.throwTagErrorEvent(s.miniapp.DECRYPTOR_TASK_CPU_MAX_EXCEED);
        };
        console.log("开始尝试解密ST标签，第一步是fchk。"), S("fchk", o, l.length, P(n)), X(n, l, function(e) {
            if (U(c, e), q(e)) t(c); else if (O(e)) i.throwTagErrorEvent(s.miniapp.UNREADABLE_ENCRYPTED_MF1); else {
                S(a.TASK_NAME_STATICNESTED, o, m(c), c);
                var n = w(c), u = r.hex2bytes(n.key_hex);
                i.getReader(!0).requestSTDiffNTLoophole(n.block, n.type, u, 3e3, _);
            }
        });
    },
    requestHardKeyForSize: function(e, t) {
        var n = R(e), a = 2 * n.length, c = {}, l = G(), f = function(e) {
            U(c, e), S(o.TASK_NAME_HARDNESTED, a, m(c), c), q(c) ? t(c) : z(y, c, $);
        }, y = function(e) {
            if (null == e) return i.throwTagErrorEvent(s.miniapp.NESTED_TASK_RETRY_MAX), void console.log("解密失败了，HardNested超过重试上限还是未能解密该卡片！");
            var n = u.mifare_block_2_sector(e.block), l = {};
            l[n] = {
                keya: null,
                keyb: null
            };
            var y = r.bytes2hex(e.key, 0, e.key.length);
            (96 == e.type ? l[n].keya = y : l[n].keyb = y, U(c, l), S(o.TASK_NAME_HARDNESTED, a, m(c), c), 
            q(c)) ? t(c) : X(H(c), [ y ], f);
        }, _ = function(e) {
            e.status == s.minicopy.NESTED_TAG_IS_HARD ? z(y, c, $) : i.throwTagErrorEvent(e.status);
        };
        console.log("开始尝试解密Hard标签，第一步是fchk。"), S("fchk", a, l.length, P(n)), X(n, l, function(e) {
            if (U(c, e), q(e)) t(c); else if (O(e)) i.throwTagErrorEvent(s.miniapp.UNREADABLE_ENCRYPTED_MF1); else {
                S(o.TASK_NAME_HARDNESTED, a, m(c), c);
                var n = w(c), u = r.hex2bytes(n.key_hex);
                i.getReader(!0).requestSTHardNTLoophole(n.block, n.type, u, 3e3, _);
            }
        });
    },
    checkUnencryptedForSizeElseUnsupported: function(e, t) {
        J(e, t, s.miniapp.UNREADABLE_ENCRYPTED_MF1, s.miniapp.UNREADABLE_ENCRYPTED_MF1);
    },
    checkHardnestedPartEncryptForSize: function(e, t) {
        J(e, t, s.miniapp.HARD_NESTED_PART_ENCRYPTED, s.miniapp.UNREADABLE_ENCRYPTED_MF1);
    },
    registerOnAttackKeysCbk: function(e) {
        r.addUniqueCallbackToList(A, e);
    },
    unregisterOnAttackKeysCbk: function(e) {
        r.removeCallbackFromList(A, e);
    },
    setHardnestedOnAcquireCbk: function(e) {
        E = e;
    },
    setHardnestedOnQueueUpCbk: function(e) {
        T = e;
    },
    requestRF08sKeyForSize: function(e, t) {
        var n = R(e), a = 2 * n.length, o = {}, l = G(), f = function(e) {
            U(o, e), S(c.TASK_NAME_RF08S_2X1NT, a, m(o), o), q(o) ? t(o) : te(y, o);
        }, y = function(e) {
            if (null == e) return i.throwTagErrorEvent(s.miniapp.RF08S_2X1NT_TASK_RETRY_MAX), 
            void console.log("解密失败了，rf08s 超过重试上限还是未能解密该卡片！");
            var n = u.mifare_block_2_sector(e.block), l = {};
            l[n] = {
                keya: null,
                keyb: null
            };
            var y = r.bytes2hex(e.key, 0, e.key.length);
            (96 == e.type ? l[n].keya = y : l[n].keyb = y, U(o, l), S(c.TASK_NAME_RF08S_2X1NT, a, m(o), o), 
            q(o)) ? t(o) : X(H(o), [ y ], f);
        }, _ = function(e) {
            e.status == s.minicopy.HF_TAG_OK ? te(y, o) : i.throwTagErrorEvent(s.miniapp.DECRYPTOR_TASK_CPU_MAX_EXCEED);
        };
        console.log("开始尝试解密RF08s标签，第一步是fchk。"), S("fchk", a, l.length, P(n)), X(n, l, function(e) {
            U(o, e), q(e) ? t(o) : (S(c.TASK_NAME_RF08S_2X1NT, a, m(o), o), i.getReader(!0).requestCheckValidRF08sTag(3e3, _));
        });
    }
};