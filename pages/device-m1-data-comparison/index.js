var a = require("../../6B5F0E3755C842DF0D39663027C585D7.js"), t = require("../../306D78F255C842DF560B10F52E4585D7.js"), n = require("../../8462214255C842DFE2044945663685D7.js"), l = require("../../2335D01055C842DF4553B817299585D7.js"), o = null, e = null, i = null, r = null;

Page({
    data: {
        baseList: [],
        nick1: "",
        nick2: "",
        blockCount: ""
    },
    getDataHexArray: function(a) {
        if (null == a || null == a) return null;
        if (0 == a.length) return null;
        var n = [];
        return a.forEach(function(a) {
            var l = t.bytes2hex(a);
            n.push(l);
        }), n;
    },
    loadData: function() {
        var a = null, t = null;
        "local" == n.cloudOrLocal() ? (a = i, t = r) : (a = o, t = e);
        for (var u = this.getDataHexArray(a), s = this.getDataHexArray(t), c = [], d = [], g = 0; g < u.length; g++) {
            var f = u[g], p = s[g], h = g, D = l.mifare_block_2_sector(h), k = "", v = "", y = !0;
            f !== p && d.push(h);
            for (var b = 0; b < f.length; b++) {
                var m = f[b], _ = p[b];
                m != _ ? (k += '<span style="background: red;">'.concat(m, "</span>"), v += '<span style="background: red;">'.concat(_, "</span>"), 
                y = !1) : (k += m, v += _);
            }
            var C = '<span style="color: #f5a200;">1：</span>' + k, q = "<span>2：</span>" + v;
            c.push({
                sector: D,
                block: h,
                data: [ C, q ],
                same: y
            });
        }
        console.log("块的数据是" + d), this.setData({
            baseList: c,
            blockCount: d.length
        });
    },
    onLoad: function(t) {
        console.log("数据对比的options是" + JSON.stringify(t));
        var l = t.uuid1, u = t.uuid2;
        if ("local" == n.cloudOrLocal()) {
            var s = a.getStorageSyncHasDefault("dump_nicks", {});
            this.setData({
                nick1: s[l],
                nick2: s[u]
            }), i = a.getCardDataDumpInfo(l).tag_data, r = a.getCardDataDumpInfo(u).tag_data, 
            this.loadData();
        } else {
            if (0 == n.isLogin()) wx.showModal({
                title: "系统提示",
                content: "是否选择登录？",
                success: function(a) {
                    a.confirm && (console.log("用户点击确定"), wx.navigateTo({
                        url: "/pages/user-login-onekey/login"
                    }));
                }
            }); else {
                var c = this;
                n.getTheCloudData(function(a) {
                    for (var t = null, n = null, o = 0; o < a.length; o++) a[o].uuid == l && (t = a[o].nick), 
                    a[o].uuid == u && (n = a[o].nick);
                    c.setData({
                        nick1: t,
                        nick2: n
                    });
                });
                c = this;
                n.queryCloudData(l, function(a) {
                    console.log("数据对比云端数据data" + JSON.stringify(a)), o = a.data.data[0].data.tag_data, 
                    n.queryCloudData(u, function(a) {
                        console.log("数据对比云端数据data" + JSON.stringify(a)), e = a.data.data[0].data.tag_data, 
                        c.loadData();
                    });
                });
            }
        }
    }
});