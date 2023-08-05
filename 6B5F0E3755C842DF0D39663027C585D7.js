var e = require("306D78F255C842DF560B10F52E4585D7.js"), t = require("43635B5055C842DF2505335752E585D7.js"), n = require("9434A3B355C842DFF252CBB492D585D7.js"), a = require("2335D01055C842DF4553B817299585D7.js"), o = require("275D798255C842DF413B1185FE3585D7.js"), r = require("8E76785255C842DFE810105557B585D7.js"), i = require("A3859AB555C842DFC5E3F2B2FA5585D7.js"), c = !1, u = !1, l = null, s = [], _ = [];

function f(n, a) {
    var o = n.data[10], c = {
        tag_type: t.TAG_TYPE_HF_14443A,
        uid_hex: e.bytes2hex(n.data, 0, o),
        sak_hex: e.bytes2hex(n.data, 12, 1),
        atqa_hex: e.bytes2hex(n.data.slice(13, 15), 0, 2),
        readable: !1
    }, u = function(e) {
        e.status == r.minicopy.HF_TAG_OK ? (c.tag_type = t.TAG_TYPE_MF1_MAYBE, c.readable = !0) : c.tag_type = t.TAG_TYPE_HF_14443A, 
        a(c);
    };
    i.getReader(!1).request14AGetATSDataArr(1500, function(t) {
        t.status == r.minicopy.HF_TAG_OK && null != t.data && t.data.length > 0 && (c.ats_hex = e.bytes2hex(t.data, 0, t.data.length)), 
        i.getReader(!1).requestCheckMf3TimeAuth(1500, u);
    });
}

function g(n, a) {
    a({
        tag_type: t.TAG_TYPE_LF_EM410X,
        uid_hex: e.bytes2hex(n.data, 0, 5),
        readable: !0
    });
}

function T() {
    return e.getStorageSyncHasDefault("preference_auto_detect_gdm_tag", !1);
}

function p() {
    return e.getStorageSyncHasDefault("preference_auto_write_qinlin88_tag", !0);
}

function h() {
    return e.getStorageSyncHasDefault("preference_auto_write_71B_tag_16_sector", !0);
}

function A(e) {
    var n = {}, a = function(a) {
        if (a.status == r.minicopy.HF_TAG_OK) n.tag_type = t.TAG_TYPE_MF1_STDWK, e(n); else if (a.status == r.minicopy.NESTED_TAG_IS_STATIC) n.tag_type = t.TAG_TYPE_MF1_STDST, 
        e(n); else {
            if (a.status != r.minicopy.NESTED_TAG_IS_HARD) {
                var o = "在检测随机数类型时出现了不支持解析的状态: " + a.status.toString(16);
                throw console.error(o), o;
            }
            n.tag_type = t.TAG_TYPE_MF1_STDHD, e(n);
        }
    }, o = function(o) {
        o.status != r.minicopy.HF_TAG_NO ? o.status != r.minicopy.HF_TAG_OK ? i.getReader(!0).requestNestedNTLoophole(1500, a) : (n.tag_type = t.TAG_TYPE_MF1_GDM, 
        e(n)) : i.throwTagErrorEvent(o.status);
    }, c = function(c) {
        if (c.status != r.minicopy.HF_TAG_NO) if (c.status != r.minicopy.HF_TAG_OK) {
            var u = !1, l = i.getDevice();
            l instanceof i.DeviceClass.MiniCopy && l.device_firmware_ver_info.codeNumber >= 259 && (u = !0), 
            T() && u ? (console.log("版本大于等于v1.3，将会继续检测目标卡是否是GDM卡。"), i.getReader(!1).requestCheckValidGDMTag(1500, o)) : i.getReader(!0).requestNestedNTLoophole(1500, a);
        } else n.tag_type = t.TAG_TYPE_MF1_GEN1A, e(n); else i.throwTagErrorEvent(c.status);
    };
    i.getReader(!0).requestCheckMfBlockSize(3e3, function(e) {
        n.max_block = e.data[0], i.getReader(!1).requestGEN1ATAGLoophole(1500, c);
    });
}

function y(e) {
    A(function(n) {
        Object.assign(t.getTagInformation(), n), console.log("完善的Mifare标签信息: " + JSON.stringify(t.getTagInformation())), 
        e(t.getTagInformation());
    });
}

function E(e, t) {
    return e[parseInt(t / 8)] >> t % 8 & !0;
}

function d(e) {
    for (var t = [], n = 0; n < a.mifare_blks_count_sec(e); n++) t.push(n);
    return t;
}

function D(t, n, o, r, c) {
    var u = a.mifare_sector_2_block(t), l = {};
    if (r.sort(function(e, t) {
        return e - t;
    }), r.length > 16) {
        var s = "startReadMifareSectorForType发现使能读取的列表太大！" + r.length;
        throw console.log(s), s;
    }
    i.getReader(!0).requestRDSCOnceStandard(t, n, o, r, 3e3, function(t) {
        var n = e.chunkArray(t.data.slice(2), 16);
        r.forEach(function(e, a) {
            E(t.data, e) ? l[u + a] = n[a] : l[u + a] = null;
        }), c(l);
    });
}

