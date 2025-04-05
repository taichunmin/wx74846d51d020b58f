Component({
    properties: {
        paddingRight: {
            type: String,
            value: "46rpx"
        },
        itemWidth: {
            type: String,
            value: "305rpx"
        },
        marginLeft: {
            type: String,
            value: "12rpx"
        },
        showCheckbox: {
            type: Boolean,
            value: !1
        },
        mode: {
            type: String,
            value: "0"
        },
        file_type: {
            type: String,
            value: "folder"
        },
        type: {
            type: String,
            value: "IC"
        },
        path: {
            type: String,
            value: " "
        },
        nick: {
            type: String,
            value: "尼古拉卡包"
        },
        index: {
            type: String,
            value: ""
        },
        checked: {
            type: Boolean,
            value: !1
        },
        fileUuid: {
            type: String,
            value: ""
        }
    },
    data: {},
    methods: {
        onDumpItemClick: function() {
            var e;
            e = "folder" == this.data.file_type ? "onDumpItemClick" : "onFileItemClick", this.triggerEvent(e, {
                index: this.data.index
            });
        },
        onSelectItem: function() {
            this.setData({
                checked: !this.data.checked
            }), this.triggerEvent("onSelectItem", {
                index: this.data.index,
                fileType: this.data.file_type,
                checked: this.data.checked,
                fileUuid: this.data.fileUuid
            });
        }
    }
});