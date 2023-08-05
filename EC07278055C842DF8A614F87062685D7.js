var r = require("306D78F255C842DF560B10F52E4585D7.js");

function n(r) {
    if (r instanceof Array || r instanceof ArrayBuffer || r instanceof Uint8Array) return new Uint8Array(r);
    throw "请开发者一定要传入 Array, ArrayBuffer, Uint8Array";
}

function e(r) {
    r = n(r);
    for (var e = 0; e < r.length; e++) {
        var t = r[e];
        if (!(t >= 65 && t <= 70) && !(t >= 97 && t <= 102 || t >= 48 && t <= 57 || 13 === t || 10 === t)) return !1;
    }
    return !0;
}

function t(r) {
    for (var n = "", e = 0; e < r.length; e++) n += String.fromCharCode(r[e]);
    return decodeURIComponent(escape(n));
}

function a(r) {
    var e = t(r = n(r));
    return JSON.parse(e);
}

function u(r) {
    try {
        var n = a(r);
        return null != n && ("tag_info" in n && "tag_data" in n && "tag_date" in n);
    } catch (r) {
        r = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(r);
        return console.log("检测dump数据是否为json时发生异常，此数据可能不是json格式的：".concat(r)), !1;
    }
}

function o(r) {
    switch ((r = n(r)).length) {
      case 320:
      case 1024:
      case 2048:
      case 4096:
        return !0;
    }
    return !1;
}

module.exports = {
    isHexTextInBuffer: e,
    isJsonTextInBuffer: u,
    isBinDataInBuffer: o,
    getJsonFromBuffer: a,
    checkDumpInBuffer: function(r) {
        try {
            if (u(r)) return "json";
            if (e(r)) return "hex";
            if (o(r)) return "bin";
        } catch (r) {
            r = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(r);
            console.error("检测Dump格式时出现异常: " + r);
        }
        return "unknown";
    },
    hexTextToBinary: function(e) {
        var a = t(e = n(e));
        return a = (a = a.replaceAll("\r", "")).replaceAll("\n", ""), r.hex2bytes(a, 0, a.length);
    },
    is0BlockBCCValid: function(r) {
        return (r = n(r))[4] === (r[0] ^ r[1] ^ r[2] ^ r[3]);
    },
    createTagInfoObj: function(r, n, e, t) {
        return {
            tag_type: "Mf1StdNTWK",
            uid_hex: r,
            sak_hex: n,
            atqa_hex: e,
            readable: !0,
            max_block: t
        };
    },
    createTagDumpObj: function(e, t, a) {
        return t = n(t), {
            tag_info: e,
            tag_data: r.chunkArray(t, 16),
            tag_date: Number.isInteger(a) ? a : new Date().getTime()
        };
    }
};