function v(e, t, n, o) {
    var r = d(e);
    D(e, 96, t, r, function(t) {
        var i, c;
        i = t, c = !0, Object.keys(i).forEach(function(e) {
            null == i[e] && (c = !1);
        }), c ? o(t) : (r = function(e, t) {
            var n = [];
            return Object.keys(e).forEach(function(o) {
                if (null == e[o]) {
                    var r = a.mifare_secblk_2_index(o, t);
                    n.push(r);
                }
            }), n;
        }(t, e), console.log("扇区".concat(e, "使用A秘钥读取失败的block: ") + JSON.stringify(r)), D(e, 97, n, r, function(e) {
            var n, a, r;
            o((n = t, a = e, r = {}, Object.keys(n).forEach(function(e) {
                r[e] = n[e], null == r[e] && e in a && null != a[e] && (r[e] = a[e]);
            }), Object.keys(a).forEach(function(e) {
                e in r || (r[e] = a[e]);
            }), r));
        }));
    });
}

function F(o, r) {
    var i = t.getMifareTagDatas(), c = t.getMifareCardKeys();
    i.length = 0, c.length = 0, o(t.getTagInformation().max_block + 1, function(o) {
        n.setCacheKesy4Mifare(o);
        for (var u = Object.keys(o).length, l = 0; l < u; l++) {
            var s = e.hex2bytes(o[l].keya), _ = e.hex2bytes(o[l].keyb);
            c.push(s), c.push(_);
        }
        console.log(" "), console.log("密钥获取完成，开始以获得的密钥读取所有的扇区："), function n(c) {
            if (c >= u) r(100); else {
                var l = e.hex2bytes(o[c].keya), s = e.hex2bytes(o[c].keyb);
                v(c, l, s, function(o) {
                    var _ = Object.keys(o);
                    console.log("----------------------------------------------------------------------------------------"), 
                    _.forEach(function(n, r) {
                        var u = o[n];
                        if (r == _.length - 1) {
                            var f = new Array();
                            Array.prototype.push.apply(f, l), null == o[n] ? Array.prototype.push.apply(f, [ 0, 0, 0, 0 ]) : Array.prototype.push.apply(f, o[n].slice(6, 10)), 
                            Array.prototype.push.apply(f, s), u = f, console.log("拼接密钥: ".concat(e.bytes2hex(l), " -- ").concat(e.bytes2hex(s), "，块").concat(a.mifare_sector_2_block(c) + r));
                        } else null == u && (u = e.hex2bytes(t.TAG_MF1_DEFAULT_DATA));
                        console.log("块".concat(r, ", 数据: ").concat(e.bytes2hex(u))), i.push(u);
                    }), r(c / u * 100), n(c + 1);
                });
            }
        }(0);
    });
}

function m(e, t, n, o, r, c) {
    i.getReader(!0).requestWRBLMoreStandard(e, t, n, o, r, 3e3, function(t) {
        for (var n = {}, o = 0; o < a.mifare_blks_count_sec(e); o++) n[o] = 1 == (t.data[parseInt(o / 8)] >> parseInt(o % 8) & 1);
        c(n);
    });
}

function G(e, t, n, a, o, r) {
    if (a.sort(function(e, t) {
        return e - t;
    }), a.length > 16) {
        var i = "startWriteMifareSectorForType发现使能写入的列表太大！" + a.length;
        throw console.log(i), i;
    }
    0 == e && 4 == a.length && (a = [ 1, 2 ], o = [ o[1], o[2] ]), m(e, t, n, a, o, r);
}

function M(e, t) {
    for (var n = Object.keys(t), a = 0; a < n.length; a++) {
        var o = n[a];
        if (0 != t[o]) ; else if (0 != e || 0 != o && 3 != o) return !1;
    }
    return !0;
}

function S(e, t) {
    for (var n = Object.keys(t), a = 0; a < e.length; a++) {
        var o = e[a];
        if (o in n && 0 == t[o]) return !1;
    }
    return !0;
}

function b(e, t) {
    for (var n = [], a = Object.keys(e), o = 0; o < a.length; o++) {
        var r = a[o];
        if (0 == e[r]) {
            if (0 == t && (0 == r || 3 == r)) continue;
            n.push(r);
        }
    }
    return n.sort(function(e, t) {
        return e - t;
    }), n;
}

function I(e, t) {
    var n = {};
    return Object.keys(e).forEach(function(t) {
        n[t] = e[t];
    }), Object.keys(t).forEach(function(e) {
        1 == t[e] && (n[e] = !0);
    }), n;
}

function R(e) {
    return l(e = e / 100 * 40 + 60);
}

function x(e) {
    return l = e, R;
}

function k(e) {
    F(n.requestNestedKeyForSize, x(e));
}

function O(e) {
    return t.getTagInformation().uid_hex.length == e.uid_hex.length;
}

function Y(e) {
    return function(e) {
        var n = t.getMifareTagDatas().length;
        return e.max_block + 1 >= n;
    }(e) && O(e);
}

function P(n) {
    if (null != n && null != n && Array.isArray(n) && 0 != n.length || (n = t.getMifareTagDatas()), 
    72 != n.length) return !1;
    for (var o = a.mifare_sector_2_block(16), r = 0; r < 3; r++) if (e.bytes2hex(n[o + r]) != t.TAG_MF1_DEFAULT_DATA) return !1;
    return !0;
}

