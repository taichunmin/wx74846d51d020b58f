var i, p, t, e = require("@babel/runtime/helpers/defineProperty.js"), c = require("A3859AB555C842DFC5E3F2B2FA5585D7.js");

function s(i, p) {
    return {
        name: i,
        url: p
    };
}

module.exports = {
    IMG_DEVICE_ROTATE_3D_GIF: (i = {}, e(i, c.DeviceType.miniCopy, s("minicopy_3d_rotate.gif", "https://static.nikola-lab.cn/device_3d.gif")), 
    e(i, c.DeviceType.svipCopy, s("svipcopy_3d_rotate.gif", "https://static.nikola-lab.cn/svip_copy_3d.gif")), 
    i),
    IMG_DEVICE_STATIC_ENTITY: (p = {}, e(p, c.DeviceType.miniCopy, s("minicopy_static_entity.png", "/static/img/minicopy_static_front.png")), 
    e(p, c.DeviceType.svipCopy, s("svipcopy_static_entity.png", "/static/img/svipcopy_static_front.png")), 
    p),
    IMG_DEVICE_STATIC_SHAPE: (t = {}, e(t, c.DeviceType.miniCopy, s("minicopy_static_shape.png", "/static/img/minicopy_static_shape.png")), 
    e(t, c.DeviceType.svipCopy, s("svipcopy_static_shape.png", "/static/img/svipcopy_static_shape.png")), 
    t)
};