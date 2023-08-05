var e = require("../../9434A3B355C842DFF252CBB492D585D7.js"), t = require("../../8462214255C842DFE2044945663685D7.js"), s = require("../../275D798255C842DF413B1185FE3585D7.js"), a = require("../../A3859AB555C842DFC5E3F2B2FA5585D7.js");

require("../../8462214255C842DFE2044945663685D7.js").goldCoinGoods;

Page({
    data: {
        pageList: [ "公共资源库", "用户秘匙库", "读卡历史库" ],
        pageShow: 0,
        keysCheckTime: 0,
        keysHexList: [],
        editIndex: 0,
        showFWWran: !1,
        keyEnable: !1,
        tagUID: "",
        showHistoryContent: !1,
        historyEditIndex: 0,
        keyHistoryList: [],
        messageBox: {
            show: !1,
            mode: "edit",
            title: "",
            content: "添加密码",
            confirmText: "确认",
            cancelText: "取消",
            maxlength: 12,
            value: "",
            placeholder: "请输入密码",
            closeCall: "onCloseMessageBox",
            cancelCall: "onCloseMessageBox",
            confirmCall: ""
        },
        deleteAdd: !1,
        addPassword: !1,
        deleteData: !1,
        action_sheet_show: !1,
        actions: [ {
            name: "编辑单个"
        }, {
            name: "自由编辑"
        } ],
        page_index: 0,
        history_edit_key: ""
    },
    onClose: function() {
        this.setData({
            action_sheet_show: !1
        });
    },
    commonMapping: function(e, t) {
        var s = {};
        s[1] = this.onUserEditCustomKeyCall, s[2] = this.onUserEditHistoryKeyCall, this.selectKeysAction(e, t, s);
    },
    onSelect: function(e) {
        var t = this.data.history_edit_key, s = this.data.pageShow;
        if ("编辑单个" == e.detail.name) this.setData({
            action_sheet_show: !1,
            showHistoryContent: !0
        }), this.commonMapping(s, t); else {
            this.commonMapping(s, t), this.setData({
                action_sheet_show: !1
            });
            var a = this.data.tagUID, i = "keys_".concat(a).toLowerCase();
            wx.navigateTo({
                url: "/pages/device-m1-key-batch-import/index?mode=2&key=".concat(i)
            });
        }
    },
    showKeysHexSource: function(t) {
        wx.showLoading({
            title: "加载中..."
        });
        var s = [], a = !0;
        0 == t ? s = e.getDefaultPublicKey() : 1 == t && (s = e.getUserCustomTagKey(), a = e.isUserCustomKeyEnable());
        for (var i = [], o = 0; o < s.length; o++) i.push([ o, s[o].toUpperCase() ]);
        var n = parseInt(5 * s.length / 1e3 / 60);
        this.setData({
            pageShow: t,
            keysHexList: i,
            keysCheckTime: n,
            keysTableHead: [ "序号", "KEY" ],
            keyEnable: a
        }, function() {
            wx.hideLoading();
        });
    },
    showKeysFileList: function(t) {
        wx.showLoading({
            title: "加载中..."
        });
        for (var s = e.isReadHistoryKeyEnable(), a = e.getReadTagHistoryKeys(), i = [], o = 0; o < a.length; o++) i.push([ a[o].uid.toUpperCase(), a[o].size ]);
        this.setData({
            pageShow: t,
            keysHexList: i,
            keysCheckTime: -1,
            keysTableHead: [ "卡号", "数量" ],
            keyEnable: s
        }, function() {
            wx.hideLoading();
        });
    },
    showPageByIndex: function(e) {
        var t = {};
        t[0] = this.showKeysHexSource, t[1] = this.showKeysHexSource, t[2] = this.showKeysFileList, 
        this.setData({
            page_index: e
        }), "function" == typeof t[e] ? t[e](e) : console.log("未实现该页面: " + e);
    },
    onTabClick: function(e) {
        var t = e.currentTarget.dataset.id;
        this.showPageByIndex(t);
    },
    onAddUserKeyCall: function() {
        this.data.messageBox.show = !0, this.data.messageBox.mode = "edit", this.data.messageBox.confirmCall = "onUserAddKeyConfirm", 
        this.data.messageBox.value = "", this.data.messageBox.content = "添加密码", this.data.messageBox.confirmText = "确认", 
        this.data.messageBox.cancelText = "取消", this.setData({
            messageBox: this.data.messageBox
        });
    },
    onUserFreeEditing: function() {
        wx.navigateTo({
            url: "/pages/device-m1-key-batch-import/index?mode=1&key=keys_mf1_user"
        });
    },
    showClearKeyDialog: function(e) {
        this.data.keysHexList.length > 0 ? (this.data.messageBox.show = !0, this.data.messageBox.mode = "msg", 
        this.data.messageBox.confirmCall = e, this.data.messageBox.content = "是否清空秘钥，清空后不可恢复", 
        this.data.messageBox.confirmText = "是", this.data.messageBox.cancelText = "否", this.setData({
            messageBox: this.data.messageBox
        })) : t.showToast("已经很干净了，不需要清空了喔~");
    },
    onClearUserKeyCall: function() {
        this.showClearKeyDialog("onUserClearKeyConfirm");
    },
    onClearHistoryKeyCall: function() {
        this.showClearKeyDialog("onClearHistoryKeyConfirm");
    },
    onCloseMessageBox: function() {
        this.setData({
            "messageBox.show": !1
        });
    },
    getIndexOfKeysList: function(e, t) {
        var s = this.data.keysHexList;
        null == t && null == t || (s = t);
        for (var a = 0; a < s.length; a++) {
            if (s[a][1].toUpperCase() == e.toUpperCase()) return a;
        }
        return -1;
    },
    setValueOfKeysList: function(e, t, s) {
        var a = this.data.keysHexList;
        null == s && null == s || (a = s), a[e][1] = t;
    },
    getValueOfKeysList: function(e) {
        return this.data.keysHexList[e][1];
    },
    viewDatas2CacheDatas: function(e) {
        for (var t = [], s = 0; s < e.length; s++) {
            var a = e[s];
            t.push(a[1]);
        }
        return t;
    },
    selectFilesAction: function(e, s) {
        e in s ? s[e](e) : t.showToast("此秘钥库不支持此操作哦~");
    },
    selectKeysAction: function(e, s, a) {
        e in a ? a[e](e, s) : t.showToast("此秘钥库不支持此操作哦~");
    },
    isMf1PasswordFormat: function(e) {
        return /[A-Fa-f0-9]{12}/.test(e);
    },
    onUserAddKeyConfirm: function(s) {
        var a = s.detail.value;
        if (this.isMf1PasswordFormat(a)) {
            a = a.toUpperCase();
            var i = this.getIndexOfKeysList(a);
            if (-1 == i) this.data.keysHexList.push([ this.data.keysHexList.length, a ]), e.setUserCustomTagKey(this.viewDatas2CacheDatas(this.data.keysHexList)), 
            this.setData({
                keysHexList: this.data.keysHexList,
                "messageBox.show": !1
            }), "cloud" == t.keyStoryPosition() && t.saveKeysMf1User("add"); else t.showToast("已存在此秘钥了喔~（序号是".concat(i, "）"));
        } else t.showToast("输入秘钥错误（12个HEX字符）");
    },
    onUserClearKeyConfirm: function() {
        e.setUserCustomTagKey([]), this.setData({
            keysHexList: [],
            "messageBox.show": !1
        }), "cloud" == t.keyStoryPosition() && t.deleteCloudeKey("delete", "deleteCloudUserAllKeyData");
    },
    onClearHistoryKeyConfirm: function() {
        this.data.keysHexList.forEach(function(t) {
            e.delReadTagHistoryKeys(t[0]);
        }), this.setData({
            keysHexList: [],
            "messageBox.show": !1
        }), "cloud" == t.keyStoryPosition() && t.deleteCloudeKey("delete", "deleteCloudAllRCCHData");
    },
    onUserClearKeys: function() {
        var e = this.data.pageShow, t = {};
        t[1] = this.onClearUserKeyCall, t[2] = this.onClearHistoryKeyCall, this.selectFilesAction(e, t);
    },
    onUserAddKey: function() {
        var e = this.data.pageShow, t = {};
        t[1] = this.onAddUserKeyCall, this.selectFilesAction(e, t);
    },
    onUserEditKeyConfirm: function(s) {
        var a = s.detail.value.toUpperCase();
        if (this.isMf1PasswordFormat(a)) {
            var i = this.data.editIndex, o = this.getIndexOfKeysList(a);
            if (a != this.getValueOfKeysList(i)) if (-1 == o) this.setValueOfKeysList(i, a), 
            e.setUserCustomTagKey(this.viewDatas2CacheDatas(this.data.keysHexList)), this.setData({
                keysHexList: this.data.keysHexList,
                "messageBox.show": !1
            }), "cloud" == t.keyStoryPosition() && t.updateCloudKey("edit", null, "userKey"); else t.showToast("编辑后的秘钥已存在了喔~（已存在序号是".concat(o, "）")); else t.showToast("没有变动需要保存");
        } else t.showToast("输入秘钥错误（12个HEX字符）");
    },
    onUserDeleteKeyConfirm: function() {
        var s = this, a = this.data.editIndex;
        this.data.keysHexList.splice(a, 1), this.data.keysHexList.forEach(function(e, t) {
            s.data.keysHexList[t][0] = t;
        }), e.setUserCustomTagKey(this.viewDatas2CacheDatas(this.data.keysHexList)), this.setData({
            keysHexList: this.data.keysHexList,
            "messageBox.show": !1
        }), "cloud" == t.keyStoryPosition() && t.updateCloudKey("delete", "null", "userKey");
    },
    onUserEditCustomKeyCall: function(e, t) {
        this.data.messageBox.show = !0, this.data.messageBox.mode = "edit", this.data.messageBox.value = this.getValueOfKeysList(t), 
        this.data.messageBox.confirmCall = "onUserEditKeyConfirm", this.data.messageBox.content = "编辑密码（序号".concat(t, "）"), 
        this.data.messageBox.confirmText = "确认", this.data.messageBox.cancelText = "取消", 
        this.setData({
            messageBox: this.data.messageBox,
            editIndex: t
        });
    },
    onUserEditHistoryKeyCall: function(t, s) {
        var a = this.data.keysHexList[s][0], i = e.getCacheKeys4Mifare(a), o = [];
        i.forEach(function(e, t) {
            o.push([ t, e ]);
        }), this.setData({
            keyHistoryList: o,
            editIndex: s,
            tagUID: a
        });
    },
    onCancelEditHistoryKeyCall: function() {
        this.setData({
            showHistoryContent: !1
        });
    },
    onUserDeleteCustomKeyCall: function(e, t) {
        this.data.messageBox.show = !0, this.data.messageBox.mode = "msg", this.data.messageBox.confirmCall = "onUserDeleteKeyConfirm", 
        this.data.messageBox.content = "是否删除此密码（序号".concat(t, "）"), this.data.messageBox.confirmText = "是", 
        this.data.messageBox.cancelText = "否", this.setData({
            messageBox: this.data.messageBox,
            editIndex: t
        });
    },
    onDeleteHistoryKeyConfirm: function() {
        var s = this.data.editIndex, a = this.data.keysHexList[s][0];
        this.data.keysHexList.splice(s, 1), e.delReadTagHistoryKeys(a), this.setData({
            keysHexList: this.data.keysHexList,
            "messageBox.show": !1
        });
        var i = "keys_" + a;
        t.deleteCloudRCCHData(i);
    },
    onDeleteHistoryKeyCall: function(e, t) {
        this.data.messageBox.show = !0, this.data.messageBox.mode = "msg", this.data.messageBox.confirmCall = "onDeleteHistoryKeyConfirm", 
        this.data.messageBox.content = "是否删除此密码（卡号".concat(this.data.keysHexList[t][0], "）"), 
        this.data.messageBox.confirmText = "是", this.data.messageBox.cancelText = "否", this.setData({
            messageBox: this.data.messageBox,
            editIndex: t
        });
    },
    onUserEditKey: function(e) {
        var t = e.detail.index, s = this.data.pageShow;
        0 != s && 1 != s ? this.setData({
            action_sheet_show: !0,
            history_edit_key: t
        }) : this.commonMapping(s, t);
    },
    onUserDeleteKey: function(e) {
        var t = this.data.pageShow, s = e.detail.index, a = {};
        a[1] = this.onUserDeleteCustomKeyCall, a[2] = this.onDeleteHistoryKeyCall, this.selectKeysAction(t, s, a);
    },
    onEditHistoryKeyConfirm: function(s) {
        var a = s.detail.value, i = this.data.historyEditIndex, o = this.data.tagUID, n = this.getIndexOfKeysList(a, this.data.keyHistoryList);
        this.isMf1PasswordFormat(a) ? a != this.data.keyHistoryList[i][1] ? -1 == n ? (this.setValueOfKeysList(i, a, this.data.keyHistoryList), 
        e.setReadTagHistoryKeys(o, this.viewDatas2CacheDatas(this.data.keyHistoryList)), 
        this.setData({
            keyHistoryList: this.data.keyHistoryList,
            "messageBox.show": !1
        }), "cloud" == t.keyStoryPosition() && t.updateCloudKey("edit", this.data.tagUID, "RCCHKey")) : t.showToast("编辑后的秘钥已存在了喔~（已存在序号是".concat(n, "）")) : t.showToast("没有变动需要保存") : t.showToast("输入秘钥错误（12个HEX字符）");
    },
    onEditHistoryKey: function(e) {
        var t = e.detail.index;
        this.data.messageBox.show = !0, this.data.messageBox.mode = "edit", this.data.messageBox.value = this.data.keyHistoryList[t][1], 
        this.data.messageBox.confirmCall = "onEditHistoryKeyConfirm", this.data.messageBox.content = "编辑密码（序号".concat(t, "）"), 
        this.data.messageBox.confirmText = "确认", this.data.messageBox.cancelText = "取消", 
        this.setData({
            messageBox: this.data.messageBox,
            historyEditIndex: t
        });
    },
    onDeleteHistoryKeyContentConfirm: function() {
        var s = this, a = this.data.historyEditIndex, i = this.data.editIndex, o = this.data.tagUID, n = !0;
        this.data.keyHistoryList.splice(a, 1), this.data.keyHistoryList.length > 0 ? (this.data.keyHistoryList.forEach(function(e, t) {
            s.data.keyHistoryList[t][0] = t;
        }), this.data.keysHexList[i][1] = this.data.keyHistoryList.length, e.setReadTagHistoryKeys(o, this.viewDatas2CacheDatas(this.data.keyHistoryList))) : (this.data.keysHexList.splice(i, 1), 
        e.delReadTagHistoryKeys(o), n = !1), this.setData({
            keysHexList: this.data.keysHexList,
            keyHistoryList: this.data.keyHistoryList,
            "messageBox.show": !1,
            showHistoryContent: n
        }), t.updateCloudKey("delete", o, "RCCHKey");
    },
    onDeleteHistoryKey: function(e) {
        var t = e.detail.index;
        this.data.messageBox.show = !0, this.data.messageBox.mode = "msg", this.data.messageBox.confirmCall = "onDeleteHistoryKeyContentConfirm", 
        this.data.messageBox.content = "是否删除此密码（序号".concat(this.data.keyHistoryList[t][0], "）"), 
        this.data.messageBox.confirmText = "是", this.data.messageBox.cancelText = "否", this.setData({
            messageBox: this.data.messageBox,
            historyEditIndex: t
        });
    },
    onKeyEnableChange: function(t) {
        var s = t.detail, a = this.data.pageShow;
        if (0 == a) return this.data.messageBox.show = !0, this.data.messageBox.mode = "msg", 
        this.data.messageBox.content = "公共资源库是保证读卡正常运行的基础，您无法关闭此秘钥库的使用！", this.data.messageBox.confirmText = "", 
        void this.setData({
            messageBox: this.data.messageBox
        });
        1 == a ? e.setUserCustomKeyEnable(s) : 2 == a && e.setReadHistoryKeyEnable(s), this.setData({
            keyEnable: s
        });
    },
    onShow: function() {
        if (s.hasDeviceConnected()) {
            var e = a.getDevice(), t = !1;
            e instanceof a.DeviceClass.MiniCopy && (t = e.device_firmware_ver_info.codeNumber < 258), 
            this.setData({
                showFWWran: t
            });
        }
        var i = this.data.pageShow;
        this.showPageByIndex(i);
    },
    onLoad: function(e) {
        this.showPageByIndex(0);
    }
});