function w(e) {
    var n = function(n) {
        if (Y(n) || (o = n, console.log("判断71B卡写到S50容器卡的可行性：\n        原卡与容器卡UID长度是否一致  ：".concat(O(o), ", \n        71B原卡16扇区的数据是否是空的：").concat(P(), ", \n        是否使能71B卡（亲邻88卡）写入：").concat(p(), ",\n        是否使能71B卡16扇区智能写入  ：").concat(h())), 
        O(o) && P() && p() && h())) switch (n.tag_type) {
          case t.TAG_TYPE_MF1_GEN1A:
            !function(e) {
                var t = L(), n = B();
                K(t, n, e);
            }(e);
            break;

          case t.TAG_TYPE_MF1_GDM:
            !function(e) {
                W(L(), !0, e);
            }(e);
            break;

          case t.TAG_TYPE_MF1_STDWK:
          case t.TAG_TYPE_MF1_STDST:
          case t.TAG_TYPE_MF1_STDHD:
            !function(e, n) {
                var o = L();
                !function(e, n) {
                    var o = a.mifare_secs_count_all(n.max_block + 1);
                    18 == a.mifare_secs_count_all(t.getTagInformation().max_block + 1) && p() && (o -= 1);
                    for (var c, u, l = new Array(2 * o), s = new Array(l.length), _ = t.getMifareCardKeys(), f = 0; f < s.length; f++) f >= _.length ? s[f] = [ 255, 255, 255, 255, 255, 255 ] : s[f] = _[f];
                    for (f = 0; f < l.length; f++) l[f] = [ 255, 255, 255, 255, 255, 255 ];
                    var g = function(t) {
                        if (q(t.data, l.length)) console.log("此容器卡是原卡的密钥！"), e(s); else {
                            console.log("此容器卡有非原卡的密钥，将尝试合并原卡和空卡密钥！"), u = t.data;
                            for (var n = [], a = 0; a < l.length; a++) {
                                var o = 1 == (c[parseInt(a / 8)] >> parseInt(a % 8) & 1), _ = 1 == (u[parseInt(a / 8)] >> parseInt(a % 8) & 1);
                                o ? n.push(l[a]) : _ && n.push(s[a]);
                            }
                            n.length == l.length ? (console.log("合并成功，已经发现该容器卡所有的可用密钥！"), e(n)) : (console.log("合并失败，未发现该容器卡所有的可用密钥！"), 
                            i.throwTagErrorEvent(r.miniapp.UNWRITABLE_ENCRYPTED_MF1));
                        }
                    };
                    console.log("开始检索默认密钥，密钥数量是: " + l.length), i.getReader(!0).requestAuthMF1KnownKeys(l, 5e3, function(t) {
                        q(t.data, l.length) ? (console.log("此容器卡全都是默认密钥！"), e(l)) : (c = t.data, console.log("此容器卡有非默认密钥，将进行原卡密钥检索！"), 
                        i.getReader(!0).requestAuthMF1KnownKeys(s, 5e3, g));
                    });
                }(function(t) {
                    C(t, o, !0, e);
                }, n);
            }(e, n);
            break;

          default:
            i.throwTagErrorEvent(r.miniapp.CONTAINER_TAG_TYPE_ERR);
        } else i.throwTagErrorEvent(r.miniapp.CONTAINER_TAG_SIZE_ERR);
        var o;
    }, o = function(e) {
        e.tag_type == t.TAG_TYPE_MF1_MAYBE ? A(function(t) {
            Object.assign(e, t), n(e);
        }) : i.throwTagErrorEvent(r.miniapp.CONTAINER_TAG_TYPE_ERR);
    };
    i.getReader(!0).requestOnce14AFieldScan(3e3, function(e) {
        console.log("写卡时寻卡的结果: " + JSON.stringify(e)), f(e, o);
    });
}

function N(n, a) {
    var o = new Array(), r = null;
    if (r = null != a && null != a ? a : t.getTagInformation(), Array.prototype.push.apply(o, e.hex2bytes(r.uid_hex)), 
    void 0 === n || null == n) if (8 == r.uid_hex.length) o.push(e.calcIDBcc(o)), Array.prototype.push.apply(o, e.hex2bytes(r.sak_hex)), 
    Array.prototype.push.apply(o, e.hex2bytes(r.atqa_hex)), Array.prototype.push.apply(o, e.hex2bytes("01B6BA8B43B8751D")); else if (14 == r.uid_hex.length) Array.prototype.push.apply(o, e.hex2bytes("884400C82000000000")); else {
        if (20 != r.uid_hex.length) throw "不支持的卡片UID长度: " + r.uid_hex.length;
        Array.prototype.push.apply(o, e.hex2bytes("884400C82000"));
    } else if (8 == r.uid_hex.length) o.push(e.calcIDBcc(o)), Array.prototype.push.apply(o, e.hex2bytes(r.sak_hex)), 
    Array.prototype.push.apply(o, e.hex2bytes(r.atqa_hex)), Array.prototype.push.apply(o, e.hex2bytes(n.slice(8, 16))); else if (14 == r.uid_hex.length) Array.prototype.push.apply(o, n.slice(7, 16)); else {
        if (20 != r.uid_hex.length) throw "不支持的卡片UID长度: " + r.uid_hex.length;
        Array.prototype.push.apply(o, n.slice(10, 16));
    }
    return o;
}

