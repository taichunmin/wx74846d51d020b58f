var t = require("../../8462214255C842DFE2044945663685D7.js");

Page({
    data: {
        type: "",
        uuid1: "",
        mode: "",
        dumpList: [],
        btnFunctionList: [ {
            icon: "icon-dump-manager-pc",
            titleMain: "电脑批量管理",
            titleSub: "在浏览器中打开链接，即可批量上传下载卡包中的卡片",
            click: "onOpenPCWebPageManagerClick"
        }, {
            icon: "icon-keys-manager",
            titleMain: "密码库管理",
            titleSub: "批量添加和删除密码库的密码",
            click: "onOpenPasswordManagerClick"
        }, {
            icon: "icon-import-dump",
            titleMain: "导入到卡包",
            titleSub: "导入微信聊天记录里的卡片数据文件或来自分享的卡片",
            click: "onDumpImportFromAnyWhereClick"
        } ],
        uuid: "",
        radioChecked: !1,
        dumpSearchFound: !0
    },
    turnBack: function() {
        wx.navigateBack();
    },
    loadData: function() {
        var a = this;
        t.getCardDataList(function(t) {
            for (var i = [], e = 0; e < t.length; e++) "IC" == a.data.type ? "IC" == t[e].type && i.push(t[e]) : "ID" == t[e].type && i.push(t[e]);
            a.setData({
                dumpList: i
            });
        });
    },
    onUserSearch: function(t) {
        var a = t.detail;
        "" == a && this.loadData();
        for (var i = this.data.dumpList, e = !1, d = 0; d < i.length; d++) i[d].nick.indexOf(a) >= 0 ? (i[d].show = !0, 
        e = !0) : i[d].show = !1;
        this.setData({
            dumpList: i,
            dumpSearchFound: e
        });
    },
    onClearSearch: function() {
        for (var t = this.data.dumpList, a = 0; a < t.length; a++) t[a].show = !0;
        this.setData({
            dumpList: t,
            dumpSearchFound: !0
        });
    },
    onDumpSelected: function(t) {
        var a = t.target.dataset.id, i = t.detail.uuid;
        if (1 == this.data.dumpList[a].checked) return this.data.dumpList[a].checked = !1, 
        void this.setData({
            dumpList: this.data.dumpList,
            radioChecked: !1,
            uuid: ""
        });
        for (var e = 0; e < this.data.dumpList.length; e++) this.data.dumpList[e].checked = !1;
        this.data.dumpList[a].checked = !0, this.setData({
            dumpList: this.data.dumpList,
            radioChecked: !0,
            uuid: i
        });
    },
    onLoad: function(t) {
        var a = t.type, i = t.uuid1, e = t.mode;
        console.log("type是" + a), this.setData({
            type: a,
            uuid1: i,
            mode: e
        });
    },
    onShow: function() {
        this.loadData();
    },
    onOpenData: function(t) {
        var a = this.data.type, i = this.data.mode, e = this.data.uuid;
        if ("IC" == a && "equal" == i) {
            var d = this.data.uuid1;
            wx.redirectTo({
                url: "/pages/device-m1-data-comparison/index?" + "uuid1=".concat(d, "&uuid2=").concat(e)
            });
        } else wx.navigateBack(), this.getOpenerEventChannel().emit("onDumpSelected", e);
    }
});