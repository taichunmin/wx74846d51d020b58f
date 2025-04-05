var e = require("../../D6EF5C7155C842DFB08934760C65D685.js"), r = require("../../DFE4D8E455C842DFB982B0E32585D685.js"), i = require("../../B7540E6555C842DFD13266622795D685.js");

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