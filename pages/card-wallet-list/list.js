var t = (0, require("../../@babel/runtime/helpers/interopRequireDefault").default)(require("@vant/weapp/dialog/dialog")), e = require("../../8462214255C842DFE2044945663685D7.js"), a = require("../../EC07278055C842DF8A614F87062685D7.js"), s = require("../../6B5F0E3755C842DF0D39663027C585D7.js"), o = require("../../306D78F255C842DF560B10F52E4585D7.js"), i = "".concat("https://rcopy.nikola-lab.cn", "/server1/openapi/dump/shared/info");

Page({
    data: {
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
        dumpList: [],
        dumpListStandby: [],
        dumpImport: {
            show: !1,
            mode: "list",
            editConfig: {
                index: 0,
                blk0: "",
                uidSize: 7,
                uidInput: "",
                sakInput: "",
                atqaInput: ""
            },
            listConfig: {
                importList: []
            }
        },
        accessCode: "",
        sharedCode: "",
        showAccessCodeInputDialog: !1,
        errorRequestDumpShareMsg: "",
        showFunctionButton: !1,
        chameleonTagSlot: {
            show: !1,
            group: [ {
                status: "normal",
                tag_hf: "家里门卡9999",
                tag_lf: "小区门卡666"
            }, {
                status: "normal",
                tag_hf: "测试adasdad",
                tag_lf: "asd1123131测试"
            }, {
                status: "normal",
                tag_hf: "门卡测试",
                tag_lf: "试试就试试"
            }, {
                status: "normal",
                tag_hf: "银行仓库门卡",
                tag_lf: "美国白宫门卡"
            }, {
                status: "normal",
                tag_hf: "银行仓库门卡",
                tag_lf: "美国白宫门卡"
            }, {
                status: "normal",
                tag_hf: "银行仓库门卡",
                tag_lf: "美国白宫门卡"
            }, {
                status: "normal",
                tag_hf: "银行仓库门卡",
                tag_lf: "美国白宫门卡"
            }, {
                status: "normal",
                tag_hf: "银行仓库门卡",
                tag_lf: "美国白宫门卡"
            } ]
        },
        dumpSearchFound: !1,
        showModal: "",
        noData: ""
    },
    onOpenPCWebPageManagerClick: function() {
        0 == e.isLogin() ? wx.navigateTo({
            url: "/pages/user-login-onekey/login"
        }) : wx.navigateTo({
            url: "/pages/card-wallet-import-export/index"
        });
    },
    onOpenPasswordManagerClick: function() {
        wx.navigateTo({
            url: "/pages/device-m1-keys-manager/manager"
        });
    },
    readContentBytesFromFile: function(t) {
        var e = wx.getFileSystemManager();
        try {
            return new Uint8Array(e.readFileSync(t));
        } catch (t) {
            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
            return console.error(t), null;
        }
    },
    importDumpFromMessageFile: function() {
        var t = this, e = [];
        wx.chooseMessageFile({
            count: 25,
            type: "file",
            extension: [ "txt", "dump", "eml", "mfd", "bin", "json", "hex" ],
            success: function(s) {
                s.tempFiles.forEach(function(s, i) {
                    var n = {
                        name: s.name,
                        data: null,
                        prefix: "",
                        suffix: "",
                        status: "error",
                        errmsg: "自动处理成功"
                    }, r = s.name.match(/^(.*)\.(.*)$/);
                    if (null != r && 3 === r.length) if (n.prefix = r[1], n.suffix = r[2], s.size <= 10240 && s.size >= 1024) {
                        console.log("开始检测文件类型: " + s.name);
                        var u = t.readContentBytesFromFile(s.path), c = a.checkDumpInBuffer(u);
                        switch (c) {
                          case "json":
                            var d = a.getJsonFromBuffer(u);
                            n.data = JSON.stringify(d), n.status = "success";
                            break;

                          case "hex":
                          case "bin":
                            if ((u = "bin" === c ? u : a.hexTextToBinary(u)).length % 16 == 0) {
                                var p = u.length / 16 - 1;
                                if (a.is0BlockBCCValid(u)) {
                                    var l = o.bytes2hex(u, 0, 4), m = o.bytes2hex(u, 5, 1), h = o.bytes2hex(u, 6, 2), f = a.createTagInfoObj(l, m, h, p), g = a.createTagDumpObj(f, u, void 0);
                                    n.data = JSON.stringify(g), n.status = "success";
                                } else n.data = u, n.status = "custom";
                            } else n.errmsg = "数据的大小不符合16个字节一个块的要求";
                            break;

                          default:
                            n.errmsg = "无法检测文件的内容类型";
                        }
                    } else n.errmsg = "文件不在1KB到10KB内"; else n.errmsg = "无法识别文件名后缀: " + s.name;
                    e.push(n);
                }), t.setData({
                    "dumpImport.show": !0,
                    "dumpImport.mode": "list",
                    "dumpImport.listConfig.importList": e
                });
            }
        });
    },
    parseShareCodeAndAccessCode: function(t) {
        var e = {
            accessCode: "",
            sharedCode: ""
        }, a = t.match(/code=(\w+)&*/);
        if (null != a && a.length > 1) {
            e.sharedCode = a[1];
            var s = t.match(/pwd=(\w+)&*/);
            null != s && s.length > 1 && (e.accessCode = s[1]);
        }
        if (0 == e.accessCode.length) {
            var o = t.match(/密码.*?(\w+)&*/);
            null != o && o.length > 1 && (e.accessCode = o[1]);
        }
        if (0 == e.accessCode.length) {
            var i = t.match(/访问码.*?(\w+)&*/);
            null != i && i.length > 1 && (e.accessCode = i[1]);
        }
        return e;
    },
    onDumpImportFromAnyWhereClick: function() {
        var t = this;
        wx.showActionSheet({
            itemList: [ "微信聊天记录", "粘贴板的分享链接" ],
            success: function(a) {
                switch (a.tapIndex) {
                  case 0:
                    t.importDumpFromMessageFile();
                    break;

                  case 1:
                    wx.getClipboardData({
                        success: function(e) {
                            var a = t.parseShareCodeAndAccessCode(e.data);
                            console.log("粘贴板中的数据是: " + e.data), console.log("解析到的分享信息是: " + JSON.stringify(a)), 
                            a.sharedCode.length > 0 ? t.setData(a, function() {
                                t.requestDumpShared();
                            }) : t.showErrorMsgDialog("无法从粘贴板中解析分享信息");
                        },
                        fail: function(t) {
                            e.showToast("获取剪切板的记录失败: " + t.errMsg);
                        }
                    });
                }
            }
        });
    },
    onDumpImportCustomTagInfo: function(t) {
        var a = t.currentTarget.dataset.id, s = this.data.dumpImport.listConfig.importList[a];
        switch (s.status) {
          case "custom":
            this.setData({
                "dumpImport.mode": "edit",
                "dumpImport.editConfig.index": a,
                "dumpImport.editConfig.blk0": o.bytes2hex(s.data, 0, 16),
                "dumpImport.editConfig.uidSize": 7,
                "dumpImport.editConfig.uidInput": o.bytes2hex(s.data, 0, 7),
                "dumpImport.editConfig.sakInput": "08",
                "dumpImport.editConfig.atqaInput": "0400"
            });
            break;

          case "error":
            e.showToast("该数据异常");
            break;

          case "success":
            e.showToast("该数据正常");
        }
    },
    onUserSelectTagUIDSizeClick: function() {
        var t = this;
        wx.showActionSheet({
            itemList: [ "4字节", "7字节", "10字节" ],
            success: function(e) {
                var a;
                switch (e.tapIndex) {
                  case 0:
                    a = 4;
                    break;

                  case 1:
                    a = 7;
                    break;

                  case 2:
                    a = 10;
                    break;

                  default:
                    a = 4;
                }
                t.setData({
                    "dumpImport.editConfig.uidSize": a,
                    "dumpImport.editConfig.uidInput": t.data.dumpImport.editConfig.uidInput.substr(0, 2 * a)
                });
            }
        });
    },
    onUserEditDumpInfoCancel: function() {
        this.setData({
            "dumpImport.mode": "list"
        });
    },
    isHexInput: function(t, e) {
        return /^[a-fA-F0-9]+$/.test(t) && t.length == e;
    },
    onDumpImportTagParamsInput: function(t) {
        var e = t.currentTarget.dataset.key;
        this.data.dumpImport.editConfig[e] = t.detail.value, this.setData({
            dumpImport: this.data.dumpImport
        });
    },
    onUserEditDumpInfoConfirm: function() {
        var t = this.data.dumpImport.editConfig.uidSize, s = this.data.dumpImport.editConfig.uidInput, o = this.data.dumpImport.editConfig.sakInput, i = this.data.dumpImport.editConfig.atqaInput, n = this.data.dumpImport.editConfig.index;
        if (this.isHexInput(s, 2 * t)) if (this.isHexInput(o, 2)) if (this.isHexInput(i, 4)) {
            var r = this.data.dumpImport.listConfig.importList[n], u = r.data.length / 16 - 1, c = a.createTagInfoObj(s, o, i, u), d = a.createTagDumpObj(c, r.data, void 0);
            r.data = d, r.status = "success", r.errmsg = "用户手动处理成功", this.data.dumpImport.mode = "list", 
            this.setData({
                dumpImport: this.data.dumpImport
            });
        } else e.showToast("请确保输入4个Hex字符的ATQA"); else e.showToast("请确保输入2个Hex字符的SAK"); else e.showToast("请确保输入".concat(2 * t, "个Hex字符的卡号"));
    },
    clearImportListCloseDialog: function() {
        this.setData({
            "dumpImport.show": !1,
            "dumpImport.listConfig.importList": []
        });
    },
    onUserImportDumpConfirm: function() {
        for (var e = this, a = this.data.dumpImport.listConfig.importList, s = 0, o = 0, i = [], n = 0; n < a.length; n++) {
            var r = a[n];
            switch (r.status) {
              case "custom":
                s += 1;
                break;

              case "success":
                o += 1, i.push({
                    nick: r.prefix,
                    data: r.data
                });
                break;

              case "error":
                1;
            }
        }
        s > 0 ? t.default.confirm({
            message: "检测到您有".concat(s, "个文件需要手动进行处理，需要跳过吗？")
        }).then(function() {
            e.clearImportListCloseDialog(), e.processDataImport(i);
        }).catch(function() {}) : o > 0 ? (this.clearImportListCloseDialog(), this.processDataImport(i)) : this.clearImportListCloseDialog();
    },
    processDataImport: function(t) {
        t.forEach(function(t) {
            t.nick = t.nick.substr(0, 12), "string" == typeof t.data && (t.data = JSON.parse(t.data)), 
            t.data.tag_date = new Date().getTime();
        });
        var a = e.cloudOrLocal(), o = this;
        if ("local" == a) {
            var i = e.getDumpNicks();
            t.forEach(function(t) {
                var a = s.appendDumpFileCache(t.data);
                null != a ? i[a] = t.nick : e.showToast("".concat(t.nick, "保存失败"));
            }), wx.setStorageSync("dump_nicks", i), this.loadData();
        } else t.forEach(function(t) {
            e.saveDataToTheCloud(t.nick, "", t.data, 1, function(t) {
                o.loadData();
            });
        });
    },
    showErrorMsgDialog: function(e) {
        t.default.alert({
            title: "发生错误",
            message: e
        });
    },
    requestDumpShared: function() {
        var e = this;
        wx.showLoading({
            title: "加载中"
        });
        var a = {
            code: this.data.sharedCode,
            pwd: this.data.accessCode
        };
        wx.request({
            method: "GET",
            url: i,
            data: a,
            success: function(a) {
                var s = a.data;
                switch (s.code) {
                  case 0:
                    e.setData({
                        showAccessCodeInputDialog: !1
                    }, function() {
                        t.default.confirm({
                            message: "".concat(s.result.user, "给您分享了").concat(s.result.name, "，确认导入吗？")
                        }).then(function() {
                            e.processDataImport([ {
                                nick: s.result.name,
                                data: s.result.data
                            } ]);
                        }).catch(function() {});
                    });
                    break;

                  case 5:
                    "err_code" === s.msg ? e.showErrorMsgDialog("不存在的分享码，可能是该用户取消了分享") : "err_expire" === s.msg ? e.showErrorMsgDialog("该分享码已经过期，可联系分享人重新分享") : "err_pwd" === s.msg ? e.data.showAccessCodeInputDialog ? e.setData({
                        errorRequestDumpShareMsg: "访问码错误，请修正或者联系分享人确认"
                    }) : e.setData({
                        showAccessCodeInputDialog: !0,
                        errorRequestDumpShareMsg: "",
                        accessCode: ""
                    }) : e.showErrorMsgDialog("发生了未知的错误：".concat(s.msg));
                    break;

                  default:
                    e.showErrorMsgDialog("未处理的错误：".concat(s.msg));
                }
            },
            fail: function(t) {
                console.log("请求获取dump信息时出现问题: " + t.errMsg), e.data.showAccessCodeInputDialog ? e.setData({
                    errorRequestDumpShareMsg: "网络异常"
                }) : e.showErrorMsgDialog("网络异常");
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    onUserInputAccessCode: function(t) {
        this.setData({
            errorRequestDumpShareMsg: "",
            accessCode: t.detail
        });
    },
    onUserConfirmInputAccessCode: function() {
        this.requestDumpShared();
    },
    onUserCancelInputAccessCode: function() {
        this.setData({
            showAccessCodeInputDialog: !1
        });
    },
    onDumpItemClick: function(t) {
        var e = t.detail.uuid;
        wx.navigateTo({
            url: "/pages/card-wallet-info/info?id=" + e
        });
    },
    loadData: function() {
        var t = this;
        e.getCardDataList(function(e) {
            var a;
            a = "" == e ? "none" : "", t.setData({
                dumpList: e,
                dumpListStandby: e,
                noData: a
            });
        });
    },
    addCard: function() {
        this.setData({
            showModal: !0
        });
    },
    bottomBtnCancel: function() {
        this.setData({
            showModal: !1
        });
    },
    bottomBtnConfirm: function(t) {
        var a = this, s = t.detail;
        (console.log("接收的数据是" + JSON.stringify(s)), "local" == e.cloudOrLocal()) ? e.newCard(s).isok && (this.setData({
            showModal: !1
        }), this.loadData()) : e.saveDataToTheCloud("", s, "", 2, function(t) {
            a.loadData(), a.setData({
                showModal: !1
            });
        });
    },
    onLoad: function(t) {
        var e = this;
        if (wx.hideTabBar(), "src" in t && "share" == t.src) {
            var a = "", s = "";
            "code" in t && (a = t.code), "pwd" in t && (s = t.pwd), /^[A-Za-z0-9]{8}$/.test(a) ? this.setData({
                sharedCode: a,
                accessCode: s
            }, function() {
                e.requestDumpShared();
            }) : console.warn("警告，发现传入了不合规的分享码，将不做加载：" + a);
        }
    },
    onShow: function() {
        this.setData({
            showFunctionButton: e.isCardWalletListFunctionBtnsEnable()
        }), this.loadData();
    },
    pySegSort: function() {
        var t = this.data.dumpListStandby;
        if (0 != t) {
            if (!String.prototype.localeCompare) return null;
            var e, a = "*ABCDEFGHJKLMNOPQRSTWXYZ".split(""), s = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split(""), o = [], i = {}, n = /[^\u4e00-\u9fa5]/, r = new RegExp("[`\\-~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？12345678990]");
            a.filter(function(i, u) {
                e = {
                    initial: "",
                    data: []
                }, t.map(function(t, a) {
                    r.test(t.nick[0]) && (!s[u - 1] || s[u - 1].localeCompare(t.nick) <= 0) && -1 == t.nick.localeCompare(s[u]) && e.data.push(t), 
                    n.test(t.nick[0]) ? t.nick[0].toUpperCase() == i && e.data.push(t) : (!s[u - 1] || s[u - 1].localeCompare(t.nick) <= 0) && -1 == t.nick.localeCompare(s[u]) && e.data.push(t);
                }), e.data.length && (e.initial = a[u], o.push(e), e.data.sort(function(t, e) {
                    return t.nick.localeCompare(e.nick);
                }));
            }), i.segs = Array.from(new Set(o));
            for (var u = [], c = 0; c < i.segs.length; c++) if (i.segs[c].data.length >= 1) for (var d = 0; d < i.segs[c].data.length; d++) u.push(i.segs[c].data[d]); else u.push(i.segs[c].data);
            this.setData({
                dumpList: u
            });
        }
    },
    typeFilter: function(t) {
        for (var e = this.data.dumpList, a = [], s = 0; s < e.length; s++) e[s].type == t && a.push(e[s]);
        this.setData({
            dumpList: a
        });
    },
    showIC: function() {
        this.setData({
            dumpList: this.data.dumpListStandby
        }, function() {
            this.typeFilter("IC");
        });
    },
    showID: function() {
        this.setData({
            dumpList: this.data.dumpListStandby
        }, function() {
            this.typeFilter("ID");
        });
    },
    clearFilter: function() {
        this.setData({
            dumpList: this.data.dumpListStandby
        });
    },
    onUserSearch: function(t) {
        var e = t.detail;
        "" == e && this.loadData();
        for (var a = this.data.dumpList, s = !1, o = 0; o < a.length; o++) a[o].nick.indexOf(e) >= 0 ? (a[o].show = !0, 
        s = !0) : a[o].show = !1;
        this.setData({
            dumpList: a,
            dumpSearchFound: s
        });
    },
    onClearSearch: function() {
        for (var t = this.data.dumpList, e = 0; e < t.length; e++) t[e].show = !0;
        this.setData({
            dumpList: t,
            dumpSearchFound: !0
        });
    },
    onUserSwitchFunctionBtnsStatusClick: function() {
        var t = this;
        this.setData({
            showFunctionButton: !this.data.showFunctionButton
        }, function() {
            e.setCardWalletListFunctionBtnsEnable(t.data.showFunctionButton);
        });
    },
    updateOverviewMPDumpToDeviceView: function(t, e) {
        this.setData({
            overviewMPDumpToDevice: {
                show: !0,
                x: t - 120,
                y: e - 19
            }
        });
    },
    onOverviewMPDumpToDeviceViewMove: function(t) {
        this.overviewMPDumpToDeviceEnable && this.updateOverviewMPDumpToDeviceView(t.changedTouches[0].clientX, t.changedTouches[0].clientY);
    },
    onUserCardDumpItemLongPress: function(t) {
        this.overviewMPDumpToDeviceEnable = !0, this.updateOverviewMPDumpToDeviceView(t.touches[0].pageX, t.touches[0].pageY);
    },
    onOverviewMPDumpToDeviceViewTouchEnd: function(t) {
        this.overviewMPDumpToDeviceEnable = !1, this.setData({
            overviewMPDumpToDevice: {
                show: !1,
                x: 0,
                y: 0
            }
        });
    }
});