require("@babel/runtime/helpers/Objectentries.js");

var e, t, a, r, n = require("@babel/runtime/helpers/slicedToArray.js"), l = require("AB5D946455C842DFCD3BFC63A316D685.js"), o = require("614DB8F055C842DF072BD0F70136D685.js"), u = require("76F8096255C842DF109E616502B6D685.js"), i = "/", d = [], s = [], c = [];

function f(t) {
    "cloud" == e ? function(e) {
        var t = u.obtain(), a = u.getPhone(), r = u.importRequestAddress() + "Folder/currentFolderFileCount", n = {
            phone: a,
            token: t
        };
        u.requestFn(r, "post", n, function(t) {
            e(t);
        });
    }(function(e) {
        1 == e.data.status ? t(1, e.data.data) : t(0, e.data.data);
    }) : t(0, 0);
}

function h(t) {
    var n = [];
    if ("local" == e) {
        var o = l.getStorageSyncHasDefault("folderData", {});
        if (Object.keys(o).length <= 0 && "/" == i) n = M(), t(n); else {
            for (var d = E(), s = 0; s < d.length; s++) if (d[s].value == i) {
                var c = d[s].uuid, f = u.getDumpNicks()[c];
                n.push({
                    data: l.getStorageSyncHasDefault("dump_file_uuid_" + d[s].uuid, {}),
                    uuid: c,
                    nickname: f,
                    checked: !1
                });
            }
            t(g(n));
        }
    } else !function(e) {
        var t = u.importRequestAddress() + "Folder/getFileDataByCurrentPath", n = {
            phone: a,
            token: r,
            path: i
        };
        u.requestFn(t, "post", n, function(t) {
            e(t);
        });
    }(function(e) {
        if (1 == e.data.code) {
            for (var a = e.data.data, r = 0; r < a.length; r++) n.push({
                data: a[r].data,
                uuid: a[r].uuid,
                nickname: a[r].nick_name,
                checked: !1
            });
            t(g(n));
        }
    });
}

function g(e) {
    for (var t = [], a = 0; a < e.length; a++) {
        var r = e[a].data.tag_info.tag_type, n = e[a].uuid;
        t.push({
            name: e[a].nickname,
            file_type: r == o.TAG_TYPE_LF_EM410X ? "file-ID" : "file-IC",
            type: r == o.TAG_TYPE_LF_EM410X ? "ID" : "IC",
            uuid: n,
            show: !0,
            checked: !1,
            index: a
        });
    }
    return t;
}

function v(e) {
    var a = t, r = q(i), n = P(r, a);
    "请输入文件夹名称" == e && (e = "新建文件夹");
    for (var l = 0; l < n.length; l++) if (n[l] === e) return !1;
    for (var o = 0; o < r.length; o++) a = a[r[o]];
    return a[e] = {}, T("folder", t), !0;
}

function p(e) {
    for (var t = [], a = 0; a < e.length; a++) null != e[a] && t.push(e[a]);
    for (var r = {}, n = 0; n < t.length; n++) r[t[n].uuid] = t[n].value;
    return r;
}

function F(e) {
    l.deleteDumpFilesByID(e);
    var t = l.getStorageSyncHasDefault("dump_nicks", {});
    delete t[e], wx.setStorageSync("dump_nicks", t);
}

function D(e) {
    for (var t = l.getStorageSyncHasDefault("folderData", {}), a = 0; a < e.length; a++) {
        var r = e[a].fileUuid;
        F(r);
        for (var o = 0, u = Object.entries(t); o < u.length; o++) {
            var i = n(u[o], 2), d = i[0];
            i[1];
            d == r && delete t[d];
        }
    }
    T("folderData", t);
}

