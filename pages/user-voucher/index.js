var a = require("../../8462214255C842DFE2044945663685D7.js");

Page({
    data: {
        pageList: [ "待使用", "已使用", "已过期" ],
        pageShow: 0,
        voucher_data: [],
        display_data: []
    },
    onTabClick: function(a) {
        var t = a.currentTarget.dataset.id;
        switch (t) {
          case 0:
            this.chooseData("false");
            break;

          case 1:
            this.chooseData("true");
            break;

          case 2:
            this.chooseData("expire");
        }
        this.setData({
            pageShow: t
        });
    },
    chooseData: function(a) {
        var t = [];
        this.data.voucher_data.forEach(function(e) {
            e.on_state == a && t.push(e);
        }), this.setData({
            display_data: t
        });
    },
    copyCode: function(t) {
        if (0 == this.data.pageShow) {
            var e = t.target.dataset.id, i = this.data.display_data[e].voucher_code;
            wx.setClipboardData({
                data: i,
                success: function(t) {
                    a.showToast("复制券码成功");
                }
            });
        }
    },
    onRedemptionVoucher: function() {
        this.setData({
            voucher_data: [],
            display_data: []
        }, function() {
            wx.navigateTo({
                url: "/pages/user-redemption-voucher/index"
            });
        });
    },
    onLoad: function(a) {},
    onShow: function() {
        var t = this;
        t.data.voucher_data.length <= 0 && t.data.display_data.length <= 0 && a.queryVoucherData(function(a) {
            var e = a.data.data;
            if (null != e) {
                var i = [];
                e.forEach(function(a) {
                    "false" == a.on_state && i.push(a);
                    var t = a.expiration_time, e = t.slice(0, 4) + "." + t.slice(5, 7) + "." + t.slice(8, 10);
                    a.expiration_time = e;
                }), a.data.data = e, t.setData({
                    pageShow: 0,
                    voucher_data: a.data.data,
                    display_data: i
                });
            }
        });
    }
});