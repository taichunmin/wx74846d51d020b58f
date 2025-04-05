var t = require("../../76F8096255C842DF109E616502B6D685.js");

require("../../AB5D946455C842DFCD3BFC63A316D685.js");

Component({
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        theme: {
            type: String,
            value: "light"
        },
        title: {
            type: String,
            value: "无"
        },
        type: {
            type: String,
            value: ""
        },
        value: {
            type: String,
            value: ""
        },
        placeholder: {
            type: String,
            value: ""
        },
        btnCancel: {
            type: String
        },
        btnConfirm: {
            type: String
        }
    },
    data: {},
    observers: {
        show: function(e) {
            if ("save-nick" == this.data.type && e) {
                var a = this;
                "local" == t.cloudOrLocal() ? a.setData({
                    placeholder: t.createDefaultNick()
                }) : t.createDefaultNickCloud(function(t) {
                    a.setData({
                        placeholder: t
                    });
                });
            }
        }
    },
    lifetimes: {
        attached: function() {
            var t = {};
            switch (this.data.theme) {
              case "light":
                t.base = "background: #FFFFFF", t.title = "color: #000000; font-weigth", t.input = "color: #333333; border-color: rgba(0, 0, 0, 0.1); caret-color: #F5A200;", 
                t.btnbase = "border-top: 1px solid rgba(0, 0, 0, 0.1);", t.btncancel = "border-right: 1px solid rgba(0, 0, 0, 0.1); color: #000000;";
            }
            this.setData({
                themeMap: t
            });
        }
    },
    methods: {
        onSaveDumpClick: function() {
            var t = this.data.value;
            t.length <= 0 && (t = this.data.placeholder), this.triggerEvent("confirm", {
                dumpName: t
            });
        },
        onSaveCancel: function() {
            this.setData({
                value: ""
            }), this.triggerEvent("cancel");
        },
        onCardNameInput: function(e) {
            e.detail.value.length > 12 ? t.showToast("输入字符不能大于12位") : this.setData({
                value: e.detail.value
            });
        }
    }
});