var e = require("@babel/runtime/helpers/typeof.js"), t = require("275D798255C842DF413B1185FE3585D7.js"), n = require("6B5F0E3755C842DF0D39663027C585D7.js"), a = require("43635B5055C842DF2505335752E585D7.js"), o = require("A3859AB555C842DFC5E3F2B2FA5585D7.js"), c = require("9434A3B355C842DFF252CBB492D585D7.js"), i = null, s = "家里门卡1", r = "minicopy", u = "https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/", d = {
    platform: "",
    mpenv: ""
};

function l(e) {
    wx.showToast({
        title: e,
        icon: "none",
        duration: 1e3
    });
}

function p() {
    return n.getStorageSyncHasDefault("token", {});
}

function f() {
    var e = n.getStorageSyncHasDefault("phoneObj", null);
    return null != e && (e = e.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")), e;
}

function g() {
    return n.getStorageSyncHasDefault("phoneObj", {});
}

function h() {
    [ "token", "phoneObj", "image_cache" ].forEach(function(e) {
        try {
            wx.removeStorageSync(e);
        } catch (e) {
            e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
            console.err(e);
        }
    });
}

function y() {
    var e = p(), t = g();
    if (Object.keys(t).length <= 0) return wx.navigateTo({
        url: "/pages/user-login-onekey/login"
    }), !1;
    wx.request({
        url: u + "Checktoken/checkToken",
        data: {
            phone: t,
            token: e
        },
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            0 == e.data.status && (h(), wx.navigateTo({
                url: "/pages/user-login-onekey/login"
            }));
        },
        fail: function(e) {
            console.log(e);
        }
    });
}

function v() {
    var e = g();
    return !(Object.keys(e).length <= 0);
}

function _() {
    return n.getStorageSyncHasDefault("dump_nicks", {});
}

function m() {
    return n.getStorageSyncHasDefault("dump_nicks", {});
}

