var e = require("../../04AF9D0355C842DF62C9F50458A585D7.js"), t = require("../../43635B5055C842DF2505335752E585D7.js"), a = require("../../6B5F0E3755C842DF0D39663027C585D7.js"), r = require("../../1B8F0B7555C842DF7DE96372984685D7.js"), i = require("../../306D78F255C842DF560B10F52E4585D7.js");

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