function S(e, a) {
    for (var r = t, o = q(i), u = l.getStorageSyncHasDefault("folderData", {}), d = [], s = 0, c = Object.entries(u); s < c.length; s++) {
        var f = n(c[s], 2), h = f[0], g = f[1];
        d.push({
            uuid: h,
            value: g
        });
    }
    if (o.length > 0) for (var v = 0; v < o.length; v++) {
        var D = o[v];
        if (v == o.length - 1) {
            r = r[D];
            for (var S = i, _ = 0; _ < a.length; _++) {
                var m = a[_];
                S = "deleteCurrentFolder" == e ? "".concat(i) : "".concat(i).concat(m, "/");
                for (var y = 0; y < d.length; y++) null != d[y] && d[y].value.startsWith(S) && (F(d[y].uuid), 
                delete d[y]);
            }
            T("folderData", p(d));
        } else r = r[D];
    } else {
        for (y = 0; y < d.length; y++) null != d[y] && d[y].value.startsWith("/" + a[0]) && (F(d[y].uuid), 
        delete d[y]);
        T("folderData", p(d));
    }
}

function _(e) {
    m("deleteSelectFolder", e), S("deleteSelectFolder", e);
}

function m(e, a) {
    if ("deleteCurrentFolder" == e) for (var r = t, n = q(i), l = 0; l < n.length; l++) {
        var o = n[l];
        l == n.length - 1 ? (delete r[o], T("folder", t)) : r = r[o];
    } else for (var u = t, d = 0; d <= a.length; d++) {
        for (var s = q(i + a[d] + "/"), c = 0; c <= s.length; c++) {
            var f = s[c];
            c == s.length - 1 ? delete u[f] : u = u[f];
        }
        T("folder", t), u = t;
    }
}

function y() {
    m("deleteCurrentFolder", null), S("deleteCurrentFolder", [ i ]);
}

function C(e) {
    return function(e) {
        for (var a = t, r = q(i), n = 0; n < r.length; n++) {
            var l = r[n];
            if (n == r.length - 1) {
                for (var o = w(i), u = P(q(i.slice(0, o + 1)), t), d = 0; d < u.length; d++) if (u[d] === e) return !1;
                a[e] = a[l], delete a[l];
            } else a = a[l];
        }
        return T("folder", t), !0;
    }(e);
}

function k(e) {
    var t = w(i), a = i.slice(0, t + 1) + e + "/";
    return i = a, e, {
        currentFolder: e,
        current_path: a,
        view_current_path: b(a, "•")
    };
}

function q(e) {
    var t = e.split("/"), a = [];
    return t.forEach(function(e) {
        0 != e.length && a.push(e);
    }), a;
}

function A(e, t) {
    return P(q(e), t);
}

function P(e, t) {
    for (var a = t, r = 0; r < e.length; r++) {
        a = a[e[r]];
    }
    return Object.keys(a);
}

function b(e, t) {
    return e.substr(0, e.length - 1).replaceAll("/", "<span class='dot'>" + "".concat(t) + "</span>");
}

function w(e) {
    return (e = e.substr(0, e.length - 1)).lastIndexOf("/");
}

function H() {
    var e = w(i), t = i.slice(0, e + 1), a = b(t, "•"), r = t, n = w(t), l = r.slice(n, r.length).replaceAll("/", "");
    return i = t, l, {
        currentFolder: l,
        current_path: t,
        view_current_path: a
    };
}

function T(e, t) {
    wx.setStorageSync(e, t);
}

function I(e, t) {
    for (var a = E(), r = 0; r < a.length; r++) for (var n = 0; n < t.length; n++) if (a[r].value == e && t[n].fileUuid == a[r].uuid) {
        if (a[r].value == i) return !1;
        var l = w(e), o = e.substring(0, l + 1);
        a[r].value = a[r].value.replace(o, i);
        var u = w(a[r].value), d = a[r].value.substring(0, u + 1);
        a[r].value = d;
    }
    for (var s = {}, c = 0; c < a.length; c++) s[a[c].uuid] = a[c].value;
    return T("folderData", s), !0;
}

function L(e) {
    for (var t = E(), a = 0; a < t.length; a++) for (var r = 0; r < e.length; r++) if (t[a].value.startsWith(e[r])) {
        var n = w(e[r]), l = e[r].substring(0, n + 1);
        t[a].value = t[a].value.replace(l, i);
    }
    for (var o = {}, u = 0; u < t.length; u++) o[t[u].uuid] = t[u].value;
    T("folderData", o);
}

