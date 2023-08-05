Component({
    properties: {
        heads: {
            type: Array,
            value: [ "无", "无" ]
        },
        keys: {
            type: Array,
            value: []
        }
    },
    data: {},
    methods: {
        onUserEditKey: function(e) {
            var t = e.currentTarget.dataset.index;
            this.triggerEvent("edit", {
                index: t
            });
        },
        onUserDeleteKey: function(e) {
            var t = e.currentTarget.dataset.index;
            this.triggerEvent("delete", {
                index: t
            });
        }
    }
});