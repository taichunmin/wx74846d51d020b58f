Component({
    properties: {
        overlay_show: {
            type: Boolean
        },
        reward: {
            type: String
        },
        title: {
            type: String
        },
        mode: {
            type: String
        }
    },
    data: {},
    methods: {
        closeOverlay: function() {
            this.triggerEvent("closeOverlay");
        }
    }
});