var t = require("../../76F8096255C842DF109E616502B6D685.js");

Page({
    data: {
        dbData: ""
    },
    onShow: function() {
        if (0 == t.isLogin()) t.loginToast(); else {
            var e = this, a = t.getRequestUrl() + "Feedback/query", i = {
                phone: t.getPhone(),
                token: t.obtain()
            };
            t.requestFn(a, "post", i, function(t) {
                e.setData({
                    dbData: t.data
                });
            });
        }
    }
});