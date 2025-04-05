var t = require("../../76F8096255C842DF109E616502B6D685.js");

Page({
    data: {
        task_record_data: ""
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        var o = this;
        t.taskRecord(function(t) {
            console.log("任务记录是" + JSON.stringify(t));
            var n = t.data, a = 0;
            n.forEach(function(o) {
                var n = t.data[a].commit_time.slice(0, 10);
                t.data[a].commit_time = n, a++;
            }), o.setData({
                task_record_data: t.data
            });
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});