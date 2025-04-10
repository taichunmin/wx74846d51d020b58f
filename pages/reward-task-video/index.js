var t = require("../../@babel/runtime/helpers/typeof"), a = require("../../@babel/runtime/helpers/defineProperty"), e = require("../../76F8096255C842DF109E616502B6D685.js");

Page({
    data: a(a(a(a(a({
        canSubmit: !0,
        showView: !1,
        chooseData: "",
        show_data: "",
        show_rewards_data: "",
        chooseRewardsData: "",
        mode: "",
        seleceData: ""
    }, "canSubmit", ""), "select_id", ""), "total", ""), "fileList", []), "imgLength", 0),
    deleteImage: function(t) {
        console.log(t);
        var a = this.data.fileList, e = void 0 === a ? [] : a;
        e.splice(t.detail.index, 1), this.setData({
            fileList: e
        }), this.setData({
            imgLength: this.data.fileList.length
        });
    },
    afterRead: function(t) {
        for (var a = t.detail.file, s = this.data.fileList, o = void 0 === s ? [] : s, i = 0; i < a.length; i++) if (a[i].size >= 1048576) return void e.showToast("图片大小超出1M");
        a.forEach(function(t) {
            o.push({
                url: t.url
            });
        }), this.setData({
            fileList: o
        }), this.setData({
            imgLength: this.data.fileList.length
        });
    },
    openPopup: function() {
        this.setData({
            showView: !0,
            seleceData: this.data.show_data,
            mode: 1
        });
    },
    closePopup: function() {
        this.setData({
            showView: !1
        });
    },
    openPopupRewards: function() {
        this.setData({
            showView: !0,
            seleceData: this.data.show_rewards_data,
            mode: 2
        });
    },
    selectData: function(a) {
        var s = this, o = s.data.mode, i = a.detail.value.id;
        if (1 == o) if (null != i) {
            s.setData({
                showView: !1,
                chooseData: a.detail.value.text,
                select_id: i
            });
            n = "post", d = e.getRequestUrl() + "Videorewards/newQueryVideoRewords", r = {
                phone: e.getPhone(),
                token: e.obtain(),
                id: i
            };
            e.requestFn(d, n, r, function(t) {
                "没有数据选择" == t.data[0] ? s.setData({
                    canSubmit: !1,
                    show_rewards_data: t.data
                }) : (t.data.unshift("请选择"), s.setData({
                    show_rewards_data: t.data,
                    canSubmit: !0
                }));
            });
        } else s.setData({
            showView: !1
        }); else if ("没有数据选择" == s.data.show_rewards_data) s.setData({
            showView: !1,
            chooseRewardsData: s.data.show_rewards_data
        }); else {
            if ("object" === t(a.detail.value)) return void s.setData({
                showView: !1,
                chooseRewardsData: ""
            });
            s.setData({
                showView: !1,
                chooseRewardsData: a.detail.value
            });
            var n = "post", d = e.getRequestUrl() + "Videorewards/beforeQuery", r = {
                phone: e.getPhone(),
                token: e.obtain(),
                id: s.data.select_id,
                chooseRewardsData: s.data.chooseRewardsData
            };
            e.requestFn(d, n, r, function(t) {
                t.data.length > 100 ? s.setData({
                    total: 0
                }) : s.setData({
                    total: t.data
                });
            });
        }
    },
    onChangeRewards: function(t) {
        this.setData({
            chooseRewardsData: t.detail.value
        });
    },
    submit: function() {
        var t = this;
        if (0 != t.data.canSubmit) {
            var a = t.data.select_id, s = t.data.chooseRewardsData;
            if ("" != s) {
                if ("" == t.data.fileList) return e.showToast("请至少上传一张图片"), !1;
                console.log("id是" + a), t.setData({
                    canSubmit: !1
                }), wx.showLoading({
                    title: "上传中"
                });
                for (var o = e.obtain(t), i = e.getPhone(), n = t.data.fileList, d = 0; d < n.length; d++) wx.uploadFile({
                    url: e.getRequestUrl() + "Videorewards/upVideoRewards",
                    filePath: n[d].url,
                    name: "file",
                    formData: {
                        phone: i,
                        token: o,
                        chooseRewardsData: s,
                        id: a
                    },
                    success: function(a) {
                        if (2 == (a = JSON.parse(a.data)).status) return e.showToast("上传失败，文件仅支持 png,jpg,jpeg 格式"), 
                        t.setData({
                            canSubmit: !0
                        }), !1;
                        1 == a.status ? (wx.showToast({
                            title: a.msg,
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.navigateBack();
                        }, 2e3)) : e.showToast(a.msg);
                    },
                    fail: function(t) {
                        console.log("错误的原因是" + JSON.stringify(t));
                    }
                });
            } else e.showToast("请选择播放量");
        } else e.showToast("没有查询到有效的数据");
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        var t = this;
        e.get_video_list(function(a) {
            if ("没有数据选择" == a.data[0]) t.setData({
                canSubmit: !1,
                show_data: a.data
            }); else {
                for (var e = [], s = 0; s < a.data.length; s++) e.push({
                    text: a.data[s].video_title,
                    id: a.data[s].id
                });
                e.unshift("请选择"), t.setData({
                    show_data: e
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});