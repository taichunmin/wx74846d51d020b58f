var e = require("@babel/runtime/helpers/typeof.js"), t = require("D6EF5C7155C842DFB08934760C65D685.js"), n = require("AB5D946455C842DFCD3BFC63A316D685.js"), a = require("614DB8F055C842DF072BD0F70136D685.js"), o = require("DFE4D8E455C842DFB982B0E32585D685.js"), i = require("53CD6E9355C842DF35AB0694BD16D685.js"), r = null, p = "家里门卡1", c = "minicopy", s = [], u = "https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/", d = {
    platform: "",
    mpenv: ""
};

function l(e, t, n, a) {
    wx.request({
        url: e,
        method: t,
        data: n,
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            "token已经过期" != e.data ? a(e) : v();
        },
        fail: function(e) {
            console.log(e);
        }
    });
}

function h(e) {
    wx.showToast({
        title: e,
        icon: "none",
        duration: 1e3
    });
}

function f() {
    return n.getStorageSyncHasDefault("token", {});
}

function g() {
    var e = n.getStorageSyncHasDefault("phoneObj", null);
    return null != e && (e = e.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")), e;
}

function k() {
    return n.getStorageSyncHasDefault("phoneObj", {});
}

function y() {
    [ "token", "phoneObj", "image_cache" ].forEach(function(e) {
        try {
            wx.removeStorageSync(e);
        } catch (e) {
            e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
            console.err(e);
        }
    });
}

function v() {
    y(), wx.navigateTo({
        url: "/pages/user-login-onekey/login"
    });
}

function _() {
    var e = k();
    return !(Object.keys(e).length <= 0);
}

function b() {
    return n.getStorageSyncHasDefault("dump_nicks", {});
}

function S() {
    return n.getStorageSyncHasDefault("dump_nicks", {});
}

function m() {
    var e = S(), t = 0;
    for (var n in e) try {
        var a = e[n].match(/家里门卡(\d*)/);
        if (null != a) {
            a = a[1];
            var o = parseInt(a);
            o > t && (t = o);
        }
    } catch (e) {
        e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
        console.error("在迭代卡包名称以生成默认值是出现异常: " + e);
    }
    return "家里门卡" + (t + 1);
}

function x(e, t, a) {
    var o = S();
    for (var i in o) if (o[i] == t) return {
        isok: !1,
        uuid: null,
        message: "已经存在相同名称的卡片了"
    };
    var r = a();
    if (0 == t.length && (t = m()), null != r) {
        o[r] = t, wx.setStorageSync("dump_nicks", o);
        var p = n.getStorageSyncHasDefault("folderData", {});
        return p[r] = e, wx.setStorageSync("folderData", p), {
            isok: !0,
            uuid: r,
            message: "保存成功"
        };
    }
    util.showToast("检测到数据为空，请重新读卡");
}

function C(t) {
    l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/SaveCarddata/getDatas", "post", {
        phone: k(),
        token: f()
    }, function(n) {
        if ("object" == e(n.data) && "data" in n.data) {
            for (var o = [], i = 0; i < n.data.data.length; i++) {
                var r;
                r = n.data.data[i].data.tag_info.tag_type == a.TAG_TYPE_LF_EM410X ? "#008EF5" : "#f5a200", 
                o.push({
                    uuid: n.data.data[i].uuid,
                    nick: n.data.data[i].nick_name,
                    tag_data: n.data.data[i].data.tag_data,
                    tag_date: n.data.data[i].data.tag_date,
                    tag_info: n.data.data[i].data.tag_info,
                    type: n.data.data[i].data.tag_info.tag_type == a.TAG_TYPE_LF_EM410X ? "ID" : "IC",
                    checked: !1,
                    color: r,
                    show: !0,
                    path: n.data.data[i].path
                });
            }
            t(o);
        } else t([]);
    });
}

function D() {
    wx.showModal({
        title: "系统提示",
        content: "是否选择登录？",
        success: function(e) {
            e.confirm && (console.log("用户点击确定"), wx.navigateTo({
                url: "/pages/user-login-onekey/login"
            }));
        }
    });
}

function w() {
    var e = n.getStorageSyncHasDefault("saveAddress", {});
    return Object.keys(e).length <= 0 || "cloud" == e ? "cloud" : "local";
}

function T(e) {
    l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/SaveCardData/deleteCloudData", "post", {
        phone: k(),
        token: f()
    }, function(t) {
        e(t.data);
    });
}

