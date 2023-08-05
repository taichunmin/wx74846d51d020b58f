var e = require("@babel/runtime/helpers/createForOfIteratorHelper.js"), t = require("@babel/runtime/helpers/typeof.js"), n = require("43635B5055C842DF2505335752E585D7.js"), r = require("306D78F255C842DF560B10F52E4585D7.js"), a = require("C7A5732055C842DFA1C31B27F77585D7.js"), o = require("09A0336155C842DF6FC65B66E58585D7.js"), c = require("8E76785255C842DFE810105557B585D7.js"), s = require("2335D01055C842DF4553B817299585D7.js"), u = require("A3859AB555C842DFC5E3F2B2FA5585D7.js"), i = [ 0, 32, 56, 64, 80, 96, 104, 112, 120, 128, 136, 144, 152, 160, 176, 192, 200, 224, 256 ], l = [], f = 0, y = 0, E = null, _ = null, h = [ "ffffffffffff", "000000000000", "a0a1a2a3a4a5", "d3f7d3f7d3f7", "b0b1b2b3b4b5", "c0c1c2c3c4c5", "d0d1d2d3d4d5", "aabbccddeeff", "1a2b3c4d5e6f", "123456789abc", "010203040506", "123456abcdef", "abcdef123456", "2612C6DE84CA", "707B11FC1481", "5C8FF9990DA2", "D01AFEEB890A", "75CCB59C9BED", "4B791BEA7BCC" ], k = [];

function d() {
    var e = n.getTagInformation().tag_type;
    return e == n.TAG_TYPE_MF1_STDHD || e == n.TAG_TYPE_MF1_STDST ? 50 : 30;
}

function g(e, t) {
    return 2 * t * e * d() + 18888;
}

function A(e, t, n, r) {
    k.forEach(function(c) {
        if ("function" == typeof c) {
            var s = 0, u = n;
            switch (e) {
              case "fchk":
                s = t * n * d(), u = m(r), console.log("fchk需要的毫秒数是: " + s);
                break;

              case a.TASK_NAME_DARKSIDE:
                s = 4e3, T(r);
                break;

              case a.TASK_NAME_NESTED:
              case a.TASK_NAME_NESTED2:
                s = 5e3 * (t - n), T(r);
                break;

              case a.TASK_NAME_STATICNESTED:
                s = 1500 * (t - n), T(r);
                break;

              case o.TASK_NAME_HARDNESTED:
                s = 5e4 * (t - n), T(r);
                break;

              default:
                throw "无法识别的解密任务，请开发者做好此异常的处理: " + e;
            }
            c(e, t, u, r, s / 1e3);
        }
    });
}

