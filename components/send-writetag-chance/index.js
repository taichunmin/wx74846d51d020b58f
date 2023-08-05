require("../../8462214255C842DFE2044945663685D7.js");

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