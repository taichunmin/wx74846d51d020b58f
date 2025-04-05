var e = require("../../76F8096255C842DF109E616502B6D685.js");

Component({
    externalClasses: [ "input-class", "icon-class" ],
    properties: {
        inputHint: {
            type: String,
            value: "搜索"
        },
        inputIcon: {
            type: String,
            value: "search.png"
        },
        inputType: {
            type: String,
            value: "text"
        },
        isPassword: {
            type: Boolean,
            value: !1
        },
        confirmType: {
            type: String,
            value: "done"
        }
    },
    data: {
        isClearShow: !1,
        inputValue: "",
        hiddOpenModal: !0
    },
    methods: {
        inputListener: function(e) {
            var s = e.detail.value;
            e.detail.cursor;
            null == s || 0 === s.length ? this.setData({
                isClearShow: !1
            }) : this.setData({
                isClearShow: !0,
                inputValue: s.toUpperCase()
            });
        },
        clearTap: function() {
            console.log("点击了清除"), this.setData({
                isClearShow: !1,
                inputValue: ""
            });
        },
        alertMess: function(e, s) {
            wx.showModal({
                title: e,
                content: s,
                showCancel: !1,
                success: function(e) {
                    e.confirm && wx.navigateBack();
                }
            });
        },
        redeemNow: function() {
            var s = this;
            if (e.isLogin()) {
                console.log("已经登录了");
                var t = this.data.inputValue;
                if ("" != t) if (12 == t.length) {
                    if (!/^[a-zA-Z]+$/.test(t)) return console.log("不是英文"), void e.showToast("兑换码有误");
                    console.log("全是英文"), wx.showModal({
                        title: "提示",
                        content: "是否确认兑换？",
                        success: function(a) {
                            if (a.confirm) console.log("用户确定兑换"), e.exchangeCertificate(t, function(t) {
                                switch (console.log("返回回来的信息是" + JSON.stringify(t)), t.data.msg) {
                                  case "兑换码不存在":
                                    s.alertMess("兑换失败", "兑换码错误或已经被使用");
                                    break;

                                  case "已经是VIP了":
                                    s.alertMess("兑换失败", "已经是VIP了");
                                    break;

                                  case "兑换次数成功":
                                    s.alertMess("兑换成功", "兑换次数成功");
                                    break;

                                  case "兑换VIP成功":
                                    s.alertMess("兑换成功", "兑换VIP成功");
                                    break;

                                  case "兑换永久VIP成功":
                                    s.alertMess("兑换成功", "兑换永久VIP成功");
                                    break;

                                  case "兑换50次次数成功":
                                    s.alertMess("兑换成功", "兑换50次次数成功");
                                    break;

                                  case "兑换30次次数成功":
                                    s.alertMess("兑换成功", "兑换30次次数成功");
                                    break;

                                  case "兑换10次次数成功":
                                    s.alertMess("兑换成功", "兑换10次次数成功");
                                    break;

                                  default:
                                    e.showToast("没有接收到返回信息");
                                }
                            }); else if (a.cancel) return void console.log("用户选择取消兑换");
                        }
                    });
                } else e.showToast("兑换码不对"); else e.showToast("请输入内容");
            } else e.loginToast();
        }
    }
});