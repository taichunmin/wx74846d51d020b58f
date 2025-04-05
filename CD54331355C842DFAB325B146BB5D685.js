var e = require("8AD8F7C555C842DFECBE9FC26AA5D685.js");

module.exports = {
    TASK_NAME_DARKSIDE: "darkside",
    TASK_NAME_NESTED: "nested",
    TASK_NAME_STATICNESTED: "staticnested",
    TASK_NAME_NESTED2: "nested2",
    requestDecryptWaitCall: function(E, T, _) {
        var t = "";
        switch (E) {
          case "darkside":
            t = e.url.URL_CREATE_DECRYPT_TASK_DARKSIDE;
            break;

          case "nested":
            t = e.url.URL_CREATE_DECRYPT_TASK_NESTED_RAW_RESP;
            break;

          case "staticnested":
            t = e.url.URL_CREATE_DECRYPT_TASK_NESTED_STATIC_FAST;
            break;

          case "nested2":
            throw "不支持NESTED2解密任务类型，minicopy对此类型兼容性较差，已弃用。";

          default:
            throw "不支持的解密任务类型: " + E;
        }
        e.doDecrypt(t, T, _);
    }
};