var t, a = require("../../@babel/runtime/helpers/typeof"), e = require("../../@babel/runtime/helpers/defineProperty"), s = require("../../8462214255C842DFE2044945663685D7.js");

Page({
    data: (t = {
        canSubmit: !0,
        showView: !1,
        chooseData: "",
        show_data: "",
        show_rewards_data: "",
        chooseRewardsData: "",
        mode: "",
        seleceData: ""
    }, e(t, "canSubmit", ""), e(t, "select_id", ""), e(t, "total", ""), e(t, "fileList", []), 
    e(t, "imgLength", 0), t),
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
        for (var a = t.detail.file, e = this.data.fileList, o = void 0 === e ? [] : e, i = 0; i < a.length; i++) if (a[i].size >= 1048576) return void s.showToast("图片大小超出1M");
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
    selectData: function(t) {
        var e = this, o = e.data.mode, i = t.detail.value.id;
        if (1 == o) if (console.log("666id" + i), null != i) {
            e.setData({
                showView: !1,
                chooseData: t.detail.value.text,
                select_id: i
            });
            n = s.obtain(), d = s.getPhone();
            wx.request({
                url: s.getRequestUrl() + "Videorewards/newQueryVideoRewords",
                data: {
                    phone: d,
                    token: n,
                    id: i
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(t) {
                    console.log("返回的选项是" + JSON.stringify(t)), "没有数据选择" == t.data[0] ? e.setData({
                        canSubmit: !1,
                        show_rewards_data: t.data
                    }) : (t.data.unshift("请选择"), e.setData({
                        show_rewards_data: t.data,
                        canSubmit: !0
                    }));
                }
            });
        } else e.setData({
            showView: !1
        }); else if ("没有数据选择" == e.data.show_rewards_data) e.setData({
            showView: !1,
            chooseRewardsData: e.data.show_rewards_data
        }); else {
            if ("object" === a(t.detail.value)) return console.log("rrrrrr"), void e.setData({
                showView: !1,
                chooseRewardsData: ""
            });
            e.setData({
                showView: !1,
                chooseRewardsData: t.detail.value
            });
            var n = s.obtain(), d = s.getPhone();
            wx.request({
                url: s.getRequestUrl() + "Videorewards/beforeQuery",
                data: {
                    phone: d,
                    token: n,
                    id: e.data.select_id,
                    chooseRewardsData: e.data.chooseRewardsData
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(t) {
                    t.data.length > 100 ? e.setData({
                        total: 0
                    }) : e.setData({
                        total: t.data
                    });
                }
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
            var a = t.data.select_id, e = t.data.chooseRewardsData;
            if ("" != e) {
                if ("" == t.data.fileList) return s.showToast("请至少上传一张图片"), !1;
                console.log("id是" + a), t.setData({
                    canSubmit: !1
                }), wx.showLoading({
                    title: "上传中"
                });
                for (var o = s.obtain(t), i = s.getPhone(), n = t.data.fileList, d = 0; d < n.length; d++) wx.uploadFile({
                    url: s.getRequestUrl() + "Videorewards/upVideoRewards",
                    filePath: n[d].url,
                    name: "file",
                    formData: {
                        phone: i,
                        token: o,
                        chooseRewardsData: e,
                        id: a
                    },
                    success: function(a) {
                        if (2 == (a = JSON.parse(a.data)).status) return s.showToast("上传失败，文件仅支持 png,jpg,jpeg 格式"), 
                        t.setData({
                            canSubmit: !0
                        }), !1;
                        1 == a.status ? (wx.showToast({
                            title: a.msg,
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.navigateBack();
                        }, 2e3)) : s.showToast(a.msg);
                    },
                    fail: function(t) {
                        console.log("错误的原因是" + JSON.stringify(t));
                    }
                });
            } else s.showToast("请选择播放量");
        } else s.showToast("没有查询到有效的数据");
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        var t = this;
        s.get_video_list(function(a) {
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