function L() {
    var n = e.getStorageSyncHasDefault("preference_auto_invalid_acs_fix", !0), o = e.getStorageSyncHasDefault("preference_use_anticollision_sak", !0);
    console.log("是否启用了自动修复控制位: " + n), console.log("是否启用了自动修复SAK: " + o);
    var r = new Array();
    return t.getMifareTagDatas().forEach(function(i, c) {
        var u = i;
        0 == c ? null == u ? (u = N(), console.log("厂商块为空，自动修正后的数据是: " + e.bytes2hex(u))) : o && 8 == t.getTagInformation().uid_hex.length ? (u = N(u), 
        console.log("厂商块不为空，强行修正SAK后的数据是: " + e.bytes2hex(u))) : console.log("厂商块不为空且无需修正厂商块。") : a.mifare_is_trailer_blk(c) ? null == u ? n ? (u = e.hex2bytes(t.TAG_MF1_DEFAULT_TRAI), 
        console.log("尾部块".concat(c, "为空，自动修正为默认尾部块"))) : (u = e.hex2bytes(t.TAG_MF1_DEFAULT_DATA), 
        console.log("尾部块".concat(c, "为空，不自动修正为默认尾部块，而是使用空的数据填充，此操作可能会导致卡片锁死。"))) : 0 == u[6] && 0 == u[7] && 0 == u[8] && 0 == u[9] && (n ? (u[6] = 255, 
        u[7] = 7, u[8] = 128, u[9] = 105, console.log("尾部块".concat(c, "控制位为空，自动修正为默认控制位，此操作可避免锁卡。"))) : console.log("尾部块".concat(c, "控制位为空，但是不自动修正，此操作可能会导致卡片锁死。"))) : null == u && (u = e.hex2bytes(t.TAG_MF1_DEFAULT_DATA), 
        console.log("数据块".concat(c, "为空，自动修正为空的数据块。")));
        r.push(u);
    }), P(r) && p() && h() && (r = r.slice(0, r.length - 8), console.log("数据裁剪成功，已经自动修复71B标签为S50容量。")), 
    r;
}

function q(e, t) {
    for (var n = !0, a = 0; a < t; a++) {
        if (!(1 == (e[parseInt(a / 8)] >> parseInt(a % 8) & 1))) {
            n = !1;
            break;
        }
    }
    return n;
}

function C(t, n, o, c) {
    for (var u = 0; u < t.length; u += 2) console.log("索引是: ".concat(u, ", 密钥是A: ").concat(e.bytes2hex(t[u]), "，密钥B是: ").concat(e.bytes2hex(t[u + 1])));
    var l = n.length, _ = Math.min(a.mifare_secs_count_all(l), t.length / 2);
    o || (s.length = 0);
    var f = function(e) {
        S([ 0, 3 ], e) ? (console.log("写卡全部成功（包括厂商块）"), c(100)) : S([ 3 ], e) ? (console.log("写卡部分成功（只有尾部块）"), 
        o ? i.throwTagErrorEvent(r.miniapp.STDMF_UID_WRITE_FAILED) : (s.push(0), c(100))) : (console.log("写卡不成功（厂商块和尾部块都失败！）"), 
        o ? i.throwTagErrorEvent(r.miniapp.STDMF_TAG_WRITE_FAILED) : (s.push(0, 3), c(100)));
    };
    console.log("将会写入到容器卡的扇区数量总数: " + _), function u(l) {
        if (l >= _) {
            var g = [ n[0], n[3] ];
            return T = t[0], h = t[1], y = f, void m(0, 96, T, E = [ 0, 3 ], A = g, function(e) {
                if (S([ 0, 3 ], e)) y(e); else {
                    E = [];
                    var t = [];
                    0 == e[0] && (E.push(0), t.push(A[0])), 0 == e[3] && (E.push(3), t.push(A[1])), 
                    m(0, 97, h, E, t, function(t) {
                        y(I(e, t));
                    });
                }
            });
        }
        var T, h, A, y, E, D = a.mifare_sector_2_block(l), v = D + a.mifare_blks_count_sec(l), F = n.slice(D, v), R = t[parseInt(2 * l)], x = t[parseInt(2 * l + 1)];
        if (18 == _ && 17 == l && p()) return console.warn("当前是亲邻卡写卡模式，且识别到了一个18个扇区的M1卡，将自动跳过最后一个扇区的写入！"), 
        c((l += 1) / _ * 100 - 5), void u(l);
        !function(e, t, n, a, o) {
            var r = d(e);
            G(e, 96, t, r, a, function(t) {
                if (M(e, t)) o(t); else {
                    r = b(t, e), console.log("扇区".concat(e, "写入失败的block: ").concat(r));
                    for (var i = [], c = 0; c < r.length; c++) i.push(a[r[c]]);
                    G(e, 97, n, r, i, function(e) {
                        o(I(t, e));
                    });
                }
            });
        }(l, R, x, F, function(t) {
            if (M(l, t)) {
                console.log("普通sector写入成功: " + l + ", 数据: ");
                for (var n = 0; n < F.length; n++) console.log("Block".concat(n, ": ") + e.bytes2hex(F[n], 0, 16));
            } else {
                if (console.log("普通sector写入失败: " + l), o) return void i.throwTagErrorEvent(r.miniapp.STDMF_TAG_WRITE_FAILED);
                for (var a = b(t, l), f = 0; f < a.length; f++) a[f] = D + f;
                Array.prototype.push.apply(s, a);
            }
            c((l += 1) / _ * 100 - 5), u(l);
        });
    }(0);
}

function H(e) {
    var n = ie(t.getTagInformation());
    C(t.getMifareCardKeys(), n, !1, e);
}

function K(e, t, n) {
    var a = 16, o = e.length, c = function(e) {
        t ? se(function() {
            n(100);
        }) : (console.info("用户已经关闭自动锁定UFUID标签"), n(100));
    };
    console.log("上限块是: " + o), function t(u) {
        if (u >= o) i.getReader(!0).requestWRBLOnceGen1ATag(0, e[0], 2e3, c); else {
            console.log("当前的写开始位置: " + u + ", 上限block：" + o);
            var l = e.slice(u, u + a);
            i.getReader(!0).requestWRBLMoreGen1ATag(u, l, 3e3, function(e) {
                for (var c = 0; c < a; c++) if (!E(e.data, c)) return console.log("后门block写入失败: " + (c + u)), 
                void i.throwTagErrorEvent(r.miniapp.GEN1A_TAG_WRITE_FAILED);
                (u += a) + a > o && (a = o - u), n(u / o * 100 - 5), t(u);
            });
        }
    }(1);
}

