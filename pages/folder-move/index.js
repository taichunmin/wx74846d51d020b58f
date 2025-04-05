var t = require("../../A781651255C842DFC1E70D15E296D685.js"), e = require("../../76F8096255C842DF109E616502B6D685.js"), r = require("../../4723B54355C842DF2145DD44B4A6D685.js");

Page({
    data: {
        dir_view: [],
        position: "",
        firstItem: {
            name: "",
            rightIcon: "icon-circle"
        },
        radioChecked: !1,
        onFirstItemShow: !0,
        view_current_path: "",
        noFolder: !1,
        old_path: "",
        newPathArr: [],
        createFolder: {
            show: !1,
            title: "",
            placeholder: "",
            onClickLeft: "onUserCloseFrame",
            onClickRight: "onUserConfirmcreateFolder"
        }
    },
    judgePosition: function() {
        "local" == e.cloudOrLocal() ? this.setData({
            position: "本地卡包"
        }) : this.setData({
            position: "云端卡包"
        });
    },
    onFirstItemClick: function() {
        this.setData({
            radioChecked: !this.data.radioChecked
        });
    },
    onDumpItemClick: function(r) {
        var o = r.currentTarget.dataset.id, a = e.cloudOrLocal(), i = (a = t.onFolderItemClick(o), 
        t.judgeCurrentFolderLength());
        this.setData({
            onFirstItemShow: !1,
            checked: !1,
            currentFolderIndex: o,
            view_current_path: t.editCurrentPath(a.url_address, ">"),
            noFolder: i,
            selectFirst: !1
        }), this.setDirView();
    },
    onCreateFolder: function() {
        this.data.createFolder.show = !0, this.data.createFolder.title = "新建文件夹", this.data.createFolder.placeholder = "请输入文件夹名称", 
        this.setData({
            createFolder: this.data.createFolder
        });
    },
    onUserCloseFrame: function() {
        this.data.createFolder.show = !1, this.setData({
            createFolder: this.data.createFolder
        });
    },
    onUserConfirmcreateFolder: function(r) {
        var o = this, a = r.detail.dumpName;
        t.userConfirmcreateFolder(a, function(t, r) {
            1 == t ? (e.showToast(r), o.data.createFolder.show = !1, o.setData({
                createFolder: o.data.createFolder,
                noFolder: !1
            }), o.setDirView()) : e.showToast(r);
        });
    },
    goBack: function(t) {
        e.showToast(t), setTimeout(function() {
            wx.navigateBack();
        }, 800);
    },
    onMoveFolder: function() {
        var r = this, o = this.data.newPathArr, a = o[0].folder, i = o[0].file;
        t.moveFolderOrFile(this.data.old_path, a, i, function(t, o) {
            1 == t ? r.goBack(o) : e.showToast(o);
        });
    },
    folderSorting: function(t) {
        return r.sortData(t);
    },
    setDirView: function() {
        var e = this;
        t.drawDirViewByCurrentPath(function(t) {
            e.setData({
                dir_view: e.folderSorting(t)
            });
        });
    },
    onLoad: function(e) {
        var r = e.old_path, o = JSON.parse(e.selectItem);
        t.setFolderMoveData(o[0].folder), this.judgePosition(), this.data.firstItem.name = this.data.position, 
        this.setData({
            firstItem: this.data.firstItem,
            old_path: r,
            newPathArr: o
        }), this.setDirView();
    },
    onUnload: function() {
        t.setCurrentPath(this.data.old_path);
    }
});