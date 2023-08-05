Page({
    data: {
        status: "",
        current_page: "write"
    },
    emptyCard: function() {
        wx.redirectTo({
            url: "/pages/device-master-mode/index?emptyCardStatus=true"
        });
    },
    retry: function() {
        wx.navigateBack();
    },
    onLoad: function(t) {
        this.setData({
            status: t.status
        });
    }
});