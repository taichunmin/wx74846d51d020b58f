/*! crc32.js (C) 2014-present SheetJS -- http://sheetjs.com */ module.exports = new function() {
    this.version = "1.2.3";
    var r = function() {
        for (var r = 0, n = new Array(256), t = 0; 256 != t; ++t) r = 1 & (r = 1 & (r = 1 & (r = 1 & (r = 1 & (r = 1 & (r = 1 & (r = 1 & (r = t) ? -306674912 ^ r >>> 1 : r >>> 1) ? -306674912 ^ r >>> 1 : r >>> 1) ? -306674912 ^ r >>> 1 : r >>> 1) ? -306674912 ^ r >>> 1 : r >>> 1) ? -306674912 ^ r >>> 1 : r >>> 1) ? -306674912 ^ r >>> 1 : r >>> 1) ? -306674912 ^ r >>> 1 : r >>> 1) ? -306674912 ^ r >>> 1 : r >>> 1, 
        n[t] = r;
        return "undefined" != typeof Int32Array ? new Int32Array(n) : n;
    }(), n = function(r) {
        var n = 0, t = 0, e = 0, o = "undefined" != typeof Int32Array ? new Int32Array(4096) : new Array(4096);
        for (e = 0; 256 != e; ++e) o[e] = r[e];
        for (e = 0; 256 != e; ++e) for (t = r[e], n = 256 + e; n < 4096; n += 256) t = o[n] = t >>> 8 ^ r[255 & t];
        var f = [];
        for (e = 1; 16 != e; ++e) f[e - 1] = "undefined" != typeof Int32Array ? o.subarray(256 * e, 256 * e + 256) : o.slice(256 * e, 256 * e + 256);
        return f;
    }(r), t = n[0], e = n[1], o = n[2], f = n[3], a = n[4], i = n[5], u = n[6], h = n[7], d = n[8], s = n[9], c = n[10], v = n[11], y = n[12], A = n[13], l = n[14];
    this.table = r, this.bstr = function(n, t) {
        for (var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, o = -1 ^ t, f = e, a = n.length; f < a; ) o = o >>> 8 ^ r[255 & (o ^ n.charCodeAt(f++))];
        return ~o;
    }, this.buf = function(n, g) {
        for (var w = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, I = -1 ^ g, b = n.length - 15, p = w; p < b; ) I = l[n[p++] ^ 255 & I] ^ A[n[p++] ^ I >> 8 & 255] ^ y[n[p++] ^ I >> 16 & 255] ^ v[n[p++] ^ I >>> 24] ^ c[n[p++]] ^ s[n[p++]] ^ d[n[p++]] ^ h[n[p++]] ^ u[n[p++]] ^ i[n[p++]] ^ a[n[p++]] ^ f[n[p++]] ^ o[n[p++]] ^ e[n[p++]] ^ t[n[p++]] ^ r[n[p++]];
        for (b += 15; p < b; ) I = I >>> 8 ^ r[255 & (I ^ n[p++])];
        return ~I;
    }, this.str = function(n, t) {
        for (var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, o = -1 ^ t, f = e, a = n.length, i = 0, u = 0; f < a; ) (i = n.charCodeAt(f++)) < 128 ? o = o >>> 8 ^ r[255 & (o ^ i)] : i < 2048 ? o = (o = o >>> 8 ^ r[255 & (o ^ (192 | i >> 6 & 31))]) >>> 8 ^ r[255 & (o ^ (128 | 63 & i))] : i >= 55296 && i < 57344 ? (i = 64 + (1023 & i), 
        u = 1023 & n.charCodeAt(f++), o = (o = (o = (o = o >>> 8 ^ r[255 & (o ^ (240 | i >> 8 & 7))]) >>> 8 ^ r[255 & (o ^ (128 | i >> 2 & 63))]) >>> 8 ^ r[255 & (o ^ (128 | u >> 6 & 15 | (3 & i) << 4))]) >>> 8 ^ r[255 & (o ^ (128 | 63 & u))]) : o = (o = (o = o >>> 8 ^ r[255 & (o ^ (224 | i >> 12 & 15))]) >>> 8 ^ r[255 & (o ^ (128 | i >> 6 & 63))]) >>> 8 ^ r[255 & (o ^ (128 | 63 & i))];
        return ~o;
    };
}();