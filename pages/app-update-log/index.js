var a = require("../../8462214255C842DFE2044945663685D7.js");

Page({
    data: {
        logData: []
    },
    onShow: function() {
        var t = this;
        a.queryLogData(function(s) {
            1 == s.data.status ? t.setData({
                logData: s.data.data
            }) : (t.setData({
                logData: ""
            }), a.showToast("暂无信息"));
        });
    }
});