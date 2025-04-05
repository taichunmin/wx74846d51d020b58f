var e = require("8896821655C842DFEEF0EA119506D685.js"), t = require("DFE4D8E455C842DFB982B0E32585D685.js"), n = require("AC1F69C355C842DFCA7901C4DB75D685.js"), r = "https://rcopy.nikola-lab.cn/server2", o = "".concat(r, "/thinkphp/public/index.php/api/Decrypt2/requestDecryptInfo"), i = "".concat(r, "/thinkphp/public/index.php/api/Decrypt2/downloadDecrptFile"), a = "".concat(r, "/thinkphp/public/index.php/api/Decrypt2/requestCreateRf08s"), c = "".concat(r, "/thinkphp/public/index.php/api/Decrypt2/requestCreateNestedStaticFast"), s = "".concat(r, "/thinkphp/public/index.php/api/Decrypt2/requestCreateNestedRawResponse"), p = "".concat(r, "/thinkphp/public/index.php/api/Decrypt2/requestCreateNestedHardNonce"), E = "".concat(r, "/thinkphp/public/index.php/api/Decrypt2/requestCreateDarkside");

function u(e, t, n) {
    var r = wx.getRealtimeLogManager();
    r.setFilterMsg("DecryptOnCloudLog"), null != t && null != t || (t = "无数据"), Array.isArray(t) && t.length > 1024 && (t = "数据是数组且内容太大，无法在日志中展示");
    var o = "数据太大，无法展示，可能是ThinkPHP的网页返回";
    n.data.length < 1024 && (o = n.data);
    var i = "请求 ".concat(e, " 失败，HTTP状态码为 ").concat(n.statusCode, "，请求的数据为 ").concat(JSON.stringify(t), "，返回的数据为 ").concat(o);
    r.error(i);
}

function l(e) {
    return "token已经过期" == e;
}

function R(n, r, o, i) {
    wx.request({
        method: n,
        url: r,
        data: o,
        responseType: "text",
        dataType: "其他",
        fail: function(n) {
            console.log(n), t.throwTagErrorEvent(e.miniapp.DECRYPTOR_SERVER_ERROR);
        },
        success: function(n) {
            if (l(n.data)) t.throwTagErrorEvent(e.miniapp.MP_TOKEN_INVALID); else if (200 == n.statusCode) try {
                i(JSON.parse(n.data));
            } catch (e) {
                e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                i(n.data);
            } else t.throwTagErrorEvent(e.miniapp.DECRYPTOR_SERVER_API_ERROR_NOT200), u(r, o, n);
        }
    });
}

function f(r, a) {
    !function(e, t) {
        !function n() {
            R("GET", o, {
                uuid: e
            }, function(e) {
                if (e.finish) if (console.log("解密完成，任务信息：".concat(JSON.stringify(e))), null == e.keysOrLink) t(null); else try {
                    t(JSON.parse(e.keysOrLink));
                } catch (n) {
                    n = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(n);
                    t(e.keysOrLink);
                } else setTimeout(n, 500);
            });
        }();
    }(r, function(o) {
        if (null == o) a([]); else if ("string" == typeof o) {
            var c = [];
            o.split(",").forEach(function(e) {
                12 == e.length && c.push(n.hex2bytes(e));
            }), console.log("少量密钥，转换为二维bytes数组成功", c), a(c);
        } else s = r, p = function(e) {
            0 == e.length ? a([]) : a(n.chunkArray(e, 6));
        }, wx.request({
            method: "GET",
            url: i,
            responseType: "arraybuffer",
            data: {
                uuid: s
            },
            fail: function(n) {
                console.log(n), t.throwTagErrorEvent(e.miniapp.DECRYPTOR_SERVER_ERROR);
            },
            success: function(r) {
                var o = new Uint8Array(r.data);
                l(n.utf8ToString(o)) ? t.throwTagErrorEvent(e.miniapp.MP_TOKEN_INVALID) : 200 == r.statusCode ? p(o) : (t.throwTagErrorEvent(e.miniapp.DECRYPTOR_SERVER_API_ERROR_NOT200), 
                u(i, s, r));
            }
        });
        var s, p;
    });
}

module.exports = {
    url: {
        URL_CREATE_DECRYPT_TASK_RF08S_2X1NT: a,
        URL_CREATE_DECRYPT_TASK_NESTED_STATIC_FAST: c,
        URL_CREATE_DECRYPT_TASK_NESTED_RAW_RESP: s,
        URL_CREATE_DECRYPT_TASK_NESTED_HARD_NONCE: p,
        URL_CREATE_DECRYPT_TASK_DARKSIDE: E
    },
    doDecrypt: function(e, t, n) {
        R("POST", e, {
            data: t
        }, function(e) {
            f(e.uuid, n);
        });
    },
    doDecryptByFile: function(n, r, o) {
        var i = "".concat(wx.env.USER_DATA_PATH, "/hardnested_nonces.bin");
        console.log("开始写入文件");
        var a = wx.getFileSystemManager();
        a.open({
            filePath: i,
            flag: "w+",
            fail: function(n) {
                console.error(n), t.throwTagErrorEvent(e.miniapp.MP_SAVE_FILE_FAILED);
            },
            success: function(c) {
                a.write({
                    fd: c.fd,
                    data: new Uint8Array(r).buffer,
                    encoding: "binary",
                    offset: 0,
                    position: 0,
                    fail: function(n) {
                        console.error(n), a.closeSync({
                            fd: c.fd
                        }), t.throwTagErrorEvent(e.miniapp.MP_SAVE_FILE_FAILED);
                    },
                    success: function() {
                        a.closeSync({
                            fd: c.fd
                        }), console.log("文件写入完成，大小为 ".concat(r.length, ", 开始上传到云服务器进行解密")), wx.uploadFile({
                            url: n,
                            filePath: i,
                            name: "file",
                            formData: {},
                            fail: function(n) {
                                console.error(n), t.throwTagErrorEvent(e.miniapp.DECRYPTOR_SERVER_ERROR);
                            },
                            success: function(i) {
                                l(i.data) ? t.throwTagErrorEvent(e.miniapp.MP_TOKEN_INVALID) : 200 == i.statusCode ? (console.log("文件上传完成，开始等待云服务器进行解密"), 
                                f(JSON.parse(i.data).uuid, o)) : (t.throwTagErrorEvent(e.miniapp.DECRYPTOR_SERVER_API_ERROR_NOT200), 
                                u(n, r, i));
                            },
                            progressUpdate: function(e) {
                                e.progress > 0 && console.log("上传进度: " + e.progress + "%");
                            }
                        }).onProgressUpdate(function(e) {
                            console.log(JSON.stringify(e));
                        });
                    }
                });
            }
        });
    }
};