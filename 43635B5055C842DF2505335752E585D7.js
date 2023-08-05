var F = require("306D78F255C842DF560B10F52E4585D7.js"), T = {
    tag_type: null
}, e = [ [] ], t = [ [] ];

module.exports = {
    TAG_TYPE_HF_14443A: "14443A",
    TAG_TYPE_LF_EM410X: "EM410x",
    TAG_TYPE_MF1_MAYBE: "Mf1NTMaybe",
    TAG_TYPE_MF1_STDWK: "Mf1StdNTWK",
    TAG_TYPE_MF1_STDST: "Mf1StdNTST",
    TAG_TYPE_MF1_STDHD: "Mf1StdNTHD",
    TAG_TYPE_MF1_GEN1A: "Mf1Gen1ABD",
    TAG_TYPE_MF1_GDM: "Mf1GDM",
    TAG_MF1_DEFAULT_DATA: "00000000000000000000000000000000",
    TAG_MF1_DEFAULT_TRAI: "FFFFFFFFFFFFFF078069FFFFFFFFFFFF",
    getTagInformation: function() {
        return T;
    },
    setTagInformation: function(F) {
        T = F;
    },
    getMifareTagDatas: function() {
        return e;
    },
    setMifareTagDatas: function(F) {
        e = F;
    },
    getMifareCardKeys: function() {
        return t;
    },
    getMifareKeysMap: function() {
        for (var T = {}, e = 0, _ = 0; e < t.length; e += 2, _++) {
            var n = null != t[e] ? F.bytes2hex(t[e]) : null, M = null != t[e + 1] ? F.bytes2hex(t[e + 1]) : null;
            T[_] = {
                keya: n,
                keyb: M
            };
        }
        return T;
    },
    setMifareCardKeys: function(F) {
        t = F;
    }
};