function O(a) {
    "local" == e ? t = l.getStorageSyncHasDefault("folder", {}) : null == a && u.isLogin() ? j(function(e) {
        if (1 == e.data.status) {
            var a = JSON.parse(e.data.data[0].folder_data);
            t = a;
        }
    }) : t = a;
}

function R(e) {
    for (var a, r = 0; r < e.length; r++) {
        var n = t, l = q(e[r]);
        if (l.length > 1) for (var o = 0; o < l.length; o++) {
            var u = l[o];
            if (l[l.length - 1] == u && 0 != o) {
                if (d = n[u], delete n[u], !(i = x(l[l.length - 1], d)).status) return i;
                a = i;
            } else n = n[u];
        } else if (1 == l.length) {
            var i, s = n[l[0]];
            if (delete n[l[0]], !(i = x(l[0], s)).status) return i;
            a = i;
        }
    }
    return L(e), a;
}

function x(e, a) {
    for (var r, n = t, o = q(i), u = P(o, n), d = 0; d < u.length; d++) if (u[d] === e) return {
        tip: "当前目录下已经存在相同名称的目录",
        status: !1
    };
    if (o.length <= 0) n[e] = a; else if (o.length > 1) for (var s = 0; s < o.length; s++) r = o[s], 
    o.length, o[o.length - 1] == r && 0 != s ? (n = n[r])[e] = a : n = n[r]; else 1 == o.length && ((n = n[r = o[0]])[e] = a);
    T("folder", t);
    var c = l.getStorageSyncHasDefault("folder", {});
    return t = c, {
        status: !0
    };
}

function E() {
    for (var e = l.getStorageSyncHasDefault("folderData", {}), t = [], a = 0, r = Object.entries(e); a < r.length; a++) {
        var o = n(r[a], 2), u = o[0], i = o[1];
        t.push({
            uuid: u,
            value: i
        });
    }
    return t;
}

function M() {
    for (var e = [], t = l.getStorageSyncHasDefault("dump_nicks", {}), a = l.getStorageSyncHasDefault("dump_file_list", {}), r = 0; r < a.length; r++) {
        var n = l.getStorageSyncHasDefault("dump_file_uuid_" + a[r], {}), u = t[a[r]];
        e.push({
            uuid: a[r],
            name: u,
            type: n.tag_type == o.TAG_TYPE_LF_EM410X ? "ID" : "IC",
            file_type: n.tag_type == o.TAG_TYPE_LF_EM410X ? "file-ID" : "file-IC",
            show: !0,
            checked: !1,
            index: r
        });
    }
    return e;
}

function j(e) {
    var t = u.importRequestAddress() + "Folder/pullFolderData", n = {
        phone: a,
        token: r
    };
    u.requestFn(t, "post", n, function(t) {
        e(t);
    });
}

function G(e, t) {
    var n = u.importRequestAddress() + "Folder/createFolder", l = {
        phone: a,
        token: r,
        current_path: i,
        name: e
    };
    u.requestFn(n, "post", l, function(e) {
        t(e);
    });
}

function W(e, t, n, l) {
    var o = u.importRequestAddress() + "Folder/renameFolder", i = {
        phone: a,
        token: r,
        current_path: t,
        name: e,
        newPath: n
    };
    u.requestFn(o, "post", i, function(e) {
        l(e);
    });
}

function X(e, t, n) {
    var l = u.importRequestAddress() + "Folder/deleteFolderAndFile", o = {
        phone: a,
        token: r,
        mode: e,
        selectFolderData: t,
        current_path: i
    };
    u.requestFn(l, "post", o, function(e) {
        n(e);
    });
}

function Y(e) {
    var t = E(), a = [], r = l.getStorageSyncHasDefault("dump_nicks", {});
    t = l.getStorageSyncHasDefault("folderData", {});
    for (var n in r) if (-1 != r[n].indexOf(e)) {
        var u = l.getStorageSyncHasDefault("dump_file_uuid_" + n, {}), i = r[n], d = void 0;
        for (var s in t) n == s && (d = t[s]);
        a.push({
            uuid: n,
            name: i,
            type: u.tag_type == o.TAG_TYPE_LF_EM410X ? "ID" : "IC",
            file_type: u.tag_type == o.TAG_TYPE_LF_EM410X ? "file-ID" : "file-IC",
            path: d,
            show: !0
        });
    }
    return a;
}

