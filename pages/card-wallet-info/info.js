var a = require("../../AB5D946455C842DFCD3BFC63A316D685.js"), t = require("../../614DB8F055C842DF072BD0F70136D685.js"), e = require("../../D6EF5C7155C842DFB08934760C65D685.js"), i = require("../../76F8096255C842DF109E616502B6D685.js"), o = require("../../AC1F69C355C842DFCA7901C4DB75D685.js");

Page({
    data: {
        btnList: [ {
            title: "修改数据",
            value: "",
            bindtap: "onDataEditCall"
        }, {
            title: "复制数据",
            value: "",
            bindtap: "onDataCopyCall"
        }, {
            title: "分享数据",
            value: "",
            bindtap: "onDataShareCall"
        }, {
            title: "数据分析",
            value: "",
            bindtap: "onDataAnalysisCall"
        }, {
            title: "删除卡片",
            value: "",
            bindtap: "onDataDumpDelCall"
        } ],
        nameEditor: {
            showNameEditor: !1,
            defaultName: ""
        }
    },
    onDataEditCall: function() {
        wx.navigateTo({
            url: "/pages/device-master-mode/index?" + "uuid=".concat(this.uuid)
        });
    },
    getTagDataFromMifareTag: function() {
        for (var a = "", t = 0; t < this.dumpinfo.tag_data.length; t++) a += "".concat(o.bytes2hex(this.dumpinfo.tag_data[t]), "\n");
        return a;
    },
    getTagDataFromEm410xTag: function() {
        return this.dumpinfo.tag_info.uid_hex;
    },
    onDataCopyCall: function() {
        var a = null;
        switch (this.dumpinfo.tag_info.tag_type) {
          case t.TAG_TYPE_HF_14443A:
            break;

          case t.TAG_TYPE_MF1_GEN1A:
          case t.TAG_TYPE_MF1_MAYBE:
          case t.TAG_TYPE_MF1_STDHD:
          case t.TAG_TYPE_MF1_STDST:
          case t.TAG_TYPE_MF1_STDWK:
          case t.TAG_TYPE_MF1_GDM:
            a = this.getTagDataFromMifareTag();
            break;

          case t.TAG_TYPE_LF_EM410X:
            a = this.getTagDataFromEm410xTag();
        }
        null != a ? wx.setClipboardData({
            data: a,
            success: function(a) {
                i.showToast("数据复制成功");
            }
        }) : i.showToast("无数据可复制");
    },
    onDataDumpDelCall: function() {
        var t = this;
        wx.showModal({
            content: "是否确认删除此卡片",
            success: function(e) {
                if (e.confirm) if ("local" == (e = i.cloudOrLocal())) {
                    var o = t.uuid;
                    a.deleteDumpFilesByID(o);
                    var n = a.getStorageSyncHasDefault("dump_nicks", {});
                    delete n[o], wx.setStorageSync("dump_nicks", n);
                    var s = a.getStorageSyncHasDefault("folderData", {});
                    delete s[o], wx.setStorageSync("folderData", s), wx.navigateBack();
                } else i.deleteCardData(t.uuid, function(a) {
                    1 == a.data ? (i.showToast("删除成功！"), wx.navigateBack()) : i.showToast("删除失败！");
                });
            }
        });
    },
    isConnected: function() {
        e.hasDeviceConnected() ? 1 == a.getStorageSyncHasDefault("turnOnExpertMode", {}) ? wx.navigateTo({
            url: "/pages/device-master-mode/index?" + "uuid=".concat(this.uuid)
        }) : wx.navigateTo({
            url: "/pages/device-card-write-ready/write"
        }) : i.showToast("设备没有连接");
    },
    onUserGotoWriteTagCall: function() {
        var t = this;
        if (i.isLogin()) {
            var e = t.uuid;
            "local" == i.cloudOrLocal() ? a.loadFile2DataBuffer(e) ? t.isConnected() : i.showToast("加载数据失败") : i.queryCloudData(e, function(e) {
                a.loadJson2DataBuffer(e.data.data[0].data), t.isConnected();
            });
        } else wx.navigateTo({
            url: "/pages/user-login-onekey/login"
        });
    },
    onDataShareCall: function() {
        i.gotoCreateShareOrLogin(this.data.taginfo.nick, this.dumpinfo);
    },
    onDataAnalysisCall: function() {
        i.showToast("正在开发中");
    },
    onUserEditNameCall: function() {
        this.data.nameEditor.showNameEditor = !0, this.data.nameEditor.defaultName = this.data.taginfo.nick, 
        this.setData({
            nameEditor: this.data.nameEditor
        });
    },
    dissmissNameEditorDialog: function() {
        this.data.nameEditor.showNameEditor = !1, this.setData({
            nameEditor: this.data.nameEditor
        });
    },
    onUserCancelNameEdit: function() {
        this.dissmissNameEditorDialog();
    },
    onUserConfirmNameEdit: function(t) {
        var e = i.cloudOrLocal();
        if ("local" == e) {
            var o = a.getStorageSyncHasDefault("dump_nicks", {});
            o[this.uuid] = t.detail.dumpName, wx.setStorageSync("dump_nicks", o), this.dissmissNameEditorDialog(), 
            this.data.taginfo.nick = t.detail.dumpName, this.setData({
                taginfo: this.data.taginfo
            }), i.showToast("修改成功！");
        }
        if ("cloud" == e) {
            var n = this;
            if (n.data.taginfo.nick == t.detail.dumpName) return void n.dissmissNameEditorDialog();
            i.getTheCloudData(function(a) {
                for (var e = 0; e < a.length; e++) a[e].uuid == n.uuid && i.upCloudNick(n.uuid, t.detail.dumpName, function(a) {
                    1 == a.data.status ? (n.data.taginfo.nick = t.detail.dumpName, n.setData({
                        taginfo: n.data.taginfo
                    }), i.showToast(a.data.msg), n.dissmissNameEditorDialog()) : i.showToast(a.data.msg);
                });
            });
        }
    },
    dateFormat: function(a) {
        var t = new Date(a);
        return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
    },
    createInfoDetail: function(a) {
        var e = [];
        switch (a.tag_type) {
          case t.TAG_TYPE_HF_14443A:
            break;

          case t.TAG_TYPE_MF1_GEN1A:
          case t.TAG_TYPE_MF1_MAYBE:
          case t.TAG_TYPE_MF1_STDHD:
          case t.TAG_TYPE_MF1_STDST:
          case t.TAG_TYPE_MF1_STDWK:
          case t.TAG_TYPE_MF1_GDM:
            e.push("类型: IC卡"), e.push("UID: ".concat(a.uid_hex)), e.push("SAK: ".concat(a.sak_hex, " ATQA: ").concat(a.atqa_hex)), 
            "ats_hex" in a && e.push("ATS: ".concat(a.ats_hex));
            break;

          case t.TAG_TYPE_LF_EM410X:
            e.push("类型: ID卡"), e.push("卡号: ".concat(a.uid_hex));
        }
        return e.push("创建时间: ".concat(this.dateFormat(this.dumpinfo.tag_date))), e;
    },
    createInfoStyle: function(a) {
        switch (a.tag_type) {
          case t.TAG_TYPE_HF_14443A:
            break;

          case t.TAG_TYPE_MF1_GEN1A:
          case t.TAG_TYPE_MF1_MAYBE:
          case t.TAG_TYPE_MF1_STDHD:
          case t.TAG_TYPE_MF1_STDST:
          case t.TAG_TYPE_MF1_STDWK:
          case t.TAG_TYPE_MF1_GDM:
            return "bg-tag-info-type-ic";

          case t.TAG_TYPE_LF_EM410X:
            return "bg-tag-info-type-id";
        }
        return "";
    },
    onLoad: function(a) {
        this.uuid = a.id, console.log("卡包详情页接收到的DUMP序号是: " + this.uuid);
    },
    onShow: function() {
        if ("local" == i.cloudOrLocal()) {
            this.dumpinfo = a.getCardDataDumpInfo(this.uuid);
            var t = a.getStorageSyncHasDefault("dump_nicks", {}), e = this.dumpinfo.tag_info;
            this.setData({
                taginfo: {
                    nick: t[this.uuid],
                    style: this.createInfoStyle(e),
                    detail: this.createInfoDetail(e)
                }
            });
        } else {
            var o = this;
            i.getTheCloudData(function(a) {
                for (var t = 0; t < a.length; t++) a[t].uuid == o.uuid && (o.dumpinfo = a[t], o.setData({
                    taginfo: {
                        nick: a[t].nick,
                        style: o.createInfoStyle(a[t].tag_info),
                        detail: o.createInfoDetail(a[t].tag_info)
                    }
                }));
            });
        }
    }
});