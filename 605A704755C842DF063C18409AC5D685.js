var t = require("8AD8F7C555C842DFECBE9FC26AA5D685.js"), e = null;

module.exports = {
    TASK_NAME_HARDNESTED: "hardnested",
    requestDecryptWaitCall: function(e, r) {
        t.doDecryptByFile(t.url.URL_CREATE_DECRYPT_TASK_NESTED_HARD_NONCE, e, r);
    },
    setOnQueueUpUpdatedCbk: function(t) {
        if (null != e) throw "HardNested排队解密的回调只允许注册一次，SDK开发者当初设定的是由 `tag-attack.js` 模块接管此回调，请使用 `tag-attack.js` 注册监听排队事件！";
        e = t;
    }
};