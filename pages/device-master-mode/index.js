var t = require("../../AB5D946455C842DFCD3BFC63A316D685.js"), a = require("../../614DB8F055C842DF072BD0F70136D685.js"), s = require("../../53CD6E9355C842DF35AB0694BD16D685.js"), e = require("../../76241F7655C842DF1042777162F5D685.js"), i = require("../../D6EF5C7155C842DFB08934760C65D685.js"), o = require("../../76F8096255C842DF109E616502B6D685.js"), n = require("../../8896821655C842DFEEF0EA119506D685.js"), r = require("../../DFE4D8E455C842DFB982B0E32585D685.js"), l = require("../../AC1F69C355C842DFCA7901C4DB75D685.js"), u = require("../../6A5B005755C842DF0C3D685076E5D685.js"), h = require("../../F1D2DB1455C842DF97B4B3130476D685.js");

function d(t, a, s, e) {
    return {
        img: t,
        text: a,
        disabled: !s,
        bindtap: e
    };
}

Page({
    data: {
        shake: !1,
        pageMaps: {
            page14443A: {
                title: "IC卡",
                index: 0,
                show: !1
            },
            pageEM410X: {
                title: "ID卡",
                index: 1,
                show: !1
            }
        },
        rightButtonList: {},
        leftTaskStatus: {
            status: 0,
            message: "无"
        },
        fchkStatus: {
            show: !1,
            current: 0,
            max: 0
        },
        taginfo: {},
        keyGroup: [],
        showAllKeysGroup: !1,
        dataList: [],
        dataEditor: {
            sector: 0,
            block: 0,
            data: "",
            show: !1,
            mode: 0
        },
        firmEditor: {
            size: 4,
            data: "",
            show: !1
        },
        nickEditor: {
            show: !1,
            title: "",
            onConfirmCall: ""
        },
        writeProgress: {
            show: !1,
            title: "正在写卡...",
            progress: 0
        },
        writeResult: {
            show: !1,
            success: !0,
            titleMain: "",
            titleSub: "",
            retryCall: ""
        },
        messageBox: {
            show: !1,
            mode: "msg",
            title: "",
            content: "",
            confirmText: "是",
            cancelText: "否",
            maxlength: -1,
            value: "",
            placeholder: "",
            cancelCall: "onCloseMessageBox",
            confirmCall: ""
        },
        showIDCardEditor: !1,
        idCardHex: "",
        isBtnsExpandStatus: !1,
        modal: !1,
        vip: "",
        gestureGuidance: !1,
        checked: !0,
        switchStatus: !1,
        showDumpOpenSelectDialog: !1
    },
    rightButtonListForIC: {
        btnStartRead: d("exRead", "读IC卡", !0, "onStartReadICTagClickCall"),
        btnStartWrite: d("exWrite", "写IC卡", !1, "onStartWriteTagClickCall"),
        btnStartWritePhoneNFC: d("bracelet", "写手机手环", !1, "onStartWritePhoneNFCCall"),
        btnStartWriteUID: d("write-card-number", "只写卡号", !1, "onStartWriteTagUIDClickCall"),
        btnStartWipe: d("clearMaster", "清空卡", !0, "onStartWipeTagClickCall"),
        btnSaveDump: d("exSave", "保存数据", !1, "onSaveDumpToCardWallet"),
        btnSaveDumpNew: d("exSaveAs", "另存数据", !1, "onSaveDumpCardWalletAs"),
        btnOpenDump: d("exOpen", "打开数据", !0, "onOpenDumpClickCall"),
        btnDataEqual: d("exContrast", "数据对比", !1, "onDataFindEqual"),
        btnNewDumpForTemplate: d("exAdd", "新建数据", !0, "onICDataDumpNew"),
        btnKeysManager: d("exCode", "密码管理", !1, "onUserClickKeysManager"),
        btn14ARawTermial: d("14a_terminal", "14A终端", !1, "onUserClick14ARawTermial"),
        btnLockUFUID: d("lock_ufuid", "锁UFUID", !1, "onUserClickLockUFUID"),
        btnShareDump: d("exShare", "分享数据", !1, "onUserShareDumpClick")
    },
    rightButtonListForID: {
        btnStartRead: d("read_id", "读ID卡", !0, "onStartReadIDTagClickCall"),
        btnStartWrite: d("write_id", "写ID卡", !1, "onStartWriteTagClickCall"),
        btnSaveDump: d("save_id", "保存卡号", !1, "onSaveDumpToCardWallet"),
        btnSaveDumpNew: d("saveas_id", "另存卡号", !1, "onSaveDumpCardWalletAs"),
        btnOpenDump: d("exOpen", "打开卡片", !0, "onOpenDumpClickCall"),
        btnNewDumpForTemplate: d("add_id", "新建卡号", !0, "onIDDataDumpNew"),
        btnShareDump: d("share_id", "分享卡号", !1, "onUserShareDumpClick")
    },
    showPageByIndex: function(t, a) {
        this.data.pageMaps.page14443A.show && this.setDefaultKeysInfo(), null != a && null != a || (a = {});
        for (var s = Object.keys(this.data.pageMaps), e = 0; e < s.length; e++) {
            var i = this.data.pageMaps[s[e]];
            if (i.show && i.index == t) return void console.log("选中的页面已经是显示状态，不重复触发显示过程！");
            i.index == t ? i.show = !0 : i.show = !1;
        }
        var o = {};
        o[this.data.pageMaps.page14443A.index] = this.rightButtonListForIC, o[this.data.pageMaps.pageEM410X.index] = this.rightButtonListForID, 
        this.data.leftTaskStatus.status = 0, this.setData({
            pageMaps: this.data.pageMaps,
            rightButtonList: o[t],
            leftTaskStatus: this.data.leftTaskStatus,
            taginfo: null,
            dataList: null
        }, function() {
            "showdata" in a && a.showdata ? this.showDataByMemory() : this.setTagReadingStatus(0);
        });
    },
    getTabShow: function() {
        for (var t = Object.keys(this.data.pageMaps), a = 0; a < t.length; a++) {
            var s = this.data.pageMaps[t[a]];
            if (s.show) return s;
        }
        return null;
    },
    changeTab: function(t) {
        var a = this.getTabShow(), s = !0;
        null != a && (s = a.index != t), s && this.showPageByIndex(t);
    },
    onTabClick: function(t) {
        var a = this, s = t.currentTarget.dataset.id;
        if (this.isNoTaskRunning()) {
            if (!this.dumpSaved) return this.showDataSaveDialog(function() {
                a.changeTab(s);
            }), !1;
            this.changeTab(s);
        } else o.showToast("当前有任务正在运行中...");
    },
    onUserBack: function(t) {
        console.log("返回事件被专家模式拦截处理");
        this.isNoTaskRunning() && (this.dumpSaved ? t.detail.goBack() : this.showDataSaveDialog(function() {
            t.detail.goBack();
        }));
    },
    setMainTitle: function(t) {
        null == t ? (this.data.leftTaskStatus.status = 0, this.data.leftTaskStatus.message = "") : (this.data.leftTaskStatus.status = t.status, 
        this.data.leftTaskStatus.message = t.message), this.setData({
            leftTaskStatus: this.data.leftTaskStatus
        });
    },
    setTagInfo: function(t) {
        if (null == t || null == t) return this.setData({
            taginfo: null
        }), void console.log("信息为空");
        if (t.tag_type == a.TAG_TYPE_LF_EM410X) this.setData({
            taginfo: {
                uid: t.uid_hex,
                uid_10d: l.convertEM410x10HIDTo10D(t.uid_hex)
            }
        }); else {
            var s = [], e = "Unknown", i = !0;
            switch (t.tag_type) {
              case a.TAG_TYPE_HF_14443A:
                e = "14443A", i = !1;
                break;

              case a.TAG_TYPE_MF1_MAYBE:
                e = "可能是M1卡";
                break;

              case a.TAG_TYPE_MF1_GEN1A:
                e = "Gen1A后门卡";
                break;

              case a.TAG_TYPE_MF1_STDHD:
                e = "HardNested";
                break;

              case a.TAG_TYPE_MF1_STDST:
                e = "StaticNested";
                break;

              case a.TAG_TYPE_MF1_STDWK:
                e = "普通M1";
                break;

              case a.TAG_TYPE_MF1_RF08S:
                e = "三代无漏洞";
                break;

              case a.TAG_TYPE_MF1_GDM:
                e = "GDM滚动码";
            }
            s.push(e), i && "max_block" in t && (t.max_block <= 20 ? s.push("Mini") : t.max_block <= 63 ? s.push("S50") : t.max_block < 128 ? s.push("".concat(t.max_block, "BLOCK")) : 128 == t.max_block ? s.push("2K") : t.max_block > 128 && 256 != t.max_block ? s.push("".concat(t.max_block, "BLOCK")) : 256 == t.max_block ? s.push("S70") : s.push("".concat(t.max_block, "BLOCK"))), 
            s.push("SAK: ".concat(t.sak_hex)), s.push("ATQA: ".concat(t.atqa_hex)), "ats_hex" in t && s.push("ATS: ".concat(t.ats_hex)), 
            this.setData({
                taginfo: {
                    uid: t.uid_hex,
                    types: s
                }
            });
        }
    },
    setKeysInfo: function(t) {
        if (null != t) {
            for (var a = [], s = Object.keys(t), e = 0; e < s.length; e++) {
                var i = s[e], o = t[i];
                a.push({
                    sector: i,
                    keya: o.keya,
                    keyb: o.keyb
                });
            }
            var n = l.chunkArray(a, 16);
            this.setData({
                keyGroup: n
            });
        } else this.setData({
            keyGroup: null
        });
    },
    onShowAllKeysGroupClick: function() {
        Array.isArray(this.data.keyGroup) && this.data.keyGroup.length > 1 && this.setData({
            showAllKeysGroup: !this.data.showAllKeysGroup
        });
    },
    setDataInfo: function(t) {
        if (null == t || null == t) null != this.data.dataList && this.setData({
            dataList: null
        }); else {
            if (0 == t.length) return;
            var a = [];
            t.forEach(function(t, s) {
                var e, i;
                if (0 == s) e = l.bytes2hex(t), i = 0; else if (u.mifare_is_trailer_blk(s)) {
                    var o = l.bytes2hex(t);
                    e = {
                        keya: o.slice(0, 12),
                        ctl: o.slice(12, 20),
                        keyb: o.slice(20, 32)
                    }, i = 2;
                } else e = l.bytes2hex(t), i = 1;
                a.push({
                    sector: u.mifare_block_2_sector(s),
                    block: s,
                    data: e,
                    type: i
                });
            }), this.setData({
                dataList: a
            });
        }
    },
    setDefaultKeysInfo: function() {
        for (var t = {}, a = 0; a < 16; a++) t[a] = {
            keya: null,
            keyb: null
        };
        this.setKeysInfo(t);
    },
    showDataByMemory: function() {
        var t = a.getTagInformation();
        switch (t.tag_type) {
          case a.TAG_TYPE_HF_14443A:
            break;

          case a.TAG_TYPE_MF1_GEN1A:
          case a.TAG_TYPE_MF1_MAYBE:
          case a.TAG_TYPE_MF1_STDHD:
          case a.TAG_TYPE_MF1_STDST:
          case a.TAG_TYPE_MF1_STDWK:
          case a.TAG_TYPE_MF1_RF08S:
          case a.TAG_TYPE_MF1_GDM:
            this.setTagInfo(t), this.setDataInfo(a.getMifareTagDatas()), this.setKeysInfo(a.getMifareKeysMap());
            break;

          case a.TAG_TYPE_LF_EM410X:
            this.setTagInfo(t);
        }
        var s = [ this.data.rightButtonList.btnStartWrite, this.data.rightButtonList.btnSaveDumpNew, this.data.rightButtonList.btnShareDump, this.data.rightButtonList.btnDataEqual, this.rightButtonListForIC.btnKeysManager, this.rightButtonListForIC.btn14ARawTermial, this.rightButtonListForIC.btnStartWriteUID, this.rightButtonListForIC.btnStartWritePhoneNFC, this.rightButtonListForIC.btnLockUFUID ];
        if (this.setButtonEnable(s, !0), null != this.dumpUUID) {
            var e = this;
            "local" == o.cloudOrLocal() ? e.setMainTitle({
                status: 4,
                message: o.getDumpNickNameByUUID(e.dumpUUID)
            }) : o.queryCloudData(e.dumpUUID, function(t) {
                e.setMainTitle({
                    status: 4,
                    message: t.data.data[0].nick_name
                });
            });
        }
    },
    disableButtonExclude: function(t) {
        var a = this;
        Object.keys(a.data.rightButtonList).forEach(function(t) {
            a.data.rightButtonList[t].disabled = !0;
        }), t.forEach(function(t) {
            null != t && null != t && (t.disabled = !1);
        }), a.setData({
            rightButtonList: a.data.rightButtonList
        });
    },
    setButtonEnable: function(t, a) {
        Array.isArray(t) ? t.forEach(function(t) {
            null != t && null != t && (t.disabled = !a);
        }) : null != t && null != t && (t.disabled = !a), null != t && null != t && this.setData({
            rightButtonList: this.data.rightButtonList
        });
    },
    onCloseDataEditor: function() {
        this.data.dataEditor.show = !1, this.setData({
            dataEditor: this.data.dataEditor
        });
    },
    onConfirmDataEdit: function(t) {
        var s = t.detail, e = u.mifare_sector_2_block(s.sector) + s.block, i = a.getMifareTagDatas();
        this.data.dataList.forEach(function(t) {
            if (t.block == e) {
                var a = s.data;
                2 == t.type ? (t.data.keya = a.substr(0, 12), t.data.ctl = a.substr(12, 8), t.data.keyb = a.substr(20, 12)) : t.data = a;
            }
        }), this.data.dataEditor.show = !1, i[e] = l.hex2bytes(s.data), this.setDumpToSavedStatus(!1), 
        this.setData({
            dataList: this.data.dataList,
            dataEditor: this.data.dataEditor
        });
    },
    onCloseFirmEditor: function() {
        this.data.firmEditor.show = !1, this.setData({
            firmEditor: this.data.firmEditor
        });
    },
    onConfirmFirmEdit: function(t) {
        var s = t.detail.data, e = a.getMifareTagDatas();
        this.data.dataList.forEach(function(t) {
            0 == t.block && (t.data = s);
        }), this.data.firmEditor.show = !1, e[0] = l.hex2bytes(s);
        var i = a.getTagInformation();
        i.uid_hex = t.detail.uid, i.sak_hex = t.detail.sak, i.atqa_hex = t.detail.atqa, 
        console.log("新的信息: " + JSON.stringify(i)), this.setTagInfo(i), this.setDumpToSavedStatus(!1), 
        this.setData({
            dataList: this.data.dataList,
            firmEditor: this.data.firmEditor
        });
    },
    onUserClickEditData: function(t) {
        var s = this, e = parseInt(t.currentTarget.dataset.id), i = a.getTagInformation().uid_hex.length / 2;
        console.log("用户想要编辑第".concat(e, "块。")), 0 == e && 4 == i ? (s.data.dataList.forEach(function(t) {
            t.block == e && (s.data.firmEditor.data = t.data);
        }), s.data.firmEditor.show = !0, s.data.firmEditor.size = i, s.setData({
            firmEditor: s.data.firmEditor
        })) : (s.data.dataEditor.sector = u.mifare_block_2_sector(e), s.data.dataEditor.block = u.mifare_secblk_2_index(e, s.data.dataEditor.sector), 
        s.data.dataList.forEach(function(t) {
            t.block == e && (u.mifare_is_trailer_blk(e) ? (s.data.dataEditor.mode = 1, s.data.dataEditor.data = "".concat(t.data.keya).concat(t.data.ctl).concat(t.data.keyb)) : (s.data.dataEditor.mode = 0, 
            s.data.dataEditor.data = t.data));
        }), s.data.dataEditor.show = !0, s.setData({
            dataEditor: s.data.dataEditor
        }));
    },
    openDumpFromCards: function() {
        var a, s = this;
        a = 1 == this.data.pageMaps.page14443A.show ? "IC" : "ID", wx.navigateTo({
            url: "/pages/card-wallet-select/list?type=" + a,
            events: {
                onDumpSelected: function(a) {
                    (console.log("选定的DUMP是: " + a), null != a && null != a) && (s.dumpUUID = a, "local" == o.cloudOrLocal() ? (t.loadFile2DataBuffer(a), 
                    s.showDataByMemory()) : o.queryCloudData(s.dumpUUID, function(a) {
                        t.loadJson2DataBuffer(a.data.data[0].data), s.showDataByMemory();
                    }));
                }
            }
        });
    },
    onOpenDumpClickCall: function() {
        this.data.pageMaps.pageEM410X.show ? this.openDumpFromCards() : this.setData({
            showDumpOpenSelectDialog: !0
        });
    },
    setDumpToSavedStatus: function(t) {
        this.dumpSaved = t, this.setButtonEnable(this.data.rightButtonList.btnSaveDump, !t);
    },
    showNickEditDialog: function(t, a) {
        this.data.nickEditor.show = !0, this.data.nickEditor.title = t, this.data.nickEditor.onConfirmCall = a, 
        this.setData({
            nickEditor: this.data.nickEditor
        });
    },
    onSaveDumpCardWalletAs: function() {
        this.isDumpSaveAs = !0, this.showNickEditDialog("另存数据", "onUserSaveDataConfirm");
    },
    saveDumpToCardWalletImpl: function() {
        if (null == this.dumpUUID) this.isDumpSaveAs = !1, this.showNickEditDialog("保存数据", "onUserSaveDataConfirm"); else {
            if (this.dumpSaved) return void console.log("数据已经保存，");
            if ("local" == o.cloudOrLocal()) t.updateDumpFromMemByID(this.dumpUUID), o.showToast("更新已保存"); else {
                var a = t.createDumpInfoJsonFromMem();
                o.upCloudData(this.dumpUUID, a, function(t) {
                    "更新数据成功!" == t.data ? o.showToast("更新成功！") : o.showToast("更新失败！");
                });
            }
            this.setDumpToSavedStatus(!0);
        }
    },
    onSaveDumpToCardWallet: function() {
        this.saveDumpToCardWalletImpl();
    },
    dismissNickEdiotDialog: function() {
        this.setData({
            "nickEditor.show": !1
        });
    },
    onUserSaveDataCancel: function() {
        this.dismissNickEdiotDialog();
    },
    saveData: function(t) {
        this.dismissNickEdiotDialog(), this.isDumpSaveAs ? o.showToast("另存成功！") : o.showToast("保存成功！"), 
        this.dumpUUID = t, this.dumpSaved = !0, this.setButtonEnable(this.data.rightButtonList.btnSaveDump, !1), 
        this.showDataByMemory();
    },
    onUserSaveDataConfirm: function(a) {
        var s = this, e = a.detail.dumpName;
        if ("local" == o.cloudOrLocal()) {
            var i = o.saveCard("/", e);
            i.isok ? s.saveData(i.uuid) : o.showToast(i.message);
        } else {
            var n = t.createDumpInfoJsonFromMem();
            o.saveDataToTheCloud(e, "", n, 1, "/", function(t) {
                console.log("这里的res是" + JSON.stringify(t)), 1 == t.data.status ? s.saveData(t.data.data) : o.showToast(t.data.msg);
            });
        }
    },
    dismissMessageBoxDialog: function() {
        this.setData({
            "messageBox.show": !1
        });
    },
    dismissWriteFailDialog: function() {
        this.setData({
            "writeResult.show": !1
        });
    },
    dismissWritingDialog: function() {
        this.setData({
            "writeProgress.show": !1
        });
    },
    onCopyUIDBtnClickCall: function() {
        wx.setClipboardData({
            data: this.data.taginfo.uid,
            success: function(t) {
                o.showToast("卡号复制成功");
            }
        });
    },
    showDataSaveDialog: function(t) {
        var a = this;
        this._onDataSaveNoCall = function() {
            a.dumpSaved = !0, a.dismissMessageBoxDialog(), t();
        }, this._onDataSaveYesCall = function() {
            a.dismissMessageBoxDialog(), a.saveDumpToCardWalletImpl();
        }, this.data.messageBox.show = !0, this.data.messageBox.mode = "msg", this.data.messageBox.title = "", 
        this.data.messageBox.content = "是否保存此数据？", this.data.messageBox.cancelText = "否", 
        this.data.messageBox.confirmText = "是", this.data.messageBox.cancelCall = "_onDataSaveNoCall", 
        this.data.messageBox.confirmCall = "_onDataSaveYesCall", this.setData({
            messageBox: this.data.messageBox
        });
    },
    isNoTaskRunning: function() {
        return 0 == this.taskStatus || (o.showToast("有任务正在进行..."), !1);
    },
    setTagReadingStatus: function(t) {
        var a = [];
        switch (t) {
          case 0:
            a.push(this.data.rightButtonList.btnStartRead), a.push(this.data.rightButtonList.btnStartWipe), 
            a.push(this.data.rightButtonList.btnOpenDump), a.push(this.data.rightButtonList.btnNewDumpForTemplate), 
            a.push(this.rightButtonListForIC.btnKeysManager), a.push(this.rightButtonListForIC.btn14ARawTermial), 
            a.push(this.rightButtonListForIC.btnLockUFUID), null != this.data.taginfo && a.push(this.data.rightButtonList.btnStartWriteUID);
            break;

          case 1:
            this.disableButtonExclude(a);
            break;

          case 2:
            a.push(this.data.rightButtonList.btnStartRead), a.push(this.data.rightButtonList.btnStartWrite), 
            a.push(this.data.rightButtonList.btnStartWriteUID), a.push(this.data.rightButtonList.btnStartWritePhoneNFC), 
            a.push(this.data.rightButtonList.btnStartWipe), a.push(this.data.rightButtonList.btnSaveDump), 
            a.push(this.data.rightButtonList.btnSaveDumpNew), a.push(this.data.rightButtonList.btnOpenDump), 
            a.push(this.data.rightButtonList.btnDataEqual), a.push(this.data.rightButtonList.btnNewDumpForTemplate), 
            a.push(this.data.rightButtonList.btnShareDump), a.push(this.rightButtonListForIC.btnKeysManager), 
            a.push(this.rightButtonListForIC.btn14ARawTermial), a.push(this.rightButtonListForIC.btnLockUFUID);
        }
        this.disableButtonExclude(a);
    },
    onTagReadingCallback: function(s) {
        if (this.data.pageMaps.page14443A.show) {
            var e = a.getMifareTagDatas();
            e.length > 0 && (this.setMainTitle({
                status: 3,
                message: "扇区数据读取中"
            }), this.setKeysInfo(a.getMifareKeysMap())), this.setDataInfo(e);
        }
        if (100 == s) if (this.wipeTagMode) this.setMainTitle({
            status: 3,
            message: "开始清空卡片"
        }), this.dumpSaved = !0, t.startWipeTagAllData(this.onTagWipingProgressCall); else {
            this.setMainTitle({
                status: 2,
                message: "读卡成功"
            }), this.taskStatus = 0, this.dumpSaved = !1, this.setTagReadingStatus(2);
            var i = this;
            setTimeout(function() {
                "cloud" == o.keyStoryPosition() && i.data.pageMaps.page14443A.show && o.saveReadCardHistory("One", i.data.taginfo.uid);
            }, 1e3);
        }
    },
    onMF1AttackCallback: function(t, a, e, i, o) {
        var n = "未知任务";
        switch (t) {
          case s.TASK_NAME_FCHK:
            n = "扫默认密码(FCHK)";
            break;

          case s.TASK_NAME_DARKSIDE:
            n = "全加密解码(DARKSIDE)";
            break;

          case s.TASK_NAME_NESTED:
            n = "半加密解码(NESTED)";
            break;

          case s.TASK_NAME_STATICNESTED:
            n = "无漏洞解码(STATIC)";
            break;

          case s.TASK_NAME_HARDNESTED:
            n = "计算HARD(启动中...)";
            break;

          case s.TASK_NAME_RF08S_2X1NT:
            n = "三代无漏洞解码";
        }
        this.setMainTitle({
            status: 3,
            message: "".concat(n, " 预计 ").concat(o, "秒")
        }), this.setKeysInfo(i);
    },
    replaceTaskMessage: function(t) {
        var a = this.data.leftTaskStatus.message.replace(/\(.*\)/, "(".concat(t, ")"));
        this.data.leftTaskStatus.message = a, this.setData({
            leftTaskStatus: this.data.leftTaskStatus
        });
    },
    onMF1HardAcquireCallback: function(t) {
        this.replaceTaskMessage("采集".concat(t, "次"));
    },
    onMF1HardQueueUpCallback: function(t) {
        var a;
        a = 0 == t ? "正在计算" : "排队".concat(t, "位"), this.replaceTaskMessage(a);
    },
    onMF1FCHKProgressUpdateCallback: function(t, s) {
        a.getTagInformation().tag_type == a.TAG_TYPE_MF1_RF08S ? this.setData({
            fchkStatus: {
                show: !0,
                max: s,
                current: t
            }
        }) : this.setData({
            fchkStatus: {
                show: !1
            }
        });
    },
    onMF1Found: function(a) {
        var s = this;
        this.setTagInfo(a), this.setMainTitle({
            status: 3,
            message: "正在启动读卡"
        }), t.startReadTagAllData(function(t) {
            s.onTagReadingCallback(t);
        });
    },
    onIDTagFound: function(a) {
        var s = this;
        this.setTagInfo(a), setTimeout(function() {
            t.startReadTagAllData(function(t) {
                s.onTagReadingCallback(t);
            });
        }, 1e3);
    },
    onICTagFound: function(a) {
        var s = this;
        this.setTagInfo(a), console.log(JSON.stringify(a)), a.readable ? (this.setMainTitle({
            status: 3,
            message: "正在获取M1卡详细信息"
        }), t.startCheckMF1Detail(function(t) {
            s.onMF1Found(t);
        })) : (this.setMainTitle({
            status: 1,
            message: "读卡失败，卡片不支持读取"
        }), this.taskStatus = 0, this.setTagReadingStatus(0));
    },
    onTagNoFound: function() {
        this.setMainTitle({
            status: 1,
            message: "读卡失败，未发现卡片"
        }), this.taskStatus = 0, this.setTagReadingStatus(0);
    },
    processErrorByStatus: function(t) {
        var a = e.getMsg(t), s = t.toString(16);
        s.length < 2 && (s = "0" + s), 2 == this.taskStatus ? (this.data.writeResult.show = !0, 
        this.data.writeResult.titleMain = a, this.data.writeResult.titleSub = "错误代码: 0x".concat(s), 
        this.data.writeResult.success = !1, this.data.writeProgress.show = !1, this.setData({
            writeResult: this.data.writeResult,
            writeProgress: this.data.writeProgress
        })) : (this.setMainTitle({
            status: 1,
            message: a
        }), this.setDefaultKeysInfo(), this.setDataInfo(), this.setTagReadingStatus(0)), 
        this.taskStatus = 0;
    },
    onTagErrorCallback: function(t) {
        this.processErrorByStatus(t), this.dismissMessageBoxDialog();
    },
    onBleComErrorCallback: function() {
        this.processErrorByStatus(n.minicopy.BLE_COMMUNICATION_ERR), this.dismissMessageBoxDialog();
    },
    onBleComTimeoutCallback: function() {
        this.processErrorByStatus(n.miniapp.BLE_DEVICE_COM_TIMEOUT), this.dismissMessageBoxDialog();
    },
    onDeviceDisconnectCallback: function(t) {
        console.log("在专家模式页面监听到设备断开连接！"), 0 != this.taskStatus && (this.dismissMessageBoxDialog(), 
        this.processErrorByStatus(n.miniapp.BLE_DEVICE_DISCONNECTED));
    },
    showDeviceConnectDialog: function() {
        this.data.messageBox.show = !0, this.data.messageBox.title = "", this.data.messageBox.content = "蓝牙已断开，请重新连接", 
        this.data.messageBox.cancelText = "", this.data.messageBox.confirmText = "我知道了", 
        this.data.messageBox.confirmCall = "onCloseMessageBox", this.setData({
            messageBox: this.data.messageBox
        });
    },
    presetBeforeTagRead: function() {
        this.dumpUUID = null, this.taskStatus = 1, this.setTagReadingStatus(1), this.setMainTitle({
            status: 3,
            message: "正在寻卡..."
        });
    },
    startReadICTagImpl: function() {
        this.setDefaultKeysInfo(), this.setDataInfo(), this.presetBeforeTagRead(), this.setData({
            fchkStatus: {
                show: !1
            }
        }), t.startHFTagOneSearch(this.onICTagFound, this.onTagNoFound);
    },
    startReadIDTagImpl: function() {
        this.presetBeforeTagRead(), t.startLFTagOneSearch(this.onIDTagFound, this.onTagNoFound);
    },
    startReadTagCheckConnection: function(t) {
        var a = this, s = this;
        i.hasDeviceConnected() ? s.dumpSaved ? (this.setTagInfo(null), t()) : this.showDataSaveDialog(function() {
            s.dumpSaved = !0, a.setTagInfo(null), t();
        }) : this.showDeviceConnectDialog();
    },
    onStartReadICTagClickCall: function() {
        this.wipeTagMode = !1, this.startReadTagCheckConnection(this.startReadICTagImpl);
    },
    onStartReadIDTagClickCall: function() {
        this.wipeTagMode = !1, this.startReadTagCheckConnection(this.startReadIDTagImpl);
    },
    makeWriteFailString: function(a) {
        var s = "", e = t.getWriteBlocks4Fail();
        e.sort(function(t, a) {
            return t - a;
        });
        var i = !0;
        return e.length > 0 ? (s += "".concat(a, "失败的块："), e.forEach(function(t, a) {
            s += "".concat(t), a != e.length - 1 && (s += "、");
        }), i = !1) : (s = "".concat(a, "成功"), i = !0), {
            success: i,
            message: s
        };
    },
    onTagWipingProgressCall: function(a) {
        if (100 == (a = parseInt(a))) {
            var s = this.makeWriteFailString("清空");
            this.setMainTitle({
                status: s.success ? 2 : 1,
                message: "".concat(s.message)
            }), this.taskStatus = 0, this.setTagReadingStatus(0);
            var e = t.getWriteBlocks4Fail();
            if (1 == this.data.shake) if (0 != e[0] || 1 != e.length && 0 != e.length) {
                this.data.messageBox.show = !0, this.data.messageBox.title = "清空卡失败", this.data.messageBox.mode = "msg", 
                this.data.messageBox.content = "该卡片无法清空，请更换其他卡片", this.data.messageBox.cancelText = "", 
                this.data.messageBox.confirmText = "确定", this.data.messageBox.confirmCall = "emptyCardFailed", 
                this.setData({
                    messageBox: this.data.messageBox
                });
            } else o.showToast("清空成功！"), setTimeout(function() {
                wx.navigateBack();
            }, 2e3);
        } else this.setMainTitle({
            status: 3,
            message: "清空标签中，进度".concat(a, "%")
        });
    },
    emptyCardFailed: function() {
        wx.navigateBack();
    },
    startWipeTagImpl: function() {
        var t = this;
        t.setData({
            "messageBox.show": !1
        }, function() {
            t.wipeTagMode = !0, t.startReadTagCheckConnection(t.startReadICTagImpl);
        });
    },
    onStartWipeTagClickCall: function() {
        i.hasDeviceConnected() ? (this.data.messageBox.show = !0, this.data.messageBox.title = "", 
        this.data.messageBox.mode = "msg", this.data.messageBox.content = "确定清空该标签吗？", this.data.messageBox.cancelText = "取消", 
        this.data.messageBox.confirmText = "确定", this.data.messageBox.cancelCall = "onCloseMessageBox", 
        this.data.messageBox.confirmCall = "startWipeTagImpl", this.setData({
            messageBox: this.data.messageBox
        })) : this.showDeviceConnectDialog();
    },
    onTagWritingCallback: function(t) {
        var a = this;
        t = parseInt(t);
        a.data.writeProgress.progress = t, a.setData({
            writeProgress: a.data.writeProgress
        }), 100 == t && (setTimeout(function() {
            a.taskStatus = 0, a.data.writeResult.show = !0, a.data.writeResult.success = !0, 
            a.data.writeResult.titleMain = "写卡成功", a.data.writeResult.titleSub = "快去刷卡开门吧!", 
            a.data.writeProgress.show = !1, a.setData({
                writeResult: a.data.writeResult,
                writeProgress: a.data.writeProgress
            });
        }, 2e3), 1 == a.data.vip ? console.log("VIP不扣除次数") : "svipcopy" == o.judgeDeviceType() ? console.log("svip设备不扣除次数") : o.deductionTimes());
    },
    onTagUIDWritingCallback: function(t) {
        var a = this;
        t = parseInt(t);
        a.data.writeProgress.progress = t, a.setData({
            writeProgress: a.data.writeProgress
        }), 100 == t && setTimeout(function() {
            a.taskStatus = 0, a.data.writeResult.show = !0, a.data.writeResult.success = !0, 
            a.data.writeResult.titleMain = "卡号写入成功", a.data.writeResult.titleSub = "请连续刷卡成功开门三次，再使用！", 
            a.data.writeProgress.show = !1, a.setData({
                writeResult: a.data.writeResult,
                writeProgress: a.data.writeProgress
            });
        }, 2e3);
    },
    onWritePhoneNFCProgressCall: function(t) {
        var a = this;
        if (t = parseInt(t), this.setData({
            "writeProgress.progress": t
        }), 100 == t) {
            setTimeout(function() {
                var t = a.makeWriteFailString("写手机手环");
                t.success ? 1 == a.data.vip ? console.log("VIP不扣除次数") : "svipcopy" == o.judgeDeviceType() ? console.log("svip设备不扣除次数") : o.deductionTimes() : a.setMainTitle({
                    status: 1,
                    message: "".concat(t.message)
                }), a.taskStatus = 0, a.data.writeResult.show = !0, a.data.writeResult.success = !0, 
                a.data.writeResult.titleMain = "".concat("写手机手环").concat(t.success ? "成功" : "部分成功"), 
                a.data.writeResult.titleSub = "请连续刷卡成功开门三次，再使用！", a.data.writeProgress.show = !1, 
                a.setData({
                    writeResult: a.data.writeResult,
                    writeProgress: a.data.writeProgress
                });
            }, 2e3);
        }
    },
    startWriteTagImpl: function() {
        var a = this;
        i.hasDeviceConnected() ? (this.data.writeProgress.show = !0, this.data.writeProgress.progress = 0, 
        this.taskStatus = 2, this.setData({
            "writeResult.retryCall": "onUserRetryWriteTagClick",
            writeProgress: this.data.writeProgress
        }), t.startWriteCardDatas(function(t) {
            return a.onTagWritingCallback(t);
        })) : this.showDeviceConnectDialog();
    },
    startWriteTagUIDImpl: function() {
        var a = this;
        i.hasDeviceConnected() ? (this.data.writeProgress.show = !0, this.data.writeProgress.progress = 0, 
        this.taskStatus = 2, this.setData({
            "writeResult.retryCall": "onUserRetryWriteTagUIDClick",
            writeProgress: this.data.writeProgress
        }), t.startWrite14ATagUID(function(t) {
            return a.onTagUIDWritingCallback(t);
        })) : this.showDeviceConnectDialog();
    },
    onUserCloseWriteResultDialog: function() {
        this.dismissWriteFailDialog();
    },
    onUserRetryWriteTagClick: function() {
        this.dismissWriteFailDialog(), this.startWriteTagImpl();
    },
    onUserRetryWriteTagUIDClick: function() {
        this.dismissWriteFailDialog(), this.startWriteTagUIDImpl();
    },
    onUserRetryWritePhoneNFCClick: function() {
        this.dismissWriteFailDialog(), this.startWritePhoneNFCImpl();
    },
    onStartWriteTagClickCall: function() {
        var t = this;
        "svipcopy" == o.judgeDeviceType() ? t.startWriteTagImpl() : o.remainNumber1(function(a) {
            var s = a.data.data.remain_count, e = a.data.data.expirationTime;
            0 == s && "会员已过期" == e ? t.setData({
                modal: !0
            }) : "会员已过期" != e ? (t.setData({
                vip: !0
            }), t.startWriteTagImpl()) : 0 != s && "会员已过期" == e && (t.setData({
                vip: !1
            }), t.startWriteTagImpl());
        });
    },
    onStartWriteTagUIDClickCall: function() {
        this.startWriteTagUIDImpl();
    },
    startWritePhoneNFCImpl: function() {
        var a = this;
        i.hasDeviceConnected() ? (this.data.writeProgress.show = !0, this.data.writeProgress.progress = 0, 
        this.taskStatus = 2, this.setData({
            "writeResult.retryCall": "onUserRetryWritePhoneNFCClick",
            writeProgress: this.data.writeProgress
        }), t.startWrite2PhoneNFC(function(t) {
            return a.onWritePhoneNFCProgressCall(t);
        })) : this.showDeviceConnectDialog();
    },
    onStartWritePhoneNFCCall: function() {
        var t = this;
        "svipcopy" == o.judgeDeviceType() ? t.startWritePhoneNFCImpl() : o.remainNumber1(function(a) {
            var s = a.data.data.remain_count, e = a.data.data.expirationTime;
            0 == s && "会员已过期" == e ? t.setData({
                modal: !0
            }) : "会员已过期" != e ? (t.setData({
                vip: !0
            }), t.startWriteTagImpl()) : 0 != s && "会员已过期" == e && (t.setData({
                vip: !1
            }), t.startWriteTagImpl());
        });
    },
    onDataFindEqual: function() {
        this.dumpSaved ? null != this.dumpUUID ? wx.navigateTo({
            url: "/pages/card-wallet-select/list?" + "uuid1=".concat(this.dumpUUID, "&type=IC&mode=equal")
        }) : o.showToast("请先保存当前读卡数据到卡包~") : o.showToast("请先保存当前数据的修改哦~");
    },
    onUserCreateDataConfirm: function(a) {
        if ("local" == o.cloudOrLocal()) {
            var s = a.detail.dumpName, e = o.newCard("/", {
                cardName: s,
                type: this.newDumpType
            });
            e.isok ? (t.loadFile2DataBuffer(e.uuid), this.dumpUUID = e.uuid, this.showDataByMemory(), 
            this.dismissNickEdiotDialog()) : o.showToast(e.message);
        } else {
            var i = this, n = {
                cardName: s = a.detail.dumpName,
                type: this.newDumpType
            };
            o.saveDataToTheCloud(s, n, "", 2, "/", function(a) {
                console.log("新建数据状态是" + JSON.stringify(a)), 1 == a.data.status && o.queryCloudData(a.data.data, function(a) {
                    t.loadJson2DataBuffer(a.data.data[0].data), i.dumpUUID = a.data.data[0].uuid, i.showDataByMemory(), 
                    i.dismissNickEdiotDialog();
                });
            });
        }
    },
    createNewDump: function(t) {
        this.newDumpType = t.type, this.showNickEditDialog(t.title, "onUserCreateDataConfirm");
    },
    checkSaveAndCreateNewDump: function(t) {
        var a = this, s = this;
        s.dumpSaved ? this.createNewDump(t) : this.showDataSaveDialog(function() {
            s.dumpSaved = !0, a.createNewDump(t);
        });
    },
    onICDataDumpNew: function() {
        this.checkSaveAndCreateNewDump({
            type: "ic",
            title: "新建数据"
        });
    },
    onIDDataDumpNew: function() {
        this.checkSaveAndCreateNewDump({
            type: "id",
            title: "新建卡号"
        });
    },
    onCloseMessageBox: function() {
        this.dismissMessageBoxDialog();
    },
    onUserConfirmEditID: function(t) {
        var s = t.detail.value;
        if (s == this.data.taginfo.uid) return this.setData({
            showIDCardEditor: !1
        }), void o.showToast("卡号没有改动哦~");
        if (/[A-Fa-f0-9]{10}/.test(s)) {
            var e = a.getTagInformation();
            e.uid_hex = s, this.setTagInfo(e), this.setDumpToSavedStatus(!1), this.setData({
                showIDCardEditor: !1
            });
        } else o.showToast("仅限10个HEX字符的卡号哦~");
    },
    onUserClickEditID: function() {
        this.setData({
            showIDCardEditor: !0,
            idCardHex: this.data.taginfo.uid
        });
    },
    onUserCancelEditID: function() {
        this.setData({
            showIDCardEditor: !1
        });
    },
    onUserClickKeysManager: function() {
        wx.navigateTo({
            url: "/pages/device-m1-keys-manager/manager"
        });
    },
    showMessageDialog: function(t) {
        this.data.messageBox.show = !0, this.data.messageBox.title = "", this.data.messageBox.mode = "msg", 
        this.data.messageBox.content = t, this.data.messageBox.cancelText = "", this.data.messageBox.confirmText = "确定", 
        this.data.messageBox.confirmCall = "onCloseMessageBox", this.setData({
            messageBox: this.data.messageBox
        });
    },
    onUserClick14ARawTermial: function() {
        if (i.hasDeviceConnected()) {
            var t = r.getDevice(), a = !1;
            t instanceof r.DeviceClass.MiniCopy && (a = t.device_firmware_ver_info.codeNumber >= 259), 
            a ? wx.navigateTo({
                url: "/pages/device-14a-raw/index"
            }) : this.showMessageDialog("当前固件版本过低，不支持此功能");
        } else this.showDeviceConnectDialog();
    },
    onUserClickLockUFUID: function() {
        var a = this;
        i.hasDeviceConnected() ? (a.data.messageBox.show = !0, a.data.messageBox.title = "", 
        a.data.messageBox.mode = "loading", a.data.messageBox.content = "正在锁定中", a.data.messageBox.cancelText = "", 
        a.data.messageBox.confirmText = "", a.setData({
            messageBox: a.data.messageBox
        }), t.startUplockUFUIDTag(function(t) {
            t.success ? a.showMessageDialog("锁定成功") : a.showMessageDialog("执行上锁步骤".concat(t.step, "失败"));
        })) : this.showDeviceConnectDialog();
    },
    onExpandButtonListClick: function() {
        var t = this.data.isBtnsExpandStatus;
        this.setData({
            isBtnsExpandStatus: !t
        });
    },
    onCollapseButtonList: function() {
        this.setData({
            isBtnsExpandStatus: !1
        });
    },
    onUserTouchMoveOnBtnGroup: function(t) {
        this.newmark = t.touches[0].pageX, this.mark > this.newmark && this.mark - this.newmark > 1 ? this.istoleft = !0 : this.istoleft = !1, 
        this.mark = this.newmark;
    },
    onUserTouchEndOnBtnGroup: function(t) {
        this.mark = 0, this.newmark = 0, this.setData({
            isBtnsExpandStatus: this.istoleft
        }), this.istoleft = !1;
    },
    onUserTouchStartOnBtnGroup: function(t) {
        this.istoleft = !1, this.data.mark = this.data.newmark = t.touches[0].pageX;
    },
    onUserShareDumpClick: function() {
        var a = this;
        this.dumpSaved ? o.gotoCreateShareOrLogin(this.data.leftTaskStatus.message, t.createDumpInfoJsonFromMem()) : this.showDataSaveDialog(function() {
            a.dumpSaved = !1, o.showToast("只能分享被保存的数据");
        });
    },
    initPage: function() {
        var t = {};
        t[a.TAG_TYPE_HF_14443A] = 0, t[a.TAG_TYPE_MF1_GEN1A] = 0, t[a.TAG_TYPE_MF1_MAYBE] = 0, 
        t[a.TAG_TYPE_MF1_STDHD] = 0, t[a.TAG_TYPE_MF1_STDST] = 0, t[a.TAG_TYPE_MF1_STDWK] = 0, 
        t[a.TAG_TYPE_MF1_RF08S] = 0, t[a.TAG_TYPE_MF1_GDM] = 0, t[a.TAG_TYPE_LF_EM410X] = 1;
        var s = t[a.getTagInformation().tag_type];
        console.log("这里的页面index是" + s), this.showPageByIndex(s, {
            showdata: !0
        });
    },
    onSwitchChange: function() {
        var t = this;
        t.dumpSaved ? null != t.dumpUUID ? (t.setData({
            switchStatus: !t.data.switchStatus
        }), 1 == t.data.switchStatus && o.Freeedit(t.dumpUUID, function(a) {
            if (console.log("生成码的返回数据是 " + JSON.stringify(a)), 1 == a.data.status) {
                var s = "https://rcopy.nikola-lab.cn/server2/free-edit/#/main/index?accessCode=".concat(a.data.data);
                t.setData({
                    freeEditUrl: s
                }), console.log("url是 " + s);
            } else t.setData({
                switchStatus: !t.data.switchStatus
            }), o.showToast("自由编辑打开失败");
        })) : o.showToast("请先读卡~") : o.showToast("请先保存数据");
    },
    onCloseDumpSourceSelectDialog: function() {
        this.setData({
            showDumpOpenSelectDialog: !1
        });
    },
    openDumpFromWechat: function() {
        var a = this;
        h.importDumpFromWechat(1, function(s) {
            if (!(s.length <= 0)) {
                var e = s[0];
                console.log(e), "success" == e.status ? (t.loadJson2DataBuffer(JSON.parse(e.data)), 
                a.dumpUUID = null, a.showDataByMemory(), a.setMainTitle({
                    status: 4,
                    message: e.prefix
                }), a.setButtonEnable(a.data.rightButtonList.btnSaveDump, !0)) : "error" == e.status ? o.showToast("数据异常，或格式不兼容") : "custom" == e.status && o.showToast("该数据仅支持卡包页导入");
            }
        });
    },
    onConfirmOpenDumpFromSource: function(t) {
        var a = t.detail.type;
        console.log("选中的数据源类型是：".concat(a)), this.setData({
            showDumpOpenSelectDialog: !1
        }), "cards" == a ? this.openDumpFromCards() : "wechat" == a ? this.openDumpFromWechat() : console.error("暂未支持的dump打开数据源类型：" + a);
    },
    onLoad: function(a) {
        if (console.log("传过来的uuid是" + JSON.stringify(a)), s.registerOnAttackKeysCbk(this.onMF1AttackCallback), 
        r.onTagErrorCallback(this.onTagErrorCallback), r.onComErrCallback(this.onBleComErrorCallback), 
        r.onTimeoutCallback(this.onBleComTimeoutCallback), i.registerOnBLEDisconnectedCallback(this.onDeviceDisconnectCallback), 
        s.setHardnestedOnAcquireCbk(this.onMF1HardAcquireCallback), s.setHardnestedOnQueueUpCbk(this.onMF1HardQueueUpCallback), 
        null != r.getDevice() && r.getReader(!0).registerOnFCHKProgressCallback(this.onMF1FCHKProgressUpdateCallback), 
        this.dumpUUID = null, this.dumpSaved = !0, this.wipeTagMode = !1, this.isDumpSaveAs = !1, 
        this.taskStatus = 0, "uuid" in a) {
            var e = this;
            this.dumpUUID = a.uuid, "local" == o.cloudOrLocal() ? (t.loadFile2DataBuffer(a.uuid), 
            e.initPage()) : o.queryCloudData(this.dumpUUID, function(a) {
                console.log("类型是" + JSON.stringify(a.data.data[0].data.tag_info.tag_type)), t.loadJson2DataBuffer(a.data.data[0].data), 
                e.initPage();
            });
        } else {
            if ("pageIndex" in a) {
                var n = a.pageIndex;
                n = null == n ? 0 : parseInt(n), this.showPageByIndex(n, {
                    showdata: !0
                });
            } else this.showPageByIndex(0), this.setDefaultKeysInfo();
            "emptyCardStatus" in a && "true" == a.emptyCardStatus && (this.setData({
                shake: !0
            }), this.startWipeTagImpl());
        }
    },
    onUnload: function() {
        s.unregisterOnAttackKeysCbk(this.onMF1AttackCallback), i.unregisterOnBLEDisconnectedCallback(this.onDeviceDisconnectCallback), 
        r.onTagErrorCallback(null), r.onComErrCallback(null), r.onTimeoutCallback(null), 
        s.setHardnestedOnAcquireCbk(null), s.setHardnestedOnQueueUpCbk(null), null != r.getDevice() && r.getReader(!0).unregisterOnFCHKProgressCallback(this.onMF1FCHKProgressUpdateCallback);
    }
});