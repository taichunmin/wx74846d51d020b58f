var i = require("../../76F8096255C842DF109E616502B6D685.js"), e = require("../../1D91D49255C842DF7BF7BC9565C6D685.js");

Page({
    data: {
        voiceData: ""
    },
    writeCard: function() {
        wx.navigateBack();
    },
    onWriteCardFinishExit: function() {
        wx.switchTab({
            url: "/pages/device-connect-main/index"
        });
    },
    onLoad: function(e) {
        console.log("设备类型是 " + i.judgeDeviceType()), "minicopy" == i.judgeDeviceType() && (console.log("9900"), 
        i.deductionTimes());
    },
    onShow: function() {
        this.setData({
            voiceData: e.AUDIO_WRITING_CARD_SUCCESS
        });
    },
    onHide: function() {},
    onUnload: function() {}
});