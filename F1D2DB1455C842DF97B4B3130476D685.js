var e = require("0066541755C842DF66003C10A286D685.js"), s = require("AC1F69C355C842DFCA7901C4DB75D685.js");

module.exports = {
    importDumpFromWechat: function(r, t) {
        var a = [];
        wx.chooseMessageFile({
            count: r,
            type: "file",
            extension: [ "txt", "dump", "eml", "mfd", "bin", "json", "hex" ],
            success: function(r) {
                r.tempFiles.forEach(function(r, t) {
                    var n = {
                        name: r.name,
                        data: null,
                        prefix: "",
                        suffix: "",
                        status: "error",
                        errmsg: "自动处理成功"
                    }, i = r.name.match(/^(.*)\.(.*)$/);
                    if (null != i && 3 === i.length) if (n.prefix = i[1], n.suffix = i[2], r.size <= 10240 && r.size >= 1024) {
                        var u = function(e) {
                            var s = wx.getFileSystemManager();
                            try {
                                return new Uint8Array(s.readFileSync(e));
                            } catch (e) {
                                e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                                return console.error(e), null;
                            }
                        }(r.path), c = e.checkDumpInBuffer(u);
                        switch (c) {
                          case "json":
                            var o = e.getJsonFromBuffer(u);
                            n.data = JSON.stringify(o), n.status = "success";
                            break;

                          case "hex":
                          case "bin":
                            if ((u = "bin" === c ? u : e.hexTextToBinary(u)).length % 16 == 0) {
                                var f = u.length / 16 - 1;
                                if (e.is0BlockBCCValid(u)) {
                                    var m = s.bytes2hex(u, 0, 4), l = s.bytes2hex(u, 5, 1), h = s.bytes2hex(u, 6, 2), g = e.createTagInfoObj(m, l, h, f), x = e.createTagDumpObj(g, u, void 0);
                                    n.data = JSON.stringify(x), n.status = "success";
                                } else n.data = u, n.status = "custom";
                            } else n.errmsg = "数据的大小不符合16个字节一个块的要求";
                            break;

                          default:
                            n.errmsg = "无法检测文件的内容类型";
                        }
                    } else n.errmsg = "文件不在1KB到10KB内"; else n.errmsg = "无法识别文件名后缀: " + r.name;
                    a.push(n);
                }), t(a);
            }
        });
    }
};