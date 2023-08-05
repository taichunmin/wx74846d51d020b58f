function r(r) {
    return r < 32 ? parseInt(4 * r) : parseInt(128 + 16 * (r - 32));
}

function t(r) {
    return parseInt(r) < 32 ? 4 : 16;
}

module.exports = {
    mifare_block_2_sector: function(r) {
        return r < 128 ? parseInt(r / 4) : parseInt(32 + (r - 128) / 16);
    },
    mifare_sector_2_block: r,
    mifare_to_trail_block: function(r) {
        var t;
        return t = r < 128 ? r + (3 - r % 4) : r + (15 - r % 16), parseInt(t);
    },
    mifare_blks_count_sec: t,
    mifare_blks_count_all: function(r) {
        if (0 == (r = parseInt(r))) throw "sec_count 不可以为0";
        if (r <= 32) return parseInt(4 * r);
        if (r > 32 && 40 == r) return 256;
        throw "不支持的secmax: " + r;
    },
    mifare_secs_count_all: function(r) {
        if (0 == (r = parseInt(r))) throw "blk_count 不可以为0";
        if (r <= 128) return parseInt(r / 4);
        if (r > 128 && 256 == r) return 40;
        throw "不支持的blk_count: " + r;
    },
    mifare_is_first_block: function(r) {
        return r < 128 ? r % 4 == 0 : r % 16 == 0;
    },
    mifare_is_trailer_blk: function(r) {
        return r < 128 ? (r + 1) % 4 == 0 : (r + 1) % 16 == 0;
    },
    mifare_secblk_2_index: function(n, e) {
        var i = 0, _ = t(e), o = r(e);
        if (n > o + _ - 1 || n < o) return -1;
        for (var u = 0; u < _ && n != u + o; u++) ++i;
        return i;
    }
};