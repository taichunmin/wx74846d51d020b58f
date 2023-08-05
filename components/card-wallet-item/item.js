Component({
    properties: {
        type: {
            type: String,
            value: "IC"
        },
        color: {
            type: String,
            value: "#F5A200"
        },
        nick: {
            type: String,
            value: "尼古拉卡包"
        },
        uuid: {
            type: String,
            value: ""
        }
    },
    data: {},
    methods: {
        onDumpItemClick: function() {
            this.triggerEvent("click", {
                uuid: this.data.uuid
            });
        }
    }
});