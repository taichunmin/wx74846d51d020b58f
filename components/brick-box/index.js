Component({
    properties: {
        goods_data: {
            type: Array
        },
        showLoginView: {
            type: Boolean
        }
    },
    data: {},
    methods: {
        onChangeToDetail: function(a) {
            var t = a.currentTarget.dataset.id, e = this.data.goods_data[t];
            wx.navigateTo({
                url: "/pages/goods-details/index?data=" + JSON.stringify(e)
            });
        }
    }
});