var e = require("AC1F69C355C842DFCA7901C4DB75D685.js"), t = require("614DB8F055C842DF072BD0F70136D685.js"), n = require("53CD6E9355C842DF35AB0694BD16D685.js"), a = require("6A5B005755C842DF0C3D685076E5D685.js"), o = require("D6EF5C7155C842DFB08934760C65D685.js"), r = require("8896821655C842DFEEF0EA119506D685.js"), i = require("DFE4D8E455C842DFB982B0E32585D685.js"), c = !1, s = !1, _ = null, l = [], u = [];

function f(n, a) {
    var o = n.data[10], c = {
        tag_type: t.TAG_TYPE_HF_14443A,
        uid_hex: e.bytes2hex(n.data, 0, o),
        sak_hex: e.bytes2hex(n.data, 12, 1),
        atqa_hex: e.bytes2hex(n.data.slice(13, 15), 0, 2),
        readable: !1
    }, s = function(e) {
        e.status == r.minicopy.HF_TAG_OK ? (c.tag_type = t.TAG_TYPE_MF1_MAYBE, c.readable = !0) : c.tag_type = t.TAG_TYPE_HF_14443A, 
        a(c);
    };
    i.getReader(!1).request14AGetATSDataArr(1500, function(t) {
        t.status == r.minicopy.HF_TAG_OK && null != t.data && t.data.length > 0 && (c.ats_hex = e.bytes2hex(t.data, 0, t.data.length)), 
        i.getReader(!1).requestCheckMf3TimeAuth(1500, s);
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
        o.status == r.minicopy.HF_TAG_OK ? (n.tag_type = t.TAG_TYPE_MF1_RF08S, e(n)) : i.getReader(!0).requestNestedNTLoophole(1500, a);
    };
    function c() {
        var e = !1, t = i.getDevice();
        t instanceof i.DeviceClass.MiniCopy && t.device_firmware_ver_info.codeNumber >= 265 && (e = !0), 
        console.log("当前设备是否支持RF08S解密: ".concat(e)), e ? i.getReader(!0).requestCheckValidRF08sTag(1500, o) : i.getReader(!0).requestNestedNTLoophole(1500, a);
    }
    var s = function(a) {
        a.status != r.minicopy.HF_TAG_NO ? a.status != r.minicopy.HF_TAG_OK ? c() : (n.tag_type = t.TAG_TYPE_MF1_GDM, 
        e(n)) : i.throwTagErrorEvent(a.status);
    }, _ = function(a) {
        if (a.status != r.minicopy.HF_TAG_NO) if (a.status != r.minicopy.HF_TAG_OK) {
            var o = !1, _ = i.getDevice();
            _ instanceof i.DeviceClass.MiniCopy && _.device_firmware_ver_info.codeNumber >= 259 && (o = !0), 
            T() && o ? (console.log("版本大于等于v1.3，将会继续检测目标卡是否是GDM卡。"), i.getReader(!1).requestCheckValidGDMTag(1500, s)) : c();
        } else n.tag_type = t.TAG_TYPE_MF1_GEN1A, e(n); else i.throwTagErrorEvent(a.status);
    };
    i.getReader(!0).requestCheckMfBlockSize(3e3, function(e) {
        n.max_block = e.data[0], i.getReader(!1).requestGEN1ATAGLoophole(1500, _);
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

function F(t, n, o, r, c) {
    var s = a.mifare_sector_2_block(t), _ = {};
    if (r.sort(function(e, t) {
        return e - t;
    }), r.length > 16) {
        var l = "startReadMifareSectorForType发现使能读取的列表太大！" + r.length;
        throw console.log(l), l;
    }
    i.getReader(!0).requestRDSCOnceStandard(t, n, o, r, 3e3, function(t) {
        var n = e.chunkArray(t.data.slice(2), 16);
        r.forEach(function(e, a) {
            E(t.data, e) ? _[s + a] = n[a] : _[s + a] = null;
        }), c(_);
    });
}

function v(e, t, n, o) {
    var r = d(e);
    F(e, 96, t, r, function(t) {
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
        }(t, e), console.log("扇区".concat(e, "使用A秘钥读取失败的block: ") + JSON.stringify(r)), F(e, 97, n, r, function(e) {
            var n, a, r;
            o((n = t, a = e, r = {}, Object.keys(n).forEach(function(e) {
                r[e] = n[e], null == r[e] && e in a && null != a[e] && (r[e] = a[e]);
            }), Object.keys(a).forEach(function(e) {
                e in r || (r[e] = a[e]);
            }), r));
        }));
    });
}

function D(o, r) {
    var i = t.getMifareTagDatas(), c = t.getMifareCardKeys();
    i.length = 0, c.length = 0, o(t.getTagInformation().max_block + 1, function(o) {
        n.setCacheKesy4Mifare(o);
        for (var s = Object.keys(o).length, _ = 0; _ < s; _++) {
            var l = e.hex2bytes(o[_].keya), u = e.hex2bytes(o[_].keyb);
            c.push(l), c.push(u);
        }
        console.log(" "), console.log("密钥获取完成，开始以获得的密钥读取所有的扇区："), function n(c) {
            if (c >= s) r(100); else {
                var _ = e.hex2bytes(o[c].keya), l = e.hex2bytes(o[c].keyb);
                v(c, _, l, function(o) {
                    var u = Object.keys(o);
                    console.log("----------------------------------------------------------------------------------------"), 
                    u.forEach(function(n, r) {
                        var s = o[n];
                        if (r == u.length - 1) {
                            var f = new Array();
                            Array.prototype.push.apply(f, _), null == o[n] ? Array.prototype.push.apply(f, [ 0, 0, 0, 0 ]) : Array.prototype.push.apply(f, o[n].slice(6, 10)), 
                            Array.prototype.push.apply(f, l), s = f, console.log("拼接密钥: ".concat(e.bytes2hex(_), " -- ").concat(e.bytes2hex(l), "，块").concat(a.mifare_sector_2_block(c) + r));
                        } else null == s && (s = e.hex2bytes(t.TAG_MF1_DEFAULT_DATA));
                        console.log("块".concat(r, ", 数据: ").concat(e.bytes2hex(s))), i.push(s);
                    }), r(c / s * 100), n(c + 1);
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

function R(e, t) {
    var n = {};
    return Object.keys(e).forEach(function(t) {
        n[t] = e[t];
    }), Object.keys(t).forEach(function(e) {
        1 == t[e] && (n[e] = !0);
    }), n;
}

function I(e) {
    return _(e = e / 100 * 40 + 60);
}

function x(e) {
    return _ = e, I;
}

function k(e) {
    D(n.requestNestedKeyForSize, x(e));
}

function Y(e) {
    return t.getTagInformation().uid_hex.length == e.uid_hex.length;
}

function P(e) {
    return function(e) {
        var n = t.getMifareTagDatas().length;
        return e.max_block + 1 >= n;
    }(e) && Y(e);
}

function O(n) {
    if (null != n && null != n && Array.isArray(n) && 0 != n.length || (n = t.getMifareTagDatas()), 
    72 != n.length) return !1;
    for (var o = a.mifare_sector_2_block(16), r = 0; r < 3; r++) if (e.bytes2hex(n[o + r]) != t.TAG_MF1_DEFAULT_DATA) return !1;
    return !0;
}

function w(e) {
    var n = function(n) {
        if (P(n) || (o = n, console.log("判断71B卡写到S50容器卡的可行性：\n        原卡与容器卡UID长度是否一致  ：".concat(Y(o), ", \n        71B原卡16扇区的数据是否是空的：").concat(O(), ", \n        是否使能71B卡（亲邻88卡）写入：").concat(p(), ",\n        是否使能71B卡16扇区智能写入  ：").concat(h())), 
        Y(o) && O() && p() && h())) switch (n.tag_type) {
          case t.TAG_TYPE_MF1_GEN1A:
            !function(e) {
                var t = N(), n = U();
                H(t, n, e);
            }(e);
            break;

          case t.TAG_TYPE_MF1_GDM:
            !function(e) {
                B(N(), !0, e);
            }(e);
            break;

          case t.TAG_TYPE_MF1_STDWK:
          case t.TAG_TYPE_MF1_STDST:
          case t.TAG_TYPE_MF1_STDHD:
          case t.TAG_TYPE_MF1_RF08S:
            !function(e, n) {
                var o = N();
                !function(e, n) {
                    var o = a.mifare_secs_count_all(n.max_block + 1);
                    18 == a.mifare_secs_count_all(t.getTagInformation().max_block + 1) && p() && (o -= 1);
                    for (var c, s, _ = new Array(2 * o), l = new Array(_.length), u = t.getMifareCardKeys(), f = 0; f < l.length; f++) f >= u.length ? l[f] = [ 255, 255, 255, 255, 255, 255 ] : l[f] = u[f];
                    for (f = 0; f < _.length; f++) _[f] = [ 255, 255, 255, 255, 255, 255 ];
                    var g = function(t) {
                        if (L(t.data, _.length)) console.log("此容器卡是原卡的密钥！"), e(l); else {
                            console.log("此容器卡有非原卡的密钥，将尝试合并原卡和空卡密钥！"), s = t.data;
                            for (var n = [], a = 0; a < _.length; a++) {
                                var o = 1 == (c[parseInt(a / 8)] >> parseInt(a % 8) & 1), u = 1 == (s[parseInt(a / 8)] >> parseInt(a % 8) & 1);
                                o ? n.push(_[a]) : u && n.push(l[a]);
                            }
                            n.length == _.length ? (console.log("合并成功，已经发现该容器卡所有的可用密钥！"), e(n)) : (console.log("合并失败，未发现该容器卡所有的可用密钥！"), 
                            i.throwTagErrorEvent(r.miniapp.UNWRITABLE_ENCRYPTED_MF1));
                        }
                    };
                    console.log("开始检索默认密钥，密钥数量是: " + _.length), i.getReader(!0).requestAuthMF1KnownKeys(_, 5e3, function(t) {
                        L(t.data, _.length) ? (console.log("此容器卡全都是默认密钥！"), e(_)) : (c = t.data, console.log("此容器卡有非默认密钥，将进行原卡密钥检索！"), 
                        i.getReader(!0).requestAuthMF1KnownKeys(l, 5e3, g));
                    });
                }(function(t) {
                    !function(e) {
                        var t = i.getDevice(), n = !1;
                        t instanceof i.DeviceClass.MiniCopy && (n = t.device_firmware_ver_info.codeNumber >= 259);
                        if (n) {
                            var a = function(e, t) {
                                i.getReader(!1).request14443ARAWCommand(o, e, function(e) {
                                    console.log("FUID解锁执行结果：" + JSON.stringify(e)), t();
                                });
                            }, o = new i.Raw14aArgs();
                            o.readResponse = !0, o.appendCRC = !1, o.bitsFrame = !0, o.bitsNumber = 7, o.autoSelect = !1, 
                            o.keepField = !0, o.checkRespCRC = !1, o.respTimeout = 100, console.log("重置FUID阶段1 > 开启后门"), 
                            a([ 32 ], function() {
                                o.bitsFrame = !1, console.log("重置FUID阶段2 > 确认后门"), a([ 35 ], function() {
                                    console.log("重置FUID阶段3 > 发送写卡指令"), a([ 160, 0, 95, 177 ], function() {
                                        console.log("重置FUID阶段4 > 发送写卡数据"), o.keepField = !1, a([ 170, 85, 195, 150, 170, 8, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 125 ], e);
                                    });
                                });
                            });
                        } else e();
                    }(function() {
                        q(t, o, !0, e);
                    });
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

function C(n, a) {
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

function N() {
    var n = e.getStorageSyncHasDefault("preference_auto_invalid_acs_fix", !0), o = e.getStorageSyncHasDefault("preference_use_anticollision_sak", !0);
    console.log("是否启用了自动修复控制位: " + n), console.log("是否启用了自动修复SAK: " + o);
    var r = new Array();
    return t.getMifareTagDatas().forEach(function(i, c) {
        var s = i;
        0 == c ? null == s ? (s = C(), console.log("厂商块为空，自动修正后的数据是: " + e.bytes2hex(s))) : o && 8 == t.getTagInformation().uid_hex.length ? (s = C(s), 
        console.log("厂商块不为空，强行修正SAK后的数据是: " + e.bytes2hex(s))) : console.log("厂商块不为空且无需修正厂商块。") : a.mifare_is_trailer_blk(c) ? null == s ? n ? (s = e.hex2bytes(t.TAG_MF1_DEFAULT_TRAI), 
        console.log("尾部块".concat(c, "为空，自动修正为默认尾部块"))) : (s = e.hex2bytes(t.TAG_MF1_DEFAULT_DATA), 
        console.log("尾部块".concat(c, "为空，不自动修正为默认尾部块，而是使用空的数据填充，此操作可能会导致卡片锁死。"))) : 0 == s[6] && 0 == s[7] && 0 == s[8] && 0 == s[9] && (n ? (s[6] = 255, 
        s[7] = 7, s[8] = 128, s[9] = 105, console.log("尾部块".concat(c, "控制位为空，自动修正为默认控制位，此操作可避免锁卡。"))) : console.log("尾部块".concat(c, "控制位为空，但是不自动修正，此操作可能会导致卡片锁死。"))) : null == s && (s = e.hex2bytes(t.TAG_MF1_DEFAULT_DATA), 
        console.log("数据块".concat(c, "为空，自动修正为空的数据块。")));
        r.push(s);
    }), O(r) && p() && h() && (r = r.slice(0, r.length - 8), console.log("数据裁剪成功，已经自动修复71B标签为S50容量。")), 
    r;
}

function L(e, t) {
    for (var n = !0, a = 0; a < t; a++) {
        if (!(1 == (e[parseInt(a / 8)] >> parseInt(a % 8) & 1))) {
            n = !1;
            break;
        }
    }
    return n;
}

function q(t, n, o, c) {
    for (var s = 0; s < t.length; s += 2) console.log("索引是: ".concat(s, ", 密钥是A: ").concat(e.bytes2hex(t[s]), "，密钥B是: ").concat(e.bytes2hex(t[s + 1])));
    var _ = n.length, u = Math.min(a.mifare_secs_count_all(_), t.length / 2);
    o || (l.length = 0);
    var f = function(e) {
        S([ 0, 3 ], e) ? (console.log("写卡全部成功（包括厂商块）"), c(100)) : S([ 3 ], e) ? (console.log("写卡部分成功（只有尾部块）"), 
        o ? i.throwTagErrorEvent(r.miniapp.STDMF_UID_WRITE_FAILED) : (l.push(0), c(100))) : (console.log("写卡不成功（厂商块和尾部块都失败！）"), 
        o ? i.throwTagErrorEvent(r.miniapp.STDMF_TAG_WRITE_FAILED) : (l.push(0, 3), c(100)));
    };
    console.log("将会写入到容器卡的扇区数量总数: " + u), function s(_) {
        if (_ >= u) {
            var g = [ n[0], n[3] ];
            return T = t[0], h = t[1], y = f, void m(0, 96, T, E = [ 0, 3 ], A = g, function(e) {
                if (S([ 0, 3 ], e)) y(e); else {
                    E = [];
                    var t = [];
                    0 == e[0] && (E.push(0), t.push(A[0])), 0 == e[3] && (E.push(3), t.push(A[1])), 
                    m(0, 97, h, E, t, function(t) {
                        y(R(e, t));
                    });
                }
            });
        }
        var T, h, A, y, E, F = a.mifare_sector_2_block(_), v = F + a.mifare_blks_count_sec(_), D = n.slice(F, v), I = t[parseInt(2 * _)], x = t[parseInt(2 * _ + 1)];
        if (18 == u && 17 == _ && p()) return console.warn("当前是亲邻卡写卡模式，且识别到了一个18个扇区的M1卡，将自动跳过最后一个扇区的写入！"), 
        c((_ += 1) / u * 100 - 5), void s(_);
        !function(e, t, n, a, o) {
            var r = d(e);
            G(e, 96, t, r, a, function(t) {
                if (M(e, t)) o(t); else {
                    r = b(t, e), console.log("扇区".concat(e, "写入失败的block: ").concat(r));
                    for (var i = [], c = 0; c < r.length; c++) i.push(a[r[c]]);
                    G(e, 97, n, r, i, function(e) {
                        o(R(t, e));
                    });
                }
            });
        }(_, I, x, D, function(t) {
            if (M(_, t)) {
                console.log("普通sector写入成功: " + _ + ", 数据: ");
                for (var n = 0; n < D.length; n++) console.log("Block".concat(n, ": ") + e.bytes2hex(D[n], 0, 16));
            } else {
                if (console.log("普通sector写入失败: " + _), o) return void i.throwTagErrorEvent(r.miniapp.STDMF_TAG_WRITE_FAILED);
                for (var a = b(t, _), f = 0; f < a.length; f++) a[f] = F + f;
                Array.prototype.push.apply(l, a);
            }
            c((_ += 1) / u * 100 - 5), s(_);
        });
    }(0);
}

function K(e) {
    var n = ie(t.getTagInformation());
    q(t.getMifareCardKeys(), n, !1, e);
}

function H(e, t, n) {
    var a = 16, o = e.length, c = function(e) {
        t ? le(function() {
            n(100);
        }) : (console.info("用户已经关闭自动锁定UFUID标签"), n(100));
    };
    console.log("上限块是: " + o), function t(s) {
        if (s >= o) i.getReader(!0).requestWRBLOnceGen1ATag(0, e[0], 2e3, c); else {
            console.log("当前的写开始位置: " + s + ", 上限block：" + o);
            var _ = e.slice(s, s + a);
            i.getReader(!0).requestWRBLMoreGen1ATag(s, _, 3e3, function(e) {
                for (var c = 0; c < a; c++) if (!E(e.data, c)) return console.log("后门block写入失败: " + (c + s)), 
                void i.throwTagErrorEvent(r.miniapp.GEN1A_TAG_WRITE_FAILED);
                (s += a) + a > o && (a = o - s), n(s / o * 100 - 5), t(s);
            });
        }
    }(1);
}

function U() {
    return e.getStorageSyncHasDefault("preference_auto_lock_ufuid_tag", !0);
}

function B(e, t, n) {
    var a = 16, o = e.length;
    t || (l.length = 0), console.log("上限块是: " + o), function c(s) {
        if (s >= o) i.getReader(!1).requestWRBLOnceMFGDMTag(0, e[0], 2e3, function(e) {
            e.status == r.minicopy.HF_TAG_OK ? n(100) : (l.push(0), t ? i.throwTagErrorEvent(r.miniapp.STDMF_TAG_WRITE_FAILED) : n(100));
        }); else {
            console.log("当前的写开始位置: " + s + ", 上限block：" + o);
            var _ = e.slice(s, s + a);
            i.getReader(!0).requestWRBLMoreMFGDMTag(s, _, 3e3, function(e) {
                for (var _ = 0; _ < a; _++) if (!E(e.data, _)) {
                    var u = _ + s;
                    if (console.log("GDM block写入失败: " + u), t) return void i.throwTagErrorEvent(r.miniapp.STDMF_TAG_WRITE_FAILED);
                    l.push(u);
                }
                (s += a) + a > o && (a = o - s), n(s / o * 100 - 5), c(s);
            });
        }
    }(1);
}

n.registerOnAttackKeysCbk(function(e, t, n, a, o) {
    "function" == typeof _ && _(n / t * 60);
});

var W = {};

W[t.TAG_TYPE_HF_14443A] = null, W[t.TAG_TYPE_LF_EM410X] = function(e) {
    e(100);
}, W[t.TAG_TYPE_MF1_MAYBE] = function(e) {
    y(function() {
        z(e);
    });
}, W[t.TAG_TYPE_MF1_GEN1A] = function(o) {
    var c = t.getMifareTagDatas(), s = t.getMifareCardKeys();
    c.length = 0, s.length = 0;
    for (var _ = 16, l = t.getTagInformation().max_block + 1, u = a.mifare_secs_count_all(l), f = 0; f < u; f++) s.push(null, null);
    console.log("上限块是: " + l), function u(f) {
        f >= l ? n.setCacheKesy4Mifare(t.getMifareCardKeys()) : (console.log("当前的读开始位置: " + f + ", 上限block：" + l), 
        i.getReader(!0).requestRDBLMoreGen1ATag(f, _, 3e3, function(t) {
            for (var n = e.chunkArray(t.data.slice(2), 16), g = 0; g < n.length; g++) {
                var T = n[g], p = f + g;
                if (!E(t.data, g)) return c[p] = null, console.log("后门块读取失败: " + p), void i.throwTagErrorEvent(r.miniapp.GEN1A_TAG_READ_FAILED);
                if (c[p] = T, a.mifare_is_trailer_blk(p)) {
                    var h = T.slice(0, 6), A = T.slice(10, 16), y = a.mifare_block_2_sector(p);
                    s[2 * y] = h, s[2 * y + 1] = A;
                }
            }
            (f += _) + _ > l && (_ = l - f), o(f / l * 100), u(f);
        }));
    }(0);
}, W[t.TAG_TYPE_MF1_STDWK] = k, W[t.TAG_TYPE_MF1_STDST] = function(e) {
    D(n.requestFastSTKeyForSize, x(e));
}, W[t.TAG_TYPE_MF1_STDHD] = function(e) {
    var t, a = !1, o = i.getDevice();
    o instanceof i.DeviceClass.MiniCopy && o.device_firmware_ver_info.codeNumber >= 260 && (a = !0), 
    a ? (t = n.requestHardKeyForSize, console.info("检测到固件版本大于等于1.4, HardNested将启用支持")) : (t = n.checkHardnestedPartEncryptForSize, 
    console.info("检测到固件版本小于1.4, 无HardNested支持")), D(t, e);
}, W[t.TAG_TYPE_MF1_RF08S] = function(e) {
    var t, a = !1, o = i.getDevice();
    o instanceof i.DeviceClass.MiniCopy && o.device_firmware_ver_info.codeNumber >= 265 && (a = !0), 
    a ? (t = n.requestRF08sKeyForSize, console.info("检测到固件版本大于等于1.9, RF08S将启用支持")) : (t = n.checkUnencryptedForSizeElseUnsupported, 
    console.info("检测到固件版本小于1.9, 无RF08S支持")), D(t, e);
}, W[t.TAG_TYPE_MF1_GDM] = k;

var j = {};

j[t.TAG_TYPE_HF_14443A] = null, j[t.TAG_TYPE_LF_EM410X] = function(n) {
    var a = t.getTagInformation(), o = e.hex2bytes(a.uid_hex);
    function c(t) {
        return e.bytes2hex(t, 0, t.length) == a.uid_hex;
    }
    var s = function(e) {
        e.status == r.minicopy.LF_TAG_OK && c(e.data) ? n(100) : i.throwTagErrorEvent(r.miniapp.EM410X_TAG_WRITE_FAILED);
    }, _ = function(e) {
        var t = i.getDevice();
        t instanceof i.DeviceClass.MiniCopy && t.device_firmware_ver_info.codeNumber >= 262 && Array.prototype.push.apply(u, e.data), 
        i.getReader(!1).requestOnce410FieldScan(2e3, s);
    }, l = function(e) {
        e.status == r.minicopy.LF_TAG_OK && c(e.data) ? n(100) : (n(60), i.getReader(!0).requestOnceWrite82XXTag(o, 2e3, _));
    }, f = function(e) {
        i.getReader(!1).requestOnce410FieldScan(2e3, l);
    };
    i.getReader(!1).requestOnce410FieldScan(2e3, function(e) {
        e.status == r.minicopy.LF_TAG_OK && c(e.data) ? i.throwTagErrorEvent(r.miniapp.EM410X_TAG_NO_REMOVED) : (n(30), 
        i.getReader(!0).requestOnceWrite55XXTag(o, 2e3, f));
    });
}, j[t.TAG_TYPE_MF1_GEN1A] = w, j[t.TAG_TYPE_MF1_STDWK] = w, j[t.TAG_TYPE_MF1_STDST] = w, 
j[t.TAG_TYPE_MF1_STDHD] = w, j[t.TAG_TYPE_MF1_RF08S] = w, j[t.TAG_TYPE_MF1_GDM] = w;

var X = {};

function z(e) {
    if (u.length = 0, null == t.getTagInformation().tag_type) throw "开发者没有使用 startLoopTagScanner 进行寻卡吗？没有寻到卡为什么调用了读取操作！";
    var n = W[t.getTagInformation().tag_type];
    if (null == n) throw "开发者没有判断 readable 变量吗？为什么对不支持读取的标签调用了读取操作！";
    n(e);
}

function J() {
    return t.getMifareTagDatas();
}

X[t.TAG_TYPE_HF_14443A] = null, X[t.TAG_TYPE_LF_EM410X] = null, X[t.TAG_TYPE_MF1_GEN1A] = function(e) {
    H(ie(t.getTagInformation()), !1, e);
}, X[t.TAG_TYPE_MF1_STDWK] = K, X[t.TAG_TYPE_MF1_STDST] = K, X[t.TAG_TYPE_MF1_STDHD] = K, 
X[t.TAG_TYPE_MF1_RF08S] = K, X[t.TAG_TYPE_MF1_GDM] = function(e) {
    B(ie(t.getTagInformation()), !1, e);
};

var Z = {};

function V() {
    return e.getStorageSyncHasDefault("dump_file_list", []);
}

function Q(e) {
    for (var t = V(), n = "dump_file_uuid_".concat(e), a = !0, o = !1, r = 0; r < t.length; r++) if (t[r] == e) {
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
    var n = V(), a = e.generateUUID();
    n.push(a);
    try {
        wx.setStorageSync("dump_file_list", n), wx.setStorageSync("dump_file_uuid_".concat(a), t);
    } catch (e) {
        e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
        return console.log("appendDumpFileCache" + e), Q(a), null;
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
}, Z[t.TAG_TYPE_MF1_MAYBE] = J, Z[t.TAG_TYPE_MF1_GEN1A] = J, Z[t.TAG_TYPE_MF1_STDWK] = J, 
Z[t.TAG_TYPE_MF1_STDST] = J, Z[t.TAG_TYPE_MF1_STDHD] = J, Z[t.TAG_TYPE_MF1_RF08S] = J, 
Z[t.TAG_TYPE_MF1_GDM] = J;

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
    for (var o = [], r = n.max_block + 1, i = 0; i < r; i++) 0 == i ? o.push(C(null, n)) : a.mifare_is_trailer_blk(i) ? o.push(e.hex2bytes(t.TAG_MF1_DEFAULT_TRAI)) : o.push(e.hex2bytes(t.TAG_MF1_DEFAULT_DATA));
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

function se(e, t, n, a, o, c) {
    i.getReader(!1).requestWRBLOnceStandard(e, t, n, a, 3e3, function(e) {
        e.status == r.minicopy.HF_TAG_OK ? o() : e.status == r.minicopy.HF_TAG_NO ? i.throwTagErrorEvent(r.minicopy.HF_TAG_NO) : c();
    });
}

function _e(e, t, n, a, o, r) {
    se(e, 96, t, a, function() {
        o();
    }, function() {
        se(e, 97, n, a, function() {
            o();
        }, function() {
            r();
        });
    });
}

function le(e) {
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
ae[t.TAG_TYPE_MF1_STDST] = ne, ae[t.TAG_TYPE_MF1_STDHD] = ne, ae[t.TAG_TYPE_MF1_RF08S] = ne, 
ae[t.TAG_TYPE_MF1_GDM] = ne, module.exports = {
    getStorageSyncHasDefault: e.getStorageSyncHasDefault,
    isAutoUplockUFUIDTagEnable: U,
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
    startLoopTagScanner: function(e, n, a, _) {
        c = !0, s = !1, u.length = 0;
        var l = !0, T = new Date().getTime();
        i.getReader(!1).requestOnce14AFieldScan(3e3, function u(p) {
            if (0 == c || 0 == o.hasDeviceConnected()) return console.log("强行结束自动搜索标签的过程！"), 
            void (s = !0);
            var h = r.minicopy.HF_TAG_OK;
            if (l || (h = r.minicopy.LF_TAG_OK), p.status != h) {
                if (new Date().getTime() - T > e) return t.setTagInformation(null), s = !0, void _();
                l ? (l = !1, n("LF"), i.getReader(!1).requestOnce410FieldScan(3e3, u)) : (l = !0, 
                n("HF"), i.getReader(!1).requestOnce14AFieldScan(3e3, u));
            } else {
                var A = function(e) {
                    t.setTagInformation(e), s = !0, a(e);
                };
                l ? f(p, A) : g(p, A);
            }
        });
    },
    stopLoopCardScanner: function(e) {
        if (c) {
            c = !1;
            var t = setInterval(function() {
                s || 0 == o.hasDeviceConnected() ? (clearInterval(t), e()) : console.log("正在等待自动扫描标签的过程停止......");
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
    startReadTagAllData: z,
    startWriteCardDatas: function(e) {
        if (u.length = 0, null == t.getTagInformation().tag_type) throw "开发者没有使用 startLoopTagScanner 进行寻卡吗？没有寻到卡为什么调用了写卡操作！";
        var n = j[t.getTagInformation().tag_type];
        if (null == n) throw "开发者没有判断 readable 变量吗？为什么对不支持写卡的标签调用了写卡操作！";
        n(e);
    },
    startWipeTagAllData: function(e) {
        if (u.length = 0, null == t.getTagInformation().tag_type) throw "开发者没有使用 startLoopTagScanner 进行寻卡吗？没有寻到卡为什么调用了清空操作！";
        var n = X[t.getTagInformation().tag_type];
        if (null == n) throw "开发者没有判断 readable 变量吗？为什么对不支持清空卡的标签调用了清空操作！";
        n(e);
    },
    getWriteBlocks4Fail: function() {
        return l;
    },
    getOpFailExtendCode: function() {
        return u;
    },
    startWrite14ATagUID: function(n) {
        n(0);
        var a = function(a) {
            var o = C();
            if (console.log("将被写入0扇区0块的UID数据：" + e.bytes2hex(o)), a.tag_type == t.TAG_TYPE_MF1_GEN1A) Y(a) ? i.getReader(!0).requestWRBLOnceGen1ATag(0, o, 3e3, function(e) {
                n(100);
            }) : i.throwTagErrorEvent(r.miniapp.CONTAINER_TAG_SIZE_ERR); else if (a.tag_type == t.TAG_TYPE_MF1_GDM) Y(a) ? i.getReader(!1).requestWRBLOnceMFGDMTag(0, o, 3e3, function(e) {
                e.status == r.minicopy.HF_TAG_OK ? n(100) : e.status == r.minicopy.HF_ERRSTAT ? i.throwTagErrorEvent(r.miniapp.STDMF_UID_WRITE_FAILED) : i.throwTagErrorEvent(e.status);
            }) : i.throwTagErrorEvent(r.miniapp.CONTAINER_TAG_SIZE_ERR); else if (a.tag_type == t.TAG_TYPE_MF1_STDWK || a.tag_type == t.TAG_TYPE_MF1_STDST || a.tag_type == t.TAG_TYPE_MF1_STDHD || a.tag_type == t.TAG_TYPE_MF1_RF08S) if (Y(a)) {
                var c = [ [ 255, 255, 255, 255, 255, 255 ], [ 255, 255, 255, 255, 255, 255 ] ];
                !function(e, t, n, a) {
                    i.getReader(!0).requestAuthMF1KnownKeys([ e, t ], 3e3, function(o) {
                        var c = 1 & o.data[0], s = o.data[0] >> 1 & 1;
                        c || s ? se(0, 96, e, n, a, function() {
                            se(0, 97, t, n, a, function() {
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
        var n = N(), o = n.length;
        l.length = 0, function r(i) {
            if (!(i >= o)) {
                var c = n[i], s = a.mifare_block_2_sector(i), _ = t.getMifareCardKeys()[parseInt(2 * s)], u = t.getMifareCardKeys()[parseInt(2 * s + 1)];
                !function(e, t, n, a, o, r) {
                    var i = [ 255, 255, 255, 255, 255, 255 ];
                    !function c(s) {
                        s >= 5 ? r() : _e(e, i, i, a, o, function() {
                            _e(e, t, n, a, o, function() {
                                c(++s);
                            });
                        });
                    }(0);
                }(i, _, u, c, function() {
                    e((i += 1) / o * 100), r(i);
                }, function() {
                    l.push(i), e((i += 1) / o * 100), r(i);
                });
            }
        }(1);
    },
    startUplockUFUIDTag: le,
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
        if ("string" == typeof e) return Q(e);
        if (Array.isArray(e)) {
            for (var t = !0, n = 0; n < e.length; n++) 0 == Q(e[n]) && (console.log("有一个删除DUMP信息的任务失败了，其UUID是: " + e[n]), 
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
        return V();
    },
    getCardDataDumpInfo: te,
    loadJson2DataBuffer: oe,
    loadFile2DataBuffer: function(e) {
        var t = te(e);
        return null == t ? (console.log("loadFile2DataBuffer 无法加载指定的DUMP信息: " + e), !1) : oe(t);
    },
    createDumpInfoJsonFromMem: ee
};