require("../../76F8096255C842DF109E616502B6D685.js");

Component({
    properties: {
        showDailog: {
            type: Boolean,
            value: "false"
        }
    },
    data: {
        modelBackground: "IC",
        cardName: ""
    },
    methods: {
        close: function() {
            this.setData({
                showDailog: !1
            });
        },
        cancel: function() {
            this.triggerEvent("cancel");
        },
        confirm: function() {
            console.log("111" + this.data.modelBackground);
            var t = {
                type: this.data.modelBackground,
                cardName: this.data.cardName
            };
            this.triggerEvent("confirm", t), this.setData({
                cardName: ""
            });
        },
        model: function(t) {
            var a = t.currentTarget.dataset.id;
            1 == a ? this.setData({
                modelBackground: "IC"
            }) : 2 == a && this.setData({
                modelBackground: "ID"
            });
        },
        btnTabInput: function(t) {
            this.setData({
                cardName: t.detail.value
            });
        }
    }
});