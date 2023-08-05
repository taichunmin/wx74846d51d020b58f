var t = require("8462214255C842DFE2044945663685D7.js");

App({
    autoProxyFN: function(t, e, o) {
        Object.defineProperty(t, e, {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            value: o(t[e])
        });
    },
    proxyNetworkRequestFN: function(e) {
        return function(o) {
            "formData" in o ? ("phone" in o.formData || (o.formData.phone = t.getPhone()), "token" in o.formData || (o.formData.token = t.obtain()), 
            "system_type" in o.formData || (o.formData.system_type = t.judgeSystemType())) : (null == o.data && (o.data = {}), 
            -1 != o.url.indexOf("/thinkphp") && (-1 == o.url.indexOf("/loginBy") && ("phone" in o.data || (o.data.phone = t.getPhone()), 
            "token" in o.data || (o.data.token = t.obtain())), "system_type" in o.data || (o.data.system_type = t.judgeSystemType()))), 
            e(o);
        };
    },
    proxyRouteFN: function(t) {
        return function(e) {
            var o = getCurrentPages(), n = o[o.length - 1];
            "function" == typeof n.beforeRouteChange && n.beforeRouteChange();
            var a = n.selectComponent("#backIntercept");
            null != a && "function" == typeof a.beforeRouteChange && a.beforeRouteChange(), 
            t(e);
        };
    },
    showWarnAndExit: function(t) {
        wx.showModal({
            title: "温馨提示",
            content: t,
            showCancel: !1,
            success: function() {
                wx.exitMiniProgram({
                    success: function() {
                        console.log("用户不愿意更新，强制退出小程序！");
                    }
                });
            }
        });
    },
    autoUpdate: function() {
        var t = this;
        if (wx.canIUse("getUpdateManager")) {
            var e = wx.getUpdateManager();
            e.onCheckForUpdate(function(o) {
                o.hasUpdate && wx.showModal({
                    title: "更新提示",
                    content: "检测到新版本，是否下载新版本并重启小程序？",
                    success: function(o) {
                        o.confirm ? t.downLoadAndUpdate(e) : o.cancel && t.showWarnAndExit("请更新后再使用哦~");
                    }
                });
            });
        } else wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    downLoadAndUpdate: function(t) {
        var e = this;
        wx.showLoading(), t.onUpdateReady(function() {
            wx.hideLoading(), t.applyUpdate();
        }), t.onUpdateFailed(function() {
            wx.hideLoading(), e.showWarnAndExit("新版本下载失败，请您删除当前小程序，重新搜索（或扫码）打开哟！");
        });
    },
    onLaunch: function() {
        this.autoProxyFN(wx, "switchTab", this.proxyRouteFN), this.autoProxyFN(wx, "reLaunch", this.proxyRouteFN), 
        this.autoProxyFN(wx, "redirectTo", this.proxyRouteFN), this.autoProxyFN(wx, "navigateTo", this.proxyRouteFN), 
        this.autoProxyFN(wx, "navigateBack", this.proxyRouteFN), this.autoProxyFN(wx, "request", this.proxyNetworkRequestFN), 
        this.autoProxyFN(wx, "uploadFile", this.proxyNetworkRequestFN);
        var e = wx.getSystemInfoSync();
        t.systemInfo.platform = e.platform, t.systemInfo.mpenv = e.host.env, "WeChat" == t.systemInfo.mpenv && this.autoUpdate();
    }
});