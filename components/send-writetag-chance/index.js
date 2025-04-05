require("../../76F8096255C842DF109E616502B6D685.js");

Component({
    properties: {
        sendVip: {
            type: Boolean,
            value: !0
        }
    },
    data: {},
    methods: {
        onClose: function() {
            this.triggerEvent("onClose");
        }
    }
});