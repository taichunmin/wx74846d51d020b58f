var e = require("../../8462214255C842DFE2044945663685D7.js");

require("../../6B5F0E3755C842DF0D39663027C585D7.js");

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
        }
    },
    data: {},
    observers: {
        show: function(t) {
            if (console.log("这里的placeholder是" + this.data.type), "save-nick" == this.data.type && t) {
                var a = this;
                "local" == e.cloudOrLocal() ? a.setData({
                    placeholder: e.createDefaultNick()
                }) : e.createDefaultNickCloud(function(e) {
                    a.setData({
                        placeholder: e
                    });
                });
            }
        }
    },
    lifetimes: {
        attached: function() {
            var e = {};
            switch (this.data.theme) {
              case "light":
                e.base = "background: #FFFFFF", e.title = "color: #000000; font-weigth", e.input = "color: #333333; border-color: rgba(0, 0, 0, 0.1); caret-color: #F5A200;", 
                e.btnbase = "border-top: 1px solid rgba(0, 0, 0, 0.1);", e.btncancel = "border-right: 1px solid rgba(0, 0, 0, 0.1); color: #000000;";
            }
            this.setData({
                themeMap: e
            });
        }
    },
    methods: {
        onSaveDumpClick: function() {
            var e = this.data.value;
            e.length <= 0 && (e = this.data.placeholder), this.triggerEvent("confirm", {
                dumpName: e
            });
        },
        onSaveCancel: function() {
            this.setData({
                value: ""
            }), this.triggerEvent("cancel");
        },
        onCardNameInput: function(t) {
            t.detail.value.length > 12 ? e.showToast("输入字符不能大于12位") : this.setData({
                value: t.detail.value
            });
        }
    }
});