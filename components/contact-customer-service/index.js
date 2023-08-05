Component({
    properties: {},
    data: {
        customerImg: ""
    },
    pageLifetimes: {
        show: function() {
            "ios" == wx.getSystemInfoSync().platform ? this.setData({
                customerImg: "ios"
            }) : this.setData({
                customerImg: "android"
            });
        }
    },
    methods: {}
});