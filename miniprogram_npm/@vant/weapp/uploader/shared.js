Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.messageFileProps = exports.mediaProps = exports.videoProps = exports.imageProps = void 0, 
exports.imageProps = {
    sizeType: {
        type: Array,
        value: [ "original", "compressed" ]
    },
    capture: {
        type: Array,
        value: [ "album", "camera" ]
    },
    showmenu: {
        type: Boolean,
        value: !0
    }
}, exports.videoProps = {
    capture: {
        type: Array,
        value: [ "album", "camera" ]
    },
    compressed: {
        type: Boolean,
        value: !0
    },
    maxDuration: {
        type: Number,
        value: 60
    },
    camera: {
        type: String,
        value: "back"
    }
}, exports.mediaProps = {
    capture: {
        type: Array,
        value: [ "album", "camera" ]
    },
    mediaType: {
        type: Array,
        value: [ "image", "video" ]
    },
    maxDuration: {
        type: Number,
        value: 60
    },
    camera: {
        type: String,
        value: "back"
    }
}, exports.messageFileProps = {
    extension: null
};