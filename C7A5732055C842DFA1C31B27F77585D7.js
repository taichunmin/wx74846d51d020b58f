var e = require("8E76785255C842DFE810105557B585D7.js"), n = require("306D78F255C842DF560B10F52E4585D7.js"), t = require("A3859AB555C842DFC5E3F2B2FA5585D7.js"), o = null, a = null, r = null, s = {};

function c(n) {
    try {
        var o = JSON.parse(n);
        switch (o.code) {
          case 0:
            var a = o.result;
            if (a.task_uid in s) {
                var r = s[a.task_uid];
                switch (delete s[a.task_uid], a.status) {
                  case "SUCCESS":
                  case "NESTED_NO_VALID_NONCES":
                    "function" == typeof r && r(a.keys);
                    break;

                  case "ERROR":
                    t.throwTagErrorEvent(e.miniapp.DECRYPTOR_COMPUTER_ERROR);
                    break;

                  case "REQUEST_CPU_MAX_EXCEED":
                    t.throwTagErrorEvent(e.miniapp.DECRYPTOR_TASK_CPU_MAX_EXCEED);
                    break;

                  default:
                    throw "解密计算机返回了不认识的状态: " + a.status;
                }
            } else console.log("没有找到可以处理解密结果的回调函数映射，该任务详情是: " + n);
            break;

          case 1:
          case 7:
          case 8:
            for (var c in s) delete s[c];
            var l;
            1 == o.code && (l = "开发者调用AI制卡接口时传输的参数有误！"), 7 == o.code && (l = "AI制卡计算机离线，请联系管理员处理此异常情况！"), 
            8 == o.code && (l = "MP服务器出现错误，请联系管理员处理此异常情况！"), function(e) {
                wx.showModal({
                    title: "无法自动解决的硬性错误！",
                    showCancel: !1,
                    content: e
                });
            }(l);
        }
    } catch (e) {
        e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
        console.log("无法将解密服务器应答的消息转换为对象: " + JSON.stringify(e));
    }
}

function l() {
    for (var e in s) delete s[e];
    clearInterval(a), a = null;
}

function i() {
    var e = Object.keys(s).length;
    e > 0 ? null != o ? (console.log("WS自动释放定时器检测到当前存在 ".concat(e, " 个解密任务，短时间内将不会关闭链接！")), 
    null == r && (console.log("开始ping服务器， 在".concat(2e3, " 毫秒后不pong就认为服务器死了。")), o.send({
        data: "ping"
    }), r = setTimeout(function() {
        r = null, o.close({
            code: 4044,
            reason: "<tag-attack.js>模块检测到ping服务器长时间不pong，默认服务器宕机。"
        });
    }, 2e3))) : l() : (null != o && o.close({
        reason: "<tag-attack.js>模块检测到长时间不需要解密，为了缓解服务器压力自动释放了WS链接。"
    }), l());
}

function u(n) {
    if (null == o) {
        var a = t.getSerial(), s = "".concat("wss://rcopy.nikola-lab.cn/server1/websocket/decrypt", "?serial=").concat(a);
        (o = wx.connectSocket({
            url: s,
            timeout: 2e3,
            success: function(e) {
                console.log("打开WS成功" + JSON.stringify(e));
            },
            fail: function(e) {
                console.error("打开WS失败" + JSON.stringify(e)), o = null;
            }
        })).onOpen(function(e) {
            console.log("链接WS完成：" + JSON.stringify(e)), "function" == typeof n && n();
        }), o.onClose(function(n) {
            console.log("WS链接关闭：" + JSON.stringify(n)), l(), o = null, 1e3 != n.code && t.throwTagErrorEvent(e.miniapp.DECRYPTOR_SERVER_ERROR);
        }), o.onError(function(n) {
            console.error("WS链接异常：" + JSON.stringify(n)), o = null, l();
            var a = function(e) {
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
            }(n);
            null != a && 20 == a.code ? t.throwTagErrorEvent(e.miniapp.DEVICE_PIRATED_HARDWARE) : t.throwTagErrorEvent(e.miniapp.DECRYPTOR_SERVER_ERROR);
        }), o.onMessage(function(e) {
            var n = e.data;
            switch (n) {
              case "pong":
                console.log("服务器pong了。"), clearTimeout(r), r = null;
                break;

              default:
                c(n);
            }
        });
    } else n();
}

module.exports = {
    TASK_NAME_DARKSIDE: "darkside",
    TASK_NAME_NESTED: "nested",
    TASK_NAME_STATICNESTED: "staticnested",
    TASK_NAME_NESTED2: "nested2",
    requestDecryptWaitCall: function(e, t, r) {
        null != a && (clearInterval(a), a = null), u(function() {
            switch (e) {
              case "darkside":
                e = "darkside_task";
                break;

              case "nested":
                e = "nested_task";
                break;

              case "staticnested":
                e = "static_nested_task";
                break;

              case "nested2":
                e = "nested2_task";
                break;

              default:
                throw "不支持的解密任务类型: " + e;
            }
            var c = n.generateUUID(), l = {
                task_name: e,
                task_uid: c,
                params: t
            };
            null != o ? (s[c] = r, o.send({
                data: JSON.stringify(l)
            }), a = setInterval(i, 5e3)) : console.log("与解密服务器的WS链接不存在，无法发起解密任务！");
        });
    }
};