function B() {
    return e.getStorageSyncHasDefault("preference_auto_lock_ufuid_tag", !0);
}

function W(e, t, n) {
    var a = 16, o = e.length;
    t || (s.length = 0), console.log("上限块是: " + o), function c(u) {
        if (u >= o) i.getReader(!1).requestWRBLOnceMFGDMTag(0, e[0], 2e3, function(e) {
            e.status == r.minicopy.HF_TAG_OK ? n(100) : (s.push(0), t ? i.throwTagErrorEvent(r.miniapp.STDMF_TAG_WRITE_FAILED) : n(100));
        }); else {
            console.log("当前的写开始位置: " + u + ", 上限block：" + o);
            var l = e.slice(u, u + a);
            i.getReader(!0).requestWRBLMoreMFGDMTag(u, l, 3e3, function(e) {
                for (var l = 0; l < a; l++) if (!E(e.data, l)) {
                    var _ = l + u;
                    if (console.log("GDM block写入失败: " + _), t) return void i.throwTagErrorEvent(r.miniapp.STDMF_TAG_WRITE_FAILED);
                    s.push(_);
                }
                (u += a) + a > o && (a = o - u), n(u / o * 100 - 5), c(u);
            });
        }
    }(1);
}

n.registerOnAttackKeysCbk(function(e, t, n, a, o) {
    "function" == typeof l && l(n / t * 60);
});

var U = {};

U[t.TAG_TYPE_HF_14443A] = null, U[t.TAG_TYPE_LF_EM410X] = function(e) {
    e(100);
}, U[t.TAG_TYPE_MF1_MAYBE] = function(e) {
    y(function() {
        J(e);
    });
}, U[t.TAG_TYPE_MF1_GEN1A] = function(o) {
    var c = t.getMifareTagDatas(), u = t.getMifareCardKeys();
    c.length = 0, u.length = 0;
    for (var l = 16, s = t.getTagInformation().max_block + 1, _ = a.mifare_secs_count_all(s), f = 0; f < _; f++) u.push(null, null);
    console.log("上限块是: " + s), function _(f) {
        f >= s ? n.setCacheKesy4Mifare(t.getMifareCardKeys()) : (console.log("当前的读开始位置: " + f + ", 上限block：" + s), 
        i.getReader(!0).requestRDBLMoreGen1ATag(f, l, 3e3, function(t) {
            for (var n = e.chunkArray(t.data.slice(2), 16), g = 0; g < n.length; g++) {
                var T = n[g], p = f + g;
                if (!E(t.data, g)) return c[p] = null, console.log("后门块读取失败: " + p), void i.throwTagErrorEvent(r.miniapp.GEN1A_TAG_READ_FAILED);
                if (c[p] = T, a.mifare_is_trailer_blk(p)) {
                    var h = T.slice(0, 6), A = T.slice(10, 16), y = a.mifare_block_2_sector(p);
                    u[2 * y] = h, u[2 * y + 1] = A;
                }
            }
            (f += l) + l > s && (l = s - f), o(f / s * 100), _(f);
        }));
    }(0);
}, U[t.TAG_TYPE_MF1_STDWK] = k, U[t.TAG_TYPE_MF1_STDST] = function(e) {
    F(n.requestFastSTKeyForSize, x(e));
}, U[t.TAG_TYPE_MF1_STDHD] = function(e) {
    var t, a = !1, o = i.getDevice();
    o instanceof i.DeviceClass.MiniCopy && o.device_firmware_ver_info.codeNumber >= 260 && (a = !0), 
    a ? (t = n.requestHardKeyForSize, console.info("检测到固件版本大于等于1.4, HardNested将启用支持")) : (t = n.checkHardnestedPartEncryptForSize, 
    console.info("检测到固件版本小于1.4, 无HardNested支持")), F(t, e);
}, U[t.TAG_TYPE_MF1_GDM] = k;

var j = {};

j[t.TAG_TYPE_HF_14443A] = null, j[t.TAG_TYPE_LF_EM410X] = function(n) {
    var a = t.getTagInformation(), o = e.hex2bytes(a.uid_hex);
    function c(t) {
        return e.bytes2hex(t, 0, t.length) == a.uid_hex;
    }
    var u = function(e) {
        e.status == r.minicopy.LF_TAG_OK && c(e.data) ? n(100) : i.throwTagErrorEvent(r.miniapp.EM410X_TAG_WRITE_FAILED);
    }, l = function(e) {
        var t = i.getDevice();
        t instanceof i.DeviceClass.MiniCopy && t.device_firmware_ver_info.codeNumber >= 262 && Array.prototype.push.apply(_, e.data), 
        i.getReader(!1).requestOnce410FieldScan(2e3, u);
    }, s = function(e) {
        e.status == r.minicopy.LF_TAG_OK && c(e.data) ? n(100) : (n(60), i.getReader(!0).requestOnceWrite82XXTag(o, 2e3, l));
    }, f = function(e) {
        i.getReader(!1).requestOnce410FieldScan(2e3, s);
    };
    i.getReader(!1).requestOnce410FieldScan(2e3, function(e) {
        e.status == r.minicopy.LF_TAG_OK && c(e.data) ? i.throwTagErrorEvent(r.miniapp.EM410X_TAG_NO_REMOVED) : (n(30), 
        i.getReader(!0).requestOnceWrite55XXTag(o, 2e3, f));
    });
}, j[t.TAG_TYPE_MF1_GEN1A] = w, j[t.TAG_TYPE_MF1_STDWK] = w, j[t.TAG_TYPE_MF1_STDST] = w, 
j[t.TAG_TYPE_MF1_STDHD] = w, j[t.TAG_TYPE_MF1_GDM] = w;

