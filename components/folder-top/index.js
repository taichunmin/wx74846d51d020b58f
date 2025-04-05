Component({
    properties: {
        show_search_frame: {
            type: Boolean,
            value: !1
        },
        current_path: {
            type: String,
            value: "/"
        },
        currentFolder: {
            type: String,
            value: ""
        },
        view_current_path: {
            type: String,
            value: ""
        },
        position_title: {
            type: String,
            value: ""
        },
        screenShow: {
            type: Boolean,
            value: !0
        }
    },
    data: {},
    methods: {
        onTurnBack: function() {
            this.triggerEvent("onTurnBack");
        },
        onScreen: function() {
            this.triggerEvent("onScreen");
        },
        onShowSearchFrame: function() {
            this.triggerEvent("onShowSearchFrame");
        },
        onCancel: function() {
            this.triggerEvent("onCancel");
        },
        onUserSearch: function(e) {
            this.triggerEvent("onUserSearch", e.detail);
        },
        onClearSearch: function() {
            this.triggerEvent("onClearSearch");
        }
    }
});