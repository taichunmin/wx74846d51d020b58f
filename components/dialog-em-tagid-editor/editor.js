var t = require("../../76F8096255C842DF109E616502B6D685.js"), e = require("../../AC1F69C355C842DFCA7901C4DB75D685.js");

Component({
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        card: {
            type: String,
            value: ""
        }
    },
    observers: {
        card: function(t) {
            this.updateValueFrom10H(t);
        }
    },
    lifetimes: {
        ready: function() {
            this.updateValueFrom10H(this.data.card);
        }
    },
    data: {
        tagIdHex: "",
        tagId8H10D: ""
    },
    methods: {
        updateValueFrom10H: function(a) {
            var n, r;
            if (a.length > 0) {
                for (var o = "", i = !1, s = 0; s < a.length; s++) {
                    var u = a[s];
                    /^[a-fA-F0-9]$/.test(u) ? o += u : i = !0;
                }
                n = a = o, r = e.convertEM410x10HIDTo10D(a), i && t.showToast("已自动去除非HEX字符");
            } else n = r = "";
            this.setData({
                tagIdHex: n,
                tagId8H10D: r
            });
        },
        onUserInput10H: function(t) {
            var e = t.detail.value;
            this.updateValueFrom10H(e);
        },
        onUserInput8H10D: function(a) {
            var n = a.detail.value, r = parseInt(n);
            Number.isInteger(r) ? r <= 4294967295 ? this.setData({
                tagId8H10D: n,
                tagIdHex: e.convertEM410x10DIDTo10H(r)
            }) : t.showToast("不可以超过4294967295") : this.setData({
                tagId8H10D: "",
                tagIdHex: ""
            });
        },
        onClose: function() {
            this.triggerEvent("close");
        },
        onCancel: function() {
            this.triggerEvent("cancel");
        },
        onConfrim: function() {
            var e = this.data.tagIdHex;
            if (0 == e.length) t.showToast("请输入卡号~"); else {
                var a = new Array(11 - e.length).join("0") + e;
                this.triggerEvent("confirm", {
                    value: a
                });
            }
        }
    }
});