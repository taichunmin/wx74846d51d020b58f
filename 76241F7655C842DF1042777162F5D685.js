var _ = require("8896821655C842DFEEF0EA119506D685.js"), i = {};

function E(_, E, T) {
    if (!Array.isArray(T)) return i[T] = {
        message: _,
        type: E
    };
    var A = [];
    T.forEach(function(T) {
        A.push(i[T] = {
            message: _,
            type: E
        });
    });
}

function T(_, i) {
    return E(_, "IC", i);
}

function A(_, i) {
    return E(_, "ID", i);
}

function R(_, i) {
    return E(_, "设备", i);
}

T("半加密计算次数达到上限，请调整卡片位置后重试，多次无果则可能是三代无漏洞", _.miniapp.NESTED_TASK_RETRY_MAX), T("全加密计算次数达到上限，请调整卡片位置后重试，多次无果则不支持此卡", _.miniapp.DARKSIDE_TASK_RETRY_MAX), 
T("GEN1A（UID）卡片读取时移开过快或是位置距离天线太偏", _.miniapp.GEN1A_TAG_READ_FAILED), T("新型全加密卡，尝试使用变色龙等设备在门上刷卡，辅助完读卡步骤。", _.miniapp.UNREADABLE_ENCRYPTED_MF1), 
T("卡片不是空白卡，无法二次写入，请先清空卡片再写入", _.miniapp.UNWRITABLE_ENCRYPTED_MF1), T("GEN1A（UID）卡片写入时移开过快或是位置距离天线太偏", _.miniapp.GEN1A_TAG_WRITE_FAILED), 
T("该卡片可能有扇区损坏", _.miniapp.STDMF_TAG_WRITE_FAILED), T("该卡片写入UID号失败。如果是写手环或手机或亲邻88或原卡，则忽略此提示，写入是成功的。", _.miniapp.STDMF_UID_WRITE_FAILED), 
T("无法连接到计算服务器，请检查网络", _.miniapp.DECRYPTOR_SERVER_ERROR), T("内部计算机资源不足或不支持计算此卡片", _.miniapp.DECRYPTOR_COMPUTER_ERROR), 
T("该卡片所需算力太高，暂不支持此卡", _.miniapp.DECRYPTOR_TASK_CPU_MAX_EXCEED), T("半加密Hard卡，可尝试更新固件后读卡，或者联系客服寄回代复制", _.miniapp.HARD_NESTED_PART_ENCRYPTED), 
T("半加密Hard卡，但非MFC EV1，尝试使用变色龙等设备在门上刷卡，辅助完读卡步骤。", _.miniapp.HARD_NESTED_NOT_MFC_EV1), 
T("三代无漏洞计算次数达到上限，请重试", _.miniapp.RF08S_2X1NT_TASK_RETRY_MAX), T("解码此卡片需要耗费大量的算力，目前仅VIP账户可解码，请购买VIP再继续使用", _.miniapp.RF08S_SKU_NOT_PERMISSION), 
T("请求解码接口失败，本次错误将会被记录到小程序云端日志，请通知技术人员协助排查", _.miniapp.DECRYPTOR_SERVER_API_ERROR_NOT200), 
A("卡号已经相同，如是重复写卡，可以忽略此提示", _.miniapp.EM410X_TAG_NO_REMOVED), A("未检测到卡片", _.miniapp.EM410X_TAG_WRITE_FAILED), 
R("空白卡片的类型不正确，请按照提示使用正确的型号", _.miniapp.CONTAINER_TAG_TYPE_ERR), R("空白卡片的容量不正确，非常规卡，请联系客服购买", _.miniapp.CONTAINER_TAG_SIZE_ERR), 
R("发现盗版设备，我司将对此行为依法追究到底", _.miniapp.DEVICE_PIRATED_HARDWARE), R("本设备暂时不支持读取此卡片", _.miniapp.TAG_NO_SUPPORT_READ), 
R("蓝牙连接断开，请勿离复卡机太远，并且避免处于强电磁干扰环境", _.miniapp.BLE_DEVICE_DISCONNECTED), R("蓝牙通信超时，请勿离复卡机太远，并且避免处于强电磁干扰环境", _.miniapp.BLE_DEVICE_COM_TIMEOUT), 
R("未检测到卡片，请把卡片稍拿远后重试", _.miniapp.AUTO_SCAN_NO_TAG_FOUND), R("保存文件失败，可能是系统储存空间不足", _.miniapp.MP_SAVE_FILE_FAILED), 
R("登录信息失效，请回到小程序主页面，点击 “我的”，再点击上方重新登录", _.miniapp.MP_TOKEN_INVALID), T("卡片操作成功", _.minicopy.HF_TAG_OK), 
T("未检测到卡片，请把卡片稍拿远后重试", _.minicopy.HF_TAG_NO), T("卡片移开过快，或把卡片稍拿远后重试", _.minicopy.HF_ERRSTAT), 
T("CRC校验异常，或把卡片稍拿远后重试", _.minicopy.HF_ERRCRC), T("检测到卡片冲突，一次只可以操作一张卡哦", _.minicopy.HF_COLLISION), 
T("异或校验错误，请把卡片稍拿远后重试", _.minicopy.HF_ERRBCC), T("卡片验证密钥错误，请把卡片稍拿远后重试", _.minicopy.MF_ERRAUTH), 
T("奇偶校验错误，请把卡片稍拿远后重试", _.minicopy.HF_ERRPARITY), T("新型全加密卡", _.minicopy.DARKSIDE_CANT_FIXED_NT), 
T("对非全加密卡进行了全加密计算", _.minicopy.DARKSIDE_LUCK_AUTH_OK), T("新型全加密卡", _.minicopy.DARKSIDE_NACK_NO_SNED), 
T("计算全加密卡时中断了，或更换了卡片，请重试", _.minicopy.DARKSIDE_TAG_CHANGED), T("静态应答NT的卡片，可尝试更新固件后开启L2核心解密（在功能设置中）", _.minicopy.NESTED_TAG_IS_STATIC), 
T("无法预测NT的卡片，可能是三代无漏洞或是Hard卡", _.minicopy.NESTED_TAG_IS_HARD), T("可极速计算的ST卡", _.minicopy.NESTED_TAG_IS_STATIC_VARIABLES_NT2), 
T("半加密三代无漏洞卡，请更新固件后再尝试读取", _.minicopy.NESTED_TAG_IS_STATIC_HARD), A("卡片操作成功", _.minicopy.LF_TAG_OK), 
A("未检测到卡片", _.minicopy.EM410X_TAG_NO_FOUND), A("无法搜索到ZX82XX卡片", _.minicopy.ZX82XX_TAG_NO_FOUND), 
A("对ZX82XX标签选卡失败", _.minicopy.ZX82XX_TAG_SELECT_FAILED), A("对ZX82XX标签验证失败", _.minicopy.ZX82XX_TAG_AUTH_FAILED), 
A("对ZX82XX标签写卡失败", _.minicopy.ZX82XX_TAG_WRITE_FAILED), R("通信参数异常，请联系客服处理", _.minicopy.PAR_ERR), 
R("蓝牙通信异常，可能是电磁干扰较强，请更换电源环境重试", _.minicopy.BLE_COMMUNICATION_ERR), R("不支持的指令，请更新固件", _.minicopy.CMD_UNSUPPORTED), 
R("保存数据到复卡机设备时发生了错误", _.minicopy.FLASH_OPERATE_FAIL_RET), R("保存数据到复卡机设备成功", _.minicopy.FLASH_OPERATE_SUCC_RET), 
module.exports = {
    getMsg: function(_) {
        if (_ in i) {
            var E = i[_];
            return "".concat(E.message, "（").concat(E.type, "）");
        }
        return "暂无";
    }
};