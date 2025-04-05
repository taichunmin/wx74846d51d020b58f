var e, t = require("../../@babel/runtime/helpers/defineProperty"), a = require("../../76F8096255C842DF109E616502B6D685.js"), i = require("../../A781651255C842DFC1E70D15E296D685.js"), r = require("../../4723B54355C842DF2145DD44B4A6D685.js");

Page({
    data: t({
        type: "ID",
        uuid1: "",
        mode: "",
        dumpList: [],
        dumpSearchFound: !1,
        uuid: "",
        radioChecked: !1,
        dir_view: [],
        file_view: [],
        showFolder: !0,
        position_title: "",
        position: "local",
        current_path: "/",
        view_current_path: "",
        show_search_frame: !1,
        noFolder: !1
    }, "uuid", ""),
    onFolderItemClick: function(e) {
        this.setData({
            file_view: []
        });
        var t = e.detail.index;
        a.cloudOrLocal();
        var r = i.onFolderItemClick(t);
        this.setData({
            currentFolderIndex: t,
            currentFolder: r.currentFolder,
            current_path: r.current_path,
            view_current_path: i.editCurrentPath(r.url_address, "•")
        }), this.setDirView();
        var o = this;
        setTimeout(function() {
            o.loadData();
        }, 50);
    },
    onFileItemClick: function(e) {
        var t = e.detail.index, a = this.data.file_view, i = a[t].uuid;
        if (1 == a[t].checked) return a[t].checked = !1, void this.setData({
            file_view: a,
            uuid: i,
            radioChecked: !1
        });
        a[t].checked = !0, this.setData({
            file_view: a,
            uuid: i,
            radioChecked: !0
        });
    },
    onUserSearch: function(t) {
        var r = this, o = t.detail;
        if ("" == o) return clearTimeout(e), r.setData({
            dir_view: r.data.dir_view,
            showFolder: !0
        }), void r.loadData();
        r.setData({
            userSearchCardName: o
        }), clearTimeout(e), e = setTimeout(function() {
            wx.showLoading({
                title: "查询中"
            }), i.userSearchCardData(o, function(e, t, i) {
                if (1 == e) {
                    for (var o = 0; o < i.length; o++) i[o].type != r.data.type && (i[o].show = !1);
                    r.setData({
                        file_view: i,
                        showFolder: !1
                    });
                } else setTimeout(function() {
                    a.showToast(t);
                }, 200);
                setTimeout(function() {
                    wx.hideLoading();
                }, 1e3);
            });
        }, 1500);
    },
    onTurnBackPreviousFolder: function() {
        var e = this, t = i.onTurnBack();
        e.setData({
            file_view: [],
            dumpSearchFound: !1
        }), e.setData({
            checked: !1,
            currentFolder: t.currentFolder,
            current_path: t.current_path,
            view_current_path: t.view_current_path
        }), e.setDirView(), setTimeout(function() {
            e.loadData();
        }, 50);
    },
    onShowSearchFrame: function() {
        this.setData({
            show_search_frame: !0
        });
    },
    turnBack: function() {
        wx.navigateBack();
    },
    loadData: function() {
        var e = this;
        i.loadData(function(t, a) {
            if ("set" == t) e.setData({
                dumpSearchFound: !0,
                noData: !0
            }); else {
                for (var i = 0; i < a.length; i++) a[i].type != e.data.type && (a[i].show = !1);
                if (e.setData({
                    file_view: a
                }), e.data.dir_view.length > 0 || e.data.file_view.length > 0) {
                    for (var r = !1, o = 0; o < e.data.file_view.length; o++) 1 == e.data.file_view[o].show && (r = !0);
                    1 == r || e.data.dir_view.length > 0 ? e.setData({
                        dumpSearchFound: !1
                    }) : e.setData({
                        dumpSearchFound: !0
                    });
                } else e.setData({
                    dumpSearchFound: !0
                });
            }
        });
    },
    onClearSearch: function() {
        console.log("000"), this.loadData(), "" == this.data.userSearchCardName && this.setData({
            dumpSearchFound: !1
        }), this.setData({
            showFolder: !0
        });
    },
    onCancel: function() {
        this.setData({
            showFolder: !0,
            show_search_frame: !1
        }), this.loadData();
    },
    folderSorting: function(e) {
        return r.sortData(e);
    },
    setDirView: function() {
        var e = this;
        i.drawDirViewByCurrentPath(function(t) {
            e.setData({
                dir_view: e.folderSorting(t)
            });
        });
    },
    onLoad: function(e) {
        i.setCurrentPath("/");
        var t = this;
        i.initData();
        var r = e.type, o = e.uuid1, n = e.mode;
        this.setData({
            type: r,
            uuid1: o,
            mode: n
        });
        var d = i.returnPosition();
        "cloud" == d ? t.setData({
            position_title: "云端卡包"
        }) : t.setData({
            position_title: "本地卡包"
        }), a.isLogin() && "cloud" == d ? setTimeout(function() {
            i.drawDirViewByCurrentPath(function(e) {
                t.setData({
                    dir_view: t.folderSorting(e)
                }, function() {
                    t.loadData();
                });
            });
        }, 100) : i.drawDirViewByCurrentPath(function(e) {
            t.setData({
                dir_view: t.folderSorting(e)
            }, function() {
                t.loadData();
            });
        });
    },
    onOpenData: function(e) {
        var t = this.data.type, a = this.data.mode, i = this.data.uuid;
        if ("IC" == t && "equal" == a) {
            var r = this.data.uuid1;
            wx.redirectTo({
                url: "/pages/device-m1-data-comparison/index?" + "uuid1=".concat(r, "&uuid2=").concat(i)
            });
        } else wx.navigateBack(), this.getOpenerEventChannel().emit("onDumpSelected", i);
    }
});