var t = require("../../8462214255C842DFE2044945663685D7.js");

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
        show: function(t) {}
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
            var e = this.data.value;
            e.length > 100 ? t.showToast("输入字符数量不能超过100位") : "" != e ? this.triggerEvent("confirm", {
                inputValue: e
            }) : t.showToast("输入内容不能为空");
        },
        onSaveCancel: function() {
            this.setData({
                value: ""
            }), this.triggerEvent("cancel");
        },
        onCardNameInput: function(e) {
            e.detail.value.length > 100 ? t.showToast("输入字符数量不能超过100位") : this.setData({
                value: e.detail.value
            });
        }
    }
});