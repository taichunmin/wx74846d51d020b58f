var i = require("../../8462214255C842DFE2044945663685D7.js"), e = require("../../1B8F0B7555C842DF7DE96372984685D7.js");

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