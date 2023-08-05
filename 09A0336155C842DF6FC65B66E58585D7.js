var e = require("8E76785255C842DFE810105557B585D7.js"), n = require("A3859AB555C842DFC5E3F2B2FA5585D7.js"), o = null, r = null, t = null, l = null;

function c(o) {
    try {
        var r = JSON.parse(o);
        switch (r.code) {
          case 0:
            var c = r.result;
            "key" in c && function(o) {
                switch (o) {
                  case "err_save_nonces":
                  case "err_decrypt_known":
                    n.throwTagErrorEvent(e.miniapp.DECRYPTOR_COMPUTER_ERROR);
                    break;

                  case "err_decrypt_timeout":
                  case "err_decrypt_no_key":
                  default:
                    /[a-fA-F0-9]{12}/.test(o) ? t(o) : t(null);
                }
                t = null, console.log("排队解密的结果有更新: " + o);
            }(c.key), "position" in c && (i = c.position, "function" == typeof l && l(parseInt(i)), 
            console.log("排队解密的位置有更新: " + i));
            break;

          case 1:
          case 7:
          case 8:
            var a;
            t = null, 1 == r.code && (a = "开发者调用HARD计算接口时传输的参数有误！"), 7 == r.code && (a = "HARD计算机离线，请联系管理员处理此异常情况！"), 
            8 == r.code && (a = "MP服务器出现错误，请联系管理员处理此异常情况！"), s = a, wx.showModal({
                title: "无法自动解决的硬性错误！",
                showCancel: !1,
                content: s
            });
        }
    } catch (e) {
        e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
        console.log("无法将解密服务器应答的消息转换为对象: " + JSON.stringify(e));
    }
    var s, i;
}

function a() {
    t = null, clearInterval(r), r = null;
}

function s() {
    null != t ? null != o ? console.log("WS自动释放定时器检测到当前存在解密任务，短时间内将不会关闭链接！") : a() : (null != o && o.close({
        reason: "<tag-attack.js>模块检测到长时间不需要解密，为了缓解服务器压力自动释放了WS链接。"
    }), a());
}

function i(r) {
    if (null == o) {
        var t = n.getSerial(), l = "".concat("wss://rcopy.nikola-lab.cn/server1/websocket/hardnested/decrypt", "?serial=").concat(t);
        (o = wx.connectSocket({
            url: l,
            timeout: 2e3,
            success: function(e) {
                console.log("打开WS成功" + JSON.stringify(e));
            },
            fail: function(e) {
                console.error("打开WS失败" + JSON.stringify(e)), o = null;
            }
        })).onOpen(function(e) {
            console.log("链接WS完成：" + JSON.stringify(e)), "function" == typeof r && r();
        }), o.onClose(function(r) {
            console.log("WS链接关闭：" + JSON.stringify(r)), a(), o = null, 1e3 != r.code && n.throwTagErrorEvent(e.miniapp.DECRYPTOR_SERVER_ERROR);
        }), o.onError(function(r) {
            console.error("WS链接异常：" + JSON.stringify(r)), o = null, a();
            var t = function(e) {
                if ("errMsg" in e) try {
                    var n = e.errMsg;
                    return {
                        code: parseInt(n.match(/code:\s*(\d+),/)[1]),
                        msg: n.match(/msg:\s*(.*)/)
                    };
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    console.error("解析解密时WS交互错误应答体失败: " + e);
                }
                return null;
            }(r);
            null != t && 20 == t.code ? n.throwTagErrorEvent(e.miniapp.DEVICE_PIRATED_HARDWARE) : n.throwTagErrorEvent(e.miniapp.DECRYPTOR_SERVER_ERROR);
        }), o.onMessage(function(e) {
            c(e.data);
        });
    } else r();
}

module.exports = {
    TASK_NAME_HARDNESTED: "hardnested",
    requestDecryptWaitCall: function(e, n) {
        null != r && (clearInterval(r), r = null), i(function() {
            var l = {
                nonces: wx.arrayBufferToBase64(e)
            };
            null != o ? (t = n, o.send({
                data: JSON.stringify(l)
            }), r = setInterval(s, 2e4)) : console.log("与解密服务器的WS链接不存在，无法发起解密任务！");
        });
    },
    setOnQueueUpUpdatedCbk: function(e) {
        if (null != l) throw "HardNested排队解密的回调只允许注册一次，SDK开发者当初设定的是由 `tag-attack.js` 模块接管此回调，请使用 `tag-attack.js` 注册监听排队事件！";
        l = e;
    }
};