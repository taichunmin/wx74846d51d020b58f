var e = wx.canIUse("createIntersectionObserver");

Component({
    properties: {
        src: {
            type: String,
            value: "",
            observer: function(e, t) {
                this.resetData(), this.addObserver();
            }
        },
        ImgBlockWidth: {
            type: String,
            value: ""
        },
        ImgBlockHeight: {
            type: String,
            value: ""
        },
        mode: {
            type: String,
            value: "aspectFill"
        },
        showMenuByLongpress: {
            type: Boolean,
            value: !1
        }
    },
    externalClasses: [ "image-class" ],
    data: {
        show: !1,
        imageShow: !1,
        imageErrShow: !1
    },
    ready: function() {
        this.addObserver();
    },
    detached: function() {
        this.clear();
    },
    methods: {
        clear: function() {
            this.observer && this.observer.disconnect(), this.observer = null;
        },
        resetData: function() {
            this.setData({
                show: !1,
                imageShow: !1,
                imageErrShow: !1
            });
        },
        addObserver: function() {
            var t = this;
            if (!e) return this.setData({
                show: !0
            });
            if (!this.observer && !this.data.show) try {
                var r = this.createIntersectionObserver();
                r.relativeToViewport(this.properties.viewport).observe(".lazy-image-wrap", function() {
                    t.setData({
                        show: !0
                    }), t.clear();
                }), this.observer = r;
            } catch (e) {
                e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                this.setData({
                    show: !0
                });
            }
        },
        imageLoad: function() {
            this.setData({
                imageShow: !0
            });
        },
        imageError: function() {
            this.setData({
                imageErrShow: !0
            });
        }
    }
});