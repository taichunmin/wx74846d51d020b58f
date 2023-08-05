Component({
    properties: {},
    data: {
        inputVal: "",
        changeBtn: !1
    },
    methods: {
        inputTyping: function(t) {
            var i = t.detail.value;
            this.setData({
                inputVal: i
            }), this.triggerEvent("inputTyping", i);
        },
        clear: function() {
            "" != this.data.inputVal && (this.setData({
                inputVal: ""
            }), this.triggerEvent("clear"));
        }
    }
});