function B(e, t) {
    var a = u.obtain(), r = u.getPhone(), n = u.importRequestAddress() + "Folder/userSearchCardData", l = {
        phone: r,
        token: a,
        name: e
    };
    u.requestFn(n, "post", l, function(e) {
        t(e);
    });
}

module.exports = {
    initData: function() {
        e = u.cloudOrLocal(), r = u.obtain(), a = u.getPhone(), "local" == e ? t = l.getStorageSyncHasDefault("folder", {}) : O(null);
    },
    setFolderMoveData: function(e) {
        s = e;
    },
    putDataInTheRootDirectory: M,
    returnPosition: function() {
        return e;
    },
    parseCurrentPathToList: q,
    loadData: function(t) {
        "local" == e ? h(function(e) {
            t("local", e);
        }) : u.isLogin() ? h(function(e) {
            t("cloud", e);
        }) : t("set", null);
    },
    userSearchCardData: function(t, a) {
        if ("local" == e) {
            var r = Y(t);
            console.log("data " + JSON.stringify(r)), r.length > 0 ? a(1, "查找成功", r) : a(0, "没有查询到相应的卡片", r);
        } else B(t, function(e) {
            1 == e.data.status && a(e.data.status, "查找成功", e.data.data), a(e.data.status, e.data.msg, e.data.data);
        });
    },
    userSearchCloudCardData: B,
    userSearchLocalCardData: Y,
    renameCloudFolder: W,
    createCloudFolder: G,
    pullFolderData: j,
    localFolderDataSaveCloud: function(e) {
        var t = l.getStorageSyncHasDefault("folderData", {}), n = l.getStorageSyncHasDefault("folder", {}), o = u.importRequestAddress() + "Folder/localFolderDataSaveCloud", i = {
            token: r,
            phone: a,
            dir_map: JSON.stringify(n),
            folderData: t
        };
        u.requestFn(o, "post", i, function(t) {
            1 == t.data.status && (wx.setStorageSync("folderData", {}), wx.setStorageSync("folder", {})), 
            e(t);
        });
    },
    cloudFolderDataSaveLocal: function(e) {
        for (var t = u.exportCardData(), n = l.getStorageSyncHasDefault("folderData", {}), o = 0; o < t.length; o++) {
            var i = t[o].uuid, d = t[o].path;
            null == d && (d = "/"), n[i] = d;
        }
        j(function(t) {
            if (1 == t.data.status) {
                var n = JSON.parse(t.data.data[0].folder_data);
                try {
                    wx.setStorageSync("folder", n);
                    var l = u.importRequestAddress() + "Folder/deleteCloudFolderData", o = {
                        phone: a,
                        token: r
                    };
                    u.requestFn(l, "post", o, function(t) {
                        e(t);
                    });
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    console.log("缓存有异常");
                }
            }
        }), wx.setStorageSync("folderData", n);
    },
    userConfirmcreateFolder: function(t, a) {
        "local" == e ? v(t) ? a(1, "新建文件夹成功") : a(0, "文件夹已存在") : u.isLogin() ? G(t, function(e) {
            1 == e.data.status && O(e.data.data), a(e.data.status, e.data.msg);
        }) : a(3, "请先登录");
    },
    optionDeleteCurrentFolder: function(t, a) {
        "local" == e ? (y(), a(null)) : X(t, [], function(e) {
            1 == e.data.status && O(e.data.data), a(e);
        });
    },
    optionDeleteCurrentFolderAndAllFile: function(t, n, l, o) {
        "local" == e ? (n.length > 0 && _(n), l.length > 0 && D(l), o(null)) : (n.length > 0 && X(t, n, function(e) {
            1 == e.data.status && O(e.data.data), o(e);
        }), l.length > 0 && function(e, t) {
            var n = u.importRequestAddress() + "Folder/deleteCloudFile", l = {
                phone: a,
                token: r,
                fileData: e
            };
            u.requestFn(n, "post", l, function(e) {
                t(e);
            });
        }(l, function(e) {
            o(e);
        }));
    },
    moveFolderOrFile: function(t, n, l, o) {
        if ("local" == e) {
            if (n.length > 0) if (!R(n).status) return void o(0, "该目录下已经有相同名称的文件夹", null);
            if (l.length > 0) {
                if (t == i) return void o(0, "不能移动到本目录", null);
                if (!I(t, l)) return void o(0, "该目录下已经有相同名称的文件", null);
            }
            o(1, "移动成功！");
        } else n.length > 0 && function(e, t) {
            var n = u.importRequestAddress() + "Folder/moveFolder", l = {
                phone: a,
                token: r,
                current_path: i,
                newPathArr: e
            };
            u.requestFn(n, "post", l, function(e) {
                t(e);
            });
        }(n, function(e) {
            1 == e.data.status && O(null), o(e.data.status, e.data.msg);
        }), l.length > 0 && function(e, t) {
            var n = u.importRequestAddress() + "Folder/moveFile", l = {
                phone: a,
                token: r,
                fileData: e,
                current_path: i
            };
            u.requestFn(n, "post", l, function(e) {
                t(e);
            });
        }(l, function(e) {
            1 == e.data.status && O(null), o(e.data.status, e.data.msg);
        });
    },
    createFolder: v,
    drawDirViewByCurrentPath: function(a) {
        if (null != t) {
            var r = A(i, t);
            f(function(n, l) {
                1 == n && (c = l);
                for (var o = [], u = 0; u < r.length; u++) {
                    var d = A("".concat(i).concat(r[u], "/"), t), f = !0;
                    if (s.length > 0) for (var h = 0; h < s.length; h++) {
                        var g = q(s[h]), v = g[g.length - 1];
                        r[u] == v && (f = !1);
                    }
                    var p = 0;
                    if ("local" == e) for (l = E(), h = 0; h < l.length; h++) l[h].value.startsWith("".concat(i).concat(r[u], "/")) && ++p; else for (var F = 0; F < c.length; F++) c[F].path.startsWith("".concat(i).concat(r[u], "/")) && ++p;
                    o.push({
                        name: r[u],
                        show: f,
                        checked: !1,
                        describe: "文件夹".concat(d.length, "个"),
                        index: u,
                        fileCount: "".concat(p, "张")
                    });
                }
                a(o);
            });
        } else a([]);
    },
    drawFileViewByCurrentPath: h,
    onFolderItemClick: function(e) {
        var a = A(i, t), r = a[e], n = "".concat(i).concat(a[e], "/");
        return r, {
            current_path: i = n,
            url_address: n,
            currentFolder: r
        };
    },
    judgeCurrentPath: function(e) {
        if ("clickFolder" == e) var t = i.split("/").length; else t = i.split("/").length - 1;
        return t;
    },
    editCurrentPath: b,
    onTurnBack: function() {
        return H();
    },
    returnCurrentPath: function() {
        return i;
    },
    userConfirmRename: function(t, a) {
        var r = i;
        if ("local" == e) {
            C(t) ? function(e, t, a) {
                for (var r = E(), n = k(e).current_path, l = 0; l < r.length; l++) r[l].value.startsWith(t) && (r[l].value = r[l].value.replace(t, n));
                T("folderData", p(r)), a();
            }(t, r, function() {
                a(1, "文件夹重命名成功", k(t));
            }) : a(0, "文件夹已存在", null);
        } else {
            var n = k(t).current_path;
            W(t, r, n, function(e) {
                1 == e.data.status ? (O(e.data.data), a(1, e.data.msg, k(t))) : a(0, e.data.msg, null);
            });
        }
    },
    returnToPreviousFolder: H,
    renameCurrentFolder: C,
    deleteCurrentFolder: y,
    deleteSelectFolder: _,
    judgeCurrentFolderLength: function() {
        return P(q(i), t).length <= 0;
    },
    setCurrentPath: function(e) {
        i = e;
    },
    moveFolders: R,
    setDirMap: O,
    moveFile: L,
    btnMoveFile: I,
    deleteSelectFile: D
};