var X = {};

function J(e) {
    if (_.length = 0, null == t.getTagInformation().tag_type) throw "开发者没有使用 startLoopTagScanner 进行寻卡吗？没有寻到卡为什么调用了读取操作！";
    var n = U[t.getTagInformation().tag_type];
    if (null == n) throw "开发者没有判断 readable 变量吗？为什么对不支持读取的标签调用了读取操作！";
    n(e);
}

function z() {
    return t.getMifareTagDatas();
}

X[t.TAG_TYPE_HF_14443A] = null, X[t.TAG_TYPE_LF_EM410X] = null, X[t.TAG_TYPE_MF1_GEN1A] = function(e) {
    K(ie(t.getTagInformation()), !1, e);
}, X[t.TAG_TYPE_MF1_STDWK] = H, X[t.TAG_TYPE_MF1_STDST] = H, X[t.TAG_TYPE_MF1_STDHD] = H, 
X[t.TAG_TYPE_MF1_GDM] = function(e) {
    W(ie(t.getTagInformation()), !1, e);
};

var Z = {};

function Q() {
    return e.getStorageSyncHasDefault("dump_file_list", []);
}

function V(e) {
    for (var t = Q(), n = "dump_file_uuid_".concat(e), a = !0, o = !1, r = 0; r < t.length; r++) if (t[r] == e) {
        t.splice(r, 1), o = !0;
        break;
    }
    if (o) try {
        wx.setStorageSync("dump_file_list", t);
    } catch (e) {
        e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
        console.log("deleteDumpFileCache" + e), a = !1;
    }
    try {
        wx.removeStorageSync(n);
    } catch (e) {
        e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
        console.log("deleteDumpFileCache" + e), a = !1;
    }
    return a;
}

function $(t) {
    var n = Q(), a = e.generateUUID();
    n.push(a);
    try {
        wx.setStorageSync("dump_file_list", n), wx.setStorageSync("dump_file_uuid_".concat(a), t);
    } catch (e) {
        e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
        return console.log("appendDumpFileCache" + e), V(a), null;
    }
    return a;
}

function ee() {
    var e = t.getTagInformation(), n = e.tag_type;
    if (null != n) {
        var a = Z[n];
        if (null != a) return {
            tag_info: e,
            tag_data: a(),
            tag_date: new Date().getTime()
        };
        console.log("不支持保存数据的卡片类型: " + n);
    } else console.log("没有有效的卡片信息，无法保存数据！");
    return null;
}

function te(t) {
    var n = "dump_file_uuid_".concat(t);
    return e.getStorageSyncHasDefault(n, null);
}

function ne(n) {
    t.setMifareTagDatas(n.tag_data);
    var o = t.getMifareCardKeys();
    return o.length = 0, n.tag_data.forEach(function(t, n) {
        if (a.mifare_is_trailer_blk(n)) {
            var r = t.slice(0, 6), i = t.slice(10, 16);
            o.push(r), o.push(i), console.log("加载块".concat(n, "的Key: ").concat(e.bytes2hex(r), " -- ").concat(e.bytes2hex(i)));
        }
    }), !0;
}

Z[t.TAG_TYPE_HF_14443A] = null, Z[t.TAG_TYPE_LF_EM410X] = function() {
    return [];
}, Z[t.TAG_TYPE_MF1_MAYBE] = z, Z[t.TAG_TYPE_MF1_GEN1A] = z, Z[t.TAG_TYPE_MF1_STDWK] = z, 
Z[t.TAG_TYPE_MF1_STDST] = z, Z[t.TAG_TYPE_MF1_STDHD] = z, Z[t.TAG_TYPE_MF1_GDM] = z;

var ae = {};

function oe(e) {
    t.setTagInformation(e.tag_info);
    var n = ae[t.getTagInformation().tag_type], a = !0;
    return null != n ? a = n(e) : console.log("标签类型 ".concat(t.getTagInformation().tag_type, " 不支持加载数据到内存中，自动跳过！")), 
    a;
}

function re(e, t) {
    var n = "dump_file_uuid_".concat(e);
    if (-1 != wx.getStorageInfoSync().keys.indexOf(n)) {
        if (null != t) return wx.setStorageSync(n, t), console.log("更新信息成功！"), !0;
        console.log("更新信息失败，传入的信息为空！");
    } else console.log("更新失败，UUID指向的DUMP信息不存在！");
    return !1;
}

function ie(n) {
    for (var o = [], r = n.max_block + 1, i = 0; i < r; i++) 0 == i ? o.push(N(null, n)) : a.mifare_is_trailer_blk(i) ? o.push(e.hex2bytes(t.TAG_MF1_DEFAULT_TRAI)) : o.push(e.hex2bytes(t.TAG_MF1_DEFAULT_DATA));
    return o;
}

