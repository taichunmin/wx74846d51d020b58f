var t = require("8AD8F7C555C842DFECBE9FC26AA5D685.js");

module.exports = {
    TASK_NAME_RF08S_2X1NT: "rf08s_2x1nt",
    requestDecryptWaitCall: function(e, r, p, n) {
        var y = {
            uid: p.uid,
            keyA: r,
            block: e,
            cores: {
                typeA: {
                    nt1: p.typea.nt,
                    nt2: p.typea.nt_enc,
                    par: p.typea.par
                },
                typeB: {
                    nt1: p.typeb.nt,
                    nt2: p.typeb.nt_enc,
                    par: p.typeb.par
                }
            }
        };
        t.doDecrypt(t.url.URL_CREATE_DECRYPT_TASK_RF08S_2X1NT, y, n);
    }
};