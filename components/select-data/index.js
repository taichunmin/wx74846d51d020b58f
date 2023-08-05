Component({
    properties: {
        showPopup: {
            type: Boolean,
            value: !1
        },
        mode: {
            type: String,
            value: ""
        },
        data: {
            type: Object
        }
    },
    data: {
        selectValue: ""
    },
    methods: {
        onChange: function(e) {
            var t = e.detail, a = (t.picker, t.value);
            t.index;
            this.setData({
                selectValue: a
            });
        },
        closePopup: function() {
            this.triggerEvent("close");
        },
        confirm: function() {
            this.triggerEvent("select", {
                value: this.data.selectValue
            });
        }
    }
});