function T(e) {
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

function S(e) {
    var t = "keys_".concat(e).toLowerCase();
    return r.getStorageSyncHasDefault(t, []);
}

function b(e, t, n) {
    return {
        block: e,
        type: t,
        key: n
    };
}

function p(e, t, n, o) {
    var c = new Array(), s = 0, i = [], l = function(n) {
        n.data[0] < i.length ? o(b(e, t, i[n.data[0]])) : o(null);
    }, f = function(a) {
        if (a.length > 0) {
            var c = [];
            a.forEach(function(e) {
                c.push(r.hex2bytes(e, 0, e.length));
            });
            var f = g((i = c).length, 1);
            u.getReader(!0).requestFCheckMf1SecKeys(e, t, i, f, l);
        } else s <= 255 ? u.getReader(!0).requestDarksideRecovery(e, t, 0, n, 3e3, y) : o(null);
    }, y = function(n) {
        var o = r.bytes2DarksideObj(n.data);
        c.push(o), s += 1, a.requestDecryptWaitCall(a.TASK_NAME_DARKSIDE, function(e, t, n) {
            var r = {}, a = [];
            return r.uid = n[0].uid, r.type = "" + t, r.block = "" + e, n.forEach(function(e, t) {
                a.push({
                    nt1: e.nt1,
                    par: e.par,
                    ks1: e.ks1,
                    nr: e.nr,
                    ar: e.ar
                });
            }), r.cores = a, r;
        }(e, t, c), f);
    };
    u.getReader(!0).requestDarksideRecovery(e, t, 1, n, 1e3 * n + 5e3, y);
}

function v(e, t, n, o, c, s, i, l) {
    var f = [], y = 0, E = 0;
    function _() {
        u.getReader(!0).requestNested2NtCollect(e, t, n, o, c, 3e3, d);
    }
    var h = function(e) {
        e.data[0] < f.length ? l(b(o, c, f[e.data[0]])) : (y += 1, _());
    }, k = function(a) {
        if (a.length > 0) {
            var k = [];
            a.forEach(function(e) {
                k.push(r.hex2bytes(e, 0, e.length));
            });
            var d = g((f = k).length, 1);
            u.getReader(!0).requestFCheckMf1SecKeys(o, c, f, d, h);
        } else y <= 30 ? E > 6 ? (E = 0, u.getReader(!0).requestNestedDistDetect(e, t, n, 3e3, function(e) {
            s = r.bytes2NestedDistObj(e.data), console.log("检测到之前的Distance无法解密出密钥，重新采集Distance，解析结果是: " + JSON.stringify(s)), 
            i(s), _();
        })) : (E += 1, _()) : l(null);
    }, d = function(e) {
        var t = r.bytes2NestedObj(o, c, e.data, s);
        console.log("采集到的随机数数据是: " + JSON.stringify(t)), y += 1, a.requestDecryptWaitCall(a.TASK_NAME_NESTED, t, k);
    };
    _();
}

function N(e, t, n, o, c, s) {
    var i = [], l = 0;
    function f() {
        u.getReader(!0).requestSTDiff2NtCollect(e, t, n, o, c, 3e3, _);
    }
    var y = function(e) {
        e.data[0] < i.length ? s(b(o, c, i[e.data[0]])) : (l += 1, f());
    }, E = function(e) {
        if (e.length > 0) {
            var t = [];
            e.forEach(function(e, n) {
                t.push(r.hex2bytes(e, 0, e.length));
            });
            var n = g((i = t).length, 1);
            u.getReader(!0).requestFCheckMf1SecKeys(o, c, i, n, y);
        } else l <= 3 ? f() : s(null);
    }, _ = function(e) {
        var t = r.bytes2StaticNestedObj(o, c, e.data);
        l += 1, a.requestDecryptWaitCall(a.TASK_NAME_STATICNESTED, t, E);
    };
    f();
}

function D(e) {
    var t = new Array(), n = 0;
    try {
        n = s.mifare_secs_count_all(e);
    } catch (e) {
        e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
        throw u.throwTagErrorEvent(c.minicopy.HF_ERRSTAT), e;
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

function R(e) {
    return K("keya", e);
}

function C(e) {
    return K("keyb", e);
}

function m(e) {
    return R(e) + C(e);
}

function M(e) {
    return Object.keys(e).length == R(e);
}

function q(e) {
    return 2 * Object.keys(e).length == m(e);
}

function w(e) {
    return 0 == m(e);
}

function O(e) {
    for (var t = Object.keys(e), n = 0; n < t.length; n++) {
        var r = t[n], a = s.mifare_to_trail_block(s.mifare_sector_2_block(r));
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
        var o = r[a], c = s.mifare_to_trail_block(s.mifare_sector_2_block(o));
        if (null == n[o][e]) return {
            block: c,
            type: t
        };
    }
    return null;
}

function F(e) {
    return x("keya", 96, e);
}

function I(e) {
    return x("keyb", 97, e);
}

function j(e, t) {
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
    }, i = g(n.length, o.length);
    u.getReader(!0).requestFCheckMfNSecKeys(t, n, i, function(e) {
        for (var o = 0; o < t.length; o++) {
            var i = t[o], l = e.data.slice(2 * i, 2 * i + 2), f = 255 != l[0], y = 255 != l[1], E = f ? r.bytes2hex(n[l[0]], 0, 6) : null, _ = y ? r.bytes2hex(n[l[1]], 0, 6) : null;
            c[i] = {
                keya: E,
                keyb: _
            };
        }
        if (q(c)) console.log("本次密钥检索已经发现全部的密钥！"), a(c); else if (R(c) > 0) if (function(e) {
            return Object.keys(e).length == C(e);
        }(c)) console.log("本次密钥检索已经发现全部的密钥B！"), a(c); else {
            var h = {}, k = Object.keys(c);
            for (o = 0; o < k.length; o++) {
                i = k[o];
                null == c[i].keyb && null != c[i].keya && (h[i] = c[i].keya);
            }
            Object.keys(h).length > 0 ? (console.log("本次密钥检索有未发现的密钥B，将启动读取，需要读取密钥B的扇区的A秘钥信息: ".concat(JSON.stringify(h))), 
            u.getReader(!0).requestMfReadKeyBByKeyA(h, 3e3, s)) : (console.log("本次密钥检索没有未发现的密钥B。"), 
            a(c));
        } else console.log("本次密钥检索未发现最少一个密钥A！"), a(c);
    });
}

function U(e, t, n) {
    var a = {};
    if (t.length > 80) {
        console.log("requestGetAllKeyForMaps检测到秘钥数量过大，需拆分。");
        var o = r.chunkArray(t, 80), c = 0;
        B(e, o[c++], function e(t) {
            if (j(a, t), q(t)) n(a); else {
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
    return S("mf1_user");
}

function G() {
    var e, t, r = [ h ];
    e = !1, (t = u.getDevice()) instanceof u.DeviceClass.MiniCopy && t.device_firmware_ver_info.codeNumber >= 258 && (e = !0), 
    e ? (console.info("检查到设备的固件版本大于等于v1.2，已自动开启历史秘钥加速检索的支持！"), W() && (r.push(S(n.getTagInformation().uid_hex)), 
    console.log("根据用户偏好已引入读卡历史秘钥进行检索。")), X() && (r.push(Y()), console.log("根据用户偏好已引入用户自定义秘钥进行检索。"))) : console.warn("检查到设备的固件版本小于v1.2，不支持历史秘钥加速检索！");
    var a = [];
    return r.forEach(function(e) {
        Array.isArray(e) && e.forEach(function(e) {
            "string" == typeof e && /[A-Fa-f0-9]{12}/.test(e) && (e = e.toLowerCase(), -1 == a.indexOf(e) && a.push(e));
        });
    }), console.log("最终需要扫描已知秘钥个数: ".concat(a.length)), a;
}

function z(e, t, n) {
    var a, o = O(t), c = r.hex2bytes(o.key_hex);
    a = M(t) ? I(t) : F(t), n(o.block, o.type, c, a.block, a.type, e);
}

function J(e, t, n, r) {
    var a = D(e), o = 2 * a.length, c = {}, s = G();
    console.log("开始尝试扫描空标签，第一步是fchk。"), A("fchk", o, s.length, P(a)), U(a, s, function(e) {
        j(c, e), q(e) ? t(c) : w(e) ? u.throwTagErrorEvent(r) : u.throwTagErrorEvent(n);
    });
}

function X() {
    return r.getStorageSyncHasDefault("preference_user_customkey_enable", !0);
}

function W() {
    return r.getStorageSyncHasDefault("preference_read_historykey_enable", !0);
}

function Q(e, t) {
    var n = e >>> 24;
    0 == l[n] && (y += function(e) {
        for (var t = 0, n = 0; n < 32; n++) 0 != (e & 1 << n) && t++;
        return t % 2;
    }(4278190080 & e | 8 & t), l[n] = !0, f++);
}

function V(e, t, n, a, o, s) {
    for (var _ = [], h = 0, k = 0; k < 256; k++) l[k] = !1;
    y = 0, f = 0;
    u.getReader(!0).requestHardNestedNonces(!1, e, t, n, a, o, 3e4, function l(k) {
        h += 1, "function" == typeof E ? E(h) : console.warn("警告，未通过 setHardnestedOnAcquireCbk 注册有效回调，Hard采集的排队进度将无法得到通知！");
        for (var d = 0; d < k.data.length; d += 9) {
            var g = r.bytes2Num(k.data, d + 0, 4), A = r.bytes2Num(k.data, d + 4, 4), T = k.data[d + 8];
            Q(g, T >>> 4), Q(A, 15 & T);
        }
        if (Array.prototype.push.apply(_, k.data), 256 == f) {
            for (var S = !1, b = 0; b < i.length; b++) if (y == i[b]) {
                S = !0;
                break;
            }
            S ? s(_) : (console.log("hardnested_first_byte_num超限但是got_match为false: " + y), u.throwTagErrorEvent(c.miniapp.HARD_NESTED_NOT_MFC_EV1));
        } else u.getReader(!0).requestHardNestedNonces(!1, e, t, n, a, o, 3e4, l);
    });
}

function Z(e, t, n, a, c, s) {
    var i = [], l = [], f = function(r) {
        r.data[0] < i.length ? s(b(a, c, i[r.data[0]])) : V(e, t, n, a, c, onAcquire2DoneCall);
    }, y = function(o) {
        if (null != o) {
            var y = g((i = [ r.hex2bytes(o) ]).length, 1);
            u.getReader(!0).requestFCheckMf1SecKeys(a, c, i, y, f);
        } else l.length < 614400 ? V(e, t, n, a, c, E) : s(null);
    }, E = function(e) {
        Array.prototype.push.apply(l, e), console.log("采集完成，本次收到的数据是: ".concat(r.bytes2hex(l))), 
        o.requestDecryptWaitCall(l, y);
    };
    u.getReader(!0).requestOnce14AFieldScan(3e3, function(r) {
        var o, s = r.data[10];
        switch (s) {
          case 4:
            o = r.data.slice(0, 4);
            break;

          case 7:
            o = r.data.slice(3, 7);
            break;

          case 10:
            o = r.data.slice(6, 10);
            break;

          default:
            throw "无效的UID长度：" + s;
        }
        Array.prototype.push.apply(l, o), Array.prototype.push.apply(l, [ a, 1 & c ]), V(e, t, n, a, c, E);
    });
}

o.setOnQueueUpUpdatedCbk(function(e) {
    "function" == typeof _ ? _(e) : console.warn("警告，未通过 setHardnestedOnQueueUpCbk 注册有效回调，Hard解密的排队进度将无法得到通知！");
}), module.exports = {
    TASK_NAME_FCHK: "fchk",
    TASK_NAME_DARKSIDE: a.TASK_NAME_DARKSIDE,
    TASK_NAME_NESTED: a.TASK_NAME_NESTED,
    TASK_NAME_NESTED2: a.TASK_NAME_NESTED2,
    TASK_NAME_STATICNESTED: a.TASK_NAME_STATICNESTED,
    TASK_NAME_HARDNESTED: o.TASK_NAME_HARDNESTED,
    setCacheKesy4Mifare: T,
    getCacheKeys4Mifare: S,
    getDefaultPublicKey: function() {
        var e = [];
        return h.forEach(function(t) {
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
                var n = t.match(/keys_([a-fA-F0-9]+)/)[1], r = S(n);
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
    isUserCustomKeyEnable: X,
    isReadHistoryKeyEnable: W,
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
    requestSTNestedRecovery: N,
    requestHDNestedRecovery: Z,
    requestNestedKeyForSize: function(e, t) {
        var n = D(e), o = 2 * n.length, i = {}, l = G(), f = null, y = !1;
        function E(e) {
            f = e;
        }
        function _(e) {
            var t, n = O(i), a = r.hex2bytes(n.key_hex);
            (t = M(i) ? I(i) : F(i), console.log("需要解密的目标扇区数据: " + JSON.stringify(t)), null != f) ? L(a, n, t, f, y ? null : E, e) : (console.log("开始侦测距离: ".concat(JSON.stringify(n), ", ").concat(n.key_hex)), 
            u.getReader(!1).requestNestedDistDetect(n.block, n.type, a, 3e3, function(o) {
                switch (o.status) {
                  case c.minicopy.HF_TAG_OK:
                    f = r.bytes2NestedDistObj(o.data), console.log("侦测距离完成，解析结果是: " + JSON.stringify(f)), 
                    L(a, n, t, f, E, e);
                    break;

                  case c.minicopy.NESTED_TAG_IS_STATIC:
                    y = !0, u.getReader(!1).requestOnce14AFieldScan(3e3, function(o) {
                        var c = o.data[10];
                        f = {
                            uid: r.bytes2Uint32Str(o.data, 0, c),
                            dist: "10"
                        }, console.log("识别到具有上电固定NT特性的卡片，将自动进行兼容性解密支持。"), L(a, n, t, f, null, e);
                    });
                    break;

                  default:
                    u.throwTagErrorEvent(o.status);
                }
            }));
        }
        var h = function(e) {
            j(i, e), q(i) ? (A(a.TASK_NAME_NESTED, o, m(i), i), t(i)) : (A(a.TASK_NAME_NESTED, o, m(i), i), 
            _(k));
        }, k = function(e) {
            if (null == e) return u.throwTagErrorEvent(c.miniapp.NESTED_TASK_RETRY_MAX), void console.log("解密失败了，nested超过重试上限还是未能解密该卡片！");
            var n = s.mifare_block_2_sector(e.block), l = {};
            l[n] = {
                keya: null,
                keyb: null
            };
            var f = r.bytes2hex(e.key, 0, e.key.length);
            (96 == e.type ? l[n].keya = f : l[n].keyb = f, j(i, l), A(a.TASK_NAME_NESTED, o, m(i), i), 
            q(i)) ? t(i) : U(H(i), [ f ], h);
        }, d = function(e) {
            j(i, e), A(a.TASK_NAME_NESTED, o, m(i), i), q(i) ? t(i) : _(k);
        }, g = function(e) {
            if (null == e) return console.log("解密失败了，darkside超过重试上限还是未能解密该卡片！"), void u.throwTagErrorEvent(c.miniapp.DARKSIDE_TASK_RETRY_MAX);
            U(n, [ r.bytes2hex(e.key, 0, e.key.length) ], d);
        };
        console.log("开始尝试解密普通标签，第一步是fchk。"), A("fchk", o, l.length, P(n)), U(n, l, function(e) {
            j(i, e), q(e) ? t(i) : w(e) ? (A(a.TASK_NAME_DARKSIDE, o, 0, i), p(3, 96, 21, g)) : (A(a.TASK_NAME_NESTED, o, m(i), i), 
            _(k));
        });
    },
    requestFastSTKeyForSize: function(e, t) {
        var n = D(e), o = 2 * n.length, i = {}, l = G(), f = function(e) {
            j(i, e), A(a.TASK_NAME_STATICNESTED, o, m(i), i), q(i) ? t(i) : z(y, i, N);
        }, y = function(e) {
            if (null == e) return u.throwTagErrorEvent(c.miniapp.NESTED_TASK_RETRY_MAX), void console.log("解密失败了，nested超过重试上限还是未能解密该卡片！");
            var n = s.mifare_block_2_sector(e.block), l = {};
            l[n] = {
                keya: null,
                keyb: null
            };
            var y = r.bytes2hex(e.key, 0, e.key.length);
            (96 == e.type ? l[n].keya = y : l[n].keyb = y, j(i, l), A(a.TASK_NAME_STATICNESTED, o, m(i), i), 
            q(i)) ? t(i) : U(H(i), [ y ], f);
        }, E = function(e) {
            e.status == c.minicopy.NESTED_TAG_IS_STATIC_VARIABLES_NT2 ? z(y, i, N) : u.throwTagErrorEvent(c.miniapp.DECRYPTOR_TASK_CPU_MAX_EXCEED);
        };
        console.log("开始尝试解密ST标签，第一步是fchk。"), A("fchk", o, l.length, P(n)), U(n, l, function(e) {
            if (j(i, e), q(e)) t(i); else if (w(e)) u.throwTagErrorEvent(c.miniapp.UNREADABLE_ENCRYPTED_MF1); else {
                A(a.TASK_NAME_STATICNESTED, o, m(i), i);
                var n = O(i), s = r.hex2bytes(n.key_hex);
                u.getReader(!0).requestSTDiffNTLoophole(n.block, n.type, s, 3e3, E);
            }
        });
    },
    requestHardKeyForSize: function(e, t) {
        var n = D(e), a = 2 * n.length, i = {}, l = G(), f = function(e) {
            j(i, e), A(o.TASK_NAME_HARDNESTED, a, m(i), i), q(i) ? t(i) : z(y, i, Z);
        }, y = function(e) {
            if (null == e) return u.throwTagErrorEvent(c.miniapp.NESTED_TASK_RETRY_MAX), void console.log("解密失败了，HardNested超过重试上限还是未能解密该卡片！");
            var n = s.mifare_block_2_sector(e.block), l = {};
            l[n] = {
                keya: null,
                keyb: null
            };
            var y = r.bytes2hex(e.key, 0, e.key.length);
            (96 == e.type ? l[n].keya = y : l[n].keyb = y, j(i, l), A(o.TASK_NAME_HARDNESTED, a, m(i), i), 
            q(i)) ? t(i) : U(H(i), [ y ], f);
        }, E = function(e) {
            e.status == c.minicopy.NESTED_TAG_IS_HARD ? z(y, i, Z) : u.throwTagErrorEvent(e.status);
        };
        console.log("开始尝试解密Hard标签，第一步是fchk。"), A("fchk", a, l.length, P(n)), U(n, l, function(e) {
            if (j(i, e), q(e)) t(i); else if (w(e)) u.throwTagErrorEvent(c.miniapp.UNREADABLE_ENCRYPTED_MF1); else {
                A(o.TASK_NAME_HARDNESTED, a, m(i), i);
                var n = O(i), s = r.hex2bytes(n.key_hex);
                u.getReader(!0).requestSTHardNTLoophole(n.block, n.type, s, 3e3, E);
            }
        });
    },
    checkUnencryptedForSizeElseUnsupported: function(e, t) {
        J(e, t, c.miniapp.UNREADABLE_ENCRYPTED_MF1, c.miniapp.UNREADABLE_ENCRYPTED_MF1);
    },
    checkHardnestedPartEncryptForSize: function(e, t) {
        J(e, t, c.miniapp.HARD_NESTED_PART_ENCRYPTED, c.miniapp.UNREADABLE_ENCRYPTED_MF1);
    },
    registerOnAttackKeysCbk: function(e) {
        r.addUniqueCallbackToList(k, e);
    },
    unregisterOnAttackKeysCbk: function(e) {
        r.removeCallbackFromList(k, e);
    },
    setHardnestedOnAcquireCbk: function(e) {
        E = e;
    },
    setHardnestedOnQueueUpCbk: function(e) {
        _ = e;
    }
};