function ce(e) {
    var t = null, n = null;
    switch (e.type.toLowerCase()) {
      case "ic":
        n = ie(t = {
            tag_type: "Mf1StdNTWK",
            uid_hex: "E0658888",
            sak_hex: "08",
            atqa_hex: "0400",
            readable: !0,
            max_block: 63
        });
        break;

      case "id":
        t = {
            tag_type: "EM410x",
            uid_hex: "4400999559",
            readable: !0
        }, n = [];
    }
    return {
        tag_info: t,
        tag_data: n,
        tag_date: new Date().getTime()
    };
}

function ue(e, t, n, a, o, c) {
    i.getReader(!1).requestWRBLOnceStandard(e, t, n, a, 3e3, function(e) {
        e.status == r.minicopy.HF_TAG_OK ? o() : e.status == r.minicopy.HF_TAG_NO ? i.throwTagErrorEvent(r.minicopy.HF_TAG_NO) : c();
    });
}

function le(e, t, n, a, o, r) {
    ue(e, 96, t, a, function() {
        o();
    }, function() {
        ue(e, 97, n, a, function() {
            o();
        }, function() {
            r();
        });
    });
}

function se(e) {
    i.getReader(!1).requestUnlockChineseTag(3e3, function(t) {
        t.status == r.minicopy.HF_TAG_OK ? i.getReader(!1).requestUplockChineseTag(3e3, function(t) {
            console.log("GEN1A上锁 步骤二".concat(t.status == r.minicopy.HF_TAG_OK ? "成功" : "失败")), 
            t.status == r.minicopy.HF_TAG_OK ? e({
                success: !0,
                step: 2
            }) : e({
                success: !1,
                step: 2
            });
        }) : (console.log("GEN1A上锁 步骤一失败！"), e({
            success: !1,
            step: 1
        }));
    });
}

