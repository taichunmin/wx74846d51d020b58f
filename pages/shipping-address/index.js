var a = require("../../8462214255C842DFE2044945663685D7.js");

Page({
    data: {
        addressData: "",
        mode: ""
    },
    onAddressSelected: function(a) {
        for (var d = a.currentTarget.dataset.id, e = this.data.addressData, t = 0; t < e.length; t++) e[t].checked = !1;
        e[d].checked = !0;
        var s = e[d];
        this.setData({
            addressData: e
        }), this.getOpenerEventChannel().emit("someEvent", {
            data: [ s ]
        }), wx.navigateBack({
            delta: -1
        });
    },
    onEdit: function(a) {
        var d = a.currentTarget.dataset.id, e = this.data.addressData[d].id;
        wx.navigateTo({
            url: "/pages/user-add-shipping-address/index?goods_id=null&address_id=".concat(e, "&mode=addressEdit")
        });
    },
    onAddAddress: function() {
        wx.navigateTo({
            url: "/pages/user-add-shipping-address/index"
        });
    },
    onLoad: function(a) {
        var d = a.mode, e = a.address_id;
        this.setData({
            mode: d,
            address_id: e
        });
    },
    onShow: function() {
        var d = this;
        a.pullAddressData(function(a) {
            if (a.length <= 0) d.setData({
                addressData: ""
            }); else {
                for (var e = 0; e < a.length; e++) a[e].checked = !1, a[e].id == d.data.address_id && (a[e].checked = !0);
                d.setData({
                    addressData: a
                });
            }
        });
    }
});