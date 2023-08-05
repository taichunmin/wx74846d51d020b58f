var e = require("../../275D798255C842DF413B1185FE3585D7.js"), r = require("../../A3859AB555C842DFC5E3F2B2FA5585D7.js"), i = require("../../A4B4ED0255C842DFC2D285056D6585D7.js");

Component({
    properties: {
        showArrow: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        imgUrl: ""
    },
    lifetimes: {
        ready: function() {
            var o = r.getDevice();
            if (o instanceof e.BaseBluetoothLowEnergy) {
                var t = i.IMG_DEVICE_STATIC_SHAPE[o.type];
                null == t ? console.error("开发者忘记了添加此设备类型对应的外形图的资源链接: ".concat(o.type)) : this.setData({
                    imgUrl: t.url
                });
            } else console.error("无法识别设备类型，也可能是未链接导致的。");
        }
    }
});