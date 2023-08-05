var t = wx.createInnerAudioContext(), o = require("../../6B5F0E3755C842DF0D39663027C585D7.js");

require("../../8462214255C842DFE2044945663685D7.js");

Component({
    properties: {
        audioSrc: {
            type: String
        }
    },
    data: {
        show_page: "",
        show_img: !1
    },
    observers: {
        audioSrc: function(e) {
            "true" == o.getStorageSyncHasDefault("turnOnVoiceTip", !1) ? (console.log("监听这里开启了开关"), 
            this.setData({
                show_img: !0,
                show_page: !0
            }), "" == e ? console.log("传过来的音频为空！") : (console.log("缓存开的时候，进到监听的播放里"), this.play(e))) : (console.log("缓存关的时候，进到监听的停止里"), 
            t.stop());
        }
    },
    lifetimes: {},
    methods: {
        play: function(o) {
            t.src = o, t.play();
        },
        onUserClickOnPlayCbk: function(o) {
            1 == this.data.show_img ? (console.log("点击了关闭"), this.setData({
                show_img: !1
            }), wx.setStorageSync("turnOnVoiceTip", "false"), t.stop()) : (console.log("点击了"), 
            this.setData({
                show_img: !0
            }), wx.setStorageSync("turnOnVoiceTip", "true"), t.play(this.data.audioSrc));
        },
        onUserClickStopPlayCbk: function(o) {
            1 == this.data.show_page ? (this.setData({
                show_img: !1,
                show_page: !1
            }), wx.setStorageSync("turnOnVoiceTip", "true"), t.stop()) : (this.setData({
                show_img: !0,
                show_page: !0
            }), wx.setStorageSync("turnOnVoiceTip", "false"));
        }
    }
});