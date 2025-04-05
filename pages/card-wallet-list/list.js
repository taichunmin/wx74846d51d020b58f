var t, e = (t = require("@vant/weapp/dialog/dialog")) && t.__esModule ? t : {
    default: t
};

var a, o = require("../../76F8096255C842DF109E616502B6D685.js"), i = require("../../A781651255C842DFC1E70D15E296D685.js"), n = require("../../4723B54355C842DF2145DD44B4A6D685.js"), r = require("../../AB5D946455C842DFCD3BFC63A316D685.js"), s = require("../../AC1F69C355C842DFCA7901C4DB75D685.js"), d = require("../../F1D2DB1455C842DF97B4B3130476D685.js"), u = "".concat("https://rcopy.nikola-lab.cn", "/server1/openapi/dump/shared/info");

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
        noData: "",
        showCheckbox: !1,
        tabBarHeight: "",
        changeBottomBtnStatus: !1,
        dataIndexArr: [ {
            folder: [],
            file: []
        } ],
        navHeight: 0,
        position_title: "",
        position: "local",
        current_path: "/",
        view_current_path: "",
        show_search_frame: !1,
        dir_view: [],
        createFolder: {
            show: !1,
            title: "",
            placeholder: "",
            value: "",
            onClickLeft: "onUserCloseFrame",
            onClickRight: ""
        },
        currentFolderIndex: "",
        file_view: [],
        userSearchCardName: "",
        currentFolder: "",
        checked: !1,
        showFolder: !0,
        isCanback: !1
    },
    onCreateFolder: function() {
        this.optionCreateFolderObj(!0, "新建文件夹", "请输入文件夹名称", "onUserConfirmcreateFolder");
    },
    setPopupBox: function() {
        this.data.createFolder.show = !1, this.setData({
            createFolder: this.data.createFolder,
            dumpSearchFound: !1
        }), this.setDirView();
    },
    onUserConfirmcreateFolder: function(t) {
        var e = this, a = t.detail.dumpName;
        i.userConfirmcreateFolder(a, function(t, a) {
            1 == t ? (o.showToast(a), e.setPopupBox()) : 3 == t ? o.loginToast() : o.showToast(a);
        });
    },
    judgePosition: function() {
        "local" == o.cloudOrLocal() ? this.setData({
            position_title: "本地卡包",
            position: "local"
        }) : this.setData({
            position_title: "云端卡包",
            position: "cloud"
        });
    },
    getNavBarHeight: function() {
        var t = this, e = wx.getMenuButtonBoundingClientRect();
        wx.getSystemInfo({
            success: function(a) {
                var o = a.statusBarHeight, i = o + e.height + 2 * (e.top - o);
                t.setData({
                    navHeight: i + 163
                });
            }
        });
    },
    onScreen: function() {
        var t = this.data.showCheckbox;
        t ? this.setData({
            showCheckbox: !t,
            tabBarHeight: ""
        }) : this.setData({
            showCheckbox: !0
        });
    },
    onShowSearchFrame: function() {
        this.setData({
            show_search_frame: !0
        });
    },
    onSelectItem: function(t) {
        var e, a = t.detail.index, o = t.detail.fileType, i = t.detail.checked, n = t.detail.fileUuid, r = this.data.dataIndexArr, s = this.data.dir_view, d = this.data.file_view;
        if ("folder" == o) {
            for (var u = 0; u < s.length; u++) s[u].index == a && (e = s[u].name, s[u].checked = i);
            this.setData({
                dir_view: s
            });
        } else {
            for (u = 0; u < d.length; u++) d[u].index == a && (e = d[u].name, d[u].checked = i);
            this.setData({
                file_view: d
            });
        }
        if ("folder" == o) if (1 == i) r[0].folder.push(e); else {
            var c = r[0].folder;
            r[0].folder = c.filter(function(t) {
                return t != e;
            });
        } else if (1 == i) r[0].file.push({
            name: e,
            fileUuid: n
        }); else {
            var l = r[0].file;
            r[0].file = l.filter(function(t) {
                return t.fileUuid != n;
            });
        }
        this.setData({
            dataIndexArr: r
        }), this.changeBottomBtnStatus();
    },
    changeBottomBtnStatus: function() {
        for (var t = this.data.dir_view, e = 0; e < t.length; e++) if (t[e].checked) return void this.setData({
            changeBottomBtnStatus: !0
        });
        for (var a = this.data.file_view, o = 0; o < a.length; o++) if (a[o].checked) return void this.setData({
            changeBottomBtnStatus: !0
        });
        this.setData({
            changeBottomBtnStatus: !1
        });
    },
    judgeBtnStatus: function() {
        return 0 != this.data.changeBottomBtnStatus || (o.showToast("请选择需要操作的项"), !1);
    },
    onBtnMove: function() {
        if (this.judgeBtnStatus()) {
            var t = this.data.dataIndexArr, e = t[0].folder, a = t[0].file, o = i.returnCurrentPath(), n = [ {
                folder: [],
                file: []
            } ];
            if (e.length > 0) for (var r = 0; r < e.length; r++) {
                var s = o + e[r] + "/";
                n[0].folder.push(s);
            }
            a.length > 0 && (n[0].file = a), i.setCurrentPath("/"), this.setData({
                showCheckbox: !1,
                dataIndexArr: [ {
                    folder: [],
                    file: []
                } ],
                checked: !1
            }), wx.navigateTo({
                url: "/pages/folder-move/index?old_path=".concat(o, "&selectItem=").concat(JSON.stringify(n))
            });
        }
    },
    optionCreateFolderObj: function(t, e, a, o) {
        this.data.createFolder.show = t, this.data.createFolder.title = e, this.data.createFolder.placeholder = a, 
        this.data.createFolder.onClickRight = o, this.setData({
            createFolder: this.data.createFolder
        });
    },
    onUserCloseFrame: function() {
        this.data.createFolder.show = !1, this.setData({
            createFolder: this.data.createFolder
        });
    },
    onBtnDeleteFile: function() {
        this.judgeBtnStatus() && this.deleteFolderAndFile("deleteFolder", "是否确认删除选中的选项,\n删除后，文件夹或者卡片数据将不存在");
    },
    deleteFolderAndFileOptionData: function() {
        var t = this;
        i.drawFileViewByCurrentPath(function(e) {
            t.setDirView(), t.setData({
                file_view: e,
                showCheckbox: !1,
                checked: !1,
                changeBottomBtnStatus: !1
            }, function() {
                t.judgeNoSubFolders(t.data.dir_view, t.data.file_view), o.showToast("删除成功");
            });
        });
    },
    deleteFolderAndFile: function(t, a) {
        var n = this, r = this;
        e.default.confirm({
            message: a,
            confirmButtonText: "确认",
            cancelButtonText: "取消"
        }).then(function() {
            var e = r.data.dataIndexArr, a = e[0].folder, s = e[0].file;
            "deleteCurrentFolder" == t ? i.optionDeleteCurrentFolder(t, function(t) {
                null != t ? 1 == t.data.status ? (r.onTurnBack(), o.showToast(t.data.msg)) : o.showToast(t.data.msg) : (r.onTurnBack(), 
                o.showToast("删除成功"));
            }) : i.optionDeleteCurrentFolderAndAllFile(t, a, s, function(t) {
                null == t || 1 == t.data.status ? r.deleteFolderAndFileOptionData() : o.showToast(t.data.msg);
            }), n.setData({
                dataIndexArr: [ {
                    folder: [],
                    file: []
                } ]
            });
        }).catch(function() {});
    },
    onBtnDeleteFolder: function() {
        this.deleteFolderAndFile("deleteCurrentFolder", "是否确认删除此文件夹,\n文件夹内的卡片都会被删除");
    },
    onBtnRename: function() {
        this.optionCreateFolderObj(!0, "重命名文件夹", this.data.currentFolder, "onUserConfirmRename");
    },
    setPopupBoxClose: function(t, e) {
        this.setData({
            currentFolder: t,
            current_path: e.current_path,
            view_current_path: e.view_current_path
        }), this.onUserCloseFrame();
    },
    onUserConfirmRename: function(t) {
        var e = this, a = t.detail.dumpName;
        i.userConfirmRename(a, function(t, i, n) {
            1 == t ? (o.showToast(i), e.setPopupBoxClose(a, n)) : o.showToast(i);
        });
    },
    judgeNoSubFolders: function(t, e) {
        t.length > 0 || e.length > 0 ? this.setData({
            dumpSearchFound: !1
        }) : this.setData({
            dumpSearchFound: !0
        });
    },
    onTurnBack: function() {
        var t = this, e = i.onTurnBack();
        t.setData({
            file_view: [],
            dir_view: []
        }), i.drawFileViewByCurrentPath(function(e) {
            t.setData({
                file_view: e
            });
        }), i.drawDirViewByCurrentPath(function(a) {
            t.setData({
                dir_view: t.folderSorting(a)
            }), t.setData({
                checked: !1,
                currentFolder: e.currentFolder,
                current_path: e.current_path,
                view_current_path: e.view_current_path
            }, function() {
                t.judgeNoSubFolders(t.data.dir_view, t.data.file_view), t.showBottomBar(null);
            });
        });
    },
    showBottomBar: function(t) {
        1 != i.judgeCurrentPath(t) ? this.setData({
            showBottomBar: !0
        }) : this.setData({
            showBottomBar: !1
        });
    },
    onFolderItemClick: function(t) {
        this.setData({
            file_view: [],
            dir_view: [],
            isCanback: !0
        });
        var e = t.detail.index;
        o.cloudOrLocal();
        var a = i.onFolderItemClick(e);
        this.showBottomBar("clickFolder"), this.setData({
            checked: !1,
            currentFolderIndex: e,
            currentFolder: a.currentFolder,
            current_path: a.current_path,
            view_current_path: i.editCurrentPath(a.url_address, "•")
        }), this.setDirView();
        var n = this;
        setTimeout(function() {
            n.loadData();
        }, 100);
    },
    onFileItemClick: function(t) {
        var e = t.detail.index, a = this.data.file_view[e].uuid;
        wx.navigateTo({
            url: "/pages/card-wallet-info/info?id=" + a
        });
    },
    noCardSetData: function(t) {
        t.length <= 0 && this.setData({
            noData: !0
        });
    },
    loadData: function() {
        var t = this;
        i.loadData(function(e, a) {
            "set" == e ? t.setData({
                dumpSearchFound: !0,
                noData: !0
            }) : (t.setData({
                file_view: a
            }), t.judgeNoSubFolders(t.data.dir_view, a), t.noCardSetData(a));
        });
    },
    onUserSearch: function(t) {
        var e = this, n = t.detail;
        if ("" == n) return clearTimeout(a), e.setData({
            dir_view: e.data.dir_view,
            showFolder: !0
        }), void e.loadData();
        e.setData({
            userSearchCardName: n
        }), clearTimeout(a), a = setTimeout(function() {
            wx.showLoading({
                title: "查询中"
            }), i.userSearchCardData(n, function(t, a, i) {
                1 == t ? e.setData({
                    file_view: i,
                    showFolder: !1
                }) : setTimeout(function() {
                    o.showToast(a);
                }, 200), setTimeout(function() {
                    wx.hideLoading();
                }, 1e3);
            });
        }, 1500);
    },
    onClearSearch: function() {
        this.setData({
            showFolder: !0
        }), this.loadData();
    },
    onCancel: function() {
        this.loadData(), "" == this.data.userSearchCardName && this.setData({
            dumpSearchFound: !1
        }), this.setData({
            show_search_frame: !1,
            showFolder: !0
        });
    },
    onOpenPCWebPageManagerClick: function() {
        0 == o.isLogin() ? wx.navigateTo({
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
    importDumpFromMessageFile: function() {
        var t = this;
        d.importDumpFromWechat(25, function(e) {
            t.setData({
                "dumpImport.show": !0,
                "dumpImport.mode": "list",
                "dumpImport.listConfig.importList": e
            });
        });
    },
    parseShareCodeAndAccessCode: function(t) {
        var e = {
            accessCode: "",
            sharedCode: ""
        }, a = t.match(/code=(\w+)&*/);
        if (null != a && a.length > 1) {
            e.sharedCode = a[1];
            var o = t.match(/pwd=(\w+)&*/);
            null != o && o.length > 1 && (e.accessCode = o[1]);
        }
        if (0 == e.accessCode.length) {
            var i = t.match(/密码.*?(\w+)&*/);
            null != i && i.length > 1 && (e.accessCode = i[1]);
        }
        if (0 == e.accessCode.length) {
            var n = t.match(/访问码.*?(\w+)&*/);
            null != n && n.length > 1 && (e.accessCode = n[1]);
        }
        return e;
    },
    onDumpImportFromAnyWhereClick: function() {
        var t = this;
        wx.showActionSheet({
            itemList: [ "微信聊天记录", "粘贴板的分享链接" ],
            success: function(e) {
                switch (e.tapIndex) {
                  case 0:
                    t.importDumpFromMessageFile();
                    break;

                  case 1:
                    wx.getClipboardData({
                        success: function(e) {
                            var a = t.parseShareCodeAndAccessCode(e.data);
                            a.sharedCode.length > 0 ? t.setData(a, function() {
                                t.requestDumpShared();
                            }) : t.showErrorMsgDialog("无法从粘贴板中解析分享信息");
                        },
                        fail: function(t) {
                            o.showToast("获取剪切板的记录失败: " + t.errMsg);
                        }
                    });
                }
            }
        });
    },
    onDumpImportCustomTagInfo: function(t) {
        var e = t.currentTarget.dataset.id, a = this.data.dumpImport.listConfig.importList[e];
        switch (a.status) {
          case "custom":
            this.setData({
                "dumpImport.mode": "edit",
                "dumpImport.editConfig.index": e,
                "dumpImport.editConfig.blk0": s.bytes2hex(a.data, 0, 16),
                "dumpImport.editConfig.uidSize": 7,
                "dumpImport.editConfig.uidInput": s.bytes2hex(a.data, 0, 7),
                "dumpImport.editConfig.sakInput": "08",
                "dumpImport.editConfig.atqaInput": "0400"
            });
            break;

          case "error":
            o.showToast("该数据异常");
            break;

          case "success":
            o.showToast("该数据正常");
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
        var t = this.data.dumpImport.editConfig.uidSize, e = this.data.dumpImport.editConfig.uidInput, a = this.data.dumpImport.editConfig.sakInput, i = this.data.dumpImport.editConfig.atqaInput, n = this.data.dumpImport.editConfig.index;
        if (this.isHexInput(e, 2 * t)) if (this.isHexInput(a, 2)) if (this.isHexInput(i, 4)) {
            var r = this.data.dumpImport.listConfig.importList[n], s = r.data.length / 16 - 1, d = dump.createTagInfoObj(e, a, i, s), u = dump.createTagDumpObj(d, r.data, void 0);
            r.data = u, r.status = "success", r.errmsg = "用户手动处理成功", this.data.dumpImport.mode = "list", 
            this.setData({
                dumpImport: this.data.dumpImport
            });
        } else o.showToast("请确保输入4个Hex字符的ATQA"); else o.showToast("请确保输入2个Hex字符的SAK"); else o.showToast("请确保输入".concat(2 * t, "个Hex字符的卡号"));
    },
    clearImportListCloseDialog: function() {
        this.setData({
            "dumpImport.show": !1,
            "dumpImport.listConfig.importList": []
        });
    },
    onUserImportDumpConfirm: function() {
        for (var t = this, a = this.data.dumpImport.listConfig.importList, o = 0, i = 0, n = [], r = 0; r < a.length; r++) {
            var s = a[r];
            switch (s.status) {
              case "custom":
                o += 1;
                break;

              case "success":
                i += 1, n.push({
                    nick: s.prefix,
                    data: s.data
                });
                break;

              case "error":
                1;
            }
        }
        o > 0 ? e.default.confirm({
            message: "检测到您有".concat(o, "个文件需要手动进行处理，需要跳过吗？")
        }).then(function() {
            t.clearImportListCloseDialog(), t.processDataImport(n);
        }).catch(function() {}) : i > 0 ? (this.clearImportListCloseDialog(), this.processDataImport(n)) : this.clearImportListCloseDialog();
    },
    processDataImport: function(t) {
        t.forEach(function(t) {
            t.nick = t.nick.substr(0, 12), "string" == typeof t.data && (t.data = JSON.parse(t.data)), 
            t.data.tag_date = new Date().getTime();
        });
        var e, a = o.cloudOrLocal(), n = this;
        if ("local" == a) {
            var s = o.getDumpNicks();
            t.forEach(function(t) {
                null != (e = r.appendDumpFileCache(t.data)) ? s[e] = t.nick : o.showToast("".concat(t.nick, "保存失败"));
            }), wx.setStorageSync("dump_nicks", s);
            var d = r.getStorageSyncHasDefault("folderData", {}), u = i.returnCurrentPath();
            d[e] = u, wx.setStorageSync("folderData", d), this.loadData();
        } else t.forEach(function(t) {
            var e = i.returnCurrentPath();
            o.saveDataToTheCloud(t.nick, "", t.data, 1, e, function(t) {
                1 == t.data.status ? n.loadData() : o.showToast(t.data.msg);
            });
        });
    },
    showErrorMsgDialog: function(t) {
        e.default.alert({
            title: "发生错误",
            message: t
        });
    },
    requestDumpShared: function() {
        var t = this;
        wx.showLoading({
            title: "加载中"
        });
        var a = {
            code: this.data.sharedCode,
            pwd: this.data.accessCode
        };
        wx.request({
            method: "GET",
            url: u,
            data: a,
            success: function(a) {
                var o = a.data;
                switch (o.code) {
                  case 0:
                    t.setData({
                        showAccessCodeInputDialog: !1
                    }, function() {
                        e.default.confirm({
                            message: "".concat(o.result.user, "给您分享了").concat(o.result.name, "，确认导入吗？")
                        }).then(function() {
                            t.processDataImport([ {
                                nick: o.result.name,
                                data: o.result.data
                            } ]);
                        }).catch(function() {});
                    });
                    break;

                  case 5:
                    "err_code" === o.msg ? t.showErrorMsgDialog("不存在的分享码，可能是该用户取消了分享") : "err_expire" === o.msg ? t.showErrorMsgDialog("该分享码已经过期，可联系分享人重新分享") : "err_pwd" === o.msg ? t.data.showAccessCodeInputDialog ? t.setData({
                        errorRequestDumpShareMsg: "访问码错误，请修正或者联系分享人确认"
                    }) : t.setData({
                        showAccessCodeInputDialog: !0,
                        errorRequestDumpShareMsg: "",
                        accessCode: ""
                    }) : t.showErrorMsgDialog("发生了未知的错误：".concat(o.msg));
                    break;

                  default:
                    t.showErrorMsgDialog("未处理的错误：".concat(o.msg));
                }
            },
            fail: function(e) {
                console.log("请求获取dump信息时出现问题: " + e.errMsg), t.data.showAccessCodeInputDialog ? t.setData({
                    errorRequestDumpShareMsg: "网络异常"
                }) : t.showErrorMsgDialog("网络异常");
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
        var e = this, a = t.detail;
        if ("local" == o.cloudOrLocal()) {
            var n = i.returnCurrentPath();
            o.newCard(n, a).isok && (this.setData({
                showModal: !1
            }), this.loadData());
        } else n = i.returnCurrentPath(), o.saveDataToTheCloud("", a, "", 2, n, function(t) {
            e.loadData(), e.setData({
                showModal: !1
            });
        });
    },
    folderSorting: function(t) {
        return n.sortData(t);
    },
    setDirView: function() {
        var t = this;
        i.drawDirViewByCurrentPath(function(e) {
            t.setData({
                dir_view: t.folderSorting(e)
            });
        });
    },
    onUserBack: function() {
        var t = i.parseCurrentPathToList(i.returnCurrentPath());
        "/" != i.returnCurrentPath() && t.length >= 0 && this.onTurnBack(), 1 == t.length && this.setData({
            isCanback: !1
        });
    },
    onLoad: function(t) {
        var e = this;
        if (wx.hideTabBar(), this.judgePosition(), this.getNavBarHeight(), "src" in t && "share" == t.src) {
            var a = "", o = "";
            "code" in t && (a = t.code), "pwd" in t && (o = t.pwd), /^[A-Za-z0-9]{8}$/.test(a) ? this.setData({
                sharedCode: a,
                accessCode: o
            }, function() {
                e.requestDumpShared();
            }) : console.warn("警告，发现传入了不合规的分享码，将不做加载：" + a);
        }
    },
    onShow: function() {
        i.initData(), i.setFolderMoveData([]);
        var t = this;
        t.setData({
            showFunctionButton: o.isCardWalletListFunctionBtnsEnable()
        }), o.isLogin() && "cloud" == t.data.position ? setTimeout(function() {
            i.drawDirViewByCurrentPath(function(e) {
                t.setData({
                    dir_view: t.folderSorting(e)
                }, function() {
                    t.loadData();
                });
            });
        }, 300) : i.drawDirViewByCurrentPath(function(e) {
            t.setData({
                dir_view: t.folderSorting(e)
            }, function() {
                t.loadData();
            });
        });
    },
    typeFilter: function(t) {
        for (var e = this.data.dumpList, a = [], o = 0; o < e.length; o++) e[o].type == t && a.push(e[o]);
        this.setData({
            dumpList: a
        });
    },
    onUserSwitchFunctionBtnsStatusClick: function() {
        var t = this;
        this.setData({
            showFunctionButton: !this.data.showFunctionButton
        }, function() {
            o.setCardWalletListFunctionBtnsEnable(t.data.showFunctionButton);
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