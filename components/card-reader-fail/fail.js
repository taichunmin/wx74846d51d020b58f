var e = require("../../76241F7655C842DF1042777162F5D685.js"), t = require("../../614DB8F055C842DF072BD0F70136D685.js"), a = require("../../AB5D946455C842DFCD3BFC63A316D685.js"), r = require("../../1D91D49255C842DF7BF7BC9565C6D685.js"), i = require("../../AC1F69C355C842DFCA7901C4DB75D685.js");

Component({
    properties: {
        mode: {
            type: String,
            value: ""
        },
        title: {
            type: String,
            value: ""
        },
        status: {
            type: Number,
            value: 2457
        },
        helpCode: {
            type: Number,
            value: void 0
        }
    },
    observers: {
        status: function(e) {
            this.formatCode(e);
        }
    },
    data: {
        reason: "",
        code: "0x999",
        codes: [],
        tagInfo: null,
        voiceData: ""
    },
    lifetimes: {
        attached: function() {
            this.formatCode(this.data.status);
        }
    },
    methods: {
        covertCode: function(e) {
            var t = [];
            i.num2Bytes(e, 8, t);
            for (var a = i.bytes2hex(t), r = [], o = 0; o < a.length; o++) {
                var n = a[o];
                "0" != n && r.push(n);
            }
            return 0 == r.length && r.push("0", "0"), (a = r.join("")).length % 2 != 0 && (a = "0" + a), 
            a;
        },
        formatCode: function(i) {
            var o = parseInt(i), n = this.covertCode(o), s = t.getTagInformation(), u = null;
            if (null != s) {
                var d = "未知";
                switch (s.tag_type) {
                  case t.TAG_TYPE_LF_EM410X:
                    d = "ID卡";
                    break;

                  default:
                    d = "IC卡";
                }
                u = {
                    uid: s.uid_hex,
                    type: d
                };
            }
            for (var c = a.getOpFailExtendCode(), l = [], h = 0; h < c.length; h++) l.push("0x".concat(this.covertCode(c[h])));
            var p = "";
            "write" == this.data.mode && (p = r.AUDIO_WRITING_CARD_FAIL), "read" == this.data.mode && (p = r.AUDIO_READ_CARD_FAIL), 
            this.setData({
                code: "0x" + n,
                reason: e.getMsg(o),
                codes: l,
                tagInfo: u,
                voiceData: p
            });
        },
        gotoUserHelp: function() {
            wx.navigateTo({
                url: "/pages/user-device-help/help?id=" + this.data.helpCode
            });
        },
        onUserClickEmptyCard: function() {
            this.triggerEvent("emptyCard", {});
        },
        onUserRetryClickCallback: function() {
            this.triggerEvent("retry", {});
        }
    }
});