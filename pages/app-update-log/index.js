var a = require("../../76F8096255C842DF109E616502B6D685.js");

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