function O(e) {
    l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Shippingaddress/queryShippingAddress", "post", {
        phone: k(),
        token: f()
    }, function(t) {
        e(t);
    });
}

function N() {
    for (var e = i.getReadTagHistoryKeys(), t = [], n = 0; n < e.length; n++) {
        for (var a = i.getCacheKeys4Mifare(e[n].uid), o = [], r = 0; r < a.length; r++) -1 == o.indexOf(a[r]) && o.push(a[r]);
        t.push({
            name: "keys_" + e[n].uid,
            key_array: o
        });
    }
    return t;
}

function H(e, t) {
    l(t = u + "Tagkey/" + t, "post", {
        phone: k(),
        token: f()
    }, function(t) {
        if (1 == t.data.status) {
            if ("delete" == e) return void h("删除成功");
            h(t.data.msg);
        } else h(t.data.msg);
    });
}

module.exports = {
    requestFn: l,
    importRequestAddress: function() {
        return u;
    },
    deleteCloudRCCHData: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Tagkey/deleteCloudRCCHData", "post", {
            phone: k(),
            token: f(),
            uuid: e
        }, function(e) {
            e.data.status, h(e.data.msg);
        });
    },
    updateCloudKey: function(e, t, n) {
        if ("userKey" == n) var a = i.getUserCustomTagKey(); else if ("RCCHKey" == n) {
            var o = i.getCacheKeys4Mifare(t);
            (a = []).push({
                name: "keys_".concat(t).toLowerCase(),
                key_array: o
            });
        }
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Tagkey/updateCloudKey", "post", a = {
            phone: k(),
            token: f(),
            key_array: a,
            optionKey: n
        }, function(t) {
            if (1 == t.data.status) {
                if ("edit" == e) return void h("密码更新已保存");
                if ("delete" == e) return void h("删除成功！");
            } else h(t.data.msg);
        });
    },
    deleteCloudeKey: H,
    keyStoryPosition: function() {
        var e = n.getStorageSyncHasDefault("keyStory", []);
        return "cloud" == e ? "cloud" : Object.keys(e).length <= 0 || "local" == e ? "local" : void 0;
    },
    rCCHSaveToLocal: function() {
        var e = N();
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Tagkey/rCCHSaveToLocal", "post", {
            phone: k(),
            token: f(),
            key_array: e
        }, function(e) {
            if (1 == e.data.status) {
                for (var t = e.data.data, n = 0; n < t.length; n++) {
                    var a = t[n].name, o = JSON.parse(t[n].key_array);
                    wx.setStorageSync(a, o);
                }
                H("option", "deleteCloudAllRCCHData");
            } else h(e.data.msg);
        });
    },
    mf1UserSaveToLocal: function() {
        var e = i.getUserCustomTagKey();
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Tagkey/mf1UserSaveToLocal", "post", {
            phone: k(),
            token: f(),
            keysList: e
        }, function(e) {
            1 == e.data.status || 0 == e.data.status ? h(e.data.msg) : 2 == e.data.status && (wx.setStorageSync("keys_mf1_user", e.data.data), 
            H("option", "deleteCloudUserAllKeyData"));
        });
    },
    saveKeysMf1User: function(e) {
        var t = i.getUserCustomTagKey();
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Tagkey/insertUserKeysData", "post", {
            phone: k(),
            token: f(),
            data: t
        }, function(t) {
            if (1 == t.data.status) {
                var n = t.data.data;
                console.log("要保存的数据 " + JSON.stringify(n)), function(e) {
                    for (var t = 0; t < e.length; t++) {
                        var n = e[t].name, a = JSON.parse(e[t].key_array);
                        wx.setStorageSync(n, a);
                    }
                }(n), "add" == e ? h("添加成功") : "edit" == e ? h("密钥更新已保存") : "delete" == e && h("删除成功！"), 
                h(t.data.msg);
            } else h(t.data.msg);
        });
    },
    saveReadCardHistory: function(e, t) {
        if ("All" == e) var n = N(); else if ("One" == e) {
            for (var a = i.getCacheKeys4Mifare(t), o = (n = [], []), r = 0; r < a.length; r++) -1 == o.indexOf(a[r]) && o.push(a[r]);
            n.push({
                name: "keys_".concat(t).toLowerCase(),
                key_array: o
            });
        }
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Tagkey/insertRCHData", "post", {
            phone: k(),
            token: f(),
            key_array: n,
            option: e
        }, function(t) {
            if (1 == t.data.status) {
                if ("One" == e) return void console.log("保存成功！");
                h(t.data.msg);
            } else h(t.data.msg);
        });
    },
    deviceConnectRecord: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Deviceconnectrecord/insertRecord", "get", {
            phone: k(),
            token: f(),
            serial: e
        }, function(e) {});
    },
    Freeedit: function(e, t) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Freeedit/createCode", "get", {
            phone: k(),
            token: f(),
            uuid: e
        }, function(e) {
            t(e);
        });
    },
    prohibition: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Prohibition/query", "get", {
            phone: k(),
            token: f()
        }, function(t) {
            e(t);
        });
    },
    queryVoucherData: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Voucher/queryVoucherData", "get", {
            phone: k(),
            token: f()
        }, function(t) {
            e(t);
        });
    },
    redemptionVoucher: function(e, t) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Voucher/redemptionVoucher", "get", {
            phone: k(),
            token: f(),
            number_of_gold_coins: e
        }, function(e) {
            t(e);
        });
    },
    judgeDeviceType: function() {
        if (t.hasDeviceConnected()) {
            var e = "device_type_".concat(o.getSerial()), a = n.getStorageSyncHasDefault(e, {});
            return Object.keys(a).length <= 0 ? c : a;
        }
    },
    isSVIPDevice: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Querydevicetype/getRcopyType", "post", {
            phone: k(),
            token: f(),
            serial: e
        }, function(e) {
            c = e.data.data;
            var t = "device_type_".concat(o.getSerial());
            wx.setStorageSync(t, c);
        });
    },
    getRequestUrl: function() {
        return u;
    },
    judgeSystemType: function() {
        return "".concat(d.mpenv, ":").concat(d.platform);
    },
    obtain: f,
    getOpenId: function(e) {
        wx.login({
            success: function(t) {
                wx.request({
                    url: u + "Login/getOpenId",
                    data: {
                        phone: e,
                        code: t.code
                    },
                    header: {
                        "content-type": "application/json"
                    }
                });
            }
        });
    },
    checkToken: v,
    getHidePhone: g,
    getPhone: k,
    removeAppStorage: y,
    judgePhoneNumber: function(e) {
        var t = g();
        return e.setData({
            phone: t
        }), t;
    },
    showToast: h,
    remainNumber: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/User/remainCount", "get", {
            token: f(),
            phone: k()
        }, function(t) {
            e(t);
        });
    },
    checkActivity: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/User/checkActivity", "post", {
            phone: k()
        }, function(t) {
            var n = t.data.activity_status, a = t.data.activity_type, o = t.data.isAttend;
            "on" == n && "yes" == o ? e.setData({
                sendVip: !0
            }) : "on" == n && "no" == o ? e.setData({
                sendVip: !1,
                activity_type: a
            }) : "off" == n && e.setData({
                sendVip: !0
            });
        });
    },
    sendVip: function(e, t) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/User/sendVip", "post", {
            phone: k(),
            token: f(),
            activity_type: e
        }, function(e) {
            t(e);
        });
    },
    userUseVip: function() {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/User/userUseVip", "post", {
            phone: k(),
            token: f()
        }, function(e) {});
    },
    remainNumber1: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/User/remainCount1", "get", {
            token: f(),
            phone: k()
        }, function(t) {
            e(t);
        });
    },
    deductionTimes: function() {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/User/deductionTimes", "post", {
            token: f(),
            phone: k()
        }, function(e) {});
    },
    setDeviceInfo: function(e) {
        r = e;
    },
    getDeviceInfo: function() {
        return r;
    },
    setIsConnected: function(e) {
        e = e;
    },
    getIsConnected: function() {
        return null;
    },
    isLogin: _,
    loginToast: D,
    processBLEError: function(e) {
        wx.hideLoading({
            complete: function() {
                if (10001 == e.errCode) h("请开启手机蓝牙"); else if (-1 == e.errCode) h("连接成功！"); else if (10002 == e.errCode) h("没有找到蓝牙设备"); else if (10003 == e.errCode) h("蓝牙连接失败！"); else if (10004 == e.errCode) wx.showModal({
                    title: "重启蓝牙",
                    content: "请您前往系统设置 -> 蓝牙，重启蓝牙。（切勿在控制中心开关蓝牙）",
                    showCancel: !1
                }); else if (10006 == e.errCode) h("当前连接已经断开"); else if (10009 == e.errCode) wx.showModal({
                    title: "警告！",
                    content: "系统版本低于 4.3 不支持 BLE",
                    showCancel: !1
                }); else if (10012 == e.errCode) h("连接超时"); else {
                    if ("devtools" == wx.getSystemInfoSync().platform) return void console.log("在IDE的预览页面上弹框显示这个东西太烦人了，所以我不显示了，仅仅把这个问题打印出来: \n" + JSON.stringify(e));
                    wx.showModal({
                        title: "警告！",
                        content: "蓝牙适配器异常，错误码: ".concat(e.errCode, "，错误原因: ").concat(e.errMsg),
                        showCancel: !1
                    });
                }
            }
        });
    },
    getDumpNicksInStorage: b,
    setDumpNicksToStorage: function(e) {
        wx.setStorageSync("dump_nicks", e);
    },
    getDumpNickNameByUUID: function(e) {
        var t = b();
        return e in t ? t[e] : void 0;
    },
    saveCard: function(e, t) {
        return x(e, t, function() {
            return n.saveDumpDatasToFile();
        });
    },
    getDumpNicks: S,
    createDefaultNick: m,
    newCard: function(e, t) {
        var a = t.cardName, o = t.type;
        return x(e, a, function() {
            return n.makeDatasSaveToFile({
                type: "".concat(o)
            });
        });
    },
    getCardDataList: function(e) {
        if ("local" == w()) {
            var t = n.getCardDataFileList(), o = n.getStorageSyncHasDefault("dump_nicks", {});
            if (null == o || "{}" == JSON.stringify(o)) return e([]), !1;
            var i = [];
            if (t.length > 0) for (var r = 0; r < t.length; r++) {
                var p, c = t[r], s = n.getCardDataDumpInfo(c);
                p = s.tag_info.tag_type == a.TAG_TYPE_LF_EM410X ? "#008EF5" : "#f5a200", i.push({
                    nick: o[c],
                    type: s.tag_info.tag_type == a.TAG_TYPE_LF_EM410X ? "ID" : "IC",
                    checked: !1,
                    uuid: c,
                    color: p,
                    show: !0
                });
            }
            e(i);
        } else C(function(t) {
            e(t);
        });
    },
    getTheCloudData: C,
    localDataSaveCloud: function(e) {
        var t = S(), a = n.getStorageSyncHasDefault("folderData", {});
        for (var o in t) {
            var i = n.getCardDataDumpInfo(o), r = a[o];
            null == r && (r = "/");
            l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/SaveCardData/newLocalDataSaveCloud", "post", {
                phone: k(),
                token: f(),
                dumpName: t[o],
                data: JSON.stringify(i),
                uuid: o,
                path: r
            }, function(t) {
                e(t);
            });
        }
    },
    cloudDataSaveToLocal: function() {
        C(function(e) {
            if (e.length <= 0) h("云端没有卡片数据"); else {
                s = e;
                for (var t = S(), a = 0; a < e.length; a++) {
                    var o = n.getStorageSyncHasDefault("dump_file_list", []);
                    o.push(e[a].uuid), wx.setStorageSync("dump_file_list", o), t[e[a].uuid] = e[a].nick, 
                    wx.setStorageSync("dump_nicks", t);
                    var i = {
                        tag_info: e[a].tag_info,
                        tag_data: e[a].tag_data,
                        tag_date: e[a].tag_date
                    };
                    wx.setStorageSync("dump_file_uuid_".concat(e[a].uuid), i);
                }
                T(function(e) {
                    h(1 == e ? "数据迁移成功" : "数据迁移失败");
                });
            }
        });
    },
    exportCardData: function() {
        return s;
    },
    deleteCloudData: T,
    removeLocalDataStorage: function() {
        for (var e = n.getStorageSyncHasDefault("dump_file_list", []), t = 0; t < e.length; t++) {
            [ "dump_nicks", "dump_file_list", "dump_file_uuid_".concat(e[t]) ].forEach(function(e) {
                try {
                    wx.removeStorageSync(e);
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    console.err(e);
                }
            });
        }
    },
    saveDataToTheCloud: function(e, t, a, o, i, r) {
        var c, s;
        if (0 == (u = _())) return D(), !1;
        if (1 == o) {
            if (null == a) return void h("数据为空，请重新读卡或者添加卡片");
            c = a, s = e;
        } else if (2 == o) {
            s = "" == t.cardName ? p : t.cardName;
            var u, d = t.type;
            if (null == (u = n.makeTemplateTagData({
                type: "".concat(d)
            }))) return void h("数据为空，请重新读卡或者添加卡片");
            c = u;
        }
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/SaveCarddata/insertData", "post", {
            phone: k(),
            token: f(),
            current_path: i,
            dumpName: s,
            data: JSON.stringify(c)
        }, function(e) {
            r(e);
        });
    },
    createDefaultNickCloud: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/SaveCarddata/getDatas", "post", {
            phone: k(),
            token: f()
        }, function(t) {
            for (var n = {}, a = 0; a < t.data.data.length; a++) n[t.data.data[a].uuid] = t.data.data[a].nick_name;
            var o = 0;
            for (var i in n) try {
                var r = n[i].match(/家里门卡(\d*)/);
                if (null != r) {
                    r = r[1];
                    var c = parseInt(r);
                    c > o && (o = c);
                }
            } catch (e) {
                e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                console.error("在迭代卡包名称以生成默认值是出现异常: " + e);
            }
            p = t = "家里门卡" + (o + 1), e(t);
        });
    },
    deleteCardData: function(e, t) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/SaveCarddata/deleteCarddata", "post", {
            phone: k(),
            token: f(),
            uuid: e
        }, function(e) {
            t(e);
        });
    },
    queryCloudData: function(e, t) {
        if (0 == _()) return D(), !1;
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/SaveCarddata/queryCloudData", "post", {
            phone: k(),
            token: f(),
            uuid: e
        }, function(e) {
            t(e);
        });
    },
    cloudOrLocal: w,
    setDefaultName: function(e) {
        p = e;
    },
    upCloudData: function(e, t, n) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/SaveCarddata/updateCloudData", "post", t = {
            phone: k(),
            token: f(),
            uuid: e,
            data: JSON.stringify(t)
        }, function(e) {
            n(e);
        });
    },
    upCloudNick: function(e, t, n) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/SaveCarddata/upCloudNick", "post", {
            phone: k(),
            token: f(),
            uuid: e,
            nick_name: t
        }, function(e) {
            n(e);
        });
    },
    defaultSave: function() {
        var e = S(), t = n.getStorageSyncHasDefault("saveAddress", []);
        console.log("数据存放位置: " + t), Object.keys(e).length >= 0 && wx.setStorageSync("saveAddress", "local"), 
        Object.keys(e).length <= 0 && "cloud" == t && wx.setStorageSync("saveAddress", "cloud"), 
        Object.keys(e).length <= 0 && "local" == t && wx.setStorageSync("saveAddress", "local"), 
        Object.keys(e).length <= 0 && Object.keys(t).length <= 0 && wx.setStorageSync("saveAddress", "cloud");
    },
    defaultExpertMode: function() {
        var e = n.getStorageSyncHasDefault("turnOnExpertMode", {});
        return 1 == e ? (wx.setStorageSync("turnOnExpertMode", !0), !0) : 0 == e ? (wx.setStorageSync("turnOnExpertMode", !1), 
        !1) : Object.keys(e).length <= 0 ? (wx.setStorageSync("turnOnExpertMode", !0), !0) : void 0;
    },
    save_nickname: function(e, t) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Userinfo/saveNickname", "post", {
            phone: k(),
            token: f(),
            nickname: e
        }, function(e) {
            t(e);
        });
    },
    get_nickname: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Userinfo/getNickname", "post", {
            phone: k(),
            token: f()
        }, function(t) {
            e(t);
        });
    },
    up_head_portrait: function(e, t) {
        var n = f(), a = k();
        wx.uploadFile({
            url: u + "Userinfo/upHeadPortrait",
            filePath: e,
            name: "file",
            formData: {
                phone: a,
                token: n
            },
            success: function(e) {
                "token已经过期" != e ? t(JSON.parse(e.data)) : v();
            },
            fail: function(e) {
                console.log("错误的原因是" + JSON.stringify(e));
            }
        });
    },
    downImg: function(e) {
        var t = f(), n = k();
        wx.downloadFile({
            url: u + "Userinfo/getHeadPortrait?" + "phone=".concat(n, "&token=").concat(t),
            success: function(t) {
                (console.log("999 " + JSON.stringify(t)), 200 === t.statusCode) ? wx.getFileSystemManager().saveFile({
                    tempFilePath: t.tempFilePath,
                    success: function(t) {
                        wx.setStorageSync("image_cache", t.savedFilePath), e(t.savedFilePath);
                    }
                }) : console.log("响应失败", t.statusCode);
            }
        });
    },
    getHeadPortrait: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Userinfo/getHeadPortrait", "post", {
            phone: k(),
            token: f()
        }, function(t) {
            e(t);
        });
    },
    all_head_portrait: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Userinfo/allHeadPortrait", "post", {
            phone: k(),
            token: f()
        }, function(t) {
            e(t);
        });
    },
    myRanking: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Userinfo/myRanking", "post", {
            phone: k(),
            token: f()
        }, function(t) {
            e(t);
        });
    },
    all_gold_coin: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Userinfo/allGoldCoin", "post", {
            phone: k(),
            token: f()
        }, function(t) {
            e(t);
        });
    },
    exchangeCertificate: function(e, t) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/exchangecertificate/exchangeCertificate", "post", {
            phone: k(),
            token: f(),
            exchangeCode: e
        }, function(e) {
            t(e);
        });
    },
    taskRecord: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Taskrecord/taskRecord", "post", {
            phone: k(),
            token: f()
        }, function(t) {
            e(t);
        });
    },
    goldDetails: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Goldcoin/goldDetails", "post", {
            phone: k(),
            token: f()
        }, function(t) {
            e(t);
        });
    },
    creatDefaultUserName: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Userinfo/creatDefaultUserName", "post", {
            phone: k(),
            token: f()
        }, function(t) {
            e(t);
        });
    },
    getNavHeight: function(e) {
        e(wx.getMenuButtonBoundingClientRect().top);
    },
    calculatedAmount: function(e, t, n, a, o, i, r) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Goldcoindeductions/calculatedAmount", "post", {
            phone: k(),
            token: f(),
            id: e,
            purchase_count: t,
            choose: n,
            select_index: a,
            userInputStatus: o,
            userInputGoldCoin: i
        }, function(e) {
            r(e);
        });
    },
    goldCoinGoods: function(e, t) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Goldcoin/queryGoods", "post", {
            phone: k(),
            currentPage: e
        }, function(e) {
            t(e);
        });
    },
    queryGoodsById: function(e, t) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Goldcoin/queryGoodsById", "post", {
            phone: k(),
            token: f(),
            id: e
        }, function(e) {
            t(e);
        });
    },
    goToPay: function(e, t) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Goldcoincash/prepayId", "post", {
            phone: k(),
            token: f(),
            db_order_number: e
        }, function(e) {
            t(e);
        });
    },
    gold_coin_count: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Goldcoin/goldCoinCount", "post", {
            phone: k(),
            token: f()
        }, function(t) {
            e(t.data);
        });
    },
    queryHistory: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Mallorder/queryOrderHistory", "post", {
            phone: k(),
            token: f()
        }, function(t) {
            e(t);
        });
    },
    queryOrderInfo: function(e, t) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Mallorder/queryOrderInfo", "post", {
            phone: k(),
            token: f(),
            dborder_number: e
        }, function(e) {
            var n, a, o, i, r, p, c, s = e.data, u = JSON.parse(s[0].goods_info), d = s[0].goods_need_gold_coins, l = s[0].deduct_gold_coins, h = s[0].price_after_discount, f = s[0].order_status, g = s[0].order_payment_status;
            "true" == f || "cancel" == f || "true" == g || "false" == f ? c = !0 : "success" == f && (c = !1), 
            p = "false" == f && "true" == g, n = null != d || 0 != l, a = null != h, o = null != s[0].express_information && "false" == f && "true" == g, 
            i = null == d && "false" == f && "false" == g, r = null == d && "false" == f && "false" == g;
            var k = {
                id: s[0].id,
                goods_id: u.goods_id,
                select_index: u.select_index,
                goods_name: u.goods_name,
                classification_name: u.classification_name,
                classification_img: u.classification_img,
                purchase_count: u.purchase_count,
                goods_need_gold_coins: d,
                order_create_time: s[0].order_create_time,
                deduct_gold_coins: l,
                price_after_discount: h,
                goodsToBeReceivedShow: p,
                goldCoinShow: n,
                moneyShow: a,
                orderStatusShow: c,
                orderRemainingTimeShow: r,
                goToPayShow: i,
                confirmReceiptShow: o,
                payment_amount: s[0].payment_amount,
                order_payment_status: g,
                order_status: f,
                receiving_time: s[0].receiving_time,
                express_information: JSON.parse(s[0].express_information),
                address_info: JSON.parse(s[0].address_info),
                item_order_number: s[0].item_order_number
            };
            t(k);
        });
    },
    cancelOrder: function(e, t) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Mallorder/cancelOrder", "post", {
            phone: k(),
            token: f(),
            dborder_number: e
        }, function(e) {
            t(e);
        });
    },
    confirmReceipt: function(e, t) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Mallorder/confirmReceipt", "post", {
            phone: k(),
            token: f(),
            id: e
        }, function(e) {
            t(e);
        });
    },
    checkSign: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Newsignin/checkSign", "post", {
            phone: k(),
            token: f()
        }, function(t) {
            e(t.data);
        });
    },
    sign_in: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Newsignin/SignIn", "post", {
            phone: k(),
            token: f()
        }, function(t) {
            e(t.data);
        });
    },
    getContinuousTime: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Newsignin/getContinuousTime", "post", {
            phone: k(),
            token: f()
        }, function(t) {
            e(t.data);
        });
    },
    checkTaoBaoPraise: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Taobaopraise/checkStatue", "post", {
            phone: k(),
            token: f()
        }, function(t) {
            e(t.data);
        });
    },
    checkFeedback: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Feedback/checkStatue", "post", {
            phone: k(),
            token: f()
        }, function(t) {
            e(t.data);
        });
    },
    checkTiktokStatus: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Tiktok/checkStatue", "post", {
            phone: k(),
            token: f()
        }, function(t) {
            e(t.data);
        });
    },
    check_video_rewards_count: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Videorewards/newCheckVideoReward", "post", {
            phone: k(),
            token: f()
        }, function(t) {
            e(t.data);
        });
    },
    queryTheReceivingAddress: O,
    pullAddressData: function(e) {
        O(function(t) {
            if (1 == t.data.status) {
                for (var n = t.data.data, a = 0; a < n.length; a++) {
                    n[a].phone = n[a].receiving_phone;
                    var o = n[a].receiving_phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
                    n[a].receiving_phone = o, n[a].checked = !1;
                }
                var i = {}, r = 0;
                n.forEach(function(e, t) {
                    if ("true" === e.default_address) return i = e, n.splice(t, 1), void (r = 1);
                }), 1 == r && n.unshift(i), e(n);
            } else e([]);
        });
    },
    saveTheReceivingAddress: function(e, t, n, a, o) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Shippingaddress/saveShippingaddress", "post", {
            phone: k(),
            token: f(),
            consignee: e,
            receiving_phone: t,
            address: n,
            default_address: a
        }, function(e) {
            o(e);
        });
    },
    updateShippingaddress: function(e, t, n, a, o, i) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Shippingaddress/updateShippingaddress", "post", {
            phone: k(),
            token: f(),
            consignee: e,
            receiving_phone: t,
            address: n,
            default_address: a,
            address_id: o
        }, function(e) {
            i(e);
        });
    },
    updateHistoryaddress: function(e, t, n, a, o, i, r) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Shippingaddress/newUpdateHistoryaddress", "post", {
            phone: k(),
            token: f(),
            id: e,
            mail_address: t,
            consignee: n,
            receiving_phone: a,
            address: o,
            address_id: i
        }, function(e) {
            r(e);
        });
    },
    deleteTheReceivingAddress: function(e, t) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Shippingaddress/deleteShippingaddress", "post", {
            phone: k(),
            token: f(),
            id: e
        }, function(e) {
            t(e);
        });
    },
    identificationAddress: function(e, t) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Addressresolution/identificationAddress", "post", {
            phone: k(),
            token: f(),
            address: e
        }, function(e) {
            t(e);
        });
    },
    queryLogData: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Updatelog/queryData", "get", {}, function(t) {
            e(t);
        });
    },
    randomUuid: function() {
        for (var e = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ], t = "", n = 0; n < 32; n++) {
            t += e[Math.floor(62 * Math.random())];
        }
        return t;
    },
    judegPhone: function(e) {
        if ("" == e) return h("联系方式不能为空！"), !1;
        for (var t = "~·`!！@#$￥%^…&*()（）—-_=+[]{}【】、|\\;:；：'\"“‘,./<>《》?？，。", n = t.length, a = 0; a < n; a++) if (-1 != e.indexOf(t.substring(a, a + 1))) return h("联系方式存在特殊字符"), 
        !1;
    },
    get_video_list: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Videorewards/newRewardsSelect", "post", {
            phone: k(),
            token: f()
        }, function(t) {
            e(t);
        });
    },
    query_video_platform: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Videorewards/queryVideoPlatform", "post", {
            phone: k(),
            token: f()
        }, function(t) {
            e(t.data);
        });
    },
    isBluetoothAndGPSNoCheckEnable: function() {
        return n.getStorageSyncHasDefault("preference_check_ble_gps_settings", !1);
    },
    setBluetoothAndGPSNoCheckEnable: function(e) {
        wx.setStorageSync("preference_check_ble_gps_settings", e);
    },
    createTagDataManagePassword: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Importexport/createPassword", "post", {
            phone: k(),
            token: f()
        }, function(t) {
            e(t.data);
        });
    },
    updateTagDataManagePassword: function(e, t) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Importexport/updateTagDataManagePassword", "post", {
            phone: k(),
            token: f(),
            password: e
        }, function(e) {
            t(e.data);
        });
    },
    pullPasswordAndLink: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Importexport/pullPasswordAndLink", "post", {
            phone: k(),
            token: f()
        }, function(t) {
            e(t.data);
        });
    },
    submitShareData: function(e, t, n, a, o) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Datasharing/dataSharingInsert", "post", {
            phone: k(),
            token: f(),
            card_name: e,
            acceptData: JSON.stringify(t),
            access_code: n,
            closing_date: a
        }, function(e) {
            o(e);
        });
    },
    pullShareData: function(e) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Datasharing/pullShareData", "post", {
            phone: k(),
            token: f()
        }, function(t) {
            0 !== t.data ? e(t) : e([]);
        });
    },
    deleteShareData: function(e, t) {
        l("https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Datasharing/deleteShareData", "post", {
            phone: k(),
            token: f(),
            id: e
        }, function(e) {
            t(e);
        });
    },
    createShareLinkMessage: function(e, t, n, a) {
        var o = "".concat(e, "给您分享了一个数据，快来看看吧"), i = "链接: https://rcopy.nikola-lab.cn/sharedump?code=".concat(t);
        a && n.length > 0 && (i += "&pwd=".concat(n));
        var r = "".concat(o, "\n").concat(i);
        return n.length > 0 && (r += "\n访问码: ".concat(n)), r;
    },
    createShareFriendMessage: function(e, t, n, a) {
        return "string" != typeof n && (n = ""), a || (n = ""), {
            title: "".concat(e, "给您分享了一个卡包"),
            imageUrl: "https://static.nikola-lab.cn/we-chat-app/share.jpg",
            path: "/pages/card-wallet-list/list?src=share&code=".concat(t, "&pwd=").concat(n),
            success: function(e) {}
        };
    },
    gotoCreateShareOrLogin: function(e, t) {
        if (_()) {
            var n = encodeURIComponent(JSON.stringify(t));
            wx.navigateTo({
                url: "/pages/card-dump-share-create/index?data=".concat(n, "&name=").concat(e)
            });
        } else wx.navigateTo({
            url: "/pages/user-login-onekey/login"
        });
    },
    isCardWalletListFunctionBtnsEnable: function() {
        return n.getStorageSyncHasDefault("preference_show_wallet_list_function_btns", !0);
    },
    setCardWalletListFunctionBtnsEnable: function(e) {
        wx.setStorageSync("preference_show_wallet_list_function_btns", e);
    },
    pullImageAndCache: function(e, t, n) {
        var a = wx.getFileSystemManager(), o = "".concat(wx.env.USER_DATA_PATH, "/img"), i = "".concat(o, "/").concat(e);
        try {
            a.accessSync(o);
        } catch (e) {
            e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
            a.mkdirSync(o, !0);
        }
        try {
            a.accessSync(i), n(i), console.log("3D旋转图片的本地文件已经存在，将自动使用本地文件");
        } catch (e) {
            e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
            wx.downloadFile({
                filePath: i,
                url: t,
                success: function(e) {
                    200 == e.statusCode ? (n(i), console.log("3D旋转图片下载成功，后续将直接使用此本地文件！")) : console.error("下载3D旋转图失败: ".concat(JSON.stringify(e)));
                }
            });
        }
    },
    systemInfo: d
};