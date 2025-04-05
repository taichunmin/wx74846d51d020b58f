var F = require("AC1F69C355C842DFCA7901C4DB75D685.js"), T = {
    tag_type: null
}, e = [ [] ], _ = [ [] ];

module.exports = {
    TAG_TYPE_HF_14443A: "14443A",
    TAG_TYPE_LF_EM410X: "EM410x",
    TAG_TYPE_MF1_MAYBE: "Mf1NTMaybe",
    TAG_TYPE_MF1_STDWK: "Mf1StdNTWK",
    TAG_TYPE_MF1_STDST: "Mf1StdNTST",
    TAG_TYPE_MF1_STDHD: "Mf1StdNTHD",
    TAG_TYPE_MF1_GEN1A: "Mf1Gen1ABD",
    TAG_TYPE_MF1_GDM: "Mf1GDM",
    TAG_TYPE_MF1_RF08S: "RF08S",
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
        return _;
    },
    getMifareKeysMap: function() {
        for (var T = {}, e = 0, t = 0; e < _.length; e += 2, t++) {
            var n = null != _[e] ? F.bytes2hex(_[e]) : null, M = null != _[e + 1] ? F.bytes2hex(_[e + 1]) : null;
            T[t] = {
                keya: n,
                keyb: M
            };
        }
        return T;
    },
    setMifareCardKeys: function(F) {
        _ = F;
    }
};