ae[t.TAG_TYPE_HF_14443A] = null, ae[t.TAG_TYPE_LF_EM410X] = function(e) {
    return !0;
}, ae[t.TAG_TYPE_MF1_MAYBE] = ne, ae[t.TAG_TYPE_MF1_GEN1A] = ne, ae[t.TAG_TYPE_MF1_STDWK] = ne, 
ae[t.TAG_TYPE_MF1_STDST] = ne, ae[t.TAG_TYPE_MF1_STDHD] = ne, ae[t.TAG_TYPE_MF1_GDM] = ne, 
module.exports = {
    getStorageSyncHasDefault: e.getStorageSyncHasDefault,
    isAutoUplockUFUIDTagEnable: B,
    setAutoUpLockUFUIDTagEnable: function(e) {
        wx.setStorageSync("preference_auto_lock_ufuid_tag", e);
    },
    isAutoDetectGDMTagEnable: T,
    setAutoDetectGDMTagEnable: function(e) {
        wx.setStorageSync("preference_auto_detect_gdm_tag", e);
    },
    isAutoWriteQinLin88TagEnable: p,
    setAutoWriteQinLin88TagEnable: function(e) {
        wx.setStorageSync("preference_auto_write_qinlin88_tag", e);
    },
    isAutoWrite71BTag16SectorEnable: h,
    setAutoWrite71BTag16SectorEnable: function(e) {
        wx.setStorageSync("preference_auto_write_71B_tag_16_sector", e);
    },
    startLoopTagScanner: function(e, n, a, l) {
        c = !0, u = !1, _.length = 0;
        var s = !0, T = new Date().getTime();
        i.getReader(!1).requestOnce14AFieldScan(3e3, function _(p) {
            if (0 == c || 0 == o.hasDeviceConnected()) return console.log("强行结束自动搜索标签的过程！"), 
            void (u = !0);
            var h = r.minicopy.HF_TAG_OK;
            if (s || (h = r.minicopy.LF_TAG_OK), p.status != h) {
                if (new Date().getTime() - T > e) return t.setTagInformation(null), u = !0, void l();
                s ? (s = !1, n("LF"), i.getReader(!1).requestOnce410FieldScan(3e3, _)) : (s = !0, 
                n("HF"), i.getReader(!1).requestOnce14AFieldScan(3e3, _));
            } else {
                var A = function(e) {
                    t.setTagInformation(e), u = !0, a(e);
                };
                s ? f(p, A) : g(p, A);
            }
        });
    },
    stopLoopCardScanner: function(e) {
        if (c) {
            c = !1;
            var t = setInterval(function() {
                u || 0 == o.hasDeviceConnected() ? (clearInterval(t), e()) : console.log("正在等待自动扫描标签的过程停止......");
            }, 1);
        } else e();
    },
    startHFTagOneSearch: function(e, n) {
        i.getReader(!1).requestOnce14AFieldScan(3e3, function(a) {
            if (a.status != r.minicopy.HF_TAG_OK) t.setTagInformation(null), n(); else {
                f(a, function(n) {
                    t.setTagInformation(n), e(n);
                });
            }
        });
    },
    startCheckMF1Detail: y,
    startLFTagOneSearch: function(e, n) {
        i.getReader(!1).requestOnce410FieldScan(2e3, function(a) {
            if (a.status != r.minicopy.LF_TAG_OK) t.setTagInformation(null), n(); else {
                g(a, function(n) {
                    t.setTagInformation(n), e(n);
                });
            }
        });
    },
    startReadTagAllData: J,
    startWriteCardDatas: function(e) {
        if (_.length = 0, null == t.getTagInformation().tag_type) throw "开发者没有使用 startLoopTagScanner 进行寻卡吗？没有寻到卡为什么调用了写卡操作！";
        var n = j[t.getTagInformation().tag_type];
        if (null == n) throw "开发者没有判断 readable 变量吗？为什么对不支持写卡的标签调用了写卡操作！";
        n(e);
    },
    startWipeTagAllData: function(e) {
        if (_.length = 0, null == t.getTagInformation().tag_type) throw "开发者没有使用 startLoopTagScanner 进行寻卡吗？没有寻到卡为什么调用了清空操作！";
        var n = X[t.getTagInformation().tag_type];
        if (null == n) throw "开发者没有判断 readable 变量吗？为什么对不支持清空卡的标签调用了清空操作！";
        n(e);
    },
    getWriteBlocks4Fail: function() {
        return s;
    },
    getOpFailExtendCode: function() {
        return _;
    },
    startWrite14ATagUID: function(n) {
        n(0);
        var a = function(a) {
            var o = N();
            if (console.log("将被写入0扇区0块的UID数据：" + e.bytes2hex(o)), a.tag_type == t.TAG_TYPE_MF1_GEN1A) O(a) ? i.getReader(!0).requestWRBLOnceGen1ATag(0, o, 3e3, function(e) {
                n(100);
            }) : i.throwTagErrorEvent(r.miniapp.CONTAINER_TAG_SIZE_ERR); else if (a.tag_type == t.TAG_TYPE_MF1_GDM) O(a) ? i.getReader(!1).requestWRBLOnceMFGDMTag(0, o, 3e3, function(e) {
                e.status == r.minicopy.HF_TAG_OK ? n(100) : e.status == r.minicopy.HF_ERRSTAT ? i.throwTagErrorEvent(r.miniapp.STDMF_UID_WRITE_FAILED) : i.throwTagErrorEvent(e.status);
            }) : i.throwTagErrorEvent(r.miniapp.CONTAINER_TAG_SIZE_ERR); else if (a.tag_type == t.TAG_TYPE_MF1_STDWK || a.tag_type == t.TAG_TYPE_MF1_STDST || a.tag_type == t.TAG_TYPE_MF1_STDHD) if (O(a)) {
                var c = [ [ 255, 255, 255, 255, 255, 255 ], [ 255, 255, 255, 255, 255, 255 ] ];
                !function(e, t, n, a) {
                    i.getReader(!0).requestAuthMF1KnownKeys([ e, t ], 3e3, function(o) {
                        var c = 1 & o.data[0], u = o.data[0] >> 1 & 1;
                        c || u ? ue(0, 96, e, n, a, function() {
                            ue(0, 97, t, n, a, function() {
                                i.throwTagErrorEvent(r.miniapp.STDMF_UID_WRITE_FAILED);
                            });
                        }) : i.throwTagErrorEvent(r.miniapp.UNWRITABLE_ENCRYPTED_MF1);
                    });
                }(c[0], c[1], o, function() {
                    n(100);
                });
            } else i.throwTagErrorEvent(r.miniapp.CONTAINER_TAG_SIZE_ERR); else i.throwTagErrorEvent(r.miniapp.CONTAINER_TAG_TYPE_ERR);
        }, o = function(e) {
            e.tag_type == t.TAG_TYPE_MF1_MAYBE ? (n(30), A(function(t) {
                Object.assign(e, t), n(50), a(e);
            })) : i.throwTagErrorEvent(r.miniapp.CONTAINER_TAG_TYPE_ERR);
        };
        i.getReader(!0).requestOnce14AFieldScan(3e3, function(e) {
            console.log("只写卡号时寻卡的结果: " + JSON.stringify(e)), f(e, o), n(20);
        });
    },
    startWrite2PhoneNFC: function(e) {
        var n = L(), o = n.length;
        s.length = 0, function r(i) {
            if (!(i >= o)) {
                var c = n[i], u = a.mifare_block_2_sector(i), l = t.getMifareCardKeys()[parseInt(2 * u)], _ = t.getMifareCardKeys()[parseInt(2 * u + 1)];
                !function(e, t, n, a, o, r) {
                    var i = [ 255, 255, 255, 255, 255, 255 ];
                    !function c(u) {
                        u >= 5 ? r() : le(e, i, i, a, o, function() {
                            le(e, t, n, a, o, function() {
                                c(++u);
                            });
                        });
                    }(0);
                }(i, l, _, c, function() {
                    e((i += 1) / o * 100), r(i);
                }, function() {
                    s.push(i), e((i += 1) / o * 100), r(i);
                });
            }
        }(1);
    },
    startUplockUFUIDTag: se,
    appendDumpFileCache: $,
    saveDumpDatasToFile: function() {
        var e = ee();
        return null != e ? $(e) : null;
    },
    makeEmptyMifareData: ie,
    makeTemplateTagData: ce,
    makeDatasSaveToFile: function(e) {
        var t = ce(e);
        return null != t ? $(t) : null;
    },
    deleteDumpFilesByID: function(e) {
        if ("string" == typeof e) return V(e);
        if (Array.isArray(e)) {
            for (var t = !0, n = 0; n < e.length; n++) 0 == V(e[n]) && (console.log("有一个删除DUMP信息的任务失败了，其UUID是: " + e[n]), 
            t = !1);
            return t;
        }
        return console.log("startDeleteDumpFile 不支持的传入格式！"), !1;
    },
    updateDumpDatasByID: re,
    updateDumpFromMemByID: function(e) {
        return re(e, ee());
    },
    getCardDataFileList: function() {
        return Q();
    },
    getCardDataDumpInfo: te,
    loadJson2DataBuffer: oe,
    loadFile2DataBuffer: function(e) {
        var t = te(e);
        return null == t ? (console.log("loadFile2DataBuffer 无法加载指定的DUMP信息: " + e), !1) : oe(t);
    },
    createDumpInfoJsonFromMem: ee
};