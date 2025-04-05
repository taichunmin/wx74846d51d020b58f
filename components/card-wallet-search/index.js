var t = require("../../76F8096255C842DF109E616502B6D685.js");

Component({
    properties: {},
    data: {
        position: "",
        inputVal: ""
    },
    lifetimes: {
        ready: function() {
            "local" == t.cloudOrLocal() ? this.setData({
                position: "本地卡包"
            }) : this.setData({
                position: "云端卡包"
            });
        }
    },
    methods: {
        clearInput: function() {
            this.setData({
                inputVal: ""
            }), this.triggerEvent("clear");
        },
        onGetInputValue: function(t) {
            this.setData({
                inputVal: t.detail.value
            }), this.triggerEvent("onGetInputValue", this.data.inputVal);
        },
        onCancel: function() {
            this.triggerEvent("onCancel");
        }
    }
});