Component({
    properties: {
        show: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        onClose: function() {
            this.triggerEvent("close");
        },
        onConfirm: function(t) {
            this.triggerEvent("confirm", {
                type: t.currentTarget.dataset.type
            });
        }
    }
});