function k() {
    var e = m();
    console.log("本地的缓存是" + JSON.stringify(e));
    var t = 0;
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

function S(e, t) {
    var n = m();
    for (var a in n) if (n[a] == e) return {
        isok: !1,
        uuid: null,
        message: "已经存在相同名称的卡片了"
    };
    var o = t();
    return 0 == e.length && (e = k()), null == o ? void util.showToast("检测到数据为空，请重新读卡") : (n[o] = e, 
    wx.setStorageSync("dump_nicks", n), {
        isok: !0,
        uuid: o,
        message: "保存成功"
    });
}

function w(t) {
    var n = g(), o = p();
    wx.request({
        url: u + "SaveCarddata/getDatas",
        data: {
            phone: n,
            token: o
        },
        header: {
            "content-type": "application/json"
        },
        success: function(n) {
            if ("object" == e(n.data) && "data" in n.data) {
                for (var o = [], c = 0; c < n.data.data.length; c++) {
                    var i;
                    i = n.data.data[c].data.tag_info.tag_type == a.TAG_TYPE_LF_EM410X ? "#008EF5" : "#f5a200", 
                    o.push({
                        uuid: n.data.data[c].uuid,
                        nick: n.data.data[c].nick_name,
                        tag_data: n.data.data[c].data.tag_data,
                        tag_date: n.data.data[c].data.tag_date,
                        tag_info: n.data.data[c].data.tag_info,
                        type: n.data.data[c].data.tag_info.tag_type == a.TAG_TYPE_LF_EM410X ? "ID" : "IC",
                        checked: !1,
                        color: i,
                        show: !0
                    });
                }
                t(o);
            } else t([]);
        },
        fail: function(e) {
            console.log("迁移数据返回来的错误信息是" + e);
        }
    });
}

function x() {
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

function C() {
    var e = n.getStorageSyncHasDefault("saveAddress", {});
    return console.log("saveAddress是" + JSON.stringify(e)), Object.keys(e).length <= 0 || "cloud" == e ? "cloud" : "local";
}

function D(e) {
    y();
    var t = p(), n = g();
    wx.request({
        url: u + "SaveCardData/deleteCloudData",
        data: {
            phone: n,
            token: t
        },
        header: {
            "content-type": "application/json"
        },
        success: function(t) {
            console.log("云端返回来的数据是" + JSON.stringify(t.data)), e(t.data);
        },
        fail: function(e) {
            console.log(e);
        }
    });
}

function q(e) {
    y();
    var t = p(), n = g();
    wx.request({
        url: u + "Shippingaddress/queryShippingAddress",
        method: "post",
        data: {
            token: t,
            phone: n
        },
        header: {
            "content-type": "application/json"
        },
        success: function(t) {
            e(t);
        },
        fail: function(e) {
            console.log(e);
        }
    });
}

function j() {
    for (var e = c.getReadTagHistoryKeys(), t = [], n = 0; n < e.length; n++) {
        for (var a = c.getCacheKeys4Mifare(e[n].uid), o = [], i = 0; i < a.length; i++) -1 == o.indexOf(a[i]) && o.push(a[i]);
        t.push({
            name: "keys_" + e[n].uid,
            key_array: o
        });
    }
    return t;
}

function T(e, t) {
    var n = p(), a = g();
    wx.request({
        url: u + "Tagkey/" + t,
        method: "post",
        data: {
            phone: a,
            token: n
        },
        header: {
            "content-type": "application/json"
        },
        success: function(t) {
            if (1 == t.data.status) {
                if ("delete" == e) return void l("删除成功");
                l(t.data.msg);
            } else l(t.data.msg);
        },
        fail: function(e) {
            console.log(e);
        }
    });
}

module.exports = {
    deleteCloudRCCHData: function(e) {
        var t = p(), n = g();
        wx.request({
            url: u + "Tagkey/deleteCloudRCCHData",
            method: "post",
            data: {
                phone: n,
                token: t,
                uuid: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                e.data.status, l(e.data.msg);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    updateCloudKey: function(e, t, n) {
        if ("userKey" == n) var a = c.getUserCustomTagKey(); else if ("RCCHKey" == n) {
            var o = c.getCacheKeys4Mifare(t);
            (a = []).push({
                name: "keys_".concat(t).toLowerCase(),
                key_array: o
            });
        }
        var i = p(), s = g();
        wx.request({
            url: u + "Tagkey/updateCloudKey",
            method: "post",
            data: {
                phone: s,
                token: i,
                key_array: a,
                optionKey: n
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                if (1 == t.data.status) {
                    if ("edit" == e) return void l("密码更新已保存");
                    if ("delete" == e) return void l("删除成功！");
                } else l(t.data.msg);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    deleteCloudeKey: T,
    keyStoryPosition: function() {
        var e = n.getStorageSyncHasDefault("keyStory", []);
        return "cloud" == e ? "cloud" : Object.keys(e).length <= 0 || "local" == e ? "local" : void 0;
    },
    rCCHSaveToLocal: function() {
        var e = j(), t = p(), n = g();
        wx.request({
            url: u + "Tagkey/rCCHSaveToLocal",
            method: "post",
            data: {
                phone: n,
                token: t,
                key_array: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                if (1 == e.data.status) {
                    for (var t = e.data.data, n = 0; n < t.length; n++) {
                        var a = t[n].name, o = JSON.parse(t[n].key_array);
                        wx.setStorageSync(a, o);
                    }
                    T("option", "deleteCloudAllRCCHData");
                } else l(e.data.msg);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    mf1UserSaveToLocal: function() {
        var e = c.getUserCustomTagKey(), t = p(), n = g();
        wx.request({
            url: u + "Tagkey/mf1UserSaveToLocal",
            method: "post",
            data: {
                phone: n,
                token: t,
                keysList: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                1 == e.data.status || 0 == e.data.status ? l(e.data.msg) : 2 == e.data.status && (wx.setStorageSync("keys_mf1_user", e.data.data), 
                T("option", "deleteCloudUserAllKeyData"));
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    saveKeysMf1User: function(e) {
        var t = c.getUserCustomTagKey(), n = p(), a = g();
        wx.request({
            url: u + "Tagkey/insertUserKeysData",
            method: "post",
            data: {
                phone: a,
                token: n,
                data: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                if (1 == t.data.status) {
                    var n = t.data.data;
                    console.log("要保存的数据 " + JSON.stringify(n)), function(e) {
                        for (var t = 0; t < e.length; t++) {
                            var n = e[t].name, a = JSON.parse(e[t].key_array);
                            wx.setStorageSync(n, a);
                        }
                    }(n), "add" == e ? l("添加成功") : "edit" == e ? l("密钥更新已保存") : "delete" == e && l("删除成功！"), 
                    l(t.data.msg);
                } else l(t.data.msg);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    saveReadCardHistory: function(e, t) {
        if ("All" == e) var n = j(); else if ("One" == e) {
            for (var a = c.getCacheKeys4Mifare(t), o = (n = [], []), i = 0; i < a.length; i++) -1 == o.indexOf(a[i]) && o.push(a[i]);
            n.push({
                name: "keys_".concat(t).toLowerCase(),
                key_array: o
            });
        }
        var s = p(), r = g();
        wx.request({
            url: u + "Tagkey/insertRCHData",
            method: "post",
            data: {
                phone: r,
                token: s,
                key_array: n,
                option: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                if (1 == t.data.status) {
                    if ("One" == e) return void console.log("保存成功！");
                    l(t.data.msg);
                } else l(t.data.msg);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    deviceConnectRecord: function(e) {
        var t = p(), n = g();
        wx.request({
            url: u + "Deviceconnectrecord/insertRecord",
            method: "post",
            data: {
                phone: n,
                token: t,
                serial: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                1 == e.data.status ? console.log("保存成功！") : console.log("保存失败！");
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    Freeedit: function(e, t) {
        var n = p(), a = g();
        wx.request({
            url: u + "Freeedit/createCode",
            data: {
                phone: a,
                token: n,
                uuid: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t(e);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    prohibition: function(e) {
        var t = p(), n = g();
        wx.request({
            url: u + "Prohibition/query",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    queryVoucherData: function(e) {
        var t = p(), n = g();
        wx.request({
            url: u + "Voucher/queryVoucherData",
            method: "get",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    redemptionVoucher: function(e, t) {
        var n = p(), a = g();
        wx.request({
            url: u + "Voucher/redemptionVoucher",
            method: "get",
            data: {
                phone: a,
                token: n,
                number_of_gold_coins: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t(e);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    judgeDeviceType: function() {
        if (t.hasDeviceConnected()) {
            var e = "device_type_".concat(o.getSerial()), a = n.getStorageSyncHasDefault(e, {});
            return Object.keys(a).length <= 0 ? r : a;
        }
    },
    isSVIPDevice: function(e) {
        var t = p(), n = g();
        wx.request({
            url: u + "Querydevicetype/getRcopyType",
            method: "get",
            data: {
                phone: n,
                token: t,
                serial: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                r = e.data.data;
                var t = "device_type_".concat(o.getSerial());
                wx.setStorageSync(t, r);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    getRequestUrl: function() {
        return u;
    },
    judgeSystemType: function() {
        return "".concat(d.mpenv, ":").concat(d.platform);
    },
    obtain: p,
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
    checkToken: y,
    getHidePhone: f,
    getPhone: g,
    removeAppStorage: h,
    judgePhoneNumber: function(e) {
        var t = f();
        return e.setData({
            phone: t
        }), t;
    },
    showToast: l,
    remainNumber: function(e) {
        y();
        var t = p(), n = g();
        wx.request({
            url: u + "User/remainCount",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                var n = t.data.data.remain_count, a = t.data.data.vip_end_date, o = t.data.data.expirationTime;
                if ("会员已过期" == t.data.data.expirationTime) {
                    o = "会员已过期", n = t.data.data.remain_count;
                    return e(n, a, o), !1;
                }
                e(n, a, o);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    checkActivity: function(e) {
        var t = g();
        wx.request({
            url: u + "User/checkActivity",
            data: {
                phone: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log("获取到的活动数据是 " + JSON.stringify(t.data));
                var n = t.data.activity_status, a = t.data.activity_type, o = t.data.isAttend;
                "on" == n && "yes" == o ? e.setData({
                    sendVip: !0
                }) : "on" == n && "no" == o ? e.setData({
                    sendVip: !1,
                    activity_type: a
                }) : "off" == n && e.setData({
                    sendVip: !0
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    sendVip: function(e, t) {
        y();
        var n = p(), a = g();
        wx.request({
            url: u + "User/sendVip",
            data: {
                phone: a,
                token: n,
                activity_type: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t(e);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    userUseVip: function() {
        y();
        var e = p(), t = g();
        wx.request({
            url: u + "User/userUseVip",
            data: {
                phone: t,
                token: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                console.log("用户使用了vip" + JSON.stringify(e));
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    remainNumber1: function(e) {
        y();
        var t = p(), n = g();
        wx.request({
            url: u + "User/remainCount1",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log("剩余的次数是 " + JSON.stringify(t));
                var n = t.data.data.remain_count, a = t.data.data.vip_end_date, o = t.data.data.expirationTime;
                e(n, a, o);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    deductionTimes: function() {
        y();
        var e = p(), t = g();
        wx.request({
            url: u + "User/deductionTimes",
            data: {
                phone: t,
                token: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                console.log("获取到的活动数据是 " + JSON.stringify(e));
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    setDeviceInfo: function(e) {
        i = e;
    },
    getDeviceInfo: function() {
        return i;
    },
    setIsConnected: function(e) {
        e = e;
    },
    getIsConnected: function() {
        return null;
    },
    isVip: function() {
        y();
        var e = p(), t = g();
        wx.request({
            url: u + "User/isVIP",
            data: {
                phone: t,
                token: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                if (console.log("用户使用了vip111" + JSON.stringify(e)), "会员已过期" == e.data.data.expirationTime) {
                    return !1;
                }
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    login: function() {
        y();
        var e = g();
        if (console.log("phone是" + e), null == e) return console.log("请先登录"), !1;
    },
    isLogin: v,
    loginToast: x,
    processBLEError: function(e) {
        wx.hideLoading({
            complete: function() {
                if (10001 == e.errCode) l("请开启手机蓝牙"); else if (-1 == e.errCode) l("连接成功！"); else if (10002 == e.errCode) l("没有找到蓝牙设备"); else if (10003 == e.errCode) l("蓝牙连接失败！"); else if (10004 == e.errCode) wx.showModal({
                    title: "重启蓝牙",
                    content: "请您前往系统设置 -> 蓝牙，重启蓝牙。（切勿在控制中心开关蓝牙）",
                    showCancel: !1
                }); else if (10006 == e.errCode) l("当前连接已经断开"); else if (10009 == e.errCode) wx.showModal({
                    title: "警告！",
                    content: "系统版本低于 4.3 不支持 BLE",
                    showCancel: !1
                }); else if (10012 == e.errCode) l("连接超时"); else {
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
    getDumpNicksInStorage: _,
    setDumpNicksToStorage: function(e) {
        wx.setStorageSync("dump_nicks", e);
    },
    getDumpNickNameByUUID: function(e) {
        var t = _();
        return e in t ? t[e] : void 0;
    },
    saveCard: function(e) {
        return S(e, function() {
            return n.saveDumpDatasToFile();
        });
    },
    getDumpNicks: m,
    createDefaultNick: k,
    newCard: function(e) {
        var t = e.cardName, a = e.type;
        return S(t, function() {
            return n.makeDatasSaveToFile({
                type: "".concat(a)
            });
        });
    },
    getCardDataList: function(e) {
        if ("local" == C()) {
            var t = n.getCardDataFileList(), o = n.getStorageSyncHasDefault("dump_nicks", {});
            if (null == o || "{}" == JSON.stringify(o)) return e([]), !1;
            var c = [];
            if (t.length > 0) for (var i = 0; i < t.length; i++) {
                var s, r = t[i], u = n.getCardDataDumpInfo(r);
                s = u.tag_info.tag_type == a.TAG_TYPE_LF_EM410X ? "#008EF5" : "#f5a200", c.push({
                    nick: o[r],
                    type: u.tag_info.tag_type == a.TAG_TYPE_LF_EM410X ? "ID" : "IC",
                    checked: !1,
                    uuid: r,
                    color: s,
                    show: !0
                });
            }
            e(c);
        } else w(function(t) {
            e(t);
        });
    },
    getTheCloudData: w,
    localDataSaveCloud: function(e) {
        y();
        var t = p(), a = g(), o = m();
        for (var c in o) {
            var i = n.getCardDataDumpInfo(c);
            wx.request({
                url: u + "SaveCardData/localDataSaveCloud",
                method: "post",
                data: {
                    phone: a,
                    token: t,
                    dumpName: o[c],
                    data: JSON.stringify(i),
                    uuid: c
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(t) {
                    console.log("云端返回来的数据是" + JSON.stringify(t.data)), e(t.data);
                },
                fail: function(e) {
                    console.log(e);
                }
            });
        }
    },
    cloudDataSaveToLocal: function() {
        w(function(e) {
            if (console.log("从云端获取的数据需要保存到本地" + JSON.stringify(e)), e.length <= 0) l("云端没有数据"); else {
                for (var t = m(), a = 0; a < e.length; a++) {
                    var o = n.getStorageSyncHasDefault("dump_file_list", []);
                    o.push(e[a].uuid), wx.setStorageSync("dump_file_list", o), t[e[a].uuid] = e[a].nick, 
                    console.log("这里的nick_history是" + JSON.stringify(t)), wx.setStorageSync("dump_nicks", t);
                    var c = {
                        tag_info: e[a].tag_info,
                        tag_data: e[a].tag_data,
                        tag_date: e[a].tag_date
                    };
                    wx.setStorageSync("dump_file_uuid_".concat(e[a].uuid), c);
                }
                D(function(e) {
                    l(1 == e ? "数据迁移成功" : "数据迁移失败");
                });
            }
        });
    },
    deleteCloudData: D,
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
    saveDataToTheCloud: function(e, t, a, o, c) {
        if (0 == (h = v())) return x(), !1;
        y();
        var i, r, d = p(), f = g();
        if (1 == o) {
            if (null == a) return void l("数据为空，请重新读卡或者添加卡片");
            i = a, r = e;
        } else if (2 == o) {
            r = "" == t.cardName ? s : t.cardName;
            var h, _ = t.type;
            if (null == (h = n.makeTemplateTagData({
                type: "".concat(_)
            }))) return void l("数据为空，请重新读卡或者添加卡片");
            i = h;
        }
        wx.request({
            url: u + "SaveCarddata/newInsertData",
            method: "post",
            data: {
                phone: f,
                token: d,
                dumpName: r,
                data: JSON.stringify(i)
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                c(e);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    createDefaultNickCloud: function(e) {
        var t = g(), n = p();
        wx.request({
            url: u + "SaveCarddata/getDatas",
            data: {
                phone: t,
                token: n
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                for (var n = {}, a = 0; a < t.data.data.length; a++) n[t.data.data[a].uuid] = t.data.data[a].nick_name;
                var o = 0;
                for (var c in n) try {
                    var i = n[c].match(/家里门卡(\d*)/);
                    if (null != i) {
                        i = i[1];
                        var r = parseInt(i);
                        r > o && (o = r);
                    }
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    console.error("在迭代卡包名称以生成默认值是出现异常: " + e);
                }
                s = t = "家里门卡" + (o + 1), e(t);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    deleteCardData: function(e, t) {
        y();
        var n = p(), a = g();
        wx.request({
            url: u + "SaveCardData/deleteCarddata",
            data: {
                uuid: e,
                token: n,
                phone: a
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t(e);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    queryCloudData: function(e, t) {
        if (0 == v()) return x(), !1;
        y();
        var n = g(), a = p();
        wx.request({
            url: u + "SaveCarddata/queryCloudData",
            data: {
                uuid: e,
                phone: n,
                token: a
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t(e);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    cloudOrLocal: C,
    setDefaultName: function(e) {
        s = e;
    },
    upCloudData: function(e, t, n) {
        y();
        var a = p(), o = g();
        wx.request({
            url: u + "SaveCardData/updateCloudData",
            data: {
                phone: o,
                token: a,
                uuid: e,
                data: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                n(e);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    upCloudNick: function(e, t, n) {
        y();
        var a = p(), o = g();
        wx.request({
            url: u + "SaveCardData/upCloudNick",
            data: {
                phone: o,
                token: a,
                uuid: e,
                nick_name: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                n(e);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    defaultSave: function() {
        var e = m(), t = n.getStorageSyncHasDefault("saveAddress", []);
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
        y();
        var n = p(), a = g();
        wx.request({
            url: u + "Userinfo/saveNickname",
            data: {
                phone: a,
                token: n,
                nickname: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t(e);
            }
        });
    },
    get_nickname: function(e) {
        y();
        var t = p(), n = g();
        wx.request({
            url: u + "Userinfo/getNickname",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t);
            }
        });
    },
    up_head_portrait: function(e, t) {
        y();
        var n = p(), a = g();
        wx.uploadFile({
            url: u + "Userinfo/upHeadPortrait",
            filePath: e,
            name: "file",
            formData: {
                phone: a,
                token: n
            },
            success: function(e) {
                t(JSON.parse(e.data));
            },
            fail: function(e) {
                console.log("错误的原因是" + JSON.stringify(e));
            }
        });
    },
    downImg: function(e) {
        var t = p(), n = g();
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
        y();
        var t = p(), n = g();
        wx.request({
            url: u + "Userinfo/getHeadPortrait",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t);
            }
        });
    },
    all_head_portrait: function(e) {
        y();
        var t = p(), n = g();
        wx.request({
            url: u + "Userinfo/allHeadPortrait",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t);
            }
        });
    },
    myRanking: function(e) {
        y();
        var t = p(), n = g();
        wx.request({
            url: u + "Userinfo/myRanking",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t);
            }
        });
    },
    all_gold_coin: function(e) {
        y();
        var t = p(), n = g();
        wx.request({
            url: u + "Userinfo/allGoldCoin",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t);
            }
        });
    },
    exchangeCertificate: function(e, t) {
        y();
        var n = p(), a = g();
        wx.request({
            url: u + "exchangecertificate/exchangeCertificate",
            data: {
                phone: a,
                token: n,
                exchangeCode: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t(e);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    taskRecord: function(e) {
        y();
        var t = p(), n = g();
        wx.request({
            url: u + "Taskrecord/taskRecord",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t);
            }
        });
    },
    goldDetails: function(e) {
        y();
        var t = p(), n = g();
        wx.request({
            url: u + "Goldcoin/goldDetails",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t);
            }
        });
    },
    creatDefaultUserName: function(e) {
        y();
        var t = p(), n = g();
        wx.request({
            url: u + "Userinfo/creatDefaultUserName",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t);
            }
        });
    },
    getNavHeight: function(e) {
        e(wx.getMenuButtonBoundingClientRect().top);
    },
    calculatedAmount: function(e, t, n, a, o, c, i) {
        y();
        var s = g(), r = p();
        wx.request({
            url: u + "Goldcoindeductions/calculatedAmount",
            data: {
                phone: s,
                token: r,
                id: e,
                purchase_count: t,
                choose: n,
                select_index: a,
                userInputStatus: o,
                userInputGoldCoin: c
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                i(e);
            }
        });
    },
    goldCoinGoods: function(e, t) {
        var n = g();
        wx.request({
            url: u + "Goldcoin/queryGoods",
            data: {
                phone: n,
                currentPage: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t(e);
            }
        });
    },
    queryGoodsById: function(e, t) {
        y();
        var n = p(), a = g();
        wx.request({
            url: u + "Goldcoin/queryGoodsById",
            data: {
                phone: a,
                token: n,
                id: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t(e);
            }
        });
    },
    goToPay: function(e, t) {
        wx.request({
            url: u + "Goldcoincash/prepayId",
            data: {
                phone: g(),
                token: p(),
                db_order_number: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t(e);
            }
        });
    },
    gold_coin_count: function(e) {
        y();
        var t = p(), n = g();
        wx.request({
            url: u + "Goldcoin/goldCoinCount",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t.data);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    queryHistory: function(e) {
        y();
        var t = g(), n = p();
        wx.request({
            url: u + "Mallorder/queryOrderHistory",
            data: {
                phone: t,
                token: n
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t);
            }
        });
    },
    queryOrderInfo: function(e, t) {
        y();
        var n = p(), a = g();
        wx.request({
            url: u + "Mallorder/queryOrderInfo",
            method: "post",
            data: {
                token: n,
                phone: a,
                dborder_number: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                var n, a, o, c, i, s, r, u = e.data, d = JSON.parse(u[0].goods_info), l = u[0].goods_need_gold_coins, p = u[0].deduct_gold_coins, f = u[0].price_after_discount, g = u[0].order_status, h = u[0].order_payment_status;
                "true" == g || "cancel" == g || "true" == h || "false" == g ? r = !0 : "success" == g && (r = !1), 
                s = "false" == g && "true" == h, n = null != l || 0 != p, a = null != f, o = null != u[0].express_information && "false" == g && "true" == h, 
                c = null == l && "false" == g && "false" == h, i = null == l && "false" == g && "false" == h;
                var y = {
                    id: u[0].id,
                    goods_id: d.goods_id,
                    select_index: d.select_index,
                    goods_name: d.goods_name,
                    classification_name: d.classification_name,
                    classification_img: d.classification_img,
                    purchase_count: d.purchase_count,
                    goods_need_gold_coins: l,
                    order_create_time: u[0].order_create_time,
                    deduct_gold_coins: p,
                    price_after_discount: f,
                    goodsToBeReceivedShow: s,
                    goldCoinShow: n,
                    moneyShow: a,
                    orderStatusShow: r,
                    orderRemainingTimeShow: i,
                    goToPayShow: c,
                    confirmReceiptShow: o,
                    payment_amount: u[0].payment_amount,
                    order_payment_status: h,
                    order_status: g,
                    receiving_time: u[0].receiving_time,
                    express_information: JSON.parse(u[0].express_information),
                    address_info: JSON.parse(u[0].address_info),
                    item_order_number: u[0].item_order_number
                };
                t(y);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    cancelOrder: function(e, t) {
        y();
        var n = p(), a = g();
        wx.request({
            url: u + "Mallorder/cancelOrder",
            method: "post",
            data: {
                token: n,
                phone: a,
                dborder_number: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t(e);
            }
        });
    },
    confirmReceipt: function(e, t) {
        y();
        var n = p(), a = g();
        wx.request({
            url: u + "Mallorder/confirmReceipt",
            method: "post",
            data: {
                token: n,
                phone: a,
                id: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t(e);
            }
        });
    },
    checkSign: function(e) {
        y();
        var t = p(), n = g();
        wx.request({
            url: u + "Newsignin/checkSign",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t.data);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    sign_in: function(e) {
        y();
        var t = p(), n = g();
        wx.request({
            url: u + "Newsignin/SignIn",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t.data);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    getContinuousTime: function(e) {
        y();
        var t = p(), n = g();
        wx.request({
            url: u + "Newsignin/getContinuousTime",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t.data);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    checkTaoBaoPraise: function(e) {
        y();
        var t = p(), n = g();
        wx.request({
            url: u + "Taobaopraise/checkStatue",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t.data);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    checkFeedback: function(e) {
        y();
        var t = p(), n = g();
        wx.request({
            url: u + "Feedback/checkStatue",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t.data);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    checkTiktokStatus: function(e) {
        y();
        var t = p(), n = g();
        wx.request({
            url: u + "Tiktok/checkStatue",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t.data);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    check_video_rewards_count: function(e) {
        y();
        var t = p(), n = g();
        wx.request({
            url: u + "Videorewards/newCheckVideoReward",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t.data);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    queryTheReceivingAddress: q,
    pullAddressData: function(e) {
        q(function(t) {
            if (1 == t.data.status) {
                for (var n = t.data.data, a = 0; a < n.length; a++) {
                    n[a].phone = n[a].receiving_phone;
                    var o = n[a].receiving_phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
                    n[a].receiving_phone = o, n[a].checked = !1;
                }
                var c = {}, i = 0;
                n.forEach(function(e, t) {
                    if ("true" === e.default_address) return c = e, n.splice(t, 1), void (i = 1);
                }), 1 == i && n.unshift(c), e(n);
            } else e([]);
        });
    },
    saveTheReceivingAddress: function(e, t, n, a, o) {
        y();
        var c = p(), i = g();
        wx.request({
            url: u + "Shippingaddress/saveShippingaddress",
            method: "post",
            data: {
                token: c,
                phone: i,
                consignee: e,
                receiving_phone: t,
                address: n,
                default_address: a
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                o(e);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    updateShippingaddress: function(e, t, n, a, o, c) {
        y();
        var i = p(), s = g();
        wx.request({
            url: u + "Shippingaddress/updateShippingaddress",
            method: "post",
            data: {
                token: i,
                phone: s,
                consignee: e,
                receiving_phone: t,
                address: n,
                default_address: a,
                address_id: o
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                c(e);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    updateHistoryaddress: function(e, t, n, a, o, c, i) {
        y();
        var s = p(), r = g();
        wx.request({
            url: u + "Shippingaddress/newUpdateHistoryaddress",
            method: "post",
            data: {
                token: s,
                phone: r,
                id: e,
                mail_address: t,
                consignee: n,
                receiving_phone: a,
                address: o,
                address_id: c
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                i(e);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    deleteTheReceivingAddress: function(e, t) {
        y();
        var n = p(), a = g();
        wx.request({
            url: u + "Shippingaddress/deleteShippingaddress",
            method: "post",
            data: {
                token: n,
                phone: a,
                id: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t(e);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    identificationAddress: function(e, t) {
        y();
        var n = p(), a = g();
        wx.request({
            url: u + "Addressresolution/identificationAddress",
            method: "post",
            data: {
                token: n,
                phone: a,
                address: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t(e);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    queryLogData: function(e) {
        wx.request({
            url: u + "Updatelog/queryData",
            method: "get",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    randomUuid: function() {
        for (var e = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ], t = "", n = 0; n < 32; n++) {
            t += e[Math.floor(62 * Math.random())];
        }
        return t;
    },
    judegPhone: function(e) {
        if ("" == e) return l("联系方式不能为空！"), !1;
        for (var t = "~·`!！@#$￥%^…&*()（）—-_=+[]{}【】、|\\;:；：'\"“‘,./<>《》?？，。", n = t.length, a = 0; a < n; a++) if (-1 != e.indexOf(t.substring(a, a + 1))) return l("联系方式存在特殊字符"), 
        !1;
    },
    get_video_list: function(e) {
        var t = p(), n = g();
        wx.request({
            url: u + "Videorewards/newRewardsSelect",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t);
            }
        });
    },
    query_video_platform: function(e) {
        y();
        var t = p(), n = g();
        wx.request({
            url: u + "Videorewards/queryVideoPlatform",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t.data);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    isBluetoothAndGPSNoCheckEnable: function() {
        return n.getStorageSyncHasDefault("preference_check_ble_gps_settings", !1);
    },
    setBluetoothAndGPSNoCheckEnable: function(e) {
        wx.setStorageSync("preference_check_ble_gps_settings", e);
    },
    createTagDataManagePassword: function(e) {
        y();
        var t = p(), n = g();
        wx.request({
            url: u + "Importexport/createPassword",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t.data);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    updateTagDataManagePassword: function(e, t) {
        y();
        var n = p(), a = g();
        wx.request({
            url: u + "Importexport/updateTagDataManagePassword",
            data: {
                phone: a,
                token: n,
                password: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t(e.data);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    pullPasswordAndLink: function(e) {
        y();
        var t = p(), n = g();
        wx.request({
            url: u + "Importexport/pullPasswordAndLink",
            data: {
                phone: n,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t.data);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    submitShareData: function(e, t, n, a, o) {
        y();
        var c = p(), i = g();
        wx.request({
            url: u + "Datasharing/dataSharingInsert",
            method: "post",
            data: {
                card_name: e,
                acceptData: JSON.stringify(t),
                access_code: n,
                closing_date: a,
                token: c,
                phone: i
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                o(e);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    pullShareData: function(e) {
        y();
        var t = p(), n = g();
        wx.request({
            url: u + "Datasharing/pullShareData",
            method: "post",
            data: {
                token: t,
                phone: n
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                0 !== t.data ? e(t) : e([]);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    deleteShareData: function(e, t) {
        y();
        var n = p(), a = g();
        wx.request({
            url: u + "Datasharing/deleteShareData",
            method: "post",
            data: {
                token: n,
                phone: a,
                id: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t(e);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    createShareLinkMessage: function(e, t, n, a) {
        var o = "".concat(e, "给您分享了一个数据，快来看看吧"), c = "链接: https://rcopy.nikola-lab.cn/sharedump?code=".concat(t);
        a && n.length > 0 && (c += "&pwd=".concat(n));
        var i = "".concat(o, "\n").concat(c);
        return n.length > 0 && (i += "\n访问码: ".concat(n)), i;
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
        if (v()) {
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
        var a = wx.getFileSystemManager(), o = "".concat(wx.env.USER_DATA_PATH, "/img"), c = "".concat(o, "/").concat(e);
        try {
            a.accessSync(o);
        } catch (e) {
            e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
            a.mkdirSync(o, !0);
        }
        try {
            a.accessSync(c), n(c), console.log("3D旋转图片的本地文件已经存在，将自动使用本地文件");
        } catch (e) {
            e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
            wx.downloadFile({
                filePath: c,
                url: t,
                success: function(e) {
                    200 == e.statusCode ? (n(c), console.log("3D旋转图片下载成功，后续将直接使用此本地文件！")) : console.error("下载3D旋转图失败: ".concat(JSON.stringify(e)));
                }
            });
        }
